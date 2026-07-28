import { defineFormAssociatedElement } from '../../form-helper';

defineFormAssociatedElement('flowx-otp-input', {
  observedAttributes: ['length'],
  style: `
    :host { display: block; }
    label { display: block; font-size: var(--flowx-font-size-sm); font-weight: 600; color: #8b949e; margin-bottom: 8px; }
    .otp-row { display: flex; gap: 8px; }
    .otp-cell {
      width: 44px; height: 52px;
      text-align: center;
      font-size: 20px; font-weight: 700;
      color: #e6edf3;
      background: #0d1117;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: var(--flowx-radius-md);
      outline: none;
      caret-color: var(--flowx-primary);
      transition: border-color var(--flowx-transition), box-shadow var(--flowx-transition);
    }
    .otp-cell:focus {
      border-color: var(--flowx-primary);
      box-shadow: 0 0 0 3px rgba(0,102,204,0.2);
    }
    :host([invalid]) .otp-cell { border-color: var(--flowx-error); }
    :host([invalid]) .otp-cell:focus { box-shadow: 0 0 0 3px rgba(220,53,69,0.15); }
    .hint { font-size: var(--flowx-font-size-sm); color: #6e7681; margin-top: 6px; }
  `,
  template: (el) => {
    const label = el.getAttribute('label') || '';
    const hint = el.getAttribute('hint') || '';
    const length = parseInt(el.getAttribute('length') || '6', 10);
    const existing = ((el as any)._currentValue || '').split('');

    const cells = Array.from(
      { length },
      (_, i) => `
      <input class="otp-cell" type="text" inputmode="numeric" pattern="[0-9]"
        maxlength="1" autocomplete="one-time-code"
        data-index="${i}"
        value="${existing[i] || ''}"
        aria-label="Digit ${i + 1} of ${length}"
      />
    `,
    ).join('');

    return `
      ${label ? `<label>${label}</label>` : ''}
      <div class="otp-row" role="group" aria-label="${label || 'OTP Input'}">
        ${cells}
      </div>
      ${hint ? `<div class="hint">${hint}</div>` : ''}
    `;
  },
  setup: (el, internals) => {
    const hostEl = el as HTMLElement;
    const sr = hostEl.shadowRoot as ShadowRoot | null;
    if (!sr) return;

    const wire = () => {
      const cells = Array.from(
        sr.querySelectorAll<HTMLInputElement>('.otp-cell'),
      ) as HTMLInputElement[];
      if (!cells.length) return;

      const getOtp = () => cells.map((c) => c.value).join('');

      const syncValue = () => {
        const otp = getOtp();
        (el as any)._currentValue = otp;
        internals.setFormValue(otp || null);
        const required = el.hasAttribute('required');
        const len = parseInt(el.getAttribute('length') || '6', 10);
        if (required && otp.length < len) {
          try {
            internals.setValidity({ valueMissing: true }, 'Please complete the OTP');
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
        if (otp.length === len) {
          el.dispatchEvent(
            new CustomEvent('fx-otp-complete', {
              bubbles: true,
              composed: true,
              detail: { value: otp },
            }),
          );
        }
      };

      cells.forEach((cell, i) => {
        cell.addEventListener('input', (e: Event) => {
          const ie = e as InputEvent;
          // Handle paste across cells
          if (ie.inputType === 'insertFromPaste') {
            const pasted = cell.value;
            if (pasted.length > 1) {
              const digits = pasted.replace(/\D/g, '').split('');
              cells.slice(i).forEach((c, j) => {
                c.value = digits[j] || '';
              });
              cells[Math.min(i + digits.length, cells.length - 1)]?.focus();
              syncValue();
              return;
            }
          }
          cell.value = cell.value.replace(/\D/g, '').slice(-1);
          if (cell.value && i < cells.length - 1) cells[i + 1].focus();
          syncValue();
        });

        cell.addEventListener('keydown', (e: Event) => {
          const ke = e as KeyboardEvent;
          if (ke.key === 'Backspace' && !cell.value && i > 0) {
            cells[i - 1].focus();
            cells[i - 1].value = '';
            syncValue();
          }
          if (ke.key === 'ArrowLeft' && i > 0) cells[i - 1].focus();
          if (ke.key === 'ArrowRight' && i < cells.length - 1) cells[i + 1].focus();
        });

        cell.addEventListener('focus', () => cell.select());
      });
    };

    wire();
  },
});
