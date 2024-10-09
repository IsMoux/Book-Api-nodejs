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

const getBookById = asynchandler(
    async (req,res)=>{
        const book = await Book.findById(req.params.id).populate("author");
    if(book){
        res.status(200).json(book)
    }else{
        res.status(404).json({message :' book not found'})
    }
    }
)

const createBook = asynchandler(
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
)
const updateBook= asynchandler(
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
)

const deleteBook= asynchandler(
    async (req,res)=>{
    const book = await Book.findById(req.params.id);
    if(book){   
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'book has been deleted'});     
    }else{
        res.status(404).json({ message: "book has benn not found"});
    }

    }

)


module.exports={
    getAllBooks,getBookById,createBook,updateBook,deleteBook
}