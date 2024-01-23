import { test, type Page, type Locator } from '@playwright/test';

export type NewPageData = {
    pageName: string;
    parentPage?: string;
    numberOfColumns?: number;
    displayAfter?: string;
    public?: boolean;
};

export default class NewPage {
    private readonly txtPageName: Locator = this.page.locator('#name');
    private readonly cbbParentPage: Locator = this.page.locator('#parent');
    private readonly cbbNumberOfColumns: Locator = this.page.locator('#columnnumber');
    private readonly cbbNAfterPage: Locator = this.page.locator('#afterpage');
    private readonly cbxPublic: Locator = this.page.locator('#ispublic');
    private readonly btnOK: Locator = this.page.locator('#OK');
    private readonly btnCancel: Locator = this.page.locator('#Cancel');

    constructor(private readonly page: Page) { }

    async addNewPage(data: NewPageData) {
        await test.step("Create new page", async () => {
            await this.txtPageName.waitFor();
            data.pageName && (await this.txtPageName.fill(data.pageName));
            data.parentPage && (await this.cbbParentPage.selectOption(data.parentPage));
            data.numberOfColumns && await this.cbbNumberOfColumns.selectOption({ label: data.numberOfColumns.toString() });
            data.displayAfter && await this.cbbNAfterPage.selectOption({ label: data.displayAfter });
            data.public && (data.public === true ? await this.cbxPublic.check() : await this.cbxPublic.uncheck());

            await this.btnOK.click();
            await this.page.waitForLoadState();
        });
    }
}
