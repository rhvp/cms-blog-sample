const Post = require('../models/postModel');
const Tag = require('../models/tagModel');
const Comment = require('../models/commentsModel');
const AppError = require('../config/appError');
const _ = require('underscore');
const mongoose = require('mongoose');

module.exports = {
    get_Posts: (req, res, next)=>{
        Post.find({}).populate('tags category comments').then(posts=>{
            res.status(200).json({
                status: 'success',
                data: {
                    posts
                }
            })
        }).catch(next)
    },

    get_Published:(req, res, next)=>{
        Post.find({'published': true}).populate('tags category comments').then(posts=>{
            res.status(200).json({
                status: 'success',
                data: {posts}
            })
        })
    },

    get_Drafts:(req, res, next)=>{
        Post.find({'published':false}).populate('tags category comments').then(posts=>{
            res.status(200).json({
                status: 'success',
                data: {
                    posts
                }
            })
        }).catch(next)
    },

    get_recent_posts: (req, res, next)=>{
        Post.find({}).sort({createdAt: -1}).populate('tags category comments').then(posts=>{
            res.status(200).json({
                status: 'success',
                data: {posts}
            })
        }).catch(next)
    },

    get_single_Post: (req, res, next)=>{
        let post_id = req.params.id;
        Post.findById(post_id).populate('comments').populate('tags').populate('category').then(post=>{
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

    get_Posts_By_Category: (req, res, next)=>{
        const cat_id = req.params.id;
        Post.find({'category':cat_id}).populate('tags category comments').then(posts=>{
            res.status(200).json({
                status: 'success',
                data: {posts}
            })
        }).catch(next)
    },

    create_Post: async(req, res, next)=>{
        try {
            let expected_body = _.pick(req.body,['title', 'content', 'image', 'excerpt']);
            const post = new Post(expected_body);
            
            await req.body.categories.map(category=>{
                let cat_id = mongoose.Types.ObjectId(category)
                post.category.push(cat_id);
            });
            await req.body.tags.map(tag=>{
                let tag_id = mongoose.Types.ObjectId(tag);
                post.tags.push(tag_id)
                // let post_id = mongoose.Types.ObjectId(post._id)
                // Tag.updateOne({'_id': tag}, {'$push': {'posts': post_id}}).then((tag)=>{
                //     console.log('tag updated');
                // }).catch(next)
            });
            if(!req.body.publish) post.published = false;
            post.save(err=>{
                if(err) return next(err);
                res.status(201).json({
                    status: 'success',
                    message: 'Post created successfully',
                    data: {post}
                })
            })
            
        } catch (error) {
            next(error)
        }
        
    },

    update_Post: async(req, res, next)=>{

        try {
            let update = _.pick(req.body, 'title','content', 'image', 'excerpt', 'tags', 'category');
            const post = await Post.findById(req.params.id);
            if(!post) return next(new AppError('Post Not Found', 404));
            await update.tags.map(tag=>{
                let id = mongoose.Types.ObjectId(tag);
                post.tags.push(id);
            })
            await update.category.map(category=>{
                let id = mongoose.Types.ObjectId(category);
                post.category.push(id);
            })
            post.save(err=>{
                if(err) return next(err);
                res.json({
                    data: {post}
                })
            })
        } catch (error) {
            next(error)
        }
        
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
                 Tag.updateOne({'_id': item}, {'$pull': {'posts': req.params.id}}).then(()=>{
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
        },

        publish_Post: async(req, res, next)=>{
            const post = await Post.findById(req.params.id);
            if(!post) return next(new AppError('Post not found', 404));
            if(post.published) return next(new AppError('Post has already been published', 403));
            post.published = true;
            post.save(err=>{
                if(err) return next(err);
                res.status(200).json({
                    status: 'success',
                    message: 'Post published'
                })
            })
        },

        unpublish_Post:async(req, res, next)=>{
            const post = await Post.findById(req.params.id);
            if(!post) return next(new AppError('Post not found', 404));
            post.published = false;
            post.save(err=>{
                if(err) return next(err);
                res.status(200).json({
                    status: 'success',
                    message: 'Post saved as draft'
                    
                })
            })
        }
}