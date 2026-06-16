const {Router}=require("express");
const adminRouter=Router();
const {adminModel}=require("../db");
const z=require("zod");
const bcrypt=require('bcrypt');
const saltRounds=10;
adminRouter.post("/signup",async function(req,res){
    const schema=z.object({
    email:z.string().email(),
    firstname:z.string(),
    lastname: z.string()
    })
    const email=req.body.email;
    const firstname=req.body.firstname;
    const lastname=req.body.lastname
    const result=schema.safeParse({
        email:email,
        firstname:firstname,
        lastname:lastname
    })
    if(!result.success){
        return res.status(400).json({
            message:"Invalid input",
            errors:result.error.issues
        })
    }
    const data=result.data;
    const password=req.body.password;
    if(!password || password.length<6){
        return res.status(400).json({
            message:"password must be atleast 6 charecters."
        })
    }

    const hashedPassword=await bcrypt.hash(password,saltRounds);
    try{

        const existingAdmin=await adminModel.findOne({
            email:data.email
        })
        if(existingAdmin){
            return res.status(409).json({
                message:"Admin already exists"
            })
        }
        await adminModel.create({
            email:data.email,
            password:hashedPassword,
            firstname:data.firstname,
            lastname:data.lastname
    
        });
        res.json({
            message:"signup succesfull"
        })
    }catch(err){
        res.status(500).json({message:"Internal server error"});
    }
});
adminRouter.post("/signin",function(req,res){
    
});
adminRouter.post("/course",(req,res)=>{

});
adminRouter.put("/course",(req,res)=>{

});
adminRouter.get("/course/bulk",(req,res)=>{

});
module.exports={
    adminRouter:adminRouter
}