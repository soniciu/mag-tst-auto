import {test, expect} from '@playwright/test';
import { HomePage } from '../page-models/homepage';

test.describe('Homepage checks', () => {
    test('Initial test', async({ page }) => {
        const homepage = new HomePage(page);
        await homepage.goto();
        await homepage.logoCheck();
        await homepage.itemCheck();
    })
});