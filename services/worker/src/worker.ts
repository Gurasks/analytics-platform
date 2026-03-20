import { Worker } from "bullmq";
import { connectDB } from "./db";
import { EventModel } from "./models/Event";

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
        host: "localhost",
        port: 6379,
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
