import { z } from "zod";
import { getEventsSchema } from "./event.schema";

export type GetEventsQuery = z.infer<typeof getEventsSchema>;
