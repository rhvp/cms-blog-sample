const express = require('express');
const post_Controller = require('../controllers/postController');
const comment_Controller = require('../controllers/commentController');
const tag_controller = require('../controllers/tagsController');
const router = express.Router();
const auth = require('../config/authorization');


router.get('/',post_Controller.get_Posts)
    
router.get('/:id', post_Controller.get_single_Post)

router.get('/drafts',post_Controller.get_Drafts)

router.get('/recents', post_Controller.get_recent_posts)

router.get('/published', post_Controller.get_Published)

router.get('/get-by-category/:id', post_Controller.get_Posts_By_Category)

router.route('/comments/:post_id')
    .post(comment_Controller.post_new_comment)
    .delete(comment_Controller.delete_comment)
    
router.use(auth.loggedin)
router.post('/:user_id',post_Controller.create_Post)
router.get('/publish/:id', post_Controller.publish_Post)
router.get('/unpublish/:id', post_Controller.unpublish_Post);

router.route('/:id')
    .put(post_Controller.update_Post)
    .delete(post_Controller.delete_Post)
    

    





module.exports = router;