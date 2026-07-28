import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-audio-player>
 *
 * Custom audio controls UI overlay over a native <audio> element.
 * Fallback: Native <audio controls> remains if JS is not loaded.
 */
export class FlowXAudioPlayer extends HTMLElement {
  private audioEl: HTMLAudioElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.bindNativeAudio();
  }

  public togglePlay() {
    if (!this.audioEl) return;
    if (this.audioEl.paused) this.audioEl.play();
    else this.audioEl.pause();
  }

  private bindNativeAudio() {
    this.audioEl = this.querySelector('audio') || this.shadowRoot?.querySelector('audio') || null;
    if (this.audioEl) {
      this.audioEl.controls = false;

      const playBtn = this.shadowRoot?.querySelector('#play-btn');
      const progress = this.shadowRoot?.querySelector('#progress') as HTMLInputElement;

      this.audioEl.addEventListener('play', () => {
        if (playBtn) playBtn.textContent = '⏸';
      });
      this.audioEl.addEventListener('pause', () => {
        if (playBtn) playBtn.textContent = '▶';
      });
      this.audioEl.addEventListener('timeupdate', () => {
        if (progress && this.audioEl && this.audioEl.duration) {
          progress.value = String((this.audioEl.currentTime / this.audioEl.duration) * 100);
        }
      });
    }
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: block; font-family: var(--flowx-font-family); }
        .audio-container {
          background: #161b22; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); padding: 12px 16px;
          display: flex; align-items: center; gap: 12px;
        }
        .ctrl-btn {
          background: var(--flowx-primary, #0066cc); border: none; color: #fff;
          width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 16px;
          display: flex; align-items: center; justify-content: center;
        }
        input[type="range"] { flex: 1; accent-color: var(--flowx-primary, #0066cc); cursor: pointer; }
      </style>
      <div class="audio-container">
        <slot>
          <audio src="${this.getAttribute('src') || ''}"></audio>
        </slot>
        <button type="button" class="ctrl-btn" id="play-btn" aria-label="Play or pause audio">▶</button>
        <input type="range" id="progress" min="0" max="100" value="0" />
      </div>
    `;

    this.shadowRoot.querySelector('#play-btn')?.addEventListener('click', () => this.togglePlay());
    this.shadowRoot.querySelector('#progress')?.addEventListener('input', (e: Event) => {
      const val = Number((e.target as HTMLInputElement).value);
      if (this.audioEl && this.audioEl.duration) {
        this.audioEl.currentTime = (val / 100) * this.audioEl.duration;
      }
    });
  }
}

if (!customElements.get('flowx-audio-player')) {
  customElements.define('flowx-audio-player', FlowXAudioPlayer);
}
