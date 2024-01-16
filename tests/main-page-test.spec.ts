import { test } from '@playwright/test';
import AddNewPage from '../pages/add-new-page';
import DashboardMainPage from '../pages/dashboard-main-page';
import LoginPage from '../pages/login-page';
import Constants from '../utils/Constants';

const pageName = "NewPage";

test('DA_MP_TC014 - Verify that "Public" pages can be visible and accessed by all users of working repository', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(Constants.ADMIN_USER, Constants.ADMIN_PWD, Constants.SAMPLE_REPO);

    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.clickOnAddNewPageButton();
    const newPage = new AddNewPage(page);

    await newPage.addNewPage(pageName, '', '1', 'Overview', true);

    await dashboardMainPage.logout(Constants.ADMIN_USER);
    await loginPage.login('john', '');
    await dashboardMainPage.verifyNewPageAddedSuccessfully(pageName);
    await dashboardMainPage.logout('john');
});

test.afterEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(Constants.ADMIN_USER, Constants.ADMIN_PWD, Constants.SAMPLE_REPO);
    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.deletePage(pageName);
    await dashboardMainPage.logout(Constants.ADMIN_USER);
}); 