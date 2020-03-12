const Post = require('../models/postModel');
const Tag = require('../models/tagModel');
const Comment = require('../models/commentsModel');
const AppError = require('../config/appError');

module.exports = {
    get_Posts: (req, res, next)=>{
        Post.find({'published':true}).then(posts=>{
            res.status(200).json({
                status: 'success',
                data: {
                    posts
                }
            })
        }).catch(next)
    },

    get_recent_posts: (req, res, next)=>{
        Post.find({}).sort({createdAt: -1}).then(items=>{
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
                return next(new AppError('The post with requested ID does not exist', 404))
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
                data: {
                    post
                }
            })
        }).catch(next)
    },

    update_Post: (req, res, next)=>{
        let update = req.body;
        Post.findByIdAndUpdate(req.params.id, update).then(post=>{
            if(!post){
                return next(new AppError('The post with requested ID does not exist', 404))
            } 
                res.status(204).json({
                    status: 'success',
                })
            
        }).catch(next)
    },

    delete_Post: async (req, res, next)=>{
        try {
            
            let post = await Post.findById(req.params.id);
            if(!post){
                return next(new AppError('The post with requested ID does not exist', 404))
            }

            // Delete post's comments from db
            let comments = post.comments;
            await comments.map(item=>{
                return Comment.findByIdAndDelete(item).then(id=>{
                    console.log('Comment successfully deleted from post');
                }).catch(next)
            });

            // Delete post from referenced tags
            let tags = post.tags;
            await tags.map(item=>{
                return Tag.updateOne({'_id': item}, {'$pull': {'posts': req.params.id}}).then(()=>{
                    console.log('post deleted from tag')
                }).catch(next)
            })

            // Finally Delete post
            await Post.findByIdAndDelete(req.params.id);
            res.status(204).json({
                status: 'success'
            })

        } catch(err) {
                next(err)
            }
        }
}