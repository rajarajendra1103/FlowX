import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  enhanceNativeInput,
  scanAndEnhance,
  syncToNativeInput,
  syncFromNativeInput,
} from '../src/enhancer';
import '../src/components/pickers/flowx-date-picker';
import '../src/components/pickers/flowx-time-picker';
import '../src/components/pickers/flowx-datetime-picker';
import '../src/components/pickers/flowx-color-picker';
import '../src/components/pickers/flowx-file-upload';
import '../src/components/pickers/flowx-image-upload';
import '../src/components/pickers/flowx-signature-pad';

const flush = () => new Promise((r) => setTimeout(r, 20));

function mount(html: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
  return div;
}

describe('Tier 4 — Progressive Enhancement Infrastructure', () => {
  let container: HTMLElement;

  afterEach(() => {
    container?.remove();
  });

  it('marks enhanced inputs with data-flowx-enhanced="true"', async () => {
    container = mount(`<input type="date" id="test-date" />`);
    scanAndEnhance(container);
    await flush();

    const input = container.querySelector('#test-date') as HTMLInputElement;
    expect(input.getAttribute('data-flowx-enhanced')).toBe('true');
  });

  it('wraps the native input and mounts flowx-date-picker', async () => {
    container = mount(`<input type="date" id="d1" value="2024-05-15" />`);
    scanAndEnhance(container);
    await flush();

    const input = container.querySelector('#d1') as HTMLInputElement;
    expect(input).toBeTruthy();
    const wrapper = input.parentElement;
    expect(wrapper?.classList.contains('flowx-enhanced-input-wrapper')).toBe(true);

    const picker = wrapper?.querySelector('flowx-date-picker');
    expect(picker).toBeTruthy();
  });

  it('two-way sync: updating flowx-date-picker updates native input value and fires events', async () => {
    container = mount(`<input type="date" id="d2" value="2024-01-01" />`);
    scanAndEnhance(container);
    await flush();

    const input = container.querySelector('#d2') as HTMLInputElement;
    let eventFired = false;
    input.addEventListener('change', () => {
      eventFired = true;
    });

    syncToNativeInput(input, '2024-08-20');
    expect(input.value).toBe('2024-08-20');
    expect(eventFired).toBe(true);
  });

  it('enhances input[type="time"] with flowx-time-picker', async () => {
    container = mount(`<input type="time" id="t1" value="14:30" />`);
    scanAndEnhance(container);
    await flush();

    const input = container.querySelector('#t1') as HTMLInputElement;
    const wrapper = input.parentElement;
    const picker = wrapper?.querySelector('flowx-time-picker');
    expect(picker).toBeTruthy();
  });

  it('enhances input[type="color"] with flowx-color-picker', async () => {
    container = mount(`<input type="color" id="c1" value="#0066cc" />`);
    scanAndEnhance(container);
    await flush();

    const input = container.querySelector('#c1') as HTMLInputElement;
    const wrapper = input.parentElement;
    const picker = wrapper?.querySelector('flowx-color-picker');
    expect(picker).toBeTruthy();
  });

  it('enhances input[type="file"] with flowx-file-upload', async () => {
    container = mount(`<input type="file" id="f1" />`);
    scanAndEnhance(container);
    await flush();

    const input = container.querySelector('#f1') as HTMLInputElement;
    const wrapper = input.parentElement;
    const uploader = wrapper?.querySelector('flowx-file-upload');
    expect(uploader).toBeTruthy();
  });

  it('enhances input[type="file"][accept="image/*"] with flowx-image-upload', async () => {
    container = mount(`<input type="file" id="img1" accept="image/*" />`);
    scanAndEnhance(container);
    await flush();

    const input = container.querySelector('#img1') as HTMLInputElement;
    const wrapper = input.parentElement;
    const uploader = wrapper?.querySelector('flowx-image-upload');
    expect(uploader).toBeTruthy();
  });

  it('flowx-signature-pad creates a hidden input for form serialization', async () => {
    container = mount(`
      <form id="sig-form">
        <flowx-signature-pad name="user_signature"></flowx-signature-pad>
      </form>
    `);
    await flush();

    const hidden = container.querySelector(
      'input[type="hidden"][name="user_signature"]',
    ) as HTMLInputElement;
    expect(hidden).toBeTruthy();
  });
});
