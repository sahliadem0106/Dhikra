import { test, expect } from './helpers';

test.describe('Core Features', () => {
  test('App renders without crash', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
  });

  test('Header displays', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Header should contain prayer-related content
    await expect(page.locator('h2, h3, h1').first()).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('Bottom nav has tabs', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const buttons = page.locator('button');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });
});
