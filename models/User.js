const mongoose=require("mongoose");
const joi= require("joi");
const jwt = require ("jsonwebtoken");



const UserSchema= new mongoose.Schema(
    {
        email:{
            type:String,
            minlength:5,
            trim:true,
            required:true,
            maxlength:100,
            unique:true,
           
        },
        username:{
            type:String,
            minlength:5,
            maxlength:100,
            trim:true,
        },
        password:{
            type:String,
            required:true,
            minlength:6,
            trim:true
        },
        isAdmin:{
            type:Boolean,
            default:false
        }
    },{timestamps:true});

UserSchema.methods.generateToken= function(){
    token = jwt.sign({id:this._id, isAdmin:this.isAdmin},process.env.JWT_SECRET_KEY,{expiresIn:"30d"});
    return token
}
// user model
    
const User = mongoose.model("User",UserSchema);

// valoidate register User
function validationRegisterUser(obj){
    const schema= joi.object({
        email:joi.string().trim().min(5).max(100).required(),
        username:joi.string().trim().min(5).max(100).required(),
        password: joi.string().trim().min(6).required(),

    });
    return schema.validate(obj);
}

// validate login Usr
function validationLOginUser(obj){
    const schema= joi.object({
        email:joi.string().trim().min(5).max(100).required(),
        password: joi.string().trim().min(6).required(),
    });
    return schema.validate(obj);
}
function validatechangepassword(obj){
    const schema= joi.object({
        password: joi.string().trim().min(6).required(),
    });
    return schema.validate(obj);
}
// validate update user
function validationUpdatedUser(obj){
    const schema= joi.object({
        email:joi.string().trim().min(5).max(100),
        username:joi.string().trim().min(5).max(100),
        password: joi.string().trim().min(6),

    });
    return schema.validate(obj);
}


module.exports = {
       User, validationLOginUser,validationRegisterUser,validationUpdatedUser,validatechangepassword
}