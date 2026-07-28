import { FlowXChartBase } from '../chart-infra';

export class FlowXLineChart extends FlowXChartBase {
  override renderChart(): void {
    if (!this.shadowRoot) return;

    const labels = this.chartData.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const dataset = this.chartData.datasets?.[0] || {
      data: [10, 25, 18, 30, 42],
      color: '#3fb950',
    };
    const values = dataset.data || [];
    const maxVal = Math.max(...values, 1);
    const color = dataset.color || 'var(--flowx-success, #3fb950)';

    const width = 400;
    const height = 200;
    const padding = 30;
    const chartW = width - padding * 2;
    const chartH = height - padding * 2;

    const points = values.map((val, idx) => {
      const x = padding + (idx / Math.max(1, values.length - 1)) * chartW;
      const y = height - padding - (val / maxVal) * chartH;
      return { x, y, val, label: labels[idx] };
    });

    const pointsStr = points.map((p) => `${p.x},${p.y}`).join(' ');
    const dotsSvg = points
      .map(
        (p) => `
      <circle cx="${p.x}" cy="${p.y}" r="4" fill="${color}">
        <title>${p.label || ''}: ${p.val}</title>
      </circle>
    `,
      )
      .join('');

    const summaryText = `Line chart showing trend values ${values.join(', ')}`;
    this.generateAccessibilityAttrs('Line Chart', summaryText);

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; display: block; }
      </style>
      <svg viewBox="0 0 ${width} ${height}">
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="rgba(255,255,255,0.15)" />
        <polyline points="${pointsStr}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        ${dotsSvg}
      </svg>
    `;
  }
}

if (!customElements.get('flowx-line-chart')) {
  customElements.define('flowx-line-chart', FlowXLineChart);
}
