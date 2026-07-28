import { defineFlowXElement } from '../helper';
import { createFloatingPositioner, useOutsideClickAndEscape } from '../infra';

defineFlowXElement('flowx-popover', {
  observedAttributes: ['placement', 'open'],
  style: `
    :host {
      display: inline-block;
      position: relative;
    }
    .popover-panel {
      position: fixed;
      background: #1f2937;
      color: #ffffff;
      padding: var(--flowx-spacing-md);
      border-radius: var(--flowx-radius-md);
      font-size: var(--flowx-font-size-md);
      font-family: var(--flowx-font-family);
      z-index: 9998;
      display: none;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      min-width: 200px;
    }
    .popover-panel.visible {
      display: block;
    }
  `,
  setup: (el) => {
    const panel = el.shadowRoot?.querySelector('.popover-panel') as HTMLElement;
    const triggerSlot = el.shadowRoot?.querySelector('slot[name="trigger"]') as HTMLSlotElement;

    let positioner: any = null;
    let outsideClickEscape: any = null;

    const openPopover = () => {
      el.setAttribute('open', '');
    };

    const closePopover = () => {
      el.removeAttribute('open');
    };

    const toggle = (e: Event) => {
      e.stopPropagation();
      if (el.hasAttribute('open')) {
        closePopover();
      } else {
        openPopover();
      }
    };

    const setupTrigger = () => {
      const assigned = triggerSlot?.assignedElements();
      if (assigned && assigned.length > 0) {
        const trigger = assigned[0];
        trigger.removeEventListener('click', toggle);
        trigger.addEventListener('click', toggle);
      }
    };

    triggerSlot?.addEventListener('slotchange', setupTrigger);
    // Try immediate setup
    setupTrigger();

    const syncOpenState = () => {
      const isOpen = el.hasAttribute('open');
      if (isOpen) {
        if (panel) {
          panel.classList.add('visible');
          const assigned = triggerSlot?.assignedElements();
          const trigger = ((assigned && assigned[0]) as HTMLElement) || el;

          positioner = createFloatingPositioner(trigger, panel, {
            placement: (el.getAttribute('placement') as any) || 'bottom',
            offset: 8,
          });
          outsideClickEscape = useOutsideClickAndEscape(el, closePopover);
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

    syncOpenState();

    panel?.setAttribute('role', 'dialog');
  },
  template: () => {
    return `
      <slot name="trigger"></slot>
      <div class="popover-panel">
        <slot name="content"></slot>
      </div>
    `;
  },
});
