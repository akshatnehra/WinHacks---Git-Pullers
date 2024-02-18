const express = require("express");

const router = express.Router();

const wishlistController = require("../controllers/wishlist.controller");

router.get("/", wishlistController.getWishlist);

router.post("/addItem", wishlistController.addItemToWishlist);

router.post("/removeItem", wishlistController.removeItemFromWishlist);

module.exports = router;

// Path: server/src/routes/wishlist.routes.js
