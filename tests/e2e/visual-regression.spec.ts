import { test, expect } from '@playwright/test';

test.describe('FlowX Visual Regression & Theme Verification', () => {
  test('renders components and layout primitives cleanly in light theme', async ({ page }) => {
    await page.goto('/theming');
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(300);

    // Verify background token computed color for light mode (#f8fafc)
    const bgBase = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--flowx-bg-base').trim();
    });
    expect(bgBase).toBe('#f8fafc');

    // Verify key light theme tokens are applied correctly
    const tokens = await page.evaluate(() => {
      const s = getComputedStyle(document.documentElement);
      return {
        bgSurface: s.getPropertyValue('--flowx-bg-surface').trim(),
        colorPrimary: s.getPropertyValue('--flowx-color-primary').trim(),
        colorText: s.getPropertyValue('--flowx-color-text').trim(),
        borderColor: s.getPropertyValue('--flowx-border-color').trim(),
      };
    });
    expect(tokens.bgSurface).toBe('#ffffff');
    expect(tokens.colorPrimary).toBe('#2563eb');
    expect(tokens.colorText).toBe('#0f172a');
    expect(tokens.borderColor).toBe('#e2e8f0');

    // Verify page renders visible content
    await expect(page.getByRole('heading', { name: 'Theming System & Layout' })).toBeVisible();
    await expect(page.locator('.demo-theme-bar')).toBeVisible();
  });

  test('renders components and layout primitives cleanly in dark theme', async ({ page }) => {
    await page.goto('/theming');
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(300);

    // Verify background token computed color for dark mode (#0a0a0a)
    const bgBase = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--flowx-bg-base').trim();
    });
    expect(bgBase).toBe('#0a0a0a');

    // Verify key dark theme tokens are applied correctly
    const tokens = await page.evaluate(() => {
      const s = getComputedStyle(document.documentElement);
      return {
        bgSurface: s.getPropertyValue('--flowx-bg-surface').trim(),
        colorPrimary: s.getPropertyValue('--flowx-color-primary').trim(),
        colorText: s.getPropertyValue('--flowx-color-text').trim(),
        borderColor: s.getPropertyValue('--flowx-border-color').trim(),
      };
    });
    expect(tokens.bgSurface).toBe('#171717');
    expect(tokens.colorPrimary).toBe('#3b82f6');
    expect(tokens.colorText).toBe('#f8fafc');
    expect(tokens.borderColor).toBe('#262626');

    // Verify page renders visible content
    await expect(page.getByRole('heading', { name: 'Theming System & Layout' })).toBeVisible();
    await expect(page.locator('.demo-theme-bar')).toBeVisible();
  });

  test('renders components cleanly in custom emerald brand theme', async ({ page }) => {
    await page.goto('/theming');
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'emerald');
    });
    await page.waitForTimeout(300);

    // Verify background token computed color for emerald theme (#064e3b)
    const bgBase = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--flowx-bg-base').trim();
    });
    expect(bgBase).toBe('#064e3b');

    // Verify key emerald theme tokens are applied correctly
    const tokens = await page.evaluate(() => {
      const s = getComputedStyle(document.documentElement);
      return {
        bgSurface: s.getPropertyValue('--flowx-bg-surface').trim(),
        colorPrimary: s.getPropertyValue('--flowx-color-primary').trim(),
        colorText: s.getPropertyValue('--flowx-color-text').trim(),
        borderColor: s.getPropertyValue('--flowx-border-color').trim(),
      };
    });
    expect(tokens.bgSurface).toBe('#047857');
    expect(tokens.colorPrimary).toBe('#10b981');
    expect(tokens.colorText).toBe('#ecfdf5');
    expect(tokens.borderColor).toBe('#059669');

    // Verify page renders visible content
    await expect(page.getByRole('heading', { name: 'Theming System & Layout' })).toBeVisible();
    await expect(page.locator('.demo-theme-bar')).toBeVisible();
  });
});
