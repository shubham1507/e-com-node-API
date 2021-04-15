const mongoose = require("mongoose");
const Joi = require("joi");

const navbarSchema = mongoose.Schema({
    label:String,
    title: String,//label and title fields are same. they hold same data. Needed for different Treeview render on ui
    parentId: Number,
    value:Number,
    key:Number //key and value fields are same. they hold same data. Needed for different Treeview render on ui
});

// const categoryViewModel=mongoose.Schema({
//     name:String
// })

// categoryViewModel.virtual('categories',{
//     ref:'Category',
//     localField:'name',
//     foreignField:'title'
// })

const NavbarModel = mongoose.model("Category", navbarSchema, "Categories");
// const CategoryViews=mongoose.model('Category',categoryViewModel)

module.exports = NavbarModel;
// module.exports.categoryModel = CategoryViews;
