**BizAssure Playwright Automation with Page Object Model (POM) Framework**

**Introduction**
This project demonstrates how to set up and use Playwright for end-to-end testing using a Page Object Model (POM) framework in TypeScript. The POM approach helps organize your code by separating page structure from test logic, improving reusability, readability, and maintenance.

**Table of Contents**
- Prerequisites
- Installation
- Project Structure
- Configuration
- Writing Tests
- Running Tests

**Prerequisites**
Before you begin, ensure the following are installed on your system:
Node.js (version 16 or higher)
npm (comes with Node.js)
Git (optional but recommended)

**Installation**
Clone the repository
- git clone https://github.com/Creatingly/PlaywrightTests.git
- cd PlaywrightTests
- Install dependencies
- npm install
- npx playwright install

**Project Structure**
Here is an overview of the structure used in this Playwright project:

tests/
├── pages/                    # Page Object Model classes
│   ├── LoginPage.ts
│   └── homePage.ts
├── tests/                    # Executionable tests
├── login.spec.ts             # Example test using the login page
playwright.config.ts          # Playwright configuration file
package.json

pages/: Contains reusable POM classes.

*.spec.ts: Test scripts using the POM methods.

playwright.config.ts: Global settings such as base URL, timeout, etc.

**Running Tests**
You can run your Playwright tests in different modes:
- Headed Mode (interactive browser):
npx playwright test --headed
Headless Mode (default):
npx playwright test
Run Specific Test File:
npx playwright test tests/login.spec.ts

Additional Tips
Customize timeouts or retries in playwright.config.ts if you're dealing with slow environments.

Use --debug flag to open Playwright Inspector during test failures.

Integrate with CI/CD platforms for automation at scale.
