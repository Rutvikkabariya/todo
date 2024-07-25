require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRouter = require('./router/userRouter')
const todoRouter = require('./router/todoRouter')

mongoose.connect(process.env.URL)

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/',userRouter)
app.use('/todo',todoRouter)

app.listen(process.env.port ,()=>{
    console.log(`Run at ${process.env.port}`);
})