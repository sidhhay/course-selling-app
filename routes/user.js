const { Router } = require("express");
const router = Router()
const { userModel, adminModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {z}=require("zod")
require("dotenv").config();
const saltRounds=10;
router.post("/signup",async function (req, res) {
    const { email, password, firstname, lastname } = req.body;
    const schema = z.object({
        email: z.string().email(),
        firstname: z.string(),
        lastname: z.string()
    })
    const result = schema.safeParse({
        email: email,
        firstname: firstname,
        lastname: lastname
    })
    if (!result.success) {
        return res.status(401).json({
            message: "invalid input",
            errors: result.error.issues
        })
    }
    const data = result.data;
    if (!password || password.length < 6) {
        return res.status(400).json({
            message: "invalid password"
        })
    }
    try {
        const existingUser=await userModel.findOne({email});
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        if(existingUser){
            return res.status(409).json({
                message:"user already exists"
            })
        }
        await userModel.create({
            email:email,
            password:hashedPassword,
            firstname:firstname,
            lastname:lastname
        });
        res.status(201).json({
            message:"signup successful"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:"signup error"
        })
    }
});
router.post("/signin",async function (req, res) {
    const { email, password } = req.body;
    //validate user
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "invalid credentials"
            })
        }
        //validate password
        const valid = await bcrypt.compare(
            password,
            user.password
        );
        if (!valid) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_USER_SECRET,
            {
                expiresIn: "1h"
            }
        )
        return res.status(200).json({
            message: "login succesful",
            token
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "system error occured"
        })
    }
});
router.get("/purchases", function (req, res) {
    res.json({
        message: "course preview"
    })
});
module.exports = {
    userrouter: router
}
