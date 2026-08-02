const Expense = require("../models/Expense");

async function getExpenses(req, res, next) {
  try {
    const expenses = await Expense.find();

    if (!expenses) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }
    res.status(200).json(expenses);

  } catch (error) {
    next(error);
  }
}

async function getExpenseById(req, res, next) {
  try {
      const { id } = req.params;
    const expenses = await Expense.findById(id);


    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }


}


async function addExpense(req, res) {
  try {

    const { name, amount, category } = req.body;

    if (!name || !amount || !category) {
  return res.status(400).json({
    message: "Name, amount, and category are required",
  });
    }


  if (isNaN(amount)) {
    return res.status(400).json({
      message: "Amount must be a number"
    });
  }

  if (Number(amount) <= 0) {
    return res.status(400).json({
      message: "Amount must be greater than zero"
    });
    }


    const expense = new Expense(req.body);

    await expense.save();

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function updateExpense(req, res) {
  try {
    const { id } = req.params;

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function deleteExpense(req, res) {
  try {
    const { id } = req.params;

 const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

   res.json({
  message: "Expense deleted successfully",
  expense: deletedExpense,
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}






module.exports = {
  getExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense,
};