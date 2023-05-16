import mongoose from "mongoose";

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
    timestamp: {
        type: String, 
        default: Date.now()
    },
});

export default mongoose.model("Posts", postSchema);