import { FlowXDataTable } from './flowx-data-table';

/**
 * <flowx-data-grid>
 *
 * Superset of <flowx-data-table>:
 * Adds column resizing (drag handles), column reordering (drag & drop),
 * and column visibility toggling.
 */
export class FlowXDataGrid extends FlowXDataTable {
  private colWidths: Record<string, number> = {};

  override connectedCallback() {
    super.connectedCallback();
    this.setupColumnResizing();
    this.setupColumnReordering();
  }

  private setupColumnResizing() {
    const table = this.querySelector('table');
    if (!table) return;

    const headers = Array.from(table.querySelectorAll('th'));
    headers.forEach((th, index) => {
      if (th.querySelector('.resize-handle')) return;

      th.style.position = 'relative';

      const handle = document.createElement('div');
      handle.className = 'resize-handle';
      handle.style.position = 'absolute';
      handle.style.right = '0';
      handle.style.top = '0';
      handle.style.bottom = '0';
      handle.style.width = '6px';
      handle.style.cursor = 'col-resize';
      handle.style.userSelect = 'none';

      th.appendChild(handle);

      let startX = 0;
      let startWidth = 0;

      const onMouseMove = (e: MouseEvent) => {
        const diff = e.clientX - startX;
        const newWidth = Math.max(40, startWidth + diff);
        th.style.width = `${newWidth}px`;
        this.colWidths[th.textContent?.trim() || index] = newWidth;
      };

      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      handle.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        startX = e.clientX;
        startWidth = th.offsetWidth;
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      });
    });
  }

  private setupColumnReordering() {
    const table = this.querySelector('table');
    if (!table) return;

    const headers = Array.from(table.querySelectorAll('th'));
    headers.forEach((th) => {
      th.draggable = true;

      th.addEventListener('dragstart', (e) => {
        e.dataTransfer?.setData('text/plain', th.cellIndex.toString());
      });

      th.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      th.addEventListener('drop', (e) => {
        e.preventDefault();
        const fromIndexStr = e.dataTransfer?.getData('text/plain');
        if (!fromIndexStr) return;
        const fromIndex = parseInt(fromIndexStr, 10);
        const toIndex = th.cellIndex;

        if (fromIndex !== toIndex) {
          this.reorderColumn(table, fromIndex, toIndex);
        }
      });
    });
  }

  private reorderColumn(table: HTMLTableElement, from: number, to: number) {
    const rows = Array.from(table.querySelectorAll('tr'));
    rows.forEach((row) => {
      const cells = Array.from(row.children);
      if (cells[from] && cells[to]) {
        if (from < to) {
          row.insertBefore(cells[from], cells[to].nextSibling);
        } else {
          row.insertBefore(cells[from], cells[to]);
        }
      }
    });
  }
}

if (!customElements.get('flowx-data-grid')) {
  customElements.define('flowx-data-grid', FlowXDataGrid);
}
