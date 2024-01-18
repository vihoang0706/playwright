import { type Locator, type Page } from '@playwright/test';

export default class PanelDashboadPage {
    private readonly lnkAddNew: Locator = this.page.locator('#ccontent div.panel_tag2 a');

    constructor(private readonly page: Page) { }

    async openAddNewPanel(): Promise<void> {
        await this.lnkAddNew.click();
    }
}
