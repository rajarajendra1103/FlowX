import { defineFlowXElement } from '../helper';

export interface ChatMessage {
  id: string;
  sender: string;
  avatar?: string;
  text: string;
  time?: string;
  isSelf?: boolean;
}

export const FlowXChatWindow = defineFlowXElement('flowx-chat-window', {
  observedAttributes: ['fx-post', 'fx-ws-connect', 'fx-sse-connect', 'current-user'],
  style: `
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 420px;
      background: var(--flowx-bg-surface, #ffffff);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-lg, 16px);
      box-shadow: var(--flowx-shadow-md);
      overflow: hidden;
      font-family: var(--flowx-font-sans);
    }
    .chat-header {
      padding: 12px 16px;
      background: var(--flowx-bg-surface-raised, #f8fafc);
      border-bottom: 1px solid var(--flowx-border-color);
      font-weight: 700;
      font-size: 0.95rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--flowx-color-success, #10b981);
      display: inline-block;
      margin-right: 6px;
    }
    .messages-container {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: var(--flowx-bg-base, #fafafa);
    }
    .msg-group {
      display: flex;
      gap: 8px;
      max-width: 80%;
      align-items: flex-end;
    }
    .msg-group.self {
      align-self: flex-end;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--flowx-color-primary, #2563eb);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      flex-shrink: 0;
    }
    .msg-bubble {
      padding: 8px 14px;
      border-radius: 14px;
      background: var(--flowx-bg-surface, #ffffff);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      color: var(--flowx-color-text, #0f172a);
      font-size: 0.9rem;
      line-height: 1.4;
      box-shadow: var(--flowx-shadow-sm);
    }
    .msg-group.self .msg-bubble {
      background: var(--flowx-color-primary, #2563eb);
      color: #ffffff;
      border-color: var(--flowx-color-primary, #2563eb);
    }
    .msg-meta {
      font-size: 10px;
      color: var(--flowx-color-text-muted);
      margin-top: 2px;
    }
    .input-form {
      display: flex;
      padding: 12px;
      gap: 8px;
      background: var(--flowx-bg-surface, #ffffff);
      border-top: 1px solid var(--flowx-border-color);
    }
    .chat-input {
      flex: 1;
      padding: 8px 14px;
      border: 1px solid var(--flowx-border-color);
      border-radius: var(--flowx-radius-round);
      font-family: inherit;
      font-size: 0.9rem;
      outline: none;
      background: var(--flowx-bg-surface);
      color: var(--flowx-color-text);
    }
    .chat-input:focus-visible {
      border-color: var(--flowx-color-primary, #2563eb);
    }
    .send-btn {
      padding: 8px 16px;
      background: var(--flowx-color-primary, #2563eb);
      color: #ffffff;
      border: none;
      border-radius: var(--flowx-radius-round);
      font-weight: 600;
      cursor: pointer;
      font-size: 0.85rem;
    }
  `,
  template: (el) => {
    const messages: ChatMessage[] = el._messages || [];

    const messagesHtml = messages
      .map(
        (m) => `
      <div class="msg-group ${m.isSelf ? 'self' : ''}" data-id="${m.id}">
        <div class="avatar">${m.sender ? m.sender.charAt(0).toUpperCase() : 'U'}</div>
        <div>
          <div class="msg-bubble">${m.text}</div>
          <div class="msg-meta" style="text-align: ${m.isSelf ? 'right' : 'left'}">${m.sender} • ${m.time || 'Just now'}</div>
        </div>
      </div>
    `,
      )
      .join('');

    return `
      <div class="chat-header">
        <div><span class="status-dot"></span>Live Chat Room</div>
        <span style="font-size: 11px; color: var(--flowx-color-text-muted);">${messages.length} messages</span>
      </div>

      <div class="messages-container">
        ${messagesHtml}
      </div>

      <form class="input-form">
        <input class="chat-input" type="text" placeholder="Type a message..." required />
        <button class="send-btn" type="submit">Send</button>
      </form>
    `;
  },
  setup: (el) => {
    el._messages = el._messages || [
      {
        id: 'm-1',
        sender: 'Bot',
        text: 'Welcome to the collaborative room!',
        isSelf: false,
        time: '10:00 AM',
      },
    ];
    const currentUser = el.getAttribute('current-user') || 'You';

    const root = el.shadowRoot || el;

    const scrollToBottomIfAppropriate = (container: HTMLElement) => {
      // Auto-scroll to bottom unless user has scrolled up to read history
      const isScrolledUp =
        container.scrollTop + container.clientHeight < container.scrollHeight - 40;
      if (!isScrolledUp) {
        container.scrollTop = container.scrollHeight;
      }
    };

    // Receive message logic with optimistic deduplication
    el.addMessage = (msg: ChatMessage) => {
      const isSelf = msg.sender === currentUser || msg.isSelf === true;
      const normalizedMsg: ChatMessage = { ...msg, isSelf };

      // Deduplication check: check if message with same ID or same sender + content already exists
      const isDuplicate = el._messages.some(
        (m: ChatMessage) =>
          m.id === normalizedMsg.id ||
          (m.sender === normalizedMsg.sender &&
            m.text === normalizedMsg.text &&
            Math.abs((m as any)._timestamp - Date.now()) < 5000),
      );

      if (!isDuplicate) {
        el._messages = [...el._messages, normalizedMsg];
        el.render();
        const container = root.querySelector('.messages-container') as HTMLElement;
        if (container) scrollToBottomIfAppropriate(container);
      }
    };

    root.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      const input = root.querySelector('.chat-input') as HTMLInputElement;
      if (!input || !input.value.trim()) return;

      const text = input.value.trim();
      input.value = '';

      const newMsg: ChatMessage & { _timestamp: number } = {
        id: `msg-${Date.now()}`,
        sender: currentUser,
        text,
        isSelf: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        _timestamp: Date.now(),
      };

      // Optimistic render
      el.addMessage(newMsg);

      // Emit custom fx-message-send event for websocket / post handler
      el.dispatchEvent(new CustomEvent('fx-message-send', { detail: newMsg, bubbles: true }));

      // Optional WebSocket send if ws socket attached
      if (el._ws && el._ws.readyState === WebSocket.OPEN) {
        el._ws.send(JSON.stringify(newMsg));
      }
    });

    // Optional SSE / WebSocket connect handlers
    const sseUrl = el.getAttribute('fx-sse-connect');
    if (sseUrl && typeof window !== 'undefined' && (window as any).EventSource) {
      try {
        const es = new EventSource(sseUrl);
        es.addEventListener('chat', (e: MessageEvent) => {
          try {
            const data = JSON.parse(e.data);
            el.addMessage(data);
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
