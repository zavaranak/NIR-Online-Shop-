const express = require('express');
const products = require('../models/Products')

class productController{
    ViewAll= async (req,res)=>{
        const items = await products.find({});
        res.render('products/products.pug',{products:items});
    }
    AddItemCart = (req,res)=>{
        const item = req.query.itemID;
        res.send(item);
    }

}
module.exports = new productController();