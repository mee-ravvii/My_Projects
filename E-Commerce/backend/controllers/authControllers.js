const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async(req,res)=>{
    try {
        const {name ,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).send({
                success: false ,
                message : "User Already Exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        
        const user = await User.create({
            name : name , 
            email:email,
            password : hashedPassword
        })
        return res.status(201).send({
            success : true , 
            message : "User Registered SuccessFully"
        })
    } catch (err) {
        return res.status(500).send({
            success : false,
            message : err.message
        })
    }
};


const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send({
                success : false,
                message : "User Not Found",
            })
        }
        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(404).send({
                success: false , 
                message : 'Invalid Password'
            })
        } 


        const userPayload = {id : user._id,name : user.name,email : user.email, role : user.role}
        const token = await jwt.sign(
            userPayload,
            process.env.JWT_SECRET_KEY, 
            {expiresIn : '1h'}
        );

        return res.status(200).send({
            success : true,
            message : 'User Login  Successfull',
            token,
            user
        });


    } catch (err) {
         return res.status(500).send({
                success : false,
                message : err.message,
            })
    }
};


module.exports={
    registerUser,
    loginUser
}