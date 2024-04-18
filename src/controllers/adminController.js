const express = require("express");
const accounts = require("../models/UserAccount");
const products = require("../models/Products");
const orders = require("../models/Orders");
class AdminController {
  Authenticate = async (userId) => {
    const admin = await accounts.findById(userId);
    const isAdmin = admin.username === "admin";
    return isAdmin;
  };
  AdminPage = async (req, res) => {
    const isAdmin = await this.Authenticate(req.session.userID);
    if (isAdmin) res.render("admin/admin.pug");
    else res.redirect(303, "/home");
  };
  ManageProducts = async (req, res) => {
    const isAdmin = await this.Authenticate(req.session.userID);
    if (isAdmin) {
      const items = await products.find({});
      res.render("admin/adminProducts.pug", { products: items });
    } else res.redirect(303, "/home");
  };
  ManageClients = async (req, res) => {
    const isAdmin = await this.Authenticate(req.session.userID);
    if (isAdmin) {
      const clients = (await accounts.find({})).filter(
        (client) => !(client.username === "admin")
      );
      res.render("admin/adminClients.pug", { clients: clients });
    } else res.redirect(303, "/home");
  };
  AddNewProduct(req, res) {
    console.log(req.body);
    const product = new products({
      productName: req.body.productname,
      productCode: req.body.productcode,
      productPrice: req.body.productprice,
      productThumpnail: "/uploadToServer/" + req.file.filename,
    });
    product.save();
    product.productDescription.push(req.body.productdescription);
    res.redirect(303, "/admin/products");
  }
  async EditProduct(req, res) {
    const param = req.body;
    const update = {
      productName: param.productname,
      productCode: param.productcode,
      productprice: param.productprice,
      productDescription: param.productdescription,
    };
    if (req.file) {
      console.log(req.file.filename);
      update.productThumpnail = "/uploadToServer/" + req.file.filename;
    }
    const item = await products.updateOne({ _id: param.productID }, update);
    res.redirect(303, "/admin/products");
  }
  MulterFunc(req, res) {
    console.log("Multer");
    console.log(req.file.filename);
    console.log(req.file.destination);
    res.send("done");
  }
  async ManageOrders(req, res) {
    const orderRecords = await orders.find({});
    res.render("admin/adminOrders", { orders: orderRecords });
  }
  Analysis(req,res){
    res.render("indev.pug")
  }

}
module.exports = new AdminController();
