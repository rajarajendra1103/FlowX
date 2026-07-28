import { FlowXChartBase } from '../chart-infra';

export class FlowXBubbleChart extends FlowXChartBase {
  override renderChart(): void {
    if (!this.shadowRoot) return;

    const bubbles = (this.chartData as any).bubbles || [
      { x: 15, y: 30, r: 12, color: '#0066cc' },
      { x: 35, y: 65, r: 22, color: '#3fb950' },
      { x: 60, y: 40, r: 16, color: '#db6d28' },
      { x: 80, y: 75, r: 28, color: '#a371f7' },
    ];

    const width = 400;
    const height = 200;
    const padding = 30;

    const bubblesSvg = bubbles
      .map((b: any) => {
        const cx = padding + (b.x / 100) * (width - padding * 2);
        const cy = height - padding - (b.y / 100) * (height - padding * 2);
        return `<circle cx="${cx}" cy="${cy}" r="${b.r}" fill="${b.color || '#0066cc'}" opacity="0.75"><title>Value: ${b.r}</title></circle>`;
      })
      .join('');

    this.generateAccessibilityAttrs('Bubble Chart', `Bubble plot with ${bubbles.length} bubbles`);

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; display: block; }
      </style>
      <svg viewBox="0 0 ${width} ${height}">
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="rgba(255,255,255,0.15)" />
        ${bubblesSvg}
      </svg>
    `;
  }
}

if (!customElements.get('flowx-bubble-chart')) {
  customElements.define('flowx-bubble-chart', FlowXBubbleChart);
}
