const express = require("express");
const asynchandler= require("express-async-handler");
const router= express.Router();
const bcrypt=require("bcryptjs")
const {User ,validationLOginUser,validationRegisterUser} = require("../models/User");
const jwt = require ("jsonwebtoken");
const{login,register}=require("../controlls/authoController")


router.post("/register",register);

router.post("/login",login);

module.exports =router;