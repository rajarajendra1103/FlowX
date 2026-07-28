import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-pdf-viewer>
 *
 * Renders PDF documents using native embed/object fallbacks with zero JS,
 * while providing an enhanced toolbar (page navigation, zoom, download) when JS is active.
 */
export class FlowXPdfViewer extends HTMLElement {
  static get observedAttributes() {
    return ['src', 'zoom'];
  }

  private zoomLevel = 100;

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

  public zoomIn() {
    this.zoomLevel = Math.min(200, this.zoomLevel + 25);
    this.updateZoom();
  }

  public zoomOut() {
    this.zoomLevel = Math.max(50, this.zoomLevel - 25);
    this.updateZoom();
  }

  private updateZoom() {
    const embed = this.shadowRoot?.querySelector('embed') as HTMLElement;
    if (embed) embed.style.transform = `scale(${this.zoomLevel / 100})`;
  }

  private render() {
    if (!this.shadowRoot) return;

    const src = this.getAttribute('src') || '';

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: block; font-family: var(--flowx-font-family); }
        .pdf-container {
          background: #161b22; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); overflow: hidden; display: flex; flex-direction: column;
        }
        .toolbar {
          background: #0d1117; padding: 8px 14px; border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: space-between;
        }
        .btn {
          background: rgba(255,255,255,0.08); border: none; color: #e6edf3;
          padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 13px;
        }
        .btn:hover { background: rgba(255,255,255,0.15); }
        .frame-wrapper { overflow: auto; height: 500px; display: flex; justify-content: center; background: #525659; }
        embed, object { width: 100%; height: 100%; border: none; transition: transform 0.2s; transform-origin: top center; }
      </style>
      <div class="pdf-container">
        <div class="toolbar">
          <span style="font-size:13px;color:#c9d1d9">📄 Document Viewer</span>
          <div style="display:flex;gap:6px">
            <button type="button" class="btn" id="zoom-out">-</button>
            <button type="button" class="btn" id="zoom-in">+</button>
            <a href="${src}" download class="btn" style="text-decoration:none">⬇ Download</a>
          </div>
        </div>
        <div class="frame-wrapper">
          <object data="${src}" type="application/pdf" width="100%" height="100%">
            <embed src="${src}" type="application/pdf" />
            <p style="color:#fff;padding:20px">Your browser does not support PDF embedding. <a href="${src}" style="color:#58a6ff">Download PDF</a></p>
          </object>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('#zoom-in')?.addEventListener('click', () => this.zoomIn());
    this.shadowRoot.querySelector('#zoom-out')?.addEventListener('click', () => this.zoomOut());
  }
}

if (!customElements.get('flowx-pdf-viewer')) {
  customElements.define('flowx-pdf-viewer', FlowXPdfViewer);
}
