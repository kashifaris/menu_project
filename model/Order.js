const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  items: {
    type: [Schema.Types.Mixed],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  totalBill: { 
    type: String,
    required: true,
  },
  totalItems: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  date:{
    type:String,
    required:true
  }

});



exports.Order = mongoose.model("Order", orderSchema);
