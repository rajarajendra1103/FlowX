import { GLOBAL_THEME } from '../../helper';
import { exportTableToCSV } from '../../datagrid-infra';

/**
 * <flowx-export type="csv" fx-get="/users/export.csv">
 *
 * Trigger button for file exports. By default triggers a real navigation/download
 * to a server endpoint streaming the file. Falls back to client-side table-to-CSV
 * Blob serialization if no endpoint is configured.
 */
export class FlowXExport extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'fx-get', 'for', 'filename'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });

    const exportType = (this.getAttribute('type') || 'csv').toUpperCase();
    const endpoint = this.getAttribute('fx-get');

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
        <span>📥</span>
        <span>Export ${exportType}</span>
      </button>
    `;

    const btn = this.shadowRoot!.querySelector('button');
    btn?.addEventListener('click', () => {
      if (endpoint) {
        // Trigger server endpoint stream / download
        window.location.href = endpoint;
      } else {
        // Client-side fallback
        const targetId = this.getAttribute('for');
        let table: HTMLTableElement | null = null;
        if (targetId) {
          table = document.querySelector(`#${targetId} table, ${targetId}`) as HTMLTableElement;
        }
        if (!table) {
          table = document.querySelector('table');
        }

        if (table) {
          const filename = this.getAttribute('filename') || `export-${Date.now()}.csv`;
          exportTableToCSV(table, filename);
        } else {
          console.warn('FlowX Export: No table target found for client CSV export');
        }
      }
    });
  }
}

if (!customElements.get('flowx-export')) {
  customElements.define('flowx-export', FlowXExport);
}
