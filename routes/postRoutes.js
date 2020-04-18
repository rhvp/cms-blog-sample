const express = require('express');
const post_Controller = require('../controllers/postController');
const comment_Controller = require('../controllers/commentController');
const tag_controller = require('../controllers/tagsController');
const router = express.Router();

router.route('/')
    .get(post_Controller.get_Posts)
    .post(post_Controller.create_Post)

router.get('/drafts',post_Controller.get_Drafts)

router.get('/published', post_Controller.get_Published)

router.get('/get-by-category/:id', post_Controller.get_Posts_By_Category)

router.route('/:id')
    .get(post_Controller.get_single_Post)
    .put(post_Controller.update_Post)
    .delete(post_Controller.delete_Post)
    
router.get('/recents', post_Controller.get_recent_posts)
    

router.route('/comments/:post_id')
    .post(comment_Controller.post_new_comment)
    .delete(comment_Controller.delete_comment)



module.exports = router;