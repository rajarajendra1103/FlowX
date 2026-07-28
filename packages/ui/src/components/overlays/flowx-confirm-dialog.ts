import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-confirm-dialog>
 *
 * Specialized dialog with a `message` attribute and confirm/cancel buttons.
 * Dispatches an `fx-confirm` custom event `{ detail: { confirmed: boolean } }`.
 * Gates paired delete/post triggers without JS `confirm()`.
 */
export class FlowXConfirmDialog extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'message', 'title', 'confirm-label', 'cancel-label'];
  }

  private nativeDialog: HTMLDialogElement | null = null;
  private pendingRequestTrigger: HTMLElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupGlobalGateListener();
  }

  attributeChangedCallback() {
    this.syncNativeState();
  }

  public openModal(pairedTrigger?: HTMLElement) {
    if (pairedTrigger) this.pendingRequestTrigger = pairedTrigger;
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

  private setupGlobalGateListener() {
    // Intercept clicks on elements configured with fx-confirm-target="#confirm-id"
    document.addEventListener(
      'click',
      (e: Event) => {
        const target = e.target as HTMLElement | null;
        const trigger = target?.closest('[fx-confirm-target]') as HTMLElement | null;
        if (trigger) {
          const dialogId = trigger.getAttribute('fx-confirm-target');
          if (dialogId && (dialogId === `#${this.id}` || dialogId === this.id)) {
            e.preventDefault();
            e.stopPropagation();
            this.openModal(trigger);
          }
        }
      },
      true,
    );
  }

  private handleUserChoice(confirmed: boolean) {
    this.closeModal();

    this.dispatchEvent(
      new CustomEvent('fx-confirm', {
        bubbles: true,
        composed: true,
        detail: { confirmed },
      }),
    );

    if (confirmed && this.pendingRequestTrigger) {
      // Fire gated request (e.g. fx-delete or fx-post) on paired trigger element
      const deleteEndpoint = this.pendingRequestTrigger.getAttribute('fx-delete');
      const postEndpoint = this.pendingRequestTrigger.getAttribute('fx-post');

      if (deleteEndpoint) {
        fetch(deleteEndpoint, { method: 'DELETE' }).then(() => {
          const targetSel = this.pendingRequestTrigger?.getAttribute('fx-target');
          if (targetSel) {
            const el = document.querySelector(targetSel);
            if (el) el.remove();
          }
        });
      } else if (postEndpoint) {
        fetch(postEndpoint, { method: 'POST' });
      }

      this.pendingRequestTrigger = null;
    }
  }

  private render() {
    if (!this.shadowRoot) return;

    const titleStr = this.getAttribute('title') || 'Confirm Action';
    const messageStr = this.getAttribute('message') || 'Are you sure you want to proceed?';
    const confirmLabel = this.getAttribute('confirm-label') || 'Confirm';
    const cancelLabel = this.getAttribute('cancel-label') || 'Cancel';

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: contents; font-family: var(--flowx-font-family); }
        dialog {
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg); color: #e6edf3;
          padding: 20px; box-shadow: 0 16px 48px rgba(0,0,0,0.6);
          width: 420px; max-width: 90vw;
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(4px);
        }
        .title { font-size: 16px; font-weight: 600; color: #e6edf3; margin: 0 0 8px; }
        .message { font-size: 14px; color: #8b949e; margin: 0 0 20px; line-height: 1.5; }
        .actions { display: flex; justify-content: flex-end; gap: 10px; }
        .btn-cancel {
          background: transparent; border: 1px solid rgba(255,255,255,0.15);
          color: #c9d1d9; padding: 7px 14px; border-radius: 6px; font-size: 13px;
          cursor: pointer; font-weight: 500;
        }
        .btn-cancel:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .btn-confirm {
          background: var(--flowx-error, #dc3545); border: none;
          color: #fff; padding: 7px 14px; border-radius: 6px; font-size: 13px;
          cursor: pointer; font-weight: 600;
        }
        .btn-confirm:hover { opacity: 0.9; }
      </style>
      <dialog>
        <h3 class="title">${titleStr}</h3>
        <p class="message">${messageStr}</p>
        <div class="actions">
          <button type="button" class="btn-cancel" id="btn-cancel">${cancelLabel}</button>
          <button type="button" class="btn-confirm" id="btn-confirm">${confirmLabel}</button>
        </div>
      </dialog>
    `;

    this.nativeDialog = this.shadowRoot.querySelector('dialog');

    this.shadowRoot
      .querySelector('#btn-cancel')
      ?.addEventListener('click', () => this.handleUserChoice(false));
    this.shadowRoot
      .querySelector('#btn-confirm')
      ?.addEventListener('click', () => this.handleUserChoice(true));

    this.syncNativeState();
  }
}

if (!customElements.get('flowx-confirm-dialog')) {
  customElements.define('flowx-confirm-dialog', FlowXConfirmDialog);
}
