/**
 * Context detail payload dispatched with FlowX lifecycle events.
 */
export interface FlowXEventDetail {
  /** The element triggering the AJAX/swapping lifecycle. */
  element: HTMLElement;
  /** The DOM target node where swapped content will be inserted. */
  target?: HTMLElement;
  /** The raw URL endpoint queried during the AJAX operation. */
  request?: string;
  /** The fetch HTTP Response object returned from the mock or live server. */
  xhr?: Response;
  /** The error instance captured if the request fails. */
  error?: any;
}

/**
 * Public API surface of the FlowX runtime instance passed to extension `init` callbacks.
 */
export interface FlowXInstance {
  /** Scans and attaches FlowX behaviour to all matching elements within the given root. */
  process(root?: Element | Document): void;
  /** Registers a FlowX extension with the runtime. */
  addExtension(extension: FlowXExtension): void;
}

/**
 * Interface definition for registering custom FlowX middleware/extensions.
 */
export interface FlowXExtension {
  /** Uniquely identifies the extension. */
  name: string;
  /** Triggered prior to dispatching the request. Return false to cancel the operation. */
  beforeRequest?: (detail: FlowXEventDetail) => boolean | void;
  /** Triggered after content is swapped into the target node. */
  afterSwap?: (detail: FlowXEventDetail) => void;
  /** Triggered when the AJAX request throws an error or fails. */
  onError?: (detail: FlowXEventDetail) => void;
  /** Runs upon addition to initialize custom configurations on the runtime. */
  init?: (flowX: FlowXInstance) => void;
}

const extensions: FlowXExtension[] = [];

// Helper to look up FlowX values on an element (checks data-fx-*, fx-*, and data-*)
function getFlowXAttribute(element: HTMLElement, name: string): string | null {
  return (
    element.getAttribute(`data-fx-${name}`) ||
    element.getAttribute(`fx-${name}`) ||
    element.getAttribute(`data-${name}`)
  );
}

// Checks if an element has any of the FlowX request verb attributes
function hasFlowXVerb(element: HTMLElement): boolean {
  return (
    element.hasAttribute('fx-get') ||
    element.hasAttribute('data-fx-get') ||
    element.hasAttribute('data-get') ||
    element.hasAttribute('fx-post') ||
    element.hasAttribute('data-fx-post') ||
    element.hasAttribute('data-post') ||
    element.hasAttribute('fx-put') ||
    element.hasAttribute('data-fx-put') ||
    element.hasAttribute('data-put') ||
    element.hasAttribute('fx-delete') ||
    element.hasAttribute('data-fx-delete') ||
    element.hasAttribute('data-delete')
  );
}

// Debounce helper
function debounce(fn: (...args: any[]) => void, delay: number) {
  let timeout: any;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// Throttle helper
function throttle(fn: (...args: any[]) => void, limit: number) {
  let inThrottle = false;
  return (...args: any[]) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Extract inputs and values for form submission or custom parameters
function getValues(element: HTMLElement): URLSearchParams {
  const params = new URLSearchParams();

  // 1. JSON values parsed from fx-vals
  const fxVals = getFlowXAttribute(element, 'vals');
  if (fxVals) {
    try {
      const parsed = JSON.parse(fxVals);
      for (const [k, v] of Object.entries(parsed)) {
        params.append(k, String(v));
      }
    } catch (e) {
      console.error('FlowX: Failed to parse fx-vals JSON:', fxVals, e);
    }
  }

  // 2. Element inclusion criteria
  const fxInclude = getFlowXAttribute(element, 'include');
  const inputsToInclude: Array<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = [];

  if (fxInclude) {
    if (fxInclude === 'this') {
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement
      ) {
        inputsToInclude.push(element);
      } else {
        inputsToInclude.push(
          ...(Array.from(element.querySelectorAll('input, select, textarea')) as Array<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
          >),
        );
      }
    } else {
      const targets = document.querySelectorAll(fxInclude);
      targets.forEach((t) => {
        if (
          t instanceof HTMLInputElement ||
          t instanceof HTMLSelectElement ||
          t instanceof HTMLTextAreaElement
        ) {
          inputsToInclude.push(t);
        } else {
          inputsToInclude.push(
            ...(Array.from(t.querySelectorAll('input, select, textarea')) as Array<
              HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >),
          );
        }
      });
    }
  } else if (element instanceof HTMLFormElement) {
    inputsToInclude.push(
      ...(Array.from(element.querySelectorAll('input, select, textarea')) as Array<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >),
    );
  } else if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
  ) {
    inputsToInclude.push(element);
  }

  inputsToInclude.forEach((input) => {
    if (!input.name) return;
    if (input.type === 'checkbox') {
      if ((input as HTMLInputElement).checked) {
        params.append(input.name, input.value || 'on');
      }
    } else if (input.type === 'radio') {
      if ((input as HTMLInputElement).checked) {
        params.append(input.name, input.value);
      }
    } else if (input instanceof HTMLSelectElement && input.multiple) {
      Array.from(input.selectedOptions).forEach((opt) => {
        params.append(input.name, opt.value);
      });
    } else {
      params.append(input.name, input.value);
    }
  });

  return params;
}

// Find appropriate target node based on CSS selector query or helper keywords
function getTarget(element: HTMLElement): HTMLElement {
  if ((element as any)._customTarget) {
    return (element as any)._customTarget;
  }
  const targetAttr = getFlowXAttribute(element, 'target');
  if (!targetAttr) return element;
  if (targetAttr === '_custom') return (element as any)._customTarget || element;
  if (targetAttr === 'this') return element;

  if (targetAttr.startsWith('closest ')) {
    const selector = targetAttr.substring('closest '.length);
    const closest = element.closest(selector);
    return (closest as HTMLElement) || element;
  }
  if (targetAttr.startsWith('find ')) {
    const selector = targetAttr.substring('find '.length);
    const found = element.querySelector(selector);
    return (found as HTMLElement) || element;
  }

  const queryTarget = document.querySelector(targetAttr);
  return (queryTarget as HTMLElement) || element;
}

// Swap content using appropriate HTML placement method
function performSwap(target: HTMLElement, content: string, swapType: string) {
  const cleanSwapType = (swapType || 'innerHTML').trim();

  switch (cleanSwapType) {
    case 'outerHTML': {
      const parent = target.parentNode;
      if (parent) {
        const container = document.createElement('div');
        container.innerHTML = content;
        const newEl = container.firstElementChild;
        if (newEl) {
          parent.replaceChild(newEl, target);
          FlowX.process(newEl);
        } else {
          target.remove();
        }
      }
      break;
    }
    case 'beforebegin':
      target.insertAdjacentHTML('beforebegin', content);
      if (target.previousSibling) {
        FlowX.process(target.parentNode as HTMLElement);
      }
      break;
    case 'afterbegin':
      target.insertAdjacentHTML('afterbegin', content);
      FlowX.process(target);
      break;
    case 'beforeend':
      target.insertAdjacentHTML('beforeend', content);
      FlowX.process(target);
      break;
    case 'afterend':
      target.insertAdjacentHTML('afterend', content);
      if (target.nextSibling) {
        FlowX.process(target.parentNode as HTMLElement);
      }
      break;
    case 'delete':
      target.remove();
      break;
    case 'none':
      break;
    case 'innerHTML':
    default:
      target.innerHTML = content;
      FlowX.process(target);
      break;
  }
}

// Manage loading states
function toggleIndicator(element: HTMLElement, show: boolean) {
  const indicatorSelector = getFlowXAttribute(element, 'indicator');
  const indicators: HTMLElement[] = [];
  if (indicatorSelector) {
    document
      .querySelectorAll(indicatorSelector)
      .forEach((el) => indicators.push(el as HTMLElement));
  }
  indicators.push(element);

  indicators.forEach((ind) => {
    if (show) {
      ind.classList.add('fx-request-loading');
    } else {
      ind.classList.remove('fx-request-loading');
    }
  });
}

// Core request handler
async function handleRequest(element: HTMLElement, event?: Event) {
  if (event && element instanceof HTMLFormElement && event.type === 'submit') {
    event.preventDefault();
  }

  const getUrl = getFlowXAttribute(element, 'get');
  const postUrl = getFlowXAttribute(element, 'post');
  const putUrl = getFlowXAttribute(element, 'put');
  const deleteUrl = getFlowXAttribute(element, 'delete');

  const method = getUrl ? 'GET' : postUrl ? 'POST' : putUrl ? 'PUT' : deleteUrl ? 'DELETE' : null;
  const rawUrl = getUrl || postUrl || putUrl || deleteUrl;

  if (!method || !rawUrl) return;

  const target = getTarget(element);
  const swapType = getFlowXAttribute(element, 'swap') || 'innerHTML';

  const detail: FlowXEventDetail = { element, target, request: rawUrl };

  // Dispatch beforeRequest (Standard and Namespaced)
  const beforeReqEvent = new CustomEvent('beforeRequest', {
    detail,
    cancelable: true,
    bubbles: true,
  });
  const allowedStandard = element.dispatchEvent(beforeReqEvent);

  const flowxBeforeReqEvent = new CustomEvent('flowx:beforeRequest', {
    detail,
    cancelable: true,
    bubbles: true,
  });
  const allowedNamespaced = element.dispatchEvent(flowxBeforeReqEvent);

  if (!allowedStandard || !allowedNamespaced) return;

  // Run extension beforeRequest hooks
  for (const ext of extensions) {
    if (ext.beforeRequest) {
      try {
        const allowed = ext.beforeRequest(detail);
        if (allowed === false) return;
      } catch (err) {
        console.error(`FlowX Extension "${ext.name}" error in beforeRequest:`, err);
      }
    }
  }

  toggleIndicator(element, true);

  try {
    let url = rawUrl;
    const values = getValues(element);

    const headers: HeadersInit = {
      'FX-Request': 'true',
      'X-Requested-With': 'XMLHttpRequest',
    };

    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    if (method === 'GET') {
      const qString = values.toString();
      if (qString) {
        url += (url.includes('?') ? '&' : '?') + qString;
      }
    } else {
      fetchOptions.body = values;
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const content = await response.text();

    // Dispatch beforeSwap
    const beforeSwapEvent = new CustomEvent('flowx:beforeSwap', {
      detail: { ...detail, xhr: response },
      cancelable: true,
      bubbles: true,
    });
    const allowedSwap = element.dispatchEvent(beforeSwapEvent);
    if (!allowedSwap) return;

    // Trigger Swapping animations
    target.classList.add('fx-swapping');
    await new Promise((r) => setTimeout(r, 50));

    performSwap(target, content, swapType);

    target.classList.remove('fx-swapping');
    target.classList.add('fx-settling');

    await new Promise((r) => setTimeout(r, 50));
    target.classList.remove('fx-settling');

    // Run extension afterSwap hooks
    for (const ext of extensions) {
      if (ext.afterSwap) {
        try {
          ext.afterSwap(detail);
        } catch (err) {
          console.error(`FlowX Extension "${ext.name}" error in afterSwap:`, err);
        }
      }
    }

    // Dispatch afterSwap (Standard and Namespaced)
    const afterSwapEvent = new CustomEvent('afterSwap', {
      detail: { ...detail, xhr: response },
      bubbles: true,
    });
    element.dispatchEvent(afterSwapEvent);

    const flowxAfterSwapEvent = new CustomEvent('flowx:afterSwap', {
      detail: { ...detail, xhr: response },
      bubbles: true,
    });
    element.dispatchEvent(flowxAfterSwapEvent);
  } catch (error) {
    console.error('FlowX: Request Failed:', error);

    // Run extension onError hooks
    for (const ext of extensions) {
      if (ext.onError) {
        try {
          ext.onError(detail);
        } catch (err) {
          console.error(`FlowX Extension "${ext.name}" error in onError:`, err);
        }
      }
    }

    // Dispatch responseError (Standard and Namespaced)
    const responseErrorEvent = new CustomEvent('responseError', {
      detail: { ...detail, error },
      bubbles: true,
    });
    element.dispatchEvent(responseErrorEvent);

    const errorEvent = new CustomEvent('flowx:error', {
      detail: { ...detail, error },
      bubbles: true,
    });
    element.dispatchEvent(errorEvent);
  } finally {
    toggleIndicator(element, false);
  }
}

const initializedElements = new WeakSet<HTMLElement>();

function initElement(element: HTMLElement) {
  if (initializedElements.has(element)) return;

  const getUrl = getFlowXAttribute(element, 'get');
  const postUrl = getFlowXAttribute(element, 'post');
  const putUrl = getFlowXAttribute(element, 'put');
  const deleteUrl = getFlowXAttribute(element, 'delete');

  if (!getUrl && !postUrl && !putUrl && !deleteUrl) return;
  initializedElements.add(element);

  const triggerAttr = getFlowXAttribute(element, 'trigger');

  const defaultTrigger =
    element instanceof HTMLFormElement
      ? 'submit'
      : element instanceof HTMLInputElement ||
          element instanceof HTMLSelectElement ||
          element instanceof HTMLTextAreaElement
        ? 'change'
        : 'click';

  const triggersList = triggerAttr ? triggerAttr.split(',').map((t) => t.trim()) : [defaultTrigger];

  triggersList.forEach((triggerStr) => {
    const parts = triggerStr.split(/\s+/);
    const eventName = parts[0];

    let delay = 0;
    let throttleTime = 0;
    let once = false;

    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (part === 'once') {
        once = true;
      } else if (part.startsWith('delay:')) {
        const ms = part.substring('delay:'.length);
        delay = parseInt(ms, 10) || 0;
      } else if (part.startsWith('throttle:')) {
        const ms = part.substring('throttle:'.length);
        throttleTime = parseInt(ms, 10) || 0;
      }
    }

    let handler = (event?: Event) => {
      handleRequest(element, event);
    };

    if (delay > 0) {
      handler = debounce(handler, delay);
    } else if (throttleTime > 0) {
      handler = throttle(handler, throttleTime);
    }

    if (eventName === 'load') {
      handler();
    } else if (eventName === 'revealed' || eventName === 'intersect') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handler();
            if (once) {
              observer.unobserve(element);
            }
          }
        });
      });
      observer.observe(element);
    } else {
      const listenerOptions: AddEventListenerOptions = { once };
      element.addEventListener(eventName, handler, listenerOptions);
    }
  });
}

function process(root: Element | Document = document) {
  const selector =
    '[fx-get],[data-fx-get],[data-get],[fx-post],[data-fx-post],[data-post],[fx-put],[data-fx-put],[data-put],[fx-delete],[data-fx-delete],[data-delete]';
  const elements = root.querySelectorAll(selector);
  elements.forEach((el) => initElement(el as HTMLElement));
  if (root instanceof HTMLElement && hasFlowXVerb(root)) {
    initElement(root);
  }
}

let mutationObserver: MutationObserver | null = null;

/**
 * Main FlowX framework API object.
 */
export const FlowX = {
  /**
   * Initializes the FlowX engine. Scans the document.body for interactive elements and
   * sets up a MutationObserver to automatically initialize newly added DOM elements.
   */
  init() {
    process(document.body);

    if (!mutationObserver && typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              process(node);
            }
          });
        });
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }
  },
  /**
   * Manually processes a specific DOM sub-tree to bind FlowX event handlers.
   * @param root The root element or document fragment to scan.
   */
  process(root: Element | Document = document) {
    process(root);
  },
  /**
   * Performs an asynchronous AJAX call using FlowX's request and swap engine.
   * @param method The HTTP request verb (e.g. GET, POST, PUT, DELETE).
   * @param url The endpoint URL to query.
   * @param options Execution configurations including triggering element, custom target, swap style, and values.
   */
  ajax(
    method: string,
    url: string,
    options: {
      element?: HTMLElement;
      target?: HTMLElement;
      swap?: string;
      values?: Record<string, any>;
    } = {},
  ) {
    const el = options.element || document.createElement('div');
    const uMethod = method.toUpperCase();
    if (uMethod === 'GET') el.setAttribute('fx-get', url);
    else if (uMethod === 'POST') el.setAttribute('fx-post', url);
    else if (uMethod === 'PUT') el.setAttribute('fx-put', url);
    else if (uMethod === 'DELETE') el.setAttribute('fx-delete', url);

    if (options.target) {
      (el as any)._customTarget = options.target;
      el.setAttribute('fx-target', '_custom');
    }
    if (options.swap) el.setAttribute('fx-swap', options.swap);
    if (options.values) el.setAttribute('fx-vals', JSON.stringify(options.values));

    return handleRequest(el);
  },
  /**
   * Registers a middleware extension to tap into request lifecycle hooks.
   * @param extension The extension definition containing hooks.
   */
  addExtension(extension: FlowXExtension) {
    if (extensions.some((ext) => ext.name === extension.name)) {
      console.warn(`FlowX: Extension "${extension.name}" is already registered.`);
      return;
    }
    extensions.push(extension);
    if (extension.init) {
      try {
        extension.init(this);
      } catch (err) {
        console.error(`FlowX: Error initializing extension "${extension.name}":`, err);
      }
    }
  },
  /**
   * Removes a registered extension by its name identifier.
   * @param name The unique name of the extension to remove.
   */
  removeExtension(name: string) {
    const idx = extensions.findIndex((ext) => ext.name === name);
    if (idx !== -1) {
      extensions.splice(idx, 1);
    }
  },
};

// Auto-boot in browser
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FlowX.init());
  } else {
    FlowX.init();
  }
  (window as any).FlowX = FlowX;
}
