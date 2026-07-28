import { defineFlowXElement } from '../helper';

export const FlowXToast = defineFlowXElement('flowx-toast', {
  observedAttributes: ['variant', 'duration', 'fx-sse-connect', 'sse-event'],
  style: `
    :host {
      display: block;
      width: 320px;
    }
    .toast {
      display: flex;
      align-items: center;
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      padding: var(--flowx-spacing-md);
      background: var(--flowx-bg-surface-raised, rgba(13, 17, 23, 0.95));
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid var(--flowx-border-color, rgba(240, 246, 252, 0.15));
      border-radius: var(--flowx-radius-md);
      box-shadow: var(--flowx-shadow-lg, 0 4px 16px rgba(0, 0, 0, 0.3));
      color: var(--flowx-color-text, #c9d1d9);
      animation: slideIn 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      transition: opacity 0.25s ease, transform 0.25s ease;
      gap: var(--flowx-spacing-sm);
    }
    
    .toast.fade-out {
      opacity: 0;
      transform: translateX(50px);
    }
    
    /* Variants indicators */
    .indicator {
      width: 8px;
      height: 8px;
      border-radius: var(--flowx-radius-round);
      flex-shrink: 0;
    }
    .toast.info .indicator { background-color: var(--flowx-info); }
    .toast.success .indicator { background-color: var(--flowx-success); }
    .toast.warning .indicator { background-color: var(--flowx-warning); }
    .toast.error .indicator { background-color: var(--flowx-error); }
    
    .toast-body {
      flex: 1;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `,
  setup: (el) => {
    const durationAttr = el.getAttribute('duration');
    const duration = durationAttr ? Number(durationAttr) : 3000;

    // Handle fx-sse-connect attribute for zero-JS server-pushed toasts
    const sseUrl = el.getAttribute('fx-sse-connect');
    if (sseUrl && typeof window !== 'undefined' && (window as any).EventSource) {
      try {
        const es = new EventSource(sseUrl);
        const eventName = el.getAttribute('sse-event') || 'toast';
        es.addEventListener(eventName, (e: MessageEvent) => {
          try {
            const data =
              typeof e.data === 'string' && e.data.startsWith('{')
                ? JSON.parse(e.data)
                : { message: e.data };
            FlowXToastManager.show({
              message: data.message || data.title || e.data,
              variant: data.variant || 'info',
              duration: data.duration || 3500,
            });
          } catch (err) {
            // ignore malformed message
          }
        });
        el._eventSource = es;
      } catch (err) {
        // SSE connect error fallback
      }
    }

    // Auto-remove lifecycle if not an active SSE connection listener element
    if (!sseUrl) {
      setTimeout(() => {
        const toastEl = el.shadowRoot?.querySelector('.toast');
        if (toastEl) {
          toastEl.classList.add('fade-out');
          setTimeout(() => {
            el.remove();
          }, 250);
        }
      }, duration);
    }
  },
  template: (el) => {
    const variant = el.getAttribute('variant') || 'info';
    return `
      <div class="toast ${variant}" role="status" aria-live="polite">
        <span class="indicator"></span>
        <div class="toast-body">
          <slot></slot>
        </div>
      </div>
    `;
  },
});

// Programmatic Trigger Controller
export const FlowXToastManager = {
  show(options: {
    message: string;
    duration?: number;
    variant?: 'info' | 'success' | 'warning' | 'error';
  }) {
    if (typeof document === 'undefined') return;

    let container = document.getElementById('flowx-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'flowx-toast-container';

      // Inject container styles to viewport top-right
      const style = document.createElement('style');
      style.innerHTML = `
        #flowx-toast-container {
          position: fixed;
          top: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 100000;
          pointer-events: none;
        }
        flowx-toast {
          pointer-events: auto;
        }
      `;
      document.head.appendChild(style);
      document.body.appendChild(container);
    }

    const toast = document.createElement('flowx-toast');
    if (options.variant) toast.setAttribute('variant', options.variant);
    if (options.duration) toast.setAttribute('duration', String(options.duration));
    toast.textContent = options.message;

    container.appendChild(toast);
    return toast;
  },

  connectSSE(url: string, eventName = 'toast') {
    if (typeof window === 'undefined' || !(window as any).EventSource) return;
    const es = new EventSource(url);
    es.addEventListener(eventName, (e: MessageEvent) => {
      try {
        const data =
          typeof e.data === 'string' && e.data.startsWith('{')
            ? JSON.parse(e.data)
            : { message: e.data };
        FlowXToastManager.show({
          message: data.message || data.title || e.data,
          variant: data.variant || 'info',
          duration: data.duration || 3500,
        });
      } catch (err) {
        // ignore
      }
    });
    return es;
  },
};

// Global export shorthand
if (typeof window !== 'undefined') {
  (window as any).FlowXToast = FlowXToastManager;
}
