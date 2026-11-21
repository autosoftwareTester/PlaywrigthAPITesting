import { APIResponse } from "@playwright/test";
import BaseApi from "./baseApi";

export class RegisterApi extends BaseApi {
  public async Register(userData: string): Promise<APIResponse> {
    return await this.post(``, userData);
  }
}
