import { defineFlowXElement } from '../helper';
import { createFloatingPositioner, useOutsideClickAndEscape, createRovingTabindex } from '../infra';

defineFlowXElement('flowx-dropdown-item', {
  observedAttributes: ['value', 'disabled'],
  style: `
    :host {
      display: block;
      outline: none;
    }
    .dropdown-item {
      padding: var(--flowx-spacing-sm) var(--flowx-spacing-md);
      cursor: pointer;
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      color: #e6edf3;
      border-radius: var(--flowx-radius-sm);
      display: flex;
      align-items: center;
      transition: background-color var(--flowx-transition);
      outline: none;
      user-select: none;
    }
    :host(:focus) .dropdown-item, .dropdown-item:hover {
      background-color: var(--flowx-primary);
      color: var(--flowx-primary-text);
    }
    :host([disabled]) .dropdown-item {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  `,
  setup: (el) => {
    el.setAttribute('role', 'menuitem');
    if (!el.hasAttribute('tabindex')) {
      el.setAttribute('tabindex', '-1');
    }

    const select = () => {
      if (el.hasAttribute('disabled')) return;
      el.dispatchEvent(
        new CustomEvent('select', {
          bubbles: true,
          composed: true,
          detail: { value: el.getAttribute('value') || el.textContent?.trim() },
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
  },
  template: () => {
    return `<div class="dropdown-item"><slot></slot></div>`;
  },
});

defineFlowXElement('flowx-dropdown', {
  observedAttributes: ['label', 'placement', 'open'],
  style: `
    :host {
      display: inline-block;
      position: relative;
    }
    .trigger-btn {
      background-color: var(--flowx-secondary);
      color: var(--flowx-secondary-text);
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      font-weight: 600;
      padding: var(--flowx-spacing-sm) var(--flowx-spacing-md);
      border-radius: var(--flowx-radius-md);
      border: 1px solid transparent;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: var(--flowx-spacing-xs);
    }
    .trigger-btn:hover {
      background-color: var(--flowx-secondary-hover);
    }
    .dropdown-panel {
      position: fixed;
      background: #1f2937;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--flowx-radius-md);
      padding: var(--flowx-spacing-xs);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      z-index: 9998;
      display: none;
      min-width: 160px;
    }
    .dropdown-panel.visible {
      display: block;
    }
  `,
  setup: (el) => {
    const trigger = el.shadowRoot?.querySelector('.trigger-btn') as HTMLElement;
    const panel = el.shadowRoot?.querySelector('.dropdown-panel') as HTMLElement;

    let positioner: any = null;
    let outsideClickEscape: any = null;
    let rovingTabindex: any = null;

    const openDropdown = () => {
      el.setAttribute('open', '');
    };

    const closeDropdown = () => {
      el.removeAttribute('open');
    };

    const toggle = (e: Event) => {
      e.stopPropagation();
      if (el.hasAttribute('open')) {
        closeDropdown();
      } else {
        openDropdown();
      }
    };

    trigger?.addEventListener('click', toggle);

    const syncOpenState = () => {
      const isOpen = el.hasAttribute('open');
      if (isOpen) {
        if (panel) {
          panel.classList.add('visible');
          positioner = createFloatingPositioner(trigger, panel, {
            placement: (el.getAttribute('placement') as any) || 'bottom',
            offset: 4,
          });
          outsideClickEscape = useOutsideClickAndEscape(el, closeDropdown);
          rovingTabindex = createRovingTabindex(el, 'flowx-dropdown-item');

          const firstItem = el.querySelector('flowx-dropdown-item');
          if (firstItem) {
            (firstItem as HTMLElement).focus();
          }
        }
      } else {
        if (panel) {
          panel.classList.remove('visible');
        }
        if (positioner) {
          positioner.cleanup();
          positioner = null;
        }
        if (outsideClickEscape) {
          outsideClickEscape.cleanup();
          outsideClickEscape = null;
        }
        if (rovingTabindex) {
          rovingTabindex.cleanup();
          rovingTabindex = null;
        }
      }
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'open') {
          syncOpenState();
        }
      });
    });
    observer.observe(el, { attributes: true });

    el.addEventListener('select', () => {
      closeDropdown();
      trigger?.focus();
    });

    syncOpenState();
    panel?.setAttribute('role', 'menu');
  },
  template: (el) => {
    const label = el.getAttribute('label') || 'Dropdown';
    return `
      <button class="trigger-btn" aria-haspopup="true">
        <span>${label}</span>
        <span class="arrow">▼</span>
      </button>
      <div class="dropdown-panel">
        <slot></slot>
      </div>
    `;
  },
});
