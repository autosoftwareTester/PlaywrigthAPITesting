import BaseApi from "./baseApi";
import { APIResponse } from "@playwright/test";

// Page Object Model
export class UserApi extends BaseApi {
  private endpoint = "/api/users";

  public async getUser(userId: number): Promise<APIResponse> {
    return await this.get(`${this.endpoint}/${userId}`);
  }

  public async CreateUser(userData: { name: string; job: string }) {
    return await this.post(`${this.endpoint}`, {
      ...userData,
    });
  }

  public async UpdateUser(
    userId: string,
    userData: { name: string; job: string },
  ): Promise<APIResponse> {
    return await this.put(`${this.endpoint}/${userId}`, {
      ...userData,
    });
  }

  public async DeleteUser(userId: string): Promise<APIResponse> {
    return await this.delete(`${this.endpoint}`, userId);
  }

  public async ListUsers(page: number): Promise<APIResponse> {
    return await this.get(`${this.endpoint}?page=${page}`);
  }
}
