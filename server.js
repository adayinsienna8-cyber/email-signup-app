const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// Connect MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.log("MongoDB error:", err);
});


// User database model
const User = mongoose.model("User", {

    email: String,

    password: String,

    createdAt: {
        type: Date,
        default: Date.now
    }

});


// Signup route
app.post("/signup", async (req, res) => {

    try {

        const newUser = new User({

            email: req.body.email,

            password: req.body.password

        });


        await newUser.save();


        res.json({

            message: "Premium account created!"

        });


    } catch(error) {


        console.log(error);


        res.status(500).json({

            message: "Something went wrong"

        });

    }

});


// Test page
app.get("/", (req,res)=>{

    res.sendFile(__dirname + "/public/index.html");

});


// Start server
app.listen(3000, () => {

    console.log("Server running on port 3000");

});