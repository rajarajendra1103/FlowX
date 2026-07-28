import { defineFlowXElement } from '../helper';

export const FlowXSkeleton = defineFlowXElement('flowx-skeleton', {
  observedAttributes: ['variant', 'width', 'height'],
  style: `
    :host {
      display: block;
    }
    .skeleton {
      background-color: rgba(240, 246, 252, 0.08);
      animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    /* Shapes */
    .skeleton.text {
      height: 12px;
      margin-top: 4px;
      margin-bottom: 4px;
      border-radius: var(--flowx-radius-sm);
    }
    .skeleton.rect {
      border-radius: var(--flowx-radius-md);
    }
    .skeleton.circle {
      border-radius: var(--flowx-radius-round);
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 0.3; }
    }
  `,
  template: (el) => {
    const variant = el.getAttribute('variant') || 'text';
    const width = el.getAttribute('width') || '100%';
    const height =
      el.getAttribute('height') ||
      (variant === 'circle' ? '40px' : variant === 'rect' ? '100px' : '');

    const styleStr = `width: ${width}; ${height ? `height: ${height};` : ''}`;

    return `
      <div 
        class="skeleton ${variant}" 
        style="${styleStr}"
        role="presentation"
        aria-hidden="true"
      ></div>
    `;
  },
});
