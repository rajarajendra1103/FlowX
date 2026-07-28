import { defineFlowXElement } from '../helper';

export const FlowXButton = defineFlowXElement('flowx-button', {
  observedAttributes: ['variant', 'size', 'disabled', 'loading'],
  style: `
    :host {
      display: inline-block;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--flowx-font-family);
      font-weight: 600;
      border-radius: var(--flowx-radius-md);
      border: 1px solid transparent;
      cursor: pointer;
      transition: background-color var(--flowx-transition), border-color var(--flowx-transition), transform 0.1s ease;
      user-select: none;
      vertical-align: middle;
      position: relative;
      text-decoration: none;
      gap: var(--flowx-spacing-xs);
    }
    .btn:active:not(:disabled) {
      transform: scale(0.98);
    }
    
    /* Sizes */
    .btn.sm {
      padding: 6px 12px;
      font-size: var(--flowx-font-size-sm);
    }
    .btn.md {
      padding: 8px 16px;
      font-size: var(--flowx-font-size-md);
    }
    .btn.lg {
      padding: 12px 24px;
      font-size: var(--flowx-font-size-lg);
    }
    
    /* Variants */
    .btn.primary {
      background-color: var(--flowx-primary);
      color: var(--flowx-primary-text);
    }
    .btn.primary:hover:not(:disabled) {
      background-color: var(--flowx-primary-hover);
    }
    
    .btn.secondary {
      background-color: var(--flowx-secondary);
      color: var(--flowx-secondary-text);
    }
    .btn.secondary:hover:not(:disabled) {
      background-color: var(--flowx-secondary-hover);
    }
    
    .btn.ghost {
      background-color: var(--flowx-ghost);
      color: var(--flowx-ghost-text);
      border: 1px solid rgba(240, 246, 252, 0.15);
    }
    .btn.ghost:hover:not(:disabled) {
      background-color: var(--flowx-ghost-hover);
    }
    
    .btn.danger {
      background-color: var(--flowx-danger);
      color: var(--flowx-danger-text);
    }
    .btn.danger:hover:not(:disabled) {
      background-color: var(--flowx-danger-hover);
    }
    
    /* Disabled & Loading */
    .btn:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }
    
    .spinner {
      width: 12px;
      height: 12px;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.75s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `,
  template: (el) => {
    const variant = el.getAttribute('variant') || 'primary';
    const size = el.getAttribute('size') || 'md';
    const disabled = el.hasAttribute('disabled');
    const loading = el.hasAttribute('loading');

    return `
      <button 
        class="btn ${variant} ${size} ${loading ? 'loading' : ''}"
        ${disabled || loading ? 'disabled' : ''}
        aria-disabled="${disabled || loading ? 'true' : 'false'}"
        aria-busy="${loading ? 'true' : 'false'}"
      >
        ${loading ? '<span class="spinner"></span>' : ''}
        <span class="btn-text"><slot></slot></span>
      </button>
    `;
  },
});
