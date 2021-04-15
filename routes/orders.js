const express = require("express");
const router = express.Router();
const OrderModel = require('../models/order');
const SellerModel = require('../models/seller');
const CustomerModel = require('../models/customer');
const ProductModel = require('../models/product');


router.post("/GetNewOrdersAdmin", async (req, res) => {

    const orders = await OrderModel.find({
        'products.status':'Order Placed'
    })
    .populate({
        path:'customerId',
        model:'Customer',
        // match: {'_id':req.body.variantId}
        // match: {'_id': {$in:ids}}
    })
    .populate({
        path:'products.productId',
        model:'Products',
        // match: {'products.status':{$eq:'Delivered'}}
    })
    .populate({
        path:'products.variantId',
        model:'Variants'
    })
    .populate({
        path:'products.sellerId',
        model:'Vendors'
    })

    res.send(orders);
});

router.post("/GetPendingOrdersAdmin", async (req, res) => {

    const orders = await OrderModel.find({
        'products.status':'Shipped'
    })
    .populate({
        path:'customerId',
        model:'Customer',
        // match: {'_id':req.body.variantId}
        // match: {'_id': {$in:ids}}
    })
    .populate({
        path:'products.productId',
        model:'Products',
        // match: {'products.status':{$eq:'Delivered'}}
    })
    .populate({
        path:'products.variantId',
        model:'Variants'
    })
    .populate({
        path:'products.sellerId',
        model:'Vendors'
    })

    res.send(orders);
});

router.post("/GetCompletedOrdersAdmin", async (req, res) => {
   
    const orders = await OrderModel.find({
        // 'products.status':'Delivered'
    })
    .populate({
        path:'customerId',
        model:'Customer',
        // match: {'_id':req.body.variantId}
        // match: {'_id': {$in:ids}}
    })
    .populate({
        path:'products.productId',
        model:'Products',
        // match: {'products.status':{$eq:'Delivered'}}
    })
    .populate({
        path:'products.variantId',
        model:'Variants'
    })
    .populate({
        path:'products.sellerId',
        model:'Vendors'
    }).skip(0).limit(5).sort('-OrderDate');
    const totalOrders=await OrderModel.find().countDocuments();

    res.send({orders,totalOrders:totalOrders});
});

router.post("/GetCompletedOrdersAdminFiltered", async (req, res) => {

    let skipRows=0;
    if(req.body.pageNumber>0){
        skipRows=req.body.pageNumber*5-5;
    }
    let filter={
       
    }
    if(req.body.values){
    if(Object.keys(req.body.values).length>0){
        if(req.body.values.OrderNumber){
            filter['_id']=req.body.values.OrderNumber
        }
        if(req.body.values.Seller){
            filter['products.sellerId']=req.body.values.Seller
        }
        if(req.body.values.Customer){
            filter['customerId']=req.body.values.Customer
        }
        if(req.body.values.Product){
            filter['products.productId']=req.body.values.Product
        }
        // if(req.body.values.MinPrice){
        //     filter['products.price']={$gt:req.body.values.MinPrice}
        // }
        if(req.body.values.MaxPrice){
            // filter['products.price']={$lt:req.body.values.MaxPrice}
            filter['products.price']={$gt:Number(req.body.values.MinPrice),
                $lt:Number(req.body.values.MaxPrice)}
        }
        if(req.body.values.StartDate){
            let start=new Date(req.body.values.StartDate)
            let end=new Date(req.body.values.EndDate)
            filter['orderDate']={$gte:start,$lt:end}
        }

        console.log('Filter',filter)
    }
}

    const orders = await OrderModel.find(filter)
    .populate({
        path:'customerId',
        model:'Customer',
        // match: {'_id':req.body.variantId}
        // match: {'_id': {$in:ids}}
    })
    .populate({
        path:'products.productId',
        model:'Products',
        // match: {'products.status':{$eq:'Delivered'}}
    })
    .populate({
        path:'products.variantId',
        model:'Variants'
    })
    .populate({
        path:'products.sellerId',
        model:'Vendors'
    }).skip(skipRows).limit(5);
    const count=await OrderModel.find(filter).countDocuments();

    res.send({orders,totalOrders:count});
});

