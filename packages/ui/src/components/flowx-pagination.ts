import { defineFlowXElement } from '../helper';

defineFlowXElement('flowx-pagination', {
  observedAttributes: ['current-page', 'total-pages'],
  style: `
    :host {
      display: block;
    }
    .pagination-container {
      display: flex;
      align-items: center;
      gap: var(--flowx-spacing-xs);
      font-family: var(--flowx-font-family);
    }
    .page-btn {
      background: #161b22;
      color: #e6edf3;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--flowx-radius-sm);
      padding: var(--flowx-spacing-xs) var(--flowx-spacing-sm);
      cursor: pointer;
      font-size: var(--flowx-font-size-md);
      font-weight: 600;
      min-width: 32px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all var(--flowx-transition);
      outline: none;
      user-select: none;
    }
    .page-btn:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.08);
    }
    .page-btn.active {
      background: var(--flowx-primary);
      color: var(--flowx-primary-text);
      border-color: var(--flowx-primary);
    }
    .page-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .ellipsis {
      color: var(--text-muted);
      min-width: 32px;
      text-align: center;
      user-select: none;
    }
  `,
  setup: (el) => {
    const changePage = (page: number) => {
      const total = parseInt(el.getAttribute('total-pages') || '1', 10);
      if (page < 1 || page > total) return;

      el.setAttribute('current-page', String(page));

      el.dispatchEvent(
        new CustomEvent('fx-page-change', {
          bubbles: true,
          composed: true,
          detail: { page },
        }),
      );

      el.render();
      attachListeners();
    };

    const attachListeners = () => {
      const btns = el.shadowRoot?.querySelectorAll('.page-btn');
      btns?.forEach((btn: Element) => {
        btn.addEventListener('click', () => {
          const page = parseInt((btn as HTMLElement).getAttribute('data-page') || '1', 10);
          changePage(page);
        });
      });
    };

    const observer = new MutationObserver(() => {
      attachListeners();
    });
    observer.observe(el, { attributes: true });

    attachListeners();
    (el as any).changePage = changePage;
  },
  template: (el) => {
    const current = parseInt(el.getAttribute('current-page') || '1', 10);
    const total = parseInt(el.getAttribute('total-pages') || '1', 10);

    const items: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) items.push(i);
    } else {
      if (current <= 4) {
        items.push(1, 2, 3, 4, 5, '...', total);
      } else if (current >= total - 3) {
        items.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
      } else {
        items.push(1, '...', current - 1, current, current + 1, '...', total);
      }
    }

    let html = `<div class="pagination-container">`;

    html += `<button class="page-btn prev" data-page="${current - 1}" ${current === 1 ? 'disabled' : ''} aria-label="Go to previous page">⟨</button>`;

    items.forEach((item) => {
      if (item === '...') {
        html += `<span class="ellipsis" aria-hidden="true">...</span>`;
      } else {
        html += `<button class="page-btn ${item === current ? 'active' : ''}" data-page="${item}" aria-label="Go to page ${item}" aria-current="${item === current ? 'page' : 'false'}">${item}</button>`;
      }
    });

    html += `<button class="page-btn next" data-page="${current + 1}" ${current === total ? 'disabled' : ''} aria-label="Go to next page">⟩</button>`;
    html += `</div>`;

    return html;
  },
});
