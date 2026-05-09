// controllers/configController.js

const Config = require("../models/Config");

// ======================================
// GET CONFIG
// ======================================

exports.getConfig =
  async (req, res) => {
    try {
      let config =
        await Config.findOne();

      if (!config) {
        config =
          await Config.create({});
      }

      return res.status(200).json({
        success: true,
        data: config,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch config",
        error: error.message,
      });
    }
  };

// ======================================
// UPDATE CONFIG
// ======================================

exports.updateConfig =
  async (req, res) => {
    try {
      const {
        adsterraApiKey,
        cpmPercent,
        revenuePercent,
      } = req.body;

      let config =
        await Config.findOne();

      if (!config) {
        config =
          await Config.create({});
      }

      // ================= UPDATE =================

      if (
        adsterraApiKey !==
        undefined
      ) {
        config.adsterraApiKey =
          adsterraApiKey;
      }

      if (
        cpmPercent !== undefined
      ) {
        config.cpmPercent =
          Number(cpmPercent);
      }

      if (
        revenuePercent !==
        undefined
      ) {
        config.revenuePercent =
          Number(revenuePercent);
      }

      await config.save();

      return res.status(200).json({
        success: true,
        message:
          "Config updated successfully",
        data: config,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to update config",
        error: error.message,
      });
    }
  };