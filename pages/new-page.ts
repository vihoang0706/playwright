import { test, type Page, type Locator } from '@playwright/test';

export default class NewPage {
    private readonly txtPageName: Locator = this.page.locator('#name');
    private readonly cbbParentPage: Locator = this.page.locator('#parent');
    private readonly cbbNumberOfColumns: Locator = this.page.locator('#columnnumber');
    private readonly cbbNAfterPage: Locator = this.page.locator('#afterpage');
    private readonly cbxAfterPage: Locator = this.page.locator('#ispublic');
    private readonly btnOK: Locator = this.page.locator('#OK');
    private readonly btnCancel: Locator = this.page.locator('#Cancel');

    constructor(private readonly page: Page) { }

    async submitAddNewPage(pageName: string, isPublic?: boolean, parentName?: string, numberOfColumns?: string, displayAfter?: string) {
        await this.txtPageName.fill(pageName);
        if (parentName !== null && parentName !== undefined) await this.cbbParentPage.selectOption(parentName);
        if (numberOfColumns !== null && numberOfColumns !== undefined) await this.cbbNumberOfColumns.selectOption(numberOfColumns);
        if (displayAfter !== null && displayAfter !== undefined) await this.cbbNAfterPage.selectOption(displayAfter);
        if (isPublic !== null && isPublic !== undefined) await this.cbxAfterPage.check();
        await this.btnOK.click();
        await this.page.waitForLoadState();
    }
}
