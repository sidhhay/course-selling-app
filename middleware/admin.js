const jwt=require("jsonwebtoken");
require("dotenv").config();
function adminMidlleware(req,res,token){
    const token=req.headers.authorization;
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    if(decoded){
        req.userId=decoded.id;
    }else{
         return res.status(403).json({
            message:"you are not signed in"
         })
    }
}
module.exports={
    adminMidlleware:adminMidlleware
}