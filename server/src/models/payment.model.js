const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  items: [{
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  amount: {
    type: Number,
    required: true
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
