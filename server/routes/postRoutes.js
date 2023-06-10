const express = require('express');
const postRouter = express.Router();
const {
    getAllPosts,
    addPost,
    updatePost,
    getPostById,
    deletePost,
} = require('../auth/postAuth');

postRouter.get('/all', getAllPosts);
postRouter.post('/add', addPost);
postRouter.patch('/:id', updatePost);
postRouter.get('/:id', getPostById);
postRouter.delete('/:id', deletePost);


module.exports = postRouter;