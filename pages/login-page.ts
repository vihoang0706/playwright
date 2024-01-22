import { test, expect, type Locator, type Page } from '@playwright/test';

export default class LoginPage {
    private readonly cbbRepository: Locator = this.page.locator('#repository');
    private readonly txtUserName: Locator = this.page.locator('#username');
    private readonly txtPassword: Locator = this.page.locator('#password');
    private readonly btnLogin: Locator = this.page.locator('.btn-login');

    constructor(private readonly page: Page) { }

    async open(): Promise<void> {
        await this.page.goto('/TADashboard/login.jsp');
    }

    async login(username: string, password: string, repo?: string): Promise<void> {
        if (repo !== null && repo !== undefined) await this.cbbRepository.selectOption(repo);
        await this.txtUserName.fill(username);
        await this.txtPassword.fill(password);
        await this.btnLogin.click();
    }

    async displays(): Promise<void> {
        await expect(this.txtUserName).toBeVisible();
        await expect(this.txtPassword).toBeVisible();
    }
}
