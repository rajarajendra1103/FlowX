import { GLOBAL_THEME } from '../../helper';
import { createRovingTabindex } from '../../infra';

/**
 * <flowx-command-palette fx-endpoint="/api/search">
 *
 * Built on native <dialog> pattern. Opens via global keyboard shortcut (Cmd/Ctrl+K).
 * Contains debounced search input that fires `fx-get` to search endpoint; server returns
 * ranked HTML fragment of matching commands/pages, with roving tabindex keyboard navigation.
 */
export class FlowXCommandPalette extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'shortcut', 'fx-endpoint'];
  }

  private nativeDialog: HTMLDialogElement | null = null;
  private timer: any = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupGlobalShortcutListener();
  }

  attributeChangedCallback() {
    this.syncNativeState();
  }

  public openModal() {
    this.setAttribute('open', '');
    if (this.nativeDialog && !this.nativeDialog.open) {
      try {
        this.nativeDialog.showModal();
      } catch {
        this.nativeDialog.setAttribute('open', '');
      }
    }
  }

  public closeModal() {
    this.removeAttribute('open');
    if (this.nativeDialog && this.nativeDialog.open) {
      try {
        this.nativeDialog.close();
      } catch {
        this.nativeDialog.removeAttribute('open');
      }
    }
  }

  private syncNativeState() {
    if (!this.nativeDialog) return;
    const isOpen = this.hasAttribute('open');
    if (isOpen && !this.nativeDialog.open) {
      try {
        this.nativeDialog.showModal();
      } catch {
        this.nativeDialog.setAttribute('open', '');
      }
    } else if (!isOpen && this.nativeDialog.open) {
      try {
        this.nativeDialog.close();
      } catch {
        this.nativeDialog.removeAttribute('open');
      }
    }
  }

  private setupGlobalShortcutListener() {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      // Trigger on Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (this.hasAttribute('open')) this.closeModal();
        else this.openModal();
      }
    });
  }

  private performSearch(query: string) {
    const endpoint = this.getAttribute('fx-endpoint') || this.getAttribute('fx-get');
    const resultsContainer = this.shadowRoot?.querySelector('#results') as HTMLElement;
    if (!resultsContainer) return;

    if (!endpoint) {
      // Inline client filter fallback if no endpoint set
      const items = Array.from(resultsContainer.querySelectorAll('.cmd-item'));
      items.forEach((item) => {
        const text = item.textContent?.toLowerCase() || '';
        (item as HTMLElement).style.display = text.includes(query.toLowerCase()) ? '' : 'none';
      });
      return;
    }

    // Server-driven fetch
    const url = endpoint.includes('?')
      ? `${endpoint}&q=${encodeURIComponent(query)}`
      : `${endpoint}?q=${encodeURIComponent(query)}`;

    fetch(url)
      .then((res) => res.text())
      .then((html) => {
        resultsContainer.innerHTML = html;
        if ((window as any).FlowX && typeof (window as any).FlowX.process === 'function') {
          (window as any).FlowX.process(resultsContainer);
        }
        // Wire roving tabindex over command result items
        createRovingTabindex(resultsContainer, '.cmd-item, button, a');
      });
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: contents; font-family: var(--flowx-font-family); }
        dialog {
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg); color: #e6edf3;
          padding: 0; box-shadow: 0 20px 60px rgba(0,0,0,0.7);
          width: 560px; max-width: 90vw; max-height: 80vh; overflow: hidden;
          margin: 10vh auto;
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(6px);
        }
        .search-bar {
          display: flex; align-items: center; padding: 14px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.1); gap: 10px;
        }
        .search-icon { color: #6e7681; font-size: 14px; }
        input {
          flex: 1; background: transparent; border: none; color: #e6edf3;
          font-family: var(--flowx-font-family); font-size: 15px; outline: none;
        }
        .shortcut-badge {
          background: rgba(255,255,255,0.1); border-radius: 4px;
          padding: 2px 6px; font-size: 11px; color: #8b949e; font-family: monospace;
        }
        .results-container { padding: 8px; max-height: 360px; overflow-y: auto; }
        ::slotted(.cmd-item), .cmd-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 12px; border-radius: 6px; color: #c9d1d9; font-size: 13px;
          cursor: pointer; user-select: none; transition: background 0.1s;
        }
        ::slotted(.cmd-item:hover), .cmd-item:hover, .cmd-item:focus {
          background: var(--flowx-primary, #0066cc); color: #fff; outline: none;
        }
      </style>
      <dialog>
        <div class="search-bar">
          <span class="search-icon">🔍</span>
          <input type="search" id="cmd-input" placeholder="Type a command or search…" autofocus />
          <span class="shortcut-badge">ESC</span>
        </div>
        <div class="results-container" id="results">
          <slot></slot>
        </div>
      </dialog>
    `;

    this.nativeDialog = this.shadowRoot.querySelector('dialog');
    this.nativeDialog?.addEventListener('close', () => this.removeAttribute('open'));

    const input = this.shadowRoot.querySelector('#cmd-input') as HTMLInputElement;
    input?.addEventListener('input', () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.performSearch(input.value.trim());
      }, 250);
    });

    this.syncNativeState();
  }
}

if (!customElements.get('flowx-command-palette')) {
  customElements.define('flowx-command-palette', FlowXCommandPalette);
}
