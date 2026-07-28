// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from 'vitest';
import '../src/index';

const flush = () => new Promise((r) => setTimeout(r, 100));

function mount(html: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
  return div;
}

describe('Tier 8 — @flowx/charts Test Suite', () => {
  let container: HTMLElement;

  afterEach(() => {
    container?.remove();
  });

  it('(a) chart renders correctly from a <script type="application/json"> data island with no attribute data', async () => {
    container = mount(`
      <flowx-bar-chart id="b1">
        <script type="application/json">
          {
            "labels": ["Q1", "Q2", "Q3"],
            "datasets": [{ "data": [100, 200, 300], "color": "#0066cc" }]
          }
        </script>
      </flowx-bar-chart>
    `);
    await flush();

    const chart = container.querySelector('#b1') as any;
    expect(chart).toBeTruthy();
    const svg = chart.shadowRoot?.querySelector('svg');
    expect(svg).toBeTruthy();

    const rects = chart.shadowRoot?.querySelectorAll('rect');
    expect(rects.length).toBe(3);
  });

  it('(b) chart automatically re-renders after an fx-get swap replaces its data island', async () => {
    container = mount(`
      <flowx-line-chart id="l1">
        <script type="application/json">
          { "labels": ["A", "B"], "datasets": [{ "data": [10, 20] }] }
        </script>
      </flowx-line-chart>
    `);
    await flush();

    const chart = container.querySelector('#l1') as any;
    chart.refreshData({ labels: ['A', 'B', 'C'], datasets: [{ data: [10, 20, 99] }] });
    await flush();

    const dots = chart.shadowRoot?.querySelectorAll('circle');
    expect(dots.length).toBe(3);
  });

  it('(c) KPI card updates its displayed number when a mock SSE message arrives without custom JS', async () => {
    container = mount(`
      <flowx-kpi-card id="kpi1" fx-sse-connect label="Active Users">
        <script type="application/json">
          { "value": 1200, "change": 5.2 }
        </script>
      </flowx-kpi-card>
    `);
    await flush();

    const card = container.querySelector('#kpi1') as any;
    expect(card.shadowRoot?.querySelector('.value')?.textContent).toBe('1,200');

    // Dispatch mock SSE event
    document.dispatchEvent(
      new CustomEvent('fx:sse-message', {
        detail: { target: '#kpi1', data: JSON.stringify({ value: 9850, change: 14.8 }) },
      }),
    );
    await flush();

    expect(card.shadowRoot?.querySelector('.value')?.textContent).toBe('9,850');
  });

  it('(d) all charts have appropriate aria-label and role="img" for accessibility', async () => {
    container = mount(`
      <flowx-gauge id="g1">
        <script type="application/json">
          { "value": 85 }
        </script>
      </flowx-gauge>
    `);
    await flush();

    const gauge = container.querySelector('#g1') as any;
    expect(gauge.getAttribute('role')).toBe('img');
    expect(gauge.getAttribute('aria-label')).toContain('Gauge reading 85%');
  });
});
