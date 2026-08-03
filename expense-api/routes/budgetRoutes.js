const express = require("express");

const router = express.Router();

const {
  getBudget,
  saveBudget,
} = require("../controllers/budgetController");


// Budget API routes
router.get("/", getBudget);

router.post("/", saveBudget);


module.exports = router;