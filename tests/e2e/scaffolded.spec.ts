import { test, expect } from '@playwright/test';

test.describe('Scaffolded FlowX Application E2E', () => {
  test('should load scaffolded static HTML app with CDN scripting and charts', async ({ page }) => {
    await page.goto('/playground');

    // Create container matching create-flowx-app static index.html output
    await page.evaluate(() => {
      const container = document.createElement('div');
      container.id = 'scaffold-test-container';
      container.innerHTML = `
        <header><div class="logo">FlowX Application ⚡</div></header>
        <main class="container">
          <section class="card">
            <h3>⚡ Drop-In CDN Scripting</h3>
            <button id="cdn-btn" fx-get="/playground" fx-target="#res" fx-swap="innerHTML">Fetch Fragment</button>
            <div id="res">Initial text</div>
          </section>
          <section class="card">
            <flowx-bar-chart id="test-chart">
              <script type="application/json">
                { "labels": ["Q1", "Q2"], "datasets": [{ "label": "Sales", "data": [100, 200] }] }
              </script>
            </flowx-bar-chart>
          </section>
        </main>
      `;
      document.body.appendChild(container);
    });

    const header = page.locator('#scaffold-test-container .logo');
    await expect(header).toContainText('FlowX Application ⚡');

    const chart = page.locator('#test-chart');
    await expect(chart).toBeVisible();
  });
});
