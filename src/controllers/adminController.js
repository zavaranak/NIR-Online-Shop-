const express = require("express");
const accounts = require("../models/UserAccount");
const products = require("../models/Products");

class AdminController {
  Authenticate = async (userId) => {
    return (
      (await accounts.findById(userId).populate("username")).username ===
      "admin"
    );
  };
  AdminPage = async (req, res) => {
    const isAdmin = await this.Authenticate(req.session.userID);
    if (isAdmin) res.render("admin/admin.pug");
    else res.redirect(303, "/home");
  };
  ManageProducts = async (req, res) => {
    try {
      const isAdmin = await this.Authenticate(req.session.userID);
      if (isAdmin) {
        await products.find({}).then((products) => {
          res.render("admin/adminProducts.pug", { products: products });
        });
      } else res.redirect(303, "/home");
    } catch (err) {
      console.log(err);
      res.redirect(303, "/home");
    }
  };
  ManageClients = async (req, res) => {
    const isAdmin = await this.Authenticate(req.session.userID);
    res.render("admin/adminClients.pug");
  }
  AddNewProduct(req, res) {
    console.log(req.body);
    const product = new products({
      productName: req.body.productname,
      productCode: req.body.productcode,
      productPrice: req.body.productprice,
      productThumpnail: "/img/" + req.body.productthumpnail,
    });
    product.save();
    product.productDescription.push(req.body.productdescription);
    res.redirect(303, "/admin/products");
  }
  EditProductSite(req, res) {
    products.findById(req.query.productID).then((product) => {
      res.render("admin/adminEditProduct", { product: product });
    });
  }
}
module.exports = new AdminController();
