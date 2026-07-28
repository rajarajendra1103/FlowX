export class FlowXTreeTable extends HTMLElement {
  connectedCallback() {
    this.setupTreeToggles();
  }

  private setupTreeToggles() {
    const toggles = this.querySelectorAll('[data-fx-tree-toggle], .tree-toggle');

    toggles.forEach((toggle) => {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const row = toggle.closest('tr');
        if (!row) return;

        const isExpanded = row.getAttribute('aria-expanded') === 'true';
        const endpoint = toggle.getAttribute('fx-get') || row.getAttribute('fx-get');

        if (isExpanded) {
          row.setAttribute('aria-expanded', 'false');
          toggle.textContent = '▶';
          this.toggleChildren(row, false);
        } else {
          row.setAttribute('aria-expanded', 'true');
          toggle.textContent = '▼';

          // Lazy load children if fx-get endpoint configured
          if (endpoint && !row.hasAttribute('data-children-loaded')) {
            row.setAttribute('data-children-loaded', 'true');
            fetch(endpoint)
              .then((res) => res.text())
              .then((html) => {
                row.insertAdjacentHTML('afterend', html);
                this.setupTreeToggles();
              });
          } else {
            this.toggleChildren(row, true);
          }
        }
      });
    });
  }

  private toggleChildren(parentRow: HTMLTableRowElement, visible: boolean) {
    const parentId = parentRow.getAttribute('data-row-id');
    if (!parentId) return;

    const childRows = this.querySelectorAll(`tr[data-parent-id="${parentId}"]`);
    childRows.forEach((child) => {
      const childEl = child as HTMLElement;
      childEl.style.display = visible ? '' : 'none';
      if (!visible) {
        // Collapse nested sub-tree recursively
        childEl.setAttribute('aria-expanded', 'false');
        this.toggleChildren(child as HTMLTableRowElement, false);
      }
    });
  }
}

if (!customElements.get('flowx-tree-table')) {
  customElements.define('flowx-tree-table', FlowXTreeTable);
}
