require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/connectdb");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

connectDB();

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});