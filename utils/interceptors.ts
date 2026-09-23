import { Page, Response } from '@playwright/test';

export async function waitForLoginApiResponse(
  page: Page,
  url: string = 'https://api-staging.protegogapproposal.com/api/vue/login'
): Promise<Response> {
  const [response] = await Promise.all([
    page.waitForResponse(
      (res) => res.url() === url && res.request().method() === 'POST'
    ),
    // The caller must trigger login action in parallel
  ]);

  return response;
}

export async function waitForUnauthorizedAPI(
  page: Page,
  url: string = 'https://api-staging.protegogapproposal.com/api/vue/login'
): Promise<Response> {
  const [response] = await Promise.all([
    page.waitForResponse(
      (res) => res.url() === url && res.request().method() === 'POST'
    ),
    // login trigger should happen concurrently
  ]);

  return response;
}