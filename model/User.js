const mongoose = require('mongoose');


const userSchema= new mongoose.Schema({
    name:{
        type: String,
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    otp:{
        type:String,
    },
    orders: {
        type:[mongoose.Schema.Types.Mixed]
    },
})

exports.User = mongoose.model("User",userSchema)