import { defineFlowXElement } from '../../helper';

export const FlowXSplitPane = defineFlowXElement('flowx-split-pane', {
  observedAttributes: ['direction', 'persist', 'storage-key', 'initial-split'],
  style: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 200px;
      box-sizing: border-box;
    }
    .split-container {
      display: flex;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background-color: var(--flowx-bg-base, #f8fafc);
      color: var(--flowx-color-text, #0f172a);
      overflow: hidden;
    }
    .split-container.vertical {
      flex-direction: column;
    }
    .pane {
      overflow: auto;
      box-sizing: border-box;
      background-color: var(--flowx-bg-surface, #ffffff);
    }
    .pane-1 {
      flex: 0 0 var(--pane-size, 50%);
    }
    .pane-2 {
      flex: 1 1 0%;
    }
    .divider {
      position: relative;
      flex: 0 0 6px;
      background-color: var(--flowx-border-color, #e2e8f0);
      cursor: col-resize;
      user-select: none;
      z-index: 10;
      transition: background-color var(--flowx-transition-fast);
    }
    .split-container.vertical .divider {
      cursor: row-resize;
      flex: 0 0 6px;
    }
    .divider:hover, .divider.dragging {
      background-color: var(--flowx-color-primary, #2563eb);
    }
    .divider::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 2px;
      height: 16px;
      background-color: var(--flowx-color-text-muted, #94a3b8);
      border-radius: 1px;
    }
    .split-container.vertical .divider::after {
      width: 16px;
      height: 2px;
    }
  `,
  template: (el) => {
    const direction = el.getAttribute('direction') || 'horizontal';
    const storageKey = el.getAttribute('storage-key') || 'flowx-split-ratio';
    const persist = el.hasAttribute('persist');
    let initialRatio = parseFloat(el.getAttribute('initial-split') || '50');

    if (persist && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = parseFloat(saved);
        if (!isNaN(parsed)) initialRatio = parsed;
      }
    }

    el._ratio = initialRatio;

    return `
      <div class="split-container ${direction}">
        <div class="pane pane-1" style="--pane-size: ${initialRatio}%">
          <slot name="pane-1"></slot>
        </div>
        <div class="divider" tabIndex="0" role="separator" aria-valuenow="${initialRatio}"></div>
        <div class="pane pane-2">
          <slot name="pane-2"></slot>
        </div>
      </div>
    `;
  },
  setup: (el) => {
    const root = el.shadowRoot || el;
    const divider = root.querySelector('.divider') as HTMLElement;
    const pane1 = root.querySelector('.pane-1') as HTMLElement;
    const container = root.querySelector('.split-container') as HTMLElement;
    if (!divider || !container || !pane1) return;

    let isDragging = false;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      divider.classList.add('dragging');
      divider.setPointerCapture(e.pointerId);
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const rect = container.getBoundingClientRect();
      const isVert = el.getAttribute('direction') === 'vertical';

      let ratio = 50;
      if (isVert) {
        const offset = e.clientY - rect.top;
        ratio = (offset / rect.height) * 100;
      } else {
        const offset = e.clientX - rect.left;
        ratio = (offset / rect.width) * 100;
      }

      // Constrain ratio between 10% and 90%
      ratio = Math.max(10, Math.min(90, ratio));
      el._ratio = ratio;
      pane1.style.setProperty('--pane-size', `${ratio}%`);
      divider.setAttribute('aria-valuenow', String(Math.round(ratio)));

      if (el.hasAttribute('persist') && typeof localStorage !== 'undefined') {
        const key = el.getAttribute('storage-key') || 'flowx-split-ratio';
        localStorage.setItem(key, String(ratio));
      }

      el.dispatchEvent(
        new CustomEvent('fx-resize', {
          bubbles: true,
          composed: true,
          detail: { ratio },
        }),
      );
    };

    const onPointerUp = (e: PointerEvent) => {
      if (isDragging) {
        isDragging = false;
        divider.classList.remove('dragging');
        try {
          divider.releasePointerCapture(e.pointerId);
        } catch (_) {
          // release pointer capture fallback
        }
      }
    };

    divider.addEventListener('pointerdown', onPointerDown);
    divider.addEventListener('pointermove', onPointerMove);
    divider.addEventListener('pointerup', onPointerUp);
    divider.addEventListener('pointercancel', onPointerUp);
  },
});
