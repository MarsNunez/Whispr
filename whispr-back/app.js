import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { userRouter } from "./routes/userRoutes.js";
import { audioRouter } from "./routes/audioRoutes.js";
import { postRouter } from "./routes/postRoutes.js";
import { loginRoute } from "./routes/authRoutes.js";

dotenv.config();

const buildAllowedOrigins = () => {
  const defaults = ["http://localhost:3000", "https://localhost:3000"];
  const fromEnv = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  const origins = new Set([...defaults, ...fromEnv]);

  if (process.env.FRONTEND_URL) {
    origins.add(process.env.FRONTEND_URL.trim());
  }

  return origins;
};

const createCorsOptions = () => {
  const allowedOrigins = buildAllowedOrigins();

  return {
    origin(origin, callback) {
      if (!origin || allowedOrigins.size === 0 || allowedOrigins.has(origin)) {
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
      "vercel-automation-bypass-secret",
      "VERCEL-AUTOMATION-BYPASS-SECRET",
    ],
  };
};

const app = express();

app.use(cors(createCorsOptions()));
app.use(express.json());
app.use("/users", userRouter);
app.use("/audios", audioRouter);
app.use("/posts", postRouter);

app.post("/auth/login", loginRoute);

app.get("/", (req, res) => {
  res.send("Hello New Worldd");
});

export default app;
