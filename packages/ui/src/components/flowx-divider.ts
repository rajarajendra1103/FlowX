import { defineFlowXElement } from '../helper';

export const FlowXDivider = defineFlowXElement('flowx-divider', {
  observedAttributes: ['orientation'],
  style: `
    :host {
      display: block;
    }
    .divider {
      background-color: rgba(240, 246, 252, 0.15);
      border: none;
      margin: 0;
      padding: 0;
    }
    .divider.horizontal {
      height: 1px;
      width: 100%;
      margin: var(--flowx-spacing-md) 0;
    }
    .divider.vertical {
      width: 1px;
      height: 100%;
      margin: 0 var(--flowx-spacing-md);
      display: inline-block;
      align-self: stretch;
    }
  `,
  template: (el) => {
    const orientation = el.getAttribute('orientation') || 'horizontal';
    return `
      <hr 
        class="divider ${orientation}" 
        role="separator" 
        aria-orientation="${orientation}"
      />
    `;
  },
});
