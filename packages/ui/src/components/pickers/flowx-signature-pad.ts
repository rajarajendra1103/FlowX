import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-signature-pad>
 *
 * NOTE: Unlike other Tier 4 pickers which enhance native inputs, signature drawing has
 * no standard native HTML fallback equivalent and requires JavaScript.
 *
 * To maintain 100% server-rendered HTML compatibility, this element serializes the drawing
 * to a hidden <input type="hidden" name="..."> element as a Base64 PNG/SVG data URL on every
 * stroke and before form submission. The server receives the signature as a standard text form field!
 */
export class FlowXSignaturePad extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'width', 'height', 'pen-color', 'bg-color'];
  }

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private hiddenInput: HTMLInputElement | null = null;
  private isDrawing: boolean = false;
  private hasStrokes: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.ensureHiddenInput();
  }

  attributeChangedCallback() {
    this.render();
  }

  private ensureHiddenInput() {
    const name = this.getAttribute('name') || 'signature';

    // Check if hidden input already exists in Light DOM or parent form
    let existing = this.querySelector(`input[type="hidden"][name="${name}"]`) as HTMLInputElement;
    if (!existing) {
      existing = document.createElement('input');
      existing.type = 'hidden';
      existing.name = name;
      this.appendChild(existing);
    }
    this.hiddenInput = existing;

    // Attach form submit hook
    const form = this.closest('form');
    if (form) {
      form.addEventListener('submit', () => this.syncToHiddenInput());
    }
  }

  private syncToHiddenInput() {
    if (!this.hiddenInput || !this.canvas) return;
    if (this.hasStrokes) {
      const dataUrl = this.canvas.toDataURL('image/png');
      this.hiddenInput.value = dataUrl;
      this.hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
      this.hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      this.hiddenInput.value = '';
    }
  }

  public clear() {
    if (!this.canvas || !this.ctx) return;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const bgColor = this.getAttribute('bg-color') || '#0d1117';
    this.ctx.fillStyle = bgColor;
    this.ctx.fillRect(0, 0, width, height);
    this.hasStrokes = false;
    this.syncToHiddenInput();
  }

  private startDrawing(e: MouseEvent | TouchEvent) {
    if (!this.canvas || !this.ctx) return;
    this.isDrawing = true;
    const rect = this.canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    this.ctx.beginPath();
    this.ctx.moveTo(clientX - rect.left, clientY - rect.top);
  }

  private draw(e: MouseEvent | TouchEvent) {
    if (!this.isDrawing || !this.canvas || !this.ctx) return;
    e.preventDefault();
    const rect = this.canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const penColor = this.getAttribute('pen-color') || '#58a6ff';
    this.ctx.strokeStyle = penColor;
    this.ctx.lineWidth = 2.5;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    this.ctx.lineTo(clientX - rect.left, clientY - rect.top);
    this.ctx.stroke();
    this.hasStrokes = true;
  }

  private stopDrawing() {
    if (this.isDrawing) {
      this.isDrawing = false;
      this.syncToHiddenInput();
    }
  }

  private render() {
    if (!this.shadowRoot) return;

    const w = parseInt(this.getAttribute('width') || '400', 10);
    const h = parseInt(this.getAttribute('height') || '160', 10);

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: block; font-family: var(--flowx-font-family); }
        .pad-container {
          display: flex; flex-direction: column; gap: 8px;
          background: #161b22; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-lg); padding: 12px;
          max-width: ${w + 24}px;
        }
        .header { display: flex; align-items: center; justify-content: space-between; }
        .title { font-size: 13px; font-weight: 600; color: #e6edf3; }
        .note { font-size: 10px; color: #6e7681; }
        canvas {
          border: 1px dashed rgba(255,255,255,0.2); border-radius: var(--flowx-radius-md);
          background: #0d1117; cursor: crosshair; touch-action: none;
        }
        .controls { display: flex; justify-content: flex-end; gap: 8px; }
        .btn-clear {
          background: transparent; border: 1px solid rgba(255,255,255,0.15);
          color: #8b949e; border-radius: 4px; padding: 4px 10px;
          font-size: 11px; cursor: pointer; font-weight: 500;
        }
        .btn-clear:hover { color: #f85149; border-color: #f85149; background: rgba(248,81,73,0.1); }
      </style>

      <div class="pad-container">
        <div class="header">
          <span class="title">✍️ Signature</span>
          <span class="note">Requires JS for canvas drawing</span>
        </div>
        <canvas width="${w}" height="${h}"></canvas>
        <div class="controls">
          <button type="button" class="btn-clear">Clear</button>
        </div>
      </div>
    `;

    this.canvas = this.shadowRoot.querySelector('canvas');
    if (this.canvas && typeof this.canvas.getContext === 'function') {
      try {
        this.ctx = this.canvas.getContext('2d');
        this.clear();
        this.setupCanvasListeners();
      } catch {
        // Handle headless test environments without canvas 2D support
      }
    }
  }

  private setupCanvasListeners() {
    if (!this.canvas) return;

    this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
    this.canvas.addEventListener('mousemove', (e) => this.draw(e));
    window.addEventListener('mouseup', () => this.stopDrawing());

    this.canvas.addEventListener('touchstart', (e) => this.startDrawing(e), { passive: false });
    this.canvas.addEventListener('touchmove', (e) => this.draw(e), { passive: false });
    window.addEventListener('touchend', () => this.stopDrawing());

    const clearBtn = this.shadowRoot?.querySelector('.btn-clear');
    clearBtn?.addEventListener('click', () => this.clear());
  }
}

if (!customElements.get('flowx-signature-pad')) {
  customElements.define('flowx-signature-pad', FlowXSignaturePad);
}
