const express = require('express');
import {
    getAllPosts,
    addPost,
    updatePost,
    getPostById,
    deletePost,
    getUserById,
} from '../auth/postAuth';

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.post('/add', addPost);
postRouter.put('/update/:id', updatePost);
postRouter.get('/:id', getPostById);
postRouter.delete('/:id', deletePost);
postRouter.get('/user/:id', getUserById);

export default postRouter;