import { defineFlowXElement } from '../helper';

export type FlowXThemeMode = 'light' | 'dark' | 'auto';

export function getInitialThemeScript(): string {
  return `(function(){try{var c=document.cookie.match(/(?:^|; )flowx-theme=([^;]*)/);var t=c?decodeURIComponent(c[1]):localStorage.getItem('flowx-theme')||'auto';if(t==='auto'){var d=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme','auto');}else{document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;
}

function setCookie(name: string, value: string, days = 365, path = '/') {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path}; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined' || !document.cookie) return null;
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches ? decodeURIComponent(matches[1]) : null;
}

const icons: Record<FlowXThemeMode, string> = {
  light: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  dark: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  auto: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
};

const labels: Record<FlowXThemeMode, string> = {
  light: 'Light',
  dark: 'Dark',
  auto: 'Auto',
};

export const FlowXThemeToggle = defineFlowXElement('flowx-theme-toggle', {
  observedAttributes: ['theme', 'cookie-name'],
  style: `
    :host {
      display: inline-block;
    }
    .toggle-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--flowx-space-2, 8px);
      padding: var(--flowx-space-2, 8px) var(--flowx-space-3, 12px);
      background-color: var(--flowx-bg-surface, #ffffff);
      color: var(--flowx-color-text, #0f172a);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-md, 8px);
      font-family: var(--flowx-font-sans);
      font-size: var(--flowx-font-size-md, 14px);
      font-weight: 500;
      cursor: pointer;
      user-select: none;
      transition: background-color var(--flowx-transition-fast), border-color var(--flowx-transition-fast), color var(--flowx-transition-fast);
      box-shadow: var(--flowx-shadow-sm);
    }
    .toggle-btn:hover {
      background-color: var(--flowx-bg-hover, rgba(0,0,0,0.05));
      border-color: var(--flowx-color-primary, #2563eb);
    }
    .toggle-btn:focus-visible {
      outline: none;
      box-shadow: var(--flowx-color-focus-ring);
    }
    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
    }
    .badge {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 2px 6px;
      border-radius: var(--flowx-radius-sm);
      background: var(--flowx-bg-hover);
      color: var(--flowx-color-text-muted);
    }
  `,
  template: (el) => {
    const currentTheme = (el._mode || 'auto') as FlowXThemeMode;
    const label = labels[currentTheme] || 'Auto';
    const iconSvg = icons[currentTheme] || icons.auto;

    return `
      <button class="toggle-btn" type="button" aria-label="Theme toggle: current theme is ${label}">
        <span class="icon">${iconSvg}</span>
        <span class="label">${label}</span>
        <span class="badge">Theme</span>
      </button>
    `;
  },
  setup: (el) => {
    const cookieName = el.getAttribute('cookie-name') || 'flowx-theme';

    const storedCookie = getCookie(cookieName) as FlowXThemeMode | null;
    const storedStorage =
      typeof localStorage !== 'undefined'
        ? (localStorage.getItem(cookieName) as FlowXThemeMode | null)
        : null;
    const attrTheme = el.getAttribute('theme') as FlowXThemeMode | null;

    const initialMode: FlowXThemeMode = attrTheme || storedCookie || storedStorage || 'auto';
    el._mode = initialMode;

    const updateUI = (mode: FlowXThemeMode) => {
      const root = el.shadowRoot || el;
      const btn = root.querySelector('.toggle-btn');
      const iconEl = root.querySelector('.icon');
      const labelEl = root.querySelector('.label');

      if (btn) btn.setAttribute('aria-label', `Theme toggle: current theme is ${labels[mode]}`);
      if (iconEl) iconEl.innerHTML = icons[mode];
      if (labelEl) labelEl.textContent = labels[mode];
    };

    const applyTheme = (mode: FlowXThemeMode) => {
      el._mode = mode;
      document.documentElement.setAttribute('data-theme', mode);
      setCookie(cookieName, mode);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(cookieName, mode);
      }

      const effectiveTheme =
        mode === 'auto'
          ? typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : mode;

      updateUI(mode);

      el.dispatchEvent(
        new CustomEvent('flowx-theme-change', {
          bubbles: true,
          composed: true,
          detail: { theme: mode, effectiveTheme },
        }),
      );
    };

    if (!document.documentElement.hasAttribute('data-theme')) {
      document.documentElement.setAttribute('data-theme', initialMode);
    }
    updateUI(initialMode);

    const shadowRoot = el.shadowRoot || el;
    shadowRoot.addEventListener('click', (e: Event) => {
      const btn = (e.target as HTMLElement).closest('.toggle-btn');
      if (!btn) return;

      const modes: FlowXThemeMode[] = ['light', 'dark', 'auto'];
      const currentIndex = modes.indexOf(el._mode || 'auto');
      const nextMode = modes[(currentIndex + 1) % modes.length];
      applyTheme(nextMode);
    });

    if (typeof window !== 'undefined' && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (el._mode === 'auto') {
          applyTheme('auto');
        }
      });
    }
  },
});
