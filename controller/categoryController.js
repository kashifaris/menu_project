const { Category } = require("../model/Category");



exports.addRestaurantCategory= async(req,res)=>{
    try{
        const {restaurantId}= req.user;
        const category = await new Category({...req.body,restaurantId});
        const doc= await category.save();
        res.status(200).json(doc);
    }
    catch(err){
        res.status(400).json(err);
    }
}

exports.getRestaurantCategories= async(req,res)=>{
    try{
        const {id}= req.params; //requires restaurent ID
        const categories = await Category.find({restaurantId:id});
        res.status(200).json(categories);
    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}


// uses id params
exports.deleteRestaurantCategory= async(req,res)=>{
    try{
        const {id}= req.params;
        const checkCategory = await Category.findById(id);
        if(checkCategory.restaurantId.toString()!==req.user.restaurantId.toString()){
          return res.status(400).json({message:"unautherised"});
        }
        const restaurant= await Category.findByIdAndDelete(id);
        res.status(200).json(restaurant);
    } catch(err){
        res.status(400).json(err);
    }
}