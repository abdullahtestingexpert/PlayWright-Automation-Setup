import { expect, Page } from '@playwright/test';
import MailosaurClient from 'mailosaur';

export async function getActivationLinkFromMailosaur({
  serverId,
  apiKey,
  email
}: {
  serverId: string;
  apiKey: string;
  email: string;
}): Promise<string> {
  const mailosaur = new MailosaurClient(apiKey);

  console.log(`Waiting for invite email sent to ${email}...`);
  const message = await mailosaur.messages.get(serverId, {
    sentTo: email
  });

  const activationLink = message.html?.links?.[0]?.href;
  if (!activationLink) throw new Error('No activation link found in email');

  console.log('Activation link found:', activationLink);
  return activationLink;
}


export async function uploadFile(page: Page, selector: string, filePaths: string | string[]): Promise<void> {
  const fileInput = page.locator(selector);  // Locate the file input element

  // Upload the file(s)
  await fileInput.setInputFiles(filePaths);

  // Optional: Wait for a short period to give the browser time to process the upload
  await page.waitForTimeout(1000); // Increased time to give the upload some processing time

  // Try fetching the value of the file input field
  const uploadedFile = await fileInput.getAttribute('value');
  
  // Debug log to check the file input value
  console.log('Uploaded file value:', uploadedFile);
}

export function hexToRgb(hex: string): string {
  hex = hex.replace(/^#/, '');
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
}
