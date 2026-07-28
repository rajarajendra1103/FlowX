import { defineFlowXElement } from '../helper';

export const FlowXAlert = defineFlowXElement('flowx-alert', {
  observedAttributes: ['variant', 'dismissible'],
  style: `
    :host {
      display: block;
      margin-bottom: var(--flowx-spacing-sm);
    }
    .alert {
      display: flex;
      align-items: flex-start;
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      padding: var(--flowx-spacing-md);
      border-radius: var(--flowx-radius-md);
      border: 1px solid transparent;
      gap: var(--flowx-spacing-sm);
      line-height: 1.4;
      position: relative;
    }
    
    /* Variants */
    .alert.info {
      background-color: rgba(23, 162, 184, 0.12);
      color: var(--flowx-info);
      border-color: rgba(23, 162, 184, 0.2);
    }
    .alert.success {
      background-color: rgba(40, 167, 69, 0.12);
      color: var(--flowx-success);
      border-color: rgba(40, 167, 69, 0.2);
    }
    .alert.warning {
      background-color: rgba(255, 193, 7, 0.12);
      color: #b28600;
      border-color: rgba(255, 193, 7, 0.2);
    }
    .alert.error {
      background-color: rgba(220, 53, 69, 0.12);
      color: var(--flowx-error);
      border-color: rgba(220, 53, 69, 0.2);
    }
    
    .alert-body {
      flex: 1;
    }
    
    .close-btn {
      background: transparent;
      border: none;
      color: inherit;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.8;
      transition: opacity var(--flowx-transition);
    }
    .close-btn:hover {
      opacity: 1;
    }
  `,
  setup: (el) => {
    const attachCloseListener = () => {
      const closeBtn = el.shadowRoot?.querySelector('.close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e: Event) => {
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
        });
      }
    };
    attachCloseListener();
  },
  template: (el) => {
    const variant = el.getAttribute('variant') || 'info';
    const dismissible = el.hasAttribute('dismissible');

    return `
      <div class="alert ${variant}" role="alert">
        <div class="alert-body">
          <slot></slot>
        </div>
        ${
          dismissible
            ? `
          <button 
            type="button" 
            class="close-btn" 
            aria-label="Dismiss alert"
          >
            ×
          </button>
        `
            : ''
        }
      </div>
    `;
  },
});
