const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: [80, "Must be no more than 80 characters"]
    },
    body: {
        type: String,
        required: true,
        maxLength: [8000, "Must be no more than 8,000 characters"]
    },
    name: {
        type: String,
        ref: 'users', 
        required: false,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
        index: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: false,
    }
});

postSchema.index({ createdAt: -1 });

module.exports = mongoose.model("posts", postSchema);