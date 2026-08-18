export const isAdmin = (req,res,next)=>{
    if(req.user.role !=="admin"){
        res.status(403).send({
            success : false , 
            message : "Access Denied , Admins Only"
        })
    }
    next();
}