export interface ChartDataset {
  label?: string;
  data: number[];
  color?: string;
  fill?: boolean;
}

export interface ChartDataPayload {
  labels?: string[];
  datasets?: ChartDataset[];
  series?: Array<{ name: string; value: number; color?: string }>;
  values?: number[];
  value?: number;
  change?: number;
  zones?: Array<{ min: number; max: number; color: string }>;
}

export abstract class FlowXChartBase extends HTMLElement {
  protected chartData: ChartDataPayload = { labels: [], datasets: [] };
  private observer: IntersectionObserver | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.readDataPayload();
    this.setupLiveUpdateListeners();
    this.setupLazyLoad();
    this.renderChart();
  }

  public refreshData(newData: ChartDataPayload): void {
    this.chartData = newData;
    this.renderChart();
  }

  protected readDataPayload(): void {
    // 1. Check for child <script type="application/json"> data island
    const scriptIsland = this.querySelector('script[type="application/json"]');
    if (scriptIsland && scriptIsland.textContent) {
      try {
        this.chartData = JSON.parse(scriptIsland.textContent.trim());
        return;
      } catch (e) {
        console.error('FlowX Charts: Failed to parse JSON data island', e);
      }
    }

    // 2. Check for inline data attribute
    const dataAttr = this.getAttribute('data');
    if (dataAttr) {
      try {
        this.chartData = JSON.parse(dataAttr);
        return;
      } catch (e) {
        console.error('FlowX Charts: Failed to parse data attribute', e);
      }
    }
  }

  private setupLazyLoad(): void {
    const endpoint = this.getAttribute('fx-get');
    const isRevealed = this.getAttribute('fx-trigger') === 'revealed';

    if (endpoint && isRevealed && typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.fetchChartData(endpoint);
            this.observer?.disconnect();
          }
        });
      });
      this.observer.observe(this);
    }
  }

  public async fetchChartData(endpoint: string): Promise<void> {
    try {
      const res = await fetch(endpoint);
      const json = await res.json();
      this.refreshData(json);
    } catch (err) {
      console.error(`FlowX Charts: Failed to fetch data from ${endpoint}`, err);
    }
  }

  private setupLiveUpdateListeners(): void {
    // Auto re-render if updated via fx-afterSwap or SSE message
    this.addEventListener('fx:afterSwap', () => {
      this.readDataPayload();
      this.renderChart();
    });

    // Listen to custom sse/ws payload events
    document.addEventListener('fx:sse-message', (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (
        detail &&
        (detail.target === `#${this.id}` ||
          detail.target === this.id ||
          this.hasAttribute('fx-sse-connect'))
      ) {
        if (detail.data) {
          try {
            const parsed = typeof detail.data === 'string' ? JSON.parse(detail.data) : detail.data;
            this.refreshData(parsed);
          } catch {}
        }
      }
    });
  }

  protected generateAccessibilityAttrs(title: string, summary: string): { ariaLabel: string } {
    const label = `${title}. ${summary}`;
    this.setAttribute('role', 'img');
    this.setAttribute('aria-label', label);
    return { ariaLabel: label };
  }

  abstract renderChart(): void;
}
