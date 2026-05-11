const express = require("express");

const {
  updateConfig,
  getConfig,
} = require("../controllers/configController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 🔐 Admin only
router.put(
  "/admin/adsterra-key",
  authMiddleware,
  updateConfig
);

// 🌐 Public / user
router.get(
  "/adsterra-key",
  getConfig
);

module.exports = router;