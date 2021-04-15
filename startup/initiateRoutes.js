const errorMidleware = require("../midddleware/errorMiddleware");
const customerHomeRoutes = require("../routes/customerHome");
const userRoutes = require("../routes/users");
const authRoutes = require("../routes/auth");
const productRoutes = require("../routes/products");
const categoryRoutes = require("../routes/categories");
const sellerRoutes = require("../routes/sellers");
const orderRoutes = require("../routes/orders");


const express = require("express");

module.exports = function (app) {
    app.use(express.json());

    app.use("/api/customerHome", customerHomeRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/category", categoryRoutes);
    app.use("/api/sellers", sellerRoutes);
    app.use("/api/orders", orderRoutes);


    // ALL MIDDLEWARES SHOULD BE BEFORE THIS LINE.
    //ERROR MIDDLEWARE BEING ADDED
    app.use(errorMidleware);
}