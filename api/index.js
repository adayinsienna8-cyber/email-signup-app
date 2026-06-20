const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL);


const User = mongoose.model("User", {
    email:String,
    password:String
});


app.post("/signup", async (req,res)=>{


const newUser = new User({

email:req.body.email,

password:req.body.password

});


await newUser.save();


res.json({

message:"Premium account created!"

});


});


module.exports = app;