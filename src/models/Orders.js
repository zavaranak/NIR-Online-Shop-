const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  item: [
    {
      itemID: { type: String },
      quantity: { type: Number },
      _id: false,
    },
  ],
  userID: { type: String },
  address: { type: String },
  paymentMethod: { type: String },
  dateOfIssue: { type: Date },
  totalAmount: { type: Number },
});
module.exports = mongoose.model("orders", orderSchema);

//Requiring this library means requiring a class which is considered as a record from "useraccount"(mogoose save collection lowercased)
//Understanding the model as a collection of userSchema, this module returns an object based on userSchema and can be save to "useraccount" collection
