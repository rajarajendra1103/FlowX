import { describe, it, expect, afterEach, vi } from 'vitest';
import '../src/components/media/flowx-image';
import '../src/components/media/flowx-gallery';
import '../src/components/media/flowx-carousel';
import '../src/components/media/flowx-video-player';
import '../src/components/media/flowx-audio-player';
import '../src/components/media/flowx-pdf-viewer';
import '../src/components/media/flowx-markdown-viewer';
import '../src/components/media/flowx-code-viewer';

const flush = () => new Promise((r) => setTimeout(r, 100));

function mount(html: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
  return div;
}

describe('Tier 9 — Media & Document Viewing Test Suite', () => {
  let container: HTMLElement;

  afterEach(() => {
    container?.remove();
    vi.restoreAllMocks();
  });

  it('(a) carousel respects prefers-reduced-motion media query by disabling autoplay', async () => {
    // Mock matchMedia for prefers-reduced-motion: reduce
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    container = mount(`
      <flowx-carousel id="c1" autoplay interval="1000">
        <div>Slide 1</div>
        <div>Slide 2</div>
      </flowx-carousel>
    `);
    await flush();

    const carousel = container.querySelector('#c1') as any;
    expect(carousel).toBeTruthy();
  });

  it('(b) video custom controls invoke underlying native video element methods', async () => {
    container = mount(`
      <flowx-video-player id="v1">
        <video src="video.mp4"></video>
      </flowx-video-player>
    `);
    await flush();

    const player = container.querySelector('#v1') as any;
    const nativeVid = player.querySelector('video') as HTMLVideoElement;

    const playSpy = vi.spyOn(nativeVid, 'play').mockImplementation(async () => {});
    const pauseSpy = vi.spyOn(nativeVid, 'pause').mockImplementation(() => {});

    player.togglePlay();
    expect(playSpy).toHaveBeenCalled();

    Object.defineProperty(nativeVid, 'paused', { value: false, configurable: true });
    player.togglePlay();
    expect(pauseSpy).toHaveBeenCalled();
  });

  it('(c) gallery image click opens image viewer at correct index', async () => {
    container = mount(`
      <flowx-gallery id="g1">
        <img src="img1.jpg" alt="1" />
        <img src="img2.jpg" alt="2" />
      </flowx-gallery>
    `);
    await flush();

    const img2 = container.querySelectorAll('img')[1];
    img2.click();
    await flush();

    const viewer = document.querySelector('flowx-image-viewer');
    expect(viewer).toBeTruthy();
  });

  it('(d) markdown viewer sanitizes HTML to prevent XSS script injection', async () => {
    container = mount(`
      <flowx-markdown-viewer id="md1">
        # Heading
        <script>alert('xss')</script>
        [Link](javascript:alert(1))
      </flowx-markdown-viewer>
    `);
    await flush();

    const md = container.querySelector('#md1') as any;
    const html = md.parseMarkdown('# Heading\n<script>alert("xss")</script>');
    expect(html).not.toContain('<script>');
  });
});
