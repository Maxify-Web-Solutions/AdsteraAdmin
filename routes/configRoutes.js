// routes/configRoutes.js

const express = require("express");

const {
  updateAdsterraKey,
  getAdsterraKey,
} = require("../controllers/configController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 🔐 Admin only
router.put("/admin/adsterra-key", authMiddleware, updateAdsterraKey);

// 🌐 Public / user
router.get("/adsterra-key", getAdsterraKey);

module.exports = router;