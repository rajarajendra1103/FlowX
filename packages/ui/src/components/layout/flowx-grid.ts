import { defineFlowXElement } from '../../helper';

export const FlowXGrid = defineFlowXElement('flowx-grid', {
  observedAttributes: ['cols', 'cols-sm', 'cols-md', 'cols-lg', 'gap'],
  style: `
    :host {
      display: block;
      width: 100%;
      container-type: inline-size;
      box-sizing: border-box;
    }
    .grid {
      display: grid;
      width: 100%;
      box-sizing: border-box;
      grid-template-columns: repeat(var(--cols-base, 1), minmax(0, 1fr));
      gap: var(--grid-gap, var(--flowx-space-4, 16px));
    }

    @container (min-width: 480px) {
      .grid {
        grid-template-columns: repeat(var(--cols-sm, var(--cols-base, 1)), minmax(0, 1fr));
      }
    }

    @container (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(var(--cols-md, var(--cols-sm, var(--cols-base, 1))), minmax(0, 1fr));
      }
    }

    @container (min-width: 1024px) {
      .grid {
        grid-template-columns: repeat(var(--cols-lg, var(--cols-md, var(--cols-sm, var(--cols-base, 1)))), minmax(0, 1fr));
      }
    }
  `,
  template: (el) => {
    const cols = el.getAttribute('cols') || '1';
    const colsSm = el.getAttribute('cols-sm') || cols;
    const colsMd = el.getAttribute('cols-md') || colsSm;
    const colsLg = el.getAttribute('cols-lg') || colsMd;
    const gap = el.getAttribute('gap') || '4';

    const gapVal = `var(--flowx-space-${gap}, 16px)`;

    return `
      <div 
        class="grid" 
        style="--cols-base: ${cols}; --cols-sm: ${colsSm}; --cols-md: ${colsMd}; --cols-lg: ${colsLg}; --grid-gap: ${gapVal};"
      >
        <slot></slot>
      </div>
    `;
  },
});
