import { defineFlowXElement } from '../helper';

export const FlowXSpinner = defineFlowXElement('flowx-spinner', {
  observedAttributes: ['size'],
  style: `
    :host {
      display: inline-block;
      vertical-align: middle;
    }
    .spinner {
      border: 3px solid var(--flowx-neutral);
      border-right-color: var(--flowx-primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    
    /* Sizes */
    .spinner.sm {
      width: 16px;
      height: 16px;
      border-width: 2px;
    }
    .spinner.md {
      width: 24px;
      height: 24px;
      border-width: 3px;
    }
    .spinner.lg {
      width: 36px;
      height: 36px;
      border-width: 4px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `,
  template: (el) => {
    const size = el.getAttribute('size') || 'md';
    return `
      <div 
        class="spinner ${size}" 
        role="status" 
        aria-label="Loading"
      ></div>
    `;
  },
});
