// app.js

const express = require("express");
const { connectToMongoDB } = require("./src/services/db.service");
const userRouter = require("./src/routes/user.routes");
const cartRouter = require("./src/routes/cart.routes");
const wishlistRouter = require("./src/routes/wishlist.routes");
const gameItemRouter = require("./src/routes/gameItem.routes");
const orderRouter = require("./src/routes/order.routes");
const paymentRouter = require("./src/routes/payment.routes");

const app = express();
const port = 3000; // You can change this port if needed

// Connect to MongoDB
connectToMongoDB();

// Middleware to parse JSON requests
app.use(express.json());

// Define your routes
app.get("/", (req, res) => {
  res.send("Welcome to my RESTful API!");
});

app.use("/users", userRouter);
app.use("/carts", cartRouter);
app.use("/wishlists", wishlistRouter);
app.use("/gameItems", gameItemRouter);
app.use("/orders", orderRouter);
app.use("/payments", paymentRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
