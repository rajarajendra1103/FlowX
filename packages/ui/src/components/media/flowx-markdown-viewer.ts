import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-markdown-viewer>
 *
 * Lightweight in-house markdown renderer with XSS sanitization.
 * Fallback: Raw text content remains readable in light DOM if JS fails.
 */
export class FlowXMarkdownViewer extends HTMLElement {
  static get observedAttributes() {
    return ['src'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  public parseMarkdown(md: string): string {
    if (!md) return '';

    const html = md
      // Escaping dangerous HTML tags to prevent XSS
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/javascript:/gi, '')

      // Headings
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')

      // Bold & Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')

      // Code blocks & Inline code
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')

      // Links & Images
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width:100%" />')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')

      // Lists
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/<\/li>\n<li>/g, '</li><li>')

      // Paragraphs
      .replace(/\n\n/g, '</p><p>');

    return `<p>${html}</p>`;
  }

  private async render() {
    if (!this.shadowRoot) return;

    let content = this.textContent || '';
    const src = this.getAttribute('src') || this.getAttribute('fx-get');

    if (src) {
      try {
        const res = await fetch(src);
        content = await res.text();
      } catch (err) {
        console.error('FlowX Markdown: Fetch error', err);
      }
    }

    const renderedHtml = this.parseMarkdown(content);

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: block; font-family: var(--flowx-font-family); color: #c9d1d9; line-height: 1.6; }
        h1, h2, h3 { color: #e6edf3; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; }
        code { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-family: monospace; }
        pre { background: #161b22; padding: 12px; border-radius: 6px; overflow-x: auto; border: 1px solid rgba(255,255,255,0.1); }
        pre code { background: transparent; padding: 0; }
        a { color: var(--flowx-primary, #58a6ff); text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
      <div class="markdown-body">
        ${renderedHtml}
      </div>
    `;
  }
}

if (!customElements.get('flowx-markdown-viewer')) {
  customElements.define('flowx-markdown-viewer', FlowXMarkdownViewer);
}
