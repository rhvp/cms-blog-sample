const Post = require('../models/postModel');
const AppError = require('../config/appError');

module.exports = {
    get_Posts: (req, res, next)=>{
        Post.find({}).then(posts=>{
            res.status(200).json({
                status: 'success',
                data: {
                    posts
                }
            })
        }).catch(next)
    },

    get_recent_posts: (req, res, next)=>{
        Post.find({}).sort({createdAt: 1}).then(items=>{
            res.status(200).json({
                status: 'success',
                data: {items}
            })
        }).catch(next)
    },

    get_single_Post: (req, res, next)=>{
        let post_id = req.params.id;
        Post.findById(post_id).populate('comments').populate('tags').then(post=>{
            if(!post) {
                next(new AppError('The post with requested ID does not exist', 404))
            } else {
                res.status(200).json({
                    status: 'success',
                    data: {
                        post
                    }
                })
            }
            
        }).catch(next)
    },

    create_Post: (req, res, next)=>{
        let new_post = req.body;
        Post.create(new_post).then(post=>{
            res.status(201).json({
                status: 'success',
                message: 'New Post Created',
            })
        }).catch(next)
    },

    update_Post: (req, res, next)=>{
        let update = req.body;
        Post.findByIdAndUpdate(req.params.id, update).then(post=>{
            if(!post){
                next(new AppError('The post with requested ID does not exist', 404))
            } else {
                res.status(204).json({
                    status: 'successful',
                })
            }
        })
    },

    delete_Post: (req, res, next)=>{
        let post_id = req.params.id;
        Post.findByIdAndDelete(post_id).then(post=>{
            if(!post) {
                next(new AppError('The post with requested ID does not exist', 404))
            } else {
                res.status(204).json({
                    status: 'success',
                })
            }
            
        }).catch(next)
    }
}