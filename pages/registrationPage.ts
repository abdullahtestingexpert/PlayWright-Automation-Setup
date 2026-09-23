import { Page, expect } from '@playwright/test';

export async function completeUserRegistration(
  page: Page,
  {
    password,
    expectedName
  }: {
    password: string;
    expectedName: string;
  }
) {
  // Verify registration page heading
  await expect(
    page.locator('div.card-header.text-center.pt-4 h5')
  ).toContainText('Complete Registration');

  // Enter password & confirm
  await page.fill('input[id="password"]', password);
  await page.fill('input[id="password_confirm"]', password);

  // Accept default checkbox
  await page.locator('input[id="flexCheckDefault"]').click();

  // Click Sign up
  await page.locator('button[type="submit"]', { hasText: ' Sign up ' }).click();

  // Verify account name
  await expect(page.locator('span.d-sm-inline', { hasText: expectedName }))
    .toBeVisible();
}
