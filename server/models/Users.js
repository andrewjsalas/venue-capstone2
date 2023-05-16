import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    posts: {
        type: mongoose.Types.ObjectId,
        ref: "Posts",
        required: true,
    },
});

export default mongoose.model("Users", userSchema);