const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  gameItemId: { type: mongoose.Schema.Types.ObjectId, ref: "GameItem" },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered"],
    default: "Pending",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
