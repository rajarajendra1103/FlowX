import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FlowX } from '../src/index';

describe('FlowX Core AJAX Engine', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  describe('Attribute Parsing (fx-*, data-fx-*, data-*)', () => {
    it('should support fx-get prefix', async () => {
      const mockFetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve('<p>Hello from fx-get</p>'),
        }),
      );
      vi.stubGlobal('fetch', mockFetch);

      const btn = document.createElement('button');
      btn.setAttribute('fx-get', '/api/hello');
      btn.setAttribute('fx-target', 'this');
      document.body.appendChild(btn);

      FlowX.init();
      btn.click();

      await new Promise((r) => setTimeout(r, 150));

      expect(mockFetch).toHaveBeenCalled();
      expect(btn.innerHTML).toBe('<p>Hello from fx-get</p>');
    });

    it('should support data-fx-get prefix', async () => {
      const mockFetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve('<p>Hello from data-fx-get</p>'),
        }),
      );
      vi.stubGlobal('fetch', mockFetch);

      const btn = document.createElement('button');
      btn.setAttribute('data-fx-get', '/api/hello');
      btn.setAttribute('data-fx-target', 'this');
      document.body.appendChild(btn);

      FlowX.init();
      btn.click();

      await new Promise((r) => setTimeout(r, 150));

      expect(mockFetch).toHaveBeenCalled();
      expect(btn.innerHTML).toBe('<p>Hello from data-fx-get</p>');
    });

    it('should support data-get prefix', async () => {
      const mockFetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve('<p>Hello from data-get</p>'),
        }),
      );
      vi.stubGlobal('fetch', mockFetch);

      const btn = document.createElement('button');
      btn.setAttribute('data-get', '/api/hello');
      btn.setAttribute('data-target', 'this');
      document.body.appendChild(btn);

      FlowX.init();
      btn.click();

      await new Promise((r) => setTimeout(r, 150));

      expect(mockFetch).toHaveBeenCalled();
      expect(btn.innerHTML).toBe('<p>Hello from data-get</p>');
    });
  });

  describe('Swap Strategies', () => {
    it('should support innerHTML swap', async () => {
      const mockFetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve('<span>inner</span>'),
        }),
      );
      vi.stubGlobal('fetch', mockFetch);

      const div = document.createElement('div');
      div.setAttribute('fx-get', '/api/inner');
      div.setAttribute('fx-swap', 'innerHTML');
      document.body.appendChild(div);

      FlowX.init();
      div.click();

      await new Promise((r) => setTimeout(r, 150));

      expect(div.innerHTML).toBe('<span>inner</span>');
    });

    it('should support outerHTML swap', async () => {
      const mockFetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve('<span id="new-item">outer</span>'),
        }),
      );
      vi.stubGlobal('fetch', mockFetch);

      const container = document.createElement('div');
      container.id = 'parent';
      const div = document.createElement('div');
      div.id = 'child';
      div.setAttribute('fx-get', '/api/outer');
      div.setAttribute('fx-swap', 'outerHTML');
      container.appendChild(div);
      document.body.appendChild(container);

      FlowX.init();
      div.click();

      await new Promise((r) => setTimeout(r, 150));

      expect(document.getElementById('child')).toBeNull();
      expect(document.getElementById('new-item')?.innerHTML).toBe('outer');
    });

    it('should support beforebegin swap', async () => {
      const mockFetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve('<p>before</p>'),
        }),
      );
      vi.stubGlobal('fetch', mockFetch);

      const container = document.createElement('div');
      const div = document.createElement('div');
      div.id = 'anchor';
      div.setAttribute('fx-get', '/api/before');
      div.setAttribute('fx-swap', 'beforebegin');
      container.appendChild(div);
      document.body.appendChild(container);

      FlowX.init();
      div.click();

      await new Promise((r) => setTimeout(r, 150));

      expect(container.firstElementChild?.tagName.toLowerCase()).toBe('p');
      expect(container.lastElementChild?.id).toBe('anchor');
    });

    it('should support delete swap strategy', async () => {
      const mockFetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve(''),
        }),
      );
      vi.stubGlobal('fetch', mockFetch);

      const div = document.createElement('div');
      div.id = 'victim';
      div.setAttribute('fx-get', '/api/delete');
      div.setAttribute('fx-swap', 'delete');
      document.body.appendChild(div);

      FlowX.init();
      div.click();

      await new Promise((r) => setTimeout(r, 150));

      expect(document.getElementById('victim')).toBeNull();
    });
  });

  describe('Lifecycle Events', () => {
    it('should fire beforeRequest and afterSwap events', async () => {
      const mockFetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve('<p>success</p>'),
        }),
      );
      vi.stubGlobal('fetch', mockFetch);

      const btn = document.createElement('button');
      btn.setAttribute('fx-get', '/api/events');
      btn.setAttribute('fx-target', 'this');
      document.body.appendChild(btn);

      const beforeHandler = vi.fn();
      const afterHandler = vi.fn();

      btn.addEventListener('beforeRequest', beforeHandler);
      btn.addEventListener('afterSwap', afterHandler);

      FlowX.init();
      btn.click();

      await new Promise((r) => setTimeout(r, 150));

      expect(beforeHandler).toHaveBeenCalled();
      expect(afterHandler).toHaveBeenCalled();
      expect(btn.innerHTML).toBe('<p>success</p>');
    });

    it('should abort request if beforeRequest calls preventDefault', async () => {
      const mockFetch = vi.fn();
      vi.stubGlobal('fetch', mockFetch);

      const btn = document.createElement('button');
      btn.setAttribute('fx-get', '/api/abort');
      document.body.appendChild(btn);

      btn.addEventListener('beforeRequest', (e) => {
        e.preventDefault();
      });

      FlowX.init();
      btn.click();

      await new Promise((r) => setTimeout(r, 100));

      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should fire responseError when request fails', async () => {
      const mockFetch = vi
        .fn()
        .mockImplementation(() => Promise.reject(new Error('Network failure')));
      vi.stubGlobal('fetch', mockFetch);

      const btn = document.createElement('button');
      btn.setAttribute('fx-get', '/api/fail');
      document.body.appendChild(btn);

      const errorHandler = vi.fn();
      btn.addEventListener('responseError', errorHandler);

      FlowX.init();
      btn.click();

      await new Promise((r) => setTimeout(r, 150));

      expect(errorHandler).toHaveBeenCalled();
      const eventArg = errorHandler.mock.calls[0][0] as CustomEvent;
      expect(eventArg.detail.error.message).toBe('Network failure');
    });
  });

  describe('Triggers', () => {
    it('should trigger immediately on load', async () => {
      const mockFetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve('<span>Loaded Content</span>'),
        }),
      );
      vi.stubGlobal('fetch', mockFetch);

      const div = document.createElement('div');
      div.setAttribute('fx-get', '/api/load');
      div.setAttribute('fx-trigger', 'load');
      document.body.appendChild(div);

      FlowX.init();

      await new Promise((r) => setTimeout(r, 150));

      expect(mockFetch).toHaveBeenCalled();
      expect(div.innerHTML).toBe('<span>Loaded Content</span>');
    });
  });

  describe('Extension API Support', () => {
    it('should register extensions, trigger init, and run hooks in request lifecycle', async () => {
      const mockFetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve('<span>extension swapped</span>'),
        }),
      );
      vi.stubGlobal('fetch', mockFetch);

      const beforeHook = vi.fn().mockReturnValue(true);
      const afterSwapHook = vi.fn();
      const initHook = vi.fn();

      const ext = {
        name: 'test-extension',
        init: initHook,
        beforeRequest: beforeHook,
        afterSwap: afterSwapHook,
      };

      FlowX.addExtension(ext);

      expect(initHook).toHaveBeenCalledWith(FlowX);

      const btn = document.createElement('button');
      btn.setAttribute('fx-get', '/api/ext');
      btn.setAttribute('fx-target', 'this');
      document.body.appendChild(btn);

      FlowX.init();
      btn.click();

      await new Promise((r) => setTimeout(r, 150));

      expect(beforeHook).toHaveBeenCalled();
      expect(afterSwapHook).toHaveBeenCalled();
      expect(btn.innerHTML).toBe('<span>extension swapped</span>');

      // Cleanup
      FlowX.removeExtension('test-extension');
    });

    it('should abort requests if beforeRequest hook returns false', async () => {
      const mockFetch = vi.fn();
      vi.stubGlobal('fetch', mockFetch);

      const beforeHook = vi.fn().mockReturnValue(false);
      const ext = {
        name: 'abort-extension',
        beforeRequest: beforeHook,
      };

      FlowX.addExtension(ext);

      const btn = document.createElement('button');
      btn.setAttribute('fx-get', '/api/abort-ext');
      document.body.appendChild(btn);

      FlowX.init();
      btn.click();

      await new Promise((r) => setTimeout(r, 100));

      expect(mockFetch).not.toHaveBeenCalled();

      // Cleanup
      FlowX.removeExtension('abort-extension');
    });
  });
});
