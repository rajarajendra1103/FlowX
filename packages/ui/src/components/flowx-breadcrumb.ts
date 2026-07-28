import { defineFlowXElement } from '../helper';

defineFlowXElement('flowx-breadcrumb', {
  observedAttributes: ['separator'],
  style: `
    :host {
      display: block;
    }
    .breadcrumb-container nav {
      display: inline-block;
    }
    .breadcrumb {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: 0;
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      gap: 0;
    }
    .breadcrumb-item {
      display: inline-flex;
      align-items: center;
      color: #e6edf3;
    }
    .breadcrumb-item ::slotted(a) {
      color: var(--flowx-primary);
      text-decoration: none;
      transition: color var(--flowx-transition);
    }
    .breadcrumb-item ::slotted(a:hover) {
      color: var(--flowx-primary-hover);
      text-decoration: underline;
    }
    .breadcrumb-item ::slotted(span), .breadcrumb-item ::slotted([aria-current="page"]) {
      color: var(--text-muted);
      pointer-events: none;
    }
    .separator {
      margin: 0 var(--flowx-spacing-sm);
      color: var(--text-muted);
      user-select: none;
    }
  `,
  setup: (el) => {
    const root = el.shadowRoot;
    el.setAttribute('role', 'navigation');
    el.setAttribute('aria-label', 'Breadcrumb');

    const renderBreadcrumbs = () => {
      const hostEl = el as HTMLElement;
      // Find all light DOM children of the element
      const children = Array.from(hostEl.children).filter((child: Element) => {
        // Exclude elements that already have slot attributes from our dynamic slot mapping
        return !child.getAttribute('slot')?.startsWith('item-');
      });

      const separatorChar = el.getAttribute('separator') || '/';
      let html = '<ol class="breadcrumb">';

      children.forEach((child: Element, index: number) => {
        const slotName = `item-${index}`;
        child.setAttribute('slot', slotName);

        if (index === children.length - 1) {
          child.setAttribute('aria-current', 'page');
        } else {
          child.removeAttribute('aria-current');
        }

        html += `<li class="breadcrumb-item"><slot name="${slotName}"></slot></li>`;
        if (index < children.length - 1) {
          html += `<li class="separator" aria-hidden="true">${separatorChar}</li>`;
        }
      });
      html += '</ol>';

      if (root) {
        const container = root.querySelector('.breadcrumb-container nav');
        if (container) {
          container.innerHTML = html;
        }
      }
    };

    const observer = new MutationObserver(() => {
      renderBreadcrumbs();
    });
    observer.observe(el, { childList: true });

    renderBreadcrumbs();
  },
  template: () => {
    return `
      <div class="breadcrumb-container">
        <nav></nav>
      </div>
    `;
  },
});
