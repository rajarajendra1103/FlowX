import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-dialog>
 *
 * Unopinionated base Custom Element wrapping a native <dialog>.
 */
export class FlowXDialog extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'fx-dialog-persistent'];
  }

  private nativeDialog: HTMLDialogElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.syncNativeState();
  }

  public openModal() {
    this.setAttribute('open', '');
    if (this.nativeDialog && !this.nativeDialog.open) {
      try {
        this.nativeDialog.showModal();
      } catch {
        this.nativeDialog.setAttribute('open', '');
      }
    }
  }

  public closeModal() {
    this.removeAttribute('open');
    if (this.nativeDialog && this.nativeDialog.open) {
      try {
        this.nativeDialog.close();
      } catch {
        this.nativeDialog.removeAttribute('open');
      }
    }
  }

  private syncNativeState() {
    if (!this.nativeDialog) return;
    const isOpen = this.hasAttribute('open');
    if (isOpen && !this.nativeDialog.open) {
      try {
        this.nativeDialog.showModal();
      } catch {
        this.nativeDialog.setAttribute('open', '');
      }
    } else if (!isOpen && this.nativeDialog.open) {
      try {
        this.nativeDialog.close();
      } catch {
        this.nativeDialog.removeAttribute('open');
      }
    }
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: contents; font-family: var(--flowx-font-family); }
        dialog {
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg); color: #e6edf3;
          padding: 0; box-shadow: 0 16px 48px rgba(0,0,0,0.6);
          max-width: 90vw; max-height: 90vh;
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(4px);
        }
      </style>
      <dialog>
        <slot></slot>
      </dialog>
    `;

    this.nativeDialog = this.shadowRoot.querySelector('dialog');
    this.nativeDialog?.addEventListener('close', () => this.removeAttribute('open'));
    this.nativeDialog?.addEventListener('cancel', () => this.removeAttribute('open'));
    this.syncNativeState();
  }
}

if (!customElements.get('flowx-dialog')) {
  customElements.define('flowx-dialog', FlowXDialog);
}
