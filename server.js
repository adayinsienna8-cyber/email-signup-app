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