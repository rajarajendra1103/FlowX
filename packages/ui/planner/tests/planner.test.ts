import { describe, it, expect, beforeEach } from 'vitest';
import '../src/components/flowx-calendar';
import '../src/components/flowx-scheduler';
import '../src/components/flowx-timeline';
import '../src/components/flowx-gantt-chart';
import '../src/components/flowx-kanban';
import '../src/components/flowx-notes';
import '../src/components/flowx-whiteboard';

describe('Tier 12 Planner Widgets (@flowx/ui-planner)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('<flowx-calendar> reads events from JSON island and handles view switches', () => {
    const calendar = document.createElement('flowx-calendar');
    calendar.innerHTML = `
      <script type="application/json">
        [
          { "id": "test-1", "title": "Test Meeting", "start": "2026-07-28" }
        ]
      </script>
    `;
    document.body.appendChild(calendar);

    expect(calendar.shadowRoot).not.toBeNull();
    const title = calendar.shadowRoot!.querySelector('.title')?.textContent;
    expect(title).toContain('2026');

    document.body.removeChild(calendar);
  });

  it('<flowx-scheduler> renders resources and slots grid', () => {
    const scheduler = document.createElement('flowx-scheduler');
    scheduler.setAttribute('slots-count', '6');
    document.body.appendChild(scheduler);

    const headers = scheduler.shadowRoot!.querySelectorAll('th');
    expect(headers.length).toBe(7); // 1 Resource col + 6 slot cols

    document.body.removeChild(scheduler);
  });

  it('<flowx-data-timeline> responds to zoom controls', () => {
    const timeline = document.createElement('flowx-data-timeline');
    document.body.appendChild(timeline);

    const zoomInBtn = timeline.shadowRoot!.querySelector('.zoom-in') as HTMLButtonElement;
    expect(zoomInBtn).not.toBeNull();

    zoomInBtn.click();
    const trackLine = timeline.shadowRoot!.querySelector('.track-line') as HTMLElement;
    expect(trackLine.style.width).toContain('%');

    document.body.removeChild(timeline);
  });

  it('<flowx-gantt-chart> renders SVG dependency connector lines', () => {
    const gantt = document.createElement('flowx-gantt-chart');
    document.body.appendChild(gantt);

    const svg = gantt.shadowRoot!.querySelector('.svg-overlay');
    expect(svg).not.toBeNull();
    const path = svg?.querySelector('path');
    expect(path).not.toBeNull();

    document.body.removeChild(gantt);
  });

  it('<flowx-kanban> supports keyboard-only reordering and fires fx-commit payload on drop', async () => {
    const kanban = document.createElement('flowx-kanban');
    kanban.setAttribute('commit-url', '/api/cards/move');
    document.body.appendChild(kanban);

    let committedDetail: any = null;
    kanban.addEventListener('fx-commit', (e: any) => {
      committedDetail = e.detail;
    });

    // 1. Pick up card with Space key
    let cardWrapper = kanban.shadowRoot!.querySelector('.kanban-card-wrapper') as HTMLElement;
    expect(cardWrapper).not.toBeNull();
    cardWrapper.dispatchEvent(
      new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true }),
    );

    // 2. Query re-rendered picked-up card
    let pickedCard = kanban.shadowRoot!.querySelector(
      '.kanban-card-wrapper.picked-up',
    ) as HTMLElement;
    expect(pickedCard).not.toBeNull();

    // 3. Move right to next column with ArrowRight key
    pickedCard.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }),
    );

    // 4. Query re-rendered card and drop with Enter key
    pickedCard = kanban.shadowRoot!.querySelector('.kanban-card-wrapper.picked-up') as HTMLElement;
    expect(pickedCard).not.toBeNull();
    pickedCard.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }),
    );

    // 5. Verify fx-commit detail payload
    expect(committedDetail).not.toBeNull();
    expect(committedDetail.endpoint).toBe('/api/cards/move');
    expect(committedDetail.payload).toHaveProperty('cardId');
    expect(committedDetail.payload).toHaveProperty('fromColumn');
    expect(committedDetail.payload).toHaveProperty('toColumn');

    document.body.removeChild(kanban);
  });

  it('<flowx-notes> renders contenteditable blocks and triggers autosave', async () => {
    const notes = document.createElement('flowx-notes');
    document.body.appendChild(notes);

    const block = notes.shadowRoot!.querySelector('.note-block') as HTMLElement;
    expect(block).not.toBeNull();

    let committedDetail: any = null;
    notes.addEventListener('fx-commit', (e: any) => {
      committedDetail = e.detail;
    });

    block.textContent = 'Updated Heading';
    block.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

    // Wait for debounced autosave (800ms)
    await new Promise((resolve) => setTimeout(resolve, 900));

    expect(committedDetail).not.toBeNull();
    expect(committedDetail.action).toBe('notes-autosave');

    document.body.removeChild(notes);
  });

  it('<flowx-whiteboard> renders canvas and sticky notes layer', () => {
    const wb = document.createElement('flowx-whiteboard');
    document.body.appendChild(wb);

    const canvas = wb.shadowRoot!.querySelector('canvas');
    const stickyNote = wb.shadowRoot!.querySelector('.sticky-note');

    expect(canvas).not.toBeNull();
    expect(stickyNote).not.toBeNull();

    document.body.removeChild(wb);
  });
});
