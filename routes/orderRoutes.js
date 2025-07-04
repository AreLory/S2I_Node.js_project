const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController');

//create order
exports.createOrder = router.post('/order', orderController.createOrder)

//get all orders or only one
exports.getOrdersList = router.get('/orders', orderController.getOrdersList)
exports.getOrder = router.get('/order', orderController.getOrder)

//delete order
exports.deleteOrder = router.get('/order/:id', orderController.deleteOrder)
//update order
exports.updateOrder = router.patch('/order/:id', orderController.updateOrder)