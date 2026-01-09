interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

const getEnv = (key: string): string => {
  const value = Bun.env[key];
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const getNumberEnv = (key: string): number => {
  const value = Number(getEnv(key));
  if (isNaN(value)) {
    throw new Error(`Invalid number value for ${key}`);
  }
  return value;
};

export const env: EnvConfig = {
  NODE_ENV: getEnv("NODE_ENV"),
  PORT: getNumberEnv("PORT"),
  DB_HOST: getEnv("DB_HOST"),
  DB_PORT: getNumberEnv("DB_PORT"),
  DB_USER: getEnv("DB_USER"),
  DB_PASSWORD: getEnv("DB_PASSWORD"),
  DB_NAME: getEnv("DB_NAME"),
};
