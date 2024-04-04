const express = require('express');
const products = require('../models/Products')

class productController{
    async ViewAll(req,res){
        await products.find({}).then(products=>
        res.render('products/products.pug',{products:products}))
    }
}
module.exports = new productController();