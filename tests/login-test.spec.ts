import { test } from '@playwright/test';
import DashboardMainPage from '../pages/dashboard-main-page';
import LoginPage from '../pages/login-page';
import Constants from '../utils/Constants';

// let loginPage: LoginPage;

// test.beforeEach(async ({ page }) => {
//   loginPage = new LoginPage(page);
//   await loginPage.open();
// });

test('DA_LOGIN_TC001 - Verify that user can login specific repository successfully via Dashboard login page with correct credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(Constants.ADMIN_USER, Constants.ADMIN_PWD);

  const dashboardMainPage = new DashboardMainPage(page);
  await dashboardMainPage.displays();
  await dashboardMainPage.logout(Constants.ADMIN_USER);
});

// Ask about behavior, why in the report verify dialog is run after hook
test('DA_LOGIN_TC002 - Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials', async ({ page }) => {
  const loginMessage = "Username or password is invalid";
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login("abc", "abc");
  await loginPage.verifyErrorMessage(loginMessage);
  await loginPage.displays();
});