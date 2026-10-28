# Playwright Automation

Reusable TypeScript test framework using Playwright Test and page objects.

## Run tests

```powershell
npm test
npm run test:headed
npm run test:report
npm run typecheck
```

Run one test file or browser project:

```powershell
npx playwright test tests/example.spec.ts --project=chromium
```

## Structure

- `pages/locators.ts` contains reusable locator builders and page-specific selectors.
- `pages/base.page.ts` contains shared browser actions, assertions, and per-step screenshots.
- `pages/quantela.page.ts` contains Quantela page methods and its page-specific workflow.
- `tests/` contains test scenarios; keep selectors and browser actions in page modules.

## Add a page

Create a locator factory in `pages/locators.ts`, then create a page class that extends `BasePage`. Keep selectors in the locator factory and expose meaningful page actions on the class.

```js
import { test } from '@playwright/test';
import QuantelaPage from '../pages/quantela.page';

test('Quantela homepage title', async ({ page }, testInfo) => {
  const quantela = new QuantelaPage(page, testInfo);
  await quantela.open();
  await quantela.verifyHomepageTitle();
});
```

Available locator builders include `byRole`, `byText`, `byLabel`, `byPlaceholder`, `byAltText`, `byTitle`, `byTestId`, and `locator` for CSS or other Playwright selector engines. Shared page actions are in `BasePage`; use Playwright's locator methods directly when a specialized operation is needed.