import { test } from '@playwright/test';
import ProfileData from '../../../data/profile-data';
import DashboardMainPage from '../../../pages/dashboard-main-page';
import { DataProfileDashboardPage } from '../../../pages/data-profile-dashboard-page';
import LoginPage from '../../../pages/login-page';
import Asssertion from '../../../support/helpers/assertion';
import Constants from '../../../support/helpers/constants';

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
    Asssertion.assertEqual(await dataProfileDashboardPage.getListOfPreSetDataProfile(), ProfileData.lstExpPreSetDataProfile,
        "The list pre-set data profile shows incorrectly");
});