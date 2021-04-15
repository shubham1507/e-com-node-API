const mongoose = require('mongoose')

const carouselSchema = new mongoose.Schema({
    Heading: {
        type: String,
        required: true
    },
    Paragraph: {
        type: String,
        required: true
    },
    Active: {
        type: Boolean
    },
    ExpiryDate: {
        type: Date
    }
});

const CarouselModel = mongoose.model('Carousel', carouselSchema, 'Carousel');

module.exports = CarouselModel;