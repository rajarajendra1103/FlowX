/**
 * Shared Infrastructure for Tier 6 Native <dialog>-Based Overlays.
 *
 * Manages:
 * - fx-dialog-target="#id" click triggers
 * - Pre-fetch server HTML via fx-get="/url", swap content into dialog, THEN open showModal()
 * - Close via fx-dialog-close or backdrop click (unless fx-dialog-persistent)
 * - Focus tracking and restoration to trigger element upon dialog close
 * - Fallback focus trapping for non-native environments
 */

import { createFocusTrap } from './infra';

let lastActiveTrigger: HTMLElement | null = null;
let isEngineInitialized = false;

/**
 * Initializes global click listeners for native dialog targets and closing patterns.
 */
export function initDialogTriggerEngine(root: Element | Document = document): void {
  if (isEngineInitialized && root === document) return;
  if (root === document) isEngineInitialized = true;

  // 1. Listen for clicks on fx-dialog-target triggers
  root.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement | null;
    const trigger = target?.closest(
      '[fx-dialog-target], [data-fx-dialog-target]',
    ) as HTMLElement | null;

    if (trigger) {
      e.preventDefault();
      const targetSelector =
        trigger.getAttribute('fx-dialog-target') || trigger.getAttribute('data-fx-dialog-target');
      const getEndpoint = trigger.getAttribute('fx-get') || trigger.getAttribute('data-fx-get');

      if (targetSelector) {
        openDialogWithTrigger(trigger, targetSelector, getEndpoint);
      }
    }

    // 2. Listen for clicks on fx-dialog-close elements
    const closeBtn = target?.closest(
      '[fx-dialog-close], [data-fx-dialog-close]',
    ) as HTMLElement | null;
    if (closeBtn) {
      const dialog = closeBtn.closest(
        'dialog, flowx-modal, flowx-dialog, flowx-confirm-dialog, flowx-sheet, flowx-bottom-sheet, flowx-lightbox',
      ) as HTMLDialogElement | null;
      if (dialog) {
        closeDialogElement(dialog);
      }
    }
  });

  // 3. Listen for backdrop clicks on dialogs
  root.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    if (
      target &&
      (target.tagName.toLowerCase() === 'dialog' || target.tagName.startsWith('FLOWX-'))
    ) {
      const dialog = target as any;
      const isPersistent =
        dialog.hasAttribute('fx-dialog-persistent') || dialog.hasAttribute('persistent');

      // Native dialog backdrop click detection: event.target === dialog
      if (!isPersistent && e.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        const me = e as MouseEvent;
        const clickedOutside =
          me.clientX < rect.left ||
          me.clientX > rect.right ||
          me.clientY < rect.top ||
          me.clientY > rect.bottom;

        if (clickedOutside || e.target === dialog) {
          closeDialogElement(dialog);
        }
      }
    }
  });

  // Auto-wire focus restoration on native dialog 'close' event
  root
    .querySelectorAll(
      'dialog, flowx-modal, flowx-dialog, flowx-confirm-dialog, flowx-sheet, flowx-bottom-sheet, flowx-lightbox',
    )
    .forEach((d) => {
      d.addEventListener('close', () => restoreTriggerFocus());
    });
}

/**
 * Opens a dialog element given a trigger element, CSS selector, and optional pre-fetch endpoint.
 */
export async function openDialogWithTrigger(
  trigger: HTMLElement,
  targetSelector: string,
  getEndpoint?: string | null,
): Promise<void> {
  lastActiveTrigger = trigger;

  const dialog = (document.querySelector(targetSelector) ||
    trigger.ownerDocument.querySelector(targetSelector)) as any;
  if (!dialog) {
    console.warn(`FlowX Dialog: Target element "${targetSelector}" not found.`);
    return;
  }

  // Pre-fetch HTML from endpoint if fx-get is configured
  if (getEndpoint) {
    try {
      const response = await fetch(getEndpoint);
      const html = await response.text();

      // Find content insertion slot or body inside dialog
      const contentSlot =
        dialog.querySelector('[slot="body"], .modal-body, .dialog-content') ||
        dialog.shadowRoot?.querySelector('[slot="body"], .modal-body, .dialog-content') ||
        dialog;
      contentSlot.innerHTML = html;

      // Notify core to process swapped content
      if ((window as any).FlowX && typeof (window as any).FlowX.process === 'function') {
        (window as any).FlowX.process(contentSlot);
      }
    } catch (err) {
      console.error(`FlowX Dialog: Failed to pre-fetch content from "${getEndpoint}"`, err);
    }
  }

  openDialogElement(dialog);
}

/**
 * Invokes showModal() or opens the dialog element safely.
 */
export function openDialogElement(dialog: any): void {
  if (typeof dialog.openModal === 'function') {
    dialog.openModal();
  } else if (typeof dialog.showModal === 'function') {
    try {
      dialog.showModal();
    } catch {
      dialog.setAttribute('open', '');
    }
  } else {
    dialog.setAttribute('open', '');
  }

  // Fallback focus trap if native modal trapping is unavailable
  if (!dialog._focusTrapCleanup && typeof createFocusTrap === 'function') {
    const trap = createFocusTrap(dialog.shadowRoot || dialog);
    dialog._focusTrapCleanup = trap.cleanup;
  }
}

/**
 * Closes the dialog element safely.
 */
export function closeDialogElement(dialog: any): void {
  if (typeof dialog.closeModal === 'function') {
    dialog.closeModal();
  } else if (typeof dialog.close === 'function') {
    try {
      dialog.close();
    } catch {
      dialog.removeAttribute('open');
    }
  } else {
    dialog.removeAttribute('open');
  }

  if (dialog._focusTrapCleanup) {
    dialog._focusTrapCleanup();
    dialog._focusTrapCleanup = null;
  }

  restoreTriggerFocus();
}

/**
 * Restores focus to the triggering element.
 */
function restoreTriggerFocus(): void {
  if (lastActiveTrigger && typeof lastActiveTrigger.focus === 'function') {
    try {
      lastActiveTrigger.focus();
    } catch {
      // Ignore focus restoration errors
    }
    lastActiveTrigger = null;
  }
}

// Auto-initialize trigger engine in browser environment
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initDialogTriggerEngine(document));
  } else {
    initDialogTriggerEngine(document);
  }
}
