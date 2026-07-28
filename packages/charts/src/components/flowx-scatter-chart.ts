import { FlowXChartBase } from '../chart-infra';

export class FlowXScatterChart extends FlowXChartBase {
  override renderChart(): void {
    if (!this.shadowRoot) return;

    const pointsData = (this.chartData as any).points || [
      { x: 10, y: 20 },
      { x: 25, y: 45 },
      { x: 40, y: 30 },
      { x: 55, y: 70 },
      { x: 70, y: 60 },
    ];

    const width = 400;
    const height = 200;
    const padding = 30;

    const dotsSvg = pointsData
      .map((p: any) => {
        const cx = padding + (p.x / 100) * (width - padding * 2);
        const cy = height - padding - (p.y / 100) * (height - padding * 2);
        return `<circle cx="${cx}" cy="${cy}" r="5" fill="#58a6ff"><title>(${p.x}, ${p.y})</title></circle>`;
      })
      .join('');

    this.generateAccessibilityAttrs(
      'Scatter Chart',
      `Scatter plot with ${pointsData.length} data points`,
    );

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; display: block; }
      </style>
      <svg viewBox="0 0 ${width} ${height}">
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="rgba(255,255,255,0.15)" />
        <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="rgba(255,255,255,0.15)" />
        ${dotsSvg}
      </svg>
    `;
  }
}

if (!customElements.get('flowx-scatter-chart')) {
  customElements.define('flowx-scatter-chart', FlowXScatterChart);
}
