const Category = require('../models/categoryModel');
const _ = require('underscore');

module.exports = {
    add_new_category: (req, res, next) => {
        let category = _.pick(req.body, ['title']);
        Category.create(category).then(async item=>{
            const categories = await Category.find({});
            res.status(201).json({
                status: 'success',
                data: {categories}
            })
        }).catch(next)
    },

    get_all_categories: (req, res, next)=>{
        Category.find({}).then(categories=>{
            res.status(200).json({
                status: 'success',
                data: {categories}
            })
        }).catch(next)
    }
}