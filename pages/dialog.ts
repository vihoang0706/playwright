import { Page, expect, test } from "@playwright/test";

export default class Dialog {
  message: string;

  constructor(private readonly page: Page) {
    this.message = "";
  }

  async verifyMessageDisplays(msg: string): Promise<void> {
    console.log(this.message);
    expect(msg).toEqual(this.message);
  }

  async handleDialog(): Promise<void> {
    const dialog = await this.page.waitForEvent("dialog", { timeout: 5000 });
    this.message = dialog.message();
    await dialog.accept();
  }
}
