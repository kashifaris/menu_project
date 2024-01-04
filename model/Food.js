const mongoose = require('mongoose');


const foodSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
        required:true
    },
    description:{
        type: String
    },
    image:{
        type:String
    },
    veg: {
        type:Boolean,
    },
    rating: {
        type:Number,
        min:[0,"minimum rating allowed is 0"],
        max:[5,"maximum rating allowed is 5"],
    },
    bestSeller: {
        type:Boolean,
    },
    outOfStock: {
        type:Boolean,
    },
    price:{
        type:Number
    },
    type:{
        type:String,
        default:"regular"
    },
    cookTime:{
        type:String
    },
    category:{
        type:String
    }
     

})

exports.Food = mongoose.model("Food",foodSchema)