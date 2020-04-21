const Comment =  require('../models/commentsModel');
const Post = require('../models/postModel');
const AppError = require('../config/appError');
const mongoose = require('mongoose');
module.exports = {
    post_new_comment: async (req, res, next)=>{
        let post_id = req.params.post_id;
        let comment = req.body;
        try {
            let post = await Post.findById(post_id);
            let new_comment = await Comment.create(comment);
            let new_comment_id = mongoose.Types.ObjectId(new_comment._id);
            if(new_comment_id) {
                post.comments.push(new_comment_id);
                post.save(err=>{
                    if (err) {
                        return next(err);
                    }
                    res.status(201).json({
                        status: 'success',
                        message: 'Comment posted successfully'
                    })
                })
            } else {
                return next(new AppError('Error!! Comment wasn\'\t saved', 409))
            }

        } catch(err) {
            next(err)
        }
        
    },
    delete_comment: async (req, res, next)=>{
        try {
            let comment_id = req.body.comment_id;
            await Comment.findByIdAndDelete(comment_id);

            // Remove comment reference from post
            await Post.updateOne(
                {"_id": req.params.id}, {"$pull": {"comments": comment_id}}
            );
            
            res.status(204).json({
                status: 'success',
            })
        }  catch(err) {
            next(err)
        }     
    }
}