import {test, expect} from '@playwright/test';
import { HomePage } from '../util-models/homepage';
import { ItemPage } from '../util-models/itemPage';
import { CheckoutPage } from '../util-models/checkout';
import { MyAccount } from '../util-models/my-account-page';

test.describe('Page checks no login', () => {
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goto();
      });
    test('Initial test', async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.logoCheck();
        await homePage.navBarCheck();
        await homePage.itemCheck();
        await homePage.addToCart(1);
        await homePage.cartCheck();
        await homePage.itemActionsCheck(1);
    })

    test('Checkout item from home page', async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.addToCart(2);
    });

    test('Checkout item from item page', async({ page }) => {
        const itempage = new ItemPage(page);
        await itempage.goto();
        await itempage.addToCart();
    });
});

test.describe('Purchase items no login', () => {
    test('Purchase item from item page', async({ page }) => {
        const itempage = new ItemPage(page);
        await itempage.goto();
        await itempage.addToCart();
        await itempage.purchaseNoLogin();
    }); 

    test('Purchase item from home page', async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await homePage.addToCart(2);
        await homePage.purchaseNoLogin();
    });
})

test.describe('Page checks while logged in', () => {
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        const myAcc = new MyAccount(page);
        await homePage.goto();
        await homePage.gotoSignIn();
        await myAcc.signInWithAcc();
        await homePage.goto();
      });
    test('Initial test', async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.logoCheck();
        await homePage.navBarCheck();
        await homePage.itemCheck();
        await homePage.addToCart(1);
        await homePage.cartCheck();
        await homePage.itemActionsCheck(1);
    })

    test('Checkout item from home page', async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.addToCart(2);
    });

    test('Checkout item from item page', async({ page }) => {
        const itempage = new ItemPage(page);
        await itempage.goto();
        await itempage.addToCart();
    });
})

test.describe('Purchase items while logged in', () => {
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        const myAcc = new MyAccount(page);
        await homePage.goto();
        await homePage.gotoSignIn();
        await myAcc.signInWithAcc();
      });
    test('Purchase item from item page', async({ page }) => {
        const itempage = new ItemPage(page);
        await itempage.goto();
        await itempage.addToCart();
        await itempage.purchaseNoLogin();
    }); 

    test('Purchase item from home page', async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await homePage.addToCart(2);
        await homePage.purchaseNoLogin();
    });
})