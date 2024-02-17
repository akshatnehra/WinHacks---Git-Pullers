const mongoose = require("mongoose");

const gameItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  originalPrice: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  stock: { type: Number, required: true },
  platform: {
    type: String,
    enum: ["PS4", "Xbox", "PC", "Nintendo Switch"],
    required: true,
  },
  category: {
    type: String,
    enum: ["Action", "Adventure", "Role-Playing", "Simulation", "Strategy"],
    required: true,
    },
    tags:{
        type: [String],
        enum: ["Singleplayer", "Multiplayer", "Co-op", "Online", "Offline","Bestseller"],
    }
  // Other game item properties like release date, genre, etc.
});

const GameItem = mongoose.model("GameItem", gameItemSchema);

module.exports = GameItem;
