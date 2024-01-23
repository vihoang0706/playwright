import { test } from '@playwright/test';
import Dialog from '../../../pages/dialog';
import LoginPage from '../../../pages/login-page';

test('DA_LOGIN_TC002 - Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials', async ({ page }) => {
    const loginMessage = "Username or password is invalid";
    const loginPage = new LoginPage(page);

    //1. Navigate to Dashboard login page
    await loginPage.open();

    //2. Enter valid username and password
    await loginPage.login("abc", "abc");

    //3. Verify that Dashboard Error message "Username or password is invalid" appears and close message
    const dialog = new Dialog(page)
    await dialog.handleDialog();
    await dialog.verifyMessageDisplays(loginMessage);

    //4. Verify login page displays after close error message
    await loginPage.displays();
});
