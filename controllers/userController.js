const User = require("../models/user")

exports.getOneUser = (req, res) => {

    req.profile.hashed_password = undefined
    req.profile.salt = undefined

    res.json({
        user: req.profile
    })

}