const mongoose = require('mongoose');
const ProductModel=require('./product')

const variantSchema = mongoose.Schema({
    VendorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
   ProductId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Products'
   },
   Price:{
        type:Number,
        required:true
   },
   Stock:{
        type:Number,
        required:true
   },
    Variants: [{
        name: String,
        value: String,
        isBuyingCriteria:Boolean
    }],
});

const VariantsModel = mongoose.model("Variants", variantSchema,"Variants");

module.exports=VariantsModel

