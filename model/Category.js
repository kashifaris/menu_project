const mongoose = require('mongoose');


const categorySchema= new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type: String
    },
    image:{
        type:String
    },
    restaurantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
})

exports.Category = mongoose.model("Category",categorySchema)