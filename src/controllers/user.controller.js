const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function userRegister (req,res){
    const {username, email,password} = req.body;

try {


const doesUserAlreadyExists = await userModel.findOne({ username })

const hashedpassword = await bcrypt.hash(password, 10)

if(doesUserAlreadyExists){
return res.status(401).json({
    message:'User Already Exists'
})
}
    
         const user = await userModel.create({
        username,
        email,
        password: hashedpassword,
        
    })

    

    const token = jwt.sign({_id: user._id, username: user.username},process.env.JWT_SECRET_KEY)


    res.cookie('token',token)

    res.status(201).json({
        message: 'user successfully registered',
        user:{
            username: user.username,
            email:user.email
        }
    
    })
        
    } catch (error) {
        res.status(500).json({
            message: 'some error',error:error.message
        })
    }

   

}

async function loginUser (req, res){
    try {
    const { username,email, password } = req.body 

    
const isUserValid = await userModel.findOne({
    $or:[
        { username },{ email }
    ]
})

if(!isUserValid){
    return res.status(401).json({
        message: 'invalid credentials'
    })
}

const doesPasswordMatch = await bcrypt.compare(password, isUserValid.password);

if(!doesPasswordMatch){
    return res.status(401).json({
        message: 'invalid credential'
    })
}

const token = jwt.sign( {_id:isUserValid._id, username: isUserValid.username},process.env.JWT_SECRET_KEY )

res.cookie('token',token)

res.status(201).json({
    message: 'successfully logged in',
    logicUser:{
        _id: isUserValid._id,
        username: isUserValid.username,
        email: isUserValid.email
    }
})

}


 catch (error) {
    res.status(500).json({
        message:'some error occured', error: error.message
    })
}
    
}


module.exports = { userRegister, loginUser }