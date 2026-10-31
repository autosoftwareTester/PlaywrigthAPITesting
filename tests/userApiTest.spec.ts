import { test, expect } from "@playwright/test";
import { APIFactory } from "../api-src/utils/apiFactory";
import { logger } from "../api-src/utils/logger";
import { UserApi } from "../api-src/api/userApi";
import ApiContext from "../api-src/utils/apiContest";
import { RegisterApi } from "../api-src/api/registerApi";

let userApi: UserApi;

// Playwrigth Hooks
test.beforeAll(async () => {
  const request = await ApiContext.getAPIRequestInstance();
  const apiFactory = new APIFactory();

  expect(request).not.toBeNull();
  
  userApi = await apiFactory.getApi<UserApi>("UserApi", request);
  logger.info(`User Api test suite: ${userApi}`);
});

test.afterAll(async () => {
  await ApiContext.closeAPIRequestInstance();
  logger.info(`User API tessts suite finished.`);
});
test.describe("Test case 1: Should get user details with userId ", async () => {
  process.stdout.write("Test Suite Level");
  logger.info("Test Suite Level");

  const userId = 1;
  const userApiResponse = await userApi.getUser(userId);
  logger.info(`User response: ${await userApiResponse.json()}`);

  // Assertions
  const responseBody = await userApiResponse.json();
  expect(userApiResponse.ok()).toBeTruthy();
  expect(responseBody.data.id).toBe(userId);
  expect(responseBody.data.email).toBe("george.bluth@reqres.in");
  expect(responseBody.context).toBe("keyless_success");
  logger.info(`User details retrieved succesfully for ID: ${userId}`);

  test("Test case 2: Should create a new user", async () => {
    const userData = { name: "sam", job: "tester" };
    const userApiResponse = await userApi.CreateUser(userData);

    //Assertion
    expect(userApiResponse.timing()).toBeGreaterThan(1);
    expect(userApiResponse.status).toBe(201);
    const responseBody = await userApiResponse.json();
    expect(responseBody.name).toBe(userData.name);
    expect(responseBody.job).toBe(userData.job);
    expect(responseBody.createdAt).not.toBeNull();
  });
});
