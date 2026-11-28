import { test, expect } from "../fixtures/test-fixtures";

test.describe("User API", () => {
  test.skip(
    !process.env.REQRES_API_KEY,
    "Set REQRES_API_KEY to run authenticated ReqRes tests.",
  );

  test("gets a user by ID", async ({ userApi }) => {
    const response = await userApi.getUser(1);
    expect(response.status()).toBe(200);
    expect((await response.json()).data.id).toBe(1);
  });

  test("creates a user", async ({ userApi }) => {
    const userData = { name: "sam", job: "tester" };
    const response = await userApi.CreateUser(userData);
    const responseBody = await response.json();

    expect(response.status()).toBe(201);
    expect(responseBody.name).toBe(userData.name);
    expect(responseBody.job).toBe(userData.job);
    expect(responseBody.createdAt).toBeTruthy();
  });
});
