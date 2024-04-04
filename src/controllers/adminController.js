const express = require('express');
const accounts = require('../models/UserAccount');
const products = require('../models/Products')
class AdminController{
    async AdminPage(req,res){
        accounts.findById(req.session.userID).then(account=>{
        if (account.username=="admin")  res.render('admin/admin.pug')
        else  res.redirect(303,'/home')})
    }
    async ManageProducts(req,res){
        await products.find({}).then(products=>{
            res.render('admin/adminProducts.pug',{products: products})
        });
    }
    ManageClients(req,res){
        res.render('admin/adminClients.pug')
    }
    AddNewProduct(req,res){
        console.log(req.body)
        const product = new products({
            productName:req.body.productname,
            productCode:req.body.productcode,
            productPrice:req.body.productprice,
            productThumpnail: "/img/"+req.body.productthumpnail,
        })
        product.save()
        product.productDescription.push(req.body.productdescription);
        res.redirect(303,'/admin/products')
    }
    EditProductSite(req,res){
        products.findById(req.query.productID).then(product=>{
            res.render('admin/adminEditProduct',{product:product})
        })
    }
}

module.exports = new AdminController();