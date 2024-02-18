
const User = require("../models/user.model");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;


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

async function addFundsFromStripe(email, amount) {
  try {
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("User not found");

    user.wallet_balance += amount;
    await user.save();
    console.log(`Funds added successfully to ${email}`);
  } catch (error) {
    console.error("Error adding funds from Stripe:", error);
  }
}

// Add funds to user wallet
async function addFunds(req, res) {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful checkout session completion
  if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      // Metadata should contain email if set during checkout session creation
      const email = session.metadata.email;
      const amount = session.amount_total / 100; // Convert from cents to dollars

      // Add funds to user's account
      await addFundsFromStripe(email, amount);
      console.log("Funds added successfully from Stripe webhook.");
      res.json({received: true});
  } else {
      console.log(`Unhandled event type ${event.type}`);
      res.json({received: true});
  }
};

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
