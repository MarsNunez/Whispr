import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "../app.js";

dotenv.config();

let connectionPromise = null;

const connectToDatabase = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL environment variable is not defined");
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO_URL);
  }

  await connectionPromise;
};

const handler = async (req, res) => {
  await connectToDatabase();
  return new Promise((resolve, reject) => {
    res.on("finish", resolve);
    res.on("close", resolve);
    res.on("error", reject);
    app(req, res, (err) => {
      if (err) {
        reject(err);
      }
    });
  });
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
