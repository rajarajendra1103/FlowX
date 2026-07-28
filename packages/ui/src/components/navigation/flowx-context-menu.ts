import { createRovingTabindex, useOutsideClickAndEscape } from '../../infra';
import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-context-menu>
 *
 * Right-click context menu panel. Intercepts `contextmenu` event, calls `preventDefault()`,
 * and positions panel at cursor coordinates (clientX, clientY).
 */
export class FlowXContextMenu extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'for'];
  }

  private outsideCleanup: (() => void) | null = null;
  private rovingCleanup: (() => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupContextMenuListener();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  public openAt(x: number, y: number) {
    this.setAttribute('open', '');
    this.render();

    const panel = this.shadowRoot?.querySelector('.menu-panel') as HTMLElement;
    if (panel) {
      panel.style.left = `${x}px`;
      panel.style.top = `${y}px`;

      const out = useOutsideClickAndEscape(this, () => this.close());
      this.outsideCleanup = out.cleanup;

      const rov = createRovingTabindex(panel, '.menu-item');
      this.rovingCleanup = rov.cleanup;
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
    if (this.rovingCleanup) {
      this.rovingCleanup();
      this.rovingCleanup = null;
    }
  }

  private setupContextMenuListener() {
    const forId = this.getAttribute('for');
    const targetEl = forId
      ? document.querySelector(`#${forId}`) || document.querySelector(forId)
      : document.body;

    targetEl?.addEventListener('contextmenu', (e: Event) => {
      const me = e as MouseEvent;
      me.preventDefault();
      this.openAt(me.clientX, me.clientY);
    });
  }

  private render() {
    if (!this.shadowRoot) return;

    const isOpen = this.hasAttribute('open');

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: block; font-family: var(--flowx-font-family); }
        .menu-panel {
          display: ${isOpen ? 'flex' : 'none'}; flex-direction: column; gap: 2px;
          position: fixed; z-index: 1200;
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-md); padding: 6px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.6); min-width: 160px;
        }
        ::slotted(.menu-item), ::slotted(button) {
          background: transparent; border: none; color: #c9d1d9;
          padding: 8px 12px; font-size: 13px; text-align: left;
          border-radius: 4px; cursor: pointer; width: 100%; box-sizing: border-box;
        }
        ::slotted(.menu-item:hover), ::slotted(button:hover) {
          background: var(--flowx-primary, #0066cc); color: #fff;
        }
      </style>
      <div class="menu-panel" role="menu">
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get('flowx-context-menu')) {
  customElements.define('flowx-context-menu', FlowXContextMenu);
}
