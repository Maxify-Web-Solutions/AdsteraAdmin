// routes/statsConfigRoutes.js

const express = require("express");

const router = express.Router();

const {
    saveStatsConfig,
    getStatsConfig,
} = require("../controllers/statsConfigController");

// ==========================================
// SAVE / UPDATE CONFIG
// ==========================================

router.post(
    "/save",
    saveStatsConfig
);

// ==========================================
// GET CONFIG
// ==========================================

router.get(
    "/get",
    getStatsConfig
);

module.exports = router;