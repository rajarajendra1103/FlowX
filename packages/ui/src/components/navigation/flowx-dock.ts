import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-dock>
 *
 * macOS-style icon dock with CSS scale-on-hover effects and slot of icon-button children.
 */
export class FlowXDock extends HTMLElement {
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
        :host { display: inline-block; font-family: var(--flowx-font-family); }
        .dock-container {
          background: rgba(22, 27, 34, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px; padding: 8px 14px;
          display: flex; align-items: center; gap: 10px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.5);
        }
        ::slotted(*) {
          transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1);
        }
        ::slotted(*:hover) {
          transform: scale(1.35) translateY(-6px);
        }
      </style>

      <div class="dock-container">
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get('flowx-dock')) {
  customElements.define('flowx-dock', FlowXDock);
}
