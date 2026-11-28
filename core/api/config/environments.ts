import process from "process";

export interface Environment {
  baseUrl: string;
  apiKey?: string;
  timeouts: number;
}

export const environments: Record<string, Environment> = {
  dev: {
    baseUrl: "https://reqres.in/api",
    apiKey: process.env.REQRES_API_KEY,
    timeouts: 10_000,
  },
  staging: {
    baseUrl: "https://reqres.in/api",
    apiKey: process.env.REQRES_API_KEY,
    timeouts: 10_000,
  },
};

export const getEnvironment = (): Environment => {
  const env = process.env.TEST_ENV || "dev";
  return environments[env] || environments.dev;
};
