const express = require('express');
const comment_Controller = require('../controllers/commentController')
const router = express.Router();

router.route('/:id')
    .post(comment_Controller.post_new_comment)

module.exports = router;