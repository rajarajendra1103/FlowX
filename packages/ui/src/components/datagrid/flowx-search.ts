import { GLOBAL_THEME } from '../../helper';
import { QueryStateManager } from '../../datagrid-infra';

/**
 * <flowx-search>
 *
 * Debounced search input component triggering server-side `fx-get` requests with a `q` parameter
 * or client-side filtering over table/list targets. Cancels in-flight requests if a newer search is typed.
 */
export class FlowXSearch extends HTMLElement {
  private timer: any = null;

  static get observedAttributes() {
    return ['placeholder', 'delay', 'for'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const placeholder = this.getAttribute('placeholder') || 'Search…';

    this.shadowRoot!.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: inline-block; font-family: var(--flowx-font-family); }
        .wrapper { position: relative; display: flex; align-items: center; }
        .icon { position: absolute; left: 10px; color: #6e7681; font-size: 13px; pointer-events: none; }
        input {
          background: #0d1117; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); color: #e6edf3;
          font-family: var(--flowx-font-family); font-size: 13px;
          padding: 7px 12px 7px 30px; outline: none; transition: border-color 0.15s;
          width: 220px;
        }
        input:focus { border-color: var(--flowx-primary); box-shadow: 0 0 0 3px rgba(0,102,204,0.2); }
      </style>

      <div class="wrapper">
        <span class="icon">🔍</span>
        <input type="search" placeholder="${placeholder}" aria-label="${placeholder}" />
      </div>
    `;

    this.setupDebounce();
  }

  private setupDebounce() {
    const input = this.shadowRoot?.querySelector('input');
    if (!input) return;

    const delay = parseInt(this.getAttribute('delay') || '300', 10);

    input.addEventListener('input', () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const query = input.value.trim();
        this.dispatchSearch(query);
      }, delay);
    });
  }

  private dispatchSearch(query: string) {
    const targetId = this.getAttribute('for') || this.getAttribute('target');
    let manager: QueryStateManager | null = null;

    if (targetId) {
      const targetEl = document.querySelector(`#${targetId}, ${targetId}`) as any;
      if (targetEl && typeof targetEl.getQueryManager === 'function') {
        manager = targetEl.getQueryManager();
      }
    }

    if (manager) {
      manager.updateAndRefetch({ search: query, page: 1 });
    }

    this.dispatchEvent(
      new CustomEvent('fx-search', { bubbles: true, composed: true, detail: { query } }),
    );
  }
}

if (!customElements.get('flowx-search')) {
  customElements.define('flowx-search', FlowXSearch);
}
