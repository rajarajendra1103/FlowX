import { defineFormAssociatedElement, INPUT_STYLE } from '../../form-helper';

defineFormAssociatedElement('flowx-textarea', {
  observedAttributes: [
    'rows',
    'cols',
    'placeholder',
    'minlength',
    'maxlength',
    'resize',
    'readonly',
  ],
  style: `${INPUT_STYLE}
    textarea {
      resize: var(--fx-textarea-resize, vertical);
      min-height: 80px;
    }
    :host([resize="none"]) textarea { resize: none; }
    :host([resize="horizontal"]) textarea { resize: horizontal; }
    :host([resize="both"]) textarea { resize: both; }
  `,
  template: (el) => {
    const label = el.getAttribute('label') || '';
    const hint = el.getAttribute('hint') || '';
    const name = el.getAttribute('name') || '';
    const placeholder = el.getAttribute('placeholder') || '';
    const value = el.getAttribute('value') || '';
    const rows = el.getAttribute('rows') || '4';
    const required = el.hasAttribute('required') ? 'required' : '';
    const disabled = el.hasAttribute('disabled') ? 'disabled' : '';
    const readonly = el.hasAttribute('readonly') ? 'readonly' : '';
    const minlength = el.getAttribute('minlength')
      ? `minlength="${el.getAttribute('minlength')}"`
      : '';
    const maxlength = el.getAttribute('maxlength')
      ? `maxlength="${el.getAttribute('maxlength')}"`
      : '';

    return `
      ${label ? `<label for="inner">${label}${required ? ' <span aria-hidden="true" style="color:var(--flowx-error)">*</span>' : ''}</label>` : ''}
      <textarea
        id="inner"
        name="${name}"
        rows="${rows}"
        placeholder="${placeholder}"
        ${required} ${disabled} ${readonly} ${minlength} ${maxlength}
        aria-required="${!!required}"
        aria-label="${label || name}"
      >${value}</textarea>
      ${hint ? `<div class="field-hint">${hint}</div>` : ''}
    `;
  },
  setup: (el, internals) => {
    const textarea = el.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement | null;
    if (!textarea) return;

    internals.setFormValue(textarea.value);
    (el as any)._currentValue = textarea.value;

    const sync = () => {
      (el as any)._currentValue = textarea.value;
      internals.setFormValue(textarea.value);
      if (!textarea.validity.valid) {
        try {
          internals.setValidity(textarea.validity, textarea.validationMessage, textarea);
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

    textarea.addEventListener('input', sync);
    textarea.addEventListener('blur', sync);
  },
});
