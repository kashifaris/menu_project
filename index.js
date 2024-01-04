const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require('passport');
const expressSession = require('express-session')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const { initializingPassport } = require("./config/passportConfig");
const { userRouter } = require("./routes/userRoute");
const { connectMongo } = require("./config/mongoConfig");
const { adminRouter } = require("./routes/adminRoute");
const { restaurantRouter } = require("./routes/restaurantRoute");
const { categoryRouter } = require("./routes/categoryRoute");
const { foodRouter } = require("./routes/foodRoute");
const { orderRouter } = require("./routes/orderRoute");
const { addsRouter } = require("./routes/addsRoute");
const { initializeCloudinary } = require("./config/cloudinaryConfig");
const cloudinary = require('cloudinary').v2




app.use(express.json());  //to parse req.body to json
app.use(expressSession({secret:process.env.SESSION_SECRET_KEY,resave:false,saveUninitialized:false}));
app.use(passport.session());

initializingPassport(passport);
initializeCloudinary(cloudinary);
connectMongo(mongoose);




//api
app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/restaurant',restaurantRouter);
app.use('/category',categoryRouter);
app.use('/food',foodRouter);
app.use('/order',orderRouter);
app.use('/adds',addsRouter);




app.listen(process.env.PORT, () => {
  console.log("server started at port no: "+process.env.PORT);
});
