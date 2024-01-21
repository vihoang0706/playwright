import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export default class PanelDashboadPage extends BasePage {
    private readonly lnkAddNew: Locator = this.page.locator('#ccontent div.panel_tag2 a');
    private readonly lblDialogTitle: Locator = this.page.locator('//div[@class="ui-dialog-titlebar"]//span[text()="Add New Panel"]');

    async openAddNewPanel(): Promise<void> {
        await this.lnkAddNew.click();
    }

    async isAddNewPanelFormDisplayed(): Promise<boolean> {
        return await this.lblDialogTitle.isVisible();
    }

    async verifyControlsAreDisabled(): Promise<void> {
        expect(await this.isClickable("li.menu-setting")).toBe(false);
    }
}
