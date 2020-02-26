const express = require('express');
const post_Controller = require('../controllers/postController');
const comment_Controller = require('../controllers/commentController');
const router = express.Router();

router.route('/')
    .get(post_Controller.get_Posts)
    .post(post_Controller.create_Post)

router.route('/:id')
    .get(post_Controller.get_single_Post)
    .post(post_Controller.update_Post)
    .put(post_Controller.update_Post)
    .delete(post_Controller.delete_Post)
    
router.route('/recentPosts')
    .get(post_Controller.get_recent_posts)

router.route('/comments/:post_id')
    .post(comment_Controller.post_new_comment)
    .delete(comment_Controller.delete_comment)


module.exports = router;