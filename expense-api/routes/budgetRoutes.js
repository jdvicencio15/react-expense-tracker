const express = require("express");


const {
  getBudget,
  saveBudget,
} = require("../controllers/budgetController");



const protect = require("../middleware/protect");

const router = express.Router();

// Protect all budget routes
router.use(protect);


// Budget API routes
router.get("/", getBudget);

router.post("/", saveBudget);


module.exports = router;