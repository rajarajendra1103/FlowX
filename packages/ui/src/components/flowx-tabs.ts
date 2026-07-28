import { defineFlowXElement } from '../helper';
import { createRovingTabindex } from '../infra';

defineFlowXElement('flowx-tab', {
  observedAttributes: ['value', 'selected'],
  style: `
    :host {
      display: inline-block;
      outline: none;
    }
    .tab-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      font-weight: 600;
      padding: var(--flowx-spacing-md);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all var(--flowx-transition);
      outline: none;
    }
    .tab-btn:hover {
      color: #ffffff;
    }
    :host([selected]) .tab-btn {
      color: var(--flowx-primary);
      border-bottom-color: var(--flowx-primary);
    }
  `,
  setup: (el) => {
    el.setAttribute('role', 'tab');
    if (!el.hasAttribute('tabindex')) {
      el.setAttribute('tabindex', '-1');
    }

    const select = () => {
      el.dispatchEvent(
        new CustomEvent('tab-select', {
          bubbles: true,
          composed: true,
          detail: { value: el.getAttribute('value') },
        }),
      );
    };

    el.addEventListener('click', select);
    el.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        select();
      }
    });

    el.addEventListener('focus', () => {
      (el.shadowRoot?.querySelector('.tab-btn') as HTMLElement)?.focus();
    });

    const syncAria = () => {
      const isSelected = el.hasAttribute('selected');
      el.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    };

    const observer = new MutationObserver(() => syncAria());
    observer.observe(el, { attributes: true, attributeFilter: ['selected'] });
    syncAria();
  },
  template: () => `<button class="tab-btn" tabindex="-1"><slot></slot></button>`,
});

defineFlowXElement('flowx-tab-list', {
  observedAttributes: [],
  style: `
    :host {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      gap: var(--flowx-spacing-sm);
    }
  `,
  setup: (el) => {
    el.setAttribute('role', 'tablist');
    const rovingTabindex = createRovingTabindex(el, 'flowx-tab');

    const observer = new MutationObserver(() => {
      if (rovingTabindex) rovingTabindex.update();
    });
    observer.observe(el, { childList: true });
  },
  template: () => `<slot></slot>`,
});

defineFlowXElement('flowx-tab-panel', {
  observedAttributes: ['value', 'visible'],
  style: `
    :host {
      display: none;
      padding: var(--flowx-spacing-md) 0;
      font-family: var(--flowx-font-family);
      color: #e6edf3;
    }
    :host([visible]) {
      display: block;
    }
  `,
  setup: (el) => {
    el.setAttribute('role', 'tabpanel');
  },
  template: () => `<slot></slot>`,
});

defineFlowXElement('flowx-tabs', {
  observedAttributes: ['value'],
  style: `
    :host {
      display: block;
      background: #0d1117;
      border-radius: var(--flowx-radius-md);
      padding: var(--flowx-spacing-md);
    }
  `,
  setup: (el) => {
    const syncTabs = () => {
      const activeVal = el.getAttribute('value');
      const hostEl = el as HTMLElement;

      const tabs = Array.from(hostEl.querySelectorAll('flowx-tab')) as HTMLElement[];
      const panels = Array.from(hostEl.querySelectorAll('flowx-tab-panel')) as HTMLElement[];

      tabs.forEach((tab) => {
        const tabVal = tab.getAttribute('value');
        const isSelected = tabVal === activeVal;
        if (isSelected) {
          tab.setAttribute('selected', '');
          tab.setAttribute('tabindex', '0');
        } else {
          tab.removeAttribute('selected');
          tab.setAttribute('tabindex', '-1');
        }

        const tabId = tab.getAttribute('id') || `flowx-tab-${tabVal}`;
        const panelId = `flowx-panel-${tabVal}`;
        tab.setAttribute('id', tabId);
        tab.setAttribute('aria-controls', panelId);
      });

      panels.forEach((panel) => {
        const panelVal = panel.getAttribute('value');
        const isVisible = panelVal === activeVal;
        if (isVisible) {
          panel.setAttribute('visible', '');
        } else {
          panel.removeAttribute('visible');
        }

        const tabId = `flowx-tab-${panelVal}`;
        const panelId = panel.getAttribute('id') || `flowx-panel-${panelVal}`;
        panel.setAttribute('id', panelId);
        panel.setAttribute('aria-labelledby', tabId);
      });
    };

    el.addEventListener('tab-select', (e: any) => {
      const newVal = e.detail.value;
      el.setAttribute('value', newVal);
    });

    const observer = new MutationObserver(() => syncTabs());
    observer.observe(el, { childList: true, attributes: true, attributeFilter: ['value'] });

    syncTabs();
  },
  template: () => `<slot></slot>`,
});
