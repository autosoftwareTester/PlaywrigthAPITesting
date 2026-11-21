import { Page, Locator } from "@playwright/test";
import { CommonUtils } from "../../api/utils/commonUtils";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput!: Locator;
  readonly passwordInput!: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = this.page.locator("#username");
    this.passwordInput = this.page.locator("#password");
  }

  public async navigateToLoginPage(url: string): Promise<void> {
    await this.page.goto(url);
  }

  public async pageTitle(): Promise<string> {
    return this.page.title();
  }

  public async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.page.click("#loginButton");
  }
}
