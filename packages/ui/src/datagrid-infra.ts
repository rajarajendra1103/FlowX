/**
 * Shared Infrastructure for Tier 5 Server-Driven Data Components.
 *
 * Manages query state (sort, dir, search, page, limit, filters, group_by),
 * serializes state to URL query parameters, and triggers fx-get refetches
 * using FlowX core's request-and-swap engine.
 */

export interface QueryState {
  page: number;
  limit: number;
  sort: string;
  dir: 'asc' | 'desc' | '';
  search: string;
  groupBy: string;
  filters: Record<string, string>;
}

export interface QueryStateManagerOptions {
  endpoint?: string;
  target?: string;
  swap?: string;
  mode?: 'server' | 'client';
  onStateChange?: (state: QueryState) => void;
}

export class QueryStateManager {
  private element: HTMLElement;
  private state: QueryState;
  private options: QueryStateManagerOptions;
  private activeAbortController: AbortController | null = null;

  constructor(element: HTMLElement, options: QueryStateManagerOptions = {}) {
    this.element = element;
    this.options = {
      endpoint: element.getAttribute('fx-endpoint') || element.getAttribute('fx-get') || '',
      target: element.getAttribute('fx-target') || 'tbody',
      swap: element.getAttribute('fx-swap') || 'innerHTML',
      mode: (element.getAttribute('mode') as 'server' | 'client') || 'server',
      ...options,
    };

    const initialPage = parseInt(element.getAttribute('page') || '1', 10);
    const initialLimit = parseInt(
      element.getAttribute('limit') || element.getAttribute('per-page') || '10',
      10,
    );

    this.state = {
      page: isNaN(initialPage) ? 1 : initialPage,
      limit: isNaN(initialLimit) ? 10 : initialLimit,
      sort: element.getAttribute('sort') || '',
      dir: (element.getAttribute('dir') as 'asc' | 'desc') || '',
      search: element.getAttribute('search') || '',
      groupBy: element.getAttribute('group-by') || '',
      filters: {},
    };
  }

  public getState(): QueryState {
    return { ...this.state, filters: { ...this.state.filters } };
  }

  public setMode(mode: 'server' | 'client'): void {
    this.options.mode = mode;
  }

  public getMode(): 'server' | 'client' {
    return this.options.mode || 'server';
  }

  public toQueryString(): string {
    const params = new URLSearchParams();
    if (this.state.page > 1) params.set('page', String(this.state.page));
    if (this.state.limit) params.set('limit', String(this.state.limit));
    if (this.state.sort) params.set('sort', this.state.sort);
    if (this.state.dir) params.set('dir', this.state.dir);
    if (this.state.search) params.set('q', this.state.search);
    if (this.state.groupBy) params.set('group_by', this.state.groupBy);

    for (const [k, v] of Object.entries(this.state.filters)) {
      if (v) params.set(`filter_${k}`, v);
    }

    const str = params.toString();
    return str ? `?${str}` : '';
  }

  public updateAndRefetch(partial: Partial<QueryState>): Promise<void> {
    if (partial.filters) {
      this.state.filters = { ...this.state.filters, ...partial.filters };
    }
    if (partial.page !== undefined) this.state.page = partial.page;
    if (partial.limit !== undefined) this.state.limit = partial.limit;
    if (partial.sort !== undefined) this.state.sort = partial.sort;
    if (partial.dir !== undefined) this.state.dir = partial.dir;
    if (partial.search !== undefined) this.state.search = partial.search;
    if (partial.groupBy !== undefined) this.state.groupBy = partial.groupBy;

    if (this.options.onStateChange) {
      this.options.onStateChange(this.getState());
    }

    if (this.options.mode === 'client') {
      this.applyClientSideState();
      return Promise.resolve();
    }

    return this.triggerServerRefetch();
  }

