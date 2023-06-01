const express = require('express');
const {
    getAllUsers,
    getUserById, 
    signUp,
    signIn,
} = require('../auth/userAuth');

const router = express.Router();

router.get("/", getAllUsers);
router.get('/:id', getUserById);
router.post('/signup', signUp);
router.post('/signin', signIn);


module.exports = router;