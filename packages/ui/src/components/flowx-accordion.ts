import { defineFlowXElement } from '../helper';
import { createRovingTabindex } from '../infra';

defineFlowXElement('flowx-accordion-item', {
  observedAttributes: ['header', 'open'],
  style: `
    :host {
      display: block;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .header-btn {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: transparent;
      color: #e6edf3;
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      font-weight: 600;
      padding: var(--flowx-spacing-md);
      border: none;
      cursor: pointer;
      text-align: left;
      outline: none;
    }
    .header-btn:hover, .header-btn:focus {
      background-color: rgba(255, 255, 255, 0.02);
    }
    .arrow {
      transition: transform var(--flowx-transition);
      color: var(--text-muted);
    }
    .content-box {
      display: none;
      padding: var(--flowx-spacing-md);
      color: #c9d1d9;
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      line-height: 1.5;
      background-color: rgba(255, 255, 255, 0.01);
    }
    :host([open]) .content-box {
      display: block;
    }
    :host([open]) .arrow {
      transform: rotate(90deg);
    }
  `,
  setup: (el) => {
    const btn = el.shadowRoot?.querySelector('.header-btn') as HTMLElement;

    const toggle = () => {
      const isOpen = el.hasAttribute('open');
      if (isOpen) {
        el.removeAttribute('open');
      } else {
        el.setAttribute('open', '');
      }
      el.dispatchEvent(
        new CustomEvent('toggle', {
          bubbles: true,
          composed: true,
        }),
      );
    };

    btn?.addEventListener('click', toggle);

    el.addEventListener('focus', () => {
      btn?.focus();
    });

    const syncAria = () => {
      const isOpen = el.hasAttribute('open');
      btn?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    const observer = new MutationObserver(() => syncAria());
    observer.observe(el, { attributes: true, attributeFilter: ['open'] });
    syncAria();
  },
  template: (el) => {
    const header = el.getAttribute('header') || 'Accordion Item';
    return `
      <button class="header-btn" tabindex="-1">
        <span>${header}</span>
        <span class="arrow">▶</span>
      </button>
      <div class="content-box">
        <slot></slot>
      </div>
    `;
  },
});

defineFlowXElement('flowx-accordion', {
  observedAttributes: ['multi'],
  style: `
    :host {
      display: block;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--flowx-radius-md);
      overflow: hidden;
      background: #0d1117;
    }
  `,
  setup: (el) => {
    let rovingTabindex: any = null;

    const handleToggle = (e: Event) => {
      const targetItem = e.target as HTMLElement;
      if (targetItem.tagName.toLowerCase() !== 'flowx-accordion-item') return;

      const isMulti = el.hasAttribute('multi');
      if (!isMulti && targetItem.hasAttribute('open')) {
        const items = Array.from(el.querySelectorAll('flowx-accordion-item')) as HTMLElement[];
        items.forEach((item: HTMLElement) => {
          if (item !== targetItem) {
            item.removeAttribute('open');
          }
        });
      }
    };

    el.addEventListener('toggle', handleToggle);

    rovingTabindex = createRovingTabindex(el, 'flowx-accordion-item');

    const observer = new MutationObserver(() => {
      if (rovingTabindex) rovingTabindex.update();
    });
    observer.observe(el, { childList: true });
  },
  template: () => `<slot></slot>`,
});
