const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
  logout,
  getallusers
} = require("../controllers/auth");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.get("/profile", authMiddleware, getProfile);

router.post("/logout", authMiddleware, logout);

router.get("/admin/users",getallusers)

module.exports = router;