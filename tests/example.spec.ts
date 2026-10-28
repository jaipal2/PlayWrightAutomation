import { test } from '@playwright/test';
import QuantelaPage from '../pages/quantela.page';

test('Open Quantela and validate title', async ({ page }, testInfo) => {
  const quantela = new QuantelaPage(page, testInfo);
  await quantela.open();
  await quantela.verifyHomepageTitle();
});
