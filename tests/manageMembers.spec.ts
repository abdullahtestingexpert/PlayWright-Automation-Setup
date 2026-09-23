// Admin Role - Manage Members
import { expect, test } from '@playwright/test';
import { InviteTeamPage } from '../pages/agencyAdminRole';
import { LoginPage } from '../pages/loginPage';

test('Admin Role - Manage Members', async ({ page }) => {
    const invitePage = new InviteTeamPage(page);
    const loginPage = new LoginPage(page);
    const fieldLabels = [
        'First Name',
        'Last Name',
        'Email Address'
    ]

    //Login with Agency Account 
    await loginPage.login('brandon+appletest@royal.it.com', 'testtest');
    await page.waitForURL(/dashboard\/home/);
    await page.click('button.btn.btn-primary');
    
    page.locator('span.nav-link-text.ms-1').nth(4).click();
    page.locator('a[href="/agency/members"]').click();
    await page.waitForURL(/agency\/members/);
    page.locator('h5.mb-0', { hasText: 'Members List' });
    //Assert Navigation
    await expect(page.locator('NAV.dataTable-pagination')).toBeVisible();
    //Assert Searchbar
    await expect(page.locator('input.dataTable-input')).toBeVisible();
    //Assert Invite Button
    await page.locator('a.mb-0.btn').scrollIntoViewIfNeeded().then(()=>{
        page.locator('a.mb-0.btn').click();
    })
    await page.waitForURL(/invite/);
    invitePage.verifyInvitePageUI(fieldLabels);
    invitePage.assertAvatarInitials("JS");
});
