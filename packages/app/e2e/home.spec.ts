import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display app title and description', async ({ page }) => {
    await page.goto('/');

    // Check for main heading
    await expect(page.getByRole('heading', { name: 'Thai Master' })).toBeVisible();

    // Check for description
    await expect(page.getByText('Script-first Thai language learning')).toBeVisible();
  });

  test('should display Fuse library version', async ({ page }) => {
    await page.goto('/');

    // Check that workspace dependency is working
    await expect(page.getByText(/Fuse Library v0\.1\.0/)).toBeVisible();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.goto('/');

    // Get viewport size
    const viewport = page.viewportSize();
    expect(viewport).toBeTruthy();

    // Verify it's within our target mobile range (320px-428px)
    if (viewport) {
      expect(viewport.width).toBeGreaterThanOrEqual(320);
      expect(viewport.width).toBeLessThanOrEqual(428);
    }

    // Check that content is visible (not overflowing)
    const heading = page.getByRole('heading', { name: 'Thai Master' });
    await expect(heading).toBeVisible();
  });

  test('should not have console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Check for console errors
    expect(consoleErrors).toHaveLength(0);
  });
});
