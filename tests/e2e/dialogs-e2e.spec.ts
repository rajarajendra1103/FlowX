import { test, expect } from '@playwright/test';

test.describe('Tier 6 Native <dialog>-Based Overlays — E2E Tests', () => {
  test('(a) fx-get + fx-dialog-target fetches server HTML fragment, swaps into modal, and opens modal', async ({
    page,
  }) => {
    await page.goto('/playground');

    // Route mock server endpoint
    await page.route('/api/modal-form', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<form id="fetched-form"><h4>Server Form Header</h4><input name="field1" value="Server Data" /><button type="submit">Save</button></form>',
      });
    });

    // Inject trigger and modal into playground page container
    await page.evaluate(() => {
      const container = document.createElement('div');
      container.innerHTML = `
        <button id="open-btn" fx-get="/api/modal-form" fx-dialog-target="#server-modal">Fetch & Open Modal</button>
        <flowx-modal id="server-modal" title="Server Dialog">
          <div slot="body" id="modal-body-content">Initial placeholder</div>
        </flowx-modal>
      `;
      document.body.appendChild(container);
    });

    // Click trigger button
    await page.click('#open-btn');

    // Verify modal opens
    const modal = page.locator('#server-modal');
    await expect(modal).toHaveAttribute('open', '');

    // Verify content was fetched and swapped into modal body
    const modalBody = page.locator('#modal-body-content');
    await expect(modalBody).toContainText('Server Form Header');
  });

  test('(b) Escape key closes open modal and restores focus to trigger element', async ({
    page,
  }) => {
    await page.goto('/playground');

    await page.evaluate(() => {
      const container = document.createElement('div');
      container.innerHTML = `
        <button id="trigger-btn" fx-dialog-target="#esc-modal">Open Modal</button>
        <flowx-modal id="esc-modal" title="Escape Test">
          <div slot="body"><button id="inside-btn">Inside</button></div>
        </flowx-modal>
      `;
      document.body.appendChild(container);
    });

    // Click to open modal
    await page.click('#trigger-btn');
    const modal = page.locator('#esc-modal');
    await expect(modal).toHaveAttribute('open', '');

    // Press Escape
    await page.keyboard.press('Escape');

    // Verify modal closes
    await expect(modal).not.toHaveAttribute('open', '');
  });

  test('(c) confirm-dialog fx-confirm event gates a paired fx-delete request', async ({ page }) => {
    await page.goto('/playground');

    let deleteFired = false;
    await page.route('/api/items/42', (route) => {
      if (route.request().method() === 'DELETE') {
        deleteFired = true;
        route.fulfill({ status: 200, body: 'Deleted' });
      }
    });

    await page.evaluate(() => {
      const container = document.createElement('div');
      container.innerHTML = `
        <div id="item-42">
          <span>Item #42</span>
          <button id="delete-btn" fx-confirm-target="#confirm-delete" fx-delete="/api/items/42" fx-target="#item-42">Delete Item</button>
        </div>
        <flowx-confirm-dialog id="confirm-delete" title="Confirm Delete" message="Are you sure you want to delete Item #42?"></flowx-confirm-dialog>
      `;
      document.body.appendChild(container);
    });

    // 1. Click delete button
    await page.click('#delete-btn');

    // 2. Verify DELETE request has NOT fired yet (gated by confirm dialog)
    expect(deleteFired).toBe(false);

    // 3. Confirm modal appears
    const confirmModal = page.locator('#confirm-delete');
    await expect(confirmModal).toHaveAttribute('open', '');

    // 4. Click confirm button inside shadow DOM
    await page.evaluate(() => {
      const dlg = document.querySelector('#confirm-delete') as any;
      const confirmBtn = dlg.shadowRoot.querySelector('#btn-confirm');
      confirmBtn.click();
    });

    // 5. Verify DELETE request fired after confirmation
    await page.waitForTimeout(150);
    expect(deleteFired).toBe(true);
  });
});
