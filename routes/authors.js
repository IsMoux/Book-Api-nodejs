const express = require("express");
const {Author,validateCreateAuthor,validateUpdateAuthor}= require("../models/Author");
const router =express.Router();
const joi = require("joi");
const asyncHandler=require("express-async-handler");
const {verifyTokenAndAdmin}=require("../middlewares/verifytoken");
const { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require("../controlls/authorsController");

// api/authors
router.route("/").get(getAllAuthors).post(createAuthor);

// api/authots/;id
router.route("/:id").get(getAuthorById).put(verifyTokenAndAdmin,updateAuthor).delete(verifyTokenAndAdmin,deleteAuthor);

module.exports=router; 