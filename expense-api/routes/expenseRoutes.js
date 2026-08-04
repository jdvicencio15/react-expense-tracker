
const express = require("express");

const router = express.Router();

const {
  getExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");


const protect = require("../middleware/protect");

// Protect all expense routes
router.use(protect);


// Expense API routes
router.get("/", getExpenses);

router.get("/:id", getExpenseById);

router.post("/", addExpense);

router.put("/:id", updateExpense);

router.delete("/:id", deleteExpense);


module.exports = router;