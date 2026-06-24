const jwt=require("jsonwebtoken");
require("dotenv").config();
function userMiddleware(req,res,next){
    const token=req.headers.authorization;
    const decoded=jwt.verify(token,process.env.JWT_USER_SECRET);
    if(decoded){
        req.userId=decoded.id;
        next();
    }else{
         return res.status(403).json({
            message:"you are not signed in"
         })
    }
}
module.exports={
    userMiddleware:userMiddleware
}