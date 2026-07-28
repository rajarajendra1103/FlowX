import { FlowXChartBase } from '../chart-infra';

export class FlowXAreaChart extends FlowXChartBase {
  override renderChart(): void {
    if (!this.shadowRoot) return;

    const dataset = this.chartData.datasets?.[0] || { data: [5, 15, 25, 20, 35], color: '#58a6ff' };
    const values = dataset.data || [];
    const maxVal = Math.max(...values, 1);
    const color = dataset.color || '#58a6ff';

    const width = 400;
    const height = 200;
    const padding = 30;
    const chartW = width - padding * 2;
    const chartH = height - padding * 2;

    const points = values.map((val, idx) => {
      const x = padding + (idx / Math.max(1, values.length - 1)) * chartW;
      const y = height - padding - (val / maxVal) * chartH;
      return { x, y };
    });

    const areaPathStr = `
      M ${padding},${height - padding}
      ${points.map((p) => `L ${p.x},${p.y}`).join(' ')}
      L ${width - padding},${height - padding} Z
    `;

    this.generateAccessibilityAttrs('Area Chart', `Area chart with values ${values.join(', ')}`);

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; display: block; }
      </style>
      <svg viewBox="0 0 ${width} ${height}">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.4" />
            <stop offset="100%" stop-color="${color}" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <path d="${areaPathStr}" fill="url(#areaGrad)" />
        <polyline points="${points.map((p) => `${p.x},${p.y}`).join(' ')}" fill="none" stroke="${color}" stroke-width="2.5" />
      </svg>
    `;
  }
}

if (!customElements.get('flowx-area-chart')) {
  customElements.define('flowx-area-chart', FlowXAreaChart);
}
