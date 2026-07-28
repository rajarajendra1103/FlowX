/**
 * Progressive Enhancement Infrastructure for Native Inputs.
 *
 * Scans the DOM for native <input> elements matching a selector,
 * hides the native input visually (preserving native form participation),
 * attaches a custom FlowX UI element next to/wrapping it, and maintains
 * two-way value synchronization between the native element and custom UI.
 */

export interface EnhancementOptions {
  /** Optional custom CSS selector to skip already enhanced elements. Defaults to `:not([data-flowx-enhanced])`. */
  skipSelector?: string;
}

export type EnhancerFunction = (input: HTMLInputElement, wrapper: HTMLElement) => void;

interface RegistryEntry {
  selector: string;
  enhancerFn: EnhancerFunction;
}

const registry: RegistryEntry[] = [];
let observer: MutationObserver | null = null;
let autoScanInitialized = false;

/**
 * Registers an enhancer rule for a specific native input selector.
 * Automatically scans the document and sets up a MutationObserver for dynamic DOM additions.
 */
export function enhanceNativeInput(selector: string, enhancerFn: EnhancerFunction): void {
  registry.push({ selector, enhancerFn });

  if (typeof document !== 'undefined') {
    // Immediate scan for existing DOM elements
    scanAndEnhance(document);

    // Auto-start observer on first call
    ensureAutoScan();
  }
}

/**
 * Scans a container (or document) and applies all registered enhancement rules.
 */
export function scanAndEnhance(root: Element | Document = document): void {
  for (const entry of registry) {
    const fullSelector = `${entry.selector}:not([data-flowx-enhanced])`;
    const elements = Array.from(root.querySelectorAll<HTMLInputElement>(fullSelector));

    for (const input of elements) {
      // Mark as enhanced to ensure idempotency
      input.setAttribute('data-flowx-enhanced', 'true');

      // Create a wrapper container placed right before or wrapping the input
      const wrapper = document.createElement('div');
      wrapper.className = 'flowx-enhanced-input-wrapper';
      wrapper.style.display = 'inline-block';
      wrapper.style.position = 'relative';

      // Visually hide native input without removing from DOM or form submission flow
      input.style.position = 'absolute';
      input.style.opacity = '0';
      input.style.pointerEvents = 'none';
      input.style.width = '0';
      input.style.height = '0';
      input.style.margin = '0';
      input.style.padding = '0';
      input.style.border = 'none';

      // Insert wrapper into DOM
      input.parentNode?.insertBefore(wrapper, input);
      wrapper.appendChild(input);

      // Execute component enhancer
      try {
        entry.enhancerFn(input, wrapper);
      } catch (err) {
        console.error(`FlowX UI: Failed to enhance element ${entry.selector}`, err);
      }
    }
  }
}

/**
 * Enables auto-scan via DOMContentLoaded and MutationObserver.
 */
function ensureAutoScan(): void {
  if (autoScanInitialized || typeof window === 'undefined') return;
  autoScanInitialized = true;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => scanAndEnhance(document));
  } else {
    scanAndEnhance(document);
  }

  // MutationObserver for dynamically inserted inputs (e.g. via FlowX swaps)
  observer = new MutationObserver((mutations) => {
    let shouldScan = false;
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        shouldScan = true;
        break;
      }
    }
    if (shouldScan) {
      scanAndEnhance(document);
    }
  });

  observer.observe(document.body || document.documentElement, {
    childList: true,
    subtree: true,
  });
}

/**
 * Utility to sync value changes from FlowX UI back to the native input element.
 * Triggers native 'input' and 'change' events so standard form listeners & validation work.
 */
export function syncToNativeInput(input: HTMLInputElement, newValue: string): void {
  if (input.value === newValue) return;

  // Set native property value
  const nativeValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value',
  )?.set;
  if (nativeValueSetter) {
    nativeValueSetter.call(input, newValue);
  } else {
    input.value = newValue;
  }

  // Dispatch events for listeners & core FlowX trigger detection
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

/**
 * Utility to listen for programmatic or native changes on the input element
 * to update the FlowX UI in reverse.
 */
export function syncFromNativeInput(
  input: HTMLInputElement,
  callback: (value: string) => void,
): () => void {
  const handleInput = () => callback(input.value);
  input.addEventListener('input', handleInput);
  input.addEventListener('change', handleInput);

  // Monitor attribute changes (e.g. element.setAttribute('value', ...))
  const attrObserver = new MutationObserver(() => {
    callback(input.value);
  });
  attrObserver.observe(input, { attributes: true, attributeFilter: ['value'] });

  return () => {
    input.removeEventListener('input', handleInput);
    input.removeEventListener('change', handleInput);
    attrObserver.disconnect();
  };
}
