const express=require("express");
const router=express.Router();
const asynchandler=require("express-async-handler");
const bcrypt=require("bcryptjs");
const {User,validationUpdatedUser}=require("../models/User");
const {verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorization} = require("../middlewares/verifytoken");


const updateuser = asynchandler(

    async(req,res)=>{
        const {error} =  validationUpdatedUser(req.body);
        if (error){
            return res.status(400).json({ message: error.details[0].message });
        }

        if(req.body.password){
            const salt= await bcrypt.genSalt(10);
            req.body.password =await bcrypt.hash(req.body.password,salt);
        }
        const updatedUser= await User.findByIdAndUpdate(req.params.id,{
            $set:{
                email:req.body.email,
                password:req.body.password,
                username:req.body.username,
            }
        },{new:true}).select("-password");

        res.status(200).json(updatedUser);
        
});

const getAllUsers = asynchandler(
    async(req,res)=>{
    const users= await User.find().select("-password");
    res.status(200).json(users);    
});

const getUserById = asynchandler(
    async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password");
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({message:'user not found'});
    }
    
 
});

const deleteUser= asynchandler(
    async(req,res,)=>{
    const user = await User.findById(req.params.id).select("-password");
    if(user){
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'user has been deleted succesfully !'});
    }else{
        res.status(404).json({message:'user not found'});
    }
});

module.exports={
    deleteUser,getAllUsers,getUserById,updateuser
}