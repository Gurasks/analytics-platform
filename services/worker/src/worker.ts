import { Worker } from "bullmq";

const worker = new Worker(
  "events",
  async (job) => {
    console.log("📦 [worker] processing job:", job.data);
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
