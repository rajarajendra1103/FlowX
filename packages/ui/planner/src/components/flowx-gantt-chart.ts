import { defineFlowXElement, parseJsonIsland, commitPayload } from '../helper';

export interface GanttTask {
  id: string;
  name: string;
  startOffset: number; // days offset from timeline start
  duration: number; // days
  dependencies?: string[]; // array of target task IDs
  progress?: number;
}

export const FlowXGanttChart = defineFlowXElement('flowx-gantt-chart', {
  observedAttributes: ['fx-post', 'commit-url'],
  style: `
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--flowx-font-sans);
    }
    .gantt-container {
      background-color: var(--flowx-bg-surface, #ffffff);
      color: var(--flowx-color-text, #0f172a);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-lg, 16px);
      box-shadow: var(--flowx-shadow-md);
      overflow-x: auto;
      padding: var(--flowx-space-4, 16px);
      position: relative;
    }
    .gantt-layout {
      display: flex;
      min-width: 700px;
    }
    .task-labels {
      flex: 0 0 160px;
      border-right: 1px solid var(--flowx-border-color);
    }
    .label-row {
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 8px;
      font-weight: 600;
      font-size: 13px;
      border-bottom: 1px solid var(--flowx-border-color);
    }
    .timeline-area {
      flex: 1 1 0%;
      position: relative;
    }
    .task-row {
      height: 40px;
      position: relative;
      border-bottom: 1px solid var(--flowx-border-subtle, #f1f5f9);
    }
    .task-bar {
      position: absolute;
      top: 6px;
      height: 28px;
      background-color: var(--flowx-color-primary, #2563eb);
      color: #ffffff;
      border-radius: var(--flowx-radius-sm, 4px);
      display: flex;
      align-items: center;
      padding: 0 8px;
      font-size: 11px;
      font-weight: 600;
      cursor: grab;
      user-select: none;
      box-shadow: var(--flowx-shadow-sm);
    }
    .resize-handle {
      position: absolute;
      right: 0;
      top: 0;
      width: 6px;
      height: 100%;
      cursor: e-resize;
      background: rgba(255,255,255,0.4);
    }
    .svg-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
  `,
  template: (el) => {
    const tasks: GanttTask[] = el._tasks || [];

    const labelsHtml = tasks.map((t) => `<div class="label-row">${t.name}</div>`).join('');

    const dayWidth = 25; // 25px per day
    const rowsHtml = tasks
      .map((t) => {
        const left = t.startOffset * dayWidth;
        const width = t.duration * dayWidth;

        return `
        <div class="task-row">
          <div class="task-bar" data-id="${t.id}" tabindex="0" style="left: ${left}px; width: ${width}px;">
            <span>${t.name}</span>
            <div class="resize-handle"></div>
          </div>
        </div>
      `;
      })
      .join('');

    // Generate SVG dependency lines between tasks
    let svgLinesHtml = '';
    tasks.forEach((task, idx) => {
      if (task.dependencies) {
        task.dependencies.forEach((depId) => {
          const targetIdx = tasks.findIndex((x) => x.id === depId);
          if (targetIdx !== -1) {
            const depTask = tasks[targetIdx];
            const x1 = (depTask.startOffset + depTask.duration) * dayWidth;
            const y1 = targetIdx * 40 + 20;
            const x2 = task.startOffset * dayWidth;
            const y2 = idx * 40 + 20;

            svgLinesHtml += `<path d="M ${x1} ${y1} C ${x1 + 20} ${y1}, ${x2 - 20} ${y2}, ${x2} ${y2}" stroke="var(--flowx-color-primary)" stroke-width="2" fill="none" marker-end="url(#arrow)"/>`;
          }
        });
      }
    });

    return `
      <div class="gantt-container">
        <div class="gantt-layout">
          <div class="task-labels">
            <div class="label-row" style="background: var(--flowx-bg-hover); font-weight: 700;">Task Name</div>
            ${labelsHtml}
          </div>
          <div class="timeline-area">
            <div class="label-row" style="background: var(--flowx-bg-hover); font-weight: 700;">Timeline (Days)</div>
            ${rowsHtml}
            <svg class="svg-overlay" width="100%" height="100%">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--flowx-color-primary)" />
                </marker>
              </defs>
              ${svgLinesHtml}
            </svg>
          </div>
        </div>
      </div>
    `;
  },
  setup: (el) => {
    el._tasks = parseJsonIsland<GanttTask[]>(el, [
      { id: 'g1', name: 'DB Schema Design', startOffset: 1, duration: 4 },
      { id: 'g2', name: 'API Implementation', startOffset: 5, duration: 6, dependencies: ['g1'] },
      { id: 'g3', name: 'UI Components', startOffset: 6, duration: 5 },
      { id: 'g4', name: 'E2E Testing', startOffset: 11, duration: 3, dependencies: ['g2', 'g3'] },
    ]);

    const root = el.shadowRoot || el;
    const dayWidth = 25;

    let activeTaskId: string | null = null;
    let isResizing = false;

    root.addEventListener('pointerdown', (e: Event) => {
      const pe = e as PointerEvent;
      const target = pe.target as HTMLElement;

      const bar = target.closest('.task-bar') as HTMLElement;
      if (bar) {
        activeTaskId = bar.getAttribute('data-id');
        isResizing = target.classList.contains('resize-handle');
        bar.setPointerCapture(pe.pointerId);
        pe.preventDefault();
      }
    });

    root.addEventListener('pointermove', (e: Event) => {
      if (!activeTaskId) return;
      const pe = e as PointerEvent;
      const task = el._tasks.find((t: GanttTask) => t.id === activeTaskId);
      if (!task) return;

      if (isResizing) {
        const deltaDays = Math.round(pe.movementX / dayWidth);
        task.duration = Math.max(1, task.duration + deltaDays);
      } else {
        const deltaDays = Math.round(pe.movementX / dayWidth);
        task.startOffset = Math.max(0, task.startOffset + deltaDays);
      }
      el.render();
    });

    root.addEventListener('pointerup', () => {
      if (activeTaskId) {
        const task = el._tasks.find((t: GanttTask) => t.id === activeTaskId);
        if (task) {
          commitPayload(el, { taskId: task.id, task }, 'gantt-update');
        }
        activeTaskId = null;
        isResizing = false;
      }
    });

    // Keyboard accessibility for Gantt Chart tasks
    root.addEventListener('keydown', (e: Event) => {
      const ke = e as KeyboardEvent;
      const bar = (ke.target as HTMLElement).closest('.task-bar');
      if (!bar) return;

      const taskId = bar.getAttribute('data-id');
      const task = el._tasks.find((t: GanttTask) => t.id === taskId);
      if (!task) return;

      if (ke.shiftKey && ke.key === 'ArrowRight') {
        task.duration += 1;
        commitPayload(el, { taskId: task.id, task }, 'gantt-resize');
        el.render();
      } else if (ke.shiftKey && ke.key === 'ArrowLeft') {
        task.duration = Math.max(1, task.duration - 1);
        commitPayload(el, { taskId: task.id, task }, 'gantt-resize');
        el.render();
      } else if (ke.altKey && ke.key === 'ArrowRight') {
        task.startOffset += 1;
        commitPayload(el, { taskId: task.id, task }, 'gantt-move');
        el.render();
      } else if (ke.altKey && ke.key === 'ArrowLeft') {
        task.startOffset = Math.max(0, task.startOffset - 1);
        commitPayload(el, { taskId: task.id, task }, 'gantt-move');
        el.render();
      }
    });
  },
});
