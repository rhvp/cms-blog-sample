const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter category title']
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;