router.post("/GetOrderByIdAdmin", async (req, res) => {

    const order = await OrderModel.findOne({
        _id:req.body.OrderId
    })
    .populate({
        path:'customerId',
        model:'Customer',
        // match: {'_id':req.body.variantId}
        // match: {'_id': {$in:ids}}
    })
    .populate({
        path:'products.productId',
        model:'Products'
    })
    .populate({
        path:'products.variantId',
        model:'Variants'
    })
    .populate({
        path:'products.sellerId',
        model:'Vendors'
    })

    res.send(order);
});

router.post("/UpdateProductStatus", async (req, res) => {

    console.log(req.body)
    let order = await OrderModel.findOne({
        _id:req.body.OrderId,
        'products.productId':req.body.productId
    },function (err,doc) {
        if(err) res.status(500).send("Could not find the doument")
        let tmp= doc.products.find(x=>x.productId==req.body.productId)
        tmp.status=req.body.status;
        doc.save();
        res.send("The status is updated")
        }
    )
   
});


router.post("/CancelProduct", async (req, res) => {

    let order = await OrderModel.findOne({
        _id:req.body.OrderId,
        'products.productId':req.body.productId
    },function (err,doc) {
        if(err) res.status(500).send("Could not find the doument")
        let tmp= doc.products.find(x=>x.productId==req.body.productId)
        tmp.status="Cancelled";
        tmp.cancelReason=req.body.reason
        doc.save();
        res.send("The product has been cancelled")
        }
    )
   
});



router.post("/GetProductsSellersCustomersForFilterAdmin", async (req, res) => {

    const products = await ProductModel.find().select({"_id":1,"ProductName":1});
    const sellers= await SellerModel.find().select({"_id":1,"CompanyName":1});
    const customers= await CustomerModel.find().select({"_id":1,"FirstName":1,"LastName":1});
    res.send({products,sellers,customers});
});


router.post("/GetOrdersCustomer", async (req, res) => {

    let skipRows=0;
    if(req.body.pageNumber>0){
        skipRows=req.body.pageNumber*5-5;
    }
    let filter={
       customerEmail:req.body.customerEmail
    }
    if(req.body.status==2){
        filter['products.status']='Delivered'
    }
    if(req.body.status==1){
        filter['products.status']={$in:['Order Placed','Shipped']}
    }
    if(req.body.filters){
    if(Object.keys(req.body.filters).length>0){
       
        // if(req.body.filters.MinPrice){
        //     filter['products.price']={$gt:req.body.filters.MinPrice}
        // }
        if(req.body.filters.MaxPrice){
            filter['products.price']={$gt:Number(req.body.filters.MinPrice),
                $lt:Number(req.body.filters.MaxPrice)}
        }
        if(req.body.filters.StartDate){
            let start=new Date(req.body.filters.StartDate)
            let end=new Date(req.body.filters.EndDate)
            filter['orderDate']={$gte:start,$lt:end}
        }
    }
}
    // console.log('Filter',filter)

    const orders = await OrderModel.find(filter)
    .populate({
        path:'customerId',
        model:'Customer',
        // match: {'_id':req.body.variantId}
        // match: {'_id': {$in:ids}}
    })
    .populate({
        path:'products.productId',
        model:'Products',
        // match: {'products.status':{$eq:'Delivered'}}
    })
    .populate({
        path:'products.variantId',
        model:'Variants'
    })
    .populate({
        path:'products.sellerId',
        model:'Vendors'
    }).skip(skipRows).limit(5);
    const count=await OrderModel.find(filter).countDocuments();

    res.send({orders,totalOrders:count});
});

router.post("/GetCancelledOrdersCustomer", async (req, res) => {
   
    const orders = await OrderModel.find({
        customerEmail:req.body.customerEmail,
        'products.status':'Cancelled',
    })
    .populate({
        path:'customerId',
        model:'Customer',
        // match: {'_id':req.body.variantId}
        // match: {'_id': {$in:ids}}
    })
    .populate({
        path:'products.productId',
        model:'Products',
        // match: {'products.status':{$eq:'Delivered'}}
    })
    .populate({
        path:'products.variantId',
        model:'Variants'
    })
    .populate({
        path:'products.sellerId',
        model:'Vendors'
    }).sort('-OrderDate');
    
    res.send({orders});
});

module.exports = router;