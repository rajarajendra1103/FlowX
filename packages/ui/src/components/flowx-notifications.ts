import { defineFlowXElement } from '../helper';

export interface NotificationItem {
  id: string;
  title: string;
  message?: string;
  time?: string;
  unread?: boolean;
}

export const FlowXNotifications = defineFlowXElement('flowx-notifications', {
  observedAttributes: ['unread-count', 'fx-sse-connect', 'sse-event'],
  style: `
    :host {
      display: inline-block;
      position: relative;
      font-family: var(--flowx-font-sans);
    }
    .bell-btn {
      background: var(--flowx-bg-surface, #ffffff);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-round, 9999px);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      color: var(--flowx-color-text, #0f172a);
      transition: background-color var(--flowx-transition-fast, 0.2s);
      outline: none;
    }
    .bell-btn:hover {
      background: var(--flowx-bg-hover, rgba(0,0,0,0.05));
    }
    .bell-btn:focus-visible {
      box-shadow: 0 0 0 3px var(--flowx-color-primary, #2563eb);
    }
    .badge {
      position: absolute;
      top: -2px;
      right: -2px;
      background: var(--flowx-color-danger, #ef4444);
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      min-width: 18px;
      height: 18px;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      box-shadow: 0 0 0 2px var(--flowx-bg-surface, #ffffff);
    }
    .badge.hidden {
      display: none;
    }
    .dropdown-panel {
      position: absolute;
      right: 0;
      top: calc(100% + 8px);
      width: 320px;
      background: var(--flowx-bg-surface, #ffffff);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-md, 12px);
      box-shadow: var(--flowx-shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.1));
      z-index: 1000;
      display: none;
      flex-direction: column;
      max-height: 400px;
      overflow: hidden;
    }
    .dropdown-panel.open {
      display: flex;
    }
    .header {
      padding: 12px 16px;
      font-weight: 700;
      font-size: 0.9rem;
      border-bottom: 1px solid var(--flowx-border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--flowx-bg-surface-raised);
    }
    .mark-read-btn {
      font-size: 11px;
      color: var(--flowx-color-primary, #2563eb);
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 600;
    }
    .list {
      overflow-y: auto;
      flex: 1;
      padding: 0;
      margin: 0;
      list-style: none;
    }
    .item {
      padding: 12px 16px;
      border-bottom: 1px solid var(--flowx-border-color);
      transition: background-color 0.2s ease;
      animation: slideInDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .item.unread {
      background: var(--flowx-bg-hover, rgba(37, 99, 235, 0.05));
    }
    .item-title {
      font-weight: 600;
      font-size: 0.85rem;
      color: var(--flowx-color-text);
      margin-bottom: 2px;
    }
    .item-msg {
      font-size: 0.8rem;
      color: var(--flowx-color-text-muted, #64748b);
    }
    .item-time {
      font-size: 10px;
      color: var(--flowx-color-text-subtle, #94a3b8);
      margin-top: 4px;
    }
    .empty-state {
      padding: 24px;
      text-align: center;
      color: var(--flowx-color-text-muted);
      font-size: 0.85rem;
    }
    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translateY(-12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  template: (el) => {
    const isOpen = el._isOpen || false;
    const items: NotificationItem[] = el._items || [];
    const unreadCount = items.filter((i) => i.unread).length;

    const itemsHtml =
      items.length === 0
        ? `<div class="empty-state">No notifications</div>`
        : items
            .map(
              (item) => `
        <li class="item ${item.unread ? 'unread' : ''}" data-id="${item.id}">
          <div class="item-title">${item.title}</div>
          ${item.message ? `<div class="item-msg">${item.message}</div>` : ''}
          <div class="item-time">${item.time || 'Just now'}</div>
        </li>
      `,
            )
            .join('');

    return `
      <button class="bell-btn" type="button" aria-expanded="${isOpen}" aria-label="Notifications (${unreadCount} unread)">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span class="badge ${unreadCount === 0 ? 'hidden' : ''}">${unreadCount > 99 ? '99+' : unreadCount}</span>
      </button>

      <div class="dropdown-panel ${isOpen ? 'open' : ''}" role="region" aria-label="Notifications panel">
        <div class="header">
          <span>Notifications</span>
          ${unreadCount > 0 ? `<button class="mark-read-btn" type="button">Mark all as read</button>` : ''}
        </div>
        <ul class="list">
          ${itemsHtml}
        </ul>
      </div>
    `;
  },
  setup: (el) => {
    el._items = el._items || [
      {
        id: '1',
        title: 'System Welcome',
        message: 'FlowX Real-time Engine initialized',
        time: '1m ago',
        unread: true,
      },
    ];
    el._isOpen = false;
    el.render();

    const root = el.shadowRoot || el;

    root.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const bellBtn = target.closest('.bell-btn');
      const markReadBtn = target.closest('.mark-read-btn');

      if (bellBtn) {
        el._isOpen = !el._isOpen;
        el.render();
      } else if (markReadBtn) {
        el._items = el._items.map((i: NotificationItem) => ({ ...i, unread: false }));
        el.render();
      }
    });

    // Handle SSE connect stream via fx-sse-connect
    const sseUrl = el.getAttribute('fx-sse-connect');
    if (sseUrl && typeof window !== 'undefined' && (window as any).EventSource) {
      try {
        const es = new EventSource(sseUrl);
        const eventName = el.getAttribute('sse-event') || 'notification';

        es.addEventListener(eventName, (e: MessageEvent) => {
          try {
            const data = JSON.parse(e.data);
            const newItem: NotificationItem = {
              id: data.id || `notif-${Date.now()}`,
              title: data.title || 'New Notification',
              message: data.message || '',
              time: 'Just now',
              unread: true,
            };
            el._items = [newItem, ...el._items];
            el.dispatchEvent(
              new CustomEvent('fx-notification-receive', { detail: newItem, bubbles: true }),
            );
            el.render();
          } catch (err) {
            // ignore malformed SSE
          }
        });
        el._eventSource = es;
      } catch (err) {
        // network error fallback
      }
    }
  },
});
