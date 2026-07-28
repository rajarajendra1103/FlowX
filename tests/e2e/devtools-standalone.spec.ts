import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('FlowX Standalone DevTools E2E Tests', () => {
  test('should load static HTML fixture, toggle inspector, and log swap request', async ({
    page,
  }) => {
    // Load local HTML fixture file using file:// scheme
    const fixturePath = path.resolve(__dirname, 'fixtures/devtools-test.html');
    const fileUrl = `file:///${fixturePath.replace(/\\/g, '/')}`;

    await page.goto(fileUrl);

    // Verify launcher button is present and is initialized
    const launcher = page.locator('#flowx-devtools-launcher');
    await expect(launcher).toBeVisible();
    await expect(launcher).toHaveText('⚡');

    // Panel should exist in DOM but starts hidden
    const panel = page.locator('#flowx-devtools-root');
    await expect(panel).toBeHidden();

    // Click the launcher to open inspector panel
    await launcher.click();
    await expect(panel).toBeVisible();
    await expect(panel).toHaveClass(/active/);

    // Click trigger button to run AJAX request and swap
    const triggerBtn = page.locator('#test-btn');
    await triggerBtn.click();

    // Confirm that the DOM swap completed
    const responseBox = page.locator('#response-box');
    await expect(responseBox).toHaveText('Mocked Swapped Response Content');

    // Verify that the devtools captures and logs the request detail
    const logItem = panel.locator('.fx-dt-log-item');
    await expect(logItem).toBeVisible();

    // Check logged elements (GET verb, path URL, target, strategy)
    await expect(logItem.locator('.fx-dt-badge.get')).toHaveText('GET');
    await expect(logItem).toContainText('/mock-api-endpoint');
    await expect(logItem).toContainText('Target: #response-box (innerHTML)');
    await expect(logItem.locator('.fx-dt-status.success')).toHaveText('200 OK');

    // Minimize test
    const minimizeBtn = panel.locator('#fx-dt-minimize');
    await minimizeBtn.click();
    await expect(panel).toHaveClass(/minimized/);

    // Expand again
    await minimizeBtn.click();
    await expect(panel).not.toHaveClass(/minimized/);

    // Use Keyboard Shortcut (Alt+D) to close the panel
    await page.keyboard.press('Alt+KeyD');
    await expect(panel).toBeHidden();

    // Use Keyboard Shortcut (Alt+D) to open the panel again
    await page.keyboard.press('Alt+KeyD');
    await expect(panel).toBeVisible();
  });
});
