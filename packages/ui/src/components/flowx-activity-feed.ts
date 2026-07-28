import { defineFlowXElement } from '../helper';

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target?: string;
  time?: string;
  count?: number;
  othersCount?: number;
}

export const FlowXActivityFeed = defineFlowXElement('flowx-activity-feed', {
  observedAttributes: ['fx-sse-connect', 'grouping'],
  style: `
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--flowx-font-sans);
    }
    .feed-container {
      background: var(--flowx-bg-surface, #ffffff);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-lg, 16px);
      padding: var(--flowx-space-6, 24px);
      box-shadow: var(--flowx-shadow-sm);
    }
    .feed-header {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 16px;
      color: var(--flowx-color-text);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .activity-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--flowx-bg-surface-raised, #f8fafc);
      border: 1px solid var(--flowx-border-color);
      border-radius: var(--flowx-radius-md, 8px);
    }
    .actor-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--flowx-color-primary, #2563eb);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      flex-shrink: 0;
    }
    .activity-body {
      flex: 1;
      font-size: 0.9rem;
      color: var(--flowx-color-text);
    }
    .actor-name {
      font-weight: 700;
    }
    .action-text {
      color: var(--flowx-color-text-muted);
    }
    .activity-time {
      font-size: 11px;
      color: var(--flowx-color-text-subtle);
      margin-left: auto;
    }
  `,
  template: (el) => {
    const rawItems: ActivityItem[] = el._items || [];
    const grouping = el.getAttribute('grouping') !== 'false';

    // Grouping consecutive same-action items
    let displayItems: ActivityItem[] = [];
    if (grouping) {
      for (const item of rawItems) {
        const last = displayItems[displayItems.length - 1];
        if (last && last.action === item.action && last.target === item.target) {
          last.othersCount = (last.othersCount || 0) + 1;
        } else {
          displayItems.push({ ...item, othersCount: 0 });
        }
      }
    } else {
      displayItems = rawItems;
    }

    const itemsHtml = displayItems
      .map((item) => {
        const actorLabel =
          item.othersCount && item.othersCount > 0
            ? `${item.actor} and ${item.othersCount} ${item.othersCount === 1 ? 'other' : 'others'}`
            : item.actor;

        return `
        <div class="activity-card" data-id="${item.id}">
          <div class="actor-avatar">${item.actor.charAt(0).toUpperCase()}</div>
          <div class="activity-body">
            <span class="actor-name">${actorLabel}</span>
            <span class="action-text">${item.action}</span>
            ${item.target ? `<strong style="color: var(--flowx-color-text);">${item.target}</strong>` : ''}
          </div>
          <div class="activity-time">${item.time || 'Just now'}</div>
        </div>
      `;
      })
      .join('');

    return `
      <div class="feed-container">
        <div class="feed-header">
          <span>Activity Stream</span>
          <span style="font-size: 11px; color: var(--flowx-color-text-muted);">${displayItems.length} events</span>
        </div>
        <div class="activity-list">
          ${itemsHtml.length > 0 ? itemsHtml : '<div style="color: var(--flowx-color-text-muted);">No activity recorded</div>'}
        </div>
      </div>
    `;
  },
  setup: (el) => {
    el._items = el._items || [
      {
        id: 'act-1',
        actor: 'Alice',
        action: 'commented on',
        target: 'Tier 13 Specs',
        time: '10m ago',
      },
      {
        id: 'act-2',
        actor: 'Bob',
        action: 'commented on',
        target: 'Tier 13 Specs',
        time: '8m ago',
      },
      {
        id: 'act-3',
        actor: 'Charlie',
        action: 'commented on',
        target: 'Tier 13 Specs',
        time: '5m ago',
      },
      { id: 'act-4', actor: 'Diana', action: 'deployed', target: 'v1.1.0-beta', time: '2m ago' },
    ];

    // Optional SSE live stream hook
    const sseUrl = el.getAttribute('fx-sse-connect');
    if (sseUrl && typeof window !== 'undefined' && (window as any).EventSource) {
      try {
        const es = new EventSource(sseUrl);
        es.addEventListener('activity', (e: MessageEvent) => {
          try {
            const data = JSON.parse(e.data);
            const newItem: ActivityItem = {
              id: data.id || `act-${Date.now()}`,
              actor: data.actor || 'User',
              action: data.action || 'updated',
              target: data.target || '',
              time: 'Just now',
            };
            el._items = [newItem, ...el._items];
            el.render();
          } catch (err) {
            // ignore parse error
          }
        });
        el._eventSource = es;
      } catch (err) {
        // ignore sse init error
      }
    }
  },
});
