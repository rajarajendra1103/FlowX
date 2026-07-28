import { defineFlowXElement, parseJsonIsland, commitPayload } from '../helper';

export interface KanbanColumn {
  id: string;
  title: string;
}

export interface KanbanCard {
  id: string;
  columnId: string;
  title: string;
  description?: string;
  tag?: string;
  tagColor?: string;
}

export const FlowXKanban = defineFlowXElement('flowx-kanban', {
  observedAttributes: ['fx-post', 'commit-url'],
  style: `
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--flowx-font-sans);
    }
    .kanban-board {
      display: flex;
      gap: var(--flowx-space-4, 16px);
      overflow-x: auto;
      padding: var(--flowx-space-4, 16px);
      background-color: var(--flowx-bg-base, #f8fafc);
      border-radius: var(--flowx-radius-lg, 16px);
      box-sizing: border-box;
      min-height: 400px;
    }
    .column {
      flex: 0 0 280px;
      background-color: var(--flowx-bg-surface, #ffffff);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-md, 8px);
      display: flex;
      flex-direction: column;
      box-shadow: var(--flowx-shadow-sm);
    }
    .column-header {
      padding: var(--flowx-space-3, 12px) var(--flowx-space-4, 16px);
      font-weight: 700;
      font-size: 0.95rem;
      border-bottom: 1px solid var(--flowx-border-color, #e2e8f0);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--flowx-bg-surface-raised);
    }
    .card-count {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: var(--flowx-radius-round);
      background: var(--flowx-bg-hover);
      color: var(--flowx-color-text-muted);
    }
    .cards-list {
      padding: var(--flowx-space-3, 12px);
      flex: 1 1 0%;
      display: flex;
      flex-direction: column;
      gap: var(--flowx-space-3, 12px);
      overflow-y: auto;
    }
    .kanban-card-wrapper {
      position: relative;
      cursor: grab;
      user-select: none;
      outline: none;
    }
    .kanban-card-wrapper:focus-visible flowx-card {
      box-shadow: 0 0 0 3px var(--flowx-color-primary, #2563eb);
    }
    .kanban-card-wrapper.picked-up flowx-card {
      opacity: 0.8;
      border: 2px dashed var(--flowx-color-primary, #2563eb);
      transform: scale(1.02);
    }
    .card-tag {
      display: inline-block;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 2px 6px;
      border-radius: 4px;
      margin-top: 8px;
    }
    .live-region {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `,
  template: (el) => {
    const columns: KanbanColumn[] = el._columns || [];
    const cards: KanbanCard[] = el._cards || [];

    const columnsHtml = columns
      .map((col) => {
        const colCards = cards.filter((c) => c.columnId === col.id);
        const cardsHtml = colCards
          .map(
            (c) => `
        <div 
          class="kanban-card-wrapper ${el._pickedCardId === c.id ? 'picked-up' : ''}" 
          data-id="${c.id}" 
          tabindex="0"
          role="option"
          aria-grabbed="${el._pickedCardId === c.id ? 'true' : 'false'}"
          aria-label="${c.title}. Column ${col.title}."
        >
          <flowx-card>
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${c.title}</div>
            ${c.description ? `<div style="font-size: 12px; color: var(--flowx-color-text-muted);">${c.description}</div>` : ''}
            ${c.tag ? `<span class="card-tag" style="background: ${c.tagColor || 'var(--flowx-color-primary)'}; color: #fff;">${c.tag}</span>` : ''}
          </flowx-card>
        </div>
      `,
          )
          .join('');

        return `
        <div class="column" data-col-id="${col.id}" role="listbox" aria-label="${col.title}">
          <div class="column-header">
            <span>${col.title}</span>
            <span class="card-count">${colCards.length}</span>
          </div>
          <div class="cards-list">
            ${cardsHtml}
          </div>
        </div>
      `;
      })
      .join('');

    return `
      <div class="kanban-board">
        ${columnsHtml}
      </div>
      <div class="live-region" aria-live="assertive">${el._a11yStatus || ''}</div>
    `;
  },
  setup: (el) => {
    const initialData = parseJsonIsland<{ columns: KanbanColumn[]; cards: KanbanCard[] }>(el, {
      columns: [
        { id: 'col-todo', title: 'To Do' },
        { id: 'col-in-progress', title: 'In Progress' },
        { id: 'col-done', title: 'Done' },
      ],
      cards: [
        {
          id: 'card-1',
          columnId: 'col-todo',
          title: 'Design System Audit',
          description: 'Review CSS custom property tokens',
          tag: 'UI',
          tagColor: '#2563eb',
        },
        {
          id: 'card-2',
          columnId: 'col-todo',
          title: 'Setup CI Pipelines',
          description: 'Configure GitHub Actions test runners',
          tag: 'DevOps',
          tagColor: '#f59e0b',
        },
        {
          id: 'card-3',
          columnId: 'col-in-progress',
          title: 'Implement Kanban Board',
          description: 'Pointer events & keyboard accessibility',
          tag: 'Core',
          tagColor: '#10b981',
        },
      ],
    });

    el._columns = initialData.columns;
    el._cards = initialData.cards;
    el._pickedCardId = null;
    el.render();

    const root = el.shadowRoot || el;

    // Pointer Events Drag & Drop implementation
    let pointerDraggedCardId: string | null = null;

    root.addEventListener('pointerdown', (e: Event) => {
      const wrapper = (e.target as HTMLElement).closest('.kanban-card-wrapper') as HTMLElement;
      if (wrapper) {
        pointerDraggedCardId = wrapper.getAttribute('data-id');
        wrapper.setPointerCapture((e as PointerEvent).pointerId);
      }
    });

    root.addEventListener('pointerup', (e: Event) => {
      if (!pointerDraggedCardId) return;
      const pe = e as PointerEvent;
      const targetCol = document
        .elementFromPoint(pe.clientX, pe.clientY)
        ?.closest('.column') as HTMLElement;
      if (targetCol) {
        const toColumn = targetCol.getAttribute('data-col-id');
        if (toColumn) {
          const card = el._cards.find((c: KanbanCard) => c.id === pointerDraggedCardId);
          if (card && card.columnId !== toColumn) {
            const fromColumn = card.columnId;
            card.columnId = toColumn;
            const newIndex =
              el._cards.filter((c: KanbanCard) => c.columnId === toColumn).length - 1;

            commitPayload(el, { cardId: card.id, fromColumn, toColumn, newIndex }, 'card-move');
            el.render();
          }
        }
      }
      pointerDraggedCardId = null;
    });

    // Keyboard-only reordering accessibility
    root.addEventListener('keydown', (e: Event) => {
      const ke = e as KeyboardEvent;
      const cardWrapper = (ke.target as HTMLElement).closest('.kanban-card-wrapper') as HTMLElement;
      if (!cardWrapper) return;

      const cardId = cardWrapper.getAttribute('data-id');
      if (!cardId) return;

      const card = el._cards.find((c: KanbanCard) => c.id === cardId);
      if (!card) return;

      // Space / Enter toggles pick up / drop
      if (ke.key === ' ' || ke.key === 'Enter') {
        ke.preventDefault();
        if (el._pickedCardId === cardId) {
          // Drop card
          const colCards = el._cards.filter((c: KanbanCard) => c.columnId === card.columnId);
          const newIndex = colCards.indexOf(card);
          commitPayload(
            el,
            {
              cardId: card.id,
              fromColumn: card._origCol || card.columnId,
              toColumn: card.columnId,
              newIndex,
            },
            'card-move',
          );
          el._pickedCardId = null;
          el._a11yStatus = `Dropped card ${card.title} into column ${card.columnId}`;
          el.render();
        } else {
          // Pick up card
          card._origCol = card.columnId;
          el._pickedCardId = cardId;
          el._a11yStatus = `Picked up card ${card.title}. Use arrow keys to move, Enter to drop, Esc to cancel.`;
          el.render();
        }
      } else if (ke.key === 'Escape' && el._pickedCardId === cardId) {
        // Cancel move
        if (card._origCol) card.columnId = card._origCol;
        el._pickedCardId = null;
        el._a11yStatus = `Cancelled card movement for ${card.title}`;
        el.render();
      } else if (el._pickedCardId === cardId) {
        // Arrow keys while picked up
        const cols: KanbanColumn[] = el._columns;
        const currentColIdx = cols.findIndex((col) => col.id === card.columnId);

        if (ke.key === 'ArrowRight' && currentColIdx < cols.length - 1) {
          ke.preventDefault();
          const targetCol = cols[currentColIdx + 1];
          card.columnId = targetCol.id;
          el._a11yStatus = `Moved ${card.title} to column ${targetCol.title}`;
          el.render();
        } else if (ke.key === 'ArrowLeft' && currentColIdx > 0) {
          ke.preventDefault();
          const targetCol = cols[currentColIdx - 1];
          card.columnId = targetCol.id;
          el._a11yStatus = `Moved ${card.title} to column ${targetCol.title}`;
          el.render();
        }
      }
    });
  },
});
