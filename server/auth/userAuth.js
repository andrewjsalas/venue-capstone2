import Users from "../models/Users.js";
import User from "../models/Users.js";
const bcrypt = require('bcrypt');

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await Users.find();
    } catch (error) {
        return console.log(error);
    }

    if (!users) {
        return res.status(404).json({ message: "No user found"});
    }
    return res.status(200).json({ users });
};

// Sign up user and throw error if user already exists
export const signUp = async (req, res, next) => {
    const { name, email, username, password } = req.body;

    let existingUser;
    try {
        existingUser = await Users.findOne({ email });
    } catch (error) {
        return console.log(error);
    }

    if (existingUser) {
        return res
            .status(400)
            .json({ message: "User already exists. Login instead." });
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name, 
        email, 
        username, 
        password: hashedPassword,
        posts: [],
    });

    try {
        await user.save();
    } catch (error) {
        return console.log(error);
    }

    return res.status(201).json({ user });
};

// Very and sign in user. If not user found or incorrect password, throw error. 
export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await Users.findOne({ email });
    } catch (error) {
        return console.log(error);
    }

    if (!existingUser) {
        return res.status(404).json({ message: "User not found. Register now!"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(404).json({ message: "Incorrect password. "});
    }
    return res
        .status(200)
        .json({ message: "Login successful!", user: existingUser });
}