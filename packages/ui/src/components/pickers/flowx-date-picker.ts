import { enhanceNativeInput, syncToNativeInput, syncFromNativeInput } from '../../enhancer';
import { createFloatingPositioner, useOutsideClickAndEscape } from '../../infra';
import { GLOBAL_THEME } from '../../helper';

export class FlowXDatePicker extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'min', 'max', 'disabled'];
  }

  private nativeInput: HTMLInputElement | null = null;
  private currentMonth: number = new Date().getMonth();
  private currentYear: number = new Date().getFullYear();
  private selectedDate: Date | null = null;
  private positionerCleanup: (() => void) | null = null;
  private outsideCleanup: (() => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  public attachToInput(input: HTMLInputElement): void {
    this.nativeInput = input;
    if (input.value) {
      const parsed = new Date(input.value + 'T00:00:00');
      if (!isNaN(parsed.getTime())) {
        this.selectedDate = parsed;
        this.currentMonth = parsed.getMonth();
        this.currentYear = parsed.getFullYear();
      }
    }

    syncFromNativeInput(input, (val) => {
      if (val) {
        const parsed = new Date(val + 'T00:00:00');
        if (!isNaN(parsed.getTime())) {
          this.selectedDate = parsed;
          this.currentMonth = parsed.getMonth();
          this.currentYear = parsed.getFullYear();
          this.render();
        }
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

  private formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  private formatDisplayDate(date: Date | null): string {
    if (!date) return 'Select date…';
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  private selectDate(d: Date) {
    this.selectedDate = d;
    const formatted = this.formatDate(d);
    if (this.nativeInput) {
      syncToNativeInput(this.nativeInput, formatted);
    }
    this.setAttribute('value', formatted);
    this.closePopover();
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

      // Focus selected or today's date element for keyboard navigation
      const focusTarget = this.shadowRoot?.querySelector(
        '.day.selected, .day.today, .day',
      ) as HTMLElement;
      focusTarget?.focus();
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
    const displayStr = this.formatDisplayDate(this.selectedDate);

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

    // Calendar matrix calculation
    const firstDayIndex = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

    const todayStr = this.formatDate(new Date());
    const selectedStr = this.selectedDate ? this.formatDate(this.selectedDate) : '';

    let daysHtml = '';

    // Prev month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      daysHtml += `<div class="day other-month">${daysInPrevMonth - i}</div>`;
    }

    // Days in month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(this.currentYear, this.currentMonth, d);
      const dateStr = this.formatDate(dateObj);
      const isToday = dateStr === todayStr;
      const isSelected = dateStr === selectedStr;

      daysHtml += `
        <button type="button" class="day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}" 
          data-date="${dateStr}" tabindex="0" aria-label="${dateStr}">
          ${d}
        </button>
      `;
    }

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
          box-shadow: 0 12px 32px rgba(0,0,0,0.5); width: 280px;
        }
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .month-label { font-weight: 600; color: #e6edf3; font-size: 14px; }
        .nav-btn { background: transparent; border: none; color: #8b949e; cursor: pointer; padding: 4px 8px; border-radius: 4px; font-size: 14px; }
        .nav-btn:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .weekdays { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 11px; font-weight: 600; color: #6e7681; margin-bottom: 6px; }
        .days-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
        .day {
          aspect-ratio: 1; border: none; background: transparent; color: #c9d1d9;
          font-size: 12px; border-radius: 6px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          outline: none; transition: background 0.1s;
        }
        .day:hover { background: rgba(255,255,255,0.08); }
        .day.other-month { opacity: 0.25; pointer-events: none; }
        .day.today { border: 1px solid var(--flowx-primary); font-weight: bold; color: var(--flowx-primary); }
        .day.selected { background: var(--flowx-primary) !important; color: white !important; font-weight: bold; }
        .day:focus-visible { box-shadow: 0 0 0 2px #58a6ff; }
      </style>

      <button type="button" class="trigger" tabindex="0" aria-label="Choose date, current date ${displayStr}">
        <span class="icon">📅</span>
        <span>${displayStr}</span>
      </button>

      <div class="popover" role="dialog" aria-modal="true" aria-label="Calendar">
        <div class="header">
          <button type="button" class="nav-btn prev-btn" aria-label="Previous month">◀</button>
          <span class="month-label">${monthNames[this.currentMonth]} ${this.currentYear}</span>
          <button type="button" class="nav-btn next-btn" aria-label="Next month">▶</button>
        </div>
        <div class="weekdays">
          <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
        </div>
        <div class="days-grid">
          ${daysHtml}
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

    const prevBtn = this.shadowRoot?.querySelector('.prev-btn');
    prevBtn?.addEventListener('click', () => this.prevMonth());

    const nextBtn = this.shadowRoot?.querySelector('.next-btn');
    nextBtn?.addEventListener('click', () => this.nextMonth());

    const dayBtns = this.shadowRoot?.querySelectorAll('.day[data-date]');
    dayBtns?.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const dateStr = target.getAttribute('data-date');
        if (dateStr) {
          const parsed = new Date(dateStr + 'T00:00:00');
          this.selectDate(parsed);
        }
      });

      btn.addEventListener('keydown', (e: Event) => {
        const ke = e as KeyboardEvent;
        if (
          ke.key === 'ArrowRight' ||
          ke.key === 'ArrowLeft' ||
          ke.key === 'ArrowUp' ||
          ke.key === 'ArrowDown' ||
          ke.key === 'PageUp' ||
          ke.key === 'PageDown'
        ) {
          ke.preventDefault();
          const target = e.currentTarget as HTMLElement;
          const dateStr = target.getAttribute('data-date');
          if (!dateStr) return;
          const curr = new Date(dateStr + 'T00:00:00');
          if (ke.key === 'ArrowRight') curr.setDate(curr.getDate() + 1);
          if (ke.key === 'ArrowLeft') curr.setDate(curr.getDate() - 1);
          if (ke.key === 'ArrowDown') curr.setDate(curr.getDate() + 7);
          if (ke.key === 'ArrowUp') curr.setDate(curr.getDate() - 7);
          if (ke.key === 'PageUp') curr.setMonth(curr.getMonth() - 1);
          if (ke.key === 'PageDown') curr.setMonth(curr.getMonth() + 1);

          this.currentMonth = curr.getMonth();
          this.currentYear = curr.getFullYear();
          this.render();
          const nextDateStr = this.formatDate(curr);
          const nextBtnEl = this.shadowRoot?.querySelector(
            `.day[data-date="${nextDateStr}"]`,
          ) as HTMLElement;
          nextBtnEl?.focus();
        }
      });
    });
  }
}

if (!customElements.get('flowx-date-picker')) {
  customElements.define('flowx-date-picker', FlowXDatePicker);
}

// Auto-register enhancer rule for input[type="date"]
enhanceNativeInput('input[type="date"]', (input, wrapper) => {
  const picker = document.createElement('flowx-date-picker') as FlowXDatePicker;
  wrapper.appendChild(picker);
  picker.attachToInput(input);
});
