import { expect, type Locator, type Page } from '@playwright/test';

export default class LoginPage {
    private readonly cbbRepository: Locator = this.page.locator('#repository');
    private readonly txtUserName: Locator = this.page.locator('#username');
    private readonly txtPassword: Locator = this.page.locator('#password');
    private readonly btnLogin: Locator = this.page.locator('.btn-login');

    constructor(private readonly page: Page) { }

    async open(): Promise<void> {
        await this.page.goto('/TADashboard/login.jsp');
    }

    async login(username: string, password: string): Promise<void> {
        await this.txtUserName.fill(username);
        await this.txtPassword.fill(password);
        await this.btnLogin.click();
    }

    async verifyErrorMessage(message: string): Promise<void> {
        await this.page.on('dialog', async dialog => {
            await expect(dialog.message()).toBe(message);
            await dialog.dismiss();
        });
    }
}