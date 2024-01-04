const express = require('express');
const { createOrder, getUserOrders, updateOrder, getRestaurantOrders } = require('../controller/orderController');
const { checkAuthenticatedAdmin } = require('../config/passportConfig');
const passport = require('passport');

const router= express.Router();

router.post('/create',passport.authenticate('jwtUser'),createOrder)
.get('/user',passport.authenticate('jwtUser'),getUserOrders)
.get('/restaurant',passport.authenticate('jwtAdmin'),checkAuthenticatedAdmin,getRestaurantOrders)
.patch('/:id',passport.authenticate('jwtAdmin'),checkAuthenticatedAdmin,updateOrder)





exports.orderRouter = router