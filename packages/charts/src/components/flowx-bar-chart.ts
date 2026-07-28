import { FlowXChartBase } from '../chart-infra';

export class FlowXBarChart extends FlowXChartBase {
  override renderChart(): void {
    if (!this.shadowRoot) return;

    const labels = this.chartData.labels || ['A', 'B', 'C', 'D', 'E'];
    const dataset = this.chartData.datasets?.[0] || { data: [12, 19, 3, 5, 2], color: '#0066cc' };
    const values = dataset.data || [];
    const maxVal = Math.max(...values, 1);
    const color = dataset.color || 'var(--flowx-primary, #0066cc)';

    const width = 400;
    const height = 200;
    const padding = 30;
    const chartW = width - padding * 2;
    const chartH = height - padding * 2;
    const barWidth = Math.max(12, chartW / values.length - 8);

    const barsSvg = values
      .map((val, idx) => {
        const h = (val / maxVal) * chartH;
        const x = padding + idx * (chartW / values.length) + 4;
        const y = height - padding - h;
        return `
        <rect x="${x}" y="${y}" width="${barWidth}" height="${h}" fill="${color}" rx="3">
          <title>${labels[idx] || ''}: ${val}</title>
        </rect>
        <text x="${x + barWidth / 2}" y="${height - 10}" fill="#8b949e" font-size="10" text-anchor="middle">${labels[idx] || ''}</text>
      `;
      })
      .join('');

    const summaryText = `Bar chart titled ${dataset.label || 'Data'} showing values ${values.join(', ')}`;
    this.generateAccessibilityAttrs('Bar Chart', summaryText);

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; display: block; }
      </style>
      <svg viewBox="0 0 ${width} ${height}">
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
        ${barsSvg}
      </svg>
    `;
  }
}

if (!customElements.get('flowx-bar-chart')) {
  customElements.define('flowx-bar-chart', FlowXBarChart);
}
