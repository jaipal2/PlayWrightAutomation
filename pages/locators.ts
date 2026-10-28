import type { Locator, Page } from '@playwright/test';

export function createLocators(page: Page) {
  return {
    byRole: (role: Parameters<Page['getByRole']>[0], options?: Parameters<Page['getByRole']>[1]): Locator =>
      page.getByRole(role, options),
    byText: (text: Parameters<Page['getByText']>[0], options?: Parameters<Page['getByText']>[1]): Locator =>
      page.getByText(text, options),
    byLabel: (text: Parameters<Page['getByLabel']>[0], options?: Parameters<Page['getByLabel']>[1]): Locator =>
      page.getByLabel(text, options),
    byPlaceholder: (text: Parameters<Page['getByPlaceholder']>[0], options?: Parameters<Page['getByPlaceholder']>[1]): Locator =>
      page.getByPlaceholder(text, options),
    byAltText: (text: Parameters<Page['getByAltText']>[0], options?: Parameters<Page['getByAltText']>[1]): Locator =>
      page.getByAltText(text, options),
    byTitle: (text: Parameters<Page['getByTitle']>[0], options?: Parameters<Page['getByTitle']>[1]): Locator =>
      page.getByTitle(text, options),
    byTestId: (testId: string): Locator => page.getByTestId(testId),
    locator: (selector: string): Locator => page.locator(selector),
    css: (selector: string): Locator => page.locator(selector),
  };
}

export function createQuantelaLocators(page: Page) {
  const locators = createLocators(page);

  return {
    ...locators,
    pageTitle: locators.css('title'),
  };
}
