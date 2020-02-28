const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postController')

router.route('/')
    .get(post_controller.get_recent_posts);

module.exports = router;