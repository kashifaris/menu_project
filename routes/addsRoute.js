const express= require("express");
const { getAllAdds, removeAdd, createAdd } = require("../controller/addsController");
const { checkAuthenticatedAdmin } = require("../config/passportConfig");
const passport = require("passport");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: 'uploads/' })


router.get('/list/:id',getAllAdds)
.post('/create',passport.authenticate('jwtAdmin'),checkAuthenticatedAdmin,upload.single('image'),createAdd)
.delete('/remove/:id',passport.authenticate('jwtAdmin'),checkAuthenticatedAdmin,removeAdd)

exports.addsRouter= router;


