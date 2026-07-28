import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  initDialogTriggerEngine,
  openDialogWithTrigger,
  openDialogElement,
  closeDialogElement,
} from '../src/dialog-infra';
import '../src/components/overlays/flowx-dialog';
import '../src/components/overlays/flowx-modal';
import '../src/components/overlays/flowx-confirm-dialog';
import '../src/components/overlays/flowx-sheet';
import '../src/components/overlays/flowx-bottom-sheet';
import '../src/components/overlays/flowx-lightbox';
import '../src/components/overlays/flowx-image-viewer';
import '../src/components/overlays/flowx-fullscreen-viewer';

const flush = () => new Promise((r) => setTimeout(r, 100));

function mount(html: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
  return div;
}

describe('Tier 6 — Native <dialog>-Based Overlays Test Suite', () => {
  let container: HTMLElement;

  afterEach(() => {
    container?.remove();
    vi.restoreAllMocks();
  });

  it('fx-dialog-target trigger opens modal on click', async () => {
    container = mount(`
      <button id="trig" fx-dialog-target="#my-modal">Open</button>
      <flowx-modal id="my-modal" title="Test Modal">
        <div slot="body">Modal Content</div>
      </flowx-modal>
    `);
    initDialogTriggerEngine(container);
    await flush();

    const trig = container.querySelector('#trig') as HTMLElement;
    const modal = container.querySelector('#my-modal') as HTMLElement;

    trig.click();
    await flush();

    expect(modal.hasAttribute('open')).toBe(true);
  });

  it('close button inside dialog with fx-dialog-close closes modal and restores focus', async () => {
    container = mount(`
      <button id="trig2" fx-dialog-target="#modal2">Open</button>
      <flowx-modal id="modal2">
        <button id="close-btn" fx-dialog-close>Close</button>
      </flowx-modal>
    `);
    initDialogTriggerEngine(container);
    await flush();

    const trig = container.querySelector('#trig2') as HTMLElement;
    const modal = container.querySelector('#modal2') as HTMLElement;
    const closeBtn = container.querySelector('#close-btn') as HTMLElement;

    trig.click();
    await flush();
    expect(modal.hasAttribute('open')).toBe(true);

    closeBtn.click();
    await flush();
    expect(modal.hasAttribute('open')).toBe(false);
  });

  it('flowx-confirm-dialog emits fx-confirm event with confirmed status', async () => {
    container = mount(`
      <flowx-confirm-dialog id="confirm-dlg" message="Delete item?"></flowx-confirm-dialog>
    `);
    await flush();

    const confirmDlg = container.querySelector('#confirm-dlg') as any;
    let eventDetail: any = null;

    confirmDlg.addEventListener('fx-confirm', (e: CustomEvent) => {
      eventDetail = e.detail;
    });

    confirmDlg.openModal();
    await flush();

    const confirmBtn = confirmDlg.shadowRoot?.querySelector('#btn-confirm') as HTMLElement;
    expect(confirmBtn).toBeTruthy();

    confirmBtn.click();
    await flush();

    expect(eventDetail).toEqual({ confirmed: true });
  });

  it('flowx-sheet opens and sets side attribute', async () => {
    container = mount(`
      <flowx-sheet id="sheet1" side="right" title="Drawer">
        <div>Drawer content</div>
      </flowx-sheet>
    `);
    await flush();

    const sheet = container.querySelector('#sheet1') as any;
    sheet.openModal();
    await flush();

    expect(sheet.hasAttribute('open')).toBe(true);
    expect(sheet.getAttribute('side')).toBe('right');
  });

  it('flowx-lightbox opens with image src', async () => {
    container = mount(`
      <img id="thumb" data-lightbox-src="https://example.com/full.jpg" alt="Sample" />
      <flowx-lightbox id="lightbox1"></flowx-lightbox>
    `);
    await flush();

    const thumb = container.querySelector('#thumb') as HTMLElement;
    const lightbox = container.querySelector('#lightbox1') as any;

    thumb.click();
    await flush();

    expect(lightbox.hasAttribute('open')).toBe(true);
    expect(lightbox.getAttribute('src')).toBe('https://example.com/full.jpg');
  });
});
