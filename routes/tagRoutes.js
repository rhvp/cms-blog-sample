const express = require('express');

const router = express.Router();

const tag_Controller = require('../controllers/tagsController');

router.route('/')
    .get(tag_Controller.get_all_tags)
    .post(tag_Controller.create_new_tag)


module.exports = router;