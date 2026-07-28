import { defineFlowXElement } from '../../helper';

export const FlowXResizablePanel = defineFlowXElement('flowx-resizable-panel', {
  observedAttributes: ['handles', 'min-width', 'max-width', 'min-height', 'max-height'],
  style: `
    :host {
      display: inline-block;
      position: relative;
      box-sizing: border-box;
    }
    .panel {
      position: relative;
      box-sizing: border-box;
      background-color: var(--flowx-bg-surface, #ffffff);
      color: var(--flowx-color-text, #0f172a);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-md, 8px);
      padding: var(--flowx-space-4, 16px);
      box-shadow: var(--flowx-shadow-sm);
      height: 100%;
      width: 100%;
    }
    .handle {
      position: absolute;
      background: var(--flowx-border-color, #e2e8f0);
      z-index: 5;
      transition: background-color var(--flowx-transition-fast);
    }
    .handle:hover, .handle.dragging {
      background: var(--flowx-color-primary, #2563eb);
    }
    .handle-right {
      top: 0; right: 0; width: 6px; height: 100%; cursor: e-resize;
    }
    .handle-bottom {
      bottom: 0; left: 0; width: 100%; height: 6px; cursor: s-resize;
    }
    .handle-left {
      top: 0; left: 0; width: 6px; height: 100%; cursor: w-resize;
    }
    .handle-top {
      top: 0; left: 0; width: 100%; height: 6px; cursor: n-resize;
    }
  `,
  template: (el) => {
    const handlesAttr = el.getAttribute('handles') || 'right,bottom';
    const handleList = handlesAttr.split(',').map((s: string) => s.trim().toLowerCase());

    let handlesHtml = '';
    if (handleList.includes('right'))
      handlesHtml += `<div class="handle handle-right" data-edge="right"></div>`;
    if (handleList.includes('bottom'))
      handlesHtml += `<div class="handle handle-bottom" data-edge="bottom"></div>`;
    if (handleList.includes('left'))
      handlesHtml += `<div class="handle handle-left" data-edge="left"></div>`;
    if (handleList.includes('top'))
      handlesHtml += `<div class="handle handle-top" data-edge="top"></div>`;

    return `
      <div class="panel">
        <slot></slot>
        ${handlesHtml}
      </div>
    `;
  },
  setup: (el) => {
    const root = el.shadowRoot || el;
    const handles = root.querySelectorAll('.handle');

    handles.forEach((handle: Element) => {
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let startW = 0;
      let startH = 0;
      const edge = handle.getAttribute('data-edge');

      const onPointerDown = (e: Event) => {
        const pe = e as PointerEvent;
        isDragging = true;
        (handle as HTMLElement).classList.add('dragging');
        (handle as HTMLElement).setPointerCapture(pe.pointerId);

        const rect = el.getBoundingClientRect();
        startX = pe.clientX;
        startY = pe.clientY;
        startW = rect.width;
        startH = rect.height;
        pe.preventDefault();
      };

      const onPointerMove = (e: Event) => {
        if (!isDragging) return;
        const pe = e as PointerEvent;
        const dx = pe.clientX - startX;
        const dy = pe.clientY - startY;

        let newW = startW;
        let newH = startH;

        const minW = parseFloat(el.getAttribute('min-width') || '100');
        const maxW = parseFloat(el.getAttribute('max-width') || '2000');
        const minH = parseFloat(el.getAttribute('min-height') || '100');
        const maxH = parseFloat(el.getAttribute('max-height') || '2000');

        if (edge === 'right') newW = Math.max(minW, Math.min(maxW, startW + dx));
        if (edge === 'bottom') newH = Math.max(minH, Math.min(maxH, startH + dy));
        if (edge === 'left') newW = Math.max(minW, Math.min(maxW, startW - dx));
        if (edge === 'top') newH = Math.max(minH, Math.min(maxH, startH - dy));

        el.style.width = `${newW}px`;
        el.style.height = `${newH}px`;

        el.dispatchEvent(
          new CustomEvent('fx-resize', {
            bubbles: true,
            composed: true,
            detail: { width: newW, height: newH, edge },
          }),
        );
      };

      const onPointerUp = (e: Event) => {
        if (isDragging) {
          isDragging = false;
          (handle as HTMLElement).classList.remove('dragging');
          try {
            (handle as HTMLElement).releasePointerCapture((e as PointerEvent).pointerId);
          } catch (_) {
            // pointer capture release fallback
          }
        }
      };

      handle.addEventListener('pointerdown', onPointerDown);
      handle.addEventListener('pointermove', onPointerMove);
      handle.addEventListener('pointerup', onPointerUp);
      handle.addEventListener('pointercancel', onPointerUp);
    });
  },
});
