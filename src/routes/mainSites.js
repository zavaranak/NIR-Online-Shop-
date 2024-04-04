//requires library
const express = require('express');
const route = express.Router();
const Myprofile = require('./myprofileSite')
const Products = require('./productSite')
const AdminSite = require('./adminSite')
//Routing
route.get('/home',(req,res)=>res.render('home.pug',{title: "Home Page"}));
route.get('/news',(req,res)=>res.render("indev",{title: "News"}));
route.get('/about-us',(req,res)=>res.render("indev",{title: "About us"}));
route.get('/cart',(req,res)=>res.render("indev",{title: "Cart"}));
route.use('/admin', AdminSite)
route.use('/myprofile',Myprofile);
route.use('/products',Products);
route.get('/',(req,res)=>res.render('home.pug',{title: "Home Page" }));
//Export HOME site
module.exports = route;