const mongoose = require('mongoose');


const addsSchema= new mongoose.Schema({
    name:{
        type:String
    },
    restaurantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    image:{
        type:String,
        required: true
    },
})

exports.Adds = mongoose.model("Adds",addsSchema)