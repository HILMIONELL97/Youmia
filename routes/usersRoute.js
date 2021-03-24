const router = require('express').Router()
const { userController } = require('../controllers/usersController')
router.get('/', userController)




module.exports = router