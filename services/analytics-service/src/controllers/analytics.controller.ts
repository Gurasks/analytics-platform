import { Response } from "express";
import { ValidatedRequest } from "@analytics/shared-infra";
import { EventStatsInput } from "@analytics/shared-types";
import { getEventStats } from "../services/analytics.service";

export async function getEventStatsController(
  req: ValidatedRequest<EventStatsInput>,
  res: Response,
) {
  const result = await getEventStats(req.validated!);
  res.json(result);
}