  public triggerServerRefetch(): Promise<void> {
    const endpoint =
      this.options.endpoint ||
      this.element.getAttribute('fx-endpoint') ||
      this.element.getAttribute('fx-get') ||
      '';
    if (!endpoint) return Promise.resolve();

    // Cancel in-flight request if newer refetch starts
    if (this.activeAbortController) {
      this.activeAbortController.abort();
    }
    this.activeAbortController = new AbortController();

    const queryString = this.toQueryString();
    const fullUrl = endpoint.includes('?')
      ? `${endpoint}&${queryString.slice(1)}`
      : `${endpoint}${queryString}`;

    // Target element to swap
    let targetEl: HTMLElement | null = null;
    if (this.options.target) {
      targetEl =
        this.element.querySelector(this.options.target) ||
        document.querySelector(this.options.target);
    }
    if (!targetEl) targetEl = this.element;

    const swapMode = this.options.swap || 'innerHTML';

    // Dispatch fx-get request using FlowX core runtime if available, or fetch fallback
    if ((window as any).FlowX && typeof (window as any).FlowX.process === 'function') {
      const tempAttrEl = document.createElement('div');
      tempAttrEl.setAttribute('fx-get', fullUrl);
      tempAttrEl.setAttribute('fx-target', this.options.target || '');
      tempAttrEl.setAttribute('fx-swap', swapMode);
    }

    // Direct fetch swap dispatch
    return fetch(fullUrl, { signal: this.activeAbortController.signal })
      .then((res) => res.text())
      .then((html) => {
        if (swapMode === 'beforeend') {
          targetEl!.insertAdjacentHTML('beforeend', html);
        } else if (swapMode === 'afterbegin') {
          targetEl!.insertAdjacentHTML('afterbegin', html);
        } else {
          targetEl!.innerHTML = html;
        }

        // Notify core to process swapped content
        if ((window as any).FlowX && typeof (window as any).FlowX.process === 'function') {
          (window as any).FlowX.process(targetEl);
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('FlowX DataGrid: Refetch error', err);
        }
      });
  }

  private applyClientSideState(): void {
    const table = this.element.querySelector('table');
    if (!table) return;

    const tbody = table.querySelector('tbody');
    if (!tbody) return;

    const rows = Array.from(tbody.querySelectorAll('tr'));

    // 1. Client Filter / Search
    if (this.state.search) {
      const q = this.state.search.toLowerCase();
      rows.forEach((row) => {
        const text = row.textContent?.toLowerCase() || '';
        row.style.display = text.includes(q) ? '' : 'none';
      });
    } else {
      rows.forEach((row) => {
        row.style.display = '';
      });
    }

    const visibleRows = rows.filter((r) => r.style.display !== 'none');

    // 2. Client Sort
    if (this.state.sort && this.state.dir) {
      const colIndex = this.findColumnIndex(table, this.state.sort);
      if (colIndex !== -1) {
        visibleRows.sort((a, b) => {
          const valA = a.children[colIndex]?.textContent?.trim() || '';
          const valB = b.children[colIndex]?.textContent?.trim() || '';
          const numA = Number(valA);
          const numB = Number(valB);

          let cmp = 0;
          if (!isNaN(numA) && !isNaN(numB)) {
            cmp = numA - numB;
          } else {
            cmp = valA.localeCompare(valB);
          }
          return this.state.dir === 'asc' ? cmp : -cmp;
        });

        visibleRows.forEach((r) => tbody.appendChild(r));
      }
    }
  }

  private findColumnIndex(table: HTMLTableElement, fieldName: string): number {
    const headers = Array.from(table.querySelectorAll('th'));
    return headers.findIndex(
      (th) =>
        th.getAttribute('fx-sort') === fieldName ||
        th.getAttribute('data-field') === fieldName ||
        th.textContent?.trim().toLowerCase() === fieldName.toLowerCase(),
    );
  }
}

export function createQueryStateManager(
  element: HTMLElement,
  options?: QueryStateManagerOptions,
): QueryStateManager {
  return new QueryStateManager(element, options);
}

/**
 * Utility to export an HTMLTableElement to CSV.
 */
export function exportTableToCSV(table: HTMLTableElement, filename: string = 'export.csv'): void {
  const rows = Array.from(table.querySelectorAll('tr'));
  const csvLines: string[] = [];

  for (const row of rows) {
    const cols = Array.from(row.querySelectorAll('th, td'));
    const line = cols
      .map((col) => {
        const text = col.textContent?.trim().replace(/"/g, '""') || '';
        return `"${text}"`;
      })
      .join(',');
    csvLines.push(line);
  }

  const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvLines.join('\n'));
  const link = document.createElement('a');
  link.setAttribute('href', csvContent);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
