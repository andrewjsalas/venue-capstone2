const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    // timestamp: {
    //     type: Date, 
    //     default: Date.now()
    // },
});

module.exports = mongoose.model("Posts", postSchema);