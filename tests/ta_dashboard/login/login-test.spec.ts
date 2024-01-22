import { test } from '@playwright/test';
import DashboardMainPage from '../../../pages/dashboard-main-page';
import LoginPage from '../../../pages/login-page';
import Dialog from '../../../pages/dialog';
import Constants from '../../../support/constants';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.open();
});

test('DA_LOGIN_TC001 - Verify that user can login specific repository successfully via Dashboard login page with correct credentials', async ({ page }) => {
  await loginPage.login(Constants.ADMIN_USERNAME, Constants.ADMIN_PASSWORD);

  const dashboardMainPage = new DashboardMainPage(page);
  await dashboardMainPage.displays();
  await dashboardMainPage.logout();
});

test('DA_LOGIN_TC002 - Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials', async ({ page }) => {
  const loginMessage = "Username or password is invalid";

  await loginPage.login("abc", "abc");

  const dialog = new Dialog(page)
  await dialog.handleDialog();
  await dialog.verifyMessageDisplays(loginMessage);
  
  await loginPage.displays();
});
