const express = require('express');
const Router = express.Router();
const {
    getRegister,
    Register,
    getLogin,
    Login
} = require('../controllers/userController')
const secure = require('../middleware/authentication')

//register
Router.get('/register',getRegister)
Router.post('/register',Register)

// login
Router.get('/login',getLogin)
Router.post('/login',Login)

module.exports = Router;