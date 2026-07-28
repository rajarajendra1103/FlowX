import { defineFlowXElement } from '../helper';

export const FlowXCard = defineFlowXElement('flowx-card', {
  style: `
    :host {
      display: block;
      background: rgba(13, 17, 23, 0.4);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(240, 246, 252, 0.15);
      border-radius: var(--flowx-radius-lg);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      color: #c9d1d9;
      font-family: var(--flowx-font-family);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .card-header {
      padding: var(--flowx-spacing-md);
      border-bottom: 1px solid rgba(240, 246, 252, 0.1);
      font-weight: 600;
      font-size: 1.1em;
    }
    
    .card-body {
      padding: var(--flowx-spacing-md);
      flex: 1;
      font-size: var(--flowx-font-size-md);
      line-height: 1.5;
    }
    
    .card-footer {
      padding: var(--flowx-spacing-md);
      border-top: 1px solid rgba(240, 246, 252, 0.1);
      background: rgba(22, 27, 34, 0.3);
    }
  `,
  template: `
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  `,
});
