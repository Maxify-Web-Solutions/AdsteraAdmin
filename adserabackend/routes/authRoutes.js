const express = require("express");
const router = express.Router();
const { register, login, getProfile, logout, getallusers, blockUser, unblockUser, updateUser } = require("../controllers/auth");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.get("/admin/users", getallusers)

router.put("/block/:userId", blockUser);
router.put("/unblock/:userId", unblockUser);

// UPDATE USER
router.put("/update/:userId", updateUser);
router.post("/logout", logout);

module.exports = router;