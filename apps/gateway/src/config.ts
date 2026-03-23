import "dotenv/config";
import { requireNumberEnv, requireEnv } from "@analytics/shared-infra";

export const config = {
  port: requireNumberEnv("PORT"),
  eventServiceUrl: requireEnv("EVENT_SERVICE_URL"),
  analyticsServiceUrl: requireEnv("ANALYTICS_SERVICE_URL"),
};
