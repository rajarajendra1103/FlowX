import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-image-viewer>
 *
 * Lightbox superset supporting gallery sets (`data-gallery="name"`),
 * next/prev navigation, and zoom level toggles.
 */
export class FlowXImageViewer extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'src', 'alt'];
  }

  private nativeDialog: HTMLDialogElement | null = null;
  private galleryImages: Array<{ src: string; alt: string }> = [];
  private currentIndex: number = 0;
  private zoomLevel: number = 1;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupGalleryListener();
  }

  attributeChangedCallback() {
    this.syncNativeState();
  }

  public openGallery(images: Array<{ src: string; alt: string }>, startIndex: number = 0) {
    this.galleryImages = images;
    this.currentIndex = startIndex;
    this.zoomLevel = 1;
    if (this.galleryImages[startIndex]) {
      this.setAttribute('src', this.galleryImages[startIndex].src);
      this.setAttribute('alt', this.galleryImages[startIndex].alt || '');
    }
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

  private prev() {
    if (this.galleryImages.length === 0) return;
    this.currentIndex =
      (this.currentIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
    this.setAttribute('src', this.galleryImages[this.currentIndex].src);
    this.setAttribute('alt', this.galleryImages[this.currentIndex].alt || '');
    this.zoomLevel = 1;
    this.render();
  }

  private next() {
    if (this.galleryImages.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.galleryImages.length;
    this.setAttribute('src', this.galleryImages[this.currentIndex].src);
    this.setAttribute('alt', this.galleryImages[this.currentIndex].alt || '');
    this.zoomLevel = 1;
    this.render();
  }

  private toggleZoom() {
    this.zoomLevel = this.zoomLevel === 1 ? 1.8 : 1;
    const img = this.shadowRoot?.querySelector('img');
    if (img) img.style.transform = `scale(${this.zoomLevel})`;
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

  private setupGalleryListener() {
    document.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement | null;
      const thumb = target?.closest('[data-gallery-src]') as HTMLElement | null;
      if (thumb) {
        const galleryName = thumb.getAttribute('data-gallery');
        const src = thumb.getAttribute('data-gallery-src') || thumb.getAttribute('src');

        if (galleryName && src) {
          const group = Array.from(document.querySelectorAll(`[data-gallery="${galleryName}"]`));
          const list = group.map((el) => ({
            src: el.getAttribute('data-gallery-src') || el.getAttribute('src') || '',
            alt: el.getAttribute('alt') || '',
          }));
          const startIdx = list.findIndex((item) => item.src === src);

          e.preventDefault();
          this.openGallery(list, Math.max(0, startIdx));
        }
      }
    });
  }

  private render() {
    if (!this.shadowRoot) return;

    const src = this.getAttribute('src') || '';
    const alt = this.getAttribute('alt') || '';
    const hasMultiple = this.galleryImages.length > 1;

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: contents; font-family: var(--flowx-font-family); }
        dialog {
          background: rgba(0,0,0,0.92); border: none;
          color: #fff; padding: 0; box-shadow: 0 16px 48px rgba(0,0,0,0.9);
          width: 95vw; height: 95vh; max-width: 95vw; max-height: 95vh;
          border-radius: var(--flowx-radius-lg); overflow: hidden; outline: none;
        }
        dialog::backdrop { background: rgba(0, 0, 0, 0.9); }
        .viewer-container { display: flex; flex-direction: column; height: 100%; position: relative; }
        .toolbar { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; background: rgba(0,0,0,0.4); }
        .title { font-size: 14px; font-weight: 500; }
        .tools { display: flex; gap: 8px; }
        .btn { background: rgba(255,255,255,0.1); border: none; color: #fff; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 13px; }
        .btn:hover { background: rgba(255,255,255,0.25); }
        .img-stage { flex: 1; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
        img { max-width: 90%; max-height: 90%; object-fit: contain; transition: transform 0.2s; cursor: zoom-in; }
        .nav-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(0,0,0,0.6); border: none; color: #fff;
          width: 44px; height: 44px; border-radius: 50%; cursor: pointer; font-size: 18px;
        }
        .nav-btn:hover { background: rgba(255,255,255,0.3); }
        .prev-btn { left: 16px; }
        .next-btn { right: 16px; }
      </style>
      <dialog>
        <div class="viewer-container">
          <div class="toolbar">
            <span class="title">${alt || 'Image Viewer'} ${hasMultiple ? `(${this.currentIndex + 1}/${this.galleryImages.length})` : ''}</span>
            <div class="tools">
              <button type="button" class="btn" id="zoom-btn">🔍 Zoom</button>
              <button type="button" class="btn" fx-dialog-close>✕ Close</button>
            </div>
          </div>
          <div class="img-stage">
            ${hasMultiple ? '<button type="button" class="nav-btn prev-btn" id="prev-btn">◀</button>' : ''}
            <img src="${src}" alt="${alt}" id="viewer-img" />
            ${hasMultiple ? '<button type="button" class="nav-btn next-btn" id="next-btn">▶</button>' : ''}
          </div>
        </div>
      </dialog>
    `;

    this.nativeDialog = this.shadowRoot.querySelector('dialog');
    this.shadowRoot.querySelector('#zoom-btn')?.addEventListener('click', () => this.toggleZoom());
    this.shadowRoot
      .querySelector('#viewer-img')
      ?.addEventListener('click', () => this.toggleZoom());
    this.shadowRoot.querySelector('#prev-btn')?.addEventListener('click', () => this.prev());
    this.shadowRoot.querySelector('#next-btn')?.addEventListener('click', () => this.next());

    this.syncNativeState();
  }
}

if (!customElements.get('flowx-image-viewer')) {
  customElements.define('flowx-image-viewer', FlowXImageViewer);
}
