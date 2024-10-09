const express = require("express");
const Joi=require("joi");
const router = express.Router();
const {validateCreatedBook,validateUpdatedBook,Book}=   require("../models/Book");
const asynchandler= require("express-async-handler");
const {verifyTokenAndAdmin}=require("../middlewares/verifytoken");
const { getAllBooks, getBookById ,createBook,updateBook, deleteBook} = require("../controlls/bookController");


//DOCUMENTATION OF ENDPOINT

/**
 * @desc GET ALL BOOKS
 * @access public
 * @method GET
 * @route /api/books
 * 
 */

// api/books
router.route("/")
    .get(getAllBooks)
    .post(verifyTokenAndAdmin,createBook);

// api/books/:id
router.route("/:id")
    .get(getBookById).put(verifyTokenAndAdmin,updateBook)
    .delete(verifyTokenAndAdmin,deleteBook);

    
module.exports = router;