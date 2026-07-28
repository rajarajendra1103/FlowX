import { defineFlowXElement } from '../helper';

export const FlowXLink = defineFlowXElement('flowx-link', {
  observedAttributes: ['href', 'target', 'download'],
  style: `
    :host {
      display: inline;
    }
    .link {
      color: var(--flowx-primary);
      text-decoration: underline;
      font-family: var(--flowx-font-family);
      font-size: inherit;
      transition: color var(--flowx-transition);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }
    .link:hover {
      color: var(--flowx-primary-hover);
    }
    .external-icon {
      font-size: 0.9em;
      opacity: 0.8;
      display: inline-block;
      line-height: 1;
    }
  `,
  template: (el) => {
    const href = el.getAttribute('href') || '#';
    let target = el.getAttribute('target') || '';
    const download = el.getAttribute('download');

    // External detection check
    let isExternal = false;
    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (typeof window !== 'undefined') {
        const url = new URL(href);
        if (url.hostname !== window.location.hostname) {
          isExternal = true;
        }
      } else {
        isExternal = true;
      }
    }

    const relAttr = isExternal ? 'rel="noopener noreferrer"' : '';
    if (isExternal && !target) {
      target = '_blank';
    }

    const targetAttr = target ? `target="${target}"` : '';
    const downloadAttr = download !== null ? `download="${download}"` : '';

    return `
      <a 
        class="link"
        href="${href}"
        ${targetAttr}
        ${relAttr}
        ${downloadAttr}
      >
        <slot></slot>
        ${isExternal ? '<span class="external-icon" aria-hidden="true">↗</span>' : ''}
      </a>
    `;
  },
});
