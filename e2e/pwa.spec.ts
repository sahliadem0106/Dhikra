
import { test, expect } from '@playwright/test';

test.describe('PWA', () => {
  test('Manifest is served', async ({ request }) => {
    const resp = await request.get('/manifest.webmanifest');
    expect(resp.ok()).toBeTruthy();
    const json = await resp.json();
    expect(json.name).toBeTruthy();
  });
  test('Service worker exists', async ({ request }) => {
    const resp = await request.get('/sw.js');
    expect(resp.ok()).toBeTruthy();
  });
});
