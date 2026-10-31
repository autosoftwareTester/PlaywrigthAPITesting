import process from "process";

export interface Environment {
  baseUrl: string;
  apiKey?: string;
  timeouts: number;
  retries: number;
}

export const environments: Record<string, Environment> = {
  dev: {
    baseUrl: "https://reqres.in/api",
    timeouts: 3000,
    retries: 2,
  },
  staging: {
    baseUrl: "https://reqres.in/api/users",
    timeouts: 3000,
    retries: 2,
  },
};

export const getEnvironment = (): Environment => {
  const env = process.env.TEST_ENV || "dev";
  return environments[env] || environments.dev;
};
