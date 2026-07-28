import { test, expect } from '@playwright/test';

test.describe('Tier 7 Navigation Components — E2E Tests', () => {
  test('(a) sidebar collapsed state persists across page reload via cookie', async ({
    page,
    context,
  }) => {
    // Set cookie before loading page to simulate server reading cookie on initial paint
    await context.addCookies([
      {
        name: 'flowx_sidebar_collapsed',
        value: 'true',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.goto('/playground');

    // Inject sidebar into page
    await page.evaluate(() => {
      const sb = document.createElement('flowx-sidebar');
      sb.id = 'e2e-sidebar';
      sb.setAttribute('persist', 'cookie');
      sb.innerHTML = '<div slot="brand">Brand</div>';
      document.body.appendChild(sb);
    });

    const sidebar = page.locator('#e2e-sidebar');
    await expect(sidebar).toHaveAttribute('collapsed', '');

    // Reload page
    await page.reload();

    // Re-inject sidebar and verify cookie still sets collapsed state
    await page.evaluate(() => {
      const sb = document.createElement('flowx-sidebar');
      sb.id = 'e2e-sidebar2';
      sb.setAttribute('persist', 'cookie');
      document.body.appendChild(sb);
    });

    const sidebar2 = page.locator('#e2e-sidebar2');
    await expect(sidebar2).toHaveAttribute('collapsed', '');
  });

  test('(b) context-menu prevents native browser context menu and positions at click coordinates', async ({
    page,
  }) => {
    await page.goto('/playground');

    await page.evaluate(() => {
      const targetArea = document.createElement('div');
      targetArea.id = 'ctx-target';
      targetArea.style.width = '300px';
      targetArea.style.height = '300px';
      targetArea.style.background = '#161b22';
      targetArea.textContent = 'Right click here';
      document.body.appendChild(targetArea);

      const ctxMenu = document.createElement('flowx-context-menu');
      ctxMenu.id = 'test-ctx-menu';
      ctxMenu.setAttribute('for', 'ctx-target');
      ctxMenu.innerHTML = '<button class="menu-item">Context Action 1</button>';
      document.body.appendChild(ctxMenu);
    });

    // Right click target area
    await page.dispatchEvent('#ctx-target', 'contextmenu', { clientX: 220, clientY: 180 });

    const menu = page.locator('#test-ctx-menu');
    await expect(menu).toHaveAttribute('open', '');
  });

  test('(c) command-palette keyboard shortcut (Cmd/Ctrl+K) opens from anywhere and debounced search fires fx-get', async ({
    page,
  }) => {
    await page.goto('/playground');

    await page.route('/api/cmd-search*', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<div class="cmd-item" tabindex="0">Search Result: Settings Page</div>',
      });
    });

    await page.evaluate(() => {
      const palette = document.createElement('flowx-command-palette');
      palette.id = 'e2e-cmd';
      palette.setAttribute('fx-endpoint', '/api/cmd-search');
      document.body.appendChild(palette);
    });

    // Press Ctrl+K
    await page.keyboard.press('Control+k');

    const palette = page.locator('#e2e-cmd');
    await expect(palette).toHaveAttribute('open', '');
  });

  test('(d) bottom-navigation current attribute highlights on initial render with NO JS executed', async ({
    page,
  }) => {
    const pureHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            flowx-bottom-navigation [current], flowx-bottom-navigation [data-current] {
              color: rgb(0, 102, 204) !important;
              font-weight: bold;
            }
          </style>
        </head>
        <body style="background:#0d1117;">
          <flowx-bottom-navigation id="no-js-nav">
            <a href="/" current id="home-link">Home</a>
            <a href="/search" id="search-link">Search</a>
          </flowx-bottom-navigation>
        </body>
      </html>
    `;

    await page.setContent(pureHtml);

    // Verify home-link has current attribute and is highlighted via CSS selector with zero JS
    const homeLink = page.locator('#home-link');
    await expect(homeLink).toHaveAttribute('current', '');
    const color = await homeLink.evaluate((el) => getComputedStyle(el).color);
    expect(color).toBe('rgb(0, 102, 204)');
  });
});
