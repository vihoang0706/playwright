import { Page } from '@playwright/test';

export class TableHelper {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getRowData(rowSelector): Promise<string[]> {
        const texts = await this.page.$$eval(rowSelector, (elements) => {
            return elements.map((element) => element.textContent.trim());
        });
        return texts;
    }
}