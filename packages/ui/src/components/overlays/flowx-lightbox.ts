import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-lightbox>
 *
 * Enlarges images triggered by clicking thumbnail elements with `data-lightbox-src`.
 */
export class FlowXLightbox extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'src', 'alt'];
  }

  private nativeDialog: HTMLDialogElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupGlobalThumbnailListener();
  }

  attributeChangedCallback() {
    this.syncNativeState();
  }

  public openWithSrc(src: string, alt: string = '') {
    this.setAttribute('src', src);
    this.setAttribute('alt', alt);
    this.openModal();
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

  private setupGlobalThumbnailListener() {
    document.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement | null;
      const thumb = target?.closest('[data-lightbox-src]') as HTMLElement | null;
      if (thumb) {
        const src = thumb.getAttribute('data-lightbox-src');
        const alt = thumb.getAttribute('alt') || '';
        if (src) {
          e.preventDefault();
          this.openWithSrc(src, alt);
        }
      }
    });
  }

  private render() {
    if (!this.shadowRoot) return;

    const src = this.getAttribute('src') || '';
    const alt = this.getAttribute('alt') || '';

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: contents; font-family: var(--flowx-font-family); }
        dialog {
          background: rgba(0,0,0,0.9); border: none;
          color: #fff; padding: 0; box-shadow: 0 16px 48px rgba(0,0,0,0.8);
          max-width: 90vw; max-height: 90vh; border-radius: var(--flowx-radius-lg);
          overflow: hidden; outline: none;
        }
        dialog::backdrop { background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(6px); }
        .wrapper { display: flex; flex-direction: column; align-items: center; position: relative; }
        img { max-width: 90vw; max-height: 80vh; object-fit: contain; display: block; }
        .caption { padding: 12px; font-size: 13px; color: #8b949e; text-align: center; }
        .close-btn {
          position: absolute; top: 12px; right: 12px;
          background: rgba(0,0,0,0.6); border: none; color: #fff;
          width: 32px; height: 32px; border-radius: 50%;
          font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .close-btn:hover { background: rgba(255,255,255,0.2); }
      </style>
      <dialog>
        <div class="wrapper">
          <button type="button" class="close-btn" fx-dialog-close aria-label="Close image">✕</button>
          ${src ? `<img src="${src}" alt="${alt}" />` : '<slot></slot>'}
          ${alt ? `<div class="caption">${alt}</div>` : ''}
        </div>
      </dialog>
    `;

    this.nativeDialog = this.shadowRoot.querySelector('dialog');
    this.syncNativeState();
  }
}

if (!customElements.get('flowx-lightbox')) {
  customElements.define('flowx-lightbox', FlowXLightbox);
}
