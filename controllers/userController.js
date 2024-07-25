require('dotenv').config()
const userSchema = require('../models/userSchema');
const jwt = require('jsonwebtoken')

// getRegister page
const getRegister = (req, res) => {
    res.render('register')
}


// Register user
const Register = async (req, res) => {

    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            res.render('register', { msg: "can`t register" })
            return
        }
        const userEmail = await userSchema.findOne({ email: email });
 
        if (!userEmail) {
            const data = new userSchema({ name, email, password })
            const user = await data.save();

            // jwt token
            const token = jwt.sign({_id:user.id},process.env.JWT_SECRET,{
                expiresIn:1000
            })
            res.cookie('token',token).redirect('/todo/getList')
            
        } else {
            res.render('register', { msg: "Email already register" })
            return

        }

    } catch (err) {
        console.log(err)
        res.send(err)
    }
}


// getLogin page
const getLogin = (req, res) => {
    res.render('login')
}


// Login user
const Login = async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email || !password) {
            res.render('login', { msg: "can`t login" })
            return
        }

        const user = await userSchema.findOne({ email: email });

        if (!user || user.password !== password) {
            res.render('login', { msg: "please enter valid email or password" })
            return

        } else {

            // jwt token
            const token = jwt.sign({_id:user.id},process.env.JWT_SECRET,{
                expiresIn:1000
            })
            res.cookie('token',token).redirect('/todo/getList')
        }
        return

    } catch (err) {
        console.log(err)
        res.send(err)
    }
}


module.exports = {
    getRegister,
    Register,
    getLogin,
    Login
}