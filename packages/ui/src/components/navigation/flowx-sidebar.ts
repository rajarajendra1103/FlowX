import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-sidebar>
 *
 * Persistent side navigation component, collapsible (icon-only state).
 * Persists collapsed state via a cookie (`flowx_sidebar_collapsed=true`) or localStorage,
 * allowing server-rendered HTML pages to read the cookie and render the initial state without layout flash.
 */
export class FlowXSidebar extends HTMLElement {
  static get observedAttributes() {
    return ['collapsed', 'persist'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.initPersistedState();
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  public toggleCollapse() {
    const isCollapsed = this.hasAttribute('collapsed');
    if (isCollapsed) {
      this.removeAttribute('collapsed');
      this.savePersistedState(false);
    } else {
      this.setAttribute('collapsed', '');
      this.savePersistedState(true);
    }
  }

  private initPersistedState() {
    const mode = this.getAttribute('persist') || 'cookie';

    if (mode === 'cookie' && typeof document !== 'undefined') {
      const match = document.cookie.match(/(?:^|; )flowx_sidebar_collapsed=([^;]*)/);
      if (match && match[1] === 'true') {
        this.setAttribute('collapsed', '');
      }
    } else if (mode === 'localStorage' && typeof localStorage !== 'undefined') {
      if (localStorage.getItem('flowx_sidebar_collapsed') === 'true') {
        this.setAttribute('collapsed', '');
      }
    }
  }

  private savePersistedState(collapsed: boolean) {
    const mode = this.getAttribute('persist') || 'cookie';
    if (mode === 'cookie' && typeof document !== 'undefined') {
      document.cookie = `flowx_sidebar_collapsed=${collapsed}; path=/; max-age=31536000`;
    } else if (mode === 'localStorage' && typeof localStorage !== 'undefined') {
      localStorage.setItem('flowx_sidebar_collapsed', String(collapsed));
    }
  }

  private render() {
    if (!this.shadowRoot) return;

    const isCollapsed = this.hasAttribute('collapsed');

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: block; font-family: var(--flowx-font-family); height: 100%; }
        .sidebar-container {
          background: #161b22; border-right: 1px solid rgba(255,255,255,0.12);
          width: ${isCollapsed ? '64px' : '240px'}; height: 100%; box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: space-between;
          transition: width 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .header { display: flex; align-items: center; justify-content: space-between; padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .nav-content { flex: 1; overflow-y: auto; padding: 12px 8px; }
        .footer { padding: 12px; border-top: 1px solid rgba(255,255,255,0.08); }
        .toggle-btn {
          background: transparent; border: none; color: #8b949e;
          cursor: pointer; padding: 6px; border-radius: 4px; font-size: 14px;
        }
        .toggle-btn:hover { color: #fff; background: rgba(255,255,255,0.08); }
      </style>

      <div class="sidebar-container">
        <div class="header">
          ${!isCollapsed ? '<slot name="brand"></slot>' : ''}
          <button type="button" class="toggle-btn" id="toggle-btn" aria-label="Toggle sidebar">${isCollapsed ? '≫' : '≪'}</button>
        </div>
        <div class="nav-content">
          <slot></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;

    this.shadowRoot
      .querySelector('#toggle-btn')
      ?.addEventListener('click', () => this.toggleCollapse());
  }
}

if (!customElements.get('flowx-sidebar')) {
  customElements.define('flowx-sidebar', FlowXSidebar);
}
