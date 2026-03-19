import express from "express";

const app = express();
app.use(express.json());

app.listen(4001, () => {
  console.log("🚀 Event service running on http://localhost:4001");
});

app.post("/events", async (req, res) => {
  const event = req.body;

  console.log("📩 Received event:", event);

  res.send({ status: "ok" });
});
