const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
})

mongoose.model('Tag', tagSchema);