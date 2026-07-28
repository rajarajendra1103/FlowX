import { defineFlowXElement } from '../helper';

defineFlowXElement('flowx-stepper', {
  observedAttributes: ['current', 'orientation'],
  style: `
    :host {
      display: block;
    }
    .stepper {
      display: flex;
      align-items: flex-start;
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
    }
    :host([orientation="vertical"]) .stepper {
      flex-direction: column;
    }
    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      position: relative;
    }
    :host([orientation="vertical"]) .step {
      flex-direction: row;
      flex: none;
      align-items: flex-start;
      width: 100%;
      padding-bottom: var(--flowx-spacing-lg);
    }
    .step-indicator {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: var(--flowx-font-size-sm);
      border: 2px solid rgba(255,255,255,0.12);
      background: #161b22;
      color: var(--text-muted);
      transition: all var(--flowx-transition);
      flex-shrink: 0;
      z-index: 1;
    }
    .step.completed .step-indicator {
      background: var(--flowx-success);
      border-color: var(--flowx-success);
      color: #fff;
    }
    .step.current .step-indicator {
      background: var(--flowx-primary);
      border-color: var(--flowx-primary);
      color: #fff;
      box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.2);
    }
    .step-label {
      margin-top: var(--flowx-spacing-xs);
      font-size: var(--flowx-font-size-sm);
      color: var(--text-muted);
      text-align: center;
      max-width: 80px;
    }
    :host([orientation="vertical"]) .step-label {
      margin-top: 0;
      margin-left: var(--flowx-spacing-md);
      text-align: left;
      max-width: none;
    }
    .step.current .step-label,
    .step.completed .step-label {
      color: #e6edf3;
    }
    .connector {
      flex: 1;
      height: 2px;
      background: rgba(255,255,255,0.08);
      margin-top: 15px;
      position: relative;
    }
    :host([orientation="vertical"]) .connector {
      display: none;
    }
    .connector.filled {
      background: var(--flowx-primary);
    }
    /* vertical connector */
    :host([orientation="vertical"]) .step::before {
      content: '';
      position: absolute;
      left: 15px;
      top: 32px;
      width: 2px;
      height: calc(100% - 32px);
      background: rgba(255,255,255,0.08);
    }
    :host([orientation="vertical"]) .step.completed::before {
      background: var(--flowx-primary);
    }
    :host([orientation="vertical"]) .step:last-child::before {
      display: none;
    }
    .step.clickable {
      cursor: pointer;
    }
    .step.clickable:hover .step-indicator {
      border-color: var(--flowx-primary);
    }
  `,
  setup: () => {},
  template: (el) => {
    const current = parseInt(el.getAttribute('current') || '0', 10);
    const orientation = el.getAttribute('orientation') || 'horizontal';
    const clickable = el.hasAttribute('clickable');
    const steps = Array.from(el.querySelectorAll('[data-step]')) as HTMLElement[];

    if (steps.length === 0) {
      // Use data-steps attribute as fallback
      const stepsAttr = el.getAttribute('data-steps') || '';
      const stepLabels = stepsAttr
        ? stepsAttr.split(',').map((s: string) => s.trim())
        : ['Step 1', 'Step 2', 'Step 3'];

      let html = `<div class="stepper">`;
      stepLabels.forEach((label: string, i: number) => {
        const isCompleted = i < current;
        const isCurrent = i === current;
        const stateClass = isCompleted ? 'completed' : isCurrent ? 'current' : '';
        const clickableClass = clickable ? 'clickable' : '';

        html += `<div class="step ${stateClass} ${clickableClass}" data-index="${i}" role="listitem">`;
        html += `<div class="step-indicator">${isCompleted ? '✓' : i + 1}</div>`;
        html += `<div class="step-label">${label}</div>`;
        html += `</div>`;

        if (i < stepLabels.length - 1 && orientation !== 'vertical') {
          html += `<div class="connector ${isCompleted ? 'filled' : ''}"></div>`;
        }
      });
      html += `</div>`;
      return html;
    }

    return `<div class="stepper" role="list"><slot></slot></div>`;
  },
});
