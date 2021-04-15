const mongoose = require('mongoose');


const cartSchema = mongoose.Schema({
    products: [{
        productId:  mongoose.Schema.Types.ObjectId,
        variantId:  mongoose.Schema.Types.ObjectId,
        quantity:Number,
        price:Number,
        sellerId: mongoose.Schema.Types.ObjectId,
        Images: {
        type: [String]
    }
    }],
    customerEmail: {
        type: String
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId
    }
});

const CartModel = mongoose.model("Cart", cartSchema, "Cart");

module.exports = CartModel;