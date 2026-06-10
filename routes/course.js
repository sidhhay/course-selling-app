const {Router}=require("express");
const router=Router();
// console.log(typeof router)returns a function
router.post("/purchase",function(req,res){

});
router.get("/preview",function(req,res){
    res.json({
        message:"course preview"
    })
});
module.exports={
    courseRouter:router
};
