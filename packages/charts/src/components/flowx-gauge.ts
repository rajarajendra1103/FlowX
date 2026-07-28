import { FlowXChartBase } from '../chart-infra';

export class FlowXGauge extends FlowXChartBase {
  override renderChart(): void {
    if (!this.shadowRoot) return;

    const val = this.chartData.value ?? 72;
    const zones = this.chartData.zones || [
      { min: 0, max: 50, color: '#3fb950' },
      { min: 50, max: 80, color: '#d29922' },
      { min: 80, max: 100, color: '#f85149' },
    ];

    const cx = 100;
    const cy = 100;
    const radius = 70;

    // Find color for current value
    const activeZone = zones.find((z) => val >= z.min && val <= z.max) || zones[zones.length - 1];
    const color = activeZone ? activeZone.color : '#0066cc';

    // Calculate arc angle (180deg semi-circle)
    const angle = (val / 100) * 180;
    const rad = (angle - 180) * (Math.PI / 180);
    const needleX = cx + radius * Math.cos(rad);
    const needleY = cy + radius * Math.sin(rad);

    this.generateAccessibilityAttrs('Gauge', `Gauge reading ${val}%`);

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; max-width: 200px; display: block; margin: 0 auto; }
      </style>
      <svg viewBox="0 0 200 120">
        <!-- Background Track -->
        <path d="M 30,100 A 70,70 0 0,1 170,100" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="14" stroke-linecap="round" />
        <!-- Arc Value Fill -->
        <line x1="${cx}" y1="${cy}" x2="${needleX}" y2="${needleY}" stroke="${color}" stroke-width="4" stroke-linecap="round" />
        <circle cx="${cx}" cy="${cy}" r="6" fill="${color}" />
        <text x="${cx}" y="${cy + 16}" fill="#e6edf3" font-size="18" font-weight="bold" text-anchor="middle">${val}%</text>
      </svg>
    `;
  }
}

if (!customElements.get('flowx-gauge')) {
  customElements.define('flowx-gauge', FlowXGauge);
}
