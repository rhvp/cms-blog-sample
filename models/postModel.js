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
            ref: 'Category'
        }
    ],
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;