const express = require("express");
const account = require("../models/UserAccount");
const bcrypt = require("bcrypt");
const products = require("../models/Products");
const orders = require("../models/Orders");
class myProfile {
  async UserProfile(req, res) {
    if (req.session.userID) {
      const user = await account.findById(req.session.userID);
      if (user.username == "admin") res.redirect(303, "/admin");
      else
        res.render("myprofile/userprofile.pug", {
          title: "My Profile",
          userdata: user,
        });
    } else res.redirect(303, "/myprofile/login");
  }
  logInSite(req, res) {
    res.render("myprofile/login.pug", { title: "My profile" });
  }
  Logout(req, res) {
    try {
      req.session.destroy();
      res.redirect(303, "/myprofile");
    } catch (err) {
      res.render("error", { title: `Log out error ${err}` });
    }
  }
  async LogIn(req, res) {
    const password = req.body.password;
    const username = req.body.username;
    const user = await account.findOne({ username: username });
    if (bcrypt.compareSync(password, user.password)) {
      req.session.userID = user._id;
      req.session.cart = [];
      if (user.username === "admin") res.redirect(303, "/admin");
      else res.redirect(303, "/myprofile");
    } else
      res.render("myprofile/login", {
        title: "Login",
        message: "Wrong password or usename",
      });
  }
  async SignUp(req, res) {
    const username = req.body.username;
    var salt = Math.random() * 10;
    const password = bcrypt.hashSync(req.body.password1, salt);
    const newAccount = new account({
      username: username,
      password: password,
    });
    await newAccount.save();
    res.redirect(303, "/myprofile");
  }
  async UpdateProfile(req, res) {
    const userID = req.body.userID;
    await account.updateOne({ _id: userID }, req.body).exec();
    res.redirect(303, "/myprofile");
  }
  async CartSite(req, res) {
    if (req.session.userID) {
      const user = await account.findById(req.session.userID);
      const quantity = {};
      for (var i = 0; i < req.session.cart.length; i++) {
        if (quantity[req.session.cart[i]]) quantity[req.session.cart[i]] += 1;
        else quantity[req.session.cart[i]] = 1;
      }
      const items = await products.find().where("_id").in(req.session.cart);
      res.render("myprofile/cart.pug", {
        user: user,
        items: items,
        quantity: quantity,
      });
    }
  }
  CartRemove(req, res) {
    const items = req.body.cart;
    let cart = [];
    for (const item of items) {
      cart.push(item._id);
    }
    req.session.cart = cart;
    req.session.save();
  }
  async Order(req, res) {
    const info = req.body;
    const items = [];
    for (var i = 0; i < info.items.length; i++) {
      const item = {
        itemID: info.items[i],
        quantity: info.quantity[i],
      };
      items.push(item);
    }
    const neworder = new orders({
      userID: info.userID,
      address: info.address,
      item: items,
      totalAmount: info.totalAmount,
      dateOfIssue: Date(Date.now()),
      paymentMethod: info.payment,
    });
    await neworder.save();
    req.session.cart = [];
    res.redirect(303, "/myprofile/cart");
  }
}

module.exports = new myProfile();
