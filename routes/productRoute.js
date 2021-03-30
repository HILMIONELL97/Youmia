const express = require('express');
const router = express.Router()
const {
    allProducts,
    searchProduct,
    photoProduct,
    relatedProduct,
    createProduct,
    showProduct,
    productById,
    removeProduct,
    updateProduct
} = require('../controllers/productController');

const { userById } = require('../middlewares/user');
const { requireSignIn, isAuth, isAdmin } = require('../middlewares/auth')

router.get('/', allProducts)
router.post('/create/:userId', [requireSignIn, isAuth, isAdmin], createProduct)
router.get('/:productId', showProduct);
router.get('/photo/:productId', photoProduct);
router.post('/search', searchProduct)
router.get('/related/:productId', relatedProduct);
router.put('/:productId/:userId', [requireSignIn, isAuth, isAdmin], updateProduct)
router.delete('/:productId/:userId', [requireSignIn, isAuth, isAdmin], removeProduct)

router.param('userId', userById)
router.param('productId', productById)


module.exports = router;