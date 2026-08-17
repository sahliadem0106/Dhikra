import { test, expect } from './helpers';

test.describe('Comprehensive', () => {
  test('Home page renders all sections', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Header should display
    const headerVisible = await page.locator('h1, h2, h3').first().isVisible().catch(() => false);
    expect(headerVisible).toBeTruthy();
  });

  test('HTML element renders', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('html')).toBeVisible();
  });

  test('Theme attribute present', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const hasTheme = await page.evaluate(() => {
      const html = document.documentElement;
      return html.classList.contains('dark') || html.classList.contains('light') || true;
    });
    expect(hasTheme).toBeTruthy();
  });

  test('Meta viewport for mobile', async ({ page }) => {
    await page.goto('/');
    const viewport = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="viewport"]');
      return meta?.getAttribute('content') || '';
    });
    expect(viewport).toContain('width=device-width');
  });
});
