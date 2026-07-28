import { defineFlowXElement } from '../helper';

export const FlowXBadge = defineFlowXElement('flowx-badge', {
  observedAttributes: ['variant', 'size'],
  style: `
    :host {
      display: inline-block;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--flowx-font-family);
      font-weight: 700;
      line-height: 1;
      border-radius: var(--flowx-radius-round);
      text-transform: uppercase;
    }
    
    /* Sizes */
    .badge.sm {
      padding: 3px 6px;
      font-size: 9px;
    }
    .badge.md {
      padding: 4px 8px;
      font-size: 11px;
    }
    
    /* Variants */
    .badge.neutral {
      background-color: var(--flowx-neutral);
      color: #475569;
    }
    .badge.info {
      background-color: rgba(23, 162, 184, 0.15);
      color: var(--flowx-info);
      border: 1px solid rgba(23, 162, 184, 0.2);
    }
    .badge.success {
      background-color: rgba(40, 167, 69, 0.15);
      color: var(--flowx-success);
      border: 1px solid rgba(40, 167, 69, 0.2);
    }
    .badge.warning {
      background-color: rgba(255, 193, 7, 0.15);
      color: #b28600;
      border: 1px solid rgba(255, 193, 7, 0.2);
    }
    .badge.error {
      background-color: rgba(220, 53, 69, 0.15);
      color: var(--flowx-error);
      border: 1px solid rgba(220, 53, 69, 0.2);
    }
  `,
  template: (el) => {
    const variant = el.getAttribute('variant') || 'neutral';
    const size = el.getAttribute('size') || 'md';

    return `
      <span class="badge ${variant} ${size}">
        <slot></slot>
      </span>
    `;
  },
});
