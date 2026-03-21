import { EventModel } from "@analytics/models";

import { eventQueue } from "../queue";
import { GetEventsQuery } from "../dtos/event.dto";

type Query = Record<string, unknown>;

export async function createEvent(event: {}) {
  console.log("📩 [event] received:", event);

  await eventQueue.add("track-event", event);

  return { status: "queued" };
}

export async function getEvents({ cursor, limit = 10 }: GetEventsQuery) {
  const parsedLimit = Number(limit) || 10;

  const query: Query = {};

  if (cursor) {
    query._id = { $lt: cursor };
  }

  const data = await EventModel.find(query)
    .sort({ _id: -1 })
    .limit(parsedLimit);

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
