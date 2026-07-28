import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-fullscreen-viewer>
 *
 * Wraps native Fullscreen API (element.requestFullscreen()) rather than <dialog>
 * for viewing any content (image, video, custom slot) truly fullscreen outside normal document flow.
 */
export class FlowXFullscreenViewer extends HTMLElement {
  static get observedAttributes() {
    return ['active'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupFullscreenListeners();
  }

  attributeChangedCallback() {
    if (this.hasAttribute('active')) {
      this.enterFullscreen();
    } else {
      this.exitFullscreen();
    }
  }

  public async enterFullscreen(): Promise<void> {
    const container = this.shadowRoot?.querySelector('.fullscreen-container');
    if (!container) return;

    if (!document.fullscreenElement) {
      try {
        await container.requestFullscreen();
      } catch (err) {
        console.warn('FlowX FullscreenViewer: Native Fullscreen API request failed', err);
      }
    }
  }

  public async exitFullscreen(): Promise<void> {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        // Ignore exit fullscreen errors
      }
    }
  }

  public toggleFullscreen(): void {
    if (document.fullscreenElement) {
      this.exitFullscreen();
    } else {
      this.enterFullscreen();
    }
  }

  private setupFullscreenListeners() {
    document.addEventListener('fullscreenchange', () => {
      const container = this.shadowRoot?.querySelector('.fullscreen-container');
      const isFs = document.fullscreenElement === container;
      if (isFs) this.setAttribute('active', '');
      else this.removeAttribute('active');
    });
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: block; font-family: var(--flowx-font-family); }
        .fullscreen-container {
          background: #0d1117; width: 100%; height: 100%; position: relative;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .fullscreen-container:fullscreen {
          width: 100vw; height: 100vh;
        }
        .controls {
          position: absolute; top: 16px; right: 16px; z-index: 100;
          display: flex; gap: 8px;
        }
        .fs-btn {
          background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.2);
          color: #fff; border-radius: 4px; padding: 6px 12px; font-size: 13px;
          cursor: pointer; font-weight: 500;
        }
        .fs-btn:hover { background: rgba(255,255,255,0.25); }
      </style>
      <div class="fullscreen-container">
        <div class="controls">
          <button type="button" class="fs-btn" id="toggle-fs">⛶ Fullscreen</button>
        </div>
        <slot></slot>
      </div>
    `;

    this.shadowRoot
      .querySelector('#toggle-fs')
      ?.addEventListener('click', () => this.toggleFullscreen());
  }
}

if (!customElements.get('flowx-fullscreen-viewer')) {
  customElements.define('flowx-fullscreen-viewer', FlowXFullscreenViewer);
}
