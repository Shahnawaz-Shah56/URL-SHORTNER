const express = require('express');
const userController = require('../controllers/user.controller')

const route = express.Router();


route.post('/registerUser', userController.userRegister );
route.post('/loginUser', userController.loginUser)


module.exports = route;