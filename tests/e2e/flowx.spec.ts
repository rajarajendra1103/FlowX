import { test, expect } from '@playwright/test';

test.describe('FlowX Astro Documentation Site E2E', () => {
  test('should load the homepage and verify the description is under 200 words', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Welcome to FlowX | FlowX Docs/);

    const aboutTextLoc = page.locator('#about-text');
    await expect(aboutTextLoc).toBeVisible();

    const textContent = await aboutTextLoc.innerText();
    const wordCount = textContent.trim().split(/\s+/).length;

    // Assert explanation is under 200 words
    expect(wordCount).toBeLessThan(200);
    expect(wordCount).toBeGreaterThan(50);
  });

  test('should load the getting-started guide instructions', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h2:has-text("Getting Started")')).toBeVisible();
    await expect(page.locator('code:has-text("npm install @flowx/core")')).toBeVisible();
  });

  test('should parse and render TSDoc API reference blocks dynamically', async ({ page }) => {
    await page.goto('/api-reference');
    await expect(page).toHaveTitle(/API Reference | FlowX Docs/);

    // Verify main structures are present
    const apiGrid = page.locator('.api-grid');
    await expect(apiGrid).toBeVisible();

    await expect(apiGrid.locator('.api-name', { hasText: /^FlowX$/ })).toBeVisible();
    await expect(apiGrid.locator('.api-name', { hasText: /^FlowXEventDetail$/ })).toBeVisible();
    await expect(apiGrid.locator('.api-name', { hasText: /^FlowXExtension$/ })).toBeVisible();

    // Verify TSDoc descriptions are parsed
    await expect(apiGrid.locator('text=Main FlowX framework API object.')).toBeVisible();
    await expect(
      apiGrid.locator('text=Context detail payload dispatched with FlowX lifecycle events.'),
    ).toBeVisible();
  });

  test('should display the CodeMirror playground and sync frame previews', async ({ page }) => {
    await page.goto('/playground');
    await expect(page).toHaveTitle(/Interactive Playground | FlowX Docs/);

    // Verify CodeMirror editor is loaded
    const editor = page.locator('.CodeMirror');
    await expect(editor).toBeVisible();

    // Verify preview iframe is loaded
    const iframe = page.locator('#preview-iframe');
    await expect(iframe).toBeVisible();
  });

  test('should display the framework comparison page and comparison table component', async ({
    page,
  }) => {
    await page.goto('/comparison');
    await expect(page).toHaveTitle(/Framework Comparison | FlowX Docs/);

    const table = page.locator('.comparison-table');
    await expect(table).toBeVisible();

    // Verify column headers
    await expect(table.locator('th:has-text("Library")')).toBeVisible();
    await expect(table.locator('th:has-text("Bundle Size")')).toBeVisible();
    await expect(table.locator('th:has-text("Dependencies")')).toBeVisible();
    await expect(table.locator('th:has-text("Key Features")')).toBeVisible();

    // Verify library rows
    await expect(table.locator('.lib-name:has-text("FlowX")')).toBeVisible();
    await expect(table.locator('.lib-name:has-text("HTMX")')).toBeVisible();
    await expect(table.locator('.lib-name:has-text("Alpine.js")')).toBeVisible();
    await expect(table.locator('.lib-name:has-text("Unpoly")')).toBeVisible();
  });
});
