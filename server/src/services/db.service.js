const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    const connectionUrl =
      process.env.MONGODB_URI || "mongodb://localhost:27017/database";
    await mongoose.connect("mongodb://localhost:27017/database", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB, connection URL:", connectionUrl);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

const closeMongoDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
};

module.exports = { connectToMongoDB, closeMongoDB };
