const Budget = require("../models/Budget");


// Get current budget
const getBudget = async (req, res, next) => {
  try {

    // Retrieve existing budget record
    const budget = await Budget.findOne({
  user: req.user._id,
})

    res.status(200).json({
      success: true,
      data: budget,
    });


  } catch (error) {
    next(error);
  }
};


// Create or update budget
const saveBudget = async (req, res, next) => {
  try {

    const { amount } = req.body;


    // Validate budget amount
    if (isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid budget amount",
      });
    }


    // Check if budget already exists
   let budget = await Budget.findOne({
  user: req.user._id,
});


    if (budget) {

      // Update existing budget
      budget.amount = amount;

      await budget.save();


      return res.status(200).json({
        success: true,
        data: budget,
      });
    }


    // Create first budget record
const newBudget = await Budget.create({
  amount,
  user: req.user._id,
});

res.status(201).json({
  success: true,
  data: newBudget,
});


  } catch (error) {
    next(error);
  }
};


module.exports = {
  getBudget,
  saveBudget,
};