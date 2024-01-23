import { test } from '@playwright/test';
import DashboardMainPage from '../../../pages/dashboard-main-page';
import LoginPage from '../../../pages/login-page';
import Constants from '../../../support/helpers/constants';

test('DA_LOGIN_TC001 - Verify that user can login specific repository successfully via Dashboard login page with correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);

    //1. Navigate to Dashboard login page
    await loginPage.open();

    //2. Enter valid username and password
    await loginPage.login(Constants.ADMIN_USERNAME, Constants.ADMIN_PASSWORD);

    //3. Verify that Dashboard Mainpage appears
    await dashboardMainPage.displays();
    await dashboardMainPage.logout();
});
