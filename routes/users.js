const authMiddleware = require("../midddleware/authMiddleware");
const {
    User,
    validate
} = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    //validate request body
    console.log('Register called',req.body)
    const {
        error
    } = validate(req.body);
    if (error)
        return res.status(400).send(
            error.details.map((err) => {
                return err.message;
            })
        );

    //Check if user already exists
    let user = await User.findOne({
        email: req.body.email,
    });
    if (user) return res.status(400).send("User already registered");

    //Register user
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();
    const token = user.generateAuthToken();

    res.send({
        id: user._id,
        name: user.name,
        email: user.email,
        token:token
    });
});

router.get("/testRoleAuth", authMiddleware, async (req, res) => {
    if (req.user.role != 1)
        return res.status(403).send("Only admin can access this resource");
    res.send("access ok");
});

router.get("/getCurrentUser", authMiddleware, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
});

module.exports = router;