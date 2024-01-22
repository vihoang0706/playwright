import { test, type Locator, type Page } from '@playwright/test';
import * as util from 'util';
import Constants from '../support/constants';

export default abstract class BasePage {
    private readonly lnkWelcomeAccount: Locator = this.page.locator('a[href="#Welcome"]');
    private readonly lnkLogout: Locator = this.page.locator('a[href="logout.do"]');
    private readonly lnkDynamicMenu = '//ul[@class="head-menu"]//a[text()="%s"]';

    constructor(readonly page: Page) { }

    async selectMenu(menuPath: string): Promise<void> {
        const menuItems: string[] = menuPath.split('>');
        for (let i = 0; i < menuItems.length; i++) {
            const lnkMenuOption: Locator = this.page.locator(util.format(this.lnkDynamicMenu, menuItems[i]));
            await lnkMenuOption.click();
        }
    }

    async logout(): Promise<void> {
        await test.step('Logout', async () => {
            await this.lnkWelcomeAccount.hover();
            await this.lnkWelcomeAccount.click();
            await this.lnkLogout.click();
        });
    }

    /**
 * Checks if an element with the given locator is clickable within the specified timeout.
 * @param strLocator - The locator string for the element.
 * @param timeout - Optional timeout for the click operation.
 * @returns True if the element is clickable, false otherwise.
 */
    async isClickable(strLocator: string, timeout: number = Constants.TIMEOUT): Promise<boolean> {
        try {
            await this.page.locator(strLocator).click({ timeout });
            return true;
        } catch (error) {
            return false;
        }
    }
}