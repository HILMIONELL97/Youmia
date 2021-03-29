const Category = require('../models/categoryModel');


exports.createCategory = (req, res) => {

    const category = new Category(req.body)
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({ err: 'bad request!' })
        }
        res.json({ category: category })
    })


}

exports.categoryById = (req, res, next, id) => {

    Category.findById(id).exec((err, category) => {

        if (err || !category) {
            return res.status(404).json({
                error: 'Product not found !'
            })
        }

        req.category = category;
        next()

    })
}

exports.showCategory = (req, res) => {

    res.json({
        category: req.category
    })

}

exports.updateCategory = (req, res) => {

    let category = req.category

    category.name = req.body.name

    category.save((err, category) => {
        if (err || !category) return res.status(400).json({
            error: err
        })
        res.json({ msg: 'Category Updated !', category })
    })


}


exports.removeCategory = (req, res) => {

    let category = req.category

    category.remove((err) => {

        if (err) {
            return res.status(404).json({
                error: "Category not found !"
            })
        }

        res.status(204).json({})

    })

}


exports.allCategories = (req, res) => {

    Category.find().exec((err, categories) => {
        if (err) return res.status(400).json({ error: err })
        res.json({ categories })
    })

}