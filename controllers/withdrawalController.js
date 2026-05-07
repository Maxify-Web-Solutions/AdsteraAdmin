// controllers/withdrawalController.js

const Withdrawal = require("../models/withdrawalModel");
const User = require("../models/authmodel");



// ✅ 2. Get My Withdrawals
exports.getMyWithdrawals = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const withdrawals = await Withdrawal.find({ userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: withdrawals.length,
      withdrawals,
    });

  } catch (error) {
    console.error("Get Withdrawals Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ✅ 3. Admin - Get All Withdrawals
exports.getAllWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find()
      .populate("userId", "name email mobile")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      withdrawals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ✅ 4. Admin - Approve / Reject
exports.updateWithdrawalStatus = async (req, res) => {
  try {
    const { withdrawalId, status, remark } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const withdrawal = await Withdrawal.findById(withdrawalId);

    if (!withdrawal) {
      return res.status(404).json({
        success: false,
        message: "Withdrawal not found",
      });
    }

    if (withdrawal.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Already processed",
      });
    }

    withdrawal.status = status;
    withdrawal.adminRemark = remark || "";

    // 🔁 Refund if rejected
    if (status === "rejected") {
      const user = await User.findById(withdrawal.userId);
      user.revenue += withdrawal.amount;
      await user.save();
    }

    await withdrawal.save();

    res.status(200).json({
      success: true,
      message: `Withdrawal ${status}`,
      withdrawal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};