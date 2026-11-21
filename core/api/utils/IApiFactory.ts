import { APIRequestContext } from "@playwright/test";

export interface IApiFactory {
  getApi<T>(apiName: string, requestContext: APIRequestContext): Promise<T>;
}
