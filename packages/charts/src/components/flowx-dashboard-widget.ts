export class FlowXDashboardWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;

    const title = this.getAttribute('title') || 'Widget';
    const refreshEndpoint = this.getAttribute('fx-refresh');

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: system-ui, sans-serif; }
        .widget-card {
          background: #161b22; border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px; padding: 16px; box-sizing: border-box;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .title { font-size: 14px; font-weight: 600; color: #e6edf3; }
        .refresh-btn {
          background: transparent; border: none; color: #8b949e;
          cursor: pointer; padding: 4px 6px; border-radius: 4px; font-size: 13px;
        }
        .refresh-btn:hover { color: #fff; background: rgba(255,255,255,0.08); }
      </style>
      <div class="widget-card">
        <div class="header">
          <span class="title">${title}</span>
          ${refreshEndpoint ? `<button type="button" class="refresh-btn" fx-get="${refreshEndpoint}" fx-target="closest flowx-dashboard-widget">🔄</button>` : ''}
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('flowx-dashboard-widget')) {
  customElements.define('flowx-dashboard-widget', FlowXDashboardWidget);
}
