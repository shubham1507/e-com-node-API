const express = require("express");
const router = express.Router();
const SellerModel = require('../models/seller');
const {
    User,
    validate
} = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


router.post("/insertSeller", async (req, res) => {
   console.log("Add Seller",req.body)
   let seller=await SellerModel.findOne({Email:req.body.email}).lean();

   if(!seller){
       let insertSeller = new SellerModel({
        SellerName:req.body.VendorName,
        CompanyName:req.body.CompanyName,
        Email:req.body.email,
        Mobile1:req.body.phone1,
        Mobile2:req.body.phone2,
        CompanyAddress:req.body.Address,
        District:req.body.District,
        State:req.body.State,
        InsertRights:req.body.rights
       })

       insertSeller=await insertSeller.save();

       user = new User({
        name: req.body.VendorName,
        email: req.body.email,
        password: req.body.email,
        role: 2,
        setupDone:true
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    res.send(insertSeller)
   }
   else{
       res.status(403).send('Seller with same Email already exists')
   }

});

module.exports=router
