const Category = require('../models/categoryModel');
const _ = require('underscore');

module.exports = {
    add_new_category: (req, res, next) => {
        let category = _.pick(req.body, ['title']);
        Category.create(category).then(item=>{
            res.status(201).json({
                status: 'success',
                message: 'Category Successfully Added',
                data: item
            })
        }).catch(next)
    },

    get_all_categories: (req, res, next)=>{
        Category.find({}).then(items=>{
            res.status(200).json({
                status: 'success',
                data: {items}
            })
        }).catch(next)
    }
}