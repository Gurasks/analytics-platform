import { validate } from "@analytics/shared-infra";
import { createEventSchema, getEventsSchema } from "@analytics/shared-types";
import { Router } from "express";
import {
  createEventController,
  getEventsController,
} from "../controllers/event.controller";

const router = Router();

router.post(
  "/events",
  validate(createEventSchema, "body"),
  createEventController,
);
router.get("/events", validate(getEventsSchema, "query"), getEventsController);

export default router;
