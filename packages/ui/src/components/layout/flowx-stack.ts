import { defineFlowXElement } from '../../helper';

export const FlowXStack = defineFlowXElement('flowx-stack', {
  observedAttributes: ['direction', 'gap', 'align', 'justify', 'wrap'],
  style: `
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
    .stack {
      display: flex;
      box-sizing: border-box;
      width: 100%;
    }
  `,
  template: (el) => {
    const direction = el.getAttribute('direction') || 'column';
    const gap = el.getAttribute('gap') || '3';
    const align = el.getAttribute('align') || 'stretch';
    const justify = el.getAttribute('justify') || 'flex-start';
    const isWrap = el.hasAttribute('wrap');

    const gapCss = `var(--flowx-space-${gap}, 12px)`;
    const alignMap: Record<string, string> = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      stretch: 'stretch',
      baseline: 'baseline',
    };
    const justifyMap: Record<string, string> = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    };

    const alignCss = alignMap[align] || align;
    const justifyCss = justifyMap[justify] || justify;

    return `
      <div 
        class="stack" 
        style="
          flex-direction: ${direction}; 
          gap: ${gapCss}; 
          align-items: ${alignCss}; 
          justify-content: ${justifyCss};
          flex-wrap: ${isWrap ? 'wrap' : 'nowrap'};
        "
      >
        <slot></slot>
      </div>
    `;
  },
});
