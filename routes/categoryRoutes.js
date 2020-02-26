const express = require('express');
const router = express.Router();
const category_Controller = require('../controllers/categoryController');

router.route('/')
    .get(category_Controller.get_all_categories)
    .post(category_Controller.add_new_category)

module.exports = router;