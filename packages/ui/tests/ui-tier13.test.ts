import { describe, it, expect, beforeEach } from 'vitest';
import '../src/components/flowx-notifications';
import '../src/components/flowx-toast';
import '../src/components/flowx-chat-window';
import '../src/components/flowx-comments';
import '../src/components/flowx-mention';
import '../src/components/flowx-activity-feed';

describe('Tier 13 Real-Time & Collaboration UI Components', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('(a) <flowx-chat-window> appends incoming messages without duplicating sender’s own optimistic message', () => {
    const chat = document.createElement('flowx-chat-window') as any;
    chat.setAttribute('current-user', 'Alice');
    document.body.appendChild(chat);

    // 1. Send optimistic message from Alice
    chat.addMessage({ id: 'msg-101', sender: 'Alice', text: 'Hello team!' });
    expect(chat._messages.length).toBe(2); // 1 initial welcome + 1 Alice msg

    // 2. Incoming WS message from Bob
    chat.addMessage({ id: 'msg-102', sender: 'Bob', text: 'Hey Alice!' });
    expect(chat._messages.length).toBe(3);

    // 3. Re-sent / duplicate WS echo of Alice's own message
    chat.addMessage({ id: 'msg-101', sender: 'Alice', text: 'Hello team!' });
    expect(chat._messages.length).toBe(3); // Deduplicated! Still 3 messages

    document.body.removeChild(chat);
  });

  it('(b) <flowx-mention> autocomplete popup opens on @, debounces, and closes on selection', async () => {
    const mention = document.createElement('flowx-mention') as any;
    mention.innerHTML = `<textarea placeholder="Type @ to mention"></textarea>`;
    document.body.appendChild(mention);

    const textarea = mention.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea).not.toBeNull();

    let selectedDetail: any = null;
    mention.addEventListener('fx-mention-select', (e: any) => {
      selectedDetail = e.detail;
    });

    // 1. Type '@ali'
    textarea.value = '@ali';
    textarea.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

    // Wait 250ms for debounce
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(mention._isOpen).toBe(true);
    expect(mention._users.length).toBeGreaterThan(0);

    // 2. Select first matching user (Alice) with Enter key
    textarea.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }),
    );

    expect(mention._isOpen).toBe(false);
    expect(textarea.value).toContain('@[alice]');
    expect(selectedDetail?.username).toBe('alice');

    document.body.removeChild(mention);
  });

  it('(c) <flowx-notifications> badge count updates live when receiving items', () => {
    const notif = document.createElement('flowx-notifications') as any;
    document.body.appendChild(notif);

    expect(notif.shadowRoot).not.toBeNull();
    let badge = notif.shadowRoot.querySelector('.badge');
    expect(badge.textContent.trim()).toBe('1');

    // Simulate receiving new SSE item
    const newItem = {
      id: 'test-2',
      title: 'New Push Event',
      message: 'Deployment live',
      unread: true,
    };
    notif._items = [newItem, ...notif._items];
    notif.render();

    badge = notif.shadowRoot.querySelector('.badge');
    expect(badge.textContent.trim()).toBe('2');

    document.body.removeChild(notif);
  });

  it('(d) <flowx-comments> thread correctly nests replies under the right parent ID', () => {
    const comments = document.createElement('flowx-comments') as any;
    document.body.appendChild(comments);

    // Initial comments: c-1 has 1 reply (c-2)
    expect(comments._comments[0].id).toBe('c-1');
    expect(comments._comments[0].replies.length).toBe(1);

    // Add nested reply to c-1
    const replyItem = {
      id: 'c-3',
      author: 'Charlie',
      content: 'Adding nested reply under c-1',
      parentId: 'c-1',
    };

    comments.addComment(replyItem);

    // Verify reply nested inside c-1
    const parentComment = comments._comments.find((c: any) => c.id === 'c-1');
    expect(parentComment.replies.length).toBe(2);
    expect(parentComment.replies[1].id).toBe('c-3');

    document.body.removeChild(comments);
  });
});
