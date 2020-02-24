const Comment =  require('../models/commentsModel');
const Post = require('../models/postModel');
module.exports = {
    post_new_comment: async (req, res, next)=>{
        let post_id = req.params.id;
        let comment = req.body;
        try {

            let post = await Post.findById(post_id);
            let new_comment = await Comment.create(comment);
            let new_comment_id = new_comment._id;
            if(new_comment_id) {
                post.comments.push(new_comment_id);
                post.save(err=>{
                    if (err) {
                        next(err);
                    }
                    res.status(201).json({
                        status: 'success',
                        message: 'Comment posted successfully'
                    })
                })
            }

        } catch(err) {
            next(err)
        }
        
    }
}