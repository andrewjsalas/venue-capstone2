const express = require('express');
const {
    getAllPosts,
    addPost,
    updatePost,
    getPostById,
    deletePost,
    getUserById,
} = require('../auth/postAuth');

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.post('/add', addPost);
postRouter.put('/update/:id', updatePost);
postRouter.get('/:id', getPostById);
postRouter.delete('/:id', deletePost);
postRouter.get('/user/:id', getUserById);

module.exports = postRouter;