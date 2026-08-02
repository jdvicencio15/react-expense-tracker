const express = require("express");

const router = express.Router();

const {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
  getExpenseById
} = require("../controllers/expenseController");


router.get("/", getExpenses);
router.get("/:id", getExpenseById);

router.post("/", addExpense);

router.delete("/:id", deleteExpense);
router.put("/:id", updateExpense);

module.exports = router;