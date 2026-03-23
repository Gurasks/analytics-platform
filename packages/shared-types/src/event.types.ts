import { z } from "zod";
import {
  createEventSchema,
  eventStatSchema,
  getEventsSchema,
} from "./event.schema";

export type GetEventsQuery = z.infer<typeof getEventsSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type EventStatsInput = z.infer<typeof eventStatSchema>;
