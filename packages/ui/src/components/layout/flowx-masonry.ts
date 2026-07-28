import { defineFlowXElement } from '../../helper';

export const FlowXMasonry = defineFlowXElement('flowx-masonry', {
  observedAttributes: ['cols', 'gap'],
  style: `
    :host {
      display: block;
      width: 100%;
      container-type: inline-size;
      box-sizing: border-box;
    }
    .masonry-wrapper {
      display: grid;
      width: 100%;
      grid-template-columns: repeat(var(--masonry-cols, 3), minmax(0, 1fr));
      grid-template-rows: masonry;
      gap: var(--masonry-gap, var(--flowx-space-4, 16px));
      background-color: var(--flowx-bg-base, #f8fafc);
      box-sizing: border-box;
      position: relative;
    }
    .masonry-fallback {
      position: relative;
      width: 100%;
    }
  `,
  template: (el) => {
    const cols = el.getAttribute('cols') || '3';
    const gap = el.getAttribute('gap') || '4';
    const gapCss = `var(--flowx-space-${gap}, 16px)`;

    return `
      <div class="masonry-wrapper" style="--masonry-cols: ${cols}; --masonry-gap: ${gapCss};">
        <slot></slot>
      </div>
    `;
  },
  setup: (el) => {
    // JS layout fallback for browsers lacking native CSS grid masonry support
    const wrapper = (el.shadowRoot || el).querySelector('.masonry-wrapper') as HTMLElement;
    if (!wrapper) return;

    const supportsNativeMasonry =
      typeof CSS !== 'undefined' &&
      CSS.supports &&
      (CSS.supports('grid-template-rows', 'masonry') || CSS.supports('grid-rows', 'masonry'));

    if (!supportsNativeMasonry) {
      const layoutMasonry = () => {
        const slot = wrapper.querySelector('slot');
        const items = slot ? slot.assignedElements() : Array.from(wrapper.children);
        if (!items.length) return;

        const cols = parseInt(el.getAttribute('cols') || '3', 10);
        const gapNum = parseInt(el.getAttribute('gap') || '4', 10) * 4;
        const containerW = wrapper.getBoundingClientRect().width || 800;
        const colW = (containerW - gapNum * (cols - 1)) / cols;

        const columnHeights = new Array(cols).fill(0);

        items.forEach((item: Element) => {
          const htmlItem = item as HTMLElement;
          // Find shortest column
          let minCol = 0;
          for (let i = 1; i < cols; i++) {
            if (columnHeights[i] < columnHeights[minCol]) minCol = i;
          }

          const left = minCol * (colW + gapNum);
          const top = columnHeights[minCol];

          htmlItem.style.position = 'absolute';
          htmlItem.style.width = `${colW}px`;
          htmlItem.style.left = `${left}px`;
          htmlItem.style.top = `${top}px`;

          const h = htmlItem.getBoundingClientRect().height || 100;
          columnHeights[minCol] += h + gapNum;
        });

        wrapper.style.height = `${Math.max(...columnHeights)}px`;
        wrapper.style.display = 'block';
      };

      setTimeout(layoutMasonry, 50);
      if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(layoutMasonry).observe(el);
      }
    }
  },
});
