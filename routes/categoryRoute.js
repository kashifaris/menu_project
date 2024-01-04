const express= require("express");
const {deleteRestaurantCategory, addRestaurantCategory, getAvailabeCategories, getRestaurantCategories } = require("../controller/categoryController");
const { checkAuthenticatedAdmin } = require("../config/passportConfig");
const passport = require("passport");
const router = express.Router();


router.get('/:id',getRestaurantCategories) //requires restaurant id
.post('/add',passport.authenticate('jwtAdmin'),checkAuthenticatedAdmin,addRestaurantCategory) 
.delete('/remove/:id',passport.authenticate('jwtAdmin'),checkAuthenticatedAdmin,deleteRestaurantCategory) // requires category id of restaurant category 

exports.categoryRouter= router;


