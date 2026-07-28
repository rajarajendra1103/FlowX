import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-bottom-navigation>
 *
 * Mobile tab bar fixed to viewport bottom.
 * Active-item indication via `current` attribute set on page render (100% no-JS CSS attribute selector styling).
 */
export class FlowXBottomNavigation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: block; font-family: var(--flowx-font-family); }
        .bar-container {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 900;
          background: #161b22; border-top: 1px solid rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: space-around;
          padding: 8px 12px; box-shadow: 0 -4px 20px rgba(0,0,0,0.4);
        }
        ::slotted([current]), ::slotted([data-current]) {
          color: var(--flowx-primary, #0066cc) !important;
          font-weight: 600;
        }
      </style>

      <div class="bar-container">
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get('flowx-bottom-navigation')) {
  customElements.define('flowx-bottom-navigation', FlowXBottomNavigation);
}
