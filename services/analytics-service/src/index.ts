import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { config } from "./config";
import analyticsRoutes from "./routes/analytic.routes";

const app = express();

app.use(express.json());
app.use(analyticsRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "analytics-service" });
});

async function start() {
  try {
    await mongoose.connect(config.mongoUrl);
    console.log("🗄️ [analytics] connected to MongoDB");

    app.listen(config.port, () => {
      console.log(`📊 [analytics] → http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start analytics service:", error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  console.log("🛑 [analytics] shutting down...");
  await mongoose.disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("🛑 [analytics] shutting down...");
  await mongoose.disconnect();
  process.exit(0);
});

start();
