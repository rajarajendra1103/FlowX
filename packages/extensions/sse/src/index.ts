import { FlowXExtension } from '@flowx/core';

const activeSources = new Map<string, EventSource>();

export const FlowXSse: FlowXExtension = {
  name: 'sse',
  init(flowX) {
    const scanAndConnect = (root: Element | Document = document) => {
      const elements = root.querySelectorAll('[sse-connect], [data-sse-connect]');
      elements.forEach((el) => {
        const url = el.getAttribute('sse-connect') || el.getAttribute('data-sse-connect');
        if (!url) return;

        if (activeSources.has(url)) return;

        console.log(`FlowX SSE: Connecting to "${url}"`);
        const source = new EventSource(url);
        activeSources.set(url, source);

        // Find elements listening to SSE events inside this connection scope
        const swapElements = el.querySelectorAll('[sse-swap], [data-sse-swap]');
        swapElements.forEach((swapEl) => {
          const eventName = swapEl.getAttribute('sse-swap') || swapEl.getAttribute('data-sse-swap');
          if (!eventName) return;

          source.addEventListener(eventName, (e: MessageEvent) => {
            const targetAttr =
              swapEl.getAttribute('fx-target') ||
              swapEl.getAttribute('data-fx-target') ||
              swapEl.getAttribute('data-target') ||
              'this';

            let targetNode: HTMLElement | null = null;
            if (targetAttr === 'this') {
              targetNode = swapEl as HTMLElement;
            } else {
              targetNode = document.querySelector(targetAttr) as HTMLElement;
            }

            if (targetNode) {
              const swapStrategy =
                swapEl.getAttribute('fx-swap') ||
                swapEl.getAttribute('data-fx-swap') ||
                swapEl.getAttribute('data-swap') ||
                'innerHTML';

              targetNode.classList.add('fx-swapping');

              // Apply the swap
              if (swapStrategy === 'innerHTML') {
                targetNode.innerHTML = e.data;
              } else if (swapStrategy === 'outerHTML') {
                targetNode.outerHTML = e.data;
              } else if (swapStrategy === 'beforeend') {
                targetNode.insertAdjacentHTML('beforeend', e.data);
              } else if (swapStrategy === 'afterbegin') {
                targetNode.insertAdjacentHTML('afterbegin', e.data);
              } else if (swapStrategy === 'beforebegin') {
                targetNode.insertAdjacentHTML('beforebegin', e.data);
              } else if (swapStrategy === 'afterend') {
                targetNode.insertAdjacentHTML('afterend', e.data);
              } else if (swapStrategy === 'delete') {
                targetNode.remove();
              }

              targetNode.classList.remove('fx-swapping');
              targetNode.classList.add('fx-settling');

              setTimeout(() => {
                targetNode?.classList.remove('fx-settling');
              }, 50);

              // Process FlowX reactivity in the newly swapped content
              flowX.process(targetNode);
            }
          });
        });

        source.onerror = (err) => {
          console.error(`FlowX SSE Error on ${url}:`, err);
        };
      });
    };

    scanAndConnect(document);

    // Set up MutationObserver to bind to newly injected SSE elements
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              scanAndConnect(node);
            }
          });
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  },
};

// Auto-register extension in browser environment
if (typeof window !== 'undefined' && (window as any).FlowX) {
  (window as any).FlowX.addExtension(FlowXSse);
}
export default FlowXSse;
