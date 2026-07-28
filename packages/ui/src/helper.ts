export interface ElementConfig {
  style?: string;
  template?: string | ((el: any) => string);
  observedAttributes?: string[];
  setup?: (el: any, sr?: any) => void;
  shadow?: boolean;
}

export const GLOBAL_THEME = `
  :host {
    /* Background Tokens */
    --flowx-bg-base: var(--fx-bg-base, #f8fafc);
    --flowx-bg-surface: var(--fx-bg-surface, #ffffff);
    --flowx-bg-surface-raised: var(--fx-bg-surface-raised, #ffffff);
    --flowx-bg-hover: var(--fx-bg-hover, rgba(0, 0, 0, 0.05));
    --flowx-bg-active: var(--fx-bg-active, rgba(0, 0, 0, 0.1));

    /* Color Palette */
    --flowx-primary: var(--flowx-color-primary, var(--fx-primary, #2563eb));
    --flowx-primary-hover: var(--flowx-color-primary-hover, var(--fx-primary-hover, #1d4ed8));
    --flowx-primary-text: var(--flowx-color-primary-text, var(--fx-primary-text, #ffffff));
    
    --flowx-secondary: var(--flowx-color-secondary, var(--fx-secondary, #475569));
    --flowx-secondary-hover: var(--flowx-color-secondary-hover, var(--fx-secondary-hover, #334155));
    --flowx-secondary-text: var(--flowx-color-secondary-text, var(--fx-secondary-text, #ffffff));
    
    --flowx-ghost: var(--flowx-color-ghost, var(--fx-ghost, transparent));
    --flowx-ghost-hover: var(--flowx-color-ghost-hover, var(--fx-ghost-hover, rgba(0, 0, 0, 0.05)));
    --flowx-ghost-text: var(--flowx-color-ghost-text, var(--fx-ghost-text, #0f172a));
    
    --flowx-danger: var(--flowx-color-danger, var(--fx-danger, #ef4444));
    --flowx-danger-hover: var(--flowx-color-danger-hover, var(--fx-danger-hover, #dc2626));
    --flowx-danger-text: var(--flowx-color-danger-text, var(--fx-danger-text, #ffffff));

    --flowx-color-text: var(--fx-color-text, #0f172a);
    --flowx-color-text-muted: var(--fx-color-text-muted, #64748b);
    --flowx-color-text-subtle: var(--fx-color-text-subtle, #94a3b8);
    
    /* Status Colors */
    --flowx-info: var(--flowx-color-info, var(--fx-info, #06b6d4));
    --flowx-success: var(--flowx-color-success, var(--fx-success, #10b981));
    --flowx-warning: var(--flowx-color-warning, var(--fx-warning, #f59e0b));
    --flowx-error: var(--flowx-color-error, var(--fx-error, #ef4444));
    --flowx-neutral: var(--flowx-color-neutral, var(--fx-neutral, #94a3b8));

    /* Borders & Shadows */
    --flowx-border-color: var(--fx-border-color, #e2e8f0);
    --flowx-border-subtle: var(--fx-border-subtle, #f1f5f9);
    --flowx-shadow-color: var(--fx-shadow-color, rgba(0, 0, 0, 0.08));
    --flowx-shadow-sm: var(--fx-shadow-sm, 0 1px 2px 0 var(--flowx-shadow-color));
    --flowx-shadow-md: var(--fx-shadow-md, 0 4px 6px -1px var(--flowx-shadow-color));
    --flowx-shadow-lg: var(--fx-shadow-lg, 0 10px 15px -3px var(--flowx-shadow-color));
    
    /* Canonical Spacings (1..8) */
    --flowx-space-1: var(--fx-space-1, 4px);
    --flowx-space-2: var(--fx-space-2, 8px);
    --flowx-space-3: var(--fx-space-3, 12px);
    --flowx-space-4: var(--fx-space-4, 16px);
    --flowx-space-5: var(--fx-space-5, 20px);
    --flowx-space-6: var(--fx-space-6, 24px);
    --flowx-space-7: var(--fx-space-7, 32px);
    --flowx-space-8: var(--fx-space-8, 40px);

    /* Legacy Spacings Aliases */
    --flowx-spacing-xs: var(--flowx-space-1);
    --flowx-spacing-sm: var(--flowx-space-2);
    --flowx-spacing-md: var(--flowx-space-4);
    --flowx-spacing-lg: var(--flowx-space-6);
    
    /* Border Radii */
    --flowx-radius-sm: var(--fx-radius-sm, 4px);
    --flowx-radius-md: var(--fx-radius-md, 8px);
    --flowx-radius-lg: var(--fx-radius-lg, 16px);
    --flowx-radius-round: var(--fx-radius-round, 9999px);
    
    /* Typography */
    --flowx-font-sans: var(--fx-font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif);
    --flowx-font-mono: var(--fx-font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    --flowx-font-family: var(--flowx-font-sans);
    --flowx-font-size-sm: var(--fx-font-size-sm, 12px);
    --flowx-font-size-md: var(--fx-font-size-md, 14px);
    --flowx-font-size-lg: var(--fx-font-size-lg, 16px);
    
    /* Animation Timing */
    --flowx-transition: var(--fx-transition, 0.2s ease-in-out);
    
    /* Focus Ring */
    --flowx-focus-ring: var(--fx-focus-ring, 0 0 0 3px rgba(37, 99, 235, 0.4));
    
    box-sizing: border-box;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  /* Visible Focus Ring Outline */
  :focus-visible {
    outline: 2px solid var(--flowx-color-primary, var(--flowx-primary));
    outline-offset: 2px;
  }
  
  /* Prefers Reduced Motion Constraints */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export function defineFlowXElement(tagName: string, config: ElementConfig) {
  class FlowXCustomElement extends HTMLElement {
    static get observedAttributes() {
      return config.observedAttributes || [];
    }

    _initialized = false;

    constructor() {
      super();
      if (config.shadow !== false) {
        this.attachShadow({ mode: 'open' });
      }
    }

    connectedCallback() {
      if (!this._initialized) {
        this.render();
        if (config.setup) {
          config.setup(this);
        }
        this._initialized = true;
      }
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (oldValue === newValue) return;
      const camelName = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

      let parsedVal: any = newValue;
      if (newValue === '') parsedVal = true;
      if (newValue === null) parsedVal = false;

      if ((this as any)[camelName] !== parsedVal) {
        (this as any)[camelName] = parsedVal;
      }

      if (this._initialized) {
        this.render();
      }
    }

    render() {
      const styleBlock = `<style>${GLOBAL_THEME}${config.style || ''}</style>`;
      let html = '';
      if (typeof config.template === 'function') {
        html = config.template(this);
      } else if (typeof config.template === 'string') {
        html = config.template;
      }

      const content = `${styleBlock}${html}`;

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = content;
      } else {
        this.innerHTML = content;
      }
    }
  }

  const proto = FlowXCustomElement.prototype;
  if (config.observedAttributes) {
    config.observedAttributes.forEach((attr) => {
      const prop = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      if (Object.getOwnPropertyDescriptor(proto, prop)) return;

      Object.defineProperty(proto, prop, {
        get() {
          const val = this.getAttribute(attr);
          if (val === '') return true;
          if (val === null) return false;
          return val;
        },
        set(newVal) {
          if (newVal === null || newVal === false) {
            if (this.hasAttribute(attr)) {
              this.removeAttribute(attr);
            }
          } else if (newVal === true) {
            if (this.getAttribute(attr) !== '') {
              this.setAttribute(attr, '');
            }
          } else {
            if (this.getAttribute(attr) !== String(newVal)) {
              this.setAttribute(attr, String(newVal));
            }
          }
        },
        configurable: true,
      });
    });
  }

  if (!customElements.get(tagName)) {
    customElements.define(tagName, FlowXCustomElement);
  }

  return FlowXCustomElement;
}
