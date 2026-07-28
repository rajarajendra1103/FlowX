import { defineFormAssociatedElement } from '../../form-helper';

defineFormAssociatedElement('flowx-slider', {
  observedAttributes: ['min', 'max', 'step', 'value'],
  style: `
    :host { display: block; }
    label { display: block; font-size: var(--flowx-font-size-sm); font-weight: 600; color: #8b949e; margin-bottom: 8px; }
    .slider-wrapper { display: flex; align-items: center; gap: 12px; }
    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      flex: 1;
      height: 4px;
      background: rgba(255,255,255,0.12);
      border-radius: 2px;
      outline: none;
      cursor: pointer;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px; height: 18px;
      border-radius: 50%;
      background: var(--flowx-primary);
      cursor: pointer;
      box-shadow: 0 0 0 3px rgba(0,102,204,0.2);
      transition: box-shadow var(--flowx-transition);
    }
    input[type="range"]:focus::-webkit-slider-thumb {
      box-shadow: 0 0 0 5px rgba(0,102,204,0.35);
    }
    :host([invalid]) input[type="range"]::-webkit-slider-thumb { background: var(--flowx-error); }
    .value-badge {
      min-width: 40px; text-align: center;
      font-size: var(--flowx-font-size-sm); color: #e6edf3;
      background: rgba(255,255,255,0.08);
      border-radius: var(--flowx-radius-sm);
      padding: 2px 6px;
    }
  `,
  template: (el) => {
    const label = el.getAttribute('label') || '';
    const min = el.getAttribute('min') || '0';
    const max = el.getAttribute('max') || '100';
    const step = el.getAttribute('step') || '1';
    const value = (el as any)._currentValue ?? el.getAttribute('value') ?? '50';
    const disabled = el.hasAttribute('disabled') ? 'disabled' : '';

    return `
      ${label ? `<label>${label}</label>` : ''}
      <div class="slider-wrapper">
        <input type="range" id="inner"
          min="${min}" max="${max}" step="${step}" value="${value}"
          ${disabled}
          aria-label="${label || el.getAttribute('name') || 'Slider'}"
          aria-valuemin="${min}" aria-valuemax="${max}" aria-valuenow="${value}"
        />
        <span class="value-badge">${value}</span>
      </div>
    `;
  },
  setup: (el, internals) => {
    const input = el.shadowRoot?.querySelector('input[type="range"]') as HTMLInputElement | null;
    const badge = el.shadowRoot?.querySelector('.value-badge') as HTMLElement | null;
    if (!input) return;

    internals.setFormValue(input.value);
    (el as any)._currentValue = input.value;

    input.addEventListener('input', () => {
      (el as any)._currentValue = input.value;
      internals.setFormValue(input.value);
      input.setAttribute('aria-valuenow', input.value);
      if (badge) badge.textContent = input.value;
    });
    input.addEventListener('change', () => {
      el.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: { value: input.value },
        }),
      );
    });
  },
});
