import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-carousel>
 *
 * Wraps set of native slide elements. FlowX enhances with prev/next buttons,
 * dot indicators, autoplay (respecting prefers-reduced-motion), and swipe gesture support.
 */
export class FlowXCarousel extends HTMLElement {
  static get observedAttributes() {
    return ['autoplay', 'interval'];
  }

  private activeIndex = 0;
  private autoplayTimer: any = null;
  private isPointerDown = false;
  private startX = 0;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupSwipeGestures();
    this.initAutoplay();
  }

  disconnectedCallback() {
    this.stopAutoplay();
  }

  attributeChangedCallback() {
    this.initAutoplay();
  }

  public nextSlide() {
    const slides = this.getSlides();
    if (!slides.length) return;
    this.activeIndex = (this.activeIndex + 1) % slides.length;
    this.scrollToActiveSlide();
  }

  public prevSlide() {
    const slides = this.getSlides();
    if (!slides.length) return;
    this.activeIndex = (this.activeIndex - 1 + slides.length) % slides.length;
    this.scrollToActiveSlide();
  }

  public goToSlide(index: number) {
    const slides = this.getSlides();
    if (index >= 0 && index < slides.length) {
      this.activeIndex = index;
      this.scrollToActiveSlide();
    }
  }

  private getSlides(): HTMLElement[] {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return slot.assignedElements() as HTMLElement[];
  }

  private scrollToActiveSlide() {
    const track = this.shadowRoot?.querySelector('.track') as HTMLElement;
    const slides = this.getSlides();
    if (track && slides[this.activeIndex]) {
      slides[this.activeIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
    this.updateDots();
  }

  private initAutoplay() {
    this.stopAutoplay();

    const isAutoplay = this.hasAttribute('autoplay');
    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isAutoplay && !prefersReducedMotion) {
      const interval = Number(this.getAttribute('interval')) || 4000;
      this.autoplayTimer = setInterval(() => this.nextSlide(), interval);
    }
  }

  private stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  private setupSwipeGestures() {
    const track = this.shadowRoot?.querySelector('.track') as HTMLElement;
    if (!track) return;

    track.addEventListener('pointerdown', (e: PointerEvent) => {
      this.isPointerDown = true;
      this.startX = e.clientX;
    });

    track.addEventListener('pointerup', (e: PointerEvent) => {
      if (!this.isPointerDown) return;
      this.isPointerDown = false;
      const diff = e.clientX - this.startX;
      if (diff < -40) this.nextSlide();
      else if (diff > 40) this.prevSlide();
    });
  }

  private updateDots() {
    const dots = Array.from(this.shadowRoot?.querySelectorAll('.dot') || []);
    dots.forEach((dot, idx) => {
      if (idx === this.activeIndex) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  private render() {
    if (!this.shadowRoot) return;

    const slidesCount = this.children.length;
    let dotsHtml = '';
    for (let i = 0; i < slidesCount; i++) {
      dotsHtml += `<button type="button" class="dot ${i === 0 ? 'active' : ''}" data-idx="${i}" aria-label="Go to slide ${i + 1}"></button>`;
    }

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: block; font-family: var(--flowx-font-family); position: relative; width: 100%; }
        .carousel-container { position: relative; overflow: hidden; border-radius: var(--flowx-radius-md); }
        .track {
          display: flex; overflow-x: auto; scroll-snap-type: x mandatory;
          scrollbar-width: none; scroll-behavior: smooth; touch-action: pan-y;
        }
        .track::-webkit-scrollbar { display: none; }
        ::slotted(*) { flex: 0 0 100%; scroll-snap-align: start; width: 100%; box-sizing: border-box; }
        .nav-btn {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 10;
          background: rgba(22, 27, 34, 0.75); backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.15); color: #fff;
          width: 36px; height: 36px; border-radius: 50%; cursor: pointer;
          display: flex; align-items: center; justify-content: center; font-size: 16px;
        }
        .nav-btn:hover { background: rgba(255,255,255,0.2); }
        .prev { left: 12px; }
        .next { right: 12px; }
        .dots-container {
          position: absolute; bottom: 12px; left: 0; right: 0;
          display: flex; align-items: center; justify-content: center; gap: 6px; z-index: 10;
        }
        .dot {
          width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.4);
          border: none; cursor: pointer; padding: 0; transition: background 0.2s, transform 0.2s;
        }
        .dot.active { background: var(--flowx-primary, #0066cc); transform: scale(1.3); }
      </style>

      <div class="carousel-container">
        <button type="button" class="nav-btn prev" id="prev-btn" aria-label="Previous slide">‹</button>
        <div class="track">
          <slot></slot>
        </div>
        <button type="button" class="nav-btn next" id="next-btn" aria-label="Next slide">›</button>
        <div class="dots-container" id="dots">
          ${dotsHtml}
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('#prev-btn')?.addEventListener('click', () => this.prevSlide());
    this.shadowRoot.querySelector('#next-btn')?.addEventListener('click', () => this.nextSlide());
    this.shadowRoot.querySelectorAll('.dot').forEach((dot) => {
      dot.addEventListener('click', (e: Event) => {
        const idx = Number((e.target as HTMLElement).getAttribute('data-idx'));
        this.goToSlide(idx);
      });
    });
  }
}

if (!customElements.get('flowx-carousel')) {
  customElements.define('flowx-carousel', FlowXCarousel);
}
