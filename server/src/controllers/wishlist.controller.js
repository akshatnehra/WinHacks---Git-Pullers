const Wishlist = require("../models/wishlist.model");

async function getWishlist(req, res) {
  const wishlist = await Wishlist.findOne({ userId: req.user._id }).populate(
    "items.gameItemId"
  );
  res.json(wishlist);
}

async function addItemToWishlist(req, res) {
  const userId = req.user._id;
  const gameItemId = req.query.gameItemId;
  const wishlist = await Wishlist.findOne({ userId }).populate(
    "items.gameItemId"
  );
  if (wishlist) {
    wishlist.items.push({ gameItemId });
    await wishlist.save();
    res.json(wishlist);
  } else {
    const newWishlist = await Wishlist.create({
      userId,
      items: [{ gameItemId }],
    });
    res.json(newWishlist);
  }
}

async function removeItemFromWishlist(req, res) {
  const userId = req.user._id;
  const gameItemId = req.query.gameItemId;
  const wishlist = await Wishlist.findOne({ userId }).populate(
    "items.gameItemId"
  );
  wishlist.items = wishlist.items.filter(
    (item) => item.gameItemId != gameItemId
  );
  await wishlist.save();
  res.json(wishlist);
}

module.exports = {
  getWishlist,
  addItemToWishlist,
  removeItemFromWishlist,
};
