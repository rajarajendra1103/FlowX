import { defineFormAssociatedElement, INPUT_STYLE } from '../../form-helper';

defineFormAssociatedElement('flowx-input', {
  observedAttributes: [
    'type',
    'placeholder',
    'pattern',
    'minlength',
    'maxlength',
    'autocomplete',
    'readonly',
  ],
  style: `${INPUT_STYLE}
    .wrapper { position: relative; }
    input[type="password"] { letter-spacing: 0.1em; }
  `,
  template: (el) => {
    const label = el.getAttribute('label') || '';
    const hint = el.getAttribute('hint') || '';
    const type = el.getAttribute('type') || 'text';
    const placeholder = el.getAttribute('placeholder') || '';
    const value = el.getAttribute('value') || '';
    const name = el.getAttribute('name') || '';
    const required = el.hasAttribute('required') ? 'required' : '';
    const disabled = el.hasAttribute('disabled') ? 'disabled' : '';
    const readonly = el.hasAttribute('readonly') ? 'readonly' : '';
    const pattern = el.getAttribute('pattern') ? `pattern="${el.getAttribute('pattern')}"` : '';
    const minlength = el.getAttribute('minlength')
      ? `minlength="${el.getAttribute('minlength')}"`
      : '';
    const maxlength = el.getAttribute('maxlength')
      ? `maxlength="${el.getAttribute('maxlength')}"`
      : '';
    const autocomplete = el.getAttribute('autocomplete') || 'off';

    return `
      ${label ? `<label for="inner">${label}${required ? ' <span aria-hidden="true" style="color:var(--flowx-error)">*</span>' : ''}</label>` : ''}
      <div class="wrapper">
        <input
          id="inner"
          type="${type}"
          name="${name}"
          value="${value}"
          placeholder="${placeholder}"
          autocomplete="${autocomplete}"
          ${required} ${disabled} ${readonly} ${pattern} ${minlength} ${maxlength}
          aria-required="${!!required}"
          aria-label="${label || name}"
        />
      </div>
      ${hint ? `<div class="field-hint">${hint}</div>` : ''}
    `;
  },
  setup: (el, internals) => {
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement | null;
    if (!input) return;

    // Mirror initial value to internals
    internals.setFormValue(input.value || el.getAttribute('value') || '');
    (el as any)._currentValue = input.value;

    const sync = () => {
      (el as any)._currentValue = input.value;
      internals.setFormValue(input.value);

      // Sync validity
      if (!input.validity.valid) {
        try {
          internals.setValidity(input.validity, input.validationMessage, input);
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

    input.addEventListener('input', sync);
    input.addEventListener('change', sync);
    input.addEventListener('blur', sync);
  },
});
