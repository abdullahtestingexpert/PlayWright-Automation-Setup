import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly productHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productHeading = page.locator('h6.mb-0'); // Adjust selector if needed
  }

  // Optional: Wait for product heading to appear
  async waitForProductHeading() {
    await this.productHeading.waitFor({ state: 'visible' });
  }

  // Method to verify the heading contains "Home"
 async expectProductHeadingToContainText(expectedText: string) {
    await expect(this.productHeading).toContainText(expectedText);
  }
}
