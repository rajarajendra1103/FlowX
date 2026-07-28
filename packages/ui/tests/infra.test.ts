import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  createFloatingPositioner,
  createFocusTrap,
  useOutsideClickAndEscape,
  createRovingTabindex,
} from '../src/infra';

describe('createFloatingPositioner', () => {
  let trigger: HTMLElement;
  let panel: HTMLElement;

  beforeEach(() => {
    trigger = document.createElement('button');
    panel = document.createElement('div');
    Object.defineProperty(trigger, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: 100, bottom: 140, left: 50, right: 200, width: 150, height: 40 }),
    });
    Object.defineProperty(panel, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ width: 120, height: 60 }),
    });
    document.body.appendChild(trigger);
    document.body.appendChild(panel);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('positions panel below trigger for bottom placement', () => {
    panel.style.display = 'block';
    const positioner = createFloatingPositioner(trigger, panel, { placement: 'bottom', offset: 8 });
    positioner.update();
    expect(parseFloat(panel.style.top)).toBeGreaterThan(140);
    positioner.cleanup();
  });

  it('positions panel above trigger for top placement', () => {
    panel.style.display = 'block';
    const positioner = createFloatingPositioner(trigger, panel, { placement: 'top', offset: 8 });
    positioner.update();
    // Top of panel should be above trigger top (100)
    expect(parseFloat(panel.style.top)).toBeLessThan(100);
    positioner.cleanup();
  });

  it('returns cleanup function that removes event listeners', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const positioner = createFloatingPositioner(trigger, panel, {});
    positioner.cleanup();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});

describe('createFocusTrap', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    const btn1 = document.createElement('button');
    btn1.textContent = 'First';
    const btn2 = document.createElement('button');
    btn2.textContent = 'Second';
    const btn3 = document.createElement('button');
    btn3.textContent = 'Third';
    container.appendChild(btn1);
    container.appendChild(btn2);
    container.appendChild(btn3);
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('focuses first focusable element on creation', () => {
    const trap = createFocusTrap(container);
    const buttons = container.querySelectorAll('button');
    expect(document.activeElement).toBe(buttons[0]);
    trap.cleanup();
  });

  it('returns cleanup function', () => {
    const trap = createFocusTrap(container);
    expect(typeof trap.cleanup).toBe('function');
    trap.cleanup();
  });
});

describe('useOutsideClickAndEscape', () => {
  let element: HTMLElement;
  let onClose: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
    onClose = vi.fn();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('calls onClose when clicking outside the element', () => {
    const result = useOutsideClickAndEscape(element, onClose);
    const outsideEl = document.createElement('div');
    document.body.appendChild(outsideEl);
    // Dispatch a native click on the outside element so composedPath includes it but not our element
    outsideEl.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    expect(onClose).toHaveBeenCalled();
    result.cleanup();
  });

  it('calls onClose when Escape is pressed', () => {
    const result = useOutsideClickAndEscape(element, onClose);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(onClose).toHaveBeenCalled();
    result.cleanup();
  });

  it('returns cleanup function that removes listeners', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    const result = useOutsideClickAndEscape(element, onClose);
    result.cleanup();
    expect(removeEventListenerSpy).toHaveBeenCalled();
    removeEventListenerSpy.mockRestore();
  });
});

describe('createRovingTabindex', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    ['Item A', 'Item B', 'Item C'].forEach((label) => {
      const btn = document.createElement('button');
      btn.className = 'item';
      btn.textContent = label;
      container.appendChild(btn);
    });
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('sets first item tabindex to 0 and others to -1', () => {
    createRovingTabindex(container, '.item');
    const buttons = container.querySelectorAll('.item');
    expect(buttons[0].getAttribute('tabindex')).toBe('0');
    expect(buttons[1].getAttribute('tabindex')).toBe('-1');
    expect(buttons[2].getAttribute('tabindex')).toBe('-1');
  });

  it('ArrowDown moves focus to next item', () => {
    const roving = createRovingTabindex(container, '.item');
    const buttons = container.querySelectorAll<HTMLElement>('.item');
    buttons[0].focus();
    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(buttons[1].getAttribute('tabindex')).toBe('0');
    roving.cleanup();
  });

  it('ArrowUp wraps from first to last item', () => {
    const roving = createRovingTabindex(container, '.item');
    const buttons = container.querySelectorAll<HTMLElement>('.item');
    buttons[0].focus();
    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(buttons[2].getAttribute('tabindex')).toBe('0');
    roving.cleanup();
  });

  it('End key jumps to last item', () => {
    const roving = createRovingTabindex(container, '.item');
    const buttons = container.querySelectorAll<HTMLElement>('.item');
    buttons[0].focus();
    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(buttons[2].getAttribute('tabindex')).toBe('0');
    roving.cleanup();
  });

  it('Home key jumps to first item', () => {
    const roving = createRovingTabindex(container, '.item');
    const buttons = container.querySelectorAll<HTMLElement>('.item');
    buttons[2].focus();
    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(buttons[0].getAttribute('tabindex')).toBe('0');
    roving.cleanup();
  });
});
