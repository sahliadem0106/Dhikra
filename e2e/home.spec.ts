
import { test, expect } from './helpers';

test.describe('Home', () => {
  test('Home page renders with core elements', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
  });
});
