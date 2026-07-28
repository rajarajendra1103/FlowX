import { FlowXExtension, FlowXInstance, FlowXEventDetail } from '@flowx/core';

const activeSockets = new Map<string, WebSocket>();

export const FlowXWebsockets: FlowXExtension = {
  name: 'websockets',
  init(flowX: FlowXInstance) {
    const scanAndConnect = (root: Element | Document = document) => {
      const elements = root.querySelectorAll('[ws-connect], [data-ws-connect]');
      elements.forEach((el) => {
        const url = el.getAttribute('ws-connect') || el.getAttribute('data-ws-connect');
        if (!url) return;

        if (activeSockets.has(url)) return;

        console.log(`FlowX WebSockets: Connecting to "${url}"`);
        const socket = new WebSocket(url);
        activeSockets.set(url, socket);

        socket.onmessage = (event) => {
          console.log('FlowX WebSockets: Received frame data', event.data);

          const temp = document.createElement('div');
          temp.innerHTML = event.data;
          const child = temp.firstElementChild;
          if (child && child.id) {
            const targetNode = document.getElementById(child.id);
            if (targetNode) {
              targetNode.classList.add('fx-swapping');

              // Out-of-band style replacement: replace matching target element entirely
              targetNode.outerHTML = child.outerHTML;

              const updatedNode = document.getElementById(child.id);
              if (updatedNode) {
                updatedNode.classList.remove('fx-swapping');
                updatedNode.classList.add('fx-settling');
                setTimeout(() => updatedNode.classList.remove('fx-settling'), 50);
                flowX.process(updatedNode);
              }
            }
          }
        };

        socket.onerror = (err) => {
          console.error(`FlowX WebSockets Error on ${url}:`, err);
        };
      });
    };

    scanAndConnect(document);

    // Watch for dynamically added WebSocket targets
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

  beforeRequest(detail: FlowXEventDetail) {
    const el = detail.element;
    const isWsSend = el.hasAttribute('ws-send') || el.hasAttribute('data-ws-send');
    if (!isWsSend) return true; // Let FlowX request via normal HTTP fetch

    // Search for closest ws-connect parent context
    const wsParent = el.closest('[ws-connect], [data-ws-connect]');
    if (!wsParent) {
      console.warn('FlowX WebSockets: ws-send element has no parent container with ws-connect.');
      return true; // Fallback to HTTP
    }

    const url = wsParent.getAttribute('ws-connect') || wsParent.getAttribute('data-ws-connect');
    if (!url) return true;

    const socket = activeSockets.get(url);
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error('FlowX WebSockets: WebSocket connection is not open.');
      return false; // Abort HTTP request, don't execute fetch
    }

    // Collect values from target form or inputs
    const payload: Record<string, string> = {};
    const inputs: Array<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = [];

    if (el instanceof HTMLFormElement) {
      inputs.push(
        ...(Array.from(el.querySelectorAll('input, select, textarea')) as Array<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >),
      );
    } else {
      inputs.push(
        ...(Array.from(el.querySelectorAll('input, select, textarea')) as Array<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >),
      );
      if (
        el instanceof HTMLInputElement ||
        el instanceof HTMLSelectElement ||
        el instanceof HTMLTextAreaElement
      ) {
        inputs.push(el);
      }
    }

    inputs.forEach((input) => {
      if (input.name) {
        payload[input.name] = input.value;
      }
    });

    console.log('FlowX WebSockets: Emitting frame payload', payload);
    socket.send(JSON.stringify(payload));

    // Return false to prevent FlowX from executing the normal HTTP request
    return false;
  },
};

// Auto-register extension in browser environment
if (typeof window !== 'undefined' && (window as any).FlowX) {
  (window as any).FlowX.addExtension(FlowXWebsockets);
}
export default FlowXWebsockets;
