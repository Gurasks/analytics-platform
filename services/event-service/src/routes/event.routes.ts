import { Router } from "express";
import {
  createEventController,
  getEventsController,
} from "../controllers/event.controller";
import { validate } from "../middleware/validate";
import { createEventSchema, getEventsSchema } from "@analytics/shared-types";

const router = Router();

router.post(
  "/events",
  validate(createEventSchema, "body"),
  createEventController,
);
router.get("/events", validate(getEventsSchema, "query"), getEventsController);

export default router;
