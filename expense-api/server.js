require("dotenv").config();

// Fix DNS resolution issue when connecting to MongoDB Atlas
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const expenseRoutes = require("./routes/expenseRoutes");
const creditCardRoutes = require("./routes/creditCardRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const userRoutes = require("./routes/userRoutes");


const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = process.env.PORT || 5000;


// Global middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);


app.use(express.json());


// API Routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/creditcards", creditCardRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Expense Tracker API running"
  });
});


// Error handling middleware
app.use(notFound);
app.use(errorHandler);


async function startServer() {
  try {
    // Connect database before starting API server
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}


startServer();