const express= require('express');
const { createOTP, verifyOTP, checkLogedUser, logout } = require('../controller/userController');
const passport = require('passport');
const router= express.Router();


router.post('/otp',createOTP)
.post('/login',verifyOTP)
.get('/check',passport.authenticate('jwtUser'),checkLogedUser)
.post('/logout',logout)


exports.userRouter=router;