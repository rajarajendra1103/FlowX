import { defineFlowXElement, GLOBAL_THEME, type ElementConfig } from '../../../ui/src/helper';

export { defineFlowXElement, GLOBAL_THEME, type ElementConfig };

export function parseJsonIsland<T>(el: HTMLElement, defaultData: T): T {
  const script = el.querySelector('script[type="application/json"]');
  if (script && script.textContent) {
    try {
      return JSON.parse(script.textContent.trim()) as T;
    } catch (e) {
      console.warn('FlowX Planner: Failed to parse JSON island', e);
    }
  }
  return defaultData;
}

export async function commitPayload(
  el: HTMLElement,
  payload: unknown,
  actionName = 'commit',
): Promise<void> {
  const endpoint = el.getAttribute('fx-post') || el.getAttribute('commit-url');

  // Always emit custom event for logger, mock handlers, and listeners
  el.dispatchEvent(
    new CustomEvent('fx-commit', {
      bubbles: true,
      composed: true,
      detail: { endpoint, payload, action: actionName },
    }),
  );

  if (endpoint) {
    try {
      const origin =
        typeof window !== 'undefined' &&
        window.location &&
        window.location.origin &&
        window.location.origin !== 'null'
          ? window.location.origin
          : 'http://localhost';
      const fullUrl = endpoint.startsWith('http') ? endpoint : new URL(endpoint, origin).toString();
      await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      // fetch fallback
    }
  }
}
