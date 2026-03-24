import "dotenv/config";

import mongoose from "mongoose";
import { Worker } from "bullmq";
import { connectDB } from "./db";
import {
  EventModel,
  EventsByType,
  EventsByUser,
  EventsByDay,
} from "@analytics/models";
import { config } from "./config";

async function startWorker() {
  await connectDB();
  console.log("🗄️ [worker] connected to MongoDB");

  const worker = new Worker(
    "events",
    async (job) => {
      const event = job.data;
      if (!event?.eventId || !event?.type || !event?.userId) {
        console.warn(`⚠️ invalid job ${job.id}, skipping`, event);
        return;
      }

      console.log("📦 [worker] processing job:", event);

      const session = await mongoose.startSession();

      try {
        let inserted = false;

        try {
          await EventModel.create([event]);
          inserted = true;
        } catch (err: any) {
          if (err.code === 11000) {
            console.log(`⚠️ duplicate event ${event.eventId}, skipping`);
            return;
          }
          throw err;
        }

        await session.withTransaction(
          async () => {
            const day = new Date(
              event.createdAt || Date.now(),
            ).toLocaleDateString("en-CA");

            await Promise.all([
              EventsByType.updateOne(
                { type: event.type },
                { $inc: { count: 1 } },
                { upsert: true, session },
              ),
              EventsByUser.updateOne(
                { userId: event.userId },
                { $inc: { count: 1 } },
                { upsert: true, session },
              ),
              EventsByDay.updateOne(
                { date: day },
                { $inc: { count: 1 } },
                { upsert: true, session },
              ),
            ]);
          },
          {
            readConcern: { level: "local" },
            writeConcern: { w: "majority" },
          },
        );

        if (inserted) {
          console.log(`✅ [worker] processed job ${job.id}`);
        }
      } catch (err) {
        console.error(`❌ [worker] transaction failed for job ${job.id}`, err);
        throw err;
      } finally {
        await session.endSession();
      }
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
    if (job.finishedOn && job.processedOn) {
      console.log(
        `⏱️ job ${job.id} took ${job.finishedOn - job.processedOn}ms`,
      );
    }
  });

  worker.on("failed", (job, err) => {
    console.error(`💥 [worker] job ${job?.id} failed`, err);
  });

  worker.on("error", (err) => {
    console.error("🚨 [worker] worker error", err);
  });

  console.log("🚀 [worker] started");
}

startWorker();
