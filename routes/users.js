const express=require("express");
const router=express.Router();
const asynchandler=require("express-async-handler");

const {deleteUser,getAllUsers,getUserById,updateuser} =require("../controlls/usersControllers")
const {verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorization} = require("../middlewares/verifytoken");


router.route("/").get(verifyTokenAndAdmin,getAllUsers);

router.route("/:id").put(verifyTokenAndAuthorization,updateuser)
    .get(verifyTokenAndAuthorization,getUserById)
    .delete(verifyTokenAndAuthorization,deleteUser);

module.exports=router;