import { defineFormAssociatedElement, INPUT_STYLE } from '../../form-helper';
import {
  createFloatingPositioner,
  createRovingTabindex,
  useOutsideClickAndEscape,
} from '../../infra';

defineFormAssociatedElement('flowx-autocomplete', {
  observedAttributes: ['options', 'placeholder', 'minchars'],
  style: `${INPUT_STYLE}
    :host { display: block; position: relative; }
    .input-wrapper { position: relative; }
    .clear-btn {
      position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
      background: none; border: none; color: #6e7681; cursor: pointer;
      font-size: 14px; padding: 2px 4px;
      display: none;
    }
    .clear-btn.visible { display: block; }
    .listbox {
      position: fixed;
      display: none;
      background: #161b22;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: var(--flowx-radius-md);
      max-height: 220px;
      overflow-y: auto;
      z-index: 200;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      min-width: 200px;
    }
    .listbox.open { display: block; }
    .option {
      padding: 9px 14px;
      cursor: pointer;
      font-size: var(--flowx-font-size-md);
      color: #c9d1d9;
      transition: background 0.15s;
      outline: none;
    }
    .option:hover, .option[aria-selected="true"] { background: rgba(255,255,255,0.06); color: #fff; }
    .option:focus { background: rgba(0,102,204,0.2); }
    .no-results { padding: 9px 14px; color: #6e7681; font-size: var(--flowx-font-size-sm); }
  `,
  template: (el) => {
    const label = el.getAttribute('label') || '';
    const hint = el.getAttribute('hint') || '';
    const placeholder = el.getAttribute('placeholder') || 'Search…';
    const name = el.getAttribute('name') || '';
    const required = el.hasAttribute('required');
    const disabled = el.hasAttribute('disabled') ? 'disabled' : '';
    const displayValue =
      (el as any)._displayValue || (el as any)._currentValue || el.getAttribute('value') || '';

    return `
      ${label ? `<label for="ac-input">${label}${required ? ' <span aria-hidden="true" style="color:var(--flowx-error)">*</span>' : ''}</label>` : ''}
      <div class="input-wrapper">
        <input
          id="ac-input"
          type="text"
          name="${name}"
          value="${displayValue}"
          placeholder="${placeholder}"
          autocomplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-required="${required}"
          ${disabled}
        />
        <button class="clear-btn ${displayValue ? 'visible' : ''}" type="button" aria-label="Clear">✕</button>
      </div>
      <div class="listbox" role="listbox" aria-label="${label || name}"></div>
      ${hint ? `<div class="field-hint">${hint}</div>` : ''}
    `;
  },
  setup: (el, internals) => {
    const hostEl = el as HTMLElement;
    const sr = hostEl.shadowRoot as ShadowRoot | null;
    if (!sr) return;

    const input = sr.querySelector<HTMLInputElement>('#ac-input');
    const listbox = sr.querySelector<HTMLElement>('.listbox');
    const clearBtn = sr.querySelector<HTMLButtonElement>('.clear-btn');
    if (!input || !listbox) return;

    // Parse options from attribute (JSON array or comma-separated)
    const getOptions = (): Array<{ label: string; value: string }> => {
      const raw = el.getAttribute('options') || '';
      if (!raw) return [];
      try {
        const parsed = JSON.parse(raw);
        return parsed.map((o: any) => (typeof o === 'string' ? { label: o, value: o } : o));
      } catch {
        return raw.split(',').map((s: string) => ({ label: s.trim(), value: s.trim() }));
      }
    };

    let positioner: { update: () => void; cleanup: () => void } | null = null;
    let rovingCleanup: (() => void) | null = null;
    let outsideCleanup: { cleanup: () => void } | null = null;

    const openList = (filtered: Array<{ label: string; value: string }>) => {
      listbox.innerHTML = filtered.length
        ? filtered
            .map(
              (o) =>
                `<div class="option" role="option" tabindex="0" data-value="${o.value}" aria-selected="false">${o.label}</div>`,
            )
            .join('')
        : `<div class="no-results">No results</div>`;
      listbox.classList.add('open');
      input.setAttribute('aria-expanded', 'true');

      if (positioner) positioner.cleanup();
      positioner = createFloatingPositioner(input, listbox, {
        placement: 'bottom',
        align: 'start',
        offset: 4,
      });

      if (rovingCleanup) rovingCleanup();
      const r = createRovingTabindex(listbox, '.option');
      rovingCleanup = r.cleanup;

      listbox.querySelectorAll<HTMLElement>('.option').forEach((opt: HTMLElement) => {
        opt.addEventListener('click', () =>
          selectOption(opt.dataset.value || '', opt.textContent || ''),
        );
        opt.addEventListener('keydown', (e: Event) => {
          const ke = e as KeyboardEvent;
          if (ke.key === 'Enter' || ke.key === ' ') {
            ke.preventDefault();
            selectOption(opt.dataset.value || '', opt.textContent || '');
          }
          if (ke.key === 'Escape') {
            closeList();
            input.focus();
          }
          if (ke.key === 'Tab') {
            closeList();
          }
        });
      });

      if (outsideCleanup) outsideCleanup.cleanup();
      outsideCleanup = useOutsideClickAndEscape(el, closeList);
    };

    const closeList = () => {
      listbox.classList.remove('open');
      input.setAttribute('aria-expanded', 'false');
      if (positioner) {
        positioner.cleanup();
        positioner = null;
      }
      if (rovingCleanup) {
        rovingCleanup();
        rovingCleanup = null;
      }
      if (outsideCleanup) {
        outsideCleanup.cleanup();
        outsideCleanup = null;
      }
    };

    const selectOption = (value: string, label: string) => {
      (el as any)._currentValue = value;
      (el as any)._displayValue = label.trim();
      internals.setFormValue(value);
      input.value = label.trim();
      if (clearBtn) clearBtn.classList.add('visible');
      closeList();

      if (el.hasAttribute('required') && !value) {
        try {
          internals.setValidity({ valueMissing: true }, 'Please select an option');
        } catch {
          /* shim */
        }
        el.setAttribute('invalid', '');
      } else {
        try {
          internals.setValidity({});
        } catch {
          /* shim */
        }
        el.removeAttribute('invalid');
      }
      el.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: { value, label: label.trim() },
        }),
      );
    };

    const minChars = parseInt(el.getAttribute('minchars') || '0', 10);

    input.addEventListener('input', () => {
      const query = input.value.toLowerCase();
      if (clearBtn) clearBtn.classList.toggle('visible', input.value.length > 0);

      if (query.length < minChars) {
        closeList();
        return;
      }

      const opts = getOptions().filter((o) => o.label.toLowerCase().includes(query));
      if (opts.length > 0 || query.length > 0) {
        openList(opts);
      } else {
        closeList();
      }
    });

    input.addEventListener('keydown', (e: Event) => {
      const ke = e as KeyboardEvent;
      if (ke.key === 'Escape') {
        closeList();
      }
      if (ke.key === 'ArrowDown') {
        const first = listbox.querySelector<HTMLElement>('.option');
        if (first) {
          ke.preventDefault();
          first.focus();
        } else {
          ke.preventDefault();
          openList(getOptions());
          listbox.querySelector<HTMLElement>('.option')?.focus();
        }
      }
    });

    clearBtn?.addEventListener('click', () => {
      input.value = '';
      (el as any)._currentValue = '';
      (el as any)._displayValue = '';
      internals.setFormValue(null);
      clearBtn.classList.remove('visible');
      closeList();
      input.focus();
    });

    // Set initial value
    const initVal = el.getAttribute('value') || '';
    if (initVal) internals.setFormValue(initVal);
  },
});
