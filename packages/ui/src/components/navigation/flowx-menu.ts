import { defineFlowXElement } from '../../helper';
import {
  createFloatingPositioner,
  useOutsideClickAndEscape,
  createRovingTabindex,
} from '../../infra';

defineFlowXElement('flowx-menu-item', {
  observedAttributes: ['value', 'disabled'],
  style: `
    :host { display: block; outline: none; }
    .menu-item {
      padding: 8px 12px; cursor: pointer;
      font-family: var(--flowx-font-family); font-size: 14px; color: #e6edf3;
      border-radius: var(--flowx-radius-sm); display: flex; align-items: center;
      transition: background-color 0.15s; outline: none; user-select: none;
    }
    :host(:focus) .menu-item, .menu-item:hover {
      background-color: var(--flowx-primary, #0066cc); color: #fff;
    }
    :host([disabled]) .menu-item { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
  `,
  template: `
    <div class="menu-item" role="menuitem" tabindex="0">
      <slot></slot>
    </div>
  `,
});

defineFlowXElement('flowx-menu', {
  observedAttributes: ['placement', 'open'],
  style: `
    :host { display: inline-block; position: relative; font-family: var(--flowx-font-family); }
    .menu-panel {
      display: none; position: absolute; z-index: 1000;
      background-color: #161b22; border: 1px solid rgba(255,255,255,0.15);
      border-radius: var(--flowx-radius-md); padding: 4px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.5); min-width: 160px;
    }
    :host([open]) .menu-panel { display: block; }
  `,
  template: `
    <div class="trigger-slot">
      <slot name="trigger"></slot>
    </div>
    <div class="menu-panel" role="menu">
      <slot></slot>
    </div>
  `,
  setup(el: HTMLElement, sr: ShadowRoot) {
    const triggerSlot = sr.querySelector('.trigger-slot') as HTMLElement;
    const panel = sr.querySelector('.menu-panel') as HTMLElement;
    let posCleanup: (() => void) | null = null;
    let outCleanup: (() => void) | null = null;
    let rovCleanup: (() => void) | null = null;

    const closeMenu = () => {
      el.removeAttribute('open');
      if (posCleanup) {
        posCleanup();
        posCleanup = null;
      }
      if (outCleanup) {
        outCleanup();
        outCleanup = null;
      }
      if (rovCleanup) {
        rovCleanup();
        rovCleanup = null;
      }
    };

    const openMenu = () => {
      el.setAttribute('open', '');
      const actualTrigger = (triggerSlot.firstElementChild as HTMLElement) || triggerSlot;
      const placement = (el.getAttribute('placement') || 'bottom') as any;

      const pos = createFloatingPositioner(actualTrigger, panel, {
        placement,
        align: 'start',
        offset: 4,
      });
      posCleanup = pos.cleanup;

      const out = useOutsideClickAndEscape(el, closeMenu);
      outCleanup = out.cleanup;

      const rov = createRovingTabindex(panel, 'flowx-menu-item, .menu-item');
      rovCleanup = rov.cleanup;
    };

    triggerSlot.addEventListener('click', (e: Event) => {
      e.stopPropagation();
      if (el.hasAttribute('open')) closeMenu();
      else openMenu();
    });

    el.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target !== el &&
        (target.tagName.toLowerCase() === 'flowx-menu-item' ||
          target.classList.contains('menu-item'))
      ) {
        closeMenu();
      }
    });
  },
});
