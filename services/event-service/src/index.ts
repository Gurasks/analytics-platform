import express from "express";
import { eventQueue } from "./queue";
import { EventModel } from "@analytics/models";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

async function start() {
  await mongoose.connect("mongodb://localhost:27017/analytics");

  console.log("🗄️ [event] connected to MongoDB");

  app.listen(4001, () => {
    console.log("🚀 [event] → http://localhost:4001");
  });
}

start();

app.post("/events", async (req, res) => {
  const event = req.body;

  console.log("📩 [event] received:", event);

  await eventQueue.add("track-event", event);

  res.status(201).json({
    status: "queued",
  });
});

app.get("/events", async (req, res) => {
  const events = await EventModel.find().sort({ createdAt: -1 });

  res.json(events);
});

app.listen(4001, () => {
  console.log("🚀 [event] → http://localhost:4001");
});
