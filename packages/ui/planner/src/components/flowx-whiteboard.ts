import { defineFlowXElement, parseJsonIsland, commitPayload } from '../helper';

export interface WhiteboardStroke {
  points: Array<{ x: number; y: number }>;
  color: string;
  width: number;
}

export interface WhiteboardNote {
  id: string;
  x: number;
  y: number;
  text: string;
  color?: string;
}

export const FlowXWhiteboard = defineFlowXElement('flowx-whiteboard', {
  observedAttributes: ['fx-post', 'commit-url', 'tool'],
  style: `
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--flowx-font-sans);
    }
    .whiteboard-container {
      background-color: var(--flowx-bg-surface, #ffffff);
      color: var(--flowx-color-text, #0f172a);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-lg, 16px);
      box-shadow: var(--flowx-shadow-md);
      overflow: hidden;
      position: relative;
    }
    .toolbar {
      display: flex;
      gap: var(--flowx-space-2, 8px);
      padding: var(--flowx-space-3, 12px) var(--flowx-space-4, 16px);
      background-color: var(--flowx-bg-surface-raised, #ffffff);
      border-bottom: 1px solid var(--flowx-border-color, #e2e8f0);
      align-items: center;
    }
    .tool-btn {
      padding: 6px 12px;
      border: 1px solid var(--flowx-border-color);
      background: var(--flowx-bg-surface);
      color: var(--flowx-color-text);
      border-radius: var(--flowx-radius-md);
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
    }
    .tool-btn.active {
      background: var(--flowx-color-primary, #2563eb);
      color: #ffffff;
      border-color: var(--flowx-color-primary, #2563eb);
    }
    .canvas-wrapper {
      position: relative;
      width: 100%;
      height: 450px;
      background: #fafafa;
      cursor: crosshair;
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
    .sticky-note {
      position: absolute;
      width: 130px;
      height: 110px;
      padding: 8px;
      border-radius: var(--flowx-radius-sm);
      box-shadow: var(--flowx-shadow-md);
      font-size: 12px;
      outline: none;
      box-sizing: border-box;
      user-select: none;
    }
    .client-only-badge {
      font-size: 11px;
      color: var(--flowx-color-text-muted);
      margin-left: auto;
    }
  `,
  template: (el) => {
    const activeTool = el._tool || 'pen';

    return `
      <div class="whiteboard-container">
        <div class="toolbar">
          <button class="tool-btn ${activeTool === 'pen' ? 'active' : ''}" data-tool="pen" type="button">✏️ Pen</button>
          <button class="tool-btn ${activeTool === 'eraser' ? 'active' : ''}" data-tool="eraser" type="button">🧹 Eraser</button>
          <button class="tool-btn ${activeTool === 'note' ? 'active' : ''}" data-tool="note" type="button">📝 Sticky Note</button>
          <button class="tool-btn clear-btn" type="button">🗑️ Clear</button>
          <span class="client-only-badge">⚡ Client-Only Canvas Component</span>
        </div>

        <div class="canvas-wrapper">
          <canvas width="800" height="450"></canvas>
          <div class="notes-layer"></div>
        </div>
      </div>
    `;
  },
  setup: (el) => {
    const initialData = parseJsonIsland<{ strokes: WhiteboardStroke[]; notes: WhiteboardNote[] }>(
      el,
      {
        strokes: [],
        notes: [{ id: 'sn-1', x: 80, y: 50, text: 'Brainstorm Architecture', color: '#fef08a' }],
      },
    );

    el._tool = 'pen';
    el._strokes = initialData.strokes;
    el._notes = initialData.notes;

    const root = el.shadowRoot || el;
    const canvas = root.querySelector('canvas') as HTMLCanvasElement;
    const notesLayer = root.querySelector('.notes-layer') as HTMLElement;
    if (!canvas || !notesLayer) return;

    const ctx = canvas.getContext ? canvas.getContext('2d') : null;

    const renderNotes = () => {
      notesLayer.innerHTML = el._notes
        .map(
          (n: WhiteboardNote) => `
        <div 
          class="sticky-note" 
          data-id="${n.id}" 
          style="left: ${n.x}px; top: ${n.y}px; background: ${n.color || '#fef08a'}; color: #000;"
          contenteditable="true"
        >${n.text}</div>
      `,
        )
        .join('');
    };

    const redrawCanvas = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      el._strokes.forEach((stroke: WhiteboardStroke) => {
        if (stroke.points.length < 2) return;
        ctx.beginPath();
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
      });
    };

    renderNotes();
    redrawCanvas();

    let isDrawing = false;
    let currentStroke: WhiteboardStroke | null = null;

    canvas.addEventListener('pointerdown', (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (el._tool === 'pen' || el._tool === 'eraser') {
        isDrawing = true;
        currentStroke = {
          points: [{ x, y }],
          color: el._tool === 'eraser' ? '#fafafa' : '#2563eb',
          width: el._tool === 'eraser' ? 20 : 3,
        };
        el._strokes.push(currentStroke);
        canvas.setPointerCapture(e.pointerId);
      } else if (el._tool === 'note') {
        const newNote: WhiteboardNote = {
          id: `sn-${Date.now()}`,
          x: Math.round(x),
          y: Math.round(y),
          text: 'New Note',
          color: '#fef08a',
        };
        el._notes.push(newNote);
        renderNotes();
        commitPayload(el, { notes: el._notes, strokes: el._strokes }, 'whiteboard-note-add');
      }
    });

    canvas.addEventListener('pointermove', (e: PointerEvent) => {
      if (!isDrawing || !currentStroke) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      currentStroke.points.push({ x, y });
      redrawCanvas();
    });

    canvas.addEventListener('pointerup', () => {
      if (isDrawing) {
        isDrawing = false;
        currentStroke = null;
        commitPayload(el, { strokes: el._strokes, notes: el._notes }, 'whiteboard-draw');
      }
    });

    root.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('tool-btn') && target.getAttribute('data-tool')) {
        el._tool = target.getAttribute('data-tool');
        root
          .querySelectorAll('.tool-btn')
          .forEach((btn: Element) => btn.classList.remove('active'));
        target.classList.add('active');
      } else if (target.classList.contains('clear-btn')) {
        el._strokes = [];
        el._notes = [];
        redrawCanvas();
        renderNotes();
        commitPayload(el, { strokes: [], notes: [] }, 'whiteboard-clear');
      }
    });
  },
});
