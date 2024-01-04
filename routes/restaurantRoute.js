const express= require("express");
const { getAllRestaurants, getRestaurantById, updateRestaurant } = require("../controller/restaurantController");
const passport = require("passport");
const { checkAuthenticatedAdmin } = require("../config/passportConfig");
const router = express.Router();


router.get('/list',getAllRestaurants)
.get('/:id',getRestaurantById)
.patch('/:id',passport.authenticate('jwtAdmin'),checkAuthenticatedAdmin,updateRestaurant)

exports.restaurantRouter= router;


