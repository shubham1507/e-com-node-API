const bcrypt = require("bcrypt");
const asyncErrorMiddleware = require('../midddleware/asyncErrorsMiddleware');
const {
    User
} = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const router = express.Router();

router.post("/", async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error)
        return res.status(400).send(
            error.details.map((err) => {
                return err.message;
            })
        );

    let user = await User.findOne({
        email: req.body.email,
    });

    if (!user) return res.status(400).send("Invalid Credentials");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).send("Invalid Credentials");
    
    const token = user.generateAuthToken();
    res.send({token:token,user:{email:user.email,name:user.name,role:user.role}});
});

function validate(req) {
    const joiUser = Joi.object({
        email: Joi.string().min(3).max(255).email().required(),
        password: Joi.string().min(3).max(255).required(),
    });

    return joiUser.validate(req);
}

module.exports = router;