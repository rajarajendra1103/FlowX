# `@flowx/core` — High-Performance HTML AJAX Engine ⚡

The core HTMX-inspired AJAX request-and-swap engine powering FlowX.

- **Ultra-Lightweight**: Under **2.8KB gzipped** IIFE script.
- **CDN Drop-In**: Loaded via a single `<script src=".../index.global.js">` tag in any HTML document or server template.
- **Zero Dependencies**: Pure Vanilla JS built on native Web APIs (`fetch`, `MutationObserver`, `IntersectionObserver`).

---

## 🚀 CDN Usage

```html
<script src="https://unpkg.com/@flowx/core/dist/index.global.js"></script>

<!-- Declarative AJAX Trigger -->
<button fx-get="/api/fragment" fx-trigger="click" fx-target="#content" fx-swap="innerHTML">
  Load Fragment
</button>

<div id="content">Initial Content</div>
```

---

## ⚙️ Core Attributes & Verbs

| Attribute              | Description                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `fx-get="URL"`         | Issues an HTTP GET request to specified URL.                                                         |
| `fx-post="URL"`        | Issues an HTTP POST request sending form payload.                                                    |
| `fx-put="URL"`         | Issues an HTTP PUT request.                                                                          |
| `fx-delete="URL"`      | Issues an HTTP DELETE request.                                                                       |
| `fx-target="SELECTOR"` | Specifies target element to receive swapped HTML (`#id`, `.class`).                                  |
| `fx-swap="STRATEGY"`   | Swap mode: `innerHTML`, `outerHTML`, `beforebegin`, `afterbegin`, `beforeend`, `afterend`, `delete`. |
| `fx-trigger="EVENT"`   | Trigger spec: `click`, `submit`, `keyup delay:300ms`, `change throttle:500ms`, `revealed`.           |

---

## 📄 License

MIT © FlowX Authors
