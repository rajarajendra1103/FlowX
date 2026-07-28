import { enhanceNativeInput, syncToNativeInput, syncFromNativeInput } from '../../enhancer';
import { createFloatingPositioner, useOutsideClickAndEscape } from '../../infra';
import { GLOBAL_THEME } from '../../helper';

export class FlowXTimePicker extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'disabled'];
  }

  private nativeInput: HTMLInputElement | null = null;
  private selectedHour: number = 12;
  private selectedMinute: number = 0;
  private period: 'AM' | 'PM' = 'PM';
  private positionerCleanup: (() => void) | null = null;
  private outsideCleanup: (() => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  public attachToInput(input: HTMLInputElement): void {
    this.nativeInput = input;
    if (input.value) {
      this.parseTime(input.value);
    }

    syncFromNativeInput(input, (val) => {
      if (val) {
        this.parseTime(val);
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

  private parseTime(val: string) {
    const parts = val.split(':');
    if (parts.length >= 2) {
      let h = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      if (!isNaN(h) && !isNaN(m)) {
        this.period = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        if (h === 0) h = 12;
        this.selectedHour = h;
        this.selectedMinute = m;
      }
    }
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

  private formatTime24(): string {
    let h = this.selectedHour;
    if (this.period === 'PM' && h < 12) h += 12;
    if (this.period === 'AM' && h === 12) h = 0;
    const hh = String(h).padStart(2, '0');
    const mm = String(this.selectedMinute).padStart(2, '0');
    return `${hh}:${mm}`;
  }

  private formatDisplayTime(): string {
    const hh = String(this.selectedHour).padStart(2, '0');
    const mm = String(this.selectedMinute).padStart(2, '0');
    return `${hh}:${mm} ${this.period}`;
  }

  private commitTime() {
    const timeStr = this.formatTime24();
    if (this.nativeInput) {
      syncToNativeInput(this.nativeInput, timeStr);
    }
    this.setAttribute('value', timeStr);
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
    const displayStr = this.formatDisplayTime();

    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

    const hoursHtml = hours
      .map(
        (h) => `
      <button type="button" class="option ${h === this.selectedHour ? 'selected' : ''}" data-type="hour" data-val="${h}">
        ${String(h).padStart(2, '0')}
      </button>
    `,
      )
      .join('');

    const minutesHtml = minutes
      .map(
        (m) => `
      <button type="button" class="option ${m === this.selectedMinute ? 'selected' : ''}" data-type="minute" data-val="${m}">
        ${String(m).padStart(2, '0')}
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
          border-radius: var(--flowx-radius-md); padding: 8px 12px;
          color: #e6edf3; font-size: var(--flowx-font-size-md);
          cursor: pointer; user-select: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .trigger:hover { border-color: rgba(255,255,255,0.25); }
        .trigger:focus-visible { outline: none; border-color: var(--flowx-primary); box-shadow: 0 0 0 3px rgba(0,102,204,0.25); }
        .icon { color: #8b949e; font-size: 14px; }
        .popover {
          display: ${isOpen ? 'block' : 'none'};
          position: absolute; top: 100%; left: 0; z-index: 1000;
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg); padding: 12px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.5); width: 240px;
        }
        .picker-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; max-height: 180px; }
        .column { display: flex; flex-direction: column; overflow-y: auto; max-height: 160px; gap: 2px; padding-right: 4px; }
        .column::-webkit-scrollbar { width: 4px; }
        .column::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 2px; }
        .column-header { font-size: 11px; font-weight: 600; color: #6e7681; margin-bottom: 4px; text-align: center; }
        .option {
          border: none; background: transparent; color: #c9d1d9;
          padding: 6px; font-size: 13px; border-radius: 4px; cursor: pointer;
          text-align: center; transition: background 0.1s;
        }
        .option:hover { background: rgba(255,255,255,0.08); }
        .option.selected { background: var(--flowx-primary); color: white; font-weight: bold; }
        .period-toggle { display: flex; gap: 4px; margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px; }
        .period-btn { flex: 1; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #8b949e; padding: 5px; border-radius: 4px; font-size: 12px; cursor: pointer; font-weight: 600; }
        .period-btn.active { background: rgba(255,255,255,0.12); color: #fff; border-color: var(--flowx-primary); }
      </style>

      <button type="button" class="trigger" tabindex="0" aria-label="Choose time, current time ${displayStr}">
        <span class="icon">🕒</span>
        <span>${displayStr}</span>
      </button>

      <div class="popover" role="dialog" aria-modal="true" aria-label="Time picker">
        <div class="picker-grid">
          <div>
            <div class="column-header">Hours</div>
            <div class="column">${hoursHtml}</div>
          </div>
          <div>
            <div class="column-header">Minutes</div>
            <div class="column">${minutesHtml}</div>
          </div>
        </div>
        <div class="period-toggle">
          <button type="button" class="period-btn ${this.period === 'AM' ? 'active' : ''}" data-period="AM">AM</button>
          <button type="button" class="period-btn ${this.period === 'PM' ? 'active' : ''}" data-period="PM">PM</button>
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

    const options = this.shadowRoot?.querySelectorAll('.option');
    options?.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const type = target.getAttribute('data-type');
        const val = parseInt(target.getAttribute('data-val') || '0', 10);
        if (type === 'hour') this.selectedHour = val;
        if (type === 'minute') this.selectedMinute = val;
        this.commitTime();
        this.render();
      });
    });

    const periodBtns = this.shadowRoot?.querySelectorAll('.period-btn');
    periodBtns?.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const p = target.getAttribute('data-period') as 'AM' | 'PM';
        if (p) {
          this.period = p;
          this.commitTime();
          this.render();
        }
      });
    });
  }
}

if (!customElements.get('flowx-time-picker')) {
  customElements.define('flowx-time-picker', FlowXTimePicker);
}

// Auto-register enhancer rule for input[type="time"]
enhanceNativeInput('input[type="time"]', (input, wrapper) => {
  const picker = document.createElement('flowx-time-picker') as FlowXTimePicker;
  wrapper.appendChild(picker);
  picker.attachToInput(input);
});
