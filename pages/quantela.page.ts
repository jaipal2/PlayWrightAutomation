import type { Page, TestInfo } from '@playwright/test';
import BasePage from './base.page';
import { createQuantelaLocators } from './locators';

export default class QuantelaPage extends BasePage {
  private readonly locators;

  constructor(page: Page, testInfo: TestInfo) {
    super(page, testInfo);
    this.locators = createQuantelaLocators(page);
  }

  open() {
    return this.navigate('/', 'Open Quantela homepage');
  }

  verifyHomepageTitle() {
    return this.expectTextContent(
      this.locators.pageTitle,
      'Quantela - Outcomes Delivered.',
      'Verify Quantela page title',
    );
  }
}
