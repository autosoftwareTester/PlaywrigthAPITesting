import { Page, chromium } from "@playwright/test";

export class BrowserFactory {
  public static async getPlaywrightInstance(): Promise<Page> {
    const browserInstance = await chromium.launch({
      headless: false,
      ignoreDefaultArgs: false,
      channel: "chrome",
      slowMo: 10,
      timeout: 5000,
    });

    const browserContext = await browserInstance.newContext({storageState: 'auth.json'});
    return browserContext.newPage();
  }
}
