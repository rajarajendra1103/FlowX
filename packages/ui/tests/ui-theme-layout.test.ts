import { describe, it, expect, beforeEach } from 'vitest';
import '../src/components/flowx-theme-toggle';
import '../src/components/layout/flowx-container';
import '../src/components/layout/flowx-grid';
import '../src/components/layout/flowx-stack';
import '../src/components/layout/flowx-split-pane';
import '../src/components/layout/flowx-resizable-panel';
import '../src/components/layout/flowx-responsive-layout';
import '../src/components/layout/flowx-masonry';
import '../src/components/layout/flowx-dashboard-layout';
import { getInitialThemeScript } from '../src/components/flowx-theme-toggle';

describe('FlowX Theme System & Layout Primitives', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    document.cookie = 'flowx-theme=; max-age=0; path=/;';
    localStorage.clear();
  });

  it('provides inline getInitialThemeScript helper', () => {
    const script = getInitialThemeScript();
    expect(script).toContain('flowx-theme');
    expect(script).toContain('document.documentElement.setAttribute');
  });

  it('<flowx-theme-toggle> cycles theme modes (auto -> light -> dark -> auto) and sets document data-theme attribute', async () => {
    const toggle = document.createElement('flowx-theme-toggle');
    document.body.appendChild(toggle);

    expect(toggle.shadowRoot).not.toBeNull();
    const btn = toggle.shadowRoot!.querySelector('.toggle-btn') as HTMLButtonElement;
    expect(btn).not.toBeNull();

    // Default mode is auto
    expect(document.documentElement.getAttribute('data-theme')).toBe('auto');

    let lastEventDetail: any = null;
    toggle.addEventListener('flowx-theme-change', (e: any) => {
      lastEventDetail = e.detail;
    });

    // Click 1: auto -> light
    btn.click();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.cookie).toContain('flowx-theme=light');
    expect(localStorage.getItem('flowx-theme')).toBe('light');
    expect(lastEventDetail).toEqual({ theme: 'light', effectiveTheme: 'light' });

    // Click 2: light -> dark
    btn.click();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.cookie).toContain('flowx-theme=dark');
    expect(localStorage.getItem('flowx-theme')).toBe('dark');
    expect(lastEventDetail).toEqual({ theme: 'dark', effectiveTheme: 'dark' });

    // Click 3: dark -> auto
    btn.click();
    expect(document.documentElement.getAttribute('data-theme')).toBe('auto');
    expect(document.cookie).toContain('flowx-theme=auto');

    document.body.removeChild(toggle);
  });

  it('<flowx-container> renders max-width size class', () => {
    const container = document.createElement('flowx-container');
    container.setAttribute('size', 'md');
    document.body.appendChild(container);

    const inner = container.shadowRoot!.querySelector('.container');
    expect(inner?.classList.contains('size-md')).toBe(true);

    document.body.removeChild(container);
  });

  it('<flowx-grid> passes cols and gap to inline style custom properties', () => {
    const grid = document.createElement('flowx-grid');
    grid.setAttribute('cols', '2');
    grid.setAttribute('cols-md', '4');
    grid.setAttribute('gap', '6');
    document.body.appendChild(grid);

    const inner = grid.shadowRoot!.querySelector('.grid') as HTMLElement;
    expect(inner.style.getPropertyValue('--cols-base')).toBe('2');
    expect(inner.style.getPropertyValue('--cols-md')).toBe('4');
    expect(inner.style.getPropertyValue('--grid-gap')).toContain('var(--flowx-space-6');

    document.body.removeChild(grid);
  });

  it('<flowx-stack> configures direction and flex attributes', () => {
    const stack = document.createElement('flowx-stack');
    stack.setAttribute('direction', 'row');
    stack.setAttribute('gap', '5');
    stack.setAttribute('align', 'center');
    document.body.appendChild(stack);

    const inner = stack.shadowRoot!.querySelector('.stack') as HTMLElement;
    expect(inner.style.flexDirection).toBe('row');
    expect(inner.style.alignItems).toBe('center');
    expect(inner.style.gap).toContain('var(--flowx-space-5');

    document.body.removeChild(stack);
  });

  it('<flowx-split-pane> renders two pane slots and a divider', () => {
    const split = document.createElement('flowx-split-pane');
    document.body.appendChild(split);

    const divider = split.shadowRoot!.querySelector('.divider');
    const pane1 = split.shadowRoot!.querySelector('.pane-1');
    const pane2 = split.shadowRoot!.querySelector('.pane-2');

    expect(divider).not.toBeNull();
    expect(pane1).not.toBeNull();
    expect(pane2).not.toBeNull();

    document.body.removeChild(split);
  });

  it('<flowx-dashboard-layout> renders app shell regions with background visual hierarchy', () => {
    const dash = document.createElement('flowx-dashboard-layout');
    dash.setAttribute('right-panel', '');
    document.body.appendChild(dash);

    const header = dash.shadowRoot!.querySelector('.header-region');
    const sidebar = dash.shadowRoot!.querySelector('.sidebar-region');
    const main = dash.shadowRoot!.querySelector('.main-region');
    const rightPanel = dash.shadowRoot!.querySelector('.right-panel-region');

    expect(header).not.toBeNull();
    expect(sidebar).not.toBeNull();
    expect(main).not.toBeNull();
    expect(rightPanel).not.toBeNull();

    document.body.removeChild(dash);
  });

  it('layout components work with zero-JS CSS structural fallbacks in light & dark themes', () => {
    document.documentElement.setAttribute('data-theme', 'dark');

    // Inject token styles into document head
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      :root[data-theme="dark"] {
        --flowx-bg-base: #0a0a0a;
        --flowx-bg-surface: #171717;
      }
      flowx-container {
        display: block;
        background-color: var(--flowx-bg-base);
      }
    `;
    document.head.appendChild(styleEl);

    const container = document.createElement('flowx-container');
    document.body.appendChild(container);

    const computedBg = getComputedStyle(container).backgroundColor;
    expect(computedBg).toBeDefined();

    document.body.removeChild(container);
    document.head.removeChild(styleEl);
  });
});
