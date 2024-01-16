import { test, type Page, type Locator } from '@playwright/test';

export default class AddNewPage {
    private readonly txtPageName: Locator = this.page.locator('#name');
    private readonly cbbParentPage: Locator = this.page.locator('#parent');
    private readonly cbbNumberOfColumns: Locator = this.page.locator('#columnnumber');
    private readonly cbbNAfterPage: Locator = this.page.locator('#afterpage');
    private readonly cbxNAfterPage: Locator = this.page.locator('#ispublic');
    private readonly btnOK: Locator = this.page.locator('#OK');
    private readonly btnCancel: Locator = this.page.locator('#Cancel');

    constructor(private readonly page: Page) { }

    async addNewPage(pageName: string, parentName?: string, numberOfColumns?: string, displayAfter?: string, isPublic?: boolean) {
        await test.step('Add new page with given data', async () => {
            await this.txtPageName.fill(pageName);
            if (parentName !== null && parentName !== undefined) await this.cbbParentPage.selectOption(parentName);
            if (numberOfColumns !== null && numberOfColumns !== undefined) await this.cbbNumberOfColumns.selectOption(numberOfColumns);
            if (displayAfter !== null && displayAfter !== undefined) await this.cbbNAfterPage.selectOption(displayAfter);
            if (isPublic !== null && isPublic !== undefined) await this.cbxNAfterPage.check();
            await this.btnOK.click();
        });
    }
}