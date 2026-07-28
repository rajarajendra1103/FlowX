import { FlowXChartBase } from '../chart-infra';

export class FlowXHeatmap extends FlowXChartBase {
  override renderChart(): void {
    if (!this.shadowRoot) return;

    const matrix = (this.chartData as any).matrix || [
      [1, 3, 5, 2, 4],
      [2, 5, 8, 4, 3],
      [4, 7, 9, 6, 2],
    ];

    const rows = matrix.length;
    const cols = matrix[0]?.length || 1;
    const cellW = 50;
    const cellH = 30;
    const width = cols * cellW + 10;
    const height = rows * cellH + 10;

    let cellsSvg = '';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const val = matrix[r][c];
        const opacity = val / 10;
        cellsSvg += `
          <rect x="${c * cellW + 5}" y="${r * cellH + 5}" width="${cellW - 2}" height="${cellH - 2}" 
            fill="#0066cc" opacity="${Math.max(0.1, opacity)}" rx="3">
            <title>Value: ${val}</title>
          </rect>
        `;
      }
    }

    this.generateAccessibilityAttrs('Heatmap', `Heatmap grid ${rows}x${cols}`);

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; max-width: 320px; display: block; }
      </style>
      <svg viewBox="0 0 ${width} ${height}">
        ${cellsSvg}
      </svg>
    `;
  }
}

if (!customElements.get('flowx-heatmap')) {
  customElements.define('flowx-heatmap', FlowXHeatmap);
}
