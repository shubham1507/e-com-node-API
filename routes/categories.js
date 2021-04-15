const authMiddleware = require("../midddleware/authMiddleware");
const NavbarModel = require('../models/category');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/insertCategory", async (req, res) => {
    //validate request body
    // const {
    //     error
    // } = validate(req.body);
    // if (error)
    //     return res.status(400).send(
    //         error.details.map((err) => {
    //             return err.message;
    //         })
    //     );
    let docCount = await NavbarModel.findOne().sort({ value: -1 }).limit(1);
    let valueCount = 0;
    if (docCount) {
        valueCount = docCount.value;
    }

    returnArr = [];
    if (req.body.length > 0) {
        const validate = await NavbarModel.find({ label: { $in: req.body.map(i => { return i.label }) } })
        if (validate.length > 0) return res.status(400).send(validate.map(j => { return j.label + " already exists. No categories added." }))

        req.body.map(cat => {
            valueCount = valueCount + 1;
            if (cat['value'] != valueCount) {
                cat['value'] = valueCount;
                cat['key'] = valueCount;
            }
            returnArr.push(cat);
        })

        const result = await NavbarModel.collection.insertMany(returnArr);
        res.send(result.ops);
    }
});

router.get("/getAllCategories", async (req, res) => {

    let result = await NavbarModel.find().sort({ parentId: 1 }).lean();
    let view = result.map(i => {
        let tmp = result.find(j => j.value == i.parentId)
        tmp ? i['parentName'] = tmp.title : i['parentName'] = '-';
        return i;
    })
    res.send(view);
});



module.exports = router;
