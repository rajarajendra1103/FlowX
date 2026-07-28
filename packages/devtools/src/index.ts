// FlowX DevTools: Floating Developer Inspect Panel

interface LogEntry {
  id: string;
  method: string;
  url: string;
  triggerSelector: string;
  targetSelector: string;
  strategy: string;
  status: 'pending' | 'success' | 'error';
  statusCode?: number;
  duration?: number;
  error?: string;
  timestamp: string;
}

export const FlowXDevTools = {
  logs: [] as LogEntry[],
  initialized: false,
  minimized: false,
  visible: false,

  init() {
    if (this.initialized) return;
    this.initialized = true;

    this.injectStyles();
    this.createPanel();
    this.bindEvents();
    this.bindKeyboardShortcuts();

    console.log(
      '%c⚡ FlowX DevTools Mounted',
      'color: #58a6ff; font-weight: bold; font-size: 1.1em;',
    );
  },

  injectStyles() {
    const style = document.createElement('style');
    style.id = 'flowx-devtools-styles';
    style.innerHTML = `
      #flowx-devtools-root {
        position: fixed;
        bottom: 76px;
        right: 20px;
        width: 380px;
        max-height: 500px;
        background: rgba(13, 17, 23, 0.85);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(240, 246, 252, 0.15);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        color: #c9d1d9;
        font-family: ui-monospace, SFMono-Regular, SF Pro Mono, Menlo, monospace;
        font-size: 11px;
        z-index: 99999;
        display: none;
        flex-direction: column;
        overflow: hidden;
        transition: opacity 0.2s ease, transform 0.2s ease;
        opacity: 0;
        transform: translateY(10px);
      }
      #flowx-devtools-root.minimized {
        height: 36px;
        overflow: hidden;
      }
      #flowx-devtools-launcher {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(13, 17, 23, 0.85);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(240, 246, 252, 0.15);
        color: #58a6ff;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        z-index: 99998;
        transition: transform 0.2s, background-color 0.2s;
      }
      #flowx-devtools-launcher:hover {
        background: rgba(22, 27, 34, 0.95);
        transform: scale(1.05);
      }
      #flowx-devtools-launcher.active {
        background: #58a6ff;
        color: #0d1117;
      }
      .fx-dt-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background: #161b22;
        border-bottom: 1px solid #30363d;
        cursor: pointer;
        user-select: none;
      }
      .fx-dt-title {
        font-weight: bold;
        color: #58a6ff;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .fx-dt-controls button {
        background: transparent;
        border: none;
        color: #8b949e;
        cursor: pointer;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: inherit;
        font-size: 11px;
      }
      .fx-dt-controls button:hover {
        color: #fff;
        background: #21262d;
      }
      .fx-dt-body {
        flex: 1;
        overflow-y: auto;
        padding: 8px;
        max-height: 400px;
      }
      .fx-dt-log-item {
        background: #161b22;
        border: 1px solid #21262d;
        border-radius: 6px;
        padding: 8px;
        margin-bottom: 6px;
        position: relative;
        transition: border-color 0.2s;
        cursor: pointer;
      }
      .fx-dt-log-item:hover {
        border-color: #58a6ff;
      }
      .fx-dt-badge {
        font-size: 9px;
        padding: 2px 5px;
        border-radius: 3px;
        font-weight: bold;
        text-transform: uppercase;
        color: #fff;
      }
      .fx-dt-badge.get { background: #1f6feb; }
      .fx-dt-badge.post { background: #238636; }
      .fx-dt-badge.put { background: #9a6700; }
      .fx-dt-badge.delete { background: #da3637; }
      
      .fx-dt-status {
        position: absolute;
        top: 8px;
        right: 8px;
        font-size: 9px;
        font-weight: bold;
      }
      .fx-dt-status.pending { color: #f0883e; }
      .fx-dt-status.success { color: #3fb950; }
      .fx-dt-status.error { color: #f85149; }

      .fx-dt-meta {
        margin-top: 6px;
        color: #8b949e;
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .fx-dt-empty {
        text-align: center;
        padding: 24px;
        color: #8b949e;
      }
      .fx-element-glow {
        outline: 2px dashed #58a6ff !important;
        outline-offset: 2px;
        transition: outline 0.1s ease-in-out;
      }
    `;
    document.head.appendChild(style);
  },

  createPanel() {
    const root = document.createElement('div');
    root.id = 'flowx-devtools-root';
    root.innerHTML = `
      <div class="fx-dt-header" id="fx-dt-header-click">
        <div class="fx-dt-title">⚡ FlowX Inspector</div>
        <div class="fx-dt-controls">
          <button id="fx-dt-clear">Clear</button>
          <button id="fx-dt-minimize">_</button>
        </div>
      </div>
      <div class="fx-dt-body" id="fx-dt-body">
        <div class="fx-dt-empty">No activity captured yet. Make requests using fx-get/post!</div>
      </div>
    `;
    document.body.appendChild(root);

    const launcher = document.createElement('button');
    launcher.id = 'flowx-devtools-launcher';
    launcher.innerHTML = '⚡';
    launcher.title = 'Toggle FlowX DevTools (Alt+D)';
    document.body.appendChild(launcher);

    launcher.addEventListener('click', () => this.togglePanel());

    document.getElementById('fx-dt-header-click')?.addEventListener('click', (e) => {
      if (
        (e.target as HTMLElement).id === 'fx-dt-clear' ||
        (e.target as HTMLElement).id === 'fx-dt-minimize'
      )
        return;
      this.toggleMinimize();
    });

    document.getElementById('fx-dt-clear')?.addEventListener('click', () => {
      this.logs = [];
      this.render();
    });

    document.getElementById('fx-dt-minimize')?.addEventListener('click', () => {
      this.toggleMinimize();
    });
  },

  togglePanel() {
    const root = document.getElementById('flowx-devtools-root');
    const launcher = document.getElementById('flowx-devtools-launcher');
    if (root && launcher) {
      this.visible = !this.visible;
      launcher.classList.toggle('active', this.visible);
      root.classList.toggle('active', this.visible);
      if (this.visible) {
        root.style.display = 'flex';
        // Force reflow
        void root.offsetHeight;
        root.style.opacity = '1';
        root.style.transform = 'translateY(0)';
      } else {
        root.style.opacity = '0';
        root.style.transform = 'translateY(10px)';
        setTimeout(() => {
          if (!this.visible) {
            root.style.display = 'none';
          }
        }, 200);
      }
    }
  },

  toggleMinimize() {
    const root = document.getElementById('flowx-devtools-root');
    const minBtn = document.getElementById('fx-dt-minimize');
    if (root && minBtn) {
      this.minimized = !this.minimized;
      root.classList.toggle('minimized', this.minimized);
      minBtn.textContent = this.minimized ? '□' : '_';
    }
  },

  bindEvents() {
    const requestTimes = new Map<string, number>();

    document.addEventListener('flowx:beforeRequest', (e: any) => {
      const { element, target, request } = e.detail;
      const id = Math.random().toString(36).substring(7);
      requestTimes.set(id, performance.now());
      (element as any)._flowx_req_id = id;

      const triggerSelector = element.id
        ? `#${element.id}`
        : `${element.tagName.toLowerCase()}${element.className ? '.' + element.className.trim().split(/\s+/).join('.') : ''}`;
      const targetSelector = target?.id
        ? `#${target.id}`
        : `${target?.tagName.toLowerCase() || 'body'}`;
      const strategy =
        element.getAttribute('fx-swap') || element.getAttribute('data-fx-swap') || 'innerHTML';

      const entry: LogEntry = {
        id,
        method: element.getAttribute('fx-get')
          ? 'GET'
          : element.getAttribute('fx-post')
            ? 'POST'
            : element.getAttribute('fx-put')
              ? 'PUT'
              : 'DELETE',
        url: request || '',
        triggerSelector,
        targetSelector,
        strategy,
        status: 'pending',
        timestamp: new Date().toLocaleTimeString(),
      };

      this.logs.unshift(entry);
      this.render();
    });

    document.addEventListener('flowx:afterSwap', (e: any) => {
      const { element, xhr } = e.detail;
      const id = (element as any)._flowx_req_id;
      if (!id) return;

      const startTime = requestTimes.get(id);
      const duration = startTime ? Math.round(performance.now() - startTime) : undefined;

      const entry = this.logs.find((l) => l.id === id);
      if (entry) {
        entry.status = 'success';
        entry.duration = duration;
        entry.statusCode = xhr?.status;
      }
      this.render();
    });

    document.addEventListener('flowx:error', (e: any) => {
      const { element, error } = e.detail;
      const id = (element as any)._flowx_req_id;
      if (!id) return;

      const startTime = requestTimes.get(id);
      const duration = startTime ? Math.round(performance.now() - startTime) : undefined;

      const entry = this.logs.find((l) => l.id === id);
      if (entry) {
        entry.status = 'error';
        entry.duration = duration;
        entry.error = error?.message || 'Network Error';
      }
      this.render();
    });
  },

  bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.altKey && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        this.togglePanel();
      }
    });
  },

  render() {
    const body = document.getElementById('fx-dt-body');
    if (!body) return;

    if (this.logs.length === 0) {
      body.innerHTML = '<div class="fx-dt-empty">No activity captured yet.</div>';
      return;
    }

    body.innerHTML = this.logs
      .map((log) => {
        const durationStr = log.duration ? `${log.duration}ms` : '';
        const statusBadge = `<span class="fx-dt-status ${log.status}">${log.status === 'success' ? '200 OK' : log.status === 'error' ? 'ERR' : 'SENDING'}</span>`;
        return `
          <div class="fx-dt-log-item" data-id="${log.id}">
            <div>
              <span class="fx-dt-badge ${log.method.toLowerCase()}">${log.method}</span>
              <span style="font-weight: bold; margin-left: 6px;">${log.url}</span>
              ${statusBadge}
            </div>
            <div class="fx-dt-meta">
              <span>Time: <strong style="color: #8b949e">${log.timestamp}</strong></span>
              <span>Trigger: <strong style="color: #c9d1d9">${log.triggerSelector}</strong></span>
              <span>Target: <strong style="color: #c9d1d9">${log.targetSelector} (${log.strategy})</strong></span>
              ${durationStr ? `<span>Duration: <strong style="color: #58a6ff">${durationStr}</strong></span>` : ''}
              ${log.error ? `<span style="color: #f85149">Error: ${log.error}</span>` : ''}
            </div>
          </div>
        `;
      })
      .join('');

    body.querySelectorAll('.fx-dt-log-item').forEach((item) => {
      item.addEventListener('mouseenter', () => {
        const id = item.getAttribute('data-id');
        const entry = this.logs.find((l) => l.id === id);
        if (entry) {
          try {
            const triggerEl = document.querySelector(entry.triggerSelector);
            const targetEl = document.querySelector(entry.targetSelector);
            triggerEl?.classList.add('fx-element-glow');
            targetEl?.classList.add('fx-element-glow');
          } catch (e) {
            // ignore
          }
        }
      });

      item.addEventListener('mouseleave', () => {
        const id = item.getAttribute('data-id');
        const entry = this.logs.find((l) => l.id === id);
        if (entry) {
          try {
            const triggerEl = document.querySelector(entry.triggerSelector);
            const targetEl = document.querySelector(entry.targetSelector);
            triggerEl?.classList.remove('fx-element-glow');
            targetEl?.classList.remove('fx-element-glow');
          } catch (e) {
            // ignore
          }
        }
      });
    });
  },
};

// Check for Core existence and Domain Heuristic immediately on Script execution
if (typeof window !== 'undefined') {
  const isLocal =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '';
  const force = (window as any).FLOWX_DEVTOOLS_FORCE;

  if (!isLocal && !force) {
    console.warn(
      'FlowX Devtools loaded on what looks like a production domain — remove this script before deploying',
    );
  }

  if (!(window as any).FlowX) {
    console.warn('FlowX core not detected — devtools has nothing to inspect');
  } else {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => FlowXDevTools.init());
    } else {
      FlowXDevTools.init();
    }
  }

  (window as any).FlowXDevTools = FlowXDevTools;
}
