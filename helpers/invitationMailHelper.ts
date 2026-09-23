import { Page, expect } from '@playwright/test';
import MailosaurClient from 'mailosaur';

export async function inviteUserAndCompleteRegistration(
  page: Page,
  {
    serverId,
    apiKey,
    testEmail,
    password,
    expectedName
  }: {
    serverId: string;
    apiKey: string;
    testEmail: string;
    password: string;
    expectedName: string;
  }
) {
  const mailosaur = new MailosaurClient(apiKey);

  console.log('Waiting for invite email...');
  const message = await mailosaur.messages.get(serverId, {
    sentTo: testEmail
  });

  const activationLink = message.html?.links?.[0].href;
  if (!activationLink) throw new Error('No activation link found in email');
  console.log('Activation link:', activationLink);

  await page.goto(activationLink);

  await expect(page.locator('div.card-header.text-center.pt-4 h5'))
    .toContainText('Complete Registration');

  await page.fill('input[id="password"]', password);
  await page.fill('input[id="password_confirm"]', password);
  await page.locator('input[id="flexCheckDefault"]').click();
  await page.locator('button[type="submit"]', { hasText: ' Sign up ' }).click();

  await expect(page.locator('span.d-sm-inline', { hasText: expectedName }))
    .toBeVisible();
}
