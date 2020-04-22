const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter category title'],
        unique: true
    }
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;