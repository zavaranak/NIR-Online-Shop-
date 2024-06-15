const express = require("express");
const products = require("../models/Products");
const e = require("express");

class productController {
  async ViewAll(req, res) {
    const items = await products.find({});
    res.render("products/products.pug", { products: items });
  }
  async AddItemCart(req, res) {
    const item = req.body.itemID;
    await products.updateOne({ _id: item },{$inc:{cartIndex:1}});
    req.session.cart.push(item);
    req.session.save();
    res.json({ mes: "Item added" });
  }
}
module.exports = new productController();
