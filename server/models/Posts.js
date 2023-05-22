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
        maxLength: [8000, "Music be no more than 8,000 characters"]
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    },
});

// postSchema.pre("save", function(next) {
//     if (this.title.length > 0) {
//         this.title = filter.clean(this.title);
//     }

//     if (this.content.length > 0) {
//         this.content = filter.clean(this.content);
//     }
//     next();
// });

module.exports = mongoose.model("posts", postSchema);