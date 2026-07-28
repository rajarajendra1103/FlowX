import { test, expect } from '@playwright/test';

test.describe('Tier 8 @flowx/charts — E2E Live Dashboard Tests', () => {
  test('(a) chart renders from JSON data island block', async ({ page }) => {
    await page.goto('/playground');

    await page.evaluate(() => {
      const chart = document.createElement('flowx-bar-chart');
      chart.id = 'e2e-chart';
      chart.innerHTML = `
        <script type="application/json">
          { "labels": ["A", "B", "C"], "datasets": [{ "data": [50, 100, 150] }] }
        </script>
      `;
      document.body.appendChild(chart);
    });

    const chart = page.locator('#e2e-chart');
    await expect(chart).toHaveAttribute('role', 'img');
  });

  test('(b) KPI card updates live via SSE event message dispatch', async ({ page }) => {
    await page.goto('/playground');

    await page.evaluate(() => {
      const kpi = document.createElement('flowx-kpi-card');
      kpi.id = 'live-kpi';
      kpi.setAttribute('fx-sse-connect', '');
      kpi.setAttribute('label', 'Live Streams');
      kpi.innerHTML = `
        <script type="application/json">
          { "value": 500, "change": 2.1 }
        </script>
      `;
      document.body.appendChild(kpi);
    });

    const kpi = page.locator('#live-kpi');
    await expect(kpi).toBeVisible();

    // Trigger mock SSE message dispatch in page
    await page.evaluate(() => {
      document.dispatchEvent(
        new CustomEvent('fx:sse-message', {
          detail: { target: '#live-kpi', data: JSON.stringify({ value: 14200, change: 28.4 }) },
        }),
      );
    });

    // Check updated value in shadow root
    const valText = await page.evaluate(() => {
      const el = document.querySelector('#live-kpi');
      return el?.shadowRoot?.querySelector('.value')?.textContent;
    });
    expect(valText).toBe('14,200');
  });
});
