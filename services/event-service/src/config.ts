import "dotenv/config";
import { requireNumberEnv, requireEnv } from "@analytics/shared-infra";

export const config = {
  port: requireNumberEnv("PORT"),
  mongoUrl: requireEnv("MONGO_URL"),
  redisHost: requireEnv("REDIS_HOST"),
  redisPort: requireNumberEnv("REDIS_PORT"),
};
