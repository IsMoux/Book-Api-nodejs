const express = require("express");
const {Author,validateCreateAuthor,validateUpdateAuthor}= require("../models/Author");
const router =express.Router();
const joi = require("joi");
const asyncHandler=require("express-async-handler");
const {verifyTokenAndAdmin}=require("../middlewares/verifytoken")


const getAllAuthors= asyncHandler(
    async (req,res)=>{

        //const authorsList = await Author.find().sort({firstname:1}).select("firstname age -_id");
        const authorsList = await Author.find()
        res.status(200).json(authorsList);
    }
   
);

const getAuthorById= asyncHandler(

    async(req,res)=>{const author = await Author.findById(req.params.id);
    if(author){
        res.status(200).json(author);
    }else{
        res.status(404).json({ message : "author not found "});
    }

});

const createAuthor= asyncHandler(
    async (req,res)=>{
    const {error }= validateCreateAuthor(req.body);

    if(error){
        return res.status(400).json({ message : error.details[0].message});
    }

    const author =new Author({
        firstname:req.body.firstname,
        age:req.body.age,
        nationality:req.body.nationality,
    });

    const result = await author.save();
    res.status(201).json(result);
 
});

const updateAuthor= asyncHandler(
    async(req,res)=>{
    const {error} =validateUpdateAuthor(req.body);
    if(error){
     return res.status(400).json({message: error.details[0].message});
    }
  
    const author = await Author.findByIdAndUpdate(req.params.id,{
     $set:{
         firstname:req.body.firstname,
         age:req.body.age,
         nationality:req.body.nationality
     }
    },{new:true})
    
    res.status(200).json(author);
  
 });

 const deleteAuthor = asyncHandler(
    async (req,res)=>{

    const author = await Author.findById(req.params.id);
    if(author){
        await Author.findByIdAndDelete(req.params.id);
     return res.status(200).json({message: " author has been deleted"});
    }else{
     return res.status(404).json({message:" author not found"});
    }


 });

 module.exports={
    getAllAuthors,getAuthorById,createAuthor,deleteAuthor,updateAuthor
 }