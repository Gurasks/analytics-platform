import "dotenv/config";

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`❌ Missing environment variable: ${name}`);
  }

  return value;
}

export const config = {
  port: Number(requireEnv("PORT")),
  eventServiceUrl: requireEnv("EVENT_SERVICE_URL"),
};
