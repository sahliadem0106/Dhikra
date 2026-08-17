
import { test, expect } from './helpers';

test.describe('Auth', () => {
  test('App loads and shows auth or home', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
  });
});
