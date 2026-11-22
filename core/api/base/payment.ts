import { APIResponse } from "@playwright/test";
import BaseApi from "./baseApi";

export class Payment extends BaseApi{

    public async getPayment(endpoint: string): Promise<APIResponse>   {
        return await this.get(endpoint);
    }
    public async updatePayment(endpoint: string, body: any): Promise<APIResponse> {
        return await this.put(endpoint, body);
    }
}