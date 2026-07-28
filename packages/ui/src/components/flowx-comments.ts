import { defineFlowXElement } from '../helper';

export interface CommentItem {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  time?: string;
  parentId?: string | null;
  replies?: CommentItem[];
}

function countComments(list: CommentItem[]): number {
  let count = 0;
  for (const item of list) {
    count += 1;
    if (item.replies) count += countComments(item.replies);
  }
  return count;
}

export const FlowXComments = defineFlowXElement('flowx-comments', {
  observedAttributes: ['fx-post', 'fx-sse-connect', 'current-user'],
  style: `
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--flowx-font-sans);
    }
    .comments-wrapper {
      background: var(--flowx-bg-surface, #ffffff);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-lg, 16px);
      padding: var(--flowx-space-6, 24px);
      box-shadow: var(--flowx-shadow-sm);
    }
    .comments-header {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 16px;
      color: var(--flowx-color-text);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .comment-card {
      padding: 12px 16px;
      background: var(--flowx-bg-surface-raised, #f8fafc);
      border: 1px solid var(--flowx-border-color);
      border-radius: var(--flowx-radius-md, 8px);
      margin-bottom: 12px;
    }
    .comment-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .author-info {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 0.85rem;
      color: var(--flowx-color-text);
    }
    .avatar-circle {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--flowx-color-primary, #2563eb);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
    }
    .comment-time {
      font-size: 11px;
      color: var(--flowx-color-text-muted);
    }
    .comment-content {
      font-size: 0.9rem;
      line-height: 1.5;
      color: var(--flowx-color-text);
    }
    .comment-actions {
      margin-top: 8px;
      display: flex;
      gap: 12px;
    }
    .reply-btn {
      font-size: 11px;
      color: var(--flowx-color-primary, #2563eb);
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 600;
      padding: 0;
    }
    .replies-thread {
      margin-left: 28px;
      border-left: 2px solid var(--flowx-border-color);
      padding-left: 14px;
      margin-top: 8px;
    }
    .new-comment-form {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .comment-textarea {
      width: 100%;
      min-height: 70px;
      padding: 10px 14px;
      border: 1px solid var(--flowx-border-color);
      border-radius: var(--flowx-radius-md);
      font-family: inherit;
      font-size: 0.9rem;
      box-sizing: border-box;
      outline: none;
      background: var(--flowx-bg-surface);
      color: var(--flowx-color-text);
    }
    .comment-textarea:focus-visible {
      border-color: var(--flowx-color-primary, #2563eb);
    }
    .submit-btn {
      align-self: flex-end;
      padding: 8px 16px;
      background: var(--flowx-color-primary, #2563eb);
      color: #fff;
      border: none;
      border-radius: var(--flowx-radius-md);
      font-weight: 600;
      cursor: pointer;
      font-size: 0.85rem;
    }
  `,
  template: (el) => {
    const comments: CommentItem[] = el._comments || [];
    const replyingToId = el._replyingToId;

    const renderTree = (list: CommentItem[]): string => {
      return list
        .map(
          (c) => `
        <div class="comment-card" data-id="${c.id}">
          <div class="comment-meta">
            <div class="author-info">
              <span class="avatar-circle">${c.author ? c.author.charAt(0).toUpperCase() : 'U'}</span>
              <span>${c.author}</span>
            </div>
            <span class="comment-time">${c.time || 'Just now'}</span>
          </div>
          <div class="comment-content">${c.content}</div>
          <div class="comment-actions">
            <button class="reply-btn" data-reply-id="${c.id}" type="button">Reply</button>
          </div>

          ${
            replyingToId === c.id
              ? `
            <form class="new-comment-form reply-form" data-parent-id="${c.id}">
              <textarea class="comment-textarea" placeholder="Write a reply..." required></textarea>
              <button class="submit-btn" type="submit">Post Reply</button>
            </form>
          `
              : ''
          }

          ${
            c.replies && c.replies.length > 0
              ? `
            <div class="replies-thread">
              ${renderTree(c.replies)}
            </div>
          `
              : ''
          }
        </div>
      `,
        )
        .join('');
    };

    return `
      <div class="comments-wrapper">
        <div class="comments-header">
          <span>Discussion (${countComments(comments)})</span>
        </div>

        <div class="comments-tree">
          ${renderTree(comments)}
        </div>

        <form class="new-comment-form main-form">
          <textarea class="comment-textarea main-input" placeholder="Add a comment..." required></textarea>
          <button class="submit-btn" type="submit">Post Comment</button>
        </form>
      </div>
    `;
  },
  setup: (el) => {
    el._comments = el._comments || [
      {
        id: 'c-1',
        author: 'Alice',
        content: 'Great architectural baseline for real-time widgets!',
        time: '10m ago',
        replies: [
          {
            id: 'c-2',
            author: 'Bob',
            content: 'Agreed, SSE integration simplifies live updates.',
            parentId: 'c-1',
            time: '5m ago',
          },
        ],
      },
    ];
    el.render();

    const currentUser = el.getAttribute('current-user') || 'You';

    // Helper to nest incoming comment under parentId
    el.addComment = (newComment: CommentItem) => {
      if (!newComment.parentId) {
        el._comments = [...el._comments, newComment];
      } else {
        const nest = (list: CommentItem[]): CommentItem[] => {
          return list.map((item) => {
            if (item.id === newComment.parentId) {
              return { ...item, replies: [...(item.replies || []), newComment] };
            }
            if (item.replies) {
              return { ...item, replies: nest(item.replies) };
            }
            return item;
          });
        };
        el._comments = nest(el._comments);
      }
      el._replyingToId = null;
      el.render();
    };

    const root = el.shadowRoot || el;

    root.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('reply-btn')) {
        const parentId = target.getAttribute('data-reply-id');
        el._replyingToId = el._replyingToId === parentId ? null : parentId;
        el.render();
      }
    });

    root.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const textarea = form.querySelector('.comment-textarea') as HTMLTextAreaElement;
      if (!textarea || !textarea.value.trim()) return;

      const parentId = form.getAttribute('data-parent-id') || null;
      const newComment: CommentItem = {
        id: `c-${Date.now()}`,
        author: currentUser,
        content: textarea.value.trim(),
        parentId,
        time: 'Just now',
        replies: [],
      };

      el.addComment(newComment);
      el.dispatchEvent(new CustomEvent('fx-comment-submit', { detail: newComment, bubbles: true }));
    });
  },
});
