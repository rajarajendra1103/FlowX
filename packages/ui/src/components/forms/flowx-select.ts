import { defineFormAssociatedElement, INPUT_STYLE } from '../../form-helper';

/**
 * <flowx-select> — progressive-enhancement select.
 *
 * Server-render both a hidden native <select> (visible if JS never runs)
 * AND the <flowx-select> wrapper containing the same <option> children.
 *
 * Example server template:
 *   <flowx-select name="country" label="Country" required>
 *     <option value="">Choose…</option>
 *     <option value="us">United States</option>
 *     <option value="in">India</option>
 *   </flowx-select>
 *
 * Without JS: <flowx-select> is an unknown element — browsers display its
 * light-DOM content, which is just text.  That's acceptable (content visible).
 * For a richer no-JS fallback the server can additionally emit a sibling
 * <noscript><select name="country">…</select></noscript> block.
 */
defineFormAssociatedElement('flowx-select', {
  observedAttributes: ['placeholder'],
  style: `${INPUT_STYLE}
    :host { display: block; position: relative; }
    .trigger {
      display: flex; align-items: center; justify-content: space-between;
      background: #0d1117;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: var(--flowx-radius-md);
      color: #e6edf3;
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      padding: 9px 12px;
      cursor: pointer;
      user-select: none;
      transition: border-color var(--flowx-transition), box-shadow var(--flowx-transition);
    }
    :host([open]) .trigger,
    .trigger:focus-visible {
      border-color: var(--flowx-primary);
      box-shadow: 0 0 0 3px rgba(0,102,204,0.2);
      outline: none;
    }
    :host([invalid]) .trigger {
      border-color: var(--flowx-error);
      box-shadow: 0 0 0 3px rgba(220,53,69,0.15);
    }
    .chevron { font-size: 10px; opacity: 0.6; transition: transform var(--flowx-transition); }
    :host([open]) .chevron { transform: rotate(180deg); }
    .dropdown {
      display: none;
      position: absolute;
      top: calc(100% + 4px);
      left: 0; right: 0;
      background: #161b22;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: var(--flowx-radius-md);
      max-height: 220px;
      overflow-y: auto;
      z-index: 100;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    }
    :host([open]) .dropdown { display: block; }
    .option {
      padding: 9px 14px;
      cursor: pointer;
      font-size: var(--flowx-font-size-md);
      color: #c9d1d9;
      transition: background 0.15s;
    }
    .option:hover, .option[aria-selected="true"] { background: rgba(255,255,255,0.06); color: #fff; }
    .option:focus { outline: none; background: rgba(0,102,204,0.2); }
    .placeholder-text { color: #484f58; }
  `,
  template: (el) => {
    const label = el.getAttribute('label') || '';
    const hint = el.getAttribute('hint') || '';
    const required = el.hasAttribute('required');
    const currentValue = (el as any)._currentValue || el.getAttribute('value') || '';

    // Build option list from light-DOM children
    const hostEl = el as HTMLElement;
    const options = Array.from(hostEl.children).filter(
      (c: Element) => c.tagName.toLowerCase() === 'option',
    ) as HTMLOptionElement[];

    const selectedOption = options.find((o) => o.value === currentValue);
    const displayText = selectedOption
      ? selectedOption.textContent?.trim()
      : el.getAttribute('placeholder') || options[0]?.textContent?.trim() || 'Select…';

    const optionsHtml = options
      .map(
        (o) => `
      <div class="option" role="option" tabindex="0"
        data-value="${o.value}"
        aria-selected="${o.value === currentValue}">
        ${o.textContent?.trim()}
      </div>
    `,
      )
      .join('');

    return `
      ${label ? `<label>${label}${required ? ' <span aria-hidden="true" style="color:var(--flowx-error)">*</span>' : ''}</label>` : ''}
      <div class="trigger" role="combobox" tabindex="0"
        aria-haspopup="listbox"
        aria-expanded="${el.hasAttribute('open')}"
        aria-required="${required}"
      >
        <span class="${currentValue ? '' : 'placeholder-text'}">${displayText}</span>
        <span class="chevron">▾</span>
      </div>
      <div class="dropdown" role="listbox">
        ${optionsHtml}
      </div>
      ${hint ? `<div class="field-hint">${hint}</div>` : ''}
    `;
  },
  setup: (el, internals) => {
    const sr = el.shadowRoot;
    if (!sr) return;

    const trigger = sr.querySelector('.trigger') as HTMLElement | null;
    const dropdown = sr.querySelector('.dropdown') as HTMLElement | null;
    if (!trigger || !dropdown) return;

    // Set initial form value
    const initVal = (el as any)._currentValue || el.getAttribute('value') || '';
    internals.setFormValue(initVal || null);

    const selectValue = (value: string, label: string) => {
      (el as any)._currentValue = value;
      internals.setFormValue(value || null);
      el.setAttribute('value', value);
      el.removeAttribute('open');
      el.render();
      if (el.hasAttribute('required') && !value) {
        try {
          internals.setValidity(
            { valueMissing: true },
            `${el.getAttribute('label') || el.getAttribute('name')} is required`,
          );
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
        new CustomEvent('change', { bubbles: true, composed: true, detail: { value, label } }),
      );
    };

    // Re-wire after each render
    const wire = () => {
      const t = sr.querySelector('.trigger') as HTMLElement | null;
      const d = sr.querySelector('.dropdown') as HTMLElement | null;
      if (!t || !d) return;

      t.addEventListener('click', () => {
        if (!el.hasAttribute('disabled')) el.toggleAttribute('open');
      });
      t.addEventListener('keydown', (e: Event) => {
        const ke = e as KeyboardEvent;
        if (ke.key === ' ' || ke.key === 'Enter') {
          ke.preventDefault();
          el.toggleAttribute('open');
        }
        if (ke.key === 'Escape') el.removeAttribute('open');
        if (ke.key === 'ArrowDown') {
          const first = d.querySelector<HTMLElement>('.option');
          if (first) {
            el.setAttribute('open', '');
            first.focus();
          }
          ke.preventDefault();
        }
      });

      d.querySelectorAll<HTMLElement>('.option').forEach((opt) => {
        opt.addEventListener('click', () =>
          selectValue(opt.dataset.value || '', opt.textContent?.trim() || ''),
        );
        opt.addEventListener('keydown', (e: Event) => {
          const ke = e as KeyboardEvent;
          if (ke.key === 'Enter' || ke.key === ' ') {
            ke.preventDefault();
            selectValue(opt.dataset.value || '', opt.textContent?.trim() || '');
          }
          if (ke.key === 'ArrowDown') {
            (opt.nextElementSibling as HTMLElement | null)?.focus();
            ke.preventDefault();
          }
          if (ke.key === 'ArrowUp') {
            (opt.previousElementSibling as HTMLElement | null)?.focus();
            ke.preventDefault();
          }
          if (ke.key === 'Escape') {
            el.removeAttribute('open');
            t.focus();
          }
        });
      });

      // Outside click closes
      document.addEventListener(
        'click',
        (e: MouseEvent) => {
          if (!e.composedPath().includes(el)) el.removeAttribute('open');
        },
        { capture: true },
      );
    };

    wire();
  },
});
