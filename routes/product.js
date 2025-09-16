const express = require('express');
// app ek pura instance hota hai isliye use export nhi kr skte
//  issi wajah se humne route ka istemaal karna pad rha hai
const router = express.Router() // mini instance
const Product = require('../models/Product');


router.get('/products', async (req,res)=>{
    let products = await Product.find({});
    res.render('products/index',{products});
});


module.exports = router; 