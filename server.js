const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://eshasonawane25_db_user:26eJiLPvpHw9fWsi@cluster0.qajflyq.mongodb.net/loginDB")
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running");
});

