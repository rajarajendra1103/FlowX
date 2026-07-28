import { FlowXChartBase } from '../chart-infra';

export class FlowXRadarChart extends FlowXChartBase {
  override renderChart(): void {
    if (!this.shadowRoot) return;

    const values = this.chartData.values || [80, 65, 90, 75, 85];
    const labels = this.chartData.labels || ['Speed', 'Power', 'Agility', 'Stamina', 'Skill'];
    const maxVal = 100;
    const numAxes = values.length;
    const cx = 120;
    const cy = 120;
    const radius = 80;

    const points = values.map((val, idx) => {
      const angle = (idx / numAxes) * (Math.PI * 2) - Math.PI / 2;
      const r = (val / maxVal) * radius;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    });

    const polygonStr = points.map((p) => `${p.x},${p.y}`).join(' ');

    this.generateAccessibilityAttrs('Radar Chart', `Radar chart with scores ${values.join(', ')}`);

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; max-width: 260px; display: block; margin: 0 auto; }
      </style>
      <svg viewBox="0 0 240 240">
        <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-dasharray="4,4" />
        <circle cx="${cx}" cy="${cy}" r="${radius * 0.5}" fill="none" stroke="rgba(255,255,255,0.1)" />
        <polygon points="${polygonStr}" fill="rgba(0,102,204,0.35)" stroke="#0066cc" stroke-width="2" />
      </svg>
    `;
  }
}

if (!customElements.get('flowx-radar-chart')) {
  customElements.define('flowx-radar-chart', FlowXRadarChart);
}
