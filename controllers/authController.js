const jwt = require("jsonwebtoken")
const User =require("../models/User.js")

const adminCredentials = {
    username: "admin",
    password: "admin123",
}

const login = async(req,res)=>{
    const {username,password} = req.body;

    if(username===adminCredentials.username && password===adminCredentials.password){
        const token = jwt.sign({role:"admin"},process.env.JWT_SECRET,{expiresIn:"1h"})
        return res.status(200).json({token,role:"admin"})
    }
    
    const user = await User.findOne({socialHandle:username});
    if(!user) return res.status(404).json({error:"User not found"})
    const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"})
res.status(200).json({token,role:user.role})
}
module.exports = {login};

