import { enhanceNativeInput, syncToNativeInput, syncFromNativeInput } from '../../enhancer';
import { createFloatingPositioner, useOutsideClickAndEscape } from '../../infra';
import { GLOBAL_THEME } from '../../helper';

export class FlowXColorPicker extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'disabled'];
  }

  private nativeInput: HTMLInputElement | null = null;
  private selectedColor: string = '#0066cc';
  private positionerCleanup: (() => void) | null = null;
  private outsideCleanup: (() => void) | null = null;

  // Preset palette swatches for design-system consistency
  private presets: string[] = [
    '#0066cc',
    '#0052a3',
    '#1f6feb',
    '#3fb950',
    '#2ea043',
    '#da3633',
    '#f85149',
    '#d29922',
    '#db6d28',
    '#a371f7',
    '#8b949e',
    '#6e7681',
    '#484f58',
    '#0d1117',
    '#ffffff',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  public attachToInput(input: HTMLInputElement): void {
    this.nativeInput = input;
    if (input.value) {
      this.selectedColor = input.value;
    }

    syncFromNativeInput(input, (val) => {
      if (val) {
        this.selectedColor = val;
        this.render();
      }
    });

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.cleanupPopover();
  }

  attributeChangedCallback() {
    this.render();
  }

  private cleanupPopover() {
    if (this.positionerCleanup) {
      this.positionerCleanup();
      this.positionerCleanup = null;
    }
    if (this.outsideCleanup) {
      this.outsideCleanup();
      this.outsideCleanup = null;
    }
  }

  private selectColor(hex: string) {
    this.selectedColor = hex;
    if (this.nativeInput) {
      syncToNativeInput(this.nativeInput, hex);
    }
    this.setAttribute('value', hex);
    this.render();
  }

  private openPopover() {
    if (this.hasAttribute('disabled')) return;
    this.setAttribute('open', '');
    this.render();

    const trigger = this.shadowRoot?.querySelector('.trigger') as HTMLElement;
    const popover = this.shadowRoot?.querySelector('.popover') as HTMLElement;

    if (trigger && popover) {
      const pos = createFloatingPositioner(trigger, popover, {
        placement: 'bottom',
        align: 'start',
        offset: 4,
      });
      this.positionerCleanup = pos.cleanup;

      const out = useOutsideClickAndEscape(this, () => this.closePopover());
      this.outsideCleanup = out.cleanup;
    }
  }

  private closePopover() {
    this.removeAttribute('open');
    this.cleanupPopover();
    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;

    const isOpen = this.hasAttribute('open');

    const presetsHtml = this.presets
      .map(
        (c) => `
      <button type="button" class="swatch ${c === this.selectedColor ? 'selected' : ''}" 
        data-color="${c}" style="background-color: ${c}" aria-label="Color ${c}">
      </button>
    `,
      )
      .join('');

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: inline-block; font-family: var(--flowx-font-family); position: relative; }
        .trigger {
          display: inline-flex; align-items: center; gap: 8px;
          background: #0d1117; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); padding: 6px 10px;
          color: #e6edf3; font-size: var(--flowx-font-size-sm); font-weight: 500;
          cursor: pointer; user-select: none;
        }
        .trigger:hover { border-color: rgba(255,255,255,0.25); }
        .trigger:focus-visible { outline: none; border-color: var(--flowx-primary); box-shadow: 0 0 0 3px rgba(0,102,204,0.25); }
        .swatch-preview {
          width: 18px; height: 18px; border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.2);
        }
        .hex-label { font-family: monospace; font-size: 12px; color: #c9d1d9; }
        .popover {
          display: ${isOpen ? 'block' : 'none'};
          position: absolute; top: 100%; left: 0; z-index: 1000;
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg); padding: 12px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.5); width: 220px;
        }
        .section-title { font-size: 11px; font-weight: 600; color: #6e7681; margin-bottom: 8px; }
        .presets-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; margin-bottom: 12px; }
        .swatch {
          width: 100%; aspect-ratio: 1; border: 1px solid rgba(255,255,255,0.15);
          border-radius: 4px; cursor: pointer; transition: transform 0.1s, box-shadow 0.1s;
        }
        .swatch:hover { transform: scale(1.15); z-index: 1; }
        .swatch.selected { box-shadow: 0 0 0 2px #fff, 0 0 0 4px var(--flowx-primary); }
        .hex-input-row { display: flex; align-items: center; gap: 8px; }
        .custom-hex {
          flex: 1; background: #0d1117; border: 1px solid rgba(255,255,255,0.12);
          border-radius: 4px; color: #e6edf3; font-family: monospace;
          padding: 6px 8px; font-size: 12px; outline: none;
        }
        .custom-hex:focus { border-color: var(--flowx-primary); }
      </style>

      <button type="button" class="trigger" aria-label="Color picker, selected ${this.selectedColor}">
        <div class="swatch-preview" style="background-color: ${this.selectedColor}"></div>
        <span class="hex-label">${this.selectedColor}</span>
      </button>

      <div class="popover" role="dialog" aria-modal="true" aria-label="Color Palette">
        <div class="section-title">Design System Presets</div>
        <div class="presets-grid">
          ${presetsHtml}
        </div>
        <div class="section-title">Custom HEX</div>
        <div class="hex-input-row">
          <input type="text" class="custom-hex" value="${this.selectedColor}" maxlength="7" spellcheck="false" />
        </div>
      </div>
    `;

    this.setupListeners();
  }

  private setupListeners() {
    const trigger = this.shadowRoot?.querySelector('.trigger');
    trigger?.addEventListener('click', () => {
      if (this.hasAttribute('open')) this.closePopover();
      else this.openPopover();
    });

    this.shadowRoot?.querySelectorAll('.swatch')?.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const color = target.getAttribute('data-color');
        if (color) this.selectColor(color);
      });
    });

    const hexInput = this.shadowRoot?.querySelector('.custom-hex') as HTMLInputElement;
    hexInput?.addEventListener('change', () => {
      let val = hexInput.value.trim();
      if (!val.startsWith('#')) val = '#' + val;
      if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
        this.selectColor(val);
      }
    });
  }
}

if (!customElements.get('flowx-color-picker')) {
  customElements.define('flowx-color-picker', FlowXColorPicker);
}

// Auto-register enhancer rule for input[type="color"]
enhanceNativeInput('input[type="color"]', (input, wrapper) => {
  const picker = document.createElement('flowx-color-picker') as FlowXColorPicker;
  wrapper.appendChild(picker);
  picker.attachToInput(input);
});
