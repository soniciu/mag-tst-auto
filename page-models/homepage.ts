import { expect, type Locator, type Page } from '@playwright/test'

export class HomePage {
    readonly page: Page;
    readonly mainLogo: Locator;
    readonly storeItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainLogo = page.getByLabel('store logo');
        this.storeItem = page.locator('div.products-grid ol li');
    }

    async goto() {
        await this.page.goto('https://magento.softwaretestingboard.com/');
    }

    async logoCheck() {
        await expect(this.mainLogo).toBeVisible
    }

    async itemCheck() {
        const count = await this.storeItem.count();
        await expect(count).toBe(6)
    }
}