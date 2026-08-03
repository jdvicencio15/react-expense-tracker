const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    // User budget limit
    amount: {
      type: Number,
      required: [true, "Budget amount is required"],
      min: [0, "Budget cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;