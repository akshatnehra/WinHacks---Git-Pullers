
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
  const user = await User.create(req.body);
  res.json(user);
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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
