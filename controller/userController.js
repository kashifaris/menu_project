const { generateOTP, sendOtp } = require("../config/otpConfig");
const { User } = require("../model/User");
const jwt = require('jsonwebtoken')

//it sets teh otp in db and calls F2SMS
exports.createOTP= async (req,res)=>{
    console.log("createOTP api called");
    try{
        const {phone}= req.body;
        const user = await User.findOne({phone});
        //const otp= generateOTP(4); 
        const otp= "4444"
        if(!user){
          const doc= new User({phone});
            await doc.save();
        }
        const user1 = await User.findOne({phone});
        user1.otp= otp;
        await user1.save();
        //sendOtp(phone,otp);
        res.status(200).json({message:"OTP sent"})
    }
    catch(err){
        res.status(400).json(err);
    }
}

//final login and sets the jwt handles singup
exports.verifyOTP= async (req,res)=>{
    try{
        const user= await User.findOne({phone:req.body.phone});
        if(!user || user.otp !== req.body.otp){
            return res.status(400).json({message:"wrong OTP"});
        }
        // only takes serializable data 
        const token= jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn: '4h' });
        res.cookie('jwt',token, { expires: new Date(Date.now() + (3600000*4)),httpOnly:true }); //4h
        return res.status(200).json(token);
    }catch(err){
        res.status(400).json({err});
    }
}

exports.checkLogedUser=(req,res)=>{
    if(req.user){
        res.status(200).json(req.user);
      } else{
        res.status(400)
      }
}

exports.logout= (req,res)=>{
    req.logout((err)=>{
        if(err){
            console.log(err);
        }
    })
    res.clearCookie('jwt');
    //res.end()
    res.status(200).json({message:"cookie cleared"})
}