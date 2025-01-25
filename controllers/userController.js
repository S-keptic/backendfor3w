const User = require("../models/User.js")

const submitUserData = async(req,res)=>{
    const{name,socialHandle} = req.body;
    const images = req.files.map((file)=>file.path);

    try{
        const newUser = new User({name,socialHandle,images})
        await newUser.save();
        res.status(201).json({message:"User data submitted successfully"})
    }catch(error){
        res.status(500).json({error:"failed to submit user data"})
    }
}
const getAllSubmissions= async(req,res)=>{
    try{
        const submissions = await User.find();
        res.status(200).json({submissions})
    }catch(error){
        res.status(500).json({error:"failed to fetch user submissions"})
    }
}

module.exports=  {submitUserData,getAllSubmissions}