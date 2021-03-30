const User = require("../models/userModel")

exports.getOneUser = (req, res) => {

    req.profile.hashed_password = undefined
    req.profile.salt = undefined

    res.json({
        user: req.profile
    })

}

exports.updateOneUser = (req, res) => {




    User.findByIdAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }, (err, user) => {

        if (err) return res.status(400).json({ error: err })

        user.hashed_password = undefined
        user.salt = undefined
        res.json({ user })
    })

}