const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/loginDB")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

const UserSchema = new mongoose.Schema({
  firstName:String,
  lastName:String,
  email:String,
  password:String
});

const User = mongoose.model("User",UserSchema);

app.post("/signup",async(req,res)=>{
  const user = new User(req.body);
  await user.save();
  res.json({message:"User created"});
});

app.post("/login",async(req,res)=>{
  const {email,password} = req.body;

  const user = await User.findOne({email,password});

  if(user){
    res.json({success:true,user});
  }else{
    res.json({success:false});
  }
});

app.listen(5000,()=>{
  console.log("Server running on port 5000");
});
