import { defineFlowXElement, parseJsonIsland, commitPayload } from '../helper';

export interface NoteBlock {
  id: string;
  type: 'h1' | 'h2' | 'p' | 'bullet';
  content: string;
}

export const FlowXNotes = defineFlowXElement('flowx-notes', {
  observedAttributes: ['fx-post', 'commit-url', 'debounce-ms'],
  style: `
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--flowx-font-sans);
    }
    .notes-container {
      background-color: var(--flowx-bg-surface, #ffffff);
      color: var(--flowx-color-text, #0f172a);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-lg, 16px);
      box-shadow: var(--flowx-shadow-md);
      padding: var(--flowx-space-6, 24px);
      box-sizing: border-box;
      min-height: 350px;
    }
    .note-block {
      outline: none;
      margin-bottom: var(--flowx-space-3, 12px);
      padding: 4px 8px;
      border-radius: var(--flowx-radius-sm);
      transition: background-color var(--flowx-transition-fast);
    }
    .note-block:hover {
      background-color: var(--flowx-bg-hover, rgba(0,0,0,0.02));
    }
    .note-block:focus-visible {
      background-color: var(--flowx-bg-hover, rgba(0,0,0,0.05));
    }
    .block-h1 { font-size: 1.6rem; font-weight: 800; }
    .block-h2 { font-size: 1.25rem; font-weight: 700; }
    .block-p { font-size: 0.95rem; line-height: 1.6; }
    .block-bullet { font-size: 0.95rem; display: list-item; margin-left: 20px; }
    .status-bar {
      margin-top: 16px;
      font-size: 11px;
      color: var(--flowx-color-text-muted);
      display: flex;
      justify-content: space-between;
    }
  `,
  template: (el) => {
    const blocks: NoteBlock[] = el._blocks || [];

    const blocksHtml = blocks
      .map(
        (b) => `
      <div 
        class="note-block block-${b.type}" 
        data-id="${b.id}" 
        contenteditable="true" 
        spellcheck="false"
      >${b.content}</div>
    `,
      )
      .join('');

    return `
      <div class="notes-container">
        <div class="blocks-wrapper">
          ${blocksHtml}
        </div>
        <div class="status-bar">
          <span>Block-Based Note Editor</span>
          <span class="save-indicator">${el._saveStatus || 'Saved'}</span>
        </div>
      </div>
    `;
  },
  setup: (el) => {
    el._blocks = parseJsonIsland<NoteBlock[]>(el, [
      { id: 'b1', type: 'h1', content: 'Project Architecture Notes' },
      {
        id: 'b2',
        type: 'p',
        content:
          'This block-based editor serializes state to JSON and debounces autosaves via fx-post.',
      },
      { id: 'b3', type: 'bullet', content: 'Zero-JS HTML rendering fallback' },
      { id: 'b4', type: 'bullet', content: 'Debounced background autosave' },
    ]);
    el._saveStatus = 'Saved';
    el.render();

    const root = el.shadowRoot || el;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const scheduleAutosave = () => {
      el._saveStatus = 'Saving...';
      const indicator = root.querySelector('.save-indicator');
      if (indicator) indicator.textContent = 'Saving...';

      const debounceMs = parseInt(el.getAttribute('debounce-ms') || '800', 10);
      if (debounceTimer) clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        // Collect current block text contents
        const blockEls = Array.from(root.querySelectorAll('.note-block')) as Element[];
        const updatedBlocks: NoteBlock[] = blockEls.map((bEl: Element) => {
          const id = bEl.getAttribute('data-id') || `b-${Date.now()}`;
          const typeClass = Array.from(bEl.classList).find((c: string) => c.startsWith('block-'));
          const type = (typeClass ? typeClass.replace('block-', '') : 'p') as NoteBlock['type'];
          return { id, type, content: bEl.textContent || '' };
        });

        el._blocks = updatedBlocks;
        commitPayload(el, { blocks: updatedBlocks }, 'notes-autosave');
        el._saveStatus = 'All changes saved';
        if (indicator) indicator.textContent = 'All changes saved';
      }, debounceMs);
    };

    root.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('note-block')) {
        scheduleAutosave();
      }
    });
  },
});
