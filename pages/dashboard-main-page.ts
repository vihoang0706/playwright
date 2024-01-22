import { expect, test, type Locator } from '@playwright/test';
import * as util from 'util';
import BasePage from './base-page';

export default class DashboardMainPage extends BasePage {
    private readonly lblActiveMenuItem: Locator = this.page.locator('#main-menu li.active a.active');
    private readonly lnkGlobalSettings: Locator = this.page.locator('#main-menu .mn-setting > a');
    private readonly lnkAddPage: Locator = this.page.locator('//a[.="Add Page"]');
    private readonly lnkDelete: Locator = this.page.locator('#main-menu li a.delete');
    private readonly lblHeader: Locator = this.page.locator('#header');
    private readonly dynamicActivePageSelector: string = '//div[@id="main-menu"]//li[contains(@class, "active")]/a[text()="%s"]';
    private readonly dynamicGlobalSettingsOption: string = '//div[@id="main-menu"]//li[@class="mn-setting"]//a[text()="%s"]';
    private readonly dynamicPageHasChild: string = '//div[@id="main-menu"]//li[contains(@class,"haschild")]//a[text()="%s"]';
    private readonly dynamicPageSelector: string = '//div[@id="main-menu"]//li/a[text()="%s"]';
    private readonly lnkAdminister: Locator = this.page.locator('a[href="#Administer"]');
    private readonly lnkPanels: Locator = this.page.locator('#ulAdminister li a[href="panels.jsp"]');

    async displays(): Promise<void> {
        await test.step('Verify Dashboard Mainpage appears', async () => {
            await expect(this.lblActiveMenuItem).toHaveText('Execution Dashboard');
        });
    }

    async isGlobalSettingOptionDisplayed(option: string): Promise<boolean> {
        await this.lnkGlobalSettings.click();
        const isOptionVisible = await this.page.locator(util.format(this.dynamicGlobalSettingsOption, option)).isVisible();
        return isOptionVisible;
    }

    async openAddNewPage(): Promise<void> {
        await this.clickOnGlobalSetting();
        await this.lnkAddPage.click();
    }

    async verifyNewPageAddedSuccessfully(pageName: string): Promise<void> {
        await expect(this.page.locator(util.format(this.dynamicPageSelector, pageName))).toBeVisible();
    }

    async clickOnGlobalSetting(): Promise<void> {
        await this.lnkGlobalSettings.waitFor();
        await this.lnkGlobalSettings.click();
    }

    async deletePageAndGetDialogMessage(pageName: string, parentPage?: string): Promise<string[]> {
        let dialogMessage: string[] = [];
        (parentPage !== undefined && parentPage !== null) ? await this.clickOnPage(pageName, parentPage) : await this.clickOnPage(pageName);
        const hasChildPage = await this.doesParentHaveChildPages(pageName);
        await this.lnkGlobalSettings.click();
        this.page.once('dialog', async dialog => {
            dialogMessage.push(dialog.message().trim());
            if (hasChildPage) {
                this.page.once('dialog', async (dialog) => {
                    dialogMessage.push(dialog.message().trim());
                    await dialog.accept();
                });
            }
            dialog.accept();
        });
        await this.lnkDelete.click();
        if (await this.lnkDelete.isVisible({ timeout: 2000 })) {
            await this.lblHeader.click();
        }
        return dialogMessage;
    }

    async doesParentHaveChildPages(parent: string): Promise<boolean> {
        return await this.page.locator(util.format(this.dynamicPageHasChild, parent)).isVisible();
    }

    async doesPageExist(page: string): Promise<boolean> {
        return await this.page.locator(util.format(this.dynamicPageSelector, page)).isVisible();
    }

    async openPanels(): Promise<void> {
        await this.lnkAdminister.hover();
        await this.lnkPanels.click();
    }

    async clickOnPage(pageName: string, parentPage?: string): Promise<void> {
        if (parentPage !== undefined && parentPage !== null) {
            const lnkParentPage: Locator = this.page.locator(util.format(this.dynamicPageSelector, parentPage));
            await lnkParentPage.click();
            await this.page.locator(util.format(this.dynamicActivePageSelector, parentPage)).waitFor();
            await lnkParentPage.hover();
        }
        await this.page.locator(util.format(this.dynamicPageSelector, pageName)).click();
        await this.page.waitForLoadState();
    }

    async deletePage(pageName: string, parentPage?: string): Promise<void> {
        (parentPage !== undefined && parentPage !== null) ? await this.clickOnPage(pageName, parentPage) : await this.clickOnPage(pageName);
        const hasChildPage = await this.doesParentHaveChildPages(pageName);
        await this.clickOnGlobalSetting();
        this.page.once('dialog', async (dialog) => {

            if (hasChildPage) {
                this.page.once('dialog', async (dialog) => {
                    await dialog.accept();
                });
            }
            dialog.accept();
        });
        await this.lnkDelete.click();
        if (await this.lnkDelete.isVisible({ timeout: 2000 })) {
            await this.page.locator('#header').click();
        }
    }
}
