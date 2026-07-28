import { defineFlowXElement, parseJsonIsland, commitPayload } from '../helper';

export interface Resource {
  id: string;
  name: string;
  role?: string;
}

export interface Allocation {
  id: string;
  resourceId: string;
  slot: number; // 0..7 representing time slots (e.g. 9 AM .. 4 PM)
  title: string;
  color?: string;
}

export const FlowXScheduler = defineFlowXElement('flowx-scheduler', {
  observedAttributes: ['slots-count', 'fx-post', 'commit-url'],
  style: `
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--flowx-font-sans);
    }
    .scheduler-container {
      background-color: var(--flowx-bg-surface, #ffffff);
      color: var(--flowx-color-text, #0f172a);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-lg, 16px);
      box-shadow: var(--flowx-shadow-md);
      overflow-x: auto;
    }
    .grid-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 600px;
    }
    .grid-table th, .grid-table td {
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      padding: var(--flowx-space-2, 8px);
    }
    .grid-table th {
      background: var(--flowx-bg-hover, rgba(0,0,0,0.03));
      font-size: var(--flowx-font-size-sm, 12px);
      font-weight: 700;
      text-align: center;
    }
    .resource-cell {
      width: 160px;
      font-weight: 600;
      background: var(--flowx-bg-surface-raised);
    }
    .slot-cell {
      height: 60px;
      position: relative;
      background: var(--flowx-bg-surface);
    }
    .slot-cell:focus-visible {
      outline: 2px solid var(--flowx-color-primary, #2563eb);
    }
    .allocation-badge {
      padding: 4px 8px;
      border-radius: var(--flowx-radius-sm, 4px);
      background: var(--flowx-color-primary, #2563eb);
      color: #ffffff;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      user-select: none;
    }
  `,
  template: (el) => {
    const slotsCount = parseInt(el.getAttribute('slots-count') || '8', 10);
    const resources: Resource[] = el._resources || [];
    const allocations: Allocation[] = el._allocations || [];

    const slotHeaders = Array.from({ length: slotsCount }, (_, i) => `<th>${9 + i}:00</th>`).join(
      '',
    );

    const rowsHtml = resources
      .map((res) => {
        const slotsHtml = Array.from({ length: slotsCount }, (_, sIdx) => {
          const alloc = allocations.find((a) => a.resourceId === res.id && a.slot === sIdx);
          const allocHtml = alloc
            ? `
          <div class="allocation-badge" data-id="${alloc.id}" style="background-color: ${alloc.color || 'var(--flowx-color-primary)'}">
            ${alloc.title}
          </div>
        `
            : '';

          return `
          <td class="slot-cell" tabindex="0" data-resource-id="${res.id}" data-slot="${sIdx}">
            ${allocHtml}
          </td>
        `;
        }).join('');

        return `
        <tr>
          <td class="resource-cell">${res.name}</td>
          ${slotsHtml}
        </tr>
      `;
      })
      .join('');

    return `
      <div class="scheduler-container">
        <table class="grid-table">
          <thead>
            <tr>
              <th style="width: 160px;">Resource</th>
              ${slotHeaders}
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  },
  setup: (el) => {
    const initialData = parseJsonIsland<{ resources: Resource[]; allocations: Allocation[] }>(el, {
      resources: [
        { id: 'res-1', name: 'Alice Smith', role: 'Developer' },
        { id: 'res-2', name: 'Bob Jones', role: 'Designer' },
        { id: 'res-3', name: 'Carol Danvers', role: 'DevOps' },
      ],
      allocations: [
        { id: 'alloc-1', resourceId: 'res-1', slot: 1, title: 'Code Review', color: '#2563eb' },
        { id: 'alloc-2', resourceId: 'res-2', slot: 3, title: 'UI Mockups', color: '#10b981' },
      ],
    });

    el._resources = initialData.resources;
    el._allocations = initialData.allocations;

    const root = el.shadowRoot || el;

    let draggedAllocId: string | null = null;

    root.addEventListener('pointerdown', (e: Event) => {
      const badge = (e.target as HTMLElement).closest('.allocation-badge');
      if (badge) {
        draggedAllocId = badge.getAttribute('data-id');
        badge.setPointerCapture((e as PointerEvent).pointerId);
      }
    });

    root.addEventListener('pointerup', (e: Event) => {
      if (!draggedAllocId) return;
      const pe = e as PointerEvent;
      const targetCell = document
        .elementFromPoint(pe.clientX, pe.clientY)
        ?.closest('.slot-cell') as HTMLElement;
      if (targetCell) {
        const newResId = targetCell.getAttribute('data-resource-id');
        const newSlot = parseInt(targetCell.getAttribute('data-slot') || '0', 10);

        if (newResId) {
          const alloc = el._allocations.find((a: Allocation) => a.id === draggedAllocId);
          if (alloc) {
            const oldResId = alloc.resourceId;
            const oldSlot = alloc.slot;
            alloc.resourceId = newResId;
            alloc.slot = newSlot;

            commitPayload(
              el,
              { allocationId: alloc.id, allocation: alloc, oldResId, newResId, oldSlot, newSlot },
              'reassign-resource',
            );
            el.render();
          }
        }
      }
      draggedAllocId = null;
    });
  },
});
