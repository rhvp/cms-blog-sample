const Category = require('../models/categoryModel');

module.exports = {
    add_new_category: (req, res, next) => {
        Category.create(req.body).then(item=>{
            res.status(201).json({
                status: 'success',
                message: 'Category Successfully Added'
            })
        }).catch(next)
    },

    get_all_categories: (req, res, next)=>{
        Category.find({}).then(items=>{
            res.status(200).json({
                status: 'success',
                data: {items}
            })
        })
    }
}