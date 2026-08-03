const mongoose = require("mongoose");

async function connectDB() {
  try {
    // Establish connection between Express API and MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected");

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);

    // Stop application if database connection fails
    process.exit(1);
  }
}

module.exports = connectDB;