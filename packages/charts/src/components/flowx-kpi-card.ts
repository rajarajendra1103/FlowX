import { FlowXChartBase } from '../chart-infra';

export class FlowXKpiCard extends FlowXChartBase {
  override renderChart(): void {
    if (!this.shadowRoot) return;

    const label = this.getAttribute('label') || this.chartData.labels?.[0] || 'Metric';
    const value = this.chartData.value ?? 12840;
    const change = this.chartData.change ?? 12.5;

    const isPositive = change >= 0;
    const trendColor = isPositive ? '#3fb950' : '#f85149';
    const trendArrow = isPositive ? '↑' : '↓';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: system-ui, sans-serif; }
        .kpi-card {
          background: #161b22; border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 16px; box-sizing: border-box;
        }
        .label { font-size: 12px; color: #8b949e; margin-bottom: 6px; }
        .val-row { display: flex; align-items: baseline; justify-content: space-between; }
        .value { font-size: 24px; font-weight: 700; color: #e6edf3; }
        .trend { font-size: 12px; font-weight: 600; color: ${trendColor}; display: flex; align-items: center; gap: 2px; }
      </style>
      <div class="kpi-card">
        <div class="label">${label}</div>
        <div class="val-row">
          <div class="value">${typeof value === 'number' ? value.toLocaleString() : value}</div>
          <div class="trend">${trendArrow} ${Math.abs(change)}%</div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('flowx-kpi-card')) {
  customElements.define('flowx-kpi-card', FlowXKpiCard);
}
