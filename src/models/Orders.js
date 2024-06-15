const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  item: [
    {
      itemCode: { type: String },
      quantity: { type: Number },
      _id: false,
    },
  ],
  userID: { type: String },
  username: { type: String },
  address: { type: String },
  contact: {
    tel: { type: String },
    email: { type: String },
  },
  paymentMethod: { type: String },
  dateOfIssue: { type: Date },
  totalAmount: { type: Number },
  state: { type: String, default: "In process" },
});
module.exports = mongoose.model("orders", orderSchema);

//Requiring this library means requiring a class which is considered as a record from "useraccount"(mogoose save collection lowercased)
//Understanding the model as a collection of userSchema, this module returns an object based on userSchema and can be save to "useraccount" collection
