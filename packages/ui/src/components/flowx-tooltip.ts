import { defineFlowXElement } from '../helper';
import { createFloatingPositioner } from '../infra';

defineFlowXElement('flowx-tooltip', {
  observedAttributes: ['content', 'placement', 'delay'],
  style: `
    :host {
      display: inline-block;
      position: relative;
    }
    .tooltip-panel {
      position: fixed;
      background: #1f2937;
      color: #ffffff;
      padding: var(--flowx-spacing-xs) var(--flowx-spacing-sm);
      border-radius: var(--flowx-radius-sm);
      font-size: var(--flowx-font-size-sm);
      font-family: var(--flowx-font-family);
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
      transition: opacity var(--flowx-transition);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.08);
      white-space: nowrap;
    }
    .tooltip-panel.visible {
      opacity: 1;
    }
  `,
  setup: (el) => {
    const panel = el.shadowRoot?.querySelector('.tooltip-panel') as HTMLElement;
    let positioner: any = null;
    let timeoutId: any = null;

    const show = () => {
      if (timeoutId) clearTimeout(timeoutId);
      const delayMs = parseInt(el.getAttribute('delay') || '100', 10);
      timeoutId = setTimeout(() => {
        if (panel) {
          panel.classList.add('visible');
          positioner = createFloatingPositioner(el, panel, {
            placement: (el.getAttribute('placement') as any) || 'top',
            offset: 8,
          });
        }
      }, delayMs);
    };

    const hide = () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (panel) {
        panel.classList.remove('visible');
      }
      if (positioner) {
        positioner.cleanup();
        positioner = null;
      }
    };

    el.addEventListener('mouseenter', show);
    el.addEventListener('mouseleave', hide);
    el.addEventListener('focusin', show);
    el.addEventListener('focusout', hide);

    const id = `flowx-tooltip-${Math.random().toString(36).substr(2, 9)}`;
    panel?.setAttribute('id', id);
    panel?.setAttribute('role', 'tooltip');
    el.setAttribute('aria-describedby', id);
  },
  template: (el) => {
    const content = el.getAttribute('content') || '';
    return `
      <slot></slot>
      <div class="tooltip-panel">${content}</div>
    `;
  },
});
