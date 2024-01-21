import { type Locator, type Page, test } from '@playwright/test';
import * as util from 'util';
import Constants from '../support/constants';

export abstract class BasePage {
    private readonly lnkWelcomeAccount: Locator = this.page.locator('a[href="#Welcome"]');
    private readonly lnkLogout: Locator = this.page.locator('a[href="logout.do"]');
    private readonly lnkDynamicMenu = '//ul[@class="head-menu"]//a[text()="%s"]';
    private readonly linkDynamicSubMenu = '//ul[@class="head-menu"]//li[a[text()="%s"]]//ul//a[text()="%s"]';

    constructor(readonly page: Page) { }

    async selectMenu1(menuPath: string) {
        test.step(`Select ${menuPath}`, async () => {
            let dynamicMenu: Locator;
            let dynamicSubMenu: Locator

            const menuItems: string[] = menuPath.split(">");
            dynamicMenu = this.page.locator(util.format(this.lnkDynamicMenu, menuItems[0]));
            console.log(menuItems[0]);
            await dynamicMenu.hover();
            await dynamicMenu.click();
            if (menuItems.length == 2) {
                dynamicSubMenu = this.page.locator(util.format(this.linkDynamicSubMenu, menuItems[0].trim(), menuItems[1]));
                await dynamicSubMenu.waitFor();
                await dynamicSubMenu.click();
                await this.page.waitForLoadState();
            }
        });
    }

    async selectMenu(menuPath: string): Promise<void> {
        let lnkMenuOption: Locator;
        const menuItems: string[] = menuPath.split('>');
        for (let i = 0; i < menuItems.length; i++) {
            lnkMenuOption = this.page.locator(util.format(this.lnkDynamicMenu, menuItems[i]));
            await lnkMenuOption.hover();
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