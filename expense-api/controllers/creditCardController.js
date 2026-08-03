const CreditCard = require("../models/CreditCard");


// Get all credit cards
async function getCreditCards(req, res, next) {
  try {

    // Retrieve all credit cards from MongoDB
    const creditCards = await CreditCard.find();

    res.status(200).json({
      success: true,
      data: creditCards,
    });

  } catch (error) {
    next(error);
  }
}


// Get credit card by ID
async function getCreditCardById(req, res, next) {
  try {

    const { id } = req.params;

    const creditCard = await CreditCard.findById(id);


    if (!creditCard) {
      return res.status(404).json({
        success: false,
        message: "Credit Card not found",
      });
    }


    res.status(200).json({
      success: true,
      data: creditCard,
    });


  } catch (error) {
    next(error);
  }
}


// Create credit card
async function addCreditCard(req, res, next) {
  try {

    const {
      cardName,
      creditLimit,
      dueDay
    } = req.body;


    // Validate required fields
    if (!cardName || !creditLimit || !dueDay) {
      return res.status(400).json({
        success: false,
        message: "Card Name, Credit Limit and Due Day are required",
      });
    }


    // Validate credit limit value
    if (isNaN(creditLimit) || Number(creditLimit) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Credit Limit must be greater than zero",
      });
    }


    const creditCard = await CreditCard.create(req.body);


    res.status(201).json({
      success: true,
      data: creditCard,
    });


  } catch (error) {
    next(error);
  }
}


// Update credit card
async function updateCreditCard(req, res, next) {
  try {

    const { id } = req.params;


    const updatedCreditCard = await CreditCard.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );


    if (!updatedCreditCard) {
      return res.status(404).json({
        success: false,
        message: "Credit Card not found",
      });
    }


    res.status(200).json({
      success: true,
      data: updatedCreditCard,
    });


  } catch (error) {
    next(error);
  }
}


// Delete credit card
async function deleteCreditCard(req, res, next) {
  try {

    const { id } = req.params;


    const deletedCreditCard = await CreditCard.findByIdAndDelete(id);


    if (!deletedCreditCard) {
      return res.status(404).json({
        success: false,
        message: "Credit Card not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "Credit Card deleted successfully",
      data: deletedCreditCard,
    });


  } catch (error) {
    next(error);
  }
}


module.exports = {
  getCreditCards,
  getCreditCardById,
  addCreditCard,
  updateCreditCard,
  deleteCreditCard,
};