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

router.get("/:id", authMiddleware,adminMiddleware, getMyWithdrawals);
// 👑 ADMIN ROUTES
router.get("/all", authMiddleware, adminMiddleware, getAllWithdrawals);
router.put("/update", authMiddleware, adminMiddleware, updateWithdrawalStatus);

module.exports = router;