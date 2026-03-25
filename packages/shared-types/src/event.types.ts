import { z } from "zod";
import {
  createEventSchema,
  eventsByTypeSchema,
  eventStatSchema,
  getEventsSchema,
  getStatsResponseSchema,
} from "./event.schema";

export type GetEventsQuery = z.infer<typeof getEventsSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type EventStatsInput = z.infer<typeof eventStatSchema>;
export type EventsByType = z.infer<typeof eventsByTypeSchema>;
export type GetStatsResponse = z.infer<typeof getStatsResponseSchema>;
