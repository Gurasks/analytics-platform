import { z } from "zod";

export const createEventSchema = z.object({
  type: z.string(),
  userId: z.string(),
});
