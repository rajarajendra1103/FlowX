import { defineFlowXElement } from '../helper';

export const FlowXChip = defineFlowXElement('flowx-chip', {
  observedAttributes: ['dismissible'],
  style: `
    :host {
      display: inline-block;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-sm);
      font-weight: 500;
      background-color: var(--flowx-neutral);
      color: #475569;
      padding: 4px 10px;
      border-radius: var(--flowx-radius-round);
      gap: 6px;
      line-height: 1.2;
      border: 1px solid rgba(240, 246, 252, 0.1);
    }
    .close-btn {
      background: transparent;
      border: none;
      color: inherit;
      cursor: pointer;
      font-size: 14px;
      line-height: 1;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--flowx-radius-round);
      width: 14px;
      height: 14px;
      transition: background-color var(--flowx-transition);
    }
    .close-btn:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }
    .close-btn:focus-visible {
      outline: 1px solid var(--flowx-primary);
    }
  `,
  setup: (el) => {
    const attachCloseListener = () => {
      const closeBtn = el.shadowRoot?.querySelector('.close-btn');
      if (closeBtn) {
        const handler = (e: Event) => {
          e.stopPropagation();
          const closeEvent = new CustomEvent('close', {
            bubbles: true,
            composed: true,
            cancelable: true,
          });
          const allowed = el.dispatchEvent(closeEvent);
          if (allowed) {
            el.remove();
          }
        };
        closeBtn.addEventListener('click', handler);
        closeBtn.addEventListener('keydown', (e: any) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handler(e);
          }
        });
      }
    };
    attachCloseListener();
  },
  template: (el) => {
    const dismissible = el.hasAttribute('dismissible');
    return `
      <span class="chip" role="status">
        <span class="chip-text"><slot></slot></span>
        ${
          dismissible
            ? `
          <button 
            type="button" 
            class="close-btn" 
            aria-label="Dismiss tag"
          >
            ×
          </button>
        `
            : ''
        }
      </span>
    `;
  },
});
