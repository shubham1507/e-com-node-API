const express = require("express");
const router = express.Router();
const NavbarModel = require('../models/category');
const ProductModel = require('../models/product');
const CarouselModel = require('../models/carousel');

router.get("/GetNavbarData", async (req, res) => {
    const navbarplainData = await NavbarModel.find().lean();

    if (!navbarplainData) return res.send(404).send('Category data not found');

    list_to_tree(navbarplainData, (result) => {
        res.send(result);
    });

});

router.get("/GetCarouselData", async (req, res) => {
    const carouselData = await CarouselModel.find();

    if (!carouselData) return res.send(404).send('Carousel data not found');

    res.send(carouselData)
});

router.get("/GetTopSellingProductsData", async (req, res) => {
    const products = await ProductModel.find().populate({
        path: 'title',
        model: 'Category'
    }).limit(1);
    // console.log(products);
    res.send(products);
});



router.get("/GetFeaturedProductsData", async (req, res) => {
    const products = await ProductModel.find({
        IsFeatured: true
    }).populate({
        path: 'CategoryId',
        model: 'Category'
    }).limit(5);
    // console.log(products);
    res.send(products);
});

function list_to_tree(list, callback) {
    let map1 = {},
        node, roots = [],
        i;
    for (i = 0; i < list.length; i += 1) {
        map1[list[i].value] = i; // initialize the map
        list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
        node = list[i];

        if (node.parentId !== 0) {
            list[map1[node.parentId]].children.push(node);

        } else {
            roots.push(node);
        }
    }
    callback(roots)
}

module.exports = router;



