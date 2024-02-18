
const User = require("../models/user.model");
// get all users
async function getAllUsers(req, res) {
  const users = await User.find();
  res.json(users);
}

// get user by id
async function getUserById(req, res) {
  const userId = req.params.id;
  const user = await User.findById(userId);
  res.json(user);
}

// create user
async function createUser(req, res) {
  try {
    const email = req.body.email;
    // Generate a random long username 
    const randomUsername = Math.random().toString(36).substring(7);
    const user = new User({
      email: email,
      username: randomUsername,
    });
    const newUser = await user.save();
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
}

// update user
async function updateUser(req, res) {
  const userId = req.params.id;
  const updated = await User.findByIdAndUpdate(userId, req.body, { new: true });
  res.json(updatedUser);
}

// delete user
async function deleteUser(req, res) {
  const userId = req.params.id;
  await User.findByIdAndDelete(userId);
  res.json({ message: "User deleted successfully" });
}

// Get user by email
async function getUserByEmail(req, res) {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email });
    res.json(user);
  } catch (error) {
    console.error("Error getting user by email:", error);
    res.status(500).json({ message: "Error getting user by email" });
  }
}

// Get user balance
async function getUserBalance(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    res.json({ balance: user.wallet_balance });
  } catch (error) {
    console.error("Error getting user balance:", error);
    res.status(500).json({ message: "Error getting user balance" });
  } 
}

// Add funds to user wallet
async function addFunds(req, res) {
  try {
    const { email, amount } = req.body;
    const user = await User.findOne({ email: email });
    user.wallet_balance += parseFloat(amount);
    await user.save();
    res.json({ message: "Funds added successfully" });
  } catch (error) {
    console.error("Error adding funds:", error);
    res.status(500).json({ message: "Error adding funds" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUserBalance,
  addFunds,
};
