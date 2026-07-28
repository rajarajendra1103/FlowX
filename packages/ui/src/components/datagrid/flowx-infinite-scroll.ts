import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-infinite-scroll>
 *
 * Wrapper around FlowX core's `fx-trigger="revealed"` behavior.
 * When the sentinel element enters the viewport, fires an fx-get request
 * with incrementing page param and appends (`fx-swap="beforeend"`) content.
 */
export class FlowXInfiniteScroll extends HTMLElement {
  private page: number = 1;
  private observer: IntersectionObserver | null = null;
  private isLoading: boolean = false;

  static get observedAttributes() {
    return ['fx-endpoint', 'fx-target', 'page'];
  }

  connectedCallback() {
    this.page = parseInt(this.getAttribute('page') || '1', 10);
    this.render();
    this.setupSentinelObserver();
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  private setupSentinelObserver() {
    const sentinel = this.shadowRoot?.querySelector('.sentinel');
    if (!sentinel) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !this.isLoading) {
            this.loadNextPage();
          }
        }
      },
      { threshold: 0.1 },
    );

    this.observer.observe(sentinel);
  }

  private loadNextPage() {
    const endpoint = this.getAttribute('fx-endpoint') || this.getAttribute('fx-get');
    const targetSelector = this.getAttribute('fx-target');
    if (!endpoint || !targetSelector) return;

    this.isLoading = true;
    this.page++;

    const nextPageUrl = endpoint.includes('?')
      ? `${endpoint}&page=${this.page}`
      : `${endpoint}?page=${this.page}`;
    const targetEl = document.querySelector(targetSelector);

    if (!targetEl) return;

    const spinner = this.shadowRoot?.querySelector('.spinner-box') as HTMLElement;
    if (spinner) spinner.style.display = 'block';

    fetch(nextPageUrl)
      .then((res) => res.text())
      .then((html) => {
        if (!html.trim()) {
          // No more items
          this.observer?.disconnect();
          if (spinner) spinner.style.display = 'none';
          return;
        }

        targetEl.insertAdjacentHTML('beforeend', html);

        if ((window as any).FlowX && typeof (window as any).FlowX.process === 'function') {
          (window as any).FlowX.process(targetEl);
        }
      })
      .finally(() => {
        this.isLoading = false;
        if (spinner) spinner.style.display = 'none';
      });
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: block; width: 100%; }
        .sentinel { height: 20px; width: 100%; margin-top: 10px; }
        .spinner-box { display: none; text-align: center; padding: 12px; font-size: 12px; color: #8b949e; }
      </style>
      <slot></slot>
      <div class="spinner-box">Loading more items…</div>
      <div class="sentinel" fx-trigger="revealed"></div>
    `;
  }
}

if (!customElements.get('flowx-infinite-scroll')) {
  customElements.define('flowx-infinite-scroll', FlowXInfiniteScroll);
}
