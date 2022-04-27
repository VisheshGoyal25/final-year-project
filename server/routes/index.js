const express=require('express');
const router=express.Router();
const Login=require("./login.js")
const RouteSelection=require("./routeSelection.js")
const passport=require("passport")
const cookieSession = require("cookie-session");
require("dotenv").config()
const checkAuth=require("../middlewares/check_authentication.js")
router.use(
  cookieSession({ name: "session", keys: [process.env.SESSION_KEY], maxAge: 24 * 60 * 60 * 100 })
);
router.use(passport.initialize());
router.use(passport.session());
router.use('/auth',Login);
router.use('/booking',RouteSelection);
module.exports=router;