/**
 * Shared interaction infrastructure for FlowX UI components.
 */

export interface FloatingPositionerOptions {
  placement?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  offset?: number;
}

export function createFloatingPositioner(
  trigger: HTMLElement,
  panel: HTMLElement,
  options: FloatingPositionerOptions = {},
) {
  const placement = options.placement || 'bottom';
  const align = options.align || 'center';
  const offset = options.offset !== undefined ? options.offset : 8;

  const update = () => {
    if (!trigger || !panel) return;
    const triggerRect = trigger.getBoundingClientRect();

    // Backup styling to measure panel height/width accurately
    const originalDisplay = panel.style.display;
    const originalVisibility = panel.style.visibility;

    if (originalDisplay === 'none') {
      panel.style.display = 'block';
      panel.style.visibility = 'hidden';
    }
    panel.style.position = 'fixed';

    const panelRect = panel.getBoundingClientRect();

    // Restore and set layout position coordinates
    panel.style.display = originalDisplay;
    panel.style.visibility = originalVisibility;
    panel.style.position = 'fixed';

    let actualPlacement = placement;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Viewport collision and auto-flipping logic
    if (placement === 'bottom' && triggerRect.bottom + panelRect.height + offset > viewportHeight) {
      if (triggerRect.top - panelRect.height - offset >= 0) {
        actualPlacement = 'top';
      }
    } else if (placement === 'top' && triggerRect.top - panelRect.height - offset < 0) {
      if (triggerRect.bottom + panelRect.height + offset <= viewportHeight) {
        actualPlacement = 'bottom';
      }
    } else if (
      placement === 'right' &&
      triggerRect.right + panelRect.width + offset > viewportWidth
    ) {
      if (triggerRect.left - panelRect.width - offset >= 0) {
        actualPlacement = 'left';
      }
    } else if (placement === 'left' && triggerRect.left - panelRect.width - offset < 0) {
      if (triggerRect.right + panelRect.width + offset <= viewportWidth) {
        actualPlacement = 'right';
      }
    }

    let top = 0;
    let left = 0;

    if (actualPlacement === 'bottom') {
      top = triggerRect.bottom + offset;
      if (align === 'start') {
        left = triggerRect.left;
      } else if (align === 'end') {
        left = triggerRect.right - panelRect.width;
      } else {
        left = triggerRect.left + (triggerRect.width - panelRect.width) / 2;
      }
    } else if (actualPlacement === 'top') {
      top = triggerRect.top - panelRect.height - offset;
      if (align === 'start') {
        left = triggerRect.left;
      } else if (align === 'end') {
        left = triggerRect.right - panelRect.width;
      } else {
        left = triggerRect.left + (triggerRect.width - panelRect.width) / 2;
      }
    } else if (actualPlacement === 'right') {
      left = triggerRect.right + offset;
      if (align === 'start') {
        top = triggerRect.top;
      } else if (align === 'end') {
        top = triggerRect.bottom - panelRect.height;
      } else {
        top = triggerRect.top + (triggerRect.height - panelRect.height) / 2;
      }
    } else if (actualPlacement === 'left') {
      left = triggerRect.left - panelRect.width - offset;
      if (align === 'start') {
        top = triggerRect.top;
      } else if (align === 'end') {
        top = triggerRect.bottom - panelRect.height;
      } else {
        top = triggerRect.top + (triggerRect.height - panelRect.height) / 2;
      }
    }

    // Keep panel bound inside viewport
    if (left < 0) left = 0;
    if (left + panelRect.width > viewportWidth) left = viewportWidth - panelRect.width;
    if (top < 0) top = 0;
    if (top + panelRect.height > viewportHeight) top = viewportHeight - panelRect.height;

    panel.style.top = `${top}px`;
    panel.style.left = `${left}px`;
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });

  // Trigger initial placement
  update();

  return {
    update,
    cleanup: () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    },
  };
}

