import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true, 'Please provide title'],
    },
    content: {
        type: String,
        required:[true, 'Please provide content'],
    },
})

const Post = mongoose.models.posts || mongoose.model('posts', postSchema);

export default Post