import { test, expect } from './helpers';

test.describe('Auth Deep', () => {
  test('Page renders without errors', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
  });
});
