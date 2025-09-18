import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3002;
const mongoUrl = process.env.MONGO_URL;

const startServer = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🟢 Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

startServer();
