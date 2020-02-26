const express = require('express');

const router = express.Router();

const tag_Controller = require('../controllers/tagsController');

router.route('/')
    .get(tag_Controller.get_all_tags)
    .post(tag_Controller.add_new_tag)

router.route('/:id')
    .get(tag_Controller.get_single_tag)

module.exports = router;