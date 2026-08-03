const mongoose = require("mongoose");

const creditCardSchema = new mongoose.Schema(
  {
    // Credit card basic information
    cardName: {
      type: String,
      required: [true, "Card name is required"],
      trim: true,
    },

    // Maximum spending limit of the card
    creditLimit: {
      type: Number,
      required: [true, "Credit limit is required"],
      min: [0, "Credit limit cannot be negative"],
    },

    // Day of the month when payment is due
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

const CreditCard = mongoose.model("CreditCard", creditCardSchema);

module.exports = CreditCard;