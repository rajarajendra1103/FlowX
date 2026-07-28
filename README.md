# FlowX ⚡

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/nicholasxjy/FlowX/releases/tag/v0.1.0)
[![Core Size](https://img.shields.io/badge/gzipped%20core-2.83%20KB-brightgreen.svg)](#)
[![Setup](https://img.shields.io/badge/Setup-CDN%20Only-blue.svg)](#cdn-quickstart)

**FlowX** is a ultra-lightweight, server-rendered HTML-first UI ecosystem. It turns any plain HTML file or backend template (Django, Laravel, Rails, Express, PHP, Go, ASP.NET) into a fast, modern reactive web app using declarative HTML attributes and custom web components.

With FlowX, you get:

- **Declarative AJAX Swaps**: Trigger server-driven DOM updates using HTML attributes like `fx-get`, `fx-post`, `fx-target`, and `fx-swap` (HTMX-compatible).
- **13 Tiers of UI Components**: Buttons, Modals, Navigation, Forms, Pickers, Data Tables, Charts, Kanban Boards, Calendars, Notes, Whiteboards, Chat, and Comments.
- **Real-Time Streaming**: Zero-JS SSE (`fx-sse-connect`) and WebSocket (`fx-ws-connect`) live streaming.
- **Zero Build Step Required**: Works directly in the browser out-of-the-box via CDN without npm, Node.js, Vite, or Webpack.

---

## ⚡ CDN Quickstart (No Build Required)

To use FlowX, simply copy and paste the CDN `<script>` tag into the `<head>` of your HTML document. **No npm, No Node.js, and No build tools required!**

### Standard HTML Template

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My FlowX Application</title>

    <!-- 1. FlowX Core Engine (~2.8KB gzipped) -->
    <script src="https://cdn.jsdelivr.net/npm/@flowx/core@0.1.0/dist/index.global.js"></script>

    <!-- 2. FlowX UI Custom Elements (Optional) -->
    <script src="https://cdn.jsdelivr.net/npm/@flowx/ui@0.1.0/dist/flowx-ui.js"></script>

    <!-- 3. FlowX Planner Widgets: Kanban, Calendar, Gantt (Optional) -->
    <script src="https://cdn.jsdelivr.net/npm/@flowx/ui-planner@0.1.0/dist/flowx-planner.js"></script>

    <!-- 4. FlowX SVG Charts Library (Optional) -->
    <script src="https://cdn.jsdelivr.net/npm/@flowx/charts@0.1.0/dist/flowx-charts.global.js"></script>
  </head>
  <body style="font-family: system-ui; padding: 2rem; background: #0f172a; color: #f8fafc;">
    <!-- Example 1: Declarative Server HTML Swap -->
    <h2>⚡ Declarative AJAX Swap</h2>
    <button
      fx-get="/api/greeting"
      fx-target="#result"
      fx-swap="innerHTML"
      style="padding: 10px 18px; background: #2563eb; color: #fff; border: none; border-radius: 8px; cursor: pointer;"
    >
      Load Server Content
    </button>
    <div id="result" style="margin-top: 1rem; padding: 1rem; border: 1px dashed #334155;">
      Click the button above to load HTML...
    </div>

    <hr style="margin: 2rem 0; border-color: #334155;" />

    <!-- Example 2: Interactive UI Component -->
    <h2>🎨 UI Components</h2>
    <flowx-button variant="primary">Click Me</flowx-button>

    <hr style="margin: 2rem 0; border-color: #334155;" />

    <!-- Example 3: Drag-and-Drop Kanban Board -->
    <h2>📋 Kanban Task Board</h2>
    <flowx-kanban commit-url="/api/kanban/move">
      <script type="application/json">
        {
          "columns": [
            { "id": "todo", "title": "To Do" },
            { "id": "in-progress", "title": "In Progress" },
            { "id": "done", "title": "Completed" }
          ],
          "cards": [
            { "id": "c1", "columnId": "todo", "title": "Set up FlowX CDN", "tag": "Quickstart" },
            { "id": "c2", "columnId": "in-progress", "title": "Build HTML UI", "tag": "Frontend" }
          ]
        }
      </script>
    </flowx-kanban>
  </body>
</html>
```

---

## 📡 CDN Script URLs

| Package           | CDN Script Tag                                                                                              | Size       | Description                                                                    |
| :---------------- | :---------------------------------------------------------------------------------------------------------- | :--------- | :----------------------------------------------------------------------------- |
| **FlowX Core**    | `<script src="https://cdn.jsdelivr.net/npm/@flowx/core@0.1.0/dist/index.global.js"></script>`               | `~2.8 KB`  | Core AJAX engine (`fx-get`, `fx-post`, `fx-target`, `fx-swap`)                 |
| **FlowX UI**      | `<script src="https://cdn.jsdelivr.net/npm/@flowx/ui@0.1.0/dist/flowx-ui.js"></script>`                     | `~210 KB`  | 13 Tiers of UI components (Buttons, Modals, Forms, Navigation, Chat, Comments) |
| **FlowX Planner** | `<script src="https://cdn.jsdelivr.net/npm/@flowx/ui-planner@0.1.0/dist/flowx-planner.js"></script>`        | `~41 KB`   | Planner widgets (Kanban, Calendar, Gantt, Whiteboard, Scheduler)               |
| **FlowX Charts**  | `<script src="https://cdn.jsdelivr.net/npm/@flowx/charts@0.1.0/dist/flowx-charts.global.js"></script>`      | `~29.7 KB` | Zero-dependency SVG Charts with JSON data island support                       |

> **Tip:** To always use the latest `0.x` release, replace `@0.1.0` with `@0` in the URLs above.

---

## 🚀 How FlowX Works

1. **Include the CDN Script**: Include the CDN script tag in your HTML file.
2. **Add `fx-*` Attributes**: Add `fx-get`, `fx-post`, `fx-target`, or `fx-swap` attributes to any HTML element.
3. **Use Web Components**: Use tags like `<flowx-button>`, `<flowx-kanban>`, `<flowx-calendar>`, or `<flowx-comments>` directly in your markup.
4. **Backend Agnostic**: Return HTML snippets from any backend framework (Express, Django, Laravel, Rails, Go, PHP, Flask, ASP.NET).

---

## 📦 npm Install (For Bundler Users)

If you prefer using a bundler (Vite, Webpack, esbuild), install packages from npm:

```bash
npm install @flowx/core @flowx/ui @flowx/ui-planner @flowx/charts
```

```js
// ESM import
import '@flowx/core';
import '@flowx/ui';
```

---

## 📄 License

MIT © FlowX Authors
