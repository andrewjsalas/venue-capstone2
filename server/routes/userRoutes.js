const express = require('express');
const {
    getAllUsers,
    getUserById,
    getUserPosts, 
    signUp,
    signIn,
} = require('../auth/userAuth');
const { route } = require('./postRoutes');

const router = express.Router();

router.get("/", getAllUsers);
router.get('/:id', getUserById);
router.get('/myposts/:id', getUserPosts);
router.post('/signup', signUp);
router.post('/signin', signIn);


module.exports = router;