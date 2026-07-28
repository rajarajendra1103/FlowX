import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-video-player>
 *
 * Custom controls overlay over a native <video> element.
 * Invokes native video element methods (play(), pause(), requestFullscreen()).
 * Fallback: Native <video controls> remains if JS is not loaded.
 */
export class FlowXVideoPlayer extends HTMLElement {
  private videoEl: HTMLVideoElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupVideoControls();
  }

  public togglePlay() {
    if (!this.videoEl) return;
    if (this.videoEl.paused) {
      this.videoEl.play();
    } else {
      this.videoEl.pause();
    }
  }

  public toggleFullscreen() {
    if (!this.videoEl) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (this.videoEl.requestFullscreen) {
      this.videoEl.requestFullscreen();
    }
  }

  private setupVideoControls() {
    const slot = this.shadowRoot?.querySelector('slot');
    slot?.addEventListener('slotchange', () => this.bindNativeVideo());
    this.bindNativeVideo();
  }

  private bindNativeVideo() {
    this.videoEl = this.querySelector('video') || this.shadowRoot?.querySelector('video') || null;
    if (this.videoEl) {
      // Hide native controls after successfully enhancing
      this.videoEl.controls = false;

      const playBtn = this.shadowRoot?.querySelector('#play-btn');
      const progress = this.shadowRoot?.querySelector('#progress') as HTMLInputElement;

      this.videoEl.addEventListener('play', () => {
        if (playBtn) playBtn.textContent = '⏸';
      });
      this.videoEl.addEventListener('pause', () => {
        if (playBtn) playBtn.textContent = '▶';
      });
      this.videoEl.addEventListener('timeupdate', () => {
        if (progress && this.videoEl && this.videoEl.duration) {
          progress.value = String((this.videoEl.currentTime / this.videoEl.duration) * 100);
        }
      });
    }
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: block; font-family: var(--flowx-font-family); position: relative; }
        .player-container { position: relative; background: #000; border-radius: var(--flowx-radius-md); overflow: hidden; }
        ::slotted(video), video { display: block; width: 100%; height: auto; }
        .controls-bar {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 10;
          background: linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%);
          display: flex; align-items: center; gap: 10px; padding: 10px 14px;
        }
        .ctrl-btn {
          background: transparent; border: none; color: #fff; cursor: pointer;
          font-size: 16px; padding: 4px; border-radius: 4px;
        }
        .ctrl-btn:hover { background: rgba(255,255,255,0.15); }
        input[type="range"] { flex: 1; accent-color: var(--flowx-primary, #0066cc); cursor: pointer; }
      </style>
      <div class="player-container">
        <slot>
          <video src="${this.getAttribute('src') || ''}"></video>
        </slot>
        <div class="controls-bar">
          <button type="button" class="ctrl-btn" id="play-btn" aria-label="Play or pause">▶</button>
          <input type="range" id="progress" min="0" max="100" value="0" />
          <button type="button" class="ctrl-btn" id="fullscreen-btn" aria-label="Toggle Fullscreen">⛶</button>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('#play-btn')?.addEventListener('click', () => this.togglePlay());
    this.shadowRoot
      .querySelector('#fullscreen-btn')
      ?.addEventListener('click', () => this.toggleFullscreen());
    this.shadowRoot.querySelector('#progress')?.addEventListener('input', (e: Event) => {
      const val = Number((e.target as HTMLInputElement).value);
      if (this.videoEl && this.videoEl.duration) {
        this.videoEl.currentTime = (val / 100) * this.videoEl.duration;
      }
    });
  }
}

if (!customElements.get('flowx-video-player')) {
  customElements.define('flowx-video-player', FlowXVideoPlayer);
}
