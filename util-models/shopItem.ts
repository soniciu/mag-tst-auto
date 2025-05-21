import { expect, type Locator, type Page } from '@playwright/test';

export class ShopItem {
    readonly page: Page;
    readonly nthItem: Locator;
    itemImage: Locator;
    itemName: Locator;
    itemPrice: Locator;
    itemSize: Locator;
    itemColor: Locator;
    itemRating: Locator;
    itemAddCompare: Locator;
    itemAddToCart: Locator;
    itemAddWishList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nthItem = page.locator('ol.product-items').getByRole('listitem');
    }

    async sizeCheck(itemNo: number) {
        await this.setItem(itemNo).hover();
        this.itemSize = this.getItemAttribute(itemNo, 'size').getByText('XS');
        await expect(this.itemSize).toBeVisible();
    }

    // Implemented a more generic attribute getter, 
    // in order to be able to select any item on the page
    async itemCheck(itemNo: number) {
        await this.setItem(itemNo).hover();
        await expect(this.getItemAttribute(itemNo, 'size')).toBeVisible();
        await expect(this.getItemAttribute(itemNo, 'color')).toBeVisible();
        await expect(this.getItemAttribute(itemNo, 'photo')).toBeVisible();
        await expect(this.getItemAttribute(itemNo, 'name')).toBeVisible();
        await expect(this.getItemAttribute(itemNo, 'rating')).toBeVisible();
        await expect(this.getItemAttribute(itemNo, 'addCart')).toBeVisible();
        await expect(this.getItemAttribute(itemNo, 'addWishList')).toBeVisible();
        await expect(this.getItemAttribute(itemNo, 'addCompare')).toBeVisible();
    }

    setItem(itemNo: number) {
        const currentItem = this.nthItem.nth(itemNo);
        return currentItem;
    }

    getItemAttribute(itemNo: number, attribute: string) {
        const currentItem = this.setItem(itemNo);
        let itemAttribute = currentItem
        switch (attribute) {
            case 'size':
                itemAttribute = currentItem.locator('div.swatch-attribute.size');
                break;
            case 'color':
                itemAttribute = currentItem.locator('div.swatch-attribute.color');
                break;
            case 'photo':
                itemAttribute = currentItem.locator('a.product-item-photo');
                break;
            case 'name':
                itemAttribute = currentItem.locator('strong.product-item-name');
                break;
            case 'rating':
                itemAttribute = currentItem.locator('div.rating-summary');
                break;
            case 'addCart':
                itemAttribute = currentItem.locator('div.product-item-actions button.tocart');
                break;
            case 'addWishList':
                itemAttribute = currentItem.locator('div.product-item-actions a.towishlist');
                break;
            case 'addCompare':
                itemAttribute = currentItem.locator('div.product-item-actions a.tocompare');
                break;

            }
        return itemAttribute;
    }

    // Add an item to the cart. Use itemNo to choose which item to add
    // itemNo is the index of the item on the page, starting at 0
    async addToCart(itemNo: number) {
        await this.setItem(itemNo).hover();
        await this.getItemAttribute(itemNo, 'size').getByText('XS').click();
        await this.getItemAttribute(itemNo, 'color').locator('div.swatch-option.color').nth(0).click();
        await this.getItemAttribute(itemNo, 'addCart').click();
    }
}