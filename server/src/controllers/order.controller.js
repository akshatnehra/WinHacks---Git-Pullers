
const Order = require("../models/order.model");

exports.createOrder = async (req, res) => {
    const order = await Order.create(req.body);
    res.json(order);
    };

exports.getAllOrders = async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
    }
    

exports.getOrderById = async (req, res) => {
    const orderId = req.params.id;
    const order = await
    Order.findById(orderId);
    res.json(order);
    }

exports.updateOrder = async (req, res) => {

    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate (orderId, req .body, { new: true });
    res.json(updatedOrder);
    }

exports.deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    await Order.findByIdAndDelete(orderId);
    res.json({ message: "Order deleted successfully" });
    }

// Path: server/src/controllers/user.controller.js
