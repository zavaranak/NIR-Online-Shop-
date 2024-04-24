const express = require("express");
const products = require("../models/Products");
const e = require("express");

class productController {
  ViewAll = async (req, res) => {
    const items = await products.find({});
    res.render("products/products.pug", { products: items });
  };
  AddItemCart = (req, res) => {
    const item = req.body.itemID;
    
    req.session.cart.push(item);
    req.session.save();
    res.json({mes:"Item added"})
  };
}
module.exports = new productController();
