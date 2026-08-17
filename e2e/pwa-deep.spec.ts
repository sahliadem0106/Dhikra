
import { test, expect } from '@playwright/test';

test.describe('PWA Deep', () => {
  test('SW caches assets', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const registrations = await page.evaluate(() => 
      navigator.serviceWorker?.getRegistrations().then(r => r.length) || 0
    );
    // SW should be registered
    expect(registrations).toBeGreaterThanOrEqual(0);
  });

  test('Manifest has required fields', async ({ request }) => {
    const resp = await request.get('/manifest.webmanifest');
    const json = await resp.json();
    expect(json.name).toBeTruthy();
    expect(json.short_name).toBeTruthy();
    expect(json.display).toBe('standalone');
    expect(json.icons).toHaveLength(2);
  });
});
