const express = require("express");

const {
  getCreditCards,
  getCreditCardById,
  addCreditCard,
  updateCreditCard,
  deleteCreditCard,
} = require("../controllers/creditCardController");

const router = express.Router();


// Credit Card API routes
router.get("/", getCreditCards);

router.get("/:id", getCreditCardById);

router.post("/", addCreditCard);

router.put("/:id", updateCreditCard);

router.delete("/:id", deleteCreditCard);


module.exports = router;