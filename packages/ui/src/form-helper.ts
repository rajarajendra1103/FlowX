import { GLOBAL_THEME } from './helper';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FormElementConfig {
  /** Shadow DOM styles (appended after GLOBAL_THEME). */
  style?: string;
  /** Template function — receives the host element, returns an HTML string. */
  template: (el: any) => string;
  /** Attributes to observe. 'required', 'disabled', 'name', 'value' are always observed. */
  observedAttributes?: string[];
  /**
   * Called once after the element is connected and rendered.
   * Use to attach inner-input listeners and wire up ElementInternals.
   */
  setup?: (el: any, internals: ElementInternals) => void;
}

// ─── Base CSS shared by all form elements ─────────────────────────────────────

export const FORM_BASE_STYLE = `
  :host {
    display: block;
    font-family: var(--flowx-font-family);
  }
  :host([disabled]) {
    opacity: 0.5;
    pointer-events: none;
  }
  label {
    display: block;
    font-size: var(--flowx-font-size-sm);
    font-weight: 600;
    color: #8b949e;
    margin-bottom: 4px;
    letter-spacing: 0.03em;
  }
  .field-hint {
    font-size: var(--flowx-font-size-sm);
    color: #6e7681;
    margin-top: 4px;
  }
  :host([invalid]) label,
  :host(:state(invalid)) label {
    color: var(--flowx-error);
  }
`;

export const INPUT_STYLE = `
  input, textarea, select {
    display: block;
    width: 100%;
    background: #0d1117;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: var(--flowx-radius-md);
    color: #e6edf3;
    font-family: var(--flowx-font-family);
    font-size: var(--flowx-font-size-md);
    padding: 9px 12px;
    outline: none;
    transition: border-color var(--flowx-transition), box-shadow var(--flowx-transition);
    box-sizing: border-box;
  }
  input::placeholder, textarea::placeholder {
    color: #484f58;
  }
  input:focus, textarea:focus, select:focus {
    border-color: var(--flowx-primary);
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.2);
  }
  :host([invalid]) input,
  :host([invalid]) textarea,
  :host([invalid]) select {
    border-color: var(--flowx-error);
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);
  }
  input:disabled, textarea:disabled, select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// ─── Factory ──────────────────────────────────────────────────────────────────

const ALWAYS_OBSERVED = ['required', 'disabled', 'name', 'value', 'label', 'hint', 'invalid'];

/**
 * Defines a form-associated Custom Element that participates natively in
 * HTMLFormElement / FormData / form.reportValidity() with zero extra JS on the
 * page author's side.
 */
export function defineFormAssociatedElement(tagName: string, config: FormElementConfig) {
  const allObserved = [...new Set([...ALWAYS_OBSERVED, ...(config.observedAttributes || [])])];

  class FlowXFormElement extends HTMLElement {
    static formAssociated = true;

    static get observedAttributes() {
      return allObserved;
    }

    internals: ElementInternals;
    _initialized = false;

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      // attachInternals() — available in all modern browsers (Chrome 77+, Firefox 98+, Safari 16+).
      // Falls back to a minimal no-op shim when running under happy-dom (test env).
      try {
        this.internals = (this as any).attachInternals();
      } catch {
        this.internals = {
          setFormValue: () => {},
          setValidity: () => {},
          checkValidity: () => true,
          reportValidity: () => true,
          get validationMessage() {
            return '';
          },
          get form() {
            return null;
          },
          get validity() {
            return { valid: true } as ValidityState;
          },
        } as unknown as ElementInternals;
      }
    }

    connectedCallback() {
      if (!this._initialized) {
        this.render();
        if (config.setup) {
          config.setup(this, this.internals);
        }
        this._syncValidity();
        this._initialized = true;
      }
    }

    attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null) {
      if (oldVal === newVal) return;
      if (this._initialized) {
        this.render();
        this._syncValidity();
        if (config.setup) {
          config.setup(this, this.internals);
        }
      }
    }

    render() {
      if (!this.shadowRoot) return;
      const styleBlock = `<style>${GLOBAL_THEME}${FORM_BASE_STYLE}${config.style || ''}</style>`;
      this.shadowRoot.innerHTML = `${styleBlock}${config.template(this)}`;
    }

    // ── Public API ──────────────────────────────────────────────────────────

    /** Sets the form value that will appear in FormData under this element's name. */
    setFormValue(value: string | File | FormData | null) {
      try {
        this.internals.setFormValue(value);
      } catch {
        // ElementInternals not supported (test env shim)
      }
    }

    /** Mirrors validity state into internals so form.reportValidity() works. */
    setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement) {
      try {
        if (anchor) {
          this.internals.setValidity(flags, message, anchor);
        } else {
          this.internals.setValidity(flags, message);
        }
      } catch {
        // shim
      }
    }

    /** Mark valid — clears any existing validity constraint. */
    markValid() {
      try {
        this.internals.setValidity({});
      } catch {
        // shim
      }
    }

    get form() {
      return this.internals.form;
    }
    get validity() {
      return this.internals.validity;
    }
    get validationMessage() {
      return this.internals.validationMessage;
    }
    checkValidity() {
      return this.internals.checkValidity();
    }
    reportValidity() {
      return this.internals.reportValidity();
    }

    // ── Internal helpers ────────────────────────────────────────────────────

    _syncValidity() {
      const required = this.hasAttribute('required');
      const value = this.getAttribute('value') || '';
      const currentValue = (this as any)._currentValue ?? value;

      if (required && !currentValue) {
        const label = this.getAttribute('label') || this.getAttribute('name') || 'This field';
        this.setValidity({ valueMissing: true }, `${label} is required`);
        this.setAttribute('invalid', '');
      } else {
        this.markValid();
        this.removeAttribute('invalid');
      }

      // Reflect disabled to internals
      if (this.hasAttribute('disabled')) {
        try {
          this.internals.setFormValue(null);
        } catch {
          /* shim */
        }
      }
    }
  }

  // ── Property reflections ──────────────────────────────────────────────────
  allObserved.forEach((attr) => {
    const prop = attr.replace(/-([a-z])/g, (_: string, g: string) => g.toUpperCase());
    if (Object.getOwnPropertyDescriptor(FlowXFormElement.prototype, prop)) return;
    Object.defineProperty(FlowXFormElement.prototype, prop, {
      get() {
        const val = this.getAttribute(attr);
        if (val === '') return true;
        if (val === null) return false;
        return val;
      },
      set(newVal: any) {
        if (newVal === null || newVal === false) {
          this.removeAttribute(attr);
        } else if (newVal === true) {
          this.setAttribute(attr, '');
        } else {
          this.setAttribute(attr, String(newVal));
        }
      },
      configurable: true,
    });
  });

  if (!customElements.get(tagName)) {
    customElements.define(tagName, FlowXFormElement);
  }

  return FlowXFormElement;
}
