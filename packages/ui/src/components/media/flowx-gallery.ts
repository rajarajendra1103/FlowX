import { GLOBAL_THEME } from '../../helper';
import { FlowXImageViewer } from '../overlays/flowx-image-viewer';

/**
 * <flowx-gallery>
 *
 * Grid of images built from server-rendered <img> / <flowx-image> children.
 * Clicking any image opens Tier 6's <flowx-image-viewer> with next/prev gallery navigation.
 */
export class FlowXGallery extends HTMLElement {
  private viewer: FlowXImageViewer | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupGalleryClickListeners();
  }

  private setupGalleryClickListeners() {
    const slot = this.shadowRoot?.querySelector('slot');
    slot?.addEventListener('slotchange', () => this.bindClickEvents());
    this.bindClickEvents();
  }

  private bindClickEvents() {
    const images = Array.from(this.querySelectorAll('img, flowx-image'));
    const items = images.map((img) => ({
      src: img.getAttribute('src') || img.getAttribute('data-src') || '',
      alt: img.getAttribute('alt') || '',
    }));

    images.forEach((img, index) => {
      (img as HTMLElement).style.cursor = 'pointer';
      (img as HTMLElement).onclick = (e) => {
        e.preventDefault();
        this.openGalleryViewer(items, index);
      };
    });
  }

  private openGalleryViewer(items: Array<{ src: string; alt: string }>, startIndex: number) {
    if (!this.viewer) {
      this.viewer = new FlowXImageViewer();
      document.body.appendChild(this.viewer);
    }
    this.viewer.openGallery(items, startIndex);
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: block; font-family: var(--flowx-font-family); }
        .gallery-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 16px; width: 100%;
        }
      </style>
      <div class="gallery-grid">
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get('flowx-gallery')) {
  customElements.define('flowx-gallery', FlowXGallery);
}
