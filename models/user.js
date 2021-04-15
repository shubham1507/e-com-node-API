const jwt = require("jsonwebtoken");
const Joi = require('joi');
const mongoose = require('mongoose');
const keys = require("../config/default.json");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        minlength: 2,
        maxlength: 1024
    },
    role: {
        type: Number,
        required: true
    },
    setupDone:{
        type:Boolean,
        default:false
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        name: this.name,
        role: this.role
    }, keys.jwtKey);
    return token;
}

const User = mongoose.model('User', userSchema,'users');

function validateUser(user) {
    const joiUser = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).email().required(),
        password: Joi.string().min(3).max(255).required(),
        role: Joi.required()
    });

    return joiUser.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;