const asynchandler = require("express-async-handler");
const {User}=require("../models/User");
const jwt =require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require ("nodemailer")




module.exports.getforgotpassword = asynchandler((req,res)=>{
    // render tretourner la page HTML li dkhel view 
    res.render('forgot-password'); 
});

module.exports.sendforgotpaswordlink = asynchandler( async (req,res)=>{
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(404).json({message : "user not found"});
    }
    const secret= process.env.JWT_SECRET_KEY + user.password;
    const token =jwt.sign({email:user.email , id:user.id},secret,{expiresIn: "10m"});
    const link =`http://localhost:5000/password/reset-password/${user._id}/${token}`;
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth :{
            user:process.env.USER_EMAIL,
            pass:process.env.USER_PASS
        }
    });
    const mailOptions={
        from:process.env.USER_EMAIL,
        to:user.email,
        subject:"reset password",
        html:`<div>
                <h4> click on the link below to reset your password </h4>
                <p<${link}</p>
            </div>`
    }
    transporter.sendMail(mailOptions,function(error,success){
        if(error){
            console.log(error);
        }else{
            console.log("email sent:"+success.response);
        }

    });
    res.render("link-sent");

});

module.exports.getresetpassword=asynchandler(async (req,res)=>{
    const user = await User.findById(req.params.userId);
    if(!user){
        return res.status(404).json({ message : ' user note found'});
    }

    const secret = process.env.JWT_SECRET_KEY + user.password
    try{
    jwt.verify(req.params.token,secret);
    res.render('reset-password',{email: user.email});
     
    }catch(error){
        res.status(400).json({message:'error'})
    }

});
module.exports.resetpassword= asynchandler(async (req,res)=>{
    const user = await User.findById(req.params.userId);
    if(!user){
        return res.status(404).json({ message : ' user note found'});
    }
    const secret= process.env.JWT_SECRET_KEY + user.password;
    try{
        jwt.verify(req.params.token,secret);
        const salt = await bcrypt.genSalt(10);
        req.body.password= await bcrypt.hash(req.body.password, salt);
        user.password = req.body.password;

        await user.save();
        res.render("sucess-password");

    }catch(error){
        res.json({message:'error'});
    }
        
});
