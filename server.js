const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


const User = mongoose.models.User || mongoose.model("User", {

    email:String,
    password:String

});


app.post("/signup", async (req,res)=>{

try{

await mongoose.connect(process.env.MONGO_URL);


const newUser = new User({

email:req.body.email,

password:req.body.password

});


await newUser.save();


res.json({

message:"Premium account created!"

});


}catch(error){

console.log(error);

res.status(500).json({

message:error.message

});

}

});


app.get("/", (req,res)=>{

res.sendFile(__dirname + "/public/index.html");

});


module.exports = app;