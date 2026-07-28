import { GLOBAL_THEME } from '../../helper';
import { QueryStateManager } from '../../datagrid-infra';

/**
 * <flowx-group-by for="my-table" fields="category,status,department">
 *
 * Dropdown that adds `group_by` parameter to fx-get request. Server returns grouped HTML.
 */
export class FlowXGroupBy extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  private render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });

    const rawFields = this.getAttribute('fields') || 'category,status';
    const fields = rawFields.split(',').map((f) => f.trim());

    const optionsHtml = fields
      .map(
        (f) => `
      <option value="${f}">Group by ${f}</option>
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
      <select aria-label="Group by options">
        <option value="">No Grouping</option>
        ${optionsHtml}
      </select>
    `;

    const select = this.shadowRoot!.querySelector('select');
    select?.addEventListener('change', () => {
      const groupBy = select.value;
      const targetId = this.getAttribute('for');

      if (targetId) {
        const targetEl = document.querySelector(`#${targetId}, ${targetId}`) as any;
        if (targetEl && typeof targetEl.getQueryManager === 'function') {
          const mgr: QueryStateManager = targetEl.getQueryManager();
          mgr.updateAndRefetch({ groupBy, page: 1 });
        }
      }

      this.dispatchEvent(
        new CustomEvent('fx-group-change', { bubbles: true, composed: true, detail: { groupBy } }),
      );
    });
  }
}

if (!customElements.get('flowx-group-by')) {
  customElements.define('flowx-group-by', FlowXGroupBy);
}
