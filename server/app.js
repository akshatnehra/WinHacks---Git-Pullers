// app.js

const express = require("express");
const { connectToMongoDB } = require("./src/services/db.service");
const userRouter = require("./src/routes/user.routes");
const cartRouter = require("./src/routes/cart.routes");
const wishlistRouter = require("./src/routes/wishlist.routes");
const gameItemRouter = require("./src/routes/gameItem.routes");
const orderRouter = require("./src/routes/order.routes");
const paymentRouter = require("./src/routes/payment.routes");
const cors = require("cors"); 

const app = express();
const port = 3000; // You can change this port if needed
require("dotenv").config();

// Connect to MongoDB
connectToMongoDB();

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));  // Enable CORS for your frontend origin

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

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.post("/checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        return {
          price_data: {
            currency: "cad",
            product_data: {
              name: item.name
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity
        };
      }),
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });
    res.json({url:session.url});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
