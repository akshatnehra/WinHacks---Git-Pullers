const Payment = require("../models/payment.model");

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
  const payment = await Payment.create(req.body);
  res.json(payment);
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
};
// Path: server/src/controllers/payment.controller.js
