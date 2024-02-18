// user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  age: { type: Number, default: 18 },
  wallet_balance: { type: Number, default: 0 },
  username: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
