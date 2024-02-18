const express = require("express");

const router = express.Router();

const paymentController = require("../controllers/payment.controller");

router.get("/", paymentController.getAllPayments);

router.get("/:id", paymentController.getPaymentById);

router.post("/", paymentController.createPayment);

router.put("/:id", paymentController.updatePayment);

router.delete("/:id", paymentController.deletePayment);

router.post("/get-user-payments", paymentController.getUserPayments);

router.post("/clear-payment-history", paymentController.clearPaymentHistory);

router.post("/checkout", paymentController.checkout);

module.exports = router;
// Path: server/src/routes/payment.routes.js