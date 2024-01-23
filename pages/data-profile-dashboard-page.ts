import Table from "../support/elements/Table";
import BasePage from "./base-page";

export class DataProfileDashboardPage extends BasePage {
    private readonly tblDataProfiles: Table = new Table(this.page.locator("table.GridView"));

    async getListOfPreSetDataProfile(): Promise<string[]> {
        return await this.tblDataProfiles.getRowDataByColumnName("Data Profile");
    }
}
