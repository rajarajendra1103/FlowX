import { defineFlowXElement } from '../helper';

export const FlowXProgress = defineFlowXElement('flowx-progress', {
  observedAttributes: ['value', 'max'],
  style: `
    :host {
      display: block;
      width: 100%;
      margin: var(--flowx-spacing-sm) 0;
    }
    .progress-track {
      background-color: var(--flowx-neutral);
      border-radius: var(--flowx-radius-round);
      height: 8px;
      overflow: hidden;
      width: 100%;
      border: 1px solid rgba(240, 246, 252, 0.1);
    }
    .progress-bar {
      background-color: var(--flowx-primary);
      height: 100%;
      border-radius: var(--flowx-radius-round);
      width: 0;
      transition: width var(--flowx-transition);
    }
  `,
  template: (el) => {
    const val = Number(el.getAttribute('value') || 0);
    const max = Number(el.getAttribute('max') || 100);
    const percent = Math.min(Math.max((val / max) * 100, 0), 100);

    return `
      <div 
        class="progress-track"
        role="progressbar"
        aria-valuenow="${val}"
        aria-valuemin="0"
        aria-valuemax="${max}"
      >
        <div class="progress-bar" style="width: ${percent}%"></div>
      </div>
    `;
  },
});
