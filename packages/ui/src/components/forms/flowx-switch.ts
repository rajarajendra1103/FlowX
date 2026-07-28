import { defineFormAssociatedElement } from '../../form-helper';

defineFormAssociatedElement('flowx-switch', {
  observedAttributes: ['checked'],
  style: `
    :host { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; }
    :host([disabled]) { cursor: not-allowed; }
    .track {
      width: 40px; height: 22px;
      background: rgba(255,255,255,0.12);
      border-radius: var(--flowx-radius-round);
      position: relative;
      transition: background var(--flowx-transition);
      flex-shrink: 0;
    }
    :host([checked]) .track { background: var(--flowx-primary); }
    :host([invalid]) .track { box-shadow: 0 0 0 2px var(--flowx-error); }
    .thumb {
      position: absolute;
      top: 3px; left: 3px;
      width: 16px; height: 16px;
      background: #fff;
      border-radius: 50%;
      transition: transform var(--flowx-transition);
      box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    }
    :host([checked]) .thumb { transform: translateX(18px); }
    .label-text { font-size: var(--flowx-font-size-md); color: #e6edf3; user-select: none; }
  `,
  template: (el) => {
    const label = el.getAttribute('label') || '';
    const id = `sw-${Math.random().toString(36).slice(2, 7)}`;
    return `
      <div class="track" role="switch"
        id="${id}"
        aria-checked="${el.hasAttribute('checked')}"
        aria-required="${el.hasAttribute('required')}"
        tabindex="${el.hasAttribute('disabled') ? '-1' : '0'}"
      >
        <div class="thumb"></div>
      </div>
      ${label ? `<span class="label-text">${label}</span>` : '<slot></slot>'}
    `;
  },
  setup: (el, internals) => {
    const track = el.shadowRoot?.querySelector('.track') as HTMLElement | null;
    if (!track) return;

    const syncValue = () => {
      const checked = el.hasAttribute('checked');
      internals.setFormValue(checked ? el.getAttribute('value') || 'on' : null);
      (el as any)._currentValue = checked ? el.getAttribute('value') || 'on' : '';
      track.setAttribute('aria-checked', String(checked));
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
