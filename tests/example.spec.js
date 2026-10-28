// @ts-check
const { test } = require('@playwright/test');
const QuantelaPage = require('../pages/quantela.page');

test('Open Quantela and validate title', async ({ page }, testInfo) => {
  // @ts-ignore
  const quantela = new QuantelaPage(page, testInfo);
  await quantela.open();
  await quantela.verifyHomepageTitle();

});

