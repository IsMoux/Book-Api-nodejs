const express = require("express");
const asynchandler= require("express-async-handler");
const router= express.Router();
const bcrypt=require("bcryptjs")
const {User ,validationLOginUser,validationRegisterUser} = require("../models/User");
const jwt = require ("jsonwebtoken");


router.post("/register",asynchandler(
    async (req,res)=>{ 
        const {error}=validationRegisterUser(req.body);
        if(error){
        return res.status(400).json({message : error.details[0].message});
        }

        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({ message :"this user already registred"});
        }

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt);

         user = new User({
            email: req.body.email,
            username:req.body.username,
            password:req.body.password,
            
         });
         const result = await user.save();
         const token = user.generateToken();
         const {password,...other} = result._doc;
         res.status(201).json({...other, token});
}));

router.post("/login",asynchandler(
    async (req,res)=>{
    const {error} = validationLOginUser(req.body);
    if(error){
        return res.status(400).json({message : error.details[0].message});
    }
    let user = await User.findOne({ email: req.body.email});
    if (!user){
        return res.status(400).json({message :"invalide email or password"});
    }
    
    const isPasswordMatch= await bcrypt.compare(req.body.password,user.password);
    if(!isPasswordMatch){
        return res.status(400).json({message:" invalide password  or email!"});
    }
    const token = user.generateToken();
    const {password,...other} = user._doc;
    return res.status(200).json({...other,token});
}));

module.exports =router;