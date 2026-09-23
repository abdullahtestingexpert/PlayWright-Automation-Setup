import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90 * 1000,
  reporter: [['html', { open: 'never' }]], // ✅ Generates HTML on each run
  use: {
    baseURL: 'https://app-staging.protegogapproposal.com',
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
