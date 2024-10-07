        const { Timestamp } = require("bson");
const { required, number, string } = require("joi");
const mongoose =require("mongoose");
const joi = require("joi");



const AuthorSchema=new mongoose.Schema({

    firstname:{
        type: String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:25,
    },
    age:{
        type: Number,
        required:true,
        min: 0,
        max: 110,

    },
    nationality:{
        type:String,
        trim:true,
        required:true,
        minlength:4,
        maxlength:25,
        default:"algeria",
    }
},{
    timestamps:true
});

const Author = mongoose.model("Author",AuthorSchema);

function validateCreateAuthor(obj){
    const schema = joi.object({
        firstname:joi.string().min(4).max(25).trim().required(),
        age:joi.number().min(0).max(110).required(),
        nationality:joi.string().trim().max(25).min(3).required()

    })
    return schema.validate(obj);
}

function validateUpdateAuthor(obj){
    const schema = joi.object({
        firstname:joi.string().min(4).max(25).trim(),
        age:joi.number().min(0).max(110),
        nationality:joi.string().trim().max(25).min(3)

    })
    return schema.validate(obj);
}

module.exports={
    Author,validateCreateAuthor,validateUpdateAuthor
}       