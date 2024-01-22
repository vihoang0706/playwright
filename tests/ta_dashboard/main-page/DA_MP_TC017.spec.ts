import { test } from '@playwright/test';
import DashboardMainPage from '../../../pages/dashboard-main-page';
import LoginPage from '../../../pages/login-page';
import NewPage from '../../../pages/new-page';
import Assertion from '../../../support/assertion';
import Constants from '../../../support/constants';
import CommonHelper from '../../../support/helpers/common-helper';

test('DA_MP_TC017 - Verify that user can remove any main parent page except "Overview" page successfully and the order of pages stays persistent as long as there is not children page under it', async ({ page }) => {
    const pageParentName = "Parent" + CommonHelper.generateRandomNumber();
    const pageChildName = "Child" + CommonHelper.generateRandomNumber();
    const confirmMsg = "Are you sure you want to remove this page?";
    const warningMsg = `Cannot delete page '${pageParentName}' since it has child page(s).`
    const lstExpectedMessage = [confirmMsg, warningMsg];
    const expConfirmRemoveMessage: string[] = [
        'Are you sure you want to remove this page?'
    ];

    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const newPage = new NewPage(page);

    //1.Navigate to Dashboard login page
    await loginPage.open();

    //2. Log in specific repository with valid account
    await loginPage.login(Constants.ADMIN_USERNAME, Constants.ADMIN_PASSWORD, Constants.SAMPLE_REPOSITORY)

    //3. Add a new parent page
    await dashboardMainPage.openAddNewPage();
    await newPage.submitAddNewPage(pageParentName, true);

    //4. Add a children page of newly added page
    await dashboardMainPage.openAddNewPage();
    await newPage.submitAddNewPage(pageChildName, true, pageParentName);

    //5. Delete parent page and verify the messages show
    const lstActualMsg: string[] = await dashboardMainPage.deletePageAndGetDialogMessage(pageParentName);
    Assertion.assertEqual(lstActualMsg, lstExpectedMessage);

    //5. Delete child page, verify the messages show and check the child page is deleted
    const actConfirmMsgForChildPage: string[] = await dashboardMainPage.deletePageAndGetDialogMessage(pageChildName, pageParentName);
    Assertion.assertEqual(actConfirmMsgForChildPage, expConfirmRemoveMessage);
    Assertion.assertFalse(await dashboardMainPage.doesParentHaveChildPages(pageParentName), "Parent has child pages");

    //6. Delete parent page, verify the messages show and check the parent page is deleted
    const actConfirmMsgForParentPage: string[] = await dashboardMainPage.deletePageAndGetDialogMessage(pageParentName);
    Assertion.assertEqual(actConfirmMsgForParentPage, expConfirmRemoveMessage);
    Assertion.assertFalse(await dashboardMainPage.doesPageExist(pageParentName), `Parent page ${pageParentName} is showing`);

    //7. Click on "Overview" page
    await dashboardMainPage.clickOnPage(Constants.OVERVIEW_PAGE);

    //8. Check "Delete" link disappears
    Assertion.assertFalse(await dashboardMainPage.isGlobalSettingOptionDisplayed("Delete"));
});
