// routes/withdrawalRoutes.js

const express = require("express");
const router = express.Router();

const {
  getMyWithdrawals,
  getAllWithdrawals,
  updateWithdrawalStatus,
  sendWithdrawalOtp,
} = require("../controllers/withdrawalController");

// 🔐 Middleware (example)
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// 👤 USER ROUTES

router.get("/all", authMiddleware, getAllWithdrawals);
router.get("/:id", authMiddleware, getMyWithdrawals);
// 👑 ADMIN ROUTES
router.put("/update", authMiddleware, updateWithdrawalStatus);

module.exports = router;