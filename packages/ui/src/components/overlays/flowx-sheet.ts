import { GLOBAL_THEME } from '../../helper';

export class FlowXSheet extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'side', 'title'];
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

    const side = this.getAttribute('side') || 'right';
    const titleStr = this.getAttribute('title') || '';

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: contents; font-family: var(--flowx-font-family); }
        dialog {
          background: #161b22; border: none;
          border-left: 1px solid rgba(255,255,255,0.15);
          color: #e6edf3; padding: 0; box-shadow: -8px 0 32px rgba(0,0,0,0.5);
          width: 360px; max-width: 85vw; height: 100vh; max-height: 100vh;
          margin: 0; position: fixed; top: 0; bottom: 0;
          ${side === 'left' ? 'left: 0; right: auto;' : 'right: 0; left: auto;'}
        }
        dialog[open] {
          animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.5);
        }
        @keyframes slideIn {
          from { transform: translateX(${side === 'left' ? '-100%' : '100%'}); }
          to { transform: translateX(0); }
        }
        .sheet-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .sheet-title { font-size: 15px; font-weight: 600; color: #e6edf3; margin: 0; }
        .close-btn { background: transparent; border: none; color: #8b949e; cursor: pointer; padding: 4px; font-size: 14px; }
        .sheet-body { padding: 20px; overflow-y: auto; height: calc(100vh - 60px); font-size: 14px; }
      </style>
      <dialog>
        <div class="sheet-header">
          <h3 class="sheet-title">${titleStr}</h3>
          <button type="button" class="close-btn" fx-dialog-close aria-label="Close sheet">✕</button>
        </div>
        <div class="sheet-body">
          <slot></slot>
        </div>
      </dialog>
    `;

    this.nativeDialog = this.shadowRoot.querySelector('dialog');
    this.syncNativeState();
  }
}

if (!customElements.get('flowx-sheet')) {
  customElements.define('flowx-sheet', FlowXSheet);
}
