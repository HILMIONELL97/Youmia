const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxlength: 50,
        trim: true
    }
}, { timestamps: true })



module.exports = mongoose.Model('Category', categorySchema);