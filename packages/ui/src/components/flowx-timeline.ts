import { defineFlowXElement } from '../helper';

defineFlowXElement('flowx-timeline', {
  observedAttributes: ['align'],
  style: `
    :host {
      display: block;
    }
    .timeline {
      position: relative;
      padding-left: 28px;
      font-family: var(--flowx-font-family);
    }
    :host([align="center"]) .timeline {
      padding-left: 0;
    }
    .timeline::before {
      content: '';
      position: absolute;
      left: 10px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: rgba(255,255,255,0.08);
    }
    :host([align="center"]) .timeline::before {
      left: 50%;
      transform: translateX(-50%);
    }
    .timeline-item {
      position: relative;
      padding-bottom: var(--flowx-spacing-lg);
    }
    .timeline-item::before {
      content: '';
      position: absolute;
      left: -22px;
      top: 4px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--flowx-primary);
      border: 2px solid #0d1117;
      box-shadow: 0 0 0 2px var(--flowx-primary);
    }
    .timeline-item:last-child {
      padding-bottom: 0;
    }
    .timeline-time {
      font-size: var(--flowx-font-size-sm);
      color: var(--text-muted);
      margin-bottom: var(--flowx-spacing-xs);
    }
    .timeline-content {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: var(--flowx-radius-md);
      padding: var(--flowx-spacing-md);
    }
    .timeline-title {
      font-weight: 700;
      color: #e6edf3;
      margin: 0 0 var(--flowx-spacing-xs) 0;
      font-size: var(--flowx-font-size-md);
    }
    .timeline-body {
      color: #8b949e;
      font-size: var(--flowx-font-size-md);
      line-height: 1.6;
    }
    ::slotted(flowx-timeline-item) {
      display: block;
    }
  `,
  setup: () => {},
  template: () => `
    <div class="timeline">
      <slot></slot>
    </div>
  `,
});

defineFlowXElement('flowx-timeline-item', {
  observedAttributes: ['time', 'title'],
  style: `
    :host {
      display: block;
      position: relative;
      padding-left: 28px;
      padding-bottom: var(--flowx-spacing-lg);
      font-family: var(--flowx-font-family);
    }
    :host::before {
      content: '';
      position: absolute;
      left: 4px;
      top: 4px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--flowx-primary);
      border: 2px solid #0d1117;
      box-shadow: 0 0 0 2px var(--flowx-primary);
    }
    :host::after {
      content: '';
      position: absolute;
      left: 9px;
      top: 18px;
      bottom: 0;
      width: 2px;
      background: rgba(255,255,255,0.08);
    }
    :host(:last-child)::after {
      display: none;
    }
    .timeline-time {
      font-size: var(--flowx-font-size-sm);
      color: var(--text-muted);
      margin-bottom: var(--flowx-spacing-xs);
    }
    .timeline-content {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: var(--flowx-radius-md);
      padding: var(--flowx-spacing-md);
    }
    .timeline-title {
      font-weight: 700;
      color: #e6edf3;
      margin: 0 0 var(--flowx-spacing-xs) 0;
      font-size: var(--flowx-font-size-md);
    }
    .timeline-body {
      color: #8b949e;
      font-size: var(--flowx-font-size-md);
      line-height: 1.6;
    }
  `,
  setup: () => {},
  template: (el) => {
    const time = el.getAttribute('time') || '';
    const title = el.getAttribute('title') || '';
    return `
      ${time ? `<div class="timeline-time">${time}</div>` : ''}
      <div class="timeline-content">
        ${title ? `<h4 class="timeline-title">${title}</h4>` : ''}
        <div class="timeline-body"><slot></slot></div>
      </div>
    `;
  },
});
