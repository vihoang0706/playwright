import { Locator } from '@playwright/test';

export default class Table {
    element: Locator;

    constructor(element: Locator) {
        this.element = element;
    }

    async isHeaderColumnExist(): Promise<boolean> {
        return await this.element.locator('tbody > tr > th').count() > 0;
    }

    async getRowDataByColumnName(collumnName: string): Promise<string[]> {
        let numberOfRows = (await this.element.locator('tr').count());
        let startRowIdx = 1;
        const lstRowData: string[] = [];
        const columnIdxByColumnName = await this.getColumnIndexByColumnHeader(collumnName);
        if (await this.isHeaderColumnExist()) {
            startRowIdx = startRowIdx + 1;
            numberOfRows = numberOfRows - 1;
        }

        for (let i = startRowIdx; i <= numberOfRows; i++) {
            if (await this.isRowExistByColumnIndex(i, columnIdxByColumnName)) {
                const data = await this.element.locator(`tr:nth-child(${i}) td:nth-child(${columnIdxByColumnName})`).innerText();
                lstRowData.push(data.replace(/\s+/g, ' ').trim());
            }
        }
        return lstRowData;
    }

    async getColumnIndexByColumnHeader(columnHeader: string): Promise<number> {
        let columnIdx;
        const headerSelector = 'tbody > tr > th';
        const numberOfColumn = await this.element.locator(headerSelector).count();
        for (let i = 1; i <= numberOfColumn; i++) {
            const actColumnName = await this.element.locator(`tbody > tr > th:nth-child(${i})`).innerText();
            if (actColumnName === columnHeader) {
                columnIdx = i;
                break;
            }
        }
        return columnIdx;
    }

    async isRowExistByColumnIndex(rowIdx: number, columnIdx: number): Promise<boolean> {
        const locator = await this.element.locator(`tr:nth-child(${rowIdx}) td:nth-child(${columnIdx})`);
        return locator.isVisible();
    }
}