import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-modal>
 *
 * Structured overlay wrapping native <dialog> with header/body/footer slots,
 * entrance & exit animations (respecting prefers-reduced-motion).
 */
export class FlowXModal extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'title', 'persistent'];
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

    const titleStr = this.getAttribute('title') || '';

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: contents; font-family: var(--flowx-font-family); }
        dialog {
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg); color: #e6edf3;
          padding: 0; box-shadow: 0 16px 48px rgba(0,0,0,0.6);
          width: 500px; max-width: 90vw; max-height: 90vh; overflow: hidden;
        }
        dialog[open] {
          animation: modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(4px);
        }
        @media (prefers-reduced-motion: reduce) {
          dialog[open] { animation: none; }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .modal-title { font-size: 16px; font-weight: 600; color: #e6edf3; margin: 0; }
        .close-btn {
          background: transparent; border: none; color: #8b949e;
          font-size: 16px; cursor: pointer; padding: 4px 8px; border-radius: 4px;
        }
        .close-btn:hover { color: #fff; background: rgba(255,255,255,0.08); }
        .modal-body { padding: 20px; overflow-y: auto; max-height: 60vh; font-size: 14px; color: #c9d1d9; }
        .modal-footer {
          display: flex; align-items: center; justify-content: flex-end; gap: 10px;
          padding: 14px 20px; background: rgba(0,0,0,0.2); border-top: 1px solid rgba(255,255,255,0.1);
        }
      </style>
      <dialog>
        <div class="modal-header">
          <slot name="header">
            <h3 class="modal-title">${titleStr}</h3>
          </slot>
          <button type="button" class="close-btn" fx-dialog-close aria-label="Close modal">✕</button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </dialog>
    `;

    this.nativeDialog = this.shadowRoot.querySelector('dialog');
    this.nativeDialog?.addEventListener('close', () => this.removeAttribute('open'));
    this.nativeDialog?.addEventListener('cancel', () => this.removeAttribute('open'));
    this.syncNativeState();
  }
}

if (!customElements.get('flowx-modal')) {
  customElements.define('flowx-modal', FlowXModal);
}
