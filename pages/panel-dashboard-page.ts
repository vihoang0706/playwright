import { test, expect, type Locator } from '@playwright/test';
import BasePage from './base-page';

export default class PanelDashboadPage extends BasePage {
    private readonly lnkAddNew: Locator = this.page.locator('#ccontent div.panel_tag2 a');
    private readonly lblDialogTitle: Locator = this.page.locator('//div[@class="ui-dialog-titlebar"]//span[text()="Add New Panel"]');

    async openAddNewPanel(): Promise<void> {
        await test.step("Click on Add New link", async () => {
            await this.lnkAddNew.waitFor();
            await this.lnkAddNew.click();
        });
    }

    async verifyAddNewPanelFormDisplays(): Promise<void> {
        await test.step("Verify Add New Panel Dialog is opening", async () => {
            await this.lblDialogTitle.waitFor();
            expect(await this.lblDialogTitle).toBeVisible();
        });
    }

    async verifyControlsAreDisabled(): Promise<void> {
        await test.step("Verify all controls are disabled", async () => {
            expect(await this.isClickable("li.menu-setting")).toBe(false);
        });
    }
}