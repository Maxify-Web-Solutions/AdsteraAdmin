const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token;

    // ✅ 1. Get token from cookies OR headers
    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ❌ No token
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    // ✅ 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ 3. Attach user to request
    req.user = decoded;

    next();

  } catch (error) {
    // 🔥 Better error handling
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired",
      });
    }

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;