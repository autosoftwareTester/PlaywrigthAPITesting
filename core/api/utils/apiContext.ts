import { request, APIRequestContext } from "@playwright/test";
import { getEnvironment } from "../config/environments";

// Singleton Pattern
class ApiContext {
  private static apiRequestContext: APIRequestContext | null = null;
  private constructor() {}

  public static async getAPIRequestInstance(): Promise<APIRequestContext> {
    if (!this.apiRequestContext) {
      const environment = getEnvironment();
      this.apiRequestContext = await request.newContext({
        baseURL: environment.baseUrl,
        timeout: environment.timeouts,
        extraHTTPHeaders: environment.apiKey
          ? { "x-api-key": environment.apiKey }
          : {},
      });
    }
    return this.apiRequestContext;
  }

  public static async closeAPIRequestInstance(): Promise<void> {
    if (this.apiRequestContext) {
      await this.apiRequestContext.dispose(); // Dispose the the playwright
    }
    //Reset instance to nothing
    ApiContext.apiRequestContext = null;
  }
}

export default ApiContext;
