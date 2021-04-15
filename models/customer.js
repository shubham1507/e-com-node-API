const jwt = require("jsonwebtoken");
const Joi = require('joi');
const mongoose = require('mongoose');
const keys = require("../config/default.json");

const customerSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    LastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    Email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    Contact: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    AltContact: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    Addresses: {
        type: [{
            Address: String,
            District: String,
            City:String,
            PIN: String,
            Landmark: String
        }],
    }
});


const CustomerModel = mongoose.model('Customer', customerSchema,'Customers');

module.exports = CustomerModel;