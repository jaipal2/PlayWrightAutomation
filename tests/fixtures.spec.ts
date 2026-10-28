import { expect, test } from '@playwright/test';

test('uses the page fixture', async ({ page }, testInfo) => {
  await page.setContent('<title>Fixture page</title><h1>Hello, fixtures!</h1>');

  await expect(page).toHaveTitle('Fixture page');
  await expect(page.getByRole('heading', { name: 'Hello, fixtures!' })).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath('fixture.png'),
    fullPage: true,
  });
});
