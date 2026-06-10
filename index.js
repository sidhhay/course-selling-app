const express=require("express");
const app=express();
const {courseRouter}=require("./routes/course")
const {userrouter}=require("./routes/user");
const {adminRouter}=require("./routes/admin");
const db=require("./db");
const {connectDb}=db;
app.use("/admin",adminRouter);  
app.use("/user",userrouter);
app.use("/course",courseRouter);
connectDb().catch((err)=>{
    console.log(err);
})//creates database connection when the server starts
app.listen(3000,()=>{
    console.log("port started on port 3000")
});