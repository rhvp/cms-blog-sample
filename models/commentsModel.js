const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.export = Comment;