const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing'})
        }

        const token = authHeader.split('')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        const user = await Users.findById(decodedToken.userId);

        if(!user) {
            return res.status(401).json({ message: 'Invalid token or user not found'})
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateUser;