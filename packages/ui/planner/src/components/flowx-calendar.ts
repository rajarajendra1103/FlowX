import { defineFlowXElement, parseJsonIsland, commitPayload } from '../helper';

export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // YYYY-MM-DD
  end?: string;
  category?: string;
  color?: string;
}

export const FlowXCalendar = defineFlowXElement('flowx-calendar', {
  observedAttributes: ['view', 'current-date', 'fx-post', 'commit-url'],
  style: `
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--flowx-font-sans);
    }
    .calendar-container {
      background-color: var(--flowx-bg-surface, #ffffff);
      color: var(--flowx-color-text, #0f172a);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-lg, 16px);
      box-shadow: var(--flowx-shadow-md);
      overflow: hidden;
    }
    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--flowx-space-4, 16px);
      background-color: var(--flowx-bg-surface-raised, #ffffff);
      border-bottom: 1px solid var(--flowx-border-color, #e2e8f0);
    }
    .title {
      font-size: 1.1rem;
      font-weight: 700;
    }
    .view-selector button {
      padding: var(--flowx-space-2, 8px) var(--flowx-space-3, 12px);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      background: var(--flowx-bg-surface);
      color: var(--flowx-color-text);
      cursor: pointer;
      font-weight: 600;
      font-size: var(--flowx-font-size-sm, 12px);
    }
    .view-selector button:first-child { border-radius: var(--flowx-radius-md) 0 0 var(--flowx-radius-md); }
    .view-selector button:last-child { border-radius: 0 var(--flowx-radius-md) var(--flowx-radius-md) 0; }
    .view-selector button.active {
      background: var(--flowx-color-primary, #2563eb);
      color: var(--flowx-color-primary-text, #ffffff);
      border-color: var(--flowx-color-primary, #2563eb);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      width: 100%;
    }
    .day-header {
      padding: var(--flowx-space-2, 8px);
      text-align: center;
      font-weight: 700;
      font-size: var(--flowx-font-size-sm, 12px);
      background-color: var(--flowx-bg-hover, rgba(0,0,0,0.03));
      border-bottom: 1px solid var(--flowx-border-color, #e2e8f0);
    }
    .cell {
      min-height: 90px;
      padding: var(--flowx-space-2, 8px);
      border-right: 1px solid var(--flowx-border-color, #e2e8f0);
      border-bottom: 1px solid var(--flowx-border-color, #e2e8f0);
      background-color: var(--flowx-bg-surface, #ffffff);
      position: relative;
      outline: none;
    }
    .cell:nth-child(7n) { border-right: none; }
    .cell:focus-visible {
      box-shadow: inset 0 0 0 2px var(--flowx-color-primary, #2563eb);
      z-index: 2;
    }
    .date-num {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--flowx-color-text-muted);
      margin-bottom: var(--flowx-space-1, 4px);
    }
    .event-chip {
      padding: 3px 6px;
      margin-bottom: 4px;
      border-radius: var(--flowx-radius-sm, 4px);
      background-color: var(--flowx-color-primary, #2563eb);
      color: #ffffff;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      user-select: none;
    }
    .event-chip:hover {
      filter: brightness(1.1);
    }
    .create-modal {
      position: fixed;
      inset: 0;
      background: var(--flowx-color-overlay, rgba(0,0,0,0.5));
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal-content {
      background: var(--flowx-bg-surface-raised, #ffffff);
      color: var(--flowx-color-text, #0f172a);
      border-radius: var(--flowx-radius-lg);
      padding: var(--flowx-space-6, 24px);
      width: 320px;
      box-shadow: var(--flowx-shadow-lg);
    }
    .modal-content input {
      width: 100%;
      padding: 8px;
      margin: 8px 0 16px;
      border: 1px solid var(--flowx-border-color);
      border-radius: var(--flowx-radius-md);
      box-sizing: border-box;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `,
  template: (el) => {
    const view = el.getAttribute('view') || 'month';
    const currentDate = el._currentDate || new Date();
    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Generate 35 grid cells for month view
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const headersHtml = days.map((d) => `<div class="day-header">${d}</div>`).join('');

    const events: CalendarEvent[] = el._events || [];

    let cellsHtml = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();

    for (let i = 0; i < 35; i++) {
      const dayNum = i - firstDay + 1;
      const isValid = dayNum > 0 && dayNum <= 31;
      const dateStr = isValid
        ? `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
        : '';

      const dayEvents = isValid ? events.filter((ev) => ev.start === dateStr) : [];
      const eventsHtml = dayEvents
        .map(
          (ev) => `
        <div class="event-chip" data-id="${ev.id}" style="background-color: ${ev.color || 'var(--flowx-color-primary)'}">
          ${ev.title}
        </div>
      `,
        )
        .join('');

      cellsHtml += `
        <div 
          class="cell" 
          tabindex="${isValid ? '0' : '-1'}" 
          ${isValid ? `data-date="${dateStr}"` : ''} 
          aria-label="${isValid ? `Date ${dateStr}` : 'Empty cell'}"
        >
          <div class="date-num">${isValid ? dayNum : ''}</div>
          <div class="events-list">${eventsHtml}</div>
        </div>
      `;
    }

    return `
      <div class="calendar-container">
        <div class="toolbar">
          <button class="nav-prev" type="button" aria-label="Previous">&larr;</button>
          <div class="title">${monthName}</div>
          <div class="view-selector">
            <button class="view-btn ${view === 'month' ? 'active' : ''}" data-view="month" type="button">Month</button>
            <button class="view-btn ${view === 'week' ? 'active' : ''}" data-view="week" type="button">Week</button>
            <button class="view-btn ${view === 'day' ? 'active' : ''}" data-view="day" type="button">Day</button>
          </div>
          <button class="nav-next" type="button" aria-label="Next">&rarr;</button>
        </div>

        <div class="grid">
          ${headersHtml}
          ${cellsHtml}
        </div>
      </div>
    `;
  },
  setup: (el) => {
    // Parse JSON island
    el._events = parseJsonIsland<CalendarEvent[]>(el, [
      { id: 'ev-1', title: 'Sprint Review', start: '2026-07-28', color: '#2563eb' },
      { id: 'ev-2', title: 'Design System Audit', start: '2026-07-30', color: '#10b981' },
    ]);
    el._currentDate = new Date(2026, 6, 27);

    const root = el.shadowRoot || el;

    const renderEvents = () => {
      el.render();
      bindEvents();
    };

    const bindEvents = () => {
      const container = root.querySelector('.calendar-container');
      if (!container) return;

      // View selector & nav
      container.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('view-btn')) {
          const v = target.getAttribute('data-view');
          if (v) el.setAttribute('view', v);
        } else if (target.classList.contains('nav-prev')) {
          el._currentDate.setMonth(el._currentDate.getMonth() - 1);
          renderEvents();
        } else if (target.classList.contains('nav-next')) {
          el._currentDate.setMonth(el._currentDate.getMonth() + 1);
          renderEvents();
        } else if (target.classList.contains('cell')) {
          const dateStr = target.getAttribute('data-date');
          if (dateStr) openCreateModal(dateStr);
        }
      });

      // Pointer event drag-to-move events across cells
      let draggedEvId: string | null = null;
      container.addEventListener('pointerdown', (e: Event) => {
        const chip = (e.target as HTMLElement).closest('.event-chip');
        if (chip) {
          draggedEvId = chip.getAttribute('data-id');
          chip.setPointerCapture((e as PointerEvent).pointerId);
        }
      });

      container.addEventListener('pointerup', (e: Event) => {
        if (!draggedEvId) return;
        const pe = e as PointerEvent;
        const targetCell = document
          .elementFromPoint(pe.clientX, pe.clientY)
          ?.closest('.cell') as HTMLElement;
        if (targetCell) {
          const newDate = targetCell.getAttribute('data-date');
          if (newDate) {
            const ev = el._events.find((x: CalendarEvent) => x.id === draggedEvId);
            if (ev) {
              const oldStart = ev.start;
              ev.start = newDate;
              commitPayload(
                el,
                { eventId: ev.id, event: ev, oldStart, newStart: newDate },
                'event-move',
              );
              renderEvents();
            }
          }
        }
        draggedEvId = null;
      });

      // Keyboard accessibility navigation
      container.addEventListener('keydown', (e: Event) => {
        const ke = e as KeyboardEvent;
        const focusedCell = root.activeElement || (ke.target as HTMLElement).closest('.cell');
        if (!focusedCell || !focusedCell.classList.contains('cell')) return;

        const cells = Array.from(root.querySelectorAll('.cell')) as HTMLElement[];
        const idx = cells.indexOf(focusedCell as HTMLElement);
        if (idx === -1) return;

        if (ke.key === 'ArrowRight' && !ke.ctrlKey) {
          if (idx < cells.length - 1) cells[idx + 1].focus();
        } else if (ke.key === 'ArrowLeft' && !ke.ctrlKey) {
          if (idx > 0) cells[idx - 1].focus();
        } else if (ke.key === 'ArrowDown' && !ke.ctrlKey) {
          if (idx + 7 < cells.length) cells[idx + 7].focus();
        } else if (ke.key === 'ArrowUp' && !ke.ctrlKey) {
          if (idx - 7 >= 0) cells[idx - 7].focus();
        } else if (ke.key === 'Enter' || ke.key === ' ') {
          const dateStr = (focusedCell as HTMLElement).getAttribute('data-date');
          if (dateStr) openCreateModal(dateStr);
        }
      });
    };

    const openCreateModal = (dateStr: string) => {
      const modal = document.createElement('div');
      modal.className = 'create-modal';
      modal.innerHTML = `
        <div class="modal-content">
          <h3 style="margin: 0 0 12px;">Create Event (${dateStr})</h3>
          <input type="text" id="event-title-input" placeholder="Event Title..." autofocus />
          <div class="modal-actions">
            <button type="button" class="cancel-btn" style="padding: 6px 12px; border: 1px solid var(--flowx-border-color); background: var(--flowx-bg-surface); border-radius: 4px; cursor: pointer;">Cancel</button>
            <button type="button" class="save-btn" style="padding: 6px 12px; background: var(--flowx-color-primary); color: #fff; border: none; border-radius: 4px; cursor: pointer;">Save</button>
          </div>
        </div>
      `;

      root.appendChild(modal);

      const cancelBtn = modal.querySelector('.cancel-btn');
      const saveBtn = modal.querySelector('.save-btn');
      const input = modal.querySelector('#event-title-input') as HTMLInputElement;

      const close = () => modal.remove();

      cancelBtn?.addEventListener('click', close);
      saveBtn?.addEventListener('click', () => {
        const title = input.value.trim();
        if (title) {
          const newEv: CalendarEvent = {
            id: `ev-${Date.now()}`,
            title,
            start: dateStr,
            color: '#2563eb',
          };
          if (!el._events) el._events = [];
          el._events.push(newEv);
          commitPayload(el, { event: newEv }, 'event-create');
          close();
          renderEvents();
        }
      });
    };

    bindEvents();
  },
});
