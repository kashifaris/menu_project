const express= require('express');
const passport = require('passport');
const { createAdmin, loginAdmin, checkAdmin, destroySession } = require('../controller/adminController');
const { checkAuthenticatedAdmin } = require('../config/passportConfig');
const router= express.Router();




router.post("/signup",createAdmin)
.post('/login',loginAdmin)
.get('/check',passport.authenticate('jwtAdmin'),checkAuthenticatedAdmin,checkAdmin)
.post('/logout',destroySession)


exports.adminRouter=router;