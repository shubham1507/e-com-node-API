const mongoose = require('mongoose');


const sellerSchema = mongoose.Schema({
    SellerName: {
        type: String,
        required: true
    },
    CompanyName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Mobile1: {
        type: Number
    },
    Mobile2: {
        type: Number
    },
    CompanyAddress: {
        type: String,
        required: true
    },
    District: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    InsertRights: {
        type:Boolean
    },
    InsertDate: {
        type: Date,
        default: new Date()
    }
});

const SellerModel = mongoose.model("Vendors", sellerSchema, "Vendors");

module.exports = SellerModel;