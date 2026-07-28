import { GLOBAL_THEME } from '../../helper';
import { FORM_BASE_STYLE } from '../../form-helper';
import { swapServerErrors } from '../../form-infra';

// ── <flowx-form-error> ─────────────────────────────────────────────────────

class FlowXFormError extends HTMLElement {
  static get observedAttributes() {
    return ['for', 'visible'];
  }

  connectedCallback() {
    this._render();
  }
  attributeChangedCallback() {
    this._render();
  }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          ${GLOBAL_THEME}${FORM_BASE_STYLE}
          :host { display: block; }
          .error {
            display: none;
            font-size: var(--flowx-font-size-sm);
            color: var(--flowx-error);
            margin-top: 4px;
            padding: 3px 0;
            animation: slideIn 0.15s ease;
          }
          :host([visible]) .error { display: flex; align-items: center; gap: 4px; }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        </style>
        <div class="error" role="alert" aria-live="polite">
          <span>⚠</span>
          <slot></slot>
        </div>
      `;
    }
  }
}

if (!customElements.get('flowx-form-error')) {
  customElements.define('flowx-form-error', FlowXFormError);
}

// ── <flowx-form> ───────────────────────────────────────────────────────────

class FlowXForm extends HTMLElement {
  connectedCallback() {
    this._init();
  }

  _init() {
    const form = this.querySelector('form') || (this as unknown as HTMLFormElement);

    // Listen for fx:afterSwap on this element to catch validation error responses
    this.addEventListener('fx:afterSwap', (e: Event) => {
      const ce = e as CustomEvent;
      const response: Response | undefined = ce.detail?.xhr;
      if (!response) return;
      this._handleValidationResponse(response);
    });

    // Also hook into native form submit (for non-FlowX fallback use)
    if (form instanceof HTMLFormElement) {
      form.addEventListener('submit', () => {
        // Clear previous server errors on new submit
        this.querySelectorAll('flowx-form-error').forEach((slot) => {
          (slot as HTMLElement).textContent = '';
          (slot as HTMLElement).removeAttribute('visible');
        });
        this.querySelectorAll('[invalid]').forEach((el) => {
          (el as HTMLElement).removeAttribute('invalid');
        });
      });
    }
  }

  async _handleValidationResponse(response: Response) {
    const header = response.headers.get('fx-validation-errors');
    if (!header) return;

    try {
      const errors = JSON.parse(header);
      swapServerErrors(this, errors);
    } catch {
      /* ignore */
    }
  }
}

if (!customElements.get('flowx-form')) {
  customElements.define('flowx-form', FlowXForm);
}

export { FlowXForm, FlowXFormError };
