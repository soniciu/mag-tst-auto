import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly company: Locator;
    readonly streetAddress: Locator;
    readonly city: Locator;
    readonly zipCode: Locator;
    readonly phoneNumber: Locator;
    readonly stateDrpdwn: Locator;
    readonly countryDrpdwn: Locator;
    readonly selectOption: Locator;
    readonly nextStep: Locator;
    readonly step: Locator;
    readonly payBtn: Locator;
    readonly billDetails: Locator;
    readonly successTitle: Locator;
    readonly shippingStep: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.getByLabel('Email Address');
        this.password = page.getByLabel('Password');
        this.firstName = page.getByLabel('First Name');
        this.lastName = page.getByLabel('Last Name');
        this.company = page.getByLabel('Company');
        this.streetAddress = page.getByLabel('Street Address').nth(0);
        this.city = page.getByLabel('City');
        this.zipCode = page.getByLabel('Zip/Postal');
        this.phoneNumber = page.getByLabel('Phone Number');
        this.stateDrpdwn = page.locator('select').getByLabel('State/Province');
        this.countryDrpdwn = page.locator('select').getByLabel('Country');
        this.nextStep = page.locator('button').getByText('Next');
        this.step = page.locator('div.step-title');
        this.shippingStep = this.step.locator('div#checkout-step-shipping');
        this.payBtn = page.locator('button').getByText('Place Order');
        this.billDetails = page.locator('div.billing-address-details');
        this.successTitle = page.locator('h1.page-title');
    }

    // Fill out the purchase form with mock data
    async checkoutStepOne() {
        await this.firstName.fill('John');
        await this.lastName.fill('Doe');
        await this.company.fill('Testers');
        await this.streetAddress.fill('Main Street');
        await this.city.fill('Salt lake');
        await this.zipCode.fill('100123-123100');
        await this.phoneNumber.fill('01234567890');
        await this.countryDrpdwn.selectOption('Romania');
        await this.stateDrpdwn.selectOption('Prahova');
        await this.nextStep.click();
    }

    // Complete the purchase. More checks could be added, but were too flaky and time was limited
    async checkoutStepTwo() {
        await expect(this.step).toHaveText('Payment Method');
        await this.payBtn.click();
        await expect(this.successTitle).toHaveText('Thank you for your purchase!');
    }

    // Simplified purchase process while logged in
    async checkoutLoggedIn() {
        await this.nextStep.click();
        await this.payBtn.click();
        await expect(this.successTitle).toHaveText('Thank you for your purchase!');
    }

}