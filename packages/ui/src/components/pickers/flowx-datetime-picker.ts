import { enhanceNativeInput, syncToNativeInput, syncFromNativeInput } from '../../enhancer';
import { createFloatingPositioner, useOutsideClickAndEscape } from '../../infra';
import { GLOBAL_THEME } from '../../helper';

export class FlowXDateTimePicker extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'disabled'];
  }

  private nativeInput: HTMLInputElement | null = null;
  private currentMonth: number = new Date().getMonth();
  private currentYear: number = new Date().getFullYear();
  private selectedDate: Date | null = null;
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
      this.parseDateTime(input.value);
    }

    syncFromNativeInput(input, (val) => {
      if (val) {
        this.parseDateTime(val);
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

  private parseDateTime(val: string) {
    const parsed = new Date(val);
    if (!isNaN(parsed.getTime())) {
      this.selectedDate = parsed;
      this.currentMonth = parsed.getMonth();
      this.currentYear = parsed.getFullYear();
      let h = parsed.getHours();
      this.selectedMinute = parsed.getMinutes();
      this.period = h >= 12 ? 'PM' : 'AM';
      h = h % 12;
      if (h === 0) h = 12;
      this.selectedHour = h;
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

  private formatDateISO(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    let h = this.selectedHour;
    if (this.period === 'PM' && h < 12) h += 12;
    if (this.period === 'AM' && h === 12) h = 0;
    const hh = String(h).padStart(2, '0');
    const min = String(this.selectedMinute).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  }

  private formatDisplay(): string {
    if (!this.selectedDate) return 'Select Date & Time…';
    const dateStr = this.selectedDate.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const hh = String(this.selectedHour).padStart(2, '0');
    const mm = String(this.selectedMinute).padStart(2, '0');
    return `${dateStr}, ${hh}:${mm} ${this.period}`;
  }

  private commit() {
    if (!this.selectedDate) this.selectedDate = new Date();
    const formatted = this.formatDateISO(this.selectedDate);
    if (this.nativeInput) {
      syncToNativeInput(this.nativeInput, formatted);
    }
    this.setAttribute('value', formatted);
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

  private prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.render();
  }

  private nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;

    const isOpen = this.hasAttribute('open');
    const displayStr = this.formatDisplay();

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const firstDayIndex = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

    const formatDateVal = (d: number) => {
      const yyyy = this.currentYear;
      const mm = String(this.currentMonth + 1).padStart(2, '0');
      const dd = String(d).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };

    const selectedStr = this.selectedDate
      ? `${this.selectedDate.getFullYear()}-${String(this.selectedDate.getMonth() + 1).padStart(2, '0')}-${String(this.selectedDate.getDate()).padStart(2, '0')}`
      : '';

    let daysHtml = '';
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      daysHtml += `<div class="day other-month">${daysInPrevMonth - i}</div>`;
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = formatDateVal(d);
      const isSelected = dateStr === selectedStr;

      daysHtml += `
        <button type="button" class="day ${isSelected ? 'selected' : ''}" 
          data-date="${dateStr}" tabindex="0">
          ${d}
        </button>
      `;
    }

    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = [0, 15, 30, 45];

    const hoursHtml = hours
      .map(
        (h) => `
      <button type="button" class="time-opt ${h === this.selectedHour ? 'selected' : ''}" data-type="hour" data-val="${h}">
        ${String(h).padStart(2, '0')}
      </button>
    `,
      )
      .join('');

    const minutesHtml = minutes
      .map(
        (m) => `
      <button type="button" class="time-opt ${m === this.selectedMinute ? 'selected' : ''}" data-type="minute" data-val="${m}">
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
        }
        .trigger:hover { border-color: rgba(255,255,255,0.25); }
        .trigger:focus-visible { outline: none; border-color: var(--flowx-primary); box-shadow: 0 0 0 3px rgba(0,102,204,0.25); }
        .icon { color: #8b949e; font-size: 14px; }
        .popover {
          display: ${isOpen ? 'flex' : 'none'}; flex-direction: column; gap: 12px;
          position: absolute; top: 100%; left: 0; z-index: 1000;
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg); padding: 12px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.5); width: 340px;
        }
        .columns { display: grid; grid-template-columns: 1fr 100px; gap: 12px; }
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .month-label { font-weight: 600; color: #e6edf3; font-size: 13px; }
        .nav-btn { background: transparent; border: none; color: #8b949e; cursor: pointer; padding: 4px; font-size: 12px; }
        .weekdays { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 10px; font-weight: 600; color: #6e7681; margin-bottom: 4px; }
        .days-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
        .day {
          aspect-ratio: 1; border: none; background: transparent; color: #c9d1d9;
          font-size: 11px; border-radius: 4px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .day:hover { background: rgba(255,255,255,0.08); }
        .day.other-month { opacity: 0.2; pointer-events: none; }
        .day.selected { background: var(--flowx-primary); color: white; font-weight: bold; }
        .time-panel { border-left: 1px solid rgba(255,255,255,0.1); padding-left: 10px; display: flex; flex-direction: column; gap: 6px; }
        .time-header { font-size: 11px; font-weight: 600; color: #6e7681; text-align: center; }
        .time-list { display: flex; flex-direction: column; gap: 2px; max-height: 140px; overflow-y: auto; }
        .time-opt { border: none; background: transparent; color: #c9d1d9; padding: 4px; font-size: 11px; border-radius: 3px; cursor: pointer; text-align: center; }
        .time-opt:hover { background: rgba(255,255,255,0.08); }
        .time-opt.selected { background: var(--flowx-primary); color: white; }
        .period-toggle { display: flex; gap: 2px; margin-top: 4px; }
        .period-btn { flex: 1; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #8b949e; padding: 3px; font-size: 10px; cursor: pointer; }
        .period-btn.active { background: rgba(255,255,255,0.12); color: #fff; border-color: var(--flowx-primary); }
      </style>

      <button type="button" class="trigger" tabindex="0" aria-label="Choose date and time, current ${displayStr}">
        <span class="icon">📅</span>
        <span>${displayStr}</span>
      </button>

      <div class="popover" role="dialog" aria-modal="true">
        <div class="columns">
          <div>
            <div class="header">
              <button type="button" class="nav-btn prev-btn">◀</button>
              <span class="month-label">${monthNames[this.currentMonth]} ${this.currentYear}</span>
              <button type="button" class="nav-btn next-btn">▶</button>
            </div>
            <div class="weekdays">
              <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            <div class="days-grid">
              ${daysHtml}
            </div>
          </div>
          <div class="time-panel">
            <div class="time-header">Time</div>
            <div class="time-list">
              ${hoursHtml}
            </div>
            <div class="time-header" style="margin-top:4px">Min</div>
            <div class="time-list">
              ${minutesHtml}
            </div>
            <div class="period-toggle">
              <button type="button" class="period-btn ${this.period === 'AM' ? 'active' : ''}" data-period="AM">AM</button>
              <button type="button" class="period-btn ${this.period === 'PM' ? 'active' : ''}" data-period="PM">PM</button>
            </div>
          </div>
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

    this.shadowRoot?.querySelector('.prev-btn')?.addEventListener('click', () => this.prevMonth());
    this.shadowRoot?.querySelector('.next-btn')?.addEventListener('click', () => this.nextMonth());

    this.shadowRoot?.querySelectorAll('.day[data-date]')?.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const dateStr = target.getAttribute('data-date');
        if (dateStr) {
          this.selectedDate = new Date(dateStr + 'T00:00:00');
          this.commit();
          this.render();
        }
      });
    });

    this.shadowRoot?.querySelectorAll('.time-opt')?.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const type = target.getAttribute('data-type');
        const val = parseInt(target.getAttribute('data-val') || '0', 10);
        if (type === 'hour') this.selectedHour = val;
        if (type === 'minute') this.selectedMinute = val;
        this.commit();
        this.render();
      });
    });

    this.shadowRoot?.querySelectorAll('.period-btn')?.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const p = target.getAttribute('data-period') as 'AM' | 'PM';
        if (p) {
          this.period = p;
          this.commit();
          this.render();
        }
      });
    });
  }
}

if (!customElements.get('flowx-datetime-picker')) {
  customElements.define('flowx-datetime-picker', FlowXDateTimePicker);
}

// Auto-register enhancer rule for input[type="datetime-local"]
enhanceNativeInput('input[type="datetime-local"]', (input, wrapper) => {
  const picker = document.createElement('flowx-datetime-picker') as FlowXDateTimePicker;
  wrapper.appendChild(picker);
  picker.attachToInput(input);
});
