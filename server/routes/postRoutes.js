const express = require('express');
const postRouter = express.Router();
const {
    getAllPosts,
    addPost,
    updatePost,
    getPostById,
    deletePost,
    getUserById,
} = require('../auth/postAuth');

postRouter.get('/', getAllPosts);
postRouter.post('/add', addPost);
postRouter.put('/update/:id', updatePost);
postRouter.get('/:id', getPostById);
postRouter.delete('/:id', deletePost);
postRouter.get('/user/:id', getUserById);

module.exports = postRouter;