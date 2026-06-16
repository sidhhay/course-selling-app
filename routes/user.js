const {Router}=require("express");
const router=Router()
const {userModel}=
router.post("/signup",function(req,res){
    const {email,password,firstName,lastName}=req.body;

});
router.post("/signin",function(req,res){
    
});
router.get("/purchases",function(req,res){
    res.json({
        message:"course preview"
    })
});
module.exports={
    userrouter:router
}
