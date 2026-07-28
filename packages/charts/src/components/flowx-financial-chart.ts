import { FlowXChartBase } from '../chart-infra';

export class FlowXFinancialChart extends FlowXChartBase {
  override renderChart(): void {
    if (!this.shadowRoot) return;

    const candles = (this.chartData as any).candles || [
      { open: 100, high: 112, low: 95, close: 110, volume: 450 },
      { open: 110, high: 115, low: 102, close: 105, volume: 620 },
      { open: 105, high: 120, low: 104, close: 118, volume: 800 },
      { open: 118, high: 125, low: 115, close: 122, volume: 510 },
    ];

    const width = 400;
    const height = 200;
    const padding = 30;
    const chartW = width - padding * 2;
    const chartH = height - padding * 2;
    const maxVal = Math.max(...candles.map((c: any) => c.high));
    const minVal = Math.min(...candles.map((c: any) => c.low));

    const candlesSvg = candles
      .map((c: any, idx: number) => {
        const isBull = c.close >= c.open;
        const color = isBull ? '#3fb950' : '#f85149';
        const x = padding + idx * (chartW / candles.length) + 20;

        const yHigh = height - padding - ((c.high - minVal) / (maxVal - minVal)) * chartH;
        const yLow = height - padding - ((c.low - minVal) / (maxVal - minVal)) * chartH;
        const yOpen = height - padding - ((c.open - minVal) / (maxVal - minVal)) * chartH;
        const yClose = height - padding - ((c.close - minVal) / (maxVal - minVal)) * chartH;

        const candleY = Math.min(yOpen, yClose);
        const candleH = Math.max(3, Math.abs(yOpen - yClose));

        return `
        <line x1="${x}" y1="${yHigh}" x2="${x}" y2="${yLow}" stroke="${color}" stroke-width="1.5" />
        <rect x="${x - 6}" y="${candleY}" width="12" height="${candleH}" fill="${color}" rx="1">
          <title>Open: ${c.open}, High: ${c.high}, Low: ${c.low}, Close: ${c.close}</title>
        </rect>
      `;
      })
      .join('');

    this.generateAccessibilityAttrs(
      'Financial Candlestick Chart',
      `Financial chart showing ${candles.length} candles`,
    );

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; display: block; }
      </style>
      <svg viewBox="0 0 ${width} ${height}">
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="rgba(255,255,255,0.15)" />
        ${candlesSvg}
      </svg>
    `;
  }
}

if (!customElements.get('flowx-financial-chart')) {
  customElements.define('flowx-financial-chart', FlowXFinancialChart);
}
