import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testIgnore: "**/seed.spec.ts",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "web",
      testMatch: "**/web-tests/**/*.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "api",
      testMatch: "**/api-tests/**/*.spec.ts",
    },
  ],
});
