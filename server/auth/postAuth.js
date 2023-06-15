const mongoose = require('mongoose');
const Posts = require('../models/Posts');
const Users = require('../models/Users');
const { Types: {ObjectId} } = require('mongoose');


// Get All Posts
const getAllPosts = async (req, res, next) => {
    try {
        // Grabs all the posts in the 'posts' mongodb collection and their corresponding 'user'. 
        const posts = await Posts.find({}).populate("user");
        
        if (!posts) {
            return res.status(404).json({ message: "No posts found" });
        }

        return res.status(200).json({posts});
    } catch (error) {
        console.log("error is in getAllPosts", error);
        return next(error);
    }
};

// Add A Post
const addPost = async (req, res, next) => {
    try {
        const { title, body, user, name } = req.body;
        let existingUser;

        // Finds the user by ID
        try {
            existingUser = await Users.findById(user);
        } catch (error) {
            return console.log('No user found in addPost', error);
        }

        // Creates a post document
        const post = await Posts.create({
            title,
            body,
            user,
            name: existingUser.name,
        });

        // When a user submits a post, this pushes the post to the users 'posts' array on the backend and updates it. 
        const updatedUser = await Users.findByIdAndUpdate(
            user,
            {
                $push: {
                    posts: post._id
                }
            }, 
            { new: true }
        ).populate('posts');

        console.log("updatedUser: ", updatedUser);

        return res.status(201).json({ success: true, post });
    } catch (error) {
        return res.status(500).json({ message: "Server error in addPost.js",error });
    }
}

// Update A Post
const updatePost = async (req, res, next) => {
    const { title, body } = req.body;
    const postId = req.params.id;
    let post;

    // Fetches the post ID and updates the title and body document field 
    try {
        post = await Posts.findByIdAndUpdate(
            postId, 
            {
                title, 
                body,
            },
            { new: true }
            ); 

            if(!post) {
                return res.status(500).json({ message: "Unable to update post" });
            }
        } catch (error) {
        return next(error);
    }


    return res.status(200).json({ post });
};

// Get Post By ID
const getPostById = async (req, res, next) => {
    const id = req.params._id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid post ID." });
    }

    let post;

    // Fetches the post ID
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

// Delete A Post
const deletePost = async (req, res, next) => {
    let post;

    try {
        // Fetches the post ID 
        post = await Posts.findByIdAndRemove(req.params.postId).populate('user');

        if (!post) {
            return res.status(500).json({ message: "Unable to delete post." })
        }

        // Deletes the post
        await post.user.posts.pull(post);
        await post.user.save();
    } catch (error) {
        return next(error);
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