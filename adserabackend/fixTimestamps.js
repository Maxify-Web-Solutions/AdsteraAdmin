require("dotenv").config();
const mongoose = require("mongoose");

// 👇 ENV se URI le raha hai
const MONGO_URI = process.env.MONGO_URI;

// flexible schema (no restriction)
const userSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.model("users", userSchema);

async function fixTimestamps() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");

    const result = await User.updateMany(
      { createdAt: { $exists: false } },
      {
        $set: {
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    console.log(`✅ Updated Users: ${result.modifiedCount}`);

    process.exit();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

fixTimestamps();