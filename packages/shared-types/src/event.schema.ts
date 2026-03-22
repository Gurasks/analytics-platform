import { z } from "zod";
import mongoose from "mongoose";

export const createEventSchema = z.object({
  type: z.string(),
  userId: z.string(),
});

export const getEventsSchema = z.object({
  cursor: z
    .string()
    .optional()
    .refine((val) => !val || mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid cursor",
    }),

  limit: z.coerce.number().int().positive().max(50).optional(),

  type: z.string().optional(),
  userId: z.string().optional(),
});
