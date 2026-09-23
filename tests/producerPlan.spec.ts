// Producer Annual Plan - Full Journey
import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProducerPlanPage } from '../pages/producerPlanPage';
import testData from '../fixtures/planTypesTestData.json';
import resultData from '../fixtures/resultsData.json';

test('Producer Annual Plan - Full Journey', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const producerPlanPage = new ProducerPlanPage(page);

  const testInputs = testData[0];
  const expectedResults = Object.values(resultData[0]);
  const telemarketingExpected = ['380,980', '31,749', '1,588', '76,196'];
  
  const containerHeadings = [
    'Average Consulting Savings',
    'Average Gap Liability',
    'Average Account Premium',
    'Earnings Ratio',
    'Closing Ratio',
    'Presentation Goal (YTD)',
    'Income Goal (YTD)'
  ]

  const navBarHeadings = [
    'Dashboard',
    'Proposals',
    'Goals',
    'Email Marketing (BETA)',
    'Support'
  ]

  //Login with Producer Plan 
  await loginPage.login('brandon+producer@royal.it.com', 'testtest');
  await page.waitForURL(/dashboard\/home/);
  await page.click('button.btn.btn-primary');

  const sidebar = page.locator('aside#sidenav-main');
  await expect(sidebar).toBeVisible();
  const sidebarScope = sidebar.locator('ul.navbar-nav');

  //Verify container Headings
  for (const label of containerHeadings) {
    await expect(
      page.locator('p.mb-0.text-sm', { hasText: label })
    ).toBeVisible();
  }

  //Verify left navbar Headings
  for (const label of navBarHeadings) {
    await expect(
      page.locator('span.nav-link-text.ms-1', { hasText: label })
    ).toBeVisible();
  }

  // === Dashboard ===
  const dashboardExpand = sidebarScope.getByText('Dashboard', { exact: true });
  await dashboardExpand.click();
  await expect(sidebarScope.getByText('Overview', { exact: true })).toBeVisible();

  // === Proposals ===
  const proposalsExpand = sidebarScope.getByText('Proposals', { exact: true });
  await proposalsExpand.click();
  await expect(sidebarScope.getByText('New Proposal', { exact: true })).toBeVisible();
  await expect(sidebarScope.getByText('All Proposals', { exact: true })).toBeVisible();

  // === Email Marketing ===
  const emailMarketingExpand = sidebarScope.getByText('Email Marketing (BETA)', { exact: true });
  await emailMarketingExpand.click();
  await expect(sidebarScope.getByText('9 Bullets to Bind-it (BETA)', { exact: true })).toBeVisible();
  await expect(sidebarScope.getByText('Document Library', { exact: true })).toBeVisible();

  // === Tutorials & Coaching ===
  await expect(sidebarScope.getByText('Tutorial Videos', { exact: true })).toBeVisible();
  await expect(sidebarScope.getByText('Preeminent Coaching', { exact: true })).toBeVisible();
  await expect(sidebarScope.getByText('Glossary', { exact: true })).toBeVisible();

  // === Support ===
  const supportExpand = sidebarScope.getByText('Support', { exact: true });
  await supportExpand.click();
  await expect(sidebarScope.getByText('FAQs', { exact: true })).toBeVisible();
  await expect(sidebarScope.getByText('Send us a message', { exact: true })).toBeVisible();
  await expect(sidebarScope.getByText('Start Guided Tour', { exact: true })).toBeVisible();

  await producerPlanPage.goToProducerAnnualPlan();
  await producerPlanPage.fillInfoFields(testInputs);
  await producerPlanPage.goToResultsPage();
  await producerPlanPage.assertResultValues(expectedResults);
  await producerPlanPage.fillTelemarketingReferralInputs();
  await producerPlanPage.assertTelemarketingReferral(telemarketingExpected);
  await producerPlanPage.saveFinalPlan();
});