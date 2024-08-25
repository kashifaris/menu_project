const LocalStrategy = require('passport-local').Strategy;
const { Admin } = require('../model/Admin');
const { User } = require("../model/User");
const crypto = require("crypto");
const jwt = require('jsonwebtoken')
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require('dotenv').config();


const cookieExtractor = function(req){
  let token = null;
  if(req && req.cookies){
    token = req.cookies['jwt'];
  }
  return token;
}
// JWT options
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;




//not using anymore
exports.initializingPassport = (passport) => {
  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async function (email, password, done) {
        try {
          const admin = await Admin.findOne({email});

          if (!admin) {
            return done(null, false, { message: "no user Exists" });
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
                 return done(null,{token}); // send user & calls teh serializer
              }
              return done(null, false, { message: "invalid credentials" });
            })

        } catch (err) {
            console.log(err);
          done(err,false);
        }
      }
    )
  );


    //using this strategy for User
    passport.use(
      "jwtUser",
      new JwtStrategy(opts, async function (jwt_payload, done) {
       // console.log(jwt_payload);
        try {
          const user = await User.findById(jwt_payload.id);
          if (user) {
            return done(null,user); 
          } else {
            return done(null, false);
          }
        } catch (err) {
          return done(err, false);
        }
      })
    );

  //using this strategy for Admin
  passport.use(
    "jwtAdmin",
    new JwtStrategy(opts, async function (jwt_payload, done) {
     // console.log(jwt_payload);
      try {
        const admin = await Admin.findById(jwt_payload.id);
        if (admin) {
          return done(null,admin); 
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );

  //this attach the user to req.session.passport.user
passport.serializeUser((user,done)=> {
 // console.log("serializer called",user);
  done(null,user.id);
  });
  

// this creates req.user  
passport.deserializeUser(async(userId, done)=> {
 //   console.log("dserializer called");
    try{
        const user = await User.findById(userId);
        if(user){
            done(null,user);
        }
        else{
        const admin = await Admin.findById(userId);
        done(null,admin);
        }
    } catch(err){
        done(err,false);
    }
  });


};


exports.checkAuthenticatedAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) { return next() }
  res.status(400).json({message:"unautherised"})
}



