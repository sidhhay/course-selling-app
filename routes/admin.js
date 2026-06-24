const {Router}=require("express");
const adminRouter=Router();
const {adminModel, courseModel}=require("../db");
const z=require("zod");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require("dotenv").config();
const {adminMidlleware}=require("../middleware/admin");
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

    try{
        const hashedPassword=await bcrypt.hash(password,saltRounds);

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
adminRouter.post("/signin",async function(req,res){
    const {email,password}=req.body;
    //validate user
    try{
        const user=await adminModel.findOne({email});
        if(!user) {
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }
        const valid=await bcrypt.compare(
            password,
            user.password
        );
        if(!valid){
            return res.status(401).json({
                message:"invalid credentials"
            })
        }
        const token=jwt.sign(
            {
                id:user._id,
                email:user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
        );
        return res.json({
            message:"signin successful",
            token
        })
    }catch(err){
        console.log("error");
        res.status(500).json({
            message:"Internal server error"
        })
    }
});
adminRouter.post("/course",adminMiddleware,async(req,res)=>{
    try{

        const adminId=req.userId;
        const {title,description,imageUrl,price}=req.body;
        const course=await courseModel.create({
            title,description,imageUrl,price,creatorId:adminId
        })
        res.json({
            message:"course created successfully",
            course_id:course._id
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Error creating course",
            error:err.message
        });
    }
});
adminRouter.put("/course",(req,res)=>{

});
adminRouter.get("/course/bulk",(req,res)=>{

});
module.exports={
    adminRouter:adminRouter
}