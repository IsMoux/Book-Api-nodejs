const asynchandler = require("express-async-handler");
const {validateCreatedBook,validateUpdatedBook,Book}=require("../models/Book");

const getAllBooks = asynchandler(
    async (req,res)=>{
    // $eq(equal) $ne (not equal) $lt (less than)
    // $lte (less than and equal)
    // $gt (greater than)
    // $gte (greater than and equal)
    // $in [7,10]
    // $nin [7,12]
    const {minPrice,maxPrice}=req.query;
    if(minPrice && maxPrice){
        books = await Book.find({price:{$gte:minPrice,$lte:maxPrice}}).populate("author",["_id","firstname","age"])
            
    }else{
        books= await Book.find().populate("author",["_id","firstname","age"])
    }
    res.status(200).json(books);
});

const getBookById= asynchandler(
    async (req,res)=>{
        const book = await Book.findById(req.params.id).populate("author");
    if(book){
        res.status(200).json(book)
    }else{
        res.status(404).json({message :' book not found'})
    }
    }
)













module.exports={
    getAllBooks,getBookById
}