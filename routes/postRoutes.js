const express = require('express');
const post_Controller = require('../controllers/postController');
const router = express.Router();

router.route('/')
    .get(post_Controller.get_Posts)
    .post(post_Controller.create_Post)

router.route('/:id')
    .delete(post_Controller.delete_Post)
    .get(post_Controller.get_single_Post)
    .put(post_Controller.update_Post)

module.exports = router;