import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { userRouter } from "./routes/userRoutes.js";
import { audioRouter } from "./routes/audioRoutes.js";
import { postRouter } from "./routes/postRoutes.js";
import { loginRoute } from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
const mongoUrl = process.env.MONGO_URL;

const alwaysAllowedOrigins = new Set([
  "http://localhost:3000",
  "https://localhost:3000",
]);

const configuredOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = new Set(configuredOrigins);

if (process.env.FRONTEND_URL) {
  allowedOrigins.add(process.env.FRONTEND_URL.trim());
}

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (
      allowedOrigins.size === 0 ||
      allowedOrigins.has(origin) ||
      alwaysAllowedOrigins.has(origin)
    ) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} not allowed by CORS`), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "x-vercel-protection-bypass",
  ],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use("/users", userRouter);
app.use("/audios", audioRouter);
app.use("/posts", postRouter);

app.post("/auth/login", loginRoute);

app.get("/", (req, res) => {
  res.send("Hello New Worldd");
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
