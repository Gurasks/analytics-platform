import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { config } from "./config";
import eventRoutes from "./routes/event.routes";

const app = express();
app.use(express.json());
app.use(eventRoutes);

async function start() {
  await mongoose.connect(config.mongoUrl);

  console.log("🗄️ [event] connected to MongoDB");

  app.listen(config.port, () => {
    console.log(`🚀 [event] → http://localhost:${config.port}`);
  });
}

start();
