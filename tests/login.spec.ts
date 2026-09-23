import { test, expect } from '@playwright/test';
import { LoginPage, loginViaApiAndSetLocalStorage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { waitForLoginApiResponse } from '../utils/interceptors';
// test.beforeEach(async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   await loginViaApiAndSetLocalStorage(page)
// });


test('User can log in with Valid Credentials', async ({ page }) => {
  const homePage = new HomePage(page);

  //Login via API
  await loginViaApiAndSetLocalStorage(page)

  //Products heading visible
  await homePage.waitForProductHeading();

  //Assert Home Page Heading after successfull login
  await homePage.expectProductHeadingToContainText('Default')

  //Verify navigation to Home page after successfull login
  await expect(page).toHaveURL(/default/);

});

test('Wrong email and password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  // Start listening for the login API call
  const loginAPIFailed = waitForLoginApiResponse(page);

  //Login with wrong email
  await loginPage.login('brandon+appletest@royal.it', 'test');
 
  // Wait for the API response
  const response = await loginAPIFailed;
  // ✅ Print the status code to console
  console.log(`🔍 Login API status code: ${response.status()}`);

  // Assert the response status is 401
  expect(response.status()).toBe(401);
});

test('Empty email', async ({ page }) => {
  const loginPage = new LoginPage(page);
  // Start listening for the login API call
  const loginAPIFailed = waitForLoginApiResponse(page);

  //Login with wrong email
  await loginPage.login('', 'testtest');
 
  // Wait for the API response
  const response = await loginAPIFailed;
  // ✅ Print the status code to console
  console.log(`🔍 Login API status code: ${response.status()}`);

  // Assert the response status is 422
  expect(response.status()).toBe(422);
});

test('Correct email, empty password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  // Start listening for the login API call
  const loginAPIFailed = waitForLoginApiResponse(page);

  //Login with empty password
  await loginPage.login('brandon+appletest@royal.it.com', '');
 
  // Wait for the API response
  const response = await loginAPIFailed;
  // ✅ Print the status code to console
  console.log(`🔍 Login API status code: ${response.status()}`);

  // Assert the response status is 422
  expect(response.status()).toBe(422);
});

test('Empty email, filled password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  // Start listening for the login API call
  const loginAPIFailed = waitForLoginApiResponse(page);

  //Login with empty password
  await loginPage.login('', 'testtest');
 
  // Wait for the API response
  const response = await loginAPIFailed;
  // ✅ Print the status code to console
  console.log(`🔍 Login API status code: ${response.status()}`);

  // Assert the response status is 422
  expect(response.status()).toBe(422);
});

