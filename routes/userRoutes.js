let express = require("express");
let router = new express.Router();
let {isEmail,CheckAccount}= require('./../middlewares/index');
let {signUp,logIn} = require('./../src/users/Controllers');
router.post("/users", isEmail,signUp);
router.post("/users/login",CheckAccount,logIn);

module.exports = router;