import "dotenv/config";

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`❌ Missing environment variable: ${name}`);
  }

  return value;
}

export const config = {
  mongoUrl: requireEnv("MONGO_URL"),
  redisHost: requireEnv("REDIS_HOST"),
  redisPort: Number(requireEnv("REDIS_PORT")),
};
