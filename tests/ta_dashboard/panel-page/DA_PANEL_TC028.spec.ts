import { test } from '@playwright/test';
import LoginPage from '../../../pages/login-page';
import DashboardMainPage from '../../../pages/dashboard-main-page';
import Constants from '../../../utils/constants';
import PanelDashboadPage from '../../../pages/panel-dashboard-page';
import { Assertion } from '../../../utils/assertion';

test('DA_PANEL_TC028 - Verify that when "Add New Panel" form is on focused all other control/form is disabled or locked.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const panelDashboardPage = new PanelDashboadPage(page);

    //1.Navigate to Dashboard login page
    await loginPage.open();

    //2. Log in specific repository with valid account
    await loginPage.login(Constants.ADMIN_USERNAME, Constants.ADMIN_PASSWORD);

    //3. Click on Administer link -> Click Panel link
    await dashboardMainPage.selectMenu("Administer>Panels");

    //4. Click Add New link
    await panelDashboardPage.openAddNewPanel();

    //5. Verify Add New Panel dialog is opening
    Assertion.assertTrue(await panelDashboardPage.isAddNewPanelFormDisplayed(), "Add New Panel dialog is not openning");

    //Verify all controls/form are disabled or locked
    await panelDashboardPage.verifyControlsAreDisabled();
});
