import { describe, it, expect, vi } from 'vitest';
import '../src/index';
import { FlowXToastManager } from '../src/components/flowx-toast';

describe('FlowX UI Components', () => {
  it('flowx-button renders default slots and handles attributes', () => {
    const btn = document.createElement('flowx-button');
    btn.textContent = 'Click Me';
    document.body.appendChild(btn);

    const innerBtn = btn.shadowRoot?.querySelector('button');
    expect(innerBtn).not.toBeNull();
    expect(btn.textContent).toBe('Click Me');
    expect(btn.shadowRoot?.querySelector('slot')).not.toBeNull();

    // Reflect variant
    btn.setAttribute('variant', 'danger');
    expect((btn as any).variant).toBe('danger');
    expect(btn.shadowRoot?.querySelector('button')?.classList.contains('danger')).toBe(true);

    // Reflect size
    btn.setAttribute('size', 'lg');
    expect((btn as any).size).toBe('lg');
    expect(btn.shadowRoot?.querySelector('button')?.classList.contains('lg')).toBe(true);

    // Boolean disabled reflection
    btn.setAttribute('disabled', '');
    expect((btn as any).disabled).toBe(true);
    expect(btn.shadowRoot?.querySelector('button')?.hasAttribute('disabled')).toBe(true);
  });

  it('flowx-icon-button renders square or circle shape and handles aria-label', () => {
    const iconBtn = document.createElement('flowx-icon-button');
    iconBtn.setAttribute('aria-label', 'delete button');
    iconBtn.setAttribute('round', '');
    document.body.appendChild(iconBtn);

    const innerBtn = iconBtn.shadowRoot?.querySelector('button');
    expect(innerBtn?.getAttribute('aria-label')).toBe('delete button');
    expect(innerBtn?.classList.contains('circle')).toBe(true);
    expect((iconBtn as any).round).toBe(true);
  });

  it('flowx-link auto-detects external links and sets security attributes', () => {
    const link = document.createElement('flowx-link');
    link.setAttribute('href', 'https://example.com');
    document.body.appendChild(link);

    const anchor = link.shadowRoot?.querySelector('a');
    expect(anchor?.getAttribute('target')).toBe('_blank');
    expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer');
    expect(link.shadowRoot?.innerHTML).toContain('↗');
  });

  it('flowx-badge renders variant backgrounds', () => {
    const badge = document.createElement('flowx-badge');
    badge.setAttribute('variant', 'success');
    document.body.appendChild(badge);

    const span = badge.shadowRoot?.querySelector('.badge');
    expect(span?.classList.contains('success')).toBe(true);
  });

  it('flowx-avatar falls back to name initials on load failure', () => {
    const avatar = document.createElement('flowx-avatar');
    avatar.setAttribute('name', 'John Doe');
    document.body.appendChild(avatar);

    expect(avatar.shadowRoot?.innerHTML).toContain('JD');

    // Simulate img fail
    avatar.setAttribute('src', 'broken-image.jpg');
    avatar.setAttribute('img-failed', '');
    expect(avatar.shadowRoot?.innerHTML).toContain('JD');
  });

  it('flowx-card renders all sections with slot tags', () => {
    const card = document.createElement('flowx-card');
    document.body.appendChild(card);
    expect(card.shadowRoot?.querySelector('.card-header')).not.toBeNull();
    expect(card.shadowRoot?.querySelector('.card-body')).not.toBeNull();
    expect(card.shadowRoot?.querySelector('.card-footer')).not.toBeNull();
  });

  it('flowx-divider carries separator ARIA attributes', () => {
    const divider = document.createElement('flowx-divider');
    divider.setAttribute('orientation', 'vertical');
    document.body.appendChild(divider);

    const hr = divider.shadowRoot?.querySelector('hr');
    expect(hr?.getAttribute('role')).toBe('separator');
    expect(hr?.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('flowx-chip dispatches close custom events and removes itself', () => {
    const chip = document.createElement('flowx-chip');
    chip.setAttribute('dismissible', '');
    chip.textContent = 'Select Tag';
    document.body.appendChild(chip);

    const closeHandler = vi.fn();
    chip.addEventListener('close', closeHandler);

    const closeBtn = chip.shadowRoot?.querySelector('.close-btn') as HTMLButtonElement;
    expect(closeBtn).not.toBeNull();
    closeBtn.click();

    expect(closeHandler).toHaveBeenCalledOnce();
    expect(document.body.contains(chip)).toBe(false);
  });

  it('flowx-alert dispatches close event and removes alert body', () => {
    const alert = document.createElement('flowx-alert');
    alert.setAttribute('dismissible', '');
    document.body.appendChild(alert);

    const closeBtn = alert.shadowRoot?.querySelector('.close-btn') as HTMLButtonElement;
    closeBtn.click();
    expect(document.body.contains(alert)).toBe(false);
  });

  it('flowx-toast mounts stackable layouts programmatically', () => {
    const toast = FlowXToastManager.show({ message: 'Saved!', variant: 'success' });
    expect(toast).not.toBeUndefined();
    expect(document.getElementById('flowx-toast-container')).not.toBeNull();
    expect(toast?.textContent).toBe('Saved!');
  });

  it('flowx-progress displays determinate progress values', () => {
    const progress = document.createElement('flowx-progress');
    progress.setAttribute('value', '30');
    progress.setAttribute('max', '100');
    document.body.appendChild(progress);

    const progressTrack = progress.shadowRoot?.querySelector('.progress-track');
    expect(progressTrack?.getAttribute('aria-valuenow')).toBe('30');
    expect(progressTrack?.getAttribute('aria-valuemax')).toBe('100');
  });

  it('flowx-spinner has correct ARIA role status', () => {
    const spinner = document.createElement('flowx-spinner');
    document.body.appendChild(spinner);
    expect(spinner.shadowRoot?.querySelector('[role="status"]')).not.toBeNull();
  });

  it('flowx-skeleton sets presentation attributes', () => {
    const skeleton = document.createElement('flowx-skeleton');
    skeleton.setAttribute('variant', 'circle');
    document.body.appendChild(skeleton);

    const el = skeleton.shadowRoot?.querySelector('.skeleton');
    expect(el?.getAttribute('role')).toBe('presentation');
    expect(el?.getAttribute('aria-hidden')).toBe('true');
  });
});
