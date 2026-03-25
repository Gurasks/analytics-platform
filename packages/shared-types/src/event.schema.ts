import { z } from "zod";

export const createEventSchema = z.object({
  eventId: z.string(),
  type: z.string(), //TODO: z.enum(["click", "view", "purchase"]) add later
  userId: z.string(),
});

export const trackEventSchema = z.object({
  type: z.string(),
  userId: z.string(),
});

export const eventStatSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  groupBy: z.enum(["TYPE", "USER", "DAY"]),
});

export const getEventsSchema = z.object({
  cursor: z
    .string()
    .optional()
    .refine((val) => !val || /^[a-f\d]{24}$/i.test(val), {
      message: "Invalid cursor",
    }),

  limit: z.coerce.number().int().positive().max(50).optional(),

  type: z.string().optional(),
  userId: z.string().optional(),
});

export const eventsByTypeSchema = z.object({
  key: z.string(),
  count: z.number(),
});

export const getStatsResponseSchema = z.object({
  eventStats: z.array(eventsByTypeSchema),
});
