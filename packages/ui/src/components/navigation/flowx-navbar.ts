import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-navbar>
 *
 * Header wrapper with slots for logo, nav-items, and actions.
 * Responsive collapse to a hamburger menu using CSS media/container queries.
 */
export class FlowXNavbar extends HTMLElement {
  static get observedAttributes() {
    return ['breakpoint', 'open'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  public toggleMenu() {
    if (this.hasAttribute('open')) {
      this.removeAttribute('open');
    } else {
      this.setAttribute('open', '');
    }
  }

  private render() {
    if (!this.shadowRoot) return;

    const breakpoint = this.getAttribute('breakpoint') || '768px';
    const isOpen = this.hasAttribute('open');

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: block; font-family: var(--flowx-font-family); width: 100%; }
        .navbar-container {
          background: #161b22; border-bottom: 1px solid rgba(255,255,255,0.12);
          padding: 10px 20px; display: flex; align-items: center; justify-content: space-between;
          position: relative;
        }
        .left-section { display: flex; align-items: center; gap: 20px; }
        .nav-links { display: flex; align-items: center; gap: 16px; }
        .right-section { display: flex; align-items: center; gap: 12px; }
        .hamburger-btn {
          display: none; background: transparent; border: none;
          color: #8b949e; font-size: 20px; cursor: pointer; padding: 4px;
        }
        .hamburger-btn:hover { color: #fff; }
        .mobile-menu {
          display: none; flex-direction: column; gap: 10px;
          background: #0d1117; border-bottom: 1px solid rgba(255,255,255,0.12);
          padding: 16px 20px; width: 100%; box-sizing: border-box;
        }

        @media (max-width: ${breakpoint}) {
          .nav-links { display: none; }
          .hamburger-btn { display: block; }
          .mobile-menu { display: ${isOpen ? 'flex' : 'none'}; }
        }
      </style>

      <div class="navbar-container">
        <div class="left-section">
          <slot name="logo"></slot>
          <div class="nav-links">
            <slot name="nav-items"></slot>
            <slot></slot>
          </div>
        </div>
        <div class="right-section">
          <slot name="actions"></slot>
          <button type="button" class="hamburger-btn" id="toggle-btn" aria-label="Toggle menu">☰</button>
        </div>
      </div>
      <div class="mobile-menu">
        <slot name="mobile-nav"></slot>
        <slot></slot>
      </div>
    `;

    this.shadowRoot
      .querySelector('#toggle-btn')
      ?.addEventListener('click', () => this.toggleMenu());
  }
}

if (!customElements.get('flowx-navbar')) {
  customElements.define('flowx-navbar', FlowXNavbar);
}
