import { APIRequestContext, expect, Locator, Page, request } from '@playwright/test';
export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly notificationPopUp: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.locator('button.btn:has-text("Sign in")');
    this.errorMessage = page.getByTestId('#swal2-html-container');
  }

  async goto() {
    await this.page.goto('https://app-staging.protegogapproposal.com/login');
  }

  async login(username: string, password: string) {
    await this.goto();

    // Fill email and password after ensuring visibility
    await expect(this.emailInput).toBeVisible({ timeout: 5000 });
    await this.emailInput.fill(username);

    await expect(this.passwordInput).toBeVisible({ timeout: 5000 });
    await this.passwordInput.fill(password);

    // Wait for login button to be visible and enabled
    await expect(this.loginButton).toBeVisible({ timeout: 7000 });
    await expect(this.loginButton).toBeEnabled();

    // Click and wait for either navigation or known post-login element
    await Promise.all([
      this.loginButton.click(),
    ]);
    
  }

  async getErrorMessage(): Promise<string> {
  try {
    await expect(this.errorMessage).toBeVisible({ timeout: 7000 });
    const text = await this.errorMessage.textContent();
    return text ?? '';
  } catch (error) {
    console.warn('❗ Error message not found or not visible in time.');
    return '';
  }
}
}
interface LoginResponse {
  access_token: string;
  user: {
    email: string;
  };
}

export async function loginViaApiAndSetLocalStorage(page: Page): Promise<void> {
  const startTime = Date.now(); // Start measuring time
  const apiContext: APIRequestContext = await request.newContext({
    baseURL: 'https://api-staging.protegogapproposal.com',
    extraHTTPHeaders: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'content-type': 'application/json',
      origin: 'https://app-staging.protegogapproposal.com',
      referer: 'https://app-staging.protegogapproposal.com/',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    }
  });

  const loginResponse = await apiContext.post('/api/vue/login', {
    data: {
      email: 'brandon+appletest@royal.it.com',
      password: 'testtest'
    }
  });


  if (!loginResponse.ok()) {
    throw new Error(`Login failed with status ${loginResponse.status()}`);
  }

  const responseBody: LoginResponse = await loginResponse.json();

  const endTime = Date.now(); // End measuring time
  const duration = endTime - startTime;
  console.log(`🔁 Login API response time: ${duration}ms`);

  await page.goto('https://app-staging.protegogapproposal.com');

  await page.evaluate(({ accessToken, userEmail }) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('notificationsVisible', 'false');
    localStorage.setItem('userEmail', userEmail);
  }, {
    accessToken: responseBody.access_token,
    userEmail: responseBody.user.email
  });

  await page.reload();
}
