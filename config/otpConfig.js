const unirest = require("unirest");


exports.sendOtp = (phone,otp)=>{
    const req = unirest("GET", process.env.F2SMS_UNIREST_URL);

  req.query({
    "authorization":process.env.F2SMS_API_KEY,
    "variables_values": otp,
    "route": "otp",
    "numbers": phone
  });
  
  req.headers({
    "cache-control": "no-cache"
  });
  
  req.end(function (res) {
    if (res.error) console.log(res.error);
  
    console.log(res.body);
  });
}

exports.generateOTP = (otp_length) => {
    // Declare a digits variable
    // which stores all digits
    let digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < otp_length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };