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

    // Check that the shopping cart opens
    async openShoppingCart() {
        await this.shoppingCart.click();
        await expect(this.cartDialog).toBeVisible();
    }

    // Check if the shopping cart has items in it
    async checkIfCartEmpty() {
        await this.shoppingCart.click();
        return await this.checkoutBtn.isVisible();
    }

    // Returns the number of items currently in the shopping cart
    async getCartItemCount() {
        const check = await this.checkIfCartEmpty()
        if (check) {
            await expect(this.itemCount).toBeVisible();
            return +await this.itemCount.innerText();
        }
        else {
            return 0;
        }
        
    }

    // Navigates to the checkout from the cart card
    async gotoCheckout() {
        await this.shoppingCart.click();
        await this.checkoutBtn.click();
        await expect(this.progressBar).toBeVisible();
    }
}