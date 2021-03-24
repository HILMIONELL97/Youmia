const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        maxlength: 255,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    },
    about: {
        type: String,
        trim: true
    }
}, { timestamps: true })


module.exports = mongoose.model('user', userSchema);