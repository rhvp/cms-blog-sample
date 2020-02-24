const Post = require('../models/postModel');

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

    get_single_Post: (req, res, next)=>{
        let post_id = req.params.id;
        Post.findById(post_id).populate('comments').then(post=>{
            if(!post) {
                res.status(404).json({
                    message: 'No post found with that ID'
                })
            }
            res.status(200).json({
                status: 'success',
                data: {
                    post
                }
            })
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
                res.status(404).json({
                    message: 'No post found with that ID'
                })
            }
            res.status(204).json({
                status: 'successful',
                message: 'Post successfully updated'
            })
        })
    },

    delete_Post: (req, res, next)=>{
        let post_id = req.params.id;
        Post.findByIdAndDelete(post_id).then(post=>{
            if(!post) {
                res.status(404).json({
                    message: 'No post found with that ID'
                })
            }
            res.status(204).json({
                status: 'success',
                message: 'Post Deleted'
            })
        }).catch(next)
    }
}