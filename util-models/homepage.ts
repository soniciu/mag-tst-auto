import { expect, type Locator, type Page } from '@playwright/test';
import { ShoppingCart } from './shoppingCart';
import { ShopItem } from './shopItem';
import { CheckoutPage } from '../util-models/checkout';

export class HomePage {
    readonly page: Page;
    readonly mainLogo: Locator;
    readonly storeItem: Locator;
    readonly footer: Locator;
    readonly navBar: Locator;
    readonly shopCart: ShoppingCart;
    readonly shopItem: ShopItem;
    readonly checkout: CheckoutPage;
    readonly myAcc: Locator

    constructor(page: Page) {
        this.page = page;
        this.mainLogo = page.getByLabel('store logo');
        this.storeItem = page.locator('div.products-grid ol li');
        this.footer = page.locator('footer div ul li');
        this.navBar = page.locator('nav ul#ui-id-2');
        this.shopCart = new ShoppingCart(page);
        this.shopItem = new ShopItem(page);
        this.checkout = new CheckoutPage(page);
    }

    // Navigate to homepage
    async goto() {
        await this.page.goto(process.env.HOME_PAGE!);
    }

    // Navigate to the sign in page
    async gotoSignIn() {
        await this.page.goto(process.env.MY_ACCOUNT_PAGE!);
    }

    // Methods for sanity checks for the homepage
    async logoCheck() {
        await expect(this.mainLogo).toBeVisible();
    }

    async itemCheck() {
        const count = await this.storeItem.count();
        await expect(count).toBe(6);
    }

    async footerCheck() {
        await expect(this.footer).toHaveText([
            'Notes', 'Practice API Testing using Magento 2', 'Write for us', 'Subscribe',
            'Search Terms', 'Privacy and Cookie Policy', 'Advanced Search', 'Orders and Returns'
        ]);
    }

    async navBarCheck() {
        await expect(this.navBar).toBeVisible();
    }

    async cartCheck() {
        await this.shopCart.openShoppingCart();
    }

    async clickItem(itemNo: number) {
        await this.shopItem.sizeCheck(itemNo);
    }

    async itemActionsCheck(itemNo: number) {
        await this.shopItem.itemCheck(itemNo);
    }

    // Add item to cart, by using the shopping cart model
    async addToCart(itemNo: number) {
        await this.shopItem.addToCart(itemNo);
        await expect (this.shopCart.itemCount).toBeVisible();
    }

    // Complete the purchase process as a guest
    async purchaseNoLogin() {
        await this.shopCart.gotoCheckout();
        await this.checkout.checkoutStepOne();
        await this.checkout.checkoutStepTwo();
    }

    // Complete the purchase process while logged in
    async purchaseWithLogin() {
        await this.shopCart.gotoCheckout();
        await this.checkout.checkoutLoggedIn();
    }
}