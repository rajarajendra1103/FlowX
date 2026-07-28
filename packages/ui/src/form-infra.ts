/**
 * Form-side validation and server-error-swap utilities.
 *
 * validateForm(formEl) — optional client-side rule checker.
 * swapServerErrors(form, errors) — places server-returned errors into
 *   <flowx-form-error for="fieldName"> elements.
 */

export interface FieldError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

// ── Client-side validation ─────────────────────────────────────────────────

/**
 * Checks all native + FlowX form elements inside `formEl` against their
 * declared constraints (required, pattern, minlength, maxlength, min, max).
 * Returns `{ valid, errors }` — does NOT call form.reportValidity() itself.
 */
export function validateForm(formEl: HTMLFormElement): ValidationResult {
  const errors: Record<string, string> = {};

  const elements = Array.from(formEl.elements) as HTMLElement[];

  for (const el of elements) {
    const name = (el as HTMLInputElement).name;
    if (!name) continue;

    // Native inputs — use built-in validity API
    if (
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement ||
      el instanceof HTMLSelectElement
    ) {
      if (!el.validity.valid) {
        errors[name] = el.validationMessage;
      }
      continue;
    }

    // FlowX form-associated elements — read value and constraints from attributes
    const value = el.getAttribute('value') || (el as any)._currentValue || '';
    const label = el.getAttribute('label') || name;

    if (el.hasAttribute('required') && !value) {
      errors[name] = `${label} is required`;
      continue;
    }

    const pattern = el.getAttribute('pattern');
    if (pattern && value) {
      try {
        if (!new RegExp(`^(?:${pattern})$`).test(value)) {
          errors[name] = el.getAttribute('title') || `${label} is invalid`;
          continue;
        }
      } catch {
        /* ignore bad regex */
      }
    }

    const minlength = el.getAttribute('minlength');
    if (minlength && value.length < parseInt(minlength, 10)) {
      errors[name] = `${label} must be at least ${minlength} characters`;
      continue;
    }

    const maxlength = el.getAttribute('maxlength');
    if (maxlength && value.length > parseInt(maxlength, 10)) {
      errors[name] = `${label} must be at most ${maxlength} characters`;
      continue;
    }

    const min = el.getAttribute('min');
    if (min && !isNaN(Number(value)) && Number(value) < Number(min)) {
      errors[name] = `${label} must be at least ${min}`;
      continue;
    }

    const max = el.getAttribute('max');
    if (max && !isNaN(Number(value)) && Number(value) > Number(max)) {
      errors[name] = `${label} must be at most ${max}`;
      continue;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

// ── Server-error-swap ──────────────────────────────────────────────────────

/**
 * Reads the `fx-validation-errors` response header (JSON array of FieldError)
 * or a plain object, then places each message into the matching
 * <flowx-form-error for="fieldName"> element adjacent to the field.
 */
export function swapServerErrors(
  form: HTMLElement,
  errors: FieldError[] | Record<string, string>,
): void {
  // Normalise to Record<string, string>
  const map: Record<string, string> = Array.isArray(errors)
    ? Object.fromEntries(errors.map((e: FieldError) => [e.field, e.message]))
    : (errors as Record<string, string>);

  // Clear all existing errors first
  form.querySelectorAll('flowx-form-error').forEach((slot) => {
    (slot as HTMLElement).textContent = '';
    (slot as HTMLElement).removeAttribute('visible');
  });

  for (const [field, message] of Object.entries(map)) {
    const errorSlot = form.querySelector(`flowx-form-error[for="${field}"]`) as HTMLElement | null;

    if (errorSlot) {
      errorSlot.textContent = message;
      errorSlot.setAttribute('visible', '');
    }

    // Also mark the field element as invalid
    const fieldEl = form.querySelector(`[name="${field}"]`) as HTMLElement | null;

    if (fieldEl) {
      fieldEl.setAttribute('invalid', '');
    }
  }
}

/**
 * Parses the `fx-validation-errors` header from a fetch Response and calls
 * swapServerErrors. Returns true if errors were found and swapped.
 */
export async function handleValidationResponse(
  response: Response,
  form: HTMLElement,
): Promise<boolean> {
  const header = response.headers.get('fx-validation-errors');
  if (!header) return false;

  try {
    const errors = JSON.parse(header) as FieldError[] | Record<string, string>;
    swapServerErrors(form, errors);
    return true;
  } catch {
    return false;
  }
}
