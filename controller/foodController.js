const { uploadOnCloudinary } = require("../config/cloudinaryConfig");
const { Food } = require("../model/Food");



exports.addFood= async(req,res)=>{
    try{
        console.log(req.file);
        const {restaurantId}= req.user;
        if(!req.file || !req.file.path){
            return res.status(400).json({message:"no image sent"});
        }
        const image= await uploadOnCloudinary(req.file.path);
        const food= await new Food({...req.body,restaurantId,image});
        const doc= await food.save();
        res.status(200).json(doc);
    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}

exports.getRestaurantAllFood= async(req,res)=>{
    try{
        const {id}= req.params;
        const foods= await Food.find({restaurantId:id});
        res.status(200).json(foods);
    } catch(err){
        res.status(400).json(err);
    }
}


exports.getFoodByName= async(req,res)=>{
    try{
        const {restaurantId,name}= req.body;
        if(!name || !restaurantId) return res.status(400).json({message: "name and restaurantId required"})
        let food= Food.find({restaurantId});
        const regex = new RegExp(name, 'i') // i for case insensitive
        food = food.find({name:{$regex:regex}});
        const doc= await food.exec();
        res.status(200).json(doc);
    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}

exports.getFoodByCategory= async(req,res)=>{
    try{
        const {restaurantId,category}= req.body;
        if(!category || !restaurantId) return res.status(400).json({message: "category and restaurantId required"})
        let food= Food.find({restaurantId});
        food = food.find({category});
        const doc= await food.exec();
        console.log(doc);
        res.status(200).json(doc);
    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}


exports.getFoodByBestseller= async(req,res)=>{
    try{
        const {restaurantId}= req.body;
        if(!restaurantId) return res.status(400).json({message: "restaurantId required"})
        let food= Food.find({restaurantId});
        food = food.find({bestSeller:true});
        const doc= await food.exec();
        res.status(200).json(doc);
    } catch(err){
        res.status(400).json(err);
    }
}


//requires id params
exports.getFoodById = async(req,res)=>{
    try{
        const {id}= req.params;
        const food= await Food.findById(id);
        res.status(200).json(food);
    } catch(err){
        res.status(400).json(err);
    }
}


//requires id params
exports.updateFood= async(req,res)=>{
    try{
        const {id}= req.params;
        const checkfood= await Food.findById(id);
        if(checkfood.restaurantId.toString()!==req.user.restaurantId.toString()){
            return res.status(400).json({message:"unautherised"})
        }
        const food= await Food.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(food);
    } catch(err){
        res.status(400).json(err);
    }
}