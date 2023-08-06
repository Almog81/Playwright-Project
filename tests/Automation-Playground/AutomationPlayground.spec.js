// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async({ page }) => {
    await page.goto('http://uitestingplayground.com/');
});

test.describe('Testing Playground', () => {

    test('Test01: Dynamic ID', async({ page }) => {
        await page.getByRole('link', { name: 'Dynamic ID' }).click();
        await expect(page.locator('.btn.btn-primary')).toHaveText('Button with Dynamic ID')

    })

    test.skip('Test02: Class Attribute', async({ page }) => {
        await page.getByRole('link', { name: 'Class Attribute' }).click();
        await page.locator('.btn-primary').click();
        const alert = await page.waitForEvent('dialog')
        page.locator('.btn-primary').click();
        await expect(alert.message()).toContain('Primary button pressed')
    })

    test.only('Test03: Hidden Layers', async({ page }) => {
        await page.getByRole('link', { name: 'Hidden Layers' }).click();
        const btn = await page.locator('#greenButton');
        await btn.click();
        try {
            await btn.click()
          } catch (e) {
            expect(e).toContain('locator.click: Target closed')
          }
        
    })
})