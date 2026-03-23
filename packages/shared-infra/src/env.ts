export function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`❌ Missing environment variable: ${name}`);
  }

  return value;
}

export function requireNumberEnv(name: string): number {
  const value = requireEnv(name);
  const number = Number(value);

  if (isNaN(number)) {
    throw new Error(`❌ Invalid number for environment variable: ${name}`);
  }

  return number;
}
