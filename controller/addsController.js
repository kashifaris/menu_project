const { uploadOnCloudinary } = require("../config/cloudinaryConfig");
const { Adds } = require("../model/Adds");


//uses id params
exports.createAdd= async(req,res)=>{
    try{
        const {restaurantId}= req.user;
        if(!req.file || !req.file.path){
            return res.status(400).json({message:"no image sent"});
        }
        const image= await uploadOnCloudinary(req.file.path);
        const adds = await new Adds({restaurantId,image});
        const doc= await adds.save();
        res.status(200).json(doc);
    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}


exports.getAllAdds= async(req,res)=>{
    try{
    let restaurantId
    if(req.user) restaurantId= req.user.restaurantId;
    else if(req.params.id) restaurantId = req.params.id;
    if(!restaurantId){
        return res.status(400).json({message:"restaurentId required"})
    }
    const add= await Adds.find({restaurantId});
    res.status(200).json(add);
    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}


exports.removeAdd= async(req,res)=>{
    console.log("deleteADD called");
    try{
        const {id}= req.params;
        const add= await Adds.findByIdAndDelete(id);
        res.status(200).json(add);
    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}