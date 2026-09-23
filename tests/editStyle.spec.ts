// Admin Role - Edit Styles
import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import testData from '../fixtures/TestData.json';
import { EditStylePage } from '../pages/editStyle';

test('Admin Role - Edit Styles', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const stylePage = new EditStylePage(page);

    //Login with Agency Account 
    await loginPage.login('brandon+appletest@royal.it.com', 'testtest');
    await page.waitForURL(/dashboard\/home/);
    await page.click('button.btn.btn-primary');

    //Nav bar
    page.locator('span.nav-link-text.ms-1').nth(4).click();
    page.locator('a[href="/style"]').click();
    await page.waitForURL(/style/);

    //Page Headings
    await stylePage.verifyHeadings();
    
    //Set Primary/Background Color
    await stylePage.setPrimaryColor(testData.backgroundColor);
    
    //Change Text Color
    await stylePage.setTextColor(testData.textColor);
    
    //Upload Image
    await stylePage.uploadLogo('fixtures/Test-Logo02.jpg');
   
    //Input Phone number
    await stylePage.setPhoneNumber(testData.phoneNumber);
    
    //Update Style Button
    await stylePage.updateStyle();
  
    //Visit the page for verifying details
    await page.goto('https://api-staging.protegogapproposal.com/reports/preview/test/1');

    //Verify text on PDF
    await stylePage.verifyPreview(testData.phoneNumber, 1);
});
