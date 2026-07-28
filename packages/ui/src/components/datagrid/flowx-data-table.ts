import { createQueryStateManager, QueryStateManager } from '../../datagrid-infra';

export class FlowXDataTable extends HTMLElement {
  protected manager: QueryStateManager | null = null;

  static get observedAttributes() {
    return ['fx-endpoint', 'fx-target', 'fx-swap', 'mode', 'sort', 'dir', 'page', 'limit'];
  }

  connectedCallback() {
    this.initManager();
    this.setupHeaderSortTriggers();
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    if (oldVal === newVal) return;
    if (name === 'mode' && this.manager) {
      this.manager.setMode(newVal as 'server' | 'client');
    }
  }

  protected initManager() {
    if (!this.manager) {
      this.manager = createQueryStateManager(this);
    }
  }

  public getQueryManager(): QueryStateManager | null {
    return this.manager;
  }

  protected setupHeaderSortTriggers() {
    const table = this.querySelector('table');
    if (!table) return;

    const headers = table.querySelectorAll('th');
    headers.forEach((th) => {
      const field = th.getAttribute('fx-sort') || th.getAttribute('data-fx-sort');
      if (!field) return;

      th.style.cursor = 'pointer';
      th.style.userSelect = 'none';

      // Add visual sort indicator if not present
      if (!th.querySelector('.sort-indicator')) {
        const span = document.createElement('span');
        span.className = 'sort-indicator';
        span.style.marginLeft = '6px';
        span.style.fontSize = '10px';
        span.style.opacity = '0.5';
        span.textContent = '⇅';
        th.appendChild(span);
      }

      th.addEventListener('click', () => {
        if (!this.manager) return;
        const current = this.manager.getState();
        let nextDir: 'asc' | 'desc' | '' = 'asc';

        if (current.sort === field) {
          if (current.dir === 'asc') nextDir = 'desc';
          else if (current.dir === 'desc') nextDir = '';
          else nextDir = 'asc';
        }

        // Update header indicators
        headers.forEach((otherTh) => {
          const ind = otherTh.querySelector('.sort-indicator');
          if (ind) ind.textContent = '⇅';
        });

        const currentInd = th.querySelector('.sort-indicator');
        if (currentInd) {
          currentInd.textContent = nextDir === 'asc' ? '▲' : nextDir === 'desc' ? '▼' : '⇅';
          (currentInd as HTMLElement).style.opacity = nextDir ? '1' : '0.5';
        }

        this.manager.updateAndRefetch({ sort: nextDir ? field : '', dir: nextDir });
      });
    });
  }
}

if (!customElements.get('flowx-data-table')) {
  customElements.define('flowx-data-table', FlowXDataTable);
}
