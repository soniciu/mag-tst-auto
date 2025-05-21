import { expect, type Locator, type Page } from '@playwright/test';

export class ShoppingCart {
    readonly page: Page;
    readonly shoppingCart: Locator;
    readonly cartDialog: Locator;
    readonly checkoutBtn: Locator;
    readonly itemCount: Locator;
    readonly progressBar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCart = page.locator('div.minicart-wrapper');
        this.cartDialog = page.locator('div.block-minicart');
        this.checkoutBtn = this.cartDialog.getByRole('button', {name: 'Proceed to Checkout'});
        this.itemCount = page.locator('span.counter-number');
        this.progressBar = page.locator('ul.opc-progress-bar')
    }

    async openShoppingCart() {
        await this.shoppingCart.click();
        await expect(this.cartDialog).toBeVisible();
    }

    async checkIfCartEmpty() {
        await expect(this.checkoutBtn).toBeAttached();
    }

    async gotoCheckout() {
        await this.shoppingCart.click();
        await this.checkoutBtn.click();
        await expect(this.progressBar).toBeVisible();
    }
}