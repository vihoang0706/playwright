import { TableHelper } from "../support/helpers/table-helper";
import { BasePage } from "./base-page";

export class DataProfileDashboardPage extends BasePage {
    private readonly lblDataProfileRowData = '//table[@class="GridView"]//tr/td[not(@class) and not(@colspan)]';

    async getPreSetDataProfile(): Promise<string[]> {
        const tableHelper = new TableHelper(this.page);
        const lstPreSetData = await tableHelper.getRowData(this.lblDataProfileRowData);
        return lstPreSetData;
    }
}