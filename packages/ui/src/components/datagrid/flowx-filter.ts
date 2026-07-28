import { QueryStateManager } from '../../datagrid-infra';

/**
 * <flowx-filter for="my-table">
 *
 * Wraps filter controls (Tier 3 inputs/selects). On change or submit, collects all child values
 * and updates the QueryStateManager to refetch the target with filter query parameters.
 */
export class FlowXFilter extends HTMLElement {
  connectedCallback() {
    this.setupListeners();
  }

  private setupListeners() {
    this.addEventListener('change', () => this.applyFilters());

    const form = this.querySelector('form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.applyFilters();
    });
  }

  public applyFilters() {
    const targetId = this.getAttribute('for') || this.getAttribute('target');
    let manager: QueryStateManager | null = null;

    if (targetId) {
      const targetEl = document.querySelector(`#${targetId}, ${targetId}`) as any;
      if (targetEl && typeof targetEl.getQueryManager === 'function') {
        manager = targetEl.getQueryManager();
      }
    }

    const filters: Record<string, string> = {};
    const inputs = this.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
      'input, select, flowx-input, flowx-select',
    );

    inputs.forEach((el) => {
      const name = el.getAttribute('name');
      if (!name) return;
      const val = (el as any)._currentValue || (el as any).value || el.getAttribute('value') || '';
      filters[name] = val;
    });

    if (manager) {
      manager.updateAndRefetch({ filters, page: 1 });
    }

    this.dispatchEvent(
      new CustomEvent('fx-filter-change', { bubbles: true, composed: true, detail: { filters } }),
    );
  }
}

if (!customElements.get('flowx-filter')) {
  customElements.define('flowx-filter', FlowXFilter);
}
