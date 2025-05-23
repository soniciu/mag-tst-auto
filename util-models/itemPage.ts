import { expect, type Locator, type Page } from '@playwright/test';
import { ShoppingCart } from './shoppingCart';
import { CheckoutPage } from './checkout';

export class ItemPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly itemPrice: Locator;
    readonly size: Locator;
    readonly color: Locator;
    readonly quantity: Locator;
    readonly addCartBtn: Locator;
    readonly wishListBtn: Locator;
    readonly compareBtn: Locator;
    readonly image: Locator;
    readonly alert: Locator;
    readonly cart: ShoppingCart;
    readonly checkout: CheckoutPage;

    constructor(page: Page) {
        this.page = page;
        this.cart = new ShoppingCart(page);
        this.pageTitle = page.locator('h1.page-title');
        this.itemPrice = page.locator('div.product-info-price span.price');
        this.size = page.locator('div.swatch-option.text');
        this.color = page.locator('div.swatch-option.color[option-label="Black"]');
        this.quantity = page.locator('input#qty');
        this.addCartBtn = page.getByRole('button', {name: 'Add to Cart'});
        this.wishListBtn = page.getByRole('button', {name: 'Add to Wish List'});
        this.compareBtn = page.getByRole('button', {name: 'Add to Compare'});
        this.image = page.locator('div.fotorama__wrap');
        this.alert = page.getByRole('alert');
        this.checkout = new CheckoutPage(page);
    }
    
    // Navigate to a specific item page
    async goto() {
        await this.page.goto(process.env.PRODUCT_PAGE!);
    }

    // Check item details and add the item to the cart
    async addToCart() {
        await expect(this.pageTitle).toHaveText('Hero Hoodie');
        await expect(this.itemPrice).toHaveText('$54.00');
        const startQty = await this.cart.getCartItemCount()
        console.log('Starting: ' + startQty)
        await this.size.getByText('M').click()
        await this.color.click();
        await this.quantity.fill('2');
        await this.addCartBtn.click();
        const currentQty = startQty + 2;
        console.log('Current: ' + currentQty)
        await expect (this.cart.itemCount).toHaveText(currentQty.toString());
    }

    // Go through purchase process as a guest
    async purchaseNoLogin() {
        await this.cart.gotoCheckout();
        await this.checkout.checkoutStepOne();
        await this.checkout.checkoutStepTwo();
    }
    // Go through purchase process while logged in
    async purchaseWithLogin() {
        await this.cart.gotoCheckout();
        await this.checkout.checkoutLoggedIn();
    }
}