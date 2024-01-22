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
  const dashboardMainPage = new DashboardMainPage(page);

  //1. Login with valid account
  await loginPage.login(Constants.ADMIN_USERNAME, Constants.ADMIN_PASSWORD);

  //2. Verify that Dashboard Mainpage appears 
  await dashboardMainPage.displays();

  //3. Logout
  await dashboardMainPage.logout();
});

test('DA_LOGIN_TC002 - Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials', async ({ page }) => {
  const loginMessage = "Username or password is invalid";

  //1. Login with incorrect credential
  await loginPage.login("abc", "abc");

  //2. Verify that Dashboard Error message "Username or password is invalid" appears
  const dialog = new Dialog(page)
  await dialog.handleDialog();
  await dialog.verifyMessageDisplays(loginMessage);
  
  //3. Verify login page is displaying
  await loginPage.displays();
});
