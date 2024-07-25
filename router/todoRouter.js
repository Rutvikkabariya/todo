const express = require('express');
const Router = express.Router();
const {
    getList,
    createList,
    getEditPage,
    EditList,
    deleteList
} = require('../controllers/todoController')
const secure = require('../middleware/authentication')

//getList
Router.get('/getList',secure, getList)

//createList
Router.post('/create',secure, createList)

//getEditPage
Router.get('/edit/:id',secure, getEditPage)

//getEditPage
Router.post('/edit',secure, EditList)

//deleteList
Router.get('/delete/:id',secure, deleteList)


module.exports = Router;