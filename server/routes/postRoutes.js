const express = require('express');
const postRouter = express.Router();
const {
    getAllPosts,
    addPost,
    updatePost,
    getPostById,
    deletePost,
} = require('../auth/postAuth');

postRouter.get('/', getAllPosts);
postRouter.post('/add', addPost);
postRouter.put('/update/:id', updatePost);
postRouter.get('/:id', getPostById);
postRouter.delete('/:id', deletePost);


module.exports = postRouter;