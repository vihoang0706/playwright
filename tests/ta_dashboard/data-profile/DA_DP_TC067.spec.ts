import { test } from '@playwright/test';
import ProfileData from '../../../data/profile-data';
import DashboardMainPage from '../../../pages/dashboard-main-page';
import { DataProfileDashboardPage } from '../../../pages/data-profile-dashboard-page';
import LoginPage from '../../../pages/login-page';
import Asssertion from '../../../support/helpers/assertion';
import Constants from '../../../support/helpers/constants';

test("DA_DP_TC067 - Verify that all Pre-set Data Profiles are populated correctly", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const dataProfileDashboardPage = new DataProfileDashboardPage(page);

    //1.Navigate to Dashboard login page
    await loginPage.open();

    //2. Log in specific repository with valid account
    await loginPage.login(Constants.ADMIN_USERNAME, Constants.ADMIN_PASSWORD);

    //3. Click Administer->Data Profiles
    await dashboardMainPage.selectMenu("Administer>Data Profiles");

    //4. Check Data Profiles are listed alphabetically
    const actDataProfile = (await dataProfileDashboardPage.getListOfPreSetDataProfile()).sort();
    const expDataProfle = ProfileData.lstExpPreSetDataProfile.sort();
    Asssertion.assertEqual(actDataProfile, expDataProfle);
});