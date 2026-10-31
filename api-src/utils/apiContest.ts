import { request, APIRequestContext } from "@playwright/test";
import config from "../../playwright.config";


// Singleton Pattern
class ApiContext {
  private static apiRequestContext: APIRequestContext | null = null;
  private constructor() {}

  public static async getAPIRequestInstance(): Promise<APIRequestContext> {
    if (!this.apiRequestContext) {
      this.apiRequestContext = await request.newContext({
        baseURL: config.use?.baseURL,
        extraHTTPHeaders: config.use?.extraHTTPHeaders,
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
