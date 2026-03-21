import "dotenv/config";

import { Worker } from "bullmq";
import { connectDB } from "./db";
import { EventModel } from "@analytics/models";
import { config } from "./config";

async function startWorker() {
  await connectDB();
  console.log("🗄️ [worker] connected to MongoDB");

  const worker = new Worker(
    "events",
    async (job) => {
      console.log("📦 [worker] processing job:", job.data);

      await EventModel.create(job.data);
    },
    {
      connection: {
        host: config.redisHost,
        port: config.redisPort,
      },
    },
  );

  worker.on("ready", () => {
    console.log("⚙️ [worker] running and waiting for jobs...");
  });

  worker.on("completed", (job) => {
    console.log(`✅ [worker] completed job ${job.id}`);
  });

  worker.on("failed", (job, err) => {
    console.error(`❌ [worker] failed job ${job?.id}`, err);
  });

  console.log("🚀 [worker] started");
}

startWorker();
