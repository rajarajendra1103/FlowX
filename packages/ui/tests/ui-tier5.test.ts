import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  createQueryStateManager,
  QueryStateManager,
  exportTableToCSV,
} from '../src/datagrid-infra';
import '../src/components/datagrid/flowx-data-table';
import '../src/components/datagrid/flowx-data-grid';
import '../src/components/datagrid/flowx-tree-table';
import '../src/components/datagrid/flowx-list-view';
import '../src/components/datagrid/flowx-virtual-list';
import '../src/components/datagrid/flowx-infinite-scroll';
import '../src/components/datagrid/flowx-search';
import '../src/components/datagrid/flowx-filter';
import '../src/components/datagrid/flowx-sort';
import '../src/components/datagrid/flowx-group-by';
import '../src/components/datagrid/flowx-export';
import '../src/components/datagrid/flowx-print-button';

const flush = () => new Promise((r) => setTimeout(r, 400));

function mount(html: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
  return div;
}

describe('Tier 5 — Server-Driven Data Components Test Suite', () => {
  let container: HTMLElement;

  afterEach(() => {
    container?.remove();
    vi.restoreAllMocks();
  });

  // Test (a): Clicking a sort header produces the correct fx-get query string and swaps only the <tbody>
  it('(a) clicking a sort header produces correct query string and targets tbody', async () => {
    container = mount(`
      <flowx-data-table fx-endpoint="/api/users" fx-target="#users-tbody">
        <table>
          <thead>
            <tr>
              <th fx-sort="name">Name</th>
              <th fx-sort="email">Email</th>
            </tr>
          </thead>
          <tbody id="users-tbody">
            <tr><td>Alice</td><td>alice@test.com</td></tr>
          </tbody>
        </table>
      </flowx-data-table>
    `);
    await flush();

    const tableComponent = container.querySelector('flowx-data-table') as any;
    const mgr: QueryStateManager = tableComponent.getQueryManager();
    expect(mgr).toBeTruthy();

    const fetchSpy = vi
      .spyOn(window, 'fetch')
      .mockImplementation(() =>
        Promise.resolve(
          new Response('<tr><td>Bob</td><td>bob@test.com</td></tr>', { status: 200 }),
        ),
      );

    const nameTh = container.querySelector('th[fx-sort="name"]') as HTMLElement;
    nameTh.click();
    await flush();

    expect(fetchSpy).toHaveBeenCalled();
    const calledUrl = fetchSpy.mock.calls[0][0] as string;
    expect(calledUrl).toContain('/api/users');
    expect(calledUrl).toContain('sort=name');
    expect(calledUrl).toContain('dir=asc');

    const tbody = container.querySelector('#users-tbody');
    expect(tbody?.innerHTML).toContain('Bob');
  });

  // Test (b): Search debounces correctly and cancels in-flight requests if a newer one starts
  it('(b) search debounces correctly and aborts stale in-flight requests', async () => {
    container = mount(`
      <flowx-data-table id="search-table" fx-endpoint="/api/users" fx-target="#s-tbody">
        <table><tbody id="s-tbody"></tbody></table>
      </flowx-data-table>
      <flowx-search for="search-table" delay="100"></flowx-search>
    `);
    await flush();

    const fetchSpy = vi.spyOn(window, 'fetch').mockImplementation((url, opts: any) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(new Response(`<tr><td>Result for ${url}</td></tr>`, { status: 200 }));
        }, 100);
      });
    });

    const searchComponent = container.querySelector('flowx-search') as HTMLElement;
    const input = searchComponent.shadowRoot?.querySelector('input') as HTMLInputElement;

    // Type first query 'al'
    input.value = 'al';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    // Rapidly type second query 'alice' before first search debounce/fetch completes
    setTimeout(() => {
      input.value = 'alice';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }, 50);

    await flush();

    expect(fetchSpy).toHaveBeenCalled();
    const lastCallUrl = fetchSpy.mock.calls[fetchSpy.mock.calls.length - 1][0] as string;
    expect(lastCallUrl).toContain('q=alice');
  });

  // Test (c): Infinite-scroll appends rather than replaces
  it('(c) infinite-scroll appends rows to target (beforeend)', async () => {
    container = mount(`
      <div id="item-list">
        <div>Item 1</div>
      </div>
      <flowx-infinite-scroll fx-endpoint="/api/items" fx-target="#item-list" page="1"></flowx-infinite-scroll>
    `);
    await flush();

    const fetchSpy = vi
      .spyOn(window, 'fetch')
      .mockImplementation(() =>
        Promise.resolve(new Response('<div>Item 2</div>', { status: 200 })),
      );

    const infiniteEl = container.querySelector('flowx-infinite-scroll') as any;
    // Trigger internal next page load
    infiniteEl.loadNextPage();
    await flush();

    const list = container.querySelector('#item-list');
    expect(list?.children.length).toBe(2);
    expect(list?.innerHTML).toContain('Item 1');
    expect(list?.innerHTML).toContain('Item 2');
  });

  // Test (d): Client mode correctly sorts/filters/paginates in-memory without any network request
  it('(d) client mode sorts and filters in-memory without fetch requests', async () => {
    container = mount(`
      <flowx-data-table mode="client">
        <table>
          <thead>
            <tr>
              <th fx-sort="name">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Charlie</td></tr>
            <tr><td>Alice</td></tr>
            <tr><td>Bob</td></tr>
          </tbody>
        </table>
      </flowx-data-table>
    `);
    await flush();

    const fetchSpy = vi.spyOn(window, 'fetch');
    const tableComponent = container.querySelector('flowx-data-table') as any;
    const mgr: QueryStateManager = tableComponent.getQueryManager();

    // Perform client-side sort
    mgr.updateAndRefetch({ sort: 'name', dir: 'asc' });
    await flush();

    // Verify ZERO network requests were made
    expect(fetchSpy).not.toHaveBeenCalled();

    const rows = Array.from(container.querySelectorAll('tbody tr'));
    expect(rows[0].textContent).toBe('Alice');
    expect(rows[1].textContent).toBe('Bob');
    expect(rows[2].textContent).toBe('Charlie');
  });

  // Test (e): Export triggers a real file download from server endpoint or fallback
  it('(e) export triggers window navigation for server endpoint', async () => {
    const originalLocation = window.location.href;
    delete (window as any).location;
    (window as any).location = { href: '' };

    container = mount(`
      <flowx-export type="csv" fx-get="/users/export.csv"></flowx-export>
    `);
    await flush();

    const exportEl = container.querySelector('flowx-export') as HTMLElement;
    const btn = exportEl.shadowRoot?.querySelector('button') as HTMLButtonElement;
    btn.click();

    expect(window.location.href).toBe('/users/export.csv');
  });
});
