import {test, expect} from '@playwright/test';
import { HomePage } from '../util-models/homepage';
import { SignIn } from '../util-models/my-account-page';

test.describe('Homepage checks', () => {
    test('Initial test', async({ page }) => {
        const homepage = new HomePage(page);
        await homepage.gotoSignIn();
        // await homepage.logoCheck();
        // await homepage.navBarCheck();
        // await homepage.itemCheck();
        // await homepage.footerCheck();
        // await homepage.itemActionsCheck(2);
        const accPage = new SignIn(page);
        await accPage.logIn();
    })
});