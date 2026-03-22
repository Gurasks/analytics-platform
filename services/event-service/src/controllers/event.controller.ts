import { Response } from "express";
import { createEvent, getEvents } from "../services/event.service";
import { CreateEventInput, GetEventsQuery } from "@analytics/shared-types";
import { ValidatedRequest } from "../types/validated-request";

export async function createEventController(
  req: ValidatedRequest<CreateEventInput>,
  res: Response,
) {
  const result = await createEvent(req.validated!);
  res.status(201).json(result);
}

export async function getEventsController(
  req: ValidatedRequest<GetEventsQuery>,
  res: Response,
) {
  const result = await getEvents(req.validated!);
  res.json(result);
}
