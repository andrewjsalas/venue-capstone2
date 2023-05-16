const mongoose = require('mongoose');
import Posts from '../models/Posts';
import Users from '../models/Users';

// Get all posts
export const getAllPosts = async (req, res, next) => {
    let posts;

    try {
        posts = await Posts.find().populate('user');
    } catch (error) {
        console.log(error);
    }

    if (!posts) {
        return res.status(404).json({ message: "No posts found"});
    }

    return res.status(200).json({ posts });
};

export const addPost = async (req, res, next) => {
    const { title, body, user, timestamp } = req.body;

    let existingUser;
    try {
        existingUser = await Users.findById(user);
    } catch (error) {
        return console.log(error);
    }

    if (!existingUser) {
        return res.status(400).json({ message: "Unable to find user by this ID "});
    }

    const post = new Posts({
        title, 
        body, 
        user,
        timestamp,
    });

    try {
        const session = await mongoose.startSession();

        session.startTransaction();
        await post.save({ session });
        existingUser.posts.push(post);
        await existingUser.save({ session})
        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        return res.status(500).json({ message: error });
    }

    return res.status(200).json({ post });
}

export const updatePost = async (req, res, next) => {
    const { title, body } = req.body;

    const postId = req.params.id;
    let post;

    try {
        post = await Posts.findByIdAndUpdate(postId, {
            title, 
            body,
        });    
    } catch (error) {
        return console.log(error);
    }

    if(!post) {
        return res.status(500).json({ message: "Unable to update post" });
    }

    return res.status(200).json({ blog });
};

export const getPostById = async (req, res, next) => {
    const id = req.params.id;

    let post;

    try {
        post = await Posts.findById(id);
    } catch (error) {
        return console.log(error);
    }

    if (!post) {
        return res.status(5404).json({ message: "Unable to locate post."});
    }

    return res.status(200).json({ post });
};

export const deletePost = async (req, res, next) => {
    let post;

    try {
        post = await Posts.findByIdAndRemove(req.params.id).populate('user');
        await post.user.posts.pull(post);
        await post.user.save();
    } catch (error) {
        console.log(error);
    }

    if (!post) {
        return res.status(500).json({ message: "Unable to delete post."});
    }

    return res.status(200).json({ message: "Successfully deleted post."});
}

export const getUserById = async(req, res, next) => {
    let userPosts;

    try {
        userPosts = await Users.findById(req.params.id).populate("posts");
    } catch (error) {
        console.log(error);
    }

    if (!userPosts) {
        return res.status(400).json({ message: "Unable to find posts." });
    }

    return res.status(200).json({ userPosts });
};