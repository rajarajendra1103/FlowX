import { defineFlowXElement } from '../../helper';

export const FlowXContainer = defineFlowXElement('flowx-container', {
  observedAttributes: ['size', 'centered'],
  style: `
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
    .container {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      padding-left: var(--flowx-space-4, 16px);
      padding-right: var(--flowx-space-4, 16px);
      background-color: var(--flowx-bg-base, #f8fafc);
      color: var(--flowx-color-text, #0f172a);
      box-sizing: border-box;
      transition: background-color var(--flowx-transition-base), color var(--flowx-transition-base);
    }
    .container.size-xs { max-width: 480px; }
    .container.size-sm { max-width: 640px; }
    .container.size-md { max-width: 768px; }
    .container.size-lg { max-width: 1024px; }
    .container.size-xl { max-width: 1280px; }
    .container.size-full { max-width: 100%; }

    @container (min-width: 640px) {
      .container {
        padding-left: var(--flowx-space-6, 24px);
        padding-right: var(--flowx-space-6, 24px);
      }
    }
  `,
  template: (el) => {
    const size = el.getAttribute('size') || 'lg';
    return `<div class="container size-${size}"><slot></slot></div>`;
  },
});
