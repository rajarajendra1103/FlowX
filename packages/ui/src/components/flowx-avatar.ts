import { defineFlowXElement } from '../helper';

export const FlowXAvatar = defineFlowXElement('flowx-avatar', {
  observedAttributes: ['src', 'alt', 'name', 'img-failed'],
  style: `
    :host {
      display: inline-block;
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }
    .avatar-container {
      width: 100%;
      height: 100%;
      border-radius: var(--flowx-radius-round);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--flowx-neutral);
      color: #475569;
      font-family: var(--flowx-font-family);
      font-size: 14px;
      font-weight: 700;
      border: 1px solid rgba(240, 246, 252, 0.1);
    }
    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .avatar-fallback {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      text-transform: uppercase;
    }
  `,
  setup: (el) => {
    const attachErrorListener = () => {
      const img = el.shadowRoot?.querySelector('.avatar-img');
      if (img) {
        img.addEventListener('error', () => {
          el.setAttribute('img-failed', '');
        });
      }
    };
    // Re-check on mutation
    attachErrorListener();

    // We can also re-setup when attribute changes
    el.addEventListener('load', attachErrorListener);
  },
  template: (el) => {
    const src = el.getAttribute('src');
    const alt = el.getAttribute('alt') || '';
    const name = el.getAttribute('name') || '';
    const imgFailed = el.hasAttribute('img-failed');

    let initials = '';
    if (name) {
      initials = name
        .trim()
        .split(/\s+/)
        .map((part: string) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    }

    const imgTag =
      src && !imgFailed
        ? `<img class="avatar-img" src="${src}" alt="${alt}" />`
        : `<div class="avatar-fallback" aria-label="${name || alt}">${initials || '?'}</div>`;

    return `<div class="avatar-container">${imgTag}</div>`;
  },
});
