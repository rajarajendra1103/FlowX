import { defineFormAssociatedElement } from '../../form-helper';

defineFormAssociatedElement('flowx-rating', {
  observedAttributes: ['max', 'value', 'readonly'],
  style: `
    :host { display: block; }
    label { display: block; font-size: var(--flowx-font-size-sm); font-weight: 600; color: #8b949e; margin-bottom: 8px; }
    .stars { display: flex; gap: 4px; }
    .star {
      font-size: 24px;
      cursor: pointer;
      color: rgba(255,255,255,0.15);
      transition: color var(--flowx-transition), transform 0.1s;
      outline: none;
    }
    .star:hover, .star.filled { color: #f0a500; }
    .star:focus-visible { outline: 2px solid var(--flowx-primary); border-radius: 3px; }
    .star:active { transform: scale(0.9); }
    :host([readonly]) .star { cursor: default; pointer-events: none; }
    :host([invalid]) .stars { outline: 2px solid var(--flowx-error); border-radius: 4px; padding: 2px; }
  `,
  template: (el) => {
    const label = el.getAttribute('label') || '';
    const max = parseInt(el.getAttribute('max') || '5', 10);
    const value = parseInt((el as any)._currentValue ?? el.getAttribute('value') ?? '0', 10);
    const readonly = el.hasAttribute('readonly');

    const stars = Array.from(
      { length: max },
      (_, i) => `
      <span class="star ${i < value ? 'filled' : ''}"
        role="radio"
        aria-label="${i + 1} star${i === 0 ? '' : 's'}"
        aria-checked="${i < value}"
        data-value="${i + 1}"
        tabindex="${readonly ? '-1' : i === (value - 1 || 0) ? '0' : '-1'}"
      >★</span>
    `,
    ).join('');

    return `
      ${label ? `<label>${label}</label>` : ''}
      <div class="stars" role="radiogroup" aria-label="${label || 'Rating'}">
        ${stars}
      </div>
    `;
  },
  setup: (el, internals) => {
    const sr = el.shadowRoot as ShadowRoot | null;
    if (!sr) return;

    const setValue = (v: number) => {
      (el as any)._currentValue = String(v);
      internals.setFormValue(String(v));
      if (el.hasAttribute('required') && v === 0) {
        try {
          internals.setValidity({ valueMissing: true }, 'Please select a rating');
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
      el.render();
      // Re-wire after re-render
      wire();
    };

    const wire = () => {
      sr.querySelectorAll<HTMLElement>('.star').forEach((star) => {
        star.addEventListener('click', () => setValue(parseInt(star.dataset.value || '0', 10)));
        star.addEventListener('keydown', (e: Event) => {
          const ke = e as KeyboardEvent;
          const v = parseInt(star.dataset.value || '0', 10);
          if (ke.key === 'Enter' || ke.key === ' ') {
            ke.preventDefault();
            setValue(v);
          }
          if (ke.key === 'ArrowRight' || ke.key === 'ArrowUp') {
            ke.preventDefault();
            setValue(Math.min(v + 1, parseInt(el.getAttribute('max') || '5', 10)));
          }
          if (ke.key === 'ArrowLeft' || ke.key === 'ArrowDown') {
            ke.preventDefault();
            setValue(Math.max(v - 1, 1));
          }
        });
      });
    };

    const initVal = parseInt(el.getAttribute('value') || '0', 10);
    internals.setFormValue(String(initVal));
    (el as any)._currentValue = String(initVal);
    wire();
  },
});
