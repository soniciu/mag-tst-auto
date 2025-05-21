import {test, expect} from '@playwright/test';
import { HomePage } from '../util-models/homepage';
import { ItemPage } from '../util-models/itemPage';
import { MyAccount } from '../util-models/my-account-page';
import { ShoppingCart } from '../util-models/shoppingCart';

const itemNo = 1;

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
        await homePage.addToCart(itemNo);
        await homePage.cartCheck();
        await homePage.itemActionsCheck(itemNo);
    })

    test('Checkout item from home page', async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.addToCart(itemNo);
    });

    test('Checkout item from item page', async({ page }) => {
        const itempage = new ItemPage(page);
        await itempage.goto();
        await itempage.addToCart();
    });
});

test.describe('Purchase items no login', () => {
    test.skip('Purchase item from item page', async({ page }) => {
        const itempage = new ItemPage(page);
        await itempage.goto();
        await itempage.addToCart();
        await itempage.purchaseNoLogin();
    }); 

    test.skip('Purchase item from home page', async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await homePage.addToCart(itemNo);
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
        await homePage.addToCart(itemNo);
        await homePage.cartCheck();
        await homePage.itemActionsCheck(itemNo);
    })

    test('Checkout item from home page', async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.addToCart(itemNo);
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
        await itempage.purchaseWithLogin();
    }); 

    test('Purchase item from home page', async({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await homePage.addToCart(itemNo);
        await homePage.purchaseWithLogin();
    });
})