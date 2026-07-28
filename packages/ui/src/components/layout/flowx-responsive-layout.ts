import { defineFlowXElement } from '../../helper';

export const FlowXResponsiveLayout = defineFlowXElement('flowx-responsive-layout', {
  observedAttributes: ['breakpoint', 'collapsed'],
  style: `
    :host {
      display: block;
      width: 100%;
      container-type: inline-size;
      box-sizing: border-box;
    }
    .layout-wrapper {
      display: flex;
      width: 100%;
      height: 100%;
      background-color: var(--flowx-bg-base, #f8fafc);
      color: var(--flowx-color-text, #0f172a);
      box-sizing: border-box;
      transition: background-color var(--flowx-transition-base);
    }
    .sidebar-region {
      flex: 0 0 260px;
      background-color: var(--flowx-bg-surface, #ffffff);
      border-right: 1px solid var(--flowx-border-color, #e2e8f0);
      box-sizing: border-box;
      transition: transform var(--flowx-transition-base), width var(--flowx-transition-base);
    }
    .main-region {
      flex: 1 1 0%;
      padding: var(--flowx-space-5, 20px);
      box-sizing: border-box;
      overflow: auto;
    }

    /* Container query reflow for small widths */
    @container (max-width: 768px) {
      .layout-wrapper {
        flex-direction: column;
      }
      .sidebar-region {
        flex: 0 0 auto;
        width: 100%;
        border-right: none;
        border-bottom: 1px solid var(--flowx-border-color, #e2e8f0);
      }
    }
  `,
  template: () => {
    return `
      <div class="layout-wrapper">
        <aside class="sidebar-region">
          <slot name="sidebar"></slot>
        </aside>
        <main class="main-region">
          <slot name="main"></slot>
          <slot></slot>
        </main>
      </div>
    `;
  },
  setup: (el) => {
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = entry.contentRect.width;
          const breakpoint = parseFloat(el.getAttribute('breakpoint') || '768');
          const isCompact = width < breakpoint;
          const isCollapsed = el.hasAttribute('collapsed');

          el.setAttribute('data-compact', String(isCompact));
          el.dispatchEvent(
            new CustomEvent('fx-layout-change', {
              bubbles: true,
              composed: true,
              detail: { width, isCompact, isCollapsed },
            }),
          );
        }
      });
      ro.observe(el);
    }
  },
});
