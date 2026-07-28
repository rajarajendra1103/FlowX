import { createFloatingPositioner, useOutsideClickAndEscape } from '../../infra';
import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-mega-menu>
 *
 * Wide multi-column mega menu panel. Supports `fx-get="/api/menu"` on trigger
 * to lazy-load panel HTML on first hover/click.
 */
export class FlowXMegaMenu extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'trigger-event'];
  }

  private outsideCleanup: (() => void) | null = null;
  private positionerCleanup: (() => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  public async open() {
    this.setAttribute('open', '');
    this.render();

    const trigger = this.querySelector('[slot="trigger"]') as HTMLElement;
    const panel = this.shadowRoot?.querySelector('.mega-panel') as HTMLElement;

    // Check if fx-get is set on trigger for lazy-loading HTML
    if (trigger && trigger.hasAttribute('fx-get') && !trigger.hasAttribute('data-loaded')) {
      trigger.setAttribute('data-loaded', 'true');
      const endpoint = trigger.getAttribute('fx-get');
      if (endpoint) {
        try {
          const res = await fetch(endpoint);
          const html = await res.text();
          const contentSlot = this.shadowRoot?.querySelector('.mega-content');
          if (contentSlot) contentSlot.innerHTML = html;
        } catch (err) {
          console.error('FlowX MegaMenu: Lazy load error', err);
        }
      }
    }

    if (trigger && panel) {
      const pos = createFloatingPositioner(trigger, panel, {
        placement: 'bottom',
        align: 'start',
        offset: 8,
      });
      this.positionerCleanup = pos.cleanup;

      const out = useOutsideClickAndEscape(this, () => this.close());
      this.outsideCleanup = out.cleanup;
    }
  }

  public close() {
    this.removeAttribute('open');
    this.cleanup();
    this.render();
  }

  private cleanup() {
    if (this.outsideCleanup) {
      this.outsideCleanup();
      this.outsideCleanup = null;
    }
    if (this.positionerCleanup) {
      this.positionerCleanup();
      this.positionerCleanup = null;
    }
  }

  private render() {
    if (!this.shadowRoot) return;

    const isOpen = this.hasAttribute('open');

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: inline-block; font-family: var(--flowx-font-family); position: relative; }
        .trigger-wrapper { display: inline-block; cursor: pointer; }
        .mega-panel {
          display: ${isOpen ? 'block' : 'none'};
          position: absolute; top: 100%; left: 0; z-index: 1100;
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg); padding: 20px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.6);
          width: 580px; max-width: 90vw;
        }
        .mega-content { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 20px; }
      </style>
      <div class="trigger-wrapper">
        <slot name="trigger"></slot>
      </div>
      <div class="mega-panel" role="menu">
        <div class="mega-content">
          <slot></slot>
        </div>
      </div>
    `;

    const wrapper = this.shadowRoot.querySelector('.trigger-wrapper');
    wrapper?.addEventListener('click', () => {
      if (this.hasAttribute('open')) this.close();
      else this.open();
    });
  }
}

if (!customElements.get('flowx-mega-menu')) {
  customElements.define('flowx-mega-menu', FlowXMegaMenu);
}
