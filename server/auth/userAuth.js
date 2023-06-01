const Users = require('../models/Users.js');
const Posts = require('../models/Posts.js');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await Users.find();
    } catch (error) {
        return next(error);
    }

    if (!users) {
        return res.status(404).json({ message: "No user found"});
    }
    return res.status(200).json({ users });
};

// Sign up user and throw error if user already exists
const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;

    if(!(name && email && password)) {
        throw new Error("All inputs required");
    }

    let existingUser;
    try {
        existingUser = await Users.findOne({ email });
    } catch (error) {
        return next(error);
    }

    if (existingUser) {
        return res
            .status(400)
            .json({ message: "User already exists. Login instead." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users({
        name, 
        email, 
        password: hashedPassword,
        posts: [],
    });

    try {
        await user.save();
    } catch (error) {
        console.log("Error is in signUp userAuth.js",error);
        return next(error);
    }

    return res.status(201).json({ user });
};

// Verify and sign in user. If not user found or incorrect password, throw error. 
const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await Users.findOne({ email });
    } catch (error) {
        return next(error);
    }

    if (!existingUser) {
        return res.status(404).json({ message: "User not found. Register now!"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Incorrect password. "});
    }
    return res
        .status(200)
        .json({ message: "Login successful!", user: existingUser });
}

const getUserById = async (req, res, next) => {
    let userPosts;

    try {
        userPosts = await Users.findById(req.params._id).populate("posts");
    } catch (error) {
        console.log(error);
        next(error);
    }

    if (!userPosts) {
        return res.status(400).json({ message: "Unable to find posts." });
    }

    return res.status(200).json({ user : userPosts });
};

module.exports = {
    getAllUsers,
    getUserById,
    signUp,
    signIn,
};