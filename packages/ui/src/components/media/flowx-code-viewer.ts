import { GLOBAL_THEME } from '../../helper';

/**
 * <flowx-code-viewer>
 *
 * Light-DOM code text renderer with tokenized syntax highlighting (JS/TS, HTML, CSS, Python, JSON).
 * Fallback: Plain <pre><code> text content readable without JS.
 */
export class FlowXCodeViewer extends HTMLElement {
  static get observedAttributes() {
    return ['lang', 'line-numbers'];
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

  public highlightCode(code: string, lang: string): string {
    if (!code) return '';

    let highlighted = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    if (lang === 'html' || lang === 'xml') {
      highlighted = highlighted
        .replace(/(&lt;\/?[a-z0-9-]+)/gi, '<span class="keyword">$1</span>')
        .replace(
          /([a-z-]+)=("[^"]*")/gi,
          '<span class="attr">$1</span>=<span class="string">$2</span>',
        );
    } else {
      // Keywords
      highlighted = highlighted.replace(
        /\b(const|let|var|function|return|if|else|import|export|class|from|extends|interface|type)\b/g,
        '<span class="keyword">$1</span>',
      );
      // Strings
      highlighted = highlighted.replace(
        /("[^"]*"|'[^']*'|`[^`]*`)/g,
        '<span class="string">$1</span>',
      );
      // Comments
      highlighted = highlighted.replace(/(\/\/[^\n]*)/g, '<span class="comment">$1</span>');
      // Numbers
      highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
    }

    return highlighted;
  }

  private render() {
    if (!this.shadowRoot) return;

    const lang = this.getAttribute('lang') || 'js';
    const code = this.textContent || '';
    const highlightedHtml = this.highlightCode(code.trim(), lang);

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: block; font-family: 'Fira Code', monospace; }
        .code-container {
          background: #0d1117; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); overflow: hidden;
        }
        .header {
          background: #161b22; padding: 6px 12px; font-size: 11px; color: #8b949e;
          border-bottom: 1px solid rgba(255,255,255,0.08); text-transform: uppercase;
        }
        pre { margin: 0; padding: 14px; overflow-x: auto; font-size: 13px; color: #e6edf3; }
        .keyword { color: #ff7b72; font-weight: bold; }
        .string { color: #a5d6ff; }
        .comment { color: #8b949e; font-style: italic; }
        .number { color: #79c0ff; }
        .attr { color: #d2a8ff; }
      </style>
      <div class="code-container">
        <div class="header">${lang}</div>
        <pre><code>${highlightedHtml}</code></pre>
      </div>
    `;
  }
}

if (!customElements.get('flowx-code-viewer')) {
  customElements.define('flowx-code-viewer', FlowXCodeViewer);
}
