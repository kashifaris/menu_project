const { Order } = require("../model/Order");


exports.getUserOrders = async (req, res) => {
  const userId = req.user._id;
  try {
    const orders = await Order.find({userId})
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getRestaurantOrders = async (req, res) => {
    const {restaurantId} = req.user;
    try {
      const orders = await Order.find({restaurantId})
      res.status(200).json(orders);
    } catch (err) {
      res.status(400).json(err);
    }
  };


exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id
    const order = new Order({...req.body,userId});
    const doc = await order.save();
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};


exports.updateOrder = async (req, res) => {
    try {
      const {id} = req.params;
      const checkorder = await Order.findById(id);
      if(checkorder.restaurantId.toString()!==req.user.restaurantId.toString()){
        return res.status(400).json({message:"unautherised"});
      }
      const order = await Order.findByIdAndUpdate(id,req.body,{new:true})
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json(err);
    }
  };
