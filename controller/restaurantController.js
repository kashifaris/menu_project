const { Restaurant } = require("../model/Restaurant")


exports.getAllRestaurants= async(req,res)=>{
    try{
    const restaurant= await Restaurant.find({});
    res.status(200).json(restaurant);
    } catch(err){
        res.status(400).json(err);
    }
}


//uses id params
exports.getRestaurantById= async(req,res)=>{
    try{
        const {id}= req.params;
        const restaurant = await Restaurant.findById(id);
        res.status(200).json(restaurant);
    } catch(err){
        res.status(400).json(err);
    }
}


//uses id params
exports.updateRestaurant= async(req,res)=>{
    try{
        const {id}= req.params;
        const restaurant= await Restaurant.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(restaurant);
    } catch(err){
        res.status(400).json(err);
    }
}