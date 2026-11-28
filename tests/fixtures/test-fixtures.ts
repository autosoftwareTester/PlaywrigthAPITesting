import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../../core/web/pages/loginPage";
import { DashboardPage } from "../../core/web/pages/dashboardPage";
import { APIFactory } from "../../core/api/utils/apiFactory";
import { logger, httpLogger } from "../../core/api/utils/logger";
import { CommonUtils } from "../../core/api/utils/commonUtils";
import { UserApi } from "../../core/api/base/userApi";
import ApiContext from "../../core/api/utils/apiContext";
import { RegisterApi } from "../../core/api/base/registerApi";
import { BrowserFactory } from "../../core/web/base/BrowserFactory";

// Step 1: Define the fixture type
type WorkerFixture = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  apiFactory: APIFactory;
  userApi: UserApi;
  registerApi: RegisterApi;
  apiContext: ApiContext;
  logger: typeof logger;
  httpLogger: typeof httpLogger;
  commonUtils: CommonUtils;
  webTestFactory: BrowserFactory;
};

// Step 2: Define the fixture
export const test = base.extend<WorkerFixture>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  logger: async ({}, use) => {
    await use(logger);
  },
  httpLogger: async ({}, use) => {
    await use(httpLogger);
  },
  userApi: async ({}, use) => {
    // setup API request context
    const request = await ApiContext.getAPIRequestInstance();
    expect(request).not.toBeNull();

    const apiFactory = new APIFactory();
    const userApi = await apiFactory.getApi<UserApi>("UserApi", request);
    logger.info(`User Api test suite: ${userApi}`);
    await use(userApi);

    // teardown logic for the fixture
    await ApiContext.closeAPIRequestInstance();
    logger.info(`User API tests suite finished.`);
  },

  commonUtils: async ({}, use) => {
    // Setup logic for the fixture
    await use(new CommonUtils());

    // teardown logic for the fixture
    logger.info(`CommonUtils tests suite finished.`);
  },
  webTestFactory: async ({ page }, use) => {
    logger.info(`Factory Instance created and to be with the classes`)
    await use(new BrowserFactory());
  },
});

export { expect };