export function createFocusTrap(container: HTMLElement) {
  const previouslyFocused = document.activeElement as HTMLElement;

  const getFocusable = (): HTMLElement[] => {
    const selectors = [
      'a[href]',
      'area[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      'object',
      'embed',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable]',
    ];
    const list: HTMLElement[] = [];

    const scan = (el: Element) => {
      if (el.shadowRoot) {
        Array.from(el.shadowRoot.querySelectorAll('*')).forEach(scan);
      }
      if (el.matches && selectors.some((s) => el.matches(s))) {
        list.push(el as HTMLElement);
      }
      Array.from(el.children).forEach(scan);
    };

    scan(container);
    return list;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const focusables = getFocusable();
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }

    let active = document.activeElement as HTMLElement;
    while (active && active.shadowRoot && active.shadowRoot.activeElement) {
      active = active.shadowRoot.activeElement as HTMLElement;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (active === first || !focusables.includes(active)) {
        last.focus();
        e.preventDefault();
      }
    } else {
      if (active === last || !focusables.includes(active)) {
        first.focus();
        e.preventDefault();
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);

  const focusables = getFocusable();
  if (focusables.length > 0) {
    focusables[0].focus();
  }

  return {
    cleanup: () => {
      container.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    },
  };
}

export function useOutsideClickAndEscape(element: HTMLElement, onClose: () => void) {
  const handleOutsideClick = (e: MouseEvent) => {
    const path = e.composedPath();
    if (!path.includes(element)) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  document.addEventListener('click', handleOutsideClick, true);
  document.addEventListener('keydown', handleKeyDown, true);

  return {
    cleanup: () => {
      document.removeEventListener('click', handleOutsideClick, true);
      document.removeEventListener('keydown', handleKeyDown, true);
    },
  };
}

export function createRovingTabindex(container: HTMLElement, itemSelector: string) {
  const getItems = (): HTMLElement[] => {
    const root = container.shadowRoot || container;
    // Search elements in shadow root and light DOM slots
    const internal = Array.from(root.querySelectorAll(itemSelector)) as HTMLElement[];
    const slotted = Array.from(container.querySelectorAll(itemSelector)) as HTMLElement[];
    // De-duplicate
    return Array.from(new Set([...internal, ...slotted]));
  };

  const updateTabindexes = (items: HTMLElement[], activeItem: HTMLElement) => {
    items.forEach((item) => {
      if (item === activeItem) {
        item.setAttribute('tabindex', '0');
      } else {
        item.setAttribute('tabindex', '-1');
      }
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const items = getItems().filter(
      (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-disabled') !== 'true',
    );
    if (items.length === 0) return;

    let active = document.activeElement as HTMLElement;
    while (active && active.shadowRoot && active.shadowRoot.activeElement) {
      active = active.shadowRoot.activeElement as HTMLElement;
    }

    let currentIndex = items.indexOf(active);
    if (currentIndex === -1) {
      const tabZero = items.find((el) => el.getAttribute('tabindex') === '0');
      currentIndex = tabZero ? items.indexOf(tabZero) : 0;
    }

    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % items.length;
        e.preventDefault();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + items.length) % items.length;
        e.preventDefault();
        break;
      case 'Home':
        nextIndex = 0;
        e.preventDefault();
        break;
      case 'End':
        nextIndex = items.length - 1;
        e.preventDefault();
        break;
      default:
        return;
    }

    const targetItem = items[nextIndex];
    if (targetItem) {
      updateTabindexes(getItems(), targetItem);
      targetItem.focus();
    }
  };

  const setup = () => {
    const items = getItems();
    if (items.length > 0) {
      const hasTabZero = items.some((el) => el.getAttribute('tabindex') === '0');
      if (!hasTabZero) {
        updateTabindexes(items, items[0]);
      }
    }
    container.addEventListener('keydown', handleKeyDown);
  };

  setup();

  return {
    setup,
    update: () => {
      const items = getItems();
      const active = items.find((el) => el.getAttribute('tabindex') === '0') || items[0];
      if (active) {
        updateTabindexes(items, active);
      }
    },
    cleanup: () => {
      container.removeEventListener('keydown', handleKeyDown);
    },
  };
}
