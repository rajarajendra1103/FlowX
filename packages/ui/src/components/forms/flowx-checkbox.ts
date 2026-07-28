import { defineFormAssociatedElement } from '../../form-helper';

defineFormAssociatedElement('flowx-checkbox', {
  observedAttributes: ['checked', 'value'],
  style: `
    :host { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
    :host([disabled]) { cursor: not-allowed; }
    .box {
      width: 18px; height: 18px; flex-shrink: 0;
      border: 2px solid rgba(255,255,255,0.2);
      border-radius: var(--flowx-radius-sm);
      background: transparent;
      display: flex; align-items: center; justify-content: center;
      transition: all var(--flowx-transition);
    }
    :host([checked]) .box {
      background: var(--flowx-primary);
      border-color: var(--flowx-primary);
    }
    :host([invalid]) .box { border-color: var(--flowx-error); }
    .checkmark { display: none; color: #fff; font-size: 11px; font-weight: 800; }
    :host([checked]) .checkmark { display: block; }
    .label-text {
      font-size: var(--flowx-font-size-md);
      color: #e6edf3;
      user-select: none;
    }
  `,
  template: (el) => {
    const label = el.getAttribute('label') || '';
    return `
      <div class="box" role="checkbox"
        aria-checked="${el.hasAttribute('checked')}"
        aria-required="${el.hasAttribute('required')}"
        tabindex="${el.hasAttribute('disabled') ? '-1' : '0'}"
      >
        <span class="checkmark">✓</span>
      </div>
      ${label ? `<span class="label-text">${label}</span>` : '<slot></slot>'}
    `;
  },
  setup: (el, internals) => {
    const box = el.shadowRoot?.querySelector('.box') as HTMLElement | null;
    if (!box) return;

    const syncValue = () => {
      const checked = el.hasAttribute('checked');
      const val = el.getAttribute('value') || 'on';
      internals.setFormValue(checked ? val : null);
      (el as any)._currentValue = checked ? val : '';
      box.setAttribute('aria-checked', String(checked));

      if (el.hasAttribute('required') && !checked) {
        try {
          internals.setValidity(
            { valueMissing: true },
            `${el.getAttribute('label') || el.getAttribute('name') || 'This field'} is required`,
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
    };

    syncValue();

    const toggle = () => {
      if (el.hasAttribute('disabled')) return;
      el.toggleAttribute('checked');
      syncValue();
      el.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: { checked: el.hasAttribute('checked') },
        }),
      );
    };

    el.addEventListener('click', toggle);
    el.addEventListener('keydown', (e: Event) => {
      const ke = e as KeyboardEvent;
      if (ke.key === ' ' || ke.key === 'Enter') {
        ke.preventDefault();
        toggle();
      }
    });
  },
});
