import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-image>
 *
 * Wraps a plain <img> element, adds native loading="lazy" passthrough,
 * blur-up placeholder, and a loading skeleton shown until real image load event fires.
 * If JS fails to load, underlying <img> still renders normally without enhancement.
 */
export class FlowXImage extends HTMLElement {
  static get observedAttributes() {
    return ['src', 'alt', 'blur-src', 'loading'];
  }

  private imgEl: HTMLImageElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;

    const src = this.getAttribute('src') || '';
    const alt = this.getAttribute('alt') || '';
    const blurSrc = this.getAttribute('blur-src') || '';
    const loading = this.getAttribute('loading') || 'lazy';

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: inline-block; position: relative; overflow: hidden; font-family: var(--flowx-font-family); }
        .wrapper { position: relative; width: 100%; height: 100%; display: block; }
        .skeleton {
          position: absolute; inset: 0; background: linear-gradient(90deg, #161b22 25%, #21262d 50%, #161b22 75%);
          background-size: 200% 100%; animation: skeleton-shimmer 1.5s infinite; border-radius: inherit;
        }
        @keyframes skeleton-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        img {
          display: block; width: 100%; height: auto; border-radius: inherit;
          transition: opacity 0.3s ease, filter 0.3s ease; opacity: 0;
        }
        img.loaded { opacity: 1; filter: none; }
        img.blur { filter: blur(10px); transform: scale(1.05); }
      </style>
      <div class="wrapper">
        <div class="skeleton" id="skeleton"></div>
        <img id="img" src="${src}" alt="${alt}" loading="${loading}" class="${blurSrc ? 'blur' : ''}" />
      </div>
    `;

    this.imgEl = this.shadowRoot.querySelector('#img');
    const skeleton = this.shadowRoot.querySelector('#skeleton') as HTMLElement;

    if (this.imgEl) {
      if (this.imgEl.complete && this.imgEl.naturalHeight !== 0) {
        this.onImageLoaded(skeleton);
      } else {
        this.imgEl.addEventListener('load', () => this.onImageLoaded(skeleton));
        this.imgEl.addEventListener('error', () => {
          if (skeleton) skeleton.style.display = 'none';
          if (this.imgEl) this.imgEl.style.opacity = '1';
        });
      }
    }
  }

  private onImageLoaded(skeleton: HTMLElement | null) {
    if (skeleton) skeleton.style.display = 'none';
    if (this.imgEl) {
      this.imgEl.classList.remove('blur');
      this.imgEl.classList.add('loaded');
    }
  }
}

if (!customElements.get('flowx-image')) {
  customElements.define('flowx-image', FlowXImage);
}
