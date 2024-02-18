const mongoose = require("mongoose");

const wishlistItemSchema = new mongoose.Schema({
  gameItemId: { type: mongoose.Schema.Types.ObjectId, ref: "GameItem" },
});

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [wishlistItemSchema],
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;

