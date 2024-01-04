const express= require("express");
const {getFoodByName, getFoodByCategory, addFood, updateFood, getFoodByBestseller, getFoodById, getRestaurantAllFood } = require("../controller/foodController");
const router = express.Router();
const multer  = require('multer');
const { checkAuthenticatedAdmin } = require("../config/passportConfig");
const passport = require("passport");
const upload = multer({ dest: 'uploads/' })


router.get('/list/:id',getRestaurantAllFood) //all food of perticular restaurent
.get('/:id',getFoodById)
.post('/name',getFoodByName)
.post('/category',getFoodByCategory)
.post('/bestseller',getFoodByBestseller)
.post('/add',passport.authenticate('jwtAdmin'),checkAuthenticatedAdmin,upload.single('image'),addFood) 
.patch('/:id',passport.authenticate('jwtAdmin'),checkAuthenticatedAdmin,updateFood)

exports.foodRouter= router;


