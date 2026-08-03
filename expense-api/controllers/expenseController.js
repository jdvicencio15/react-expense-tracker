const Expense = require("../models/Expense");


// Get all expenses
async function getExpenses(req, res, next) {
  try {

    // Retrieve all expense records from MongoDB
    const expenses = await Expense.find();

    res.status(200).json({
      success: true,
      data: expenses,
    });

  } catch (error) {
    next(error);
  }
}


// Get single expense by ID
async function getExpenseById(req, res, next) {
  try {

    const { id } = req.params;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      data: expense,
    });

  } catch (error) {
    next(error);
  }
}


// Create new expense
async function addExpense(req, res, next) {
  try {

    const { name, amount, category } = req.body;


    // Validate required fields before saving
    if (!name || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, amount, and category are required",
      });
    }


    // Validate amount value
    if (isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than zero",
      });
    }


    const expense = await Expense.create(req.body);


    res.status(201).json({
      success: true,
      data: expense,
    });


  } catch (error) {
    next(error);
  }
}


// Update existing expense
async function updateExpense(req, res, next) {
  try {

    const { id } = req.params;


    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );


    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }


    res.status(200).json({
      success: true,
      data: updatedExpense,
    });


  } catch (error) {
    next(error);
  }
}


// Delete expense
async function deleteExpense(req, res, next) {
  try {

    const { id } = req.params;


    const deletedExpense = await Expense.findByIdAndDelete(id);


    if (!deletedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
      data: deletedExpense,
    });


  } catch (error) {
    next(error);
  }
}


module.exports = {
  getExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense,
};