import { GLOBAL_THEME } from '../../helper';
import { QueryStateManager } from '../../datagrid-infra';

/**
 * <flowx-sort for="my-table" fields="name,date,status">
 *
 * Standalone sort control (dropdown / button group) for use outside table headers.
 */
export class FlowXSort extends HTMLElement {
  static get observedAttributes() {
    return ['for', 'fields'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });

    const rawFields = this.getAttribute('fields') || 'name,date';
    const fields = rawFields.split(',').map((f) => f.trim());

    const optionsHtml = fields
      .map(
        (f) => `
      <option value="${f}:asc">Sort by ${f} (Ascending)</option>
      <option value="${f}:desc">Sort by ${f} (Descending)</option>
    `,
      )
      .join('');

    this.shadowRoot!.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: inline-block; font-family: var(--flowx-font-family); }
        select {
          background: #0d1117; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); color: #e6edf3;
          font-family: var(--flowx-font-family); font-size: 13px;
          padding: 6px 10px; outline: none; cursor: pointer;
        }
      </style>
      <select aria-label="Sort options">
        <option value="">Default Sort</option>
        ${optionsHtml}
      </select>
    `;

    const select = this.shadowRoot!.querySelector('select');
    select?.addEventListener('change', () => {
      const val = select.value;
      let sort = '';
      let dir: 'asc' | 'desc' | '' = '';

      if (val.includes(':')) {
        const parts = val.split(':');
        sort = parts[0];
        dir = parts[1] as 'asc' | 'desc';
      }

      const targetId = this.getAttribute('for');
      if (targetId) {
        const targetEl = document.querySelector(`#${targetId}, ${targetId}`) as any;
        if (targetEl && typeof targetEl.getQueryManager === 'function') {
          const mgr: QueryStateManager = targetEl.getQueryManager();
          mgr.updateAndRefetch({ sort, dir });
        }
      }

      this.dispatchEvent(
        new CustomEvent('fx-sort-change', { bubbles: true, composed: true, detail: { sort, dir } }),
      );
    });
  }
}

if (!customElements.get('flowx-sort')) {
  customElements.define('flowx-sort', FlowXSort);
}
