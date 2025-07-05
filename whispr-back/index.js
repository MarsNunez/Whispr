import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/userRoutes.js";
import { audioRouter } from "./routes/audioRoutes.js";
import { postRouter } from "./routes/postRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
const mongoUrl = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/audios", audioRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Hello New World");
});

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
