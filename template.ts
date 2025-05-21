import { expect, type Locator, type Page } from '@playwright/test';

export class ClassName {
    readonly page: Page;
    readonly locator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.locator = page.locator('div.minicart-wrapper');
    }

    async classMethod() {
    }
}