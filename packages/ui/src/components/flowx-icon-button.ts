import { defineFlowXElement } from '../helper';

export const FlowXIconButton = defineFlowXElement('flowx-icon-button', {
  observedAttributes: ['variant', 'size', 'disabled', 'loading', 'round', 'aria-label'],
  style: `
    :host {
      display: inline-block;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--flowx-font-family);
      cursor: pointer;
      transition: background-color var(--flowx-transition), border-color var(--flowx-transition), transform 0.1s ease;
      user-select: none;
      vertical-align: middle;
      position: relative;
      border: 1px solid transparent;
    }
    .btn:active:not(:disabled) {
      transform: scale(0.95);
    }
    
    /* Shape */
    .btn.square {
      border-radius: var(--flowx-radius-md);
    }
    .btn.circle {
      border-radius: var(--flowx-radius-round);
    }
    
    /* Sizes */
    .btn.sm {
      width: 28px;
      height: 28px;
      font-size: 14px;
    }
    .btn.md {
      width: 36px;
      height: 36px;
      font-size: 18px;
    }
    .btn.lg {
      width: 44px;
      height: 44px;
      font-size: 22px;
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
      width: 14px;
      height: 14px;
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
    const round = el.hasAttribute('round');
    const label = el.getAttribute('aria-label') || 'icon button';

    return `
      <button 
        class="btn ${variant} ${size} ${round ? 'circle' : 'square'} ${loading ? 'loading' : ''}"
        ${disabled || loading ? 'disabled' : ''}
        aria-label="${label}"
        aria-disabled="${disabled || loading ? 'true' : 'false'}"
        aria-busy="${loading ? 'true' : 'false'}"
      >
        ${loading ? '<span class="spinner"></span>' : '<slot></slot>'}
      </button>
    `;
  },
});
