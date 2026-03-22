import { z } from "zod";
import { createEventSchema, getEventsSchema } from "./event.schema";

export type GetEventsQuery = z.infer<typeof getEventsSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
