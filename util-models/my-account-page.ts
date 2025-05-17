import { expect, type Locator, type Page } from '@playwright/test';

export class SignIn {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly signInBtn: Locator;
    readonly myAccHead: Locator;


    constructor(page: Page) {
        this.page = page;
        this.email = page.getByLabel('Email');
        this.password = page.getByLabel('Password');
        this.signInBtn = page.getByRole('button', {name: 'Sign In'});
        this.myAccHead = page.locator('h1').getByText('My Account');
    }

    async signInWithAcc() {
        await this.email.fill(process.env.USER_NAME);
        await this.password.fill(process.env.PASSWORD);
        await this.signInBtn.click();
    }

    async logIn() {
        await this.signInWithAcc();
        await expect(this.myAccHead).toBeVisible();
    }
}