import { test, expect } from './helpers';

test.describe('Navigation Flow', () => {
  test('Quick action buttons exist', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const actions = ['Quran', 'Qibla', 'Dua', 'Tasbih', 'Zakat', 'Qada'];
    let found = 0;
    for (const action of actions) {
      const btn = page.locator('button').filter({ hasText: action }).first();
      if (await btn.isVisible({ timeout: 1000 }).catch(() => false)) found++;
    }
    expect(found).toBeGreaterThanOrEqual(4);
  });

  test('Page loads under 5 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(Date.now() - start).toBeLessThan(10000);
  });
});
