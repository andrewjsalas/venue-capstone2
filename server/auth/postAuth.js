const mongoose = require('mongoose');
const Posts = require('../models/Posts');
const Users = require('../models/Users');
const { ObjectId } = mongoose.Types;

// Get all posts
const getAllPosts = async (req, res, next) => {
    let posts;

    try {
        posts = await Posts.find().populate('user');
    } catch (error) {
        return next(error);
    }

    if (!posts) {
        return res.status(404).json({ message: "No posts found"});
    }

    return res.status(200).json({ posts });
};

const addPost = async (req, res, next) => {
    try {
        const { title, body } = req.body;

        const newPost = new Posts({
            title, 
            body,
            user: req.user._id
        });

        await newPost.save();

        const foundUser = await Users.findById(req.user._id);
        foundUser.posts.push(newPost._id);
        await foundUser.save();

        return res.status(200).json({ newPost });
        
    } catch (error) {
        console.log("Error is in addPost.js postAuth.js", error);
        return res.status(500).json({ message: error });
    }
}

const updatePost = async (req, res, next) => {
    const { title, body } = req.body;

    const postId = req.params._id;
    let post;

    try {
        post = await Posts.findByIdAndUpdate(postId, {
            title, 
            body,
        });    
    } catch (error) {
        return next(error);
    }

    if(!post) {
        return res.status(500).json({ message: "Unable to update post" });
    }

    return res.status(200).json({ post });
};

const getPostById = async (req, res, next) => {
    const id = req.params._id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid post ID." });
    }

    let post;

    try {
        post = await Posts.findById(id);
    } catch (error) {
        return next(error);
    }

    if (!post) {
        return res.status(404).json({ message: "Unable to locate post."});
    }

    return res.status(200).json({ post });
};

const deletePost = async (req, res, next) => {
    let post;

    try {
        post = await Posts.findByIdAndRemove(req.params._id).populate('user');
        await post.user.posts.pull(post);
        await post.user.save();
    } catch (error) {
        return next(error);
    }

    if (!post) {
        return res.status(500).json({ message: "Unable to delete post."});
    }

    return res.status(200).json({ message: "Successfully deleted post."});
}

module.exports = {
    getAllPosts,
    addPost,
    updatePost,
    getPostById,
    deletePost,
};