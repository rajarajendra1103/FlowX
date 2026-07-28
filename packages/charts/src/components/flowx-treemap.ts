import { FlowXChartBase } from '../chart-infra';

export class FlowXTreemap extends FlowXChartBase {
  override renderChart(): void {
    if (!this.shadowRoot) return;

    const items = (this.chartData as any).tiles || [
      { name: 'Core', value: 45, color: '#0066cc' },
      { name: 'UI', value: 30, color: '#3fb950' },
      { name: 'Docs', value: 15, color: '#db6d28' },
      { name: 'Utils', value: 10, color: '#a371f7' },
    ];

    const width = 400;
    const height = 200;
    let currX = 0;

    const tilesSvg = items
      .map((tile: any) => {
        const tileW = (tile.value / 100) * width;
        const x = currX;
        currX += tileW;
        return `
        <rect x="${x}" y="0" width="${tileW - 2}" height="${height}" fill="${tile.color || '#0066cc'}" rx="4">
          <title>${tile.name}: ${tile.value}%</title>
        </rect>
        <text x="${x + tileW / 2}" y="${height / 2}" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">${tile.name}</text>
      `;
      })
      .join('');

    this.generateAccessibilityAttrs('Treemap', `Treemap layout with ${items.length} tiles`);

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: system-ui, sans-serif; width: 100%; }
        svg { width: 100%; height: auto; display: block; }
      </style>
      <svg viewBox="0 0 ${width} ${height}">
        ${tilesSvg}
      </svg>
    `;
  }
}

if (!customElements.get('flowx-treemap')) {
  customElements.define('flowx-treemap', FlowXTreemap);
}
