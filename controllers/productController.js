const Product = require('../models/productModel');
const formidable = require('formidable')
const fs = require('fs')
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
                    err: 'Product not persist '
                })
            }

            res.json({
                product
            })
        })

    })
}