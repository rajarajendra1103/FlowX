# `@flowx/ui` — Native Custom Elements & Progressive Enhancement Pickers

A zero-dependency, server-rendered-HTML-first UI library built specifically for FlowX and modern Web Standards.

---

## ⚡ Progressive Enhancement Guarantee

Unlike React, Vue, or Angular component libraries — where a single JavaScript load failure, network timeout, or runtime error results in completely broken, un-interactive form fields — **FlowX UI is built server-rendered-HTML-first**.

### How Pickers Work in FlowX UI:

1. **Native HTML First**: Page authors write standard, fully valid HTML form inputs:

   ```html
   <form fx-post="/api/booking">
     <label>Booking Date</label>
     <input type="date" name="booking_date" required />

     <label>Time</label>
     <input type="time" name="booking_time" required />

     <label>Theme Color</label>
     <input type="color" name="theme_color" value="#0066cc" />

     <label>Attachments</label>
     <input type="file" name="attachments" multiple />

     <button type="submit">Submit</button>
   </form>
   ```

2. **Zero-Breakage Fallback**: If JavaScript fails to execute or is disabled by the client, the page renders 100% standard native `<input>` controls. Browser form validation (`required`, `min`, `max`, `pattern`) and `FormData` form submission work natively with **zero breakage**.

3. **Progressive Upgrade**: When FlowX UI JavaScript loads:
   - MutationObserver scans matching inputs (`input[type="date"]`, `input[type="time"]`, `input[type="color"]`, `input[type="file"]`).
   - The native input is visually hidden (preserving native form participation & validation).
   - Rich custom element UI controls (`<flowx-date-picker>`, `<flowx-time-picker>`, `<flowx-color-picker>`, `<flowx-file-upload>`) are automatically attached.
   - Two-way synchronization ensures user interaction in the custom UI updates the native `.value` and dispatches native `'input'` and `'change'` events.

---

## 📦 Component Overview

### Tier 1 — Core Primitives

- `<flowx-button>` — Variants: `primary`, `secondary`, `ghost`, `danger`. Sizes: `sm`, `md`, `lg`. `disabled` & `loading` states.
- `<flowx-icon-button>` — Compact icon button element.
- `<flowx-link>` — Auto-detects external URLs, adding `rel="noopener noreferrer"` and external link icon.
- `<flowx-badge>` — Status indicators and counter tags.
- `<flowx-avatar>` — Image avatar with automatic initials fallback.
- `<flowx-card>` — Structured card with `header`, body, and `footer` slots.
- `<flowx-divider>` — Horizontal and vertical separator lines.
- `<flowx-chip>` — Compact tag with optional dismissible close event.
- `<flowx-alert>` — Dismissible contextual alert banners (`info`, `success`, `warning`, `error`).
- `<flowx-toast>` — Stackable notification toasts.
- `<flowx-progress>` — Progress bar indicator.
- `<flowx-spinner>` — Loading indicator.
- `<flowx-skeleton>` — Skeleton loading placeholder.

### Tier 2 — Interactive Infrastructure & Overlays

- `<flowx-tooltip>` — Accessible hover/focus tooltips with collision flipping (`createFloatingPositioner`).
- `<flowx-popover>` — Rich popup container with trigger slot and focus trap (`createFocusTrap`).
- `<flowx-dropdown>` — Dropdown menu with roving tabindex keyboard navigation (`createRovingTabindex`).
- `<flowx-accordion>` — Single & multi-expand accordion panels.
- `<flowx-tabs>` — Tab panels with automatic ARIA role management.
- `<flowx-breadcrumb>` — Hierarchical navigation path.
- `<flowx-pagination>` — Page number pagination controls.
- `<flowx-stepper>` — Multi-step process indicator.
- `<flowx-timeline>` — Event sequence timeline.

### Tier 3 — Form-Associated Custom Elements

Native `ElementInternals` form-associated elements that participate directly in native `FormData` and `form.reportValidity()`:

- `<flowx-input>` · `<flowx-textarea>` · `<flowx-checkbox>` · `<flowx-switch>` · `<flowx-radio>` · `<flowx-select>` · `<flowx-slider>` · `<flowx-rating>` · `<flowx-otp-input>` · `<flowx-autocomplete>` · `<flowx-form>` & `<flowx-form-error>`

### Tier 4 — Progressive Enhancement Pickers

- `<flowx-date-picker>` — Enhances `input[type="date"]` with custom calendar grid & keyboard navigation.
- `<flowx-time-picker>` — Enhances `input[type="time"]` with hours/minutes popover.
- `<flowx-datetime-picker>` — Enhances `input[type="datetime-local"]` with date grid + time selector.
- `<flowx-color-picker>` — Enhances `input[type="color"]` with design-system preset swatches & HEX input.
- `<flowx-file-upload>` — Enhances `input[type="file"]` with drag-and-drop zone, file list, and XHR progress bars.
- `<flowx-image-upload>` — Enhances image file inputs with image thumbnail previews & client-side resize.
- `<flowx-signature-pad>` — Canvas signature drawing pad serializing base64 PNG data URLs to a hidden input on form submit _(Note: Signature drawing genuinely requires JS; serializes to a standard text input field for server compatibility)_.

### Tier 5 — Server-Driven Data Components

- `<flowx-data-table>` — Table wrapper with `fx-sort` column headers triggering `fx-get` requests with serialized query strings (`?page=1&sort=name&dir=asc`). Supports `mode="client"` for in-memory JS sorting.
- `<flowx-data-grid>` — Superset of `<flowx-data-table>` adding column resize (drag handles), column reorder (HTML5 drag & drop), and column visibility menus.
- `<flowx-tree-table>` — Expandable tree rows with lazy-loading children via `fx-get="/api/tree?parent=ID"`.
- `<flowx-list-view>` — Server-driven non-tabular list container swapping cards or row templates.
- `<flowx-virtual-list>` — Windowed scrolling list for large in-memory arrays (client-mode only).
- `<flowx-infinite-scroll>` — Wrapper for core's `fx-trigger="revealed"`. Fires `fx-get` with page cursor on scroll into view and appends (`fx-swap="beforeend"`).
- `<flowx-search>` — Debounced input triggering `fx-get` with `q` search param and cancelling stale requests.
- `<flowx-filter>` — Filter panel wrapping inputs/selects, passing filter values as query parameters.
- `<flowx-sort>` — Standalone sort dropdown/buttons outside table headers.
- `<flowx-group-by>` — Group-by dropdown adding `group_by` param to server requests.
- `<flowx-export>` — Triggers server endpoint file download stream, with client-side CSV Blob export fallback.
- `<flowx-print-button>` — Triggers `window.print()`.

### Tier 6 — Native `<dialog>`-Based Overlay Components

- `<flowx-dialog>` — Unopinionated base Custom Element wrapping native `<dialog>`.
- `<flowx-modal>` — Structured overlay wrapping native `<dialog>` with header/body/footer slots & entrance/exit CSS animations.
- `<flowx-confirm-dialog>` — Confirm modal emitting `fx-confirm` events `{ confirmed: boolean }`, gating paired `fx-delete` / `fx-post` triggers without JS `confirm()`.
- `<flowx-sheet>` — Edge drawer `<dialog>` sliding in from left or right screen edge.
- `<flowx-bottom-sheet>` — Mobile bottom drawer `<dialog>` sliding up from bottom with drag-to-dismiss support.
- `<flowx-lightbox>` — Enlarges images triggered by clicking thumbnail elements with `data-lightbox-src`.
- `<flowx-image-viewer>` — Lightbox superset with next/prev gallery navigation and zoom/pan controls.
- `<flowx-fullscreen-viewer>` — Wraps native Fullscreen API (`element.requestFullscreen()`) for viewing any content fullscreen.

### Tier 7 — Structural Layout Chrome & Navigation Components

- `<flowx-navbar>` — Header wrapper with logo/nav/actions slots and CSS query responsive hamburger collapse.
- `<flowx-sidebar>` — Persistent side navigation with collapsible icon-only state and zero-FOUC server cookie persistence (`flowx_sidebar_collapsed=true`).
- `<flowx-drawer>` — Off-canvas panel aliased to `<flowx-sheet>`.
- `<flowx-dock>` — macOS-style icon dock with scale-on-hover CSS magnification effects.
- `<flowx-bottom-navigation>` — Mobile viewport-bottom tab bar with 100% no-JS CSS attribute selector active item highlighting via `current`.
- `<flowx-menu>` & `<flowx-menu-item>` — General-purpose menu panel with roving tabindex and positioning.
- `<flowx-context-menu>` — Right-click context menu panel positioned at cursor coordinates `(clientX, clientY)`.
- `<flowx-mega-menu>` — Multi-column wide menu supporting `fx-get="/api/menu"` lazy-loading panel HTML.
- `<flowx-command-palette>` — Global Cmd/Ctrl+K shortcut palette with debounced search input firing `fx-get` to server search endpoints.

### Tier 9 — Media & Document Viewing Components

- `<flowx-image>` — Progressive enhancement over native `<img>` with skeleton shimmer, lazy loading, and blur-up placeholder.
- `<flowx-gallery>` — Image grid enhancing server-rendered `<img>` tags, opening `<flowx-image-viewer>` modal on click.
- `<flowx-carousel>` — Enhances native slide elements with prev/next controls, dots, swipe gestures, and autoplay (respecting `prefers-reduced-motion`).
- `<flowx-video-player>` — Custom media controls overlay calling native `<video>` methods (`play()`, `pause()`, `requestFullscreen()`).
- `<flowx-audio-player>` — Custom audio controls overlay calling native `<audio>` methods.
- `<flowx-pdf-viewer>` — PDF document container with zoom, page nav, and download toolbar over native `<embed type="application/pdf">`.
- `<flowx-markdown-viewer>` — Lightweight in-house markdown to HTML parser with XSS sanitization (`<script>`, `javascript:` neutralization).
- `<flowx-code-viewer>` — Light-DOM syntax highlighter for common programming languages (JS, TS, HTML, CSS, Python, JSON).

---

## 🚀 Quick Start

### CDN (Script Tag)

```html
<script src="https://unpkg.com/@flowx/ui/dist/flowx-ui.js"></script>
```

### NPM / Bundler

```bash
npm install @flowx/ui
```

```typescript
import '@flowx/ui';
```

---

## 🎨 Theme Customization

FlowX UI elements use CSS Custom Properties for full design system flexibility:

```css
:root {
  --flowx-primary: #0066cc;
  --flowx-font-family: system-ui, -apple-system, sans-serif;
  --flowx-radius-md: 6px;
  --flowx-error: #dc3545;
}
```

---

## 📄 License

MIT © FlowX Authors
