
import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly sidebar: Locator;
  readonly sidebarScope: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = page.locator('aside#sidenav-main');
    this.sidebarScope = this.sidebar.locator('ul.navbar-nav');
  }

  private containerHeading(label: string) {
    return this.page.locator('p.mb-0.text-sm', { hasText: label });
  }

  private navBarHeading(label: string) {
    return this.page.locator('span.nav-link-text.ms-1', { hasText: label });
  }

  async verifyContainerHeadings(labels: string[]) {
    for (const label of labels) {
      await expect(this.containerHeading(label)).toBeVisible();
    }
  }

  async verifyNavBarHeadings(labels: string[]) {
    for (const label of labels) {
      await expect(this.navBarHeading(label)).toBeVisible();
    }
  }

  async verifySidebarVisible() {
    await expect(this.sidebar).toBeVisible();
  }

  async expandSection(section: string, subItems: string[]) {
    await this.sidebarScope.getByText(section, { exact: true }).click();
    for (const item of subItems) {
      await expect(this.sidebarScope.getByText(item, { exact: true })).toBeVisible();
    }
  }

  async verifyStaticSidebarItems(items: string[]) {
    for (const item of items) {
      await expect(this.sidebarScope.getByText(item, { exact: true })).toBeVisible();
    }
  }
}
