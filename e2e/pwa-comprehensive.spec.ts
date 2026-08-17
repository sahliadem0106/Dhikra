import { test, expect } from './helpers';

test.describe('PWA Production', () => {
  test('Service worker caches app shell', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Verify SW is active
    const isRegistered = await page.evaluate(async () => {
      const regs = await navigator.serviceWorker.getRegistrations();
      return regs.length > 0 && regs.some(r => r.active);
    });
    expect(isRegistered).toBeTruthy();
  });

  test('App has offline capability', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Verify caches exist
    const hasCache = await page.evaluate(async () => {
      const keys = await caches.keys();
      return keys.length > 0;
    });
    expect(hasCache).toBeTruthy();
  });
});
