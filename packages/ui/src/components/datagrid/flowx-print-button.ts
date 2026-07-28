import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-print-button>
 *
 * Client-only button triggering `window.print()` with optional `@media print` CSS slot.
 */
export class FlowXPrintButton extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  private render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });

    this.shadowRoot!.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: inline-block; font-family: var(--flowx-font-family); }
        button {
          display: inline-flex; align-items: center; gap: 6px;
          background: #161b22; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); color: #e6edf3;
          font-family: var(--flowx-font-family); font-size: 13px; font-weight: 500;
          padding: 6px 12px; cursor: pointer; transition: background 0.15s;
        }
        button:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.25); }
      </style>
      <button type="button">
        <span>🖨️</span>
        <span>Print</span>
      </button>
    `;

    const btn = this.shadowRoot!.querySelector('button');
    btn?.addEventListener('click', () => {
      window.print();
    });
  }
}

if (!customElements.get('flowx-print-button')) {
  customElements.define('flowx-print-button', FlowXPrintButton);
}
