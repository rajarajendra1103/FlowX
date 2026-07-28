import { enhanceNativeInput } from '../../enhancer';
import { GLOBAL_THEME } from '../../helper';

export class FlowXFileUpload extends HTMLElement {
  protected nativeInput: HTMLInputElement | null = null;
  protected fileList: File[] = [];
  protected uploadProgresses: Record<string, number> = {};

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  public attachToInput(input: HTMLInputElement): void {
    this.nativeInput = input;

    // Ensure native input stays accessible inside shadow/DOM structure
    input.addEventListener('change', () => {
      if (input.files) {
        this.fileList = Array.from(input.files);
        this.render();
      }
    });

    // Listen to global FlowX core XHR progress events if triggered during fx-post
    document.addEventListener('fx:beforeRequest', (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const xhr = detail?.xhr;
      if (xhr && xhr.upload) {
        xhr.upload.addEventListener('progress', (pe: ProgressEvent) => {
          if (pe.lengthComputable) {
            const percent = Math.round((pe.loaded / pe.total) * 100);
            this.fileList.forEach((file) => {
              this.uploadProgresses[file.name] = percent;
            });
            this.render();
          }
        });
      }
    });

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  protected removeFile(index: number) {
    this.fileList.splice(index, 1);

    if (this.nativeInput) {
      const dt = new DataTransfer();
      this.fileList.forEach((file) => dt.items.add(file));
      this.nativeInput.files = dt.files;
      this.nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
      this.nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
    }

    this.render();
  }

  protected handleDrop(e: DragEvent) {
    e.preventDefault();
    this.removeAttribute('dragging');

    if (e.dataTransfer && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const isMultiple = this.nativeInput?.hasAttribute('multiple');

      if (isMultiple) {
        this.fileList = [...this.fileList, ...droppedFiles];
      } else {
        this.fileList = [droppedFiles[0]];
      }

      if (this.nativeInput) {
        const dt = new DataTransfer();
        this.fileList.forEach((f) => dt.items.add(f));
        this.nativeInput.files = dt.files;
        this.nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
        this.nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
      }

      this.render();
    }
  }

  protected render() {
    if (!this.shadowRoot) return;

    const isDragging = this.hasAttribute('dragging');

    const fileItemsHtml = this.fileList
      .map((file, idx) => {
        const progress = this.uploadProgresses[file.name] ?? 0;
        const sizeMb = (file.size / (1024 * 1024)).toFixed(2);

        return `
        <div class="file-item">
          <div class="file-info">
            <span class="file-icon">📄</span>
            <div class="file-details">
              <span class="file-name">${file.name}</span>
              <span class="file-size">${sizeMb} MB</span>
            </div>
            <button type="button" class="remove-btn" data-index="${idx}" title="Remove file">✕</button>
          </div>
          ${
            progress > 0 && progress < 100
              ? `
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${progress}%"></div>
            </div>
          `
              : ''
          }
        </div>
      `;
      })
      .join('');

    this.shadowRoot.innerHTML = `
      <style>
        ${GLOBAL_THEME}
        :host { display: block; font-family: var(--flowx-font-family); width: 100%; }
        .dropzone {
          border: 2px dashed rgba(255,255,255,0.18);
          border-radius: var(--flowx-radius-lg);
          padding: 24px 16px; text-align: center; background: #0d1117;
          cursor: pointer; transition: border-color 0.2s, background-color 0.2s;
        }
        .dropzone:hover, .dropzone.dragging {
          border-color: var(--flowx-primary);
          background: rgba(0,102,204,0.06);
        }
        .upload-icon { font-size: 28px; margin-bottom: 8px; color: #8b949e; }
        .drop-title { font-size: 14px; font-weight: 600; color: #e6edf3; margin-bottom: 4px; }
        .drop-subtitle { font-size: 12px; color: #6e7681; }
        .file-list { margin-top: 12px; display: flex; flex-direction: column; gap: 8px; }
        .file-item {
          background: #161b22; border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--flowx-radius-md); padding: 10px 12px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .file-info { display: flex; align-items: center; gap: 10px; }
        .file-icon { font-size: 18px; }
        .file-details { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .file-name { font-size: 13px; font-weight: 500; color: #e6edf3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .file-size { font-size: 11px; color: #6e7681; }
        .remove-btn {
          background: transparent; border: none; color: #8b949e;
          cursor: pointer; font-size: 14px; padding: 4px 6px; border-radius: 4px;
        }
        .remove-btn:hover { color: #f85149; background: rgba(248,81,73,0.1); }
        .progress-bar-bg { width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; }
        .progress-bar-fill { height: 100%; background: var(--flowx-primary); transition: width 0.2s; }
      </style>

      <div class="dropzone ${isDragging ? 'dragging' : ''}" id="dropzone" tabindex="0" role="button" aria-label="Upload files">
        <div class="upload-icon">☁️</div>
        <div class="drop-title">Drag & drop files here, or <span style="color:var(--flowx-primary);text-decoration:underline;">browse</span></div>
        <div class="drop-subtitle">Participates directly in native FormData multipart form submissions</div>
      </div>

      ${
        this.fileList.length > 0
          ? `
        <div class="file-list">
          ${fileItemsHtml}
        </div>
      `
          : ''
      }
    `;

    this.setupListeners();
  }

  protected setupListeners() {
    const dropzone = this.shadowRoot?.querySelector('#dropzone');

    dropzone?.addEventListener('click', () => {
      this.nativeInput?.click();
    });

    dropzone?.addEventListener('dragover', (e: Event) => {
      e.preventDefault();
      this.setAttribute('dragging', '');
    });

    dropzone?.addEventListener('dragleave', () => {
      this.removeAttribute('dragging');
    });

    dropzone?.addEventListener('drop', (e: Event) => {
      this.handleDrop(e as DragEvent);
    });

    this.shadowRoot?.querySelectorAll('.remove-btn')?.forEach((btn) => {
      btn.addEventListener('click', (e: Event) => {
        e.stopPropagation();
        const idx = parseInt(
          (e.currentTarget as HTMLElement).getAttribute('data-index') || '0',
          10,
        );
        this.removeFile(idx);
      });
    });
  }
}

if (!customElements.get('flowx-file-upload')) {
  customElements.define('flowx-file-upload', FlowXFileUpload);
}

// Auto-register enhancer rule for input[type="file"] (excluding explicit images)
enhanceNativeInput('input[type="file"]:not([accept*="image"])', (input, wrapper) => {
  const uploader = document.createElement('flowx-file-upload') as FlowXFileUpload;
  wrapper.appendChild(uploader);
  uploader.attachToInput(input);
});
