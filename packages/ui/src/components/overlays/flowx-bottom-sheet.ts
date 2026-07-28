import { GLOBAL_THEME } from '../../helper';

export class FlowXBottomSheet extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'title'];
  }

  private nativeDialog: HTMLDialogElement | null = null;
  private startY: number = 0;
  private currentY: number = 0;

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
          background: #161b22; border: none;
          border-top: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg) var(--flowx-radius-lg) 0 0;
          color: #e6edf3; padding: 0; box-shadow: 0 -8px 32px rgba(0,0,0,0.5);
          width: 100vw; max-width: 600px; max-height: 80vh;
          margin: 0 auto; position: fixed; bottom: 0; top: auto;
          transition: transform 0.15s ease-out;
        }
        dialog[open] {
          animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        dialog::backdrop { background: rgba(0, 0, 0, 0.5); }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .drag-handle-bar {
          display: flex; justify-content: center; padding: 10px 0 4px;
          cursor: grab; touch-action: none;
        }
        .drag-pill { width: 36px; height: 4px; border-radius: 2px; background: rgba(255,255,255,0.25); }
        .sheet-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 8px 20px 12px; border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .sheet-title { font-size: 15px; font-weight: 600; color: #e6edf3; margin: 0; }
        .sheet-body { padding: 20px; overflow-y: auto; max-height: 60vh; font-size: 14px; }
      </style>
      <dialog>
        <div class="drag-handle-bar" id="drag-handle">
          <div class="drag-pill"></div>
        </div>
        ${titleStr ? `<div class="sheet-header"><h3 class="sheet-title">${titleStr}</h3></div>` : ''}
        <div class="sheet-body">
          <slot></slot>
        </div>
      </dialog>
    `;

    this.nativeDialog = this.shadowRoot.querySelector('dialog');

    // Pointer drag-to-dismiss handler
    const dragHandle = this.shadowRoot.querySelector('#drag-handle');
    dragHandle?.addEventListener('pointerdown', (e: Event) => {
      const pe = e as PointerEvent;
      this.startY = pe.clientY;
      dragHandle.setPointerCapture(pe.pointerId);

      const onPointerMove = (me: PointerEvent) => {
        const deltaY = me.clientY - this.startY;
        if (deltaY > 0 && this.nativeDialog) {
          this.nativeDialog.style.transform = `translateY(${deltaY}px)`;
        }
      };

      const onPointerUp = (ue: PointerEvent) => {
        const deltaY = ue.clientY - this.startY;
        dragHandle.releasePointerCapture(ue.pointerId);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);

        if (deltaY > 80) {
          this.closeModal();
        }
        if (this.nativeDialog) {
          this.nativeDialog.style.transform = '';
        }
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    });

    this.syncNativeState();
  }
}

if (!customElements.get('flowx-bottom-sheet')) {
  customElements.define('flowx-bottom-sheet', FlowXBottomSheet);
}
