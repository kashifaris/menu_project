const mongoose = require('mongoose');


const adminSchema= new mongoose.Schema({
    name:{
        type: String,
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:Buffer,
        required:true
    },
    isAdmin: {
        type:Boolean,
        required:true,
        default:true
    },
    salt: {
        type:Buffer,
        required:true,
    }

})

exports.Admin = mongoose.model("Admin",adminSchema)