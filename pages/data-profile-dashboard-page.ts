import Table from "../support/elements/table";
import BasePage from "./base-page";

export class DataProfileDashboardPage extends BasePage {
    private readonly tblDataProfiles: Table = new Table(this.page.locator("table.GridView"));

    async getListOfPreSetDataProfile(): Promise<string[]> {
        await this.tblDataProfiles.element.waitFor();
        const lstPreSetData = await this.tblDataProfiles.getRowDataByColumnName("Data Profile");
        return lstPreSetData;
    }
}