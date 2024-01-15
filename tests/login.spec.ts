import { expect, test } from '@playwright/test';
import DashboardMainPage from '../pages/dashboard-main-page';
import LoginPage from '../pages/login-page';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
});

test('Verify that user can login specific repository successfully via Dashboard login page with correct credentials', async ({ page }) => {   
    await loginPage.login('administrator', '');

    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.displays();
    await dashboardMainPage.logout();
});

test('Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials', async ({ page }) => {
    const loginMessage = 'Username or password is invalid';

    await loginPage.login('abc', 'abc');
    await loginPage.verifyErrorMessage(loginMessage);
});