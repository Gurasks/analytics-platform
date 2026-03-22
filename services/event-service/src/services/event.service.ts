import { EventModel } from "@analytics/models";
import { GetEventsQuery } from "@analytics/shared-types";
import { eventQueue } from "../queue";
import mongoose from "mongoose";

type MongoQuery = {
  _id?: { $lt: mongoose.Types.ObjectId };
  type?: string;
  userId?: string;
};

export async function createEvent(event: {}) {
  console.log("📩 [event] received:", event);

  await eventQueue.add("track-event", event);

  return { status: "queued" };
}

export async function getEvents({
  cursor,
  limit,
  type,
  userId,
}: GetEventsQuery) {
  const parsedLimit = limit ?? 10;

  const query: MongoQuery = {};

  if (cursor) {
    query._id = { $lt: new mongoose.Types.ObjectId(cursor) };
  }

  if (type) {
    query.type = type;
  }

  if (userId) {
    query.userId = userId;
  }

  const data = await EventModel.find(query)
    .sort({ _id: -1 })
    .limit(parsedLimit)
    .lean();

  const nextCursor = data.length ? data[data.length - 1]._id.toString() : null;

  const formatted = data.map((doc) => ({
    id: doc._id.toString(),
    type: doc.type,
    userId: doc.userId,
    createdAt: doc.createdAt,
  }));

  return {
    data: formatted,
    pagination: {
      nextCursor,
      hasMore: data.length === parsedLimit,
    },
  };
}
