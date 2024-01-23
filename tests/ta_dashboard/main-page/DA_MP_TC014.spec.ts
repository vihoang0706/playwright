import { test } from '@playwright/test';
import DashboardMainPage from '../../../pages/dashboard-main-page';
import LoginPage from '../../../pages/login-page';
import NewPage from '../../../pages/new-page';
import CommonHelper from '../../../support/helpers/common-helper';
import Constants from '../../../support/helpers/constants';

const pageParentName = "Parent" + CommonHelper.generateRandomNumber();
let loginPage: LoginPage;
let dashboardMainPage: DashboardMainPage;

test('DA_MP_TC014 - Verify that "Public" pages can be visible and accessed by all users of working repository', async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardMainPage = new DashboardMainPage(page);
    const newPage = new NewPage(page);

    //1.Navigate to Dashboard login page
    await loginPage.open();

    //2. Log in specific repository with valid account
    await loginPage.login(Constants.ADMIN_USERNAME, Constants.ADMIN_PASSWORD)

    //3. Add a new parent page
    await dashboardMainPage.openAddNewPage();
    await newPage.addNewPage({ pageName: pageParentName });

    //4. Login with another user and check the page added successfully
    await dashboardMainPage.logout();
    await loginPage.login(Constants.USERNAME, Constants.PASSWORD);
    await dashboardMainPage.verifyNewPageAddedSuccessfully(pageParentName);
});

test.afterEach(async () => {
    //Logout and login with created account to delete it
    await dashboardMainPage.logout();
    await loginPage.login(Constants.ADMIN_USERNAME, Constants.ADMIN_PASSWORD)
    await dashboardMainPage.deletePage(pageParentName);
});