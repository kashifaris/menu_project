const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { Admin } = require("../model/Admin");
const { Restaurant } = require("../model/Restaurant");


exports.createAdmin = async (req, res) => {
  const {email,password,restaurantName}= req.body;
  if(!email || !password || !restaurantName) return res.status(400).json({message:"email,password,restaurantName required"});
  try {
    const admincheck = await Admin.findOne({email});
    if(admincheck){
        return res.status(400).json({"message":"user already exists"})
    }
    const resturantcheck = await Restaurant.findOne({restaurantName});
    if(resturantcheck){
        return res.status(400).json({"message":"Restaurant already exist"})  // can be changed if finds better route
    }
    const restaurant = await new Restaurant({restaurantName:req.body.restaurantName});
    const restdoc= await restaurant.save();
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const admin = new Admin({ ...req.body, password: hashedPassword, salt,restaurantId:restdoc._id});
        const doc = await admin.save();
        req.login(doc, (err) => {
          if (err) {
            res.status(400).text(err);
          } else {
            const token= jwt.sign({id:doc._id},process.env.JWT_SECRET_KEY,{expiresIn: '4h' });
            res.cookie('jwt',token, { expires: new Date(Date.now() + (3600000*4)),httpOnly:true }); //4h
            res.status(201).json(token);
          }
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({err});
  }
};


exports.loginAdmin = async(req, res) => {

  const {email,password} = req.body;
  if(!email || !password){
    return res.status(400).json({message:"email password required"});
  }
  try {
    const admin = await Admin.findOne({email});
    if (!admin) {
      return res.status(400).json({message:"invalid credentials"});
    }
    crypto.pbkdf2(
      password,
      admin.salt, //salt stored in db
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        if (crypto.timingSafeEqual(admin.password, hashedPassword)) {
          const token= jwt.sign({id:admin._id},process.env.JWT_SECRET_KEY,{expiresIn: '4h' });
          res.cookie('jwt',token, { expires: new Date(Date.now() + (3600000*4)),httpOnly:true }); //4h
          return res.status(201).json(token);
        }
        return res.status(400).json({message:"login failed"});
      })

  } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
};

exports.checkAdmin = async (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};

exports.destroySession = (req, res) => {
  req.session.destroy((err)=>{
    console.log(err);
  })
  res.clearCookie('jwt');
  res.json({ message: "success" });
};

