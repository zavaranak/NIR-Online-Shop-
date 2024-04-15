const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  username: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  firstName: { type: String, default: "Not set" },
  lastName: { type: String, default: "Not set" },
  address: { type: String, default: "Not set" },
  email: { type: String, default: "Not set" },
  tel: { type: String, max: 20 },
});

module.exports = mongoose.model("userAcount", userSchema);

//Requiring this library means requiring a class which is considered as a record from "useraccount"(mogoose save collection lowercased)
//Understanding the model as a collection of userSchema, this module returns an object based on userSchema and can be save to "useraccount" collection
