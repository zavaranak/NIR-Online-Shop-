const express = require('express');
const accounts = require('../models/UserAccount');
const products = require('../models/Products')
class AdminController{
    async AdminPage(req,res){
        await accounts.findById(req.session.userID).then(account=>{
        if (account.username=="admin") res.render('admin/admin.pug')
        else  res.redirect(303,'/home');})
    }
    ManageProducts= async(req,res)=>{
        try{
        let auth = false;
        await accounts.findById(req.session.userID).then(account=>{
        if (account.username=="admin") auth = true;
        else  res.redirect(303,'/home');} )

        if (auth){
        await products.find({}).then(products=>{
        res.render('admin/adminProducts.pug',{products: products})})
        }
        else  res.redirect(303,'/home');
        }
        catch(err){
            console.log(err);
            res.redirect(303,'/home');
        }
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
    Authenticate = async(id)=>{
        if (id) {
            try {
                accounts.findById(id).then(account=>{
                    console.log("Athenticate:", account.username);
                    return account.username == "admin";})
            } catch (error) {
                console.error(error);
                return false;
            }
        }
        return false;
    }
}

module.exports = new AdminController();