const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    products: [{
        productId:  mongoose.Schema.Types.ObjectId,
        variantId:  mongoose.Schema.Types.ObjectId,
        quantity:Number,
        price:Number,
        sellerId: mongoose.Schema.Types.ObjectId,
        status:{
            type:String,
            default:'Order Placed'
        },
        cancelReason:String,
        cancelledOn:{
            type:Date,
            default:Date.now()
        }
    }],
    customerEmail: {
        type: String
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId
    },
    deliveryAddress:
      { type: {
        Address: String,
        District: String,
        City:String,
        PIN: String,
        Landmark: String
    }},
    orderDate:{
        type:Date,
        default:Date.now()
    }
});

const OrderModel = mongoose.model("Orders", orderSchema, "Orders");

module.exports = OrderModel;