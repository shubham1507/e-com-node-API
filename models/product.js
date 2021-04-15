const mongoose = require('mongoose');
const reviewModel = require('./productReview')
const variantsModel = require('./variants')


const productSchema = mongoose.Schema({
    ProductName: {
        type: String,
        required: true
    },

    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    CategoryPath: {
        type: [String]
    },
    Price: {
        type: Number
    },
    Images: {
        type: [String]
    },
    VendorId: {
        type: mongoose.Schema.Types.ObjectId
    },
    Description: {
        type: String
    },
    InsertedBy: {
        type: mongoose.Schema.Types.ObjectId
    },
    UpdatedBy: {
        type: mongoose.Schema.Types.ObjectId
    },
    UpdatedOn: {
        type: Date
    },
    MoreProps: [{
        name: String,
        value: String,
        isBuyCriteria: Boolean
    }],

    CategoryRank: {
        type: Number
    },
    IsFeatured: {
        type: Boolean
    },
    Brand: {
        type: String
    },
    ReviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: reviewModel
    },
    VariantIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: variantsModel
    },
    Tags: [String]
});

console.log(MoreProps)

const ProductModel = mongoose.model("Products", productSchema, "Products");

module.exports = ProductModel;