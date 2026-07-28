import { defineFormAssociatedElement } from '../../form-helper';

defineFormAssociatedElement('flowx-radio', {
  observedAttributes: ['checked', 'value'],
  style: `
    :host { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
    :host([disabled]) { cursor: not-allowed; }
    .ring {
      width: 18px; height: 18px; flex-shrink: 0;
      border: 2px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      background: transparent;
      display: flex; align-items: center; justify-content: center;
      transition: all var(--flowx-transition);
    }
    :host([checked]) .ring { border-color: var(--flowx-primary); }
    :host([invalid]) .ring { border-color: var(--flowx-error); }
    .dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--flowx-primary);
      opacity: 0; transform: scale(0);
      transition: all var(--flowx-transition);
    }
    :host([checked]) .dot { opacity: 1; transform: scale(1); }
    .label-text { font-size: var(--flowx-font-size-md); color: #e6edf3; user-select: none; }
  `,
  template: (el) => {
    const label = el.getAttribute('label') || '';
    return `
      <div class="ring" role="radio"
        aria-checked="${el.hasAttribute('checked')}"
        tabindex="${el.hasAttribute('disabled') ? '-1' : el.hasAttribute('checked') ? '0' : '-1'}"
      >
        <div class="dot"></div>
      </div>
      ${label ? `<span class="label-text">${label}</span>` : '<slot></slot>'}
    `;
  },
  setup: (el, internals) => {
    const ring = el.shadowRoot?.querySelector('.ring') as HTMLElement | null;
    if (!ring) return;

    const syncValue = () => {
      const checked = el.hasAttribute('checked');
      const val = el.getAttribute('value') || 'on';
      internals.setFormValue(checked ? val : null);
      (el as any)._currentValue = checked ? val : '';
      ring.setAttribute('aria-checked', String(checked));
    };

    syncValue();

    const select = () => {
      if (el.hasAttribute('disabled')) return;
      const name = el.getAttribute('name');
      if (name) {
        // Deselect siblings with same name in the same root
        const root = el.getRootNode() as Document | ShadowRoot;
        root.querySelectorAll(`flowx-radio[name="${name}"]`).forEach((r) => {
          if (r !== el) {
            (r as HTMLElement).removeAttribute('checked');
            (r as HTMLElement).setAttribute('tabindex', '-1');
          }
        });
      }
      el.setAttribute('checked', '');
      el.setAttribute('tabindex', '0');
      syncValue();
      el.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: { value: el.getAttribute('value') },
        }),
      );
    };

    el.addEventListener('click', select);
    el.addEventListener('keydown', (e: Event) => {
      const ke = e as KeyboardEvent;
      if (ke.key === ' ' || ke.key === 'Enter') {
        ke.preventDefault();
        select();
      }
    });
  },
});
