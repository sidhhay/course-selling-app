const {Router}=require("express");
const router=Router()
router.post("/signup",function(req,res){
    
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
