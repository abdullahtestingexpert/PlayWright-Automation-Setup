import { Page, Locator, expect } from '@playwright/test';
import { uploadFile } from './commonFunctions';

export class EditStylePage {
  readonly page: Page;

  // Locators
  readonly agencyTab: Locator;
  readonly styleMenuItem: Locator;
  readonly headingEditYourStyle: Locator;
  readonly subHeadingEditYourStyle: Locator;
  readonly primaryColorInput: Locator;
  readonly textColorInput: Locator;
  readonly logoUploadInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly updateStyleButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.agencyTab = page.locator('span.nav-link-text.ms-1').nth(4);
    this.styleMenuItem = page.locator('a[href="/style"]');
    this.headingEditYourStyle = page.locator('h3.mt-5.text-white');
    this.subHeadingEditYourStyle = page.locator('h5.text-white.font-weight-normal');
    this.primaryColorInput = page.locator('input.form-control').nth(0);
    this.textColorInput = page.locator('input.form-control').nth(1);
    this.logoUploadInput = page.locator('input.form-control-file');
    this.phoneNumberInput = page.locator('input.form-control.mx-auto');
    this.updateStyleButton = page.locator('button.btn.btn-primary.me-2', { hasText: 'Update Style' });
  }

  async navigateToStylePage() {
    await this.agencyTab.click();
    await this.styleMenuItem.click();
    await this.page.waitForURL(/style/);
  }

  async verifyHeadings() {
    await expect(this.headingEditYourStyle).toHaveText('Edit your style');
    await expect(this.subHeadingEditYourStyle)
      .toHaveText(' This is where you set the logo and colors for your agency styled reports. ');
  }

  async setPrimaryColor(color: string) {
    await this.primaryColorInput.fill(color);
  }

  async setTextColor(color: string) {
    await this.textColorInput.fill(color);
  }

  async uploadLogo(filePath: string) {
    await uploadFile(this.page, 'input.form-control-file', filePath);
  }

  async setPhoneNumber(phone: string) {
    await this.phoneNumberInput.fill(phone);
  }

  async updateStyle() {
    await this.updateStyleButton.click();
  }

  async verifyPreview(phone: string, agencyId: number) {
    await this.page.goto(`https://api-staging.protegogapproposal.com/reports/preview/test/${agencyId}`);

    // Verify text exists
    await expect(this.page.locator('div.text-section', { hasText: 'Now you can afford to ask!' })).toBeVisible();
    // await expect(this.page.locator('p', { hasText: phone })).toBeVisible();

    // Verify text color
    const summaryText = this.page.locator(
      'h2[style="color: #38761D; margin: 0; font-size: 24px;"]',
      { hasText: 'Consulting' }
    ).nth(0);

    await expect(summaryText).toHaveCSS('color', 'rgb(56, 118, 29)');

    // Verify background color
    const backgroundColor = this.page.locator(
      'div[style="min-height: 30px; background-color: #FFF2CC; padding: 10px; text-align: center;"]',
      { hasText: 'Consulting' }
    ).nth(0);

    await expect(backgroundColor).toHaveCSS('background-color', 'rgb(255, 242, 204)');
  }
}
