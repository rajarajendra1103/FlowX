import { defineFlowXElement } from '../helper';

export interface MentionUser {
  id: string;
  username: string;
  name?: string;
  avatar?: string;
}

export const FlowXMention = defineFlowXElement('flowx-mention', {
  observedAttributes: ['search-url', 'debounce-ms'],
  style: `
    :host {
      display: block;
      position: relative;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--flowx-font-sans);
    }
    .popup-list {
      position: absolute;
      background: var(--flowx-bg-surface, #ffffff);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-md, 8px);
      box-shadow: var(--flowx-shadow-lg);
      max-height: 200px;
      overflow-y: auto;
      z-index: 1000;
      width: 220px;
      display: none;
      padding: 4px 0;
      margin: 0;
      list-style: none;
    }
    .popup-list.open {
      display: block;
    }
    .mention-item {
      padding: 8px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 0.85rem;
      color: var(--flowx-color-text);
    }
    .mention-item:hover, .mention-item.active {
      background: var(--flowx-bg-hover, rgba(37, 99, 235, 0.1));
      color: var(--flowx-color-primary, #2563eb);
    }
    .user-avatar {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--flowx-color-primary, #2563eb);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
    }
  `,
  template: (el) => {
    const isOpen = el._isOpen || false;
    const users: MentionUser[] = el._users || [];
    const activeIdx = el._activeIdx || 0;

    const listHtml =
      users.length === 0
        ? `<li class="mention-item" style="color: var(--flowx-color-text-muted);">No users found</li>`
        : users
            .map(
              (u, idx) => `
        <li class="mention-item ${idx === activeIdx ? 'active' : ''}" data-id="${u.id}" data-username="${u.username}">
          <span class="user-avatar">${u.username.charAt(0).toUpperCase()}</span>
          <span>@${u.username}</span>
          ${u.name ? `<span style="font-size: 11px; color: var(--flowx-color-text-muted); margin-left: auto;">${u.name}</span>` : ''}
        </li>
      `,
            )
            .join('');

    return `
      <slot></slot>
      <ul class="popup-list ${isOpen ? 'open' : ''}" style="left: ${el._popupX || 0}px; top: ${el._popupY || 35}px;">
        ${listHtml}
      </ul>
    `;
  },
  setup: (el) => {
    el._users = [];
    el._isOpen = false;
    el._activeIdx = 0;
    el._searchQuery = '';

    const defaultUsers: MentionUser[] = [
      { id: 'u1', username: 'alice', name: 'Alice Vance' },
      { id: 'u2', username: 'bob', name: 'Bob Smith' },
      { id: 'u3', username: 'charlie', name: 'Charlie Brown' },
      { id: 'u4', username: 'diana', name: 'Diana Prince' },
    ];

    const root = el.shadowRoot || el;
    let debounceTimer: any = null;

    const getTargetInput = (
      target?: EventTarget | null,
    ): HTMLTextAreaElement | HTMLInputElement | null => {
      if (
        target &&
        (target as HTMLElement).tagName &&
        ['TEXTAREA', 'INPUT'].includes((target as HTMLElement).tagName)
      ) {
        return target as any;
      }
      return el.querySelector('textarea, input') || root.querySelector('textarea, input');
    };

    const handleSelect = (user: MentionUser) => {
      const input = getTargetInput();
      if (!input) return;

      const value = input.value;
      const atIdx = value.lastIndexOf('@');
      if (atIdx !== -1) {
        const prefix = value.slice(0, atIdx);
        const mentionToken = `@[${user.username}](${user.id}) `;
        input.value = prefix + mentionToken;
        input.focus();
      }

      el._isOpen = false;
      el.render();
      el.dispatchEvent(new CustomEvent('fx-mention-select', { detail: user, bubbles: true }));
    };

    const onInput = (e: Event) => {
      const input = getTargetInput(e.target);
      if (!input) return;

      const val = input.value;
      const lastAt = val.lastIndexOf('@');

      if (lastAt !== -1 && lastAt >= val.length - 15 && !val.slice(lastAt).includes(' ')) {
        const query = val.slice(lastAt + 1).toLowerCase();
        el._searchQuery = query;

        const debounceMs = parseInt(el.getAttribute('debounce-ms') || '200', 10);
        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {
          const filtered = defaultUsers.filter(
            (u) =>
              u.username.toLowerCase().includes(query) ||
              (u.name && u.name.toLowerCase().includes(query)),
          );
          el._users = filtered;
          el._isOpen = true;
          el._activeIdx = 0;
          el._popupX = Math.min(200, lastAt * 8);
          el._popupY = input.offsetHeight || 40;
          el.render();
        }, debounceMs);
      } else {
        if (el._isOpen) {
          el._isOpen = false;
          el.render();
        }
      }
    };

    const onKeyDown = (e: Event) => {
      if (!el._isOpen) return;
      const ke = e as KeyboardEvent;

      if (ke.key === 'ArrowDown') {
        ke.preventDefault();
        el._activeIdx = (el._activeIdx + 1) % Math.max(1, el._users.length);
        el.render();
      } else if (ke.key === 'ArrowUp') {
        ke.preventDefault();
        el._activeIdx = (el._activeIdx - 1 + el._users.length) % Math.max(1, el._users.length);
        el.render();
      } else if (ke.key === 'Enter' || ke.key === 'Tab') {
        if (el._users[el._activeIdx]) {
          ke.preventDefault();
          handleSelect(el._users[el._activeIdx]);
        }
      } else if (ke.key === 'Escape') {
        el._isOpen = false;
        el.render();
      }
    };

    el.addEventListener('input', onInput);
    el.addEventListener('keydown', onKeyDown);
    root.addEventListener('input', onInput);
    root.addEventListener('keydown', onKeyDown);

    root.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const item = target.closest('.mention-item');
      if (item) {
        const username = item.getAttribute('data-username');
        const user = el._users.find((u: MentionUser) => u.username === username);
        if (user) handleSelect(user);
      }
    });
  },
});
