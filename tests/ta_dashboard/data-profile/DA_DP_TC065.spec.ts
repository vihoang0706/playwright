import { expect, test } from '@playwright/test';
import DashboardMainPage from '../../../pages/dashboard-main-page';
import { DataProfileDashboardPage } from '../../../pages/data-profile-dashboard-page';
import LoginPage from '../../../pages/login-page';
import Constants from '../../../support/constants';
import PreSetDataProfile from '../../../support/data/preset-data-profile';

test("Verify that all Pre-set Data Profiles are populated correctly", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const dataProfileDashboardPage = new DataProfileDashboardPage(page);

    //1.Navigate to Dashboard login page
    await loginPage.open();

    //2. Log in specific repository with valid account
    await loginPage.login(Constants.ADMIN_USERNAME, Constants.ADMIN_PASSWORD);

    //3. Click on Administer link -> Click Panel link
    await dashboardMainPage.selectMenu("Administer>Data Profiles");

    //4. Verify Pre-set Data Profile are populated correctly in profiles page
    expect(await dataProfileDashboardPage.getPreSetDataProfile()).toEqual(PreSetDataProfile.lstExpPreSetDataProfile);
});