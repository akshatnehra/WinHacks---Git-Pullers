const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

router.get("/", cartController.getCart);

router.post("/addItem", cartController.addItemToCart);

router.post("/removeItem", cartController.removeItemFromCart);

router.post("/updateItem", cartController.updateItemInCart);

module.exports = router;