import { createQueryStateManager, QueryStateManager } from '../../datagrid-infra';

export class FlowXListView extends HTMLElement {
  private manager: QueryStateManager | null = null;

  connectedCallback() {
    this.manager = createQueryStateManager(this, { target: '.list-container' });
  }

  public getQueryManager(): QueryStateManager | null {
    return this.manager;
  }
}

if (!customElements.get('flowx-list-view')) {
  customElements.define('flowx-list-view', FlowXListView);
}
