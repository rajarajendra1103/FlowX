import { FlowXChartBase } from '../chart-infra';

export class FlowXPieChart extends FlowXChartBase {
  override renderChart(): void {
    if (!this.shadowRoot) return;

    const series = this.chartData.series || [
      { name: 'Direct', value: 40, color: '#0066cc' },
      { name: 'Organic', value: 35, color: '#2ea043' },
      { name: 'Referral', value: 25, color: '#db6d28' },
    ];

    const total = series.reduce((sum, item) => sum + item.value, 0) || 1;
    let startAngle = 0;

    const slicesSvg = series
      .map((item) => {
        const angle = (item.value / total) * 360;
        const endAngle = startAngle + angle;
        const pathData = this.getSectorPath(100, 100, 80, startAngle, endAngle);
        startAngle = endAngle;

        return `<path d="${pathData}" fill="${item.color || '#0066cc'}"><title>${item.name}: ${item.value}</title></path>`;
      })
      .join('');

    this.generateAccessibilityAttrs(
      'Pie Chart',
      `Pie chart showing ${series.map((s) => `${s.name}: ${s.value}`).join(', ')}`,
    );

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; max-width: 240px; display: block; margin: 0 auto; }
      </style>
      <svg viewBox="0 0 200 200">
        ${slicesSvg}
      </svg>
    `;
  }

  protected getSectorPath(
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number,
  ): string {
    const rad = (deg: number) => (deg - 90) * (Math.PI / 180);
    const x1 = cx + r * Math.cos(rad(startAngle));
    const y1 = cy + r * Math.sin(rad(startAngle));
    const x2 = cx + r * Math.cos(rad(endAngle));
    const y2 = cy + r * Math.sin(rad(endAngle));
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${cx},${cy} L ${x1},${y1} A ${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;
  }
}

if (!customElements.get('flowx-pie-chart')) {
  customElements.define('flowx-pie-chart', FlowXPieChart);
}
