import express from "express";
import { eventQueue } from "./queue";

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  console.log("📩 [event] received:", event);

  await eventQueue.add("track-event", event);

  res.status(201).json({
    status: "queued",
  });
});

app.listen(4001, () => {
  console.log("🚀 [event] → http://localhost:4001");
});
