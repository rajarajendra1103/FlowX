import { FlowXPieChart } from './flowx-pie-chart';

export class FlowXDonutChart extends FlowXPieChart {
  override renderChart(): void {
    if (!this.shadowRoot) return;

    const series = this.chartData.series || [
      { name: 'Mobile', value: 60, color: '#1f6feb' },
      { name: 'Desktop', value: 40, color: '#3fb950' },
    ];

    const total = series.reduce((sum, item) => sum + item.value, 0) || 1;
    let startAngle = 0;

    const slicesSvg = series
      .map((item) => {
        const angle = (item.value / total) * 360;
        const endAngle = startAngle + angle;
        const pathData = this.getSectorPath(100, 100, 80, startAngle, endAngle);
        startAngle = endAngle;

        return `<path d="${pathData}" fill="${item.color || '#1f6feb'}"><title>${item.name}: ${item.value}</title></path>`;
      })
      .join('');

    this.generateAccessibilityAttrs('Donut Chart', `Donut chart total ${total}`);

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; max-width: 240px; display: block; margin: 0 auto; }
      </style>
      <svg viewBox="0 0 200 200">
        ${slicesSvg}
        <circle cx="100" cy="100" r="50" fill="#161b22" />
        <text x="100" y="105" fill="#e6edf3" font-size="16" font-weight="bold" text-anchor="middle">${total}</text>
      </svg>
    `;
  }
}

if (!customElements.get('flowx-donut-chart')) {
  customElements.define('flowx-donut-chart', FlowXDonutChart);
}
