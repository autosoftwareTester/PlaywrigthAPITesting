import { test, expect } from "../fixtures/test-fixtures";

test("Test case", async ({ userApi, logger, commonUtils }) => {

  logger.info(`${commonUtils.generateRandomString(10)}`);
});
test.describe("Test case ", async () => {
  process.stdout.write("Test Suite Level");

  test("Should create a new user", async ({ userApi, logger, commonUtils }) => {
    const userData = { name: "sam", job: "tester" };
    const userApiResponse = await userApi.CreateUser(userData);

    logger.info(
      `Test case 1: Should create a new user response: ${commonUtils.generateRandomString(10)}`,
    );
    logger.info(
      `Test case 1: Should create a new user response: ${JSON.stringify(userApiResponse)}`,
    );

    userApiResponse.ok()
      ? logger.info(`Test case 1: Should create a new user response is OK`)
      : logger.error(
          `Test case 1: Should create a new user response is NOT OK`,
        );

    const responseBody = await userApiResponse.json();

    //Assertion
    expect(userApiResponse.timing()).toBeGreaterThan(1);
    expect(userApiResponse.status).toBe(201);

    expect(responseBody.name).toBe(userData.name);
    expect(responseBody.job).toBe(userData.job);
    expect(responseBody.createdAt).not.toBeNull();

    test.afterAll(async () => {
      logger.info("Test case 1: Should create a new user finished");
    });
  });
});
