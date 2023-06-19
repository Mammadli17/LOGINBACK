const express = require('express');
const { userController } = require('../CONTROLLERS/UserController');


const userRoutes = express.Router();


userRoutes.post('/register', userController.register)
userRoutes.post('/confirm', userController.confirmCode)
userRoutes.post('/login', userController.login)
userRoutes.post('/forgotpassword', userController.forgotPassword)
userRoutes.post('/newpassword', userController.newPassword)




module.exports = {
    userRoutes
}