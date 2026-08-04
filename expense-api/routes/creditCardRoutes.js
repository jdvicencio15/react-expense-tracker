const express = require("express");

const {
  getCreditCards,
  getCreditCardById,
  addCreditCard,
  updateCreditCard,
  deleteCreditCard,
} = require("../controllers/creditCardController");

const protect = require("../middleware/protect");

const router = express.Router();

// Protect all credit card routes
router.use(protect);

// Credit Card API routes
router.get("/", getCreditCards);

router.get("/:id", getCreditCardById);

router.post("/", addCreditCard);

router.put("/:id", updateCreditCard);

router.delete("/:id", deleteCreditCard);

module.exports = router;