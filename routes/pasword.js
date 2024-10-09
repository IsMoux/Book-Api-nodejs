const express = require("express");
const { getforgotpassword, sendforgotpaswordlink, getresetpassword, resetpassword } = require("../controlls/passwordController");
const router =express.Router();

// password/forgot-password
router.route("/forgot-password")
.get(getforgotpassword)
.post(sendforgotpaswordlink)

//password/reset-password/:user_id/:token

router.route("/reset-password/:userId/:token").get(getresetpassword)
.post(resetpassword);
module.exports=router;