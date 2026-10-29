// @ts-check
const { test } = require('@playwright/test');
const QuantelaPage = require('../pages/quantela.page').default;

test('Open Quantela and validate title', async ({ page }, testInfo) => {
  const quantela = new QuantelaPage(page, testInfo);
  await quantela.open();
  await quantela.verifyHomepageTitle();
  

});

