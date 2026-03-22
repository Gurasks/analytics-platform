import { Request, Response } from "express";
import { createEvent, getEvents } from "../services/event.service";
import { createEventSchema } from "../dtos/event.schema";
import { getEventsSchema } from "@analytics/shared-types";

export async function createEventController(req: Request, res: Response) {
  try {
    const parsed = createEventSchema.parse(req.body);

    const result = await createEvent(parsed);

    res.status(201).json(result);
  } catch (error) {
    console.error("❌ [event] validation failed:", error);
    res.status(400).json({ error: "Invalid request body" });
  }
}

export async function getEventsController(req: Request, res: Response) {
  try {
    const parsed = getEventsSchema.parse(req.query);

    const result = await getEvents(parsed);

    res.json(result);
  } catch (error) {
    console.error("❌ [event] validation failed:", error);
    res.status(400).json({ error: "Invalid query params" });
  }
}
