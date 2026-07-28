import { defineFlowXElement } from '../../helper';

export const FlowXDashboardLayout = defineFlowXElement('flowx-dashboard-layout', {
  observedAttributes: ['sidebar-width', 'right-panel'],
  style: `
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      min-height: 500px;
      box-sizing: border-box;
    }
    .app-shell {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      background-color: var(--flowx-bg-base, #f8fafc);
      color: var(--flowx-color-text, #0f172a);
      box-sizing: border-box;
      overflow: hidden;
      transition: background-color var(--flowx-transition-base), color var(--flowx-transition-base);
    }
    .header-region {
      flex: 0 0 auto;
      background-color: var(--flowx-bg-surface, #ffffff);
      border-bottom: 1px solid var(--flowx-border-color, #e2e8f0);
      z-index: 20;
    }
    .body-region {
      flex: 1 1 0%;
      display: flex;
      overflow: hidden;
    }
    .sidebar-region {
      flex: 0 0 var(--sidebar-w, 240px);
      background-color: var(--flowx-bg-surface, #ffffff);
      border-right: 1px solid var(--flowx-border-color, #e2e8f0);
      overflow-y: auto;
      z-index: 15;
    }
    .main-region {
      flex: 1 1 0%;
      background-color: var(--flowx-bg-base, #f8fafc);
      overflow-y: auto;
      padding: var(--flowx-space-6, 24px);
      box-sizing: border-box;
    }
    .right-panel-region {
      flex: 0 0 280px;
      background-color: var(--flowx-bg-surface-raised, #ffffff);
      border-left: 1px solid var(--flowx-border-color, #e2e8f0);
      overflow-y: auto;
      box-shadow: var(--flowx-shadow-md);
    }
    .footer-region {
      flex: 0 0 auto;
      background-color: var(--flowx-bg-surface, #ffffff);
      border-top: 1px solid var(--flowx-border-color, #e2e8f0);
      padding: var(--flowx-space-2, 8px) var(--flowx-space-4, 16px);
      font-size: var(--flowx-font-size-sm, 12px);
      color: var(--flowx-color-text-muted);
    }
  `,
  template: (el) => {
    const sidebarWidth = el.getAttribute('sidebar-width') || '240px';
    const hasRightPanel = el.hasAttribute('right-panel');

    return `
      <div class="app-shell">
        <header class="header-region">
          <slot name="header"></slot>
        </header>
        <div class="body-region">
          <aside class="sidebar-region" style="--sidebar-w: ${sidebarWidth}">
            <slot name="sidebar"></slot>
          </aside>
          <main class="main-region">
            <slot name="main"></slot>
            <slot></slot>
          </main>
          ${
            hasRightPanel
              ? `
            <aside class="right-panel-region">
              <slot name="right-panel"></slot>
            </aside>
          `
              : ''
          }
        </div>
        <footer class="footer-region">
          <slot name="footer"></slot>
        </footer>
      </div>
    `;
  },
});
