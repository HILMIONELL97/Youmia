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