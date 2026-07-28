import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '../src/components/navigation/flowx-navbar';
import '../src/components/navigation/flowx-sidebar';
import '../src/components/navigation/flowx-drawer';
import '../src/components/navigation/flowx-dock';
import '../src/components/navigation/flowx-bottom-navigation';
import '../src/components/navigation/flowx-menu';
import '../src/components/navigation/flowx-context-menu';
import '../src/components/navigation/flowx-mega-menu';
import '../src/components/navigation/flowx-command-palette';

const flush = () => new Promise((r) => setTimeout(r, 100));

function mount(html: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
  return div;
}

describe('Tier 7 — Navigation Components Test Suite', () => {
  let container: HTMLElement;

  afterEach(() => {
    container?.remove();
    vi.restoreAllMocks();
  });

  it('flowx-navbar toggles mobile menu open attribute on hamburger click', async () => {
    container = mount(`
      <flowx-navbar id="nav1">
        <div slot="logo">Logo</div>
      </flowx-navbar>
    `);
    await flush();

    const navbar = container.querySelector('#nav1') as any;
    const btn = navbar.shadowRoot?.querySelector('#toggle-btn') as HTMLElement;
    expect(btn).toBeTruthy();

    btn.click();
    await flush();
    expect(navbar.hasAttribute('open')).toBe(true);

    btn.click();
    await flush();
    expect(navbar.hasAttribute('open')).toBe(false);
  });

  it('flowx-sidebar toggles collapsed attribute and sets document.cookie', async () => {
    container = mount(`
      <flowx-sidebar id="side1" persist="cookie">
        <div slot="brand">FlowX App</div>
      </flowx-sidebar>
    `);
    await flush();

    const sidebar = container.querySelector('#side1') as any;
    const btn = sidebar.shadowRoot?.querySelector('#toggle-btn') as HTMLElement;

    btn.click();
    await flush();
    expect(sidebar.hasAttribute('collapsed')).toBe(true);
    expect(document.cookie).toContain('flowx_sidebar_collapsed=true');
  });

  it('flowx-context-menu opens at specified coordinates', async () => {
    container = mount(`
      <flowx-context-menu id="ctx1">
        <button class="menu-item">Action 1</button>
      </flowx-context-menu>
    `);
    await flush();

    const ctx = container.querySelector('#ctx1') as any;
    ctx.openAt(150, 300);
    await flush();

    expect(ctx.hasAttribute('open')).toBe(true);
    const panel = ctx.shadowRoot?.querySelector('.menu-panel') as HTMLElement;
    expect(panel.style.left).toBe('150px');
    expect(panel.style.top).toBe('300px');
  });

  it('flowx-command-palette opens on Cmd+K or Ctrl+K shortcut', async () => {
    container = mount(`
      <flowx-command-palette id="cmd1">
        <div class="cmd-item">Open Settings</div>
      </flowx-command-palette>
    `);
    await flush();

    const palette = container.querySelector('#cmd1') as any;

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }));
    await flush();

    expect(palette.hasAttribute('open')).toBe(true);
  });

  it('flowx-bottom-navigation preserves current attribute for server-rendered active tab', async () => {
    container = mount(`
      <flowx-bottom-navigation id="bottom-nav">
        <button current>Home</button>
        <button>Search</button>
      </flowx-bottom-navigation>
    `);
    await flush();

    const currentTab = container.querySelector('button[current]');
    expect(currentTab).toBeTruthy();
  });
});
