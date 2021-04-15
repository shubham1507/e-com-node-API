const mongoose=require('mongoose')


const reviewSchema = mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String
    },
    question:{
        type:String
    },
    answer:{
        type:String
    }
 
});

const ProductReviewModel = mongoose.model("ProductReviews", reviewSchema, "ProductReviews");

module.exports = ProductReviewModel;