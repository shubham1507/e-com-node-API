const logger = require('../models/logger')
const mongoose = require("mongoose");

module.exports = function () {
    mongoose
        // .connect("mongodb://localhost:27017,localhost:27018,localhost:27019/ECommerceDB", {
        // .connect("mongodb://localhost:27017/ECommerceDB", {
            
        // .connect("mongodb+srv://admin:123@cluster0.me2l8.mongodb.net/ECommerceDB?retryWrites=true&w=majority", {
        .connect("mongodb+srv://admin:admin@cluster0.zkm9y.mongodb.net/ECommerceDB?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // replicaSet:'rs'
        })
        .then(() => {
            console.log("Connected to mongodb");
            logger.info('Connected to mongodb')
        })
        .catch((err) => {
            console.log("Could not connect to mongodb" + err);
            logger.error('Could not connect to mongodb' + err)
        });

}