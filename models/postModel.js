const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a post title']
    },
    image: {
        type: String
    },
    excerpt: {
        type: String
    },
    content: {
        type: String,
        required: [true, 'Please enter post content']
    },
    published: {
        type: Boolean,
        default: true
    },
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category'
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tag'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
}, {timestamps: true});

const Post = mongoose.model('post', postSchema);

module.exports = Post;