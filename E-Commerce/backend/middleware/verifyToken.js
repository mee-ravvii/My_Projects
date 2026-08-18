import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const verifyToken = async(req,res,next)=>{

    console.log("inside middleware")
    try {
        const authHeader = req.headers.authorization
        console.log(authHeader);

        if(!authHeader || !authHeader.startsWith('Bearer ')){
             return res.status(401).send({
            success : false,
            message : "Authorization Is Required"
            });
        };


        const token = authHeader.split(' ')[1];
        console.log(token);

        const tokenVerify = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = tokenVerify;
        console.log(tokenVerify);
        
        next();
    } catch (err) {
        return res.status(401).send({
            success : false,
            message : "Invalid or Expired Token"
            })
    }
    
    
}