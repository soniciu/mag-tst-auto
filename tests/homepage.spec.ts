import {test, expect} from '@playwright/test';
import { HomePage } from '../util-models/homepage';
import { MyAccount } from '../util-models/my-account-page';

test.describe('Homepage checks', () => {
    test('Initial test', async({ page }) => {
        const homepage = new HomePage(page);
        await homepage.goto();
        // await homepage.logoCheck();
        // await homepage.navBarCheck();
        // await homepage.itemCheck();
        await homepage.addToCart(2);
        await homepage.cartCheck();
        // await homepage.itemActionsCheck(2);
        // const accPage = new MyAccount(page);
        // await accPage.logIn();
    })
});