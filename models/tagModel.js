const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter tag title']
    }
})

const Tag = mongoose.model('tag', tagSchema);

module.exports = Tag;