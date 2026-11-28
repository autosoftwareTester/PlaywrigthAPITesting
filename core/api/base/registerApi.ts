import { APIResponse } from "@playwright/test";
import BaseApi from "./baseApi";

export class RegisterApi extends BaseApi {
  public async Register(
    userData: Record<string, unknown>,
  ): Promise<APIResponse> {
    return await this.post("/api/register", userData);
  }
}
