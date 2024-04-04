const express = require('express');
const route = express.Router();
const adminController = require('../controllers/adminController');
//Routing
route.get('/products',adminController.ManageProducts);
route.get('/clients',adminController.ManageClients);
route.post('/add-product',adminController.AddNewProduct)
route.get('/product/edit',adminController.EditProductSite)
route.get('/',adminController.AdminPage);

//Export module
module.exports = route;