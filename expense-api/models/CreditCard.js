const mongoose = require("mongoose");


const creditCardSchema = new mongoose.Schema(
  {
    // Owner of the credit card
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Credit card basic information
    cardName: {
      type: String,
      required: [true, "Card name is required"],
      trim: true,
    },

    creditLimit: {
      type: Number,
      required: [true, "Credit limit is required"],
      min: [0, "Credit limit cannot be negative"],
    },

    dueDay: {
      type: Number,
      required: [true, "Due day is required"],
      min: [1, "Due day must be between 1 and 31"],
      max: [31, "Due day must be between 1 and 31"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CreditCard", creditCardSchema);
