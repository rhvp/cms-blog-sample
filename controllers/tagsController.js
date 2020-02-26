const Tag = require('../models/tagModel');
const AppError = require('../config/appError');

module.exports = {
    get_all_tags: (req, res, next)=> {
        Tag.find({}).then(items=>{
            res.status(200).json({
                status: 'success',
                data: {items}
            })
        }).catch(next)
    },

    get_single_tag: async (req, res, next)=>{
        Tag.findById(req.params.id).populate('Post').then(item=>{
            if(!item){
                next(new AppError('The requested tag with provided ID does not exist', 404))
            } else {
                res.status(200).json({
                    status: 'success',
                    data: {item}
                })
            }
           
        }).catch(next)
    },

    add_new_tag: (req, res, next)=>{
        Tag.create(req.body).then(item=>{
            res.status(201).json({
                status: 'success',
                data: {item}
            })
        }).catch(next)
    }
}