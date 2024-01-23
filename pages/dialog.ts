import { Page, expect, test } from "@playwright/test";

export default class Dialog {
  message: string;

  constructor(private readonly page: Page) {
    this.message = "";
  }

  async verifyMessageDisplays(msg: string): Promise<void> {
    await test.step('Verify dialog message content', () => {
      console.log(this.message);
      expect(msg).toEqual(this.message);
    })
  }

  async handleDialog(): Promise<void> {
    await test.step('Get dialog message then accept it', async () => {
      const dialog = await this.page.waitForEvent("dialog", { timeout: 5000 });
      this.message = dialog.message();
      await dialog.accept();
    });
  }
}