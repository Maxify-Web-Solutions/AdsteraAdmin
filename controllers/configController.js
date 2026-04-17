// controllers/configController.js

const Config = require("../models/Config");

// ✅ Admin: Update API Key
const updateAdsterraKey = async (req, res) => {
  try {
    const { adsterraApiKey } = req.body;

    if (!adsterraApiKey) {
      return res.status(400).json({ message: "API key is required" });
    }

    let config = await Config.findOne();

    if (!config) {
      config = await Config.create({ adsterraApiKey });
    } else {
      config.adsterraApiKey = adsterraApiKey;
      await config.save();
    }

    res.json({
      success: true,
      message: "Adsterra API Key updated successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ User: Get API Key (optional: hide full key)
const getAdsterraKey = async (req, res) => {
  try {
    const config = await Config.findOne().select("adsterraApiKey");

    res.json({
      success: true,
      adsterraApiKey: config?.adsterraApiKey || null,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateAdsterraKey,
  getAdsterraKey,
};