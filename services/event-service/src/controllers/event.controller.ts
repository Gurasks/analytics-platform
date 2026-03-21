import { Request, Response } from "express";
import { CreateEventBody, GetEventsQuery } from "../dtos/event.dto";
import { createEvent, getEvents } from "../services/event.service";

export async function createEventController(
  req: Request<{}, {}, CreateEventBody>,
  res: Response,
) {
  try {
    const result = await createEvent(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("❌ [event] create failed:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
}

export async function getEventsController(
  req: Request<{}, {}, {}, GetEventsQuery>,
  res: Response,
) {
  try {
    const result = await getEvents(req.query);
    res.json(result);
  } catch (error) {
    console.error("❌ [event] fetch failed:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
}
