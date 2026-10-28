import { expect, test, type Locator, type Page, type TestInfo } from '@playwright/test';

export default class BasePage {
  private screenshotIndex = 0;

  constructor(
    protected readonly page: Page,
    protected readonly testInfo: TestInfo,
  ) {}

  protected async step<T>(name: string, action: () => Promise<T>): Promise<T> {
    return test.step(name, async () => {
      try {
        return await action();
      } finally {
        if (!this.page.isClosed()) {
          this.screenshotIndex += 1;
          const screenshot = await this.page.screenshot({ fullPage: true });
          const safeName = name.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
          await this.testInfo.attach(`step-${this.screenshotIndex}-${safeName}.png`, {
            body: screenshot,
            contentType: 'image/png',
          });
        }
      }
    });
  }

  navigate(url: string, name = `Navigate to ${url}`, options: Parameters<Page['goto']>[1] = {}) {
    return this.step(name, () => this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      ...options,
    }));
  }

  click(locator: Locator, name = 'Click element') {
    return this.step(name, () => locator.click());
  }

  doubleClick(locator: Locator, name = 'Double-click element') {
    return this.step(name, () => locator.dblclick());
  }

  fill(locator: Locator, value: string, name = 'Fill field') {
    return this.step(name, () => locator.fill(value));
  }

  type(locator: Locator, value: string, name = 'Type into field') {
    return this.step(name, () => locator.pressSequentially(value));
  }

  clear(locator: Locator, name = 'Clear field') {
    return this.step(name, () => locator.clear());
  }

  press(locator: Locator, key: string, name = `Press ${key}`) {
    return this.step(name, () => locator.press(key));
  }

  selectOption(locator: Locator, value: Parameters<Locator['selectOption']>[0], name = 'Select option') {
    return this.step(name, () => locator.selectOption(value));
  }

  uploadFile(locator: Locator, files: Parameters<Locator['setInputFiles']>[0], name = 'Upload file') {
    return this.step(name, () => locator.setInputFiles(files));
  }

  check(locator: Locator, name = 'Check control') {
    return this.step(name, () => locator.check());
  }

  uncheck(locator: Locator, name = 'Uncheck control') {
    return this.step(name, () => locator.uncheck());
  }

  hover(locator: Locator, name = 'Hover over element') {
    return this.step(name, () => locator.hover());
  }

  focus(locator: Locator, name = 'Focus element') {
    return this.step(name, () => locator.focus());
  }

  scrollIntoView(locator: Locator, name = 'Scroll element into view') {
    return this.step(name, () => locator.scrollIntoViewIfNeeded());
  }

  getText(locator: Locator, name = 'Read element text') {
    return this.step(name, () => locator.textContent());
  }

  getInputValue(locator: Locator, name = 'Read input value') {
    return this.step(name, () => locator.inputValue());
  }

  getAttribute(locator: Locator, attribute: string, name = `Read ${attribute} attribute`) {
    return this.step(name, () => locator.getAttribute(attribute));
  }

  count(locator: Locator, name = 'Count matching elements') {
    return this.step(name, () => locator.count());
  }

  waitFor(locator: Locator, options: Parameters<Locator['waitFor']>[0] = {}, name = 'Wait for element') {
    return this.step(name, () => locator.waitFor(options));
  }

  expectVisible(locator: Locator, name = 'Verify element is visible') {
    return this.step(name, () => expect(locator).toBeVisible());
  }

  expectHidden(locator: Locator, name = 'Verify element is hidden') {
    return this.step(name, () => expect(locator).toBeHidden());
  }

  expectText(locator: Locator, text: string | RegExp, name = 'Verify element text') {
    return this.step(name, () => expect(locator).toHaveText(text));
  }

  expectTextContent(locator: Locator, text: string | null, name = 'Verify text content') {
    return this.step(name, async () => expect(await locator.textContent()).toBe(text));
  }

  expectValue(locator: Locator, value: string | RegExp, name = 'Verify input value') {
    return this.step(name, () => expect(locator).toHaveValue(value));
  }

  expectEnabled(locator: Locator, name = 'Verify element is enabled') {
    return this.step(name, () => expect(locator).toBeEnabled());
  }

  expectDisabled(locator: Locator, name = 'Verify element is disabled') {
    return this.step(name, () => expect(locator).toBeDisabled());
  }

  expectChecked(locator: Locator, name = 'Verify control is checked') {
    return this.step(name, () => expect(locator).toBeChecked());
  }

  expectTitle(title: string | RegExp, name = 'Verify page title') {
    return this.step(name, () => expect(this.page).toHaveTitle(title));
  }

  expectUrl(url: string | RegExp, name = 'Verify page URL') {
    return this.step(name, () => expect(this.page).toHaveURL(url));
  }
}
