import { defineFlowXElement, parseJsonIsland } from '../helper';

export interface TimelineEvent {
  id: string;
  title: string;
  timestamp: string; // YYYY-MM-DD
  type?: 'milestone' | 'event';
  description?: string;
}

export const FlowXDataTimeline = defineFlowXElement('flowx-data-timeline', {
  observedAttributes: ['zoom-level', 'scale'],
  style: `
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--flowx-font-sans);
    }
    .timeline-container {
      background-color: var(--flowx-bg-surface, #ffffff);
      color: var(--flowx-color-text, #0f172a);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-lg, 16px);
      box-shadow: var(--flowx-shadow-md);
      padding: var(--flowx-space-4, 16px);
      box-sizing: border-box;
    }
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--flowx-space-4, 16px);
    }
    .zoom-controls button {
      padding: 4px 10px;
      border: 1px solid var(--flowx-border-color);
      background: var(--flowx-bg-surface);
      color: var(--flowx-color-text);
      border-radius: var(--flowx-radius-sm);
      cursor: pointer;
      font-weight: 600;
    }
    .track-wrapper {
      overflow-x: auto;
      padding: var(--flowx-space-6, 24px) 0;
      position: relative;
    }
    .track-line {
      height: 4px;
      background: var(--flowx-color-primary, #2563eb);
      position: relative;
      margin: 30px 0;
      min-width: 700px;
    }
    .milestone-node {
      position: absolute;
      top: -10px;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
    }
    .dot {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--flowx-color-primary, #2563eb);
      border: 3px solid var(--flowx-bg-surface, #ffffff);
      box-shadow: var(--flowx-shadow-sm);
    }
    .node-label {
      margin-top: 8px;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
    }
    .node-date {
      font-size: 10px;
      color: var(--flowx-color-text-muted);
    }
  `,
  template: (el) => {
    const zoomLevel = el._zoom || 1;
    const events: TimelineEvent[] = el._events || [];

    // Calculate node positions percentage
    const nodesHtml = events
      .map((ev, idx) => {
        const posPercent = Math.min(
          95,
          Math.max(5, (idx + 1) * (100 / (events.length + 1)) * zoomLevel),
        );
        return `
        <div class="milestone-node" style="left: ${posPercent}%" tabindex="0" title="${ev.description || ev.title}">
          <div class="dot"></div>
          <div class="node-label">${ev.title}</div>
          <div class="node-date">${ev.timestamp}</div>
        </div>
      `;
      })
      .join('');

    return `
      <div class="timeline-container">
        <div class="toolbar">
          <strong style="font-size: 1rem;">Timeline & Milestone Scrubber</strong>
          <div class="zoom-controls">
            <button type="button" class="zoom-out">-</button>
            <span style="font-size: 0.85rem; margin: 0 8px;">Zoom: ${Math.round(zoomLevel * 100)}%</span>
            <button type="button" class="zoom-in">+</button>
          </div>
        </div>

        <div class="track-wrapper">
          <div class="track-line" style="width: ${100 * zoomLevel}%;">
            ${nodesHtml}
          </div>
        </div>
      </div>
    `;
  },
  setup: (el) => {
    el._events = parseJsonIsland<TimelineEvent[]>(el, [
      { id: 't1', title: 'Concept Approval', timestamp: '2026-01-15' },
      { id: 't2', title: 'Beta Architecture', timestamp: '2026-04-10' },
      { id: 't3', title: 'V1 Release', timestamp: '2026-07-27' },
      { id: 't4', title: 'Ecosystem Expansion', timestamp: '2026-10-01' },
    ]);
    el._zoom = 1;
    el.render();

    const root = el.shadowRoot || el;

    root.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('zoom-in')) {
        el._zoom = Math.min(3, el._zoom + 0.25);
        el.render();
      } else if (target.classList.contains('zoom-out')) {
        el._zoom = Math.max(0.5, el._zoom - 0.25);
        el.render();
      }
    });

    root.addEventListener('keydown', (e: Event) => {
      const ke = e as KeyboardEvent;
      if (ke.key === '+' || ke.key === '=') {
        el._zoom = Math.min(3, el._zoom + 0.25);
        el.render();
      } else if (ke.key === '-') {
        el._zoom = Math.max(0.5, el._zoom - 0.25);
        el.render();
      }
    });
  },
});
