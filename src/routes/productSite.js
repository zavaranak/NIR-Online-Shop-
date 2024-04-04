const express = require('express')
const route = express.Router();
const productController = require('../controllers/productController')

//Routing
route.get('/',productController.ViewAll)
module.exports = route;

