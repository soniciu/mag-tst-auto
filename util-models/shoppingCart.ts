import { expect, type Locator, type Page } from '@playwright/test';

export class ShoppingCart {
    readonly page: Page;
    readonly shoppingCart: Locator;
    readonly cartDialog: Locator;
    readonly checkoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCart = page.locator('div.minicart-wrapper');
        this.cartDialog = page.locator('div.block-minicart');
        this.checkoutBtn = this.cartDialog.getByRole('button', {name: 'Proceed to Checkout'});
    }

    async openShoppingCart() {
        await this.shoppingCart.click({ force: true });
        await expect(this.cartDialog).toBeVisible()
    }

    async checkIfCartEmpty() {
        return await expect(this.checkoutBtn).toBeVisible()
    }
}