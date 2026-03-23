import { ValidatedRequest } from "@analytics/shared-infra";
import { CreateEventInput, GetEventsQuery } from "@analytics/shared-types";
import { Response } from "express";
import { createEvent, getEvents } from "../services/event.service";

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
