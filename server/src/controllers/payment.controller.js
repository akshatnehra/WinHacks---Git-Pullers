const Payment = require("../models/payment.model");
const User = require("../models/user.model");
const GameItem = require("../models/gameItem.model");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

console.log("STRIPE_SECRET" + process.env.STRIPE_SECRET_KEY);

async function getAllPayments(req, res) {
  const payments = await Payment.find();
  res.json(payments);
}

async function getPaymentById(req, res) {
  const paymentId = req.params.id;
  const payment = await Payment.findById(paymentId);
  res.json(payment);
}

async function createPayment(req, res) {
  try {
    const { email, items, amount } = req.body;

    // Verify that the total amount is less than wallet balance
    let totalAmount = 0;
    items.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });

    const user = await User.findOne({ email: email });
    let userWalletBalance = user.wallet_balance;

    if (totalAmount > userWalletBalance) {
      return res.status(400).send({
        message: "Insufficient balance in the user's wallet.",
      });
    }

    // Validate request data
    if (!email || !Array.isArray(items) || items.length === 0 || !amount) {
      return res
        .status(400)
        .send({ message: "Invalid payment data provided." });
    }

    // Generate random payment ID
    const paymentId = Math.random().toString(36).substring(7);

    // Create a new payment document
    const payment = new Payment({
      orderId: paymentId,
      email,
      items,
      amount,
    });

    // Save payment to the database
    const savedPayment = await payment.save();

    // Deduct the total amount from the user's wallet balance
    userWalletBalance -= totalAmount;
    await User.findOneAndUpdate(
      { email: email },
      { wallet_balance: userWalletBalance }
    );

    res.status(201).send(savedPayment);
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).send({ message: "Error processing payment.", error });
  }
}

async function clearPaymentHistory(req, res) {
  try {
    const email = req.body.email;
    await Payment.deleteMany({ email: email });
    res.json({ message: "Payment history cleared successfully" });
  } catch (error) {
    console.error("Error clearing payment history:", error);
    res.status(500).json({ message: "Error clearing payment history" });
  }
}

async function getUserPayments(req, res) {
  try {
    const email = req.body.email;
    const payments = await Payment.find({ email: email }).sort({
      paymentDate: -1,
    });

    const paymentsWithGameName = await Promise.all(
      payments.map(async (payment) => {
        const paymentObj = payment.toObject(); // Convert to plain object
        await Promise.all(
          paymentObj.items.map(async (item, index) => {
            const game = await GameItem.findById(item.game);
            item.name = game ? game.title : "Unknown Game"; // Safely add game name
          })
        );
        return paymentObj;
      })
    );

    res.json(paymentsWithGameName);
  } catch (error) {
    console.error("Error getting user payments:", error);
    res.status(500).json({ message: "Error getting user payments" });
  }
}

async function checkout(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "cad",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: 1,
        };
      }),
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).send({ message: "Error processing payment.", error });
  }
}

async function updatePayment(req, res) {
  const paymentId = req.params.id;
  const updatedPayment = await Payment.findByIdAndUpdate(paymentId, req.body, {
    new: true,
  });
  res.json(updatedPayment);
}

async function deletePayment(req, res) {
  const paymentId = req.params.id;
  await Payment.findByIdAndDelete(paymentId);
  res.json({ message: "Payment deleted successfully" });
}

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
  getUserPayments,
  clearPaymentHistory,
  checkout,
};
// Path: server/src/controllers/payment.controller.js
