const Tag = require('../models/tagModel');
const Post = require('../models/postModel');
const AppError = require('../config/appError');
const mongoose = require('mongoose');
const _ = require('underscore');

module.exports = {
    get_all_tags: (req, res, next)=> {
        Tag.find({}).then(tags=>{
            res.status(200).json({
                status: 'success',
                data: {tags}
            })
        }).catch(next)
    },

    add_post_tag: async (req, res, next)=>{

        try {
            let post_id = mongoose.Types.ObjectId(req.params.post_id);
            let tag_id = mongoose.Types.ObjectId(req.body.tag_id);

            let post = await Post.findById(req.params.post_id);
            if (post) {
                post.tags.push(tag_id);
                post.save(err=>{
                    if (err){
                        return next(err);
                    }

                    Tag.updateOne({'_id': tag_id}, {'$push': {'posts': post_id}}).then(
                        res.status(204).json({
                            status: 'success'
                        })
                    )
                })
                
            } else {
                return next(new AppError('The post with requested ID does not exist', 404))
            }
            
        } catch(err) {
            next(err)
        }
        

    },

    create_new_tag: (req, res, next)=>{
        let tag = _.pick(req.body, ['title']);
        Tag.create(tag).then(async item=>{
            const tags = await Tag.find({});
            res.status(201).json({
                status: 'success',
                data: {tags}
            })
        }).catch(next)
    }
}