const User = require("../models/authmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UAParser = require("ua-parser-js");


const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const register = async (req, res) => {

  try {

    const { name, email, password, mobile } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: "user"
    });

    res.json({
      success: true,
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Only admin can login."
      });
    }

    // ✅ USER-AGENT PARSE
    const ua = req.headers["user-agent"];
    const parser = new UAParser(ua);
    const device = parser.getDevice();
    const os = parser.getOS();
    const browser = parser.getBrowser();

    // ✅ UPDATE LAST LOGIN
    user.lastLogin = {
      date: new Date(),
      ip: req.ip || req.headers["x-forwarded-for"],
      device: device.model || "Desktop",
      os: os.name + " " + os.version,
      browser: browser.name + " " + browser.version
    };

    await user.save();

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const { password: pass, ...userData } = user._doc;

    res.json({
      success: true,
      message: "Login successful",
      user: userData
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Get Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const logout = async (req, res) => {

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  });

  res.json({
    success: true,
    message: "Logged out"
  });
};

const getallusers = async (req, res) => {
  try {

    const users = await User.find();

    res.json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

// UPDATE USER INFO
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const { name, email, mobile } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          email,
          mobile,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// BLOCK USER
exports.blockUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { status: "blocked" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User blocked successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UNBLOCK USER
exports.unblockUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { status: "active" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User unblocked successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  register,
  login,
  getProfile,
  logout,
  getallusers,
  blockUser,
  unblockUser,
  updateUser
  
};