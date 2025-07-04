const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');

//Create user
exports.createUser = router.post('/user', userController.createUser);

//Get users and get one user
exports.getUserList = router.get('/users', userController.getUserList)
exports.getUser = router.get('/user/:id', userController.getUser)

//Delete user
exports.deleteUser = router.delete('/user/:id', userController.deleteUser);
//Update user
exports.updateUser = router.patch('/user/:id', userController.updateUser)

