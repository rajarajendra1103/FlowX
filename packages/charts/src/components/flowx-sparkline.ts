import { FlowXChartBase } from '../chart-infra';

export class FlowXSparkline extends FlowXChartBase {
  override renderChart(): void {
    if (!this.shadowRoot) return;

    const values = this.chartData.values || [4, 8, 5, 10, 7, 12, 9, 15];
    const maxVal = Math.max(...values, 1);
    const minVal = Math.min(...values, 0);

    const width = 120;
    const height = 30;

    const points = values
      .map((v, i) => {
        const x = (i / Math.max(1, values.length - 1)) * width;
        const y = height - ((v - minVal) / Math.max(1, maxVal - minVal)) * height;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    this.generateAccessibilityAttrs('Sparkline', `Inline sparkline values ${values.join(', ')}`);

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-block; vertical-align: middle; width: 120px; height: 30px; }
        svg { width: 100%; height: 100%; display: block; }
      </style>
      <svg viewBox="0 0 ${width} ${height}">
        <polyline points="${points}" fill="none" stroke="var(--flowx-primary, #0066cc)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `;
  }
}

if (!customElements.get('flowx-sparkline')) {
  customElements.define('flowx-sparkline', FlowXSparkline);
}
