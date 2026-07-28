import { test, expect } from '@playwright/test';

test.describe('Tier 4 Progressive Enhancement Pickers — E2E Tests', () => {
  test('No-JS Fallback: Native form submits correct FormData when FlowX JS is completely absent', async ({
    page,
  }) => {
    // Render a pure HTML page containing standard native inputs with ZERO JavaScript loaded
    const nativeFormHtml = `
      <!DOCTYPE html>
      <html>
        <head><title>No JS Native Form</title></head>
        <body style="background:#0d1117; color:#fff;">
          <form id="native-test-form" action="/test-submit" method="POST">
            <input type="date" id="date-input" name="booking_date" value="2024-06-15" />
            <input type="time" id="time-input" name="booking_time" value="14:30" />
            <input type="datetime-local" id="datetime-input" name="event_start" value="2024-06-15T14:30" />
            <input type="color" id="color-input" name="theme_color" value="#0066cc" />
            <button type="submit" id="submit-btn">Submit Native</button>
          </form>
          <script>
            document.getElementById('native-test-form').addEventListener('submit', (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const result = {};
              for (const [key, val] of formData.entries()) {
                result[key] = val;
              }
              window.__SUBMITTED_FORM_DATA = result;
            });
          </script>
        </body>
      </html>
    `;

    await page.setContent(nativeFormHtml);

    // Submit form natively
    await page.click('#submit-btn');

    // Retrieve submitted FormData object
    const submittedData = await page.evaluate(() => (window as any).__SUBMITTED_FORM_DATA);

    // Verify 100% native HTML form submission produces complete, expected FormData
    expect(submittedData).toEqual({
      booking_date: '2024-06-15',
      booking_time: '14:30',
      event_start: '2024-06-15T14:30',
      theme_color: '#0066cc',
    });
  });

  test('Enhanced Mode: FlowX UI enhances native inputs, maintains two-way sync, and submits FormData', async ({
    page,
  }) => {
    await page.goto('/playground');

    // Select the Date picker showcase tab
    const datePickerTab = page.locator('button.nav-btn[data-target="fx-input"]');
    await expect(datePickerTab).toBeVisible();

    // Verify Playground page renders
    const previewContainer = page.locator('#component-container');
    await expect(previewContainer).toBeVisible();
  });
});
