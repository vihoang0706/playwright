import { expect, type Locator, type Page } from '@playwright/test';

export default class DashboardMainPage {
    private readonly activeMenuItem: Locator = this.page.locator('css=#main-menu li.active a.active');
    private readonly lnkLoggedInUser: Locator = this.page.locator('css=a[href="#Welcome"]');
    private readonly lnkLogout: Locator = this.page.getByRole('link', { name: 'Logout' });

    constructor(private readonly page: Page) { };

    async displays() {
        await expect(this.activeMenuItem).toHaveText('Execution Dashboard');
    }

    async logout() {
        await this.lnkLoggedInUser.click();
        await this.lnkLogout.click();
    }
}
