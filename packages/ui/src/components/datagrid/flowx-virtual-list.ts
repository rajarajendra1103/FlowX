import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-virtual-list>
 *
 * Client-side-only windowed list rendering component for large in-memory datasets.
 * Computes visible range based on scroll offset and itemHeight, creating DOM elements
 * only for currently visible items.
 */
export class FlowXVirtualList extends HTMLElement {
  private items: any[] = [];
  private itemHeight: number = 40;
  private renderItemFn: ((item: any, index: number) => string) | null = null;
  private viewport: HTMLElement | null = null;
  private content: HTMLElement | null = null;

  static get observedAttributes() {
    return ['item-height'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.itemHeight = parseInt(this.getAttribute('item-height') || '40', 10);
    this.render();
  }

  attributeChangedCallback() {
    this.itemHeight = parseInt(this.getAttribute('item-height') || '40', 10);
    this.updateVirtualWindow();
  }

  public setData(items: any[], renderItem: (item: any, index: number) => string) {
    this.items = items;
    this.renderItemFn = renderItem;
    this.updateVirtualWindow();
  }

  private updateVirtualWindow() {
    if (!this.viewport || !this.content || !this.renderItemFn || this.items.length === 0) return;

    const scrollTop = this.viewport.scrollTop;
    const viewportHeight = this.viewport.clientHeight || 300;

    const startIndex = Math.max(0, Math.floor(scrollTop / this.itemHeight) - 2);
    const endIndex = Math.min(
      this.items.length,
      Math.ceil((scrollTop + viewportHeight) / this.itemHeight) + 2,
    );

    const totalHeight = this.items.length * this.itemHeight;
    const offsetY = startIndex * this.itemHeight;

    const visibleItems = this.items.slice(startIndex, endIndex);
    const visibleHtml = visibleItems
      .map(
        (item, idx) => `
      <div class="virtual-item" style="height: ${this.itemHeight}px; line-height: ${this.itemHeight}px;">
        ${this.renderItemFn!(item, startIndex + idx)}
      </div>
    `,
      )
      .join('');

    this.content.style.height = `${totalHeight}px`;
    this.content.style.paddingTop = `${offsetY}px`;
    this.content.style.boxSizing = 'border-box';
    this.content.innerHTML = visibleHtml;
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: block; font-family: var(--flowx-font-family); width: 100%; }
        .virtual-viewport {
          height: 100%; max-height: 400px; overflow-y: auto;
          background: #0d1117; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); position: relative;
        }
        .virtual-content { width: 100%; }
        .virtual-item {
          border-bottom: 1px solid rgba(255,255,255,0.06); padding: 0 12px;
          color: #e6edf3; font-size: 13px;
        }
      </style>
      <div class="virtual-viewport">
        <div class="virtual-content"></div>
      </div>
    `;

    this.viewport = this.shadowRoot.querySelector('.virtual-viewport');
    this.content = this.shadowRoot.querySelector('.virtual-content');

    this.viewport?.addEventListener('scroll', () => this.updateVirtualWindow());
  }
}

if (!customElements.get('flowx-virtual-list')) {
  customElements.define('flowx-virtual-list', FlowXVirtualList);
}
