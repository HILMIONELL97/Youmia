const Product = require('../models/productModel');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const Joi = require('joi');




exports.createProduct = (req, res) => {

    let form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {

        if (err) {
            return res.status(400).json({
                error: 'Image could not uploaded !'
            })
        }


        let product = new Product(fields);

        if (files.photo) {

            if (files.photo.size > Math.pow(10, 6)) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size !'
                })
            }

            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.string().required(),
            quantity: Joi.required(),
            category: Joi.required()
        })

        const { error } = schema.validate(fields);

        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            })
        }

        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    err: 'Product not persist !! '
                })
            }

            res.json({
                product
            })
        })

    })
}

exports.productById = (req, res, next, id) => {

    Product.findById(id).exec((err, product) => {

        if (err || !product) {
            return res.status(404).json({
                error: 'Product not found !'
            })
        }

        req.product = product;
        next()

    })

}
exports.showProduct = (req, res) => {

    req.product.photo = undefined;

    res.json({
        product: req.product
    })

}

exports.removeProduct = (req, res) => {

    let product = req.product

    product.remove((err) => {

        if (err) {
            return res.status(404).json({
                error: "Product not found !"
            })
        }

        res.status(204).json({})

    })

}

exports.updateProduct = (req, res) => {

    let form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {

        if (err) {
            return res.status(400).json({
                error: 'Image could not uploaded !'
            })
        }


        let product = req.product;

        product = _.extend(product, fields)

        if (files.photo) {

            if (files.photo.size > Math.pow(10, 6)) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size !'
                })
            }

            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.string().required(),
            quantity: Joi.required(),
            category: Joi.required()
        })

        const { error } = schema.validate(fields);

        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            })
        }

        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    err: 'Product not updated !! '
                })
            }

            res.json({
                product
            })
        })

    })
}

exports.allProducts = (req, res) => {

    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let order = req.query.order ? req.query.order : 'asc'
    let limit = req.query.limit ? parseInt(req.query.limit) : 100

    Product.find()
        .select("-photo")
        .sort([
            [sortBy, order]
        ])
        .populate('category')
        .limit(limit)
        .exec((err, Products) => {

            if (err) return res.status(404).json({ erorr: 'Products Not Found!!' })
            res.json({ Products })

        })
}

exports.relatedProduct = (req, res) => {

    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find({ category: req.product.category, _id: { $ne: req.product._id } })
        .limit(limit)
        .select("-photo")
        .populate('category', '_id name')
        .exec((err, Products) => {

            if (err) return res.status(404).json({ erorr: 'Products Not Found!!' })
            res.json({ Products })

        })
}

exports.searchProduct = (req, res) => {

    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let order = req.query.order ? req.query.order : 'asc'
    let limit = req.query.limit ? parseInt(req.query.limit) : 100
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .sort([
            [sortBy, order]
        ])
        .populate('category')
        .limit(limit)
        .skip(skip)
        .exec((err, Products) => {

            if (err) return res.status(404).json({ erorr: 'Products Not Found!!' })
            res.json({ Products })

        })

}

exports.photoProduct = (req, res) => {

    const { data, contentType } = req.product.photo

    if (data) { res.set('content-Type', contentType) }
    return res.send(data);

}