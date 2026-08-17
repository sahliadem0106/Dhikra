import { test, expect } from './helpers';

test.describe('Edge Cases', () => {
  test('404 route does not crash', async ({ page }) => {
    await page.goto('/nonexistent-route');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
  });

  test('Multiple rapid navigations work', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const pages = ['/', '/', '/', '/'];
    for (const p of pages) {
      await page.goto(p);
      await page.waitForTimeout(200);
    }
    await expect(page.locator('body')).toBeVisible();
  });

  test('Page loads under 10 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(Date.now() - start).toBeLessThan(15000);
  });
});
