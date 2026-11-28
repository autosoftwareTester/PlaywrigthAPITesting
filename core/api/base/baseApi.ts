import { APIRequestContext, APIResponse } from "@playwright/test";
import { logger } from "../utils/logger";

// Template Method Design Pattern
// Abstract Common Functionalities

abstract class BaseApi {
  protected readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // Template Model Design Pattern
  // CRUD - Get, Post, Put, Delete
  protected async get(endpoint: string): Promise<APIResponse> {
    logger.info(`Sending ${HTTPMethod.GET.toString()} request to ${endpoint}`);
    const response = await this.request.get(endpoint, {
      maxRetries: 2,
      ignoreHTTPSErrors: true,
    });
    await this.logResponseStatus(response, HTTPMethod.GET.toString(), endpoint);
    return response;
  }

  protected async post(
    endpoint: string,
    body: Record<string, unknown>,
  ): Promise<APIResponse> {
    logger.info(`Sending ${HTTPMethod.POST.toString()} request to ${endpoint}
    with ${JSON.stringify(body)}`);
    const response = await this.request.post(endpoint, {
      data: body,
    });
    await this.logResponseStatus(response, HTTPMethod.POST.toString(), endpoint);
    return response;
  }

  protected async put(
    endpoint: string,
    body: Record<string, unknown>,
  ): Promise<APIResponse> {
    logger.info(`Sending ${HTTPMethod.PUT.toString()} request to ${endpoint} 
    with ${JSON.stringify(body)}`);
    const response = await this.request.put(endpoint, {
      data: body,
    });
    await this.logResponseStatus(response, HTTPMethod.PUT.toString(), endpoint);
    return response;
  }

  protected async delete(endpoint: string, id: string): Promise<APIResponse> {
    logger.info(
      `Sending ${HTTPMethod.DELETE.toString()} request to ${endpoint}`,
    );
    const response = await this.request.delete(`${endpoint}/${id}`);
    await this.logResponseStatus(
      response,
      HTTPMethod.DELETE.toString(),
      endpoint,
    );
    return response;
  }

  protected async logResponseStatus(
    response: APIResponse,
    method: string,
    endpoint: string,
  ): Promise<void> {
    if (response.ok()) {
      logger.info(`Response ${method} ${endpoint} :
            ${response.status()} - ${response.statusText()}`);
    } else {
      logger.error(
        `Response ERROR ${method} ${endpoint}: ${await response.text()}`,
      );
    }
  }
}

enum HTTPMethod {
  GET,
  POST,
  PUT,
  DELETE,
}

export default BaseApi;
