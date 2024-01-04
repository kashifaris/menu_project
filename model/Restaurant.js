const mongoose = require('mongoose');


const restaurantSchema= new mongoose.Schema({
    restaurantName:{
        type: String,
        required:true
    },
    address:{
        type: String
    },
    addressLink:{
        type:String
    },
    description: {
        type:String,
    },
    fbLink: {
        type:String,
    },
    instaLink: {
        type:String,
    },
    contact:{
        type:[String]
    },
    openingTime:{
        type:String
    },
    closingTime:{
        type:String
    }

})

exports.Restaurant = mongoose.model("Restaurant",restaurantSchema)