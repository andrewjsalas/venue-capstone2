const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: [6, "Must be at least 6 characters long"],
        maxLength: [20, "Must be no more than 20 characters long"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Must be at least 6 characters long"]
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts",
            required: false,
        }
    ],
});

module.exports = mongoose.model("users", userSchema);