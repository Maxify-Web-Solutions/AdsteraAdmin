const User = require("../models/authmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    // check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // check role
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Only admin can login."
      });
    }

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

  res.json({
    success: true,
    user: req.user
  });

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


module.exports = {
  register,
  login,
  getProfile,
  logout,
  getallusers
};