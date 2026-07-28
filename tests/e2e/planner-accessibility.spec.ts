import { test, expect } from '@playwright/test';

test.describe('Tier 12 Planner Keyboard Accessibility & Reordering', () => {
  test('supports keyboard-only card reordering in Kanban board (Space pick up, Arrow keys move, Enter drop)', async ({
    page,
  }) => {
    await page.goto('/planner');
    await page.waitForSelector('flowx-kanban');

    // 1. Tab to focus first card inside Kanban shadow DOM
    const kanban = page.locator('flowx-kanban');
    await expect(kanban).toBeVisible();

    // Perform keyboard interaction via page.evaluate inside shadow root
    const result = await page.evaluate(async () => {
      const el = document.querySelector('flowx-kanban') as HTMLElement;
      if (!el || !el.shadowRoot) return null;

      let committedPayload: any = null;
      el.addEventListener('fx-commit', (e: any) => {
        committedPayload = e.detail;
      });

      const firstCard = el.shadowRoot.querySelector('.kanban-card-wrapper') as HTMLElement;
      if (!firstCard) return null;

      // 1. Pick up card with Space key
      firstCard.dispatchEvent(
        new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }),
      );
      const pickedUp = el.shadowRoot.querySelector('.kanban-card-wrapper.picked-up') !== null;

      // 2. Move right to next column
      const pickedEl = el.shadowRoot.querySelector('.kanban-card-wrapper.picked-up') as HTMLElement;
      if (pickedEl) {
        pickedEl.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }),
        );
      }

      // 3. Drop card with Enter key
      const activeEl = el.shadowRoot.querySelector('.kanban-card-wrapper.picked-up') as HTMLElement;
      if (activeEl) {
        activeEl.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }),
        );
      }

      return { pickedUp, committedPayload };
    });

    expect(result).not.toBeNull();
    expect(result?.pickedUp).toBe(true);
    expect(result?.committedPayload).not.toBeNull();
    expect(result?.committedPayload.action).toBe('card-move');
  });

  test('supports keyboard event creation in Calendar (Arrow key cell focus + Enter modal creation)', async ({
    page,
  }) => {
    await page.goto('/planner');
    await page.waitForSelector('flowx-calendar');

    const calendar = page.locator('flowx-calendar');
    await expect(calendar).toBeVisible();

    const createdEventTitle = await page.evaluate(async () => {
      const el = document.querySelector('flowx-calendar') as HTMLElement;
      if (!el || !el.shadowRoot) return null;

      let createdEv: any = null;
      el.addEventListener('fx-commit', (e: any) => {
        if (e.detail.action === 'event-create') {
          createdEv = e.detail.payload.event;
        }
      });

      const cell = el.shadowRoot.querySelector('.cell[data-date]') as HTMLElement;
      if (!cell) return null;

      // Focus cell and press Enter to trigger event creation modal
      cell.focus();
      cell.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }),
      );

      // Fill in title and click save
      const input = el.shadowRoot.querySelector('#event-title-input') as HTMLInputElement;
      const saveBtn = el.shadowRoot.querySelector('.save-btn') as HTMLButtonElement;

      if (input && saveBtn) {
        input.value = 'Keyboard Accessibility Sprint Demo';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        saveBtn.click();
      }

      return createdEv ? createdEv.title : null;
    });

    expect(createdEventTitle).toBe('Keyboard Accessibility Sprint Demo');
  });
});
