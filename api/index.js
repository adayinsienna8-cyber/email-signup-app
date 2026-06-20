const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


const User = mongoose.models.User || mongoose.model("User", {
    email: String,
    password: String
});


app.get("/", (req,res)=>{
    res.send("Server is working");
});


app.post("/api/signup", async (req,res)=>{

    try {

        await mongoose.connect(process.env.MONGO_URL);


        const user = new User({

            email: req.body.email,

            password: req.body.password

        });


        await user.save();


        res.json({
            message:"Premium account created!"
        });


    } catch(error){

        console.log(error);

        res.status(500).json({
            message:error.message
        });

    }

});


module.exports = app;