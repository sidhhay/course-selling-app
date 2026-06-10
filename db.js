require("dotenv").config();
const mongoose = require("mongoose");

main().catch(err=>console.log(err));
async function main() {
    await mongoose.connect(process.env.mongo_url);
    console.log("mongo db connecter")
}

const courses = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    }
});

const users = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    firstname: String,
    lastname: String
});

const admins = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    firstname: String,
    lastname: String
});

const purchases = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    }
});

const userModel = mongoose.model("user", users);
const courseModel = mongoose.model("course", courses);
const adminModel = mongoose.model("admin", admins);
const purchaseModel = mongoose.model("purchase", purchases);
module.exports={
    userModel,
    adminModel,
    courseModel,
    purchaseModel,
    connectDb:main
}