
const Cart = require("../models/cart.model");

// get cart controller by user id

async function getCart(req, res) {
  const userId = req.query.userId;
  const cart = await Cart.findOne({ userId });
  res.json(cart);
}

// add all CRUD operations for cart
// add item to cart
async function addItemToCart(req, res) {
  const userId = req.query.userId;
  const gameItemId = req.query.gameItemId;
  const cart = await Cart.findOne({ userId });
  cart.items.push({ gameItemId });
  await cart.save();
  res.json(cart);
}
// remove item from cart
async function removeItemFromCart(req, res) {
  const userId = req.query.userId;
  const gameItemId = req.query.gameItemId;
  const cart = await Cart.findOne({ userId });
  cart.items = cart.items.filter((item) => item.gameItemId != gameItemId);
  await cart.save();
  res.json(cart);
}
// update item in cart
async function updateItemInCart(req, res) {
  const userId = req.query.userId;
  const gameItemId = req.query.gameItemId;
  const quantity = req.query.quantity;
  const cart = await Cart.findOne({ userId });
  const item = cart.items.find((item) => item.gameItemId == gameItemId);
  item.quantity = quantity;
  await cart.save();
  res.json(cart);
}

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateItemInCart,
};

// Path: server/src/controllers/game.controller.js
