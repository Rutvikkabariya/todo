require('dotenv').config()
const jwt = require('jsonwebtoken');

// jwt verification
const auth = (req,res,next)=>{

    const token = req.headers.cookie.split('=')[2]
    if(!token){
        res.render('login',{msg:"please login first"})
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    req.user = decoded;
    next();

}

module.exports = auth