import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Testing Configuration
 * Chrome-only with mobile viewport emulation for Thai Master
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for mobile viewports (Chrome only) */
  projects: [
    {
      name: 'Mobile Chrome - Small (320px)',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 320, height: 568 },
      },
    },
    {
      name: 'Mobile Chrome - Medium (375px)',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 375, height: 667 },
      },
    },
    {
      name: 'Mobile Chrome - Large (428px)',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 428, height: 926 },
      },
    },
  ],

  /* Run dev server before starting tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
