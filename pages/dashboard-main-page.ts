import { test, expect, type Locator, type Page } from '@playwright/test';

export default class DashboardMainPage {
    private readonly activeMenuItem: Locator = this.page.locator('css=#main-menu li.active a.active');
    private readonly lnkLogout: Locator = this.page.getByRole('link', { name: 'Logout' });
    private readonly lnkGlobalSettings: Locator = this.page.locator('css=#main-menu .mn-setting > a');
    private readonly lnkAddPage: Locator = this.page.getByRole('link', { name: 'Add Page' });
    private readonly lnkDelete: Locator = this.page.getByRole('link', { name: 'Delete' });

    constructor(private readonly page: Page) { };

    async displays(): Promise<void> {
        await test.step('Verify Dashboard Mainpage appears', async () => {
            await expect(this.activeMenuItem).toHaveText('Execution Dashboard');
        });
    }

    async clickOnAddNewPageButton(): Promise<void> {
        await test.step('Go to Global Setting -> Add page', async () => {
            await this.lnkGlobalSettings.click();
            await this.lnkAddPage.click();
        });
    }

    async verifyNewPageAddedSuccessfully(newPageName: string): Promise<void> {
        await test.step('Newly added page is visibled', async () => {
            await expect(this.page.getByRole('link', { name: `${newPageName}`, exact: true })).toBeVisible();
        })
    }

    async deletePage(pageName: string): Promise<void> {
        await test.step('Delete page', async () => {
            await this.page.getByRole('link', { name: `${pageName}`, exact: true }).click();
            await this.lnkGlobalSettings.click();
            await this.page.once('dialog', dialog => {
                dialog.accept().catch(() => { });
            });
            await this.lnkDelete.click();
        });
    }

    async logout(userName: string): Promise<void> {
        await test.step('Logout', async () => {
            await this.page.getByRole('link', { name: `${userName}` }).click();
            await this.lnkLogout.click();
        })

    }
}
