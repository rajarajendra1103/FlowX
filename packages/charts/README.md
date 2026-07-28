# `@flowx/charts`

> Zero-dependency, server-rendered JSON-island charting & live dashboard components for FlowX.

---

## ⚡ Features & Server Architecture

1. **Server-Rendered JSON Island Pattern**: Render charts directly in HTML templates (Django, Rails, Laravel, PHP, Jinja) by outputting a `<script type="application/json">` child element. **Zero client-side data fetching boilerplate needed**.
2. **Zero Heavy Charting Dependencies**: Built on lightweight in-house SVG primitives (**under 30 KB IIFE bundle**).
3. **Live SSE/WebSocket Dashboard Sync**: Automatically re-renders charts and KPI cards when new JSON island payloads arrive via `fx-get`/`fx-post` HTML swaps or live SSE/WebSocket streams.
4. **Accessibility First**: Every chart generates `role="img"` with an `aria-label` and screen-reader data summary.

---

## 📊 Tier 8 Components

- `<flowx-bar-chart>` — Vertical & horizontal SVG bar charts.
- `<flowx-line-chart>` — SVG polyline & trend line chart.
- `<flowx-area-chart>` — SVG area chart with translucent gradient fill.
- `<flowx-pie-chart>` — Circular slice pie chart with legend.
- `<flowx-donut-chart>` — Ring donut chart with central value display.
- `<flowx-radar-chart>` — Spider web polygon radar chart.
- `<flowx-scatter-chart>` — Coordinate point scatter plot.
- `<flowx-bubble-chart>` — Variable-radius bubble plot.
- `<flowx-heatmap>` — Grid cell color intensity heatmap.
- `<flowx-treemap>` — Nested tile treemap layout.
- `<flowx-gauge>` — Dial gauge with threshold color zones (`zones`).
- `<flowx-sparkline>` — Micro inline trend line without axes for cards and tables.
- `<flowx-financial-chart>` — OHLC candlestick chart + volume bars.
- `<flowx-dashboard-widget>` — Card wrapper with title, refresh button (`fx-get`), and chart slot.
- `<flowx-kpi-card>` — Big metric value + label + trend % arrow with SSE connection.

---

## 🚀 Quick Usage

```html
<!-- Server-Rendered JSON Island Pattern -->
<flowx-bar-chart>
  <script type="application/json">
    {
      "labels": ["Q1", "Q2", "Q3", "Q4"],
      "datasets": [{ "label": "Sales", "data": [120, 190, 300, 420], "color": "#0066cc" }]
    }
  </script>
</flowx-bar-chart>

<!-- Live SSE KPI Metric Card -->
<flowx-kpi-card fx-sse-connect label="Active Users">
  <script type="application/json">
    { "value": 14200, "change": 18.4 }
  </script>
</flowx-kpi-card>
```
