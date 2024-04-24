const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productCode: { type: String },
  productName: { type: String },
  productThumpnail: { type: String },
  productPrice: { type: Number, default: 0 },
  productDescription: { type: [String] },
  productSale: { type: Number },
  productImages: { type: [String] },
  rating:{type:Number},
  cartIndex:{type:Number},
  orderIndex:{type:Number},
});
module.exports = mongoose.model("products", productSchema);

//Requiring this library means requiring a class which is considered as a record from "useraccount"(mogoose save collection lowercased)
//Understanding the model as a collection of userSchema, this module returns an object based on userSchema and can be save to "useraccount" collection
