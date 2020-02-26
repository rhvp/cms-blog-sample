const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
})

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;