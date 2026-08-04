const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    // Owner of the expense
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Basic expense information
    name: {
      type: String,
      required: [true, "Expense name is required"],
      trim: true,
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      trim: true,
    },

    date: {
      type: Date,
      required: [true, "Date is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;