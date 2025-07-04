const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

//create product
exports.createProduct = router.post('/product', productController.createProduct);

//get all products or only one
exports.getProductsList = router.get('/products', productController.getProductsList);
exports.getProduct = router.get('/product/:id', productController.getProduct)

//delete product
exports.deleteProduct = router.delete('/product/:id', productController.deleteProduct)
//update product
exports.updateProdict = router.put('/product/:id', productController.updateProduct)

