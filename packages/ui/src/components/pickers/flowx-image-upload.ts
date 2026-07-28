import { enhanceNativeInput } from '../../enhancer';
import { FlowXFileUpload } from './flowx-file-upload';
import { GLOBAL_THEME } from '../../helper';

export class FlowXImageUpload extends FlowXFileUpload {
  private previews: Record<string, string> = {};

  public override attachToInput(input: HTMLInputElement): void {
    super.attachToInput(input);
  }

  protected override render() {
    if (!this.shadowRoot) return;

    // Generate thumbnails for image files
    this.fileList.forEach((file) => {
      if (file.type.startsWith('image/') && !this.previews[file.name]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previews[file.name] = e.target?.result as string;
          this.render();
        };
        reader.readAsDataURL(file);
      }
    });

    const isDragging = this.hasAttribute('dragging');

    const imageItemsHtml = this.fileList
      .map((file, idx) => {
        const previewUrl = this.previews[file.name] || '';
        const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
        const progress = this.uploadProgresses[file.name] ?? 0;

        return `
        <div class="image-card">
          <div class="thumbnail-wrapper">
            ${previewUrl ? `<img src="${previewUrl}" alt="${file.name}" class="thumbnail" />` : '<span class="placeholder-icon">🖼️</span>'}
          </div>
          <div class="image-details">
            <span class="image-name">${file.name}</span>
            <span class="image-size">${sizeMb} MB</span>
          </div>
          <button type="button" class="remove-btn" data-index="${idx}" title="Remove image">✕</button>
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
        .upload-icon { font-size: 32px; margin-bottom: 8px; }
        .drop-title { font-size: 14px; font-weight: 600; color: #e6edf3; margin-bottom: 4px; }
        .drop-subtitle { font-size: 12px; color: #6e7681; }
        .image-grid { margin-top: 14px; display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; }
        .image-card {
          background: #161b22; border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--flowx-radius-md); padding: 8px;
          display: flex; flex-direction: column; align-items: center; position: relative;
        }
        .thumbnail-wrapper {
          width: 100%; aspect-ratio: 1; border-radius: 6px; overflow: hidden;
          background: #0d1117; display: flex; align-items: center; justify-content: center;
          margin-bottom: 6px;
        }
        .thumbnail { width: 100%; height: 100%; object-fit: cover; }
        .placeholder-icon { font-size: 24px; color: #6e7681; }
        .image-details { width: 100%; text-align: center; }
        .image-name { font-size: 11px; font-weight: 500; color: #e6edf3; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .image-size { font-size: 10px; color: #6e7681; }
        .remove-btn {
          position: absolute; top: 4px; right: 4px;
          background: rgba(0,0,0,0.6); border: none; color: #fff;
          width: 20px; height: 20px; border-radius: 50%;
          cursor: pointer; font-size: 11px; display: flex; align-items: center; justify-content: center;
        }
        .remove-btn:hover { background: #f85149; }
        .progress-bar-bg { width: 100%; height: 3px; background: rgba(255,255,255,0.1); margin-top: 4px; border-radius: 2px; overflow: hidden; }
        .progress-bar-fill { height: 100%; background: var(--flowx-primary); }
      </style>

      <div class="dropzone ${isDragging ? 'dragging' : ''}" id="dropzone" tabindex="0" role="button" aria-label="Upload images">
        <div class="upload-icon">🖼️</div>
        <div class="drop-title">Drop images here, or <span style="color:var(--flowx-primary);text-decoration:underline;">browse</span></div>
        <div class="drop-subtitle">Supports instant thumbnail previews & progressive enhancement</div>
      </div>

      ${
        this.fileList.length > 0
          ? `
        <div class="image-grid">
          ${imageItemsHtml}
        </div>
      `
          : ''
      }
    `;

    this.setupListeners();
  }
}

if (!customElements.get('flowx-image-upload')) {
  customElements.define('flowx-image-upload', FlowXImageUpload);
}

// Auto-register enhancer rule for input[type="file"][accept*="image"]
enhanceNativeInput('input[type="file"][accept*="image"]', (input, wrapper) => {
  const uploader = document.createElement('flowx-image-upload') as FlowXImageUpload;
  wrapper.appendChild(uploader);
  uploader.attachToInput(input);
});
