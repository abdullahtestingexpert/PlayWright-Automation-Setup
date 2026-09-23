
import { Locator, Page, expect } from '@playwright/test';

export class ProducerPlanPage {
  readonly page: Page;
  readonly sidebar: Locator;
  readonly sidebarScope: Locator;
  readonly producerPlan: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = page.locator('aside#sidenav-main');
    this.sidebarScope = this.sidebar.locator('ul.navbar-nav');
    this.producerPlan = page.locator('a[href="/goals/business-plan"]');
    this.nextButton = page.locator('button.m-0.btn.bg-gradient-success');
  }

  async goToProducerAnnualPlan() {
    const goalsExpand = this.sidebarScope.getByText('Goals', { exact: true });
    await goalsExpand.click();
    await expect(this.sidebarScope.getByText('Producer Annual Plan', { exact: true })).toBeVisible();
    await this.producerPlan.click();
    await expect(this.page.locator('h2.heading-center', { hasText: 'Enter Info' })).toBeVisible();
  }

  async fillInfoFields(data: Record<string, string>) {
    await this.page.locator('input[id="incomeGoals"]').fill(data["My Increase Income Goals"]);
    await this.page.locator('input[id="agencyIncomeShare"]').fill(data["My Share of Agency Income"]);
    await this.page.locator('input[id="currentBookValue"]').fill(data["My Current Book Agency Value"]);
    await this.page.locator('input[id="renewalRateLargest"]').fill(data["My Expected Renewal Rate on Largest 20% of Accounts"]);
    await this.page.locator('input[id="renewalRateOther"]').fill(data["My Expected Renewal Rate on All Other Accounts"]);
    await this.page.locator('input[id="incomePerNewAccount"]').fill(data["My Target Income per New Account"]);
    await this.page.locator('input[id="closingRatio"]').fill(data["My Target New Business Closing Ratio"]);
    await this.page.locator('input[id="rateIncrease"]').fill(data["Expected Rate Increase on My Book"]);
  }

  async goToResultsPage() {
    await this.nextButton.click();
    await expect(this.page.locator('h2.heading-center', { hasText: 'Results' })).toBeVisible();
  }

  async assertResultValues(expectedValues: string[]) {
    const resultLocators = this.page.locator('div.col-md-6.text-right');
    for (let i = 0; i < expectedValues.length; i++) {
      await expect(resultLocators.nth(i)).toHaveText(expectedValues[i]);
    }
  }

  async fillTelemarketingReferralInputs() {
    await this.nextButton.click(); // Navigate to that section
    await this.page.locator('input[id="dialToAppointmentRatio"]').fill('5');
    await this.page.locator('input[id="referralLeadsPerYear"]').fill('5');
    await this.page.locator('input[id="leadsQualified"]').fill('5');
  }

  async assertTelemarketingReferral(expectedValues: string[]) {
    const loc = this.page.locator('div.col-md-6.text-right');
    for (let i = 0; i < expectedValues.length; i++) {
      await expect(loc.nth(i)).toHaveText(expectedValues[i]);
    }
  }

  async saveFinalPlan() {
    await this.nextButton.click();
  }
}
