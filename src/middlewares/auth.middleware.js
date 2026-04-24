const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

async function authcreditedby(req, res, next){


    try {
        
    
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:'unauthorized', 
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    const user = await userModel.findById(decoded._id)

    req.user = user
    
    next();


    



} catch (error) {
        res.status(500).json({
            message: 'some error occured', error: error.message
        })
    }
}

module.exports = authcreditedby;