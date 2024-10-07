const express = require("express");
const Joi=require("joi");
const router = express.Router();
const {validateCreatedBook,validateUpdatedBook,Book}=   require("../models/Book");
const asynchandler= require("express-async-handler");
const {verifyTokenAndAdmin}=require("../middlewares/verifytoken")


//DOCUMENTATION OF ENDPOINT

/**
 * @desc GET ALL BOOKS
 * @access public
 * @method GET
 * @route /api/books
 * 
 */

router.get("/",asynchandler(
    async (req,res)=>{
    const books = await Book.find().populate("author",["_id","firstname","age"])
    res.status(200).json(books);
}));


router.get("/:id",asynchandler(
    async (req,res)=>{
        const book = await Book.findById(req.params.id).populate("author");
    if(book){
        res.status(200).json(book)
    }else{
        res.status(404).json({message :' book not found'})
    }
    }
));

router.post("/",verifyTokenAndAdmin,asynchandler(
    async (req,res)=>{

        const {error}= validateCreatedBook(req.body);
        if (error){
           return res.status(400).json({ message : error.details[0].message});
        }
  
        const book =new Book ({
            title:req.body.title,
            author:req.body.author,
            description:req.body.description,
            price:req.body.price,
            cover:req.body.cover
            }
        )
        const result = await book.save();
        res.status(201).json(result);

    }
  
));


router.put("/:id",verifyTokenAndAdmin,asynchandler(
    async (req,res)=>{
        const { error}=validateUpdatedBook(req.body);
    if(error){
        return res.status(400).json({ message: "can't update book"});
    }
        const book = await Book.findByIdAndUpdate(req.params.id,{
            $set:{
                title:req.body.title,
                author:req.body.author,
                description:req.body.description,
                price:req.body.price,
                cover:req.body.cover

            }
        },{new:true});

        res.status(200).json(book);

    }
    
));

router.delete("/:id",verifyTokenAndAdmin,asynchandler(
    async (req,res)=>{
    const book = await Book.findById(req.params.id);
    if(book){   
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'book has been deleted'});     
    }else{
        res.status(404).json({ message: "book has benn not found"});
    }

    }

));


module.exports = router;