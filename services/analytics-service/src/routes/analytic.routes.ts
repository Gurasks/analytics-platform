import { Router } from "express";
import { getEventStatsController } from "../controllers/analytics.controller";
import { validate } from "@analytics/shared-infra";
import { eventStatSchema } from "@analytics/shared-types";

const router = Router();

router.post(
  "/stats",
  validate(eventStatSchema, "body"),
  getEventStatsController,
);

export default router;
