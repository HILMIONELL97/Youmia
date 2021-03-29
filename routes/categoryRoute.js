const express = require('express');
const router = express.Router()
const { createCategory, categoryById, showCategory } = require('../controllers/categoryController');

const { userById } = require('../middlewares/user');
const { requireSignIn, isAuth, isAdmin } = require('../middlewares/auth')


router.post('/create/:userId', [requireSignIn, isAuth, isAdmin], createCategory)
router.get('/:categoryId', showCategory);



router.param('userId', userById)
router.param('categoryId', categoryById)


module.exports = router;