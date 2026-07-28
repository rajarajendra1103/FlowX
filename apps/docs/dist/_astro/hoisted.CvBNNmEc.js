function y(e,t,o={}){const r=o.placement||"bottom",s=o.align||"center",i=o.offset!==void 0?o.offset:8,a=()=>{if(!e||!t)return;const n=e.getBoundingClientRect(),l=t.style.display,d=t.style.visibility;l==="none"&&(t.style.display="block",t.style.visibility="hidden"),t.style.position="fixed";const c=t.getBoundingClientRect();t.style.display=l,t.style.visibility=d,t.style.position="fixed";let u=r;const p=window.innerWidth,h=window.innerHeight;r==="bottom"&&n.bottom+c.height+i>h?n.top-c.height-i>=0&&(u="top"):r==="top"&&n.top-c.height-i<0?n.bottom+c.height+i<=h&&(u="bottom"):r==="right"&&n.right+c.width+i>p?n.left-c.width-i>=0&&(u="left"):r==="left"&&n.left-c.width-i<0&&n.right+c.width+i<=p&&(u="right");let f=0,m=0;u==="bottom"?(f=n.bottom+i,s==="start"?m=n.left:s==="end"?m=n.right-c.width:m=n.left+(n.width-c.width)/2):u==="top"?(f=n.top-c.height-i,s==="start"?m=n.left:s==="end"?m=n.right-c.width:m=n.left+(n.width-c.width)/2):u==="right"?(m=n.right+i,s==="start"?f=n.top:s==="end"?f=n.bottom-c.height:f=n.top+(n.height-c.height)/2):u==="left"&&(m=n.left-c.width-i,s==="start"?f=n.top:s==="end"?f=n.bottom-c.height:f=n.top+(n.height-c.height)/2),m<0&&(m=0),m+c.width>p&&(m=p-c.width),f<0&&(f=0),f+c.height>h&&(f=h-c.height),t.style.top=`${f}px`,t.style.left=`${m}px`};return window.addEventListener("scroll",a,{passive:!0}),window.addEventListener("resize",a,{passive:!0}),a(),{update:a,cleanup:()=>{window.removeEventListener("scroll",a),window.removeEventListener("resize",a)}}}function _(e){const t=document.activeElement,o=()=>{const i=["a[href]","area[href]","input:not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","iframe","object","embed",'[tabindex]:not([tabindex="-1"])',"[contenteditable]"],a=[],n=l=>{l.shadowRoot&&Array.from(l.shadowRoot.querySelectorAll("*")).forEach(n),l.matches&&i.some(d=>l.matches(d))&&a.push(l),Array.from(l.children).forEach(n)};return n(e),a},r=i=>{if(i.key!=="Tab")return;const a=o();if(a.length===0){i.preventDefault();return}let n=document.activeElement;for(;n&&n.shadowRoot&&n.shadowRoot.activeElement;)n=n.shadowRoot.activeElement;const l=a[0],d=a[a.length-1];i.shiftKey?(n===l||!a.includes(n))&&(d.focus(),i.preventDefault()):(n===d||!a.includes(n))&&(l.focus(),i.preventDefault())};e.addEventListener("keydown",r);const s=o();return s.length>0&&s[0].focus(),{cleanup:()=>{e.removeEventListener("keydown",r),t&&typeof t.focus=="function"&&t.focus()}}}function k(e,t){const o=s=>{s.composedPath().includes(e)||t()},r=s=>{s.key==="Escape"&&t()};return document.addEventListener("click",o,!0),document.addEventListener("keydown",r,!0),{cleanup:()=>{document.removeEventListener("click",o,!0),document.removeEventListener("keydown",r,!0)}}}function $(e,t){const o=()=>{const a=e.shadowRoot||e,n=Array.from(a.querySelectorAll(t)),l=Array.from(e.querySelectorAll(t));return Array.from(new Set([...n,...l]))},r=(a,n)=>{a.forEach(l=>{l===n?l.setAttribute("tabindex","0"):l.setAttribute("tabindex","-1")})},s=a=>{const n=o().filter(p=>!p.hasAttribute("disabled")&&p.getAttribute("aria-disabled")!=="true");if(n.length===0)return;let l=document.activeElement;for(;l&&l.shadowRoot&&l.shadowRoot.activeElement;)l=l.shadowRoot.activeElement;let d=n.indexOf(l);if(d===-1){const p=n.find(h=>h.getAttribute("tabindex")==="0");d=p?n.indexOf(p):0}let c=d;switch(a.key){case"ArrowRight":case"ArrowDown":c=(d+1)%n.length,a.preventDefault();break;case"ArrowLeft":case"ArrowUp":c=(d-1+n.length)%n.length,a.preventDefault();break;case"Home":c=0,a.preventDefault();break;case"End":c=n.length-1,a.preventDefault();break;default:return}const u=n[c];u&&(r(o(),u),u.focus())},i=()=>{const a=o();a.length>0&&(a.some(l=>l.getAttribute("tabindex")==="0")||r(a,a[0])),e.addEventListener("keydown",s)};return i(),{setup:i,update:()=>{const a=o(),n=a.find(l=>l.getAttribute("tabindex")==="0")||a[0];n&&r(a,n)},cleanup:()=>{e.removeEventListener("keydown",s)}}}const g=`
  :host {
    /* Background Tokens */
    --flowx-bg-base: var(--fx-bg-base, #f8fafc);
    --flowx-bg-surface: var(--fx-bg-surface, #ffffff);
    --flowx-bg-surface-raised: var(--fx-bg-surface-raised, #ffffff);
    --flowx-bg-hover: var(--fx-bg-hover, rgba(0, 0, 0, 0.05));
    --flowx-bg-active: var(--fx-bg-active, rgba(0, 0, 0, 0.1));

    /* Color Palette */
    --flowx-primary: var(--flowx-color-primary, var(--fx-primary, #2563eb));
    --flowx-primary-hover: var(--flowx-color-primary-hover, var(--fx-primary-hover, #1d4ed8));
    --flowx-primary-text: var(--flowx-color-primary-text, var(--fx-primary-text, #ffffff));
    
    --flowx-secondary: var(--flowx-color-secondary, var(--fx-secondary, #475569));
    --flowx-secondary-hover: var(--flowx-color-secondary-hover, var(--fx-secondary-hover, #334155));
    --flowx-secondary-text: var(--flowx-color-secondary-text, var(--fx-secondary-text, #ffffff));
    
    --flowx-ghost: var(--flowx-color-ghost, var(--fx-ghost, transparent));
    --flowx-ghost-hover: var(--flowx-color-ghost-hover, var(--fx-ghost-hover, rgba(0, 0, 0, 0.05)));
    --flowx-ghost-text: var(--flowx-color-ghost-text, var(--fx-ghost-text, #0f172a));
    
    --flowx-danger: var(--flowx-color-danger, var(--fx-danger, #ef4444));
    --flowx-danger-hover: var(--flowx-color-danger-hover, var(--fx-danger-hover, #dc2626));
    --flowx-danger-text: var(--flowx-color-danger-text, var(--fx-danger-text, #ffffff));

    --flowx-color-text: var(--fx-color-text, #0f172a);
    --flowx-color-text-muted: var(--fx-color-text-muted, #64748b);
    --flowx-color-text-subtle: var(--fx-color-text-subtle, #94a3b8);
    
    /* Status Colors */
    --flowx-info: var(--flowx-color-info, var(--fx-info, #06b6d4));
    --flowx-success: var(--flowx-color-success, var(--fx-success, #10b981));
    --flowx-warning: var(--flowx-color-warning, var(--fx-warning, #f59e0b));
    --flowx-error: var(--flowx-color-error, var(--fx-error, #ef4444));
    --flowx-neutral: var(--flowx-color-neutral, var(--fx-neutral, #94a3b8));

    /* Borders & Shadows */
    --flowx-border-color: var(--fx-border-color, #e2e8f0);
    --flowx-border-subtle: var(--fx-border-subtle, #f1f5f9);
    --flowx-shadow-color: var(--fx-shadow-color, rgba(0, 0, 0, 0.08));
    --flowx-shadow-sm: var(--fx-shadow-sm, 0 1px 2px 0 var(--flowx-shadow-color));
    --flowx-shadow-md: var(--fx-shadow-md, 0 4px 6px -1px var(--flowx-shadow-color));
    --flowx-shadow-lg: var(--fx-shadow-lg, 0 10px 15px -3px var(--flowx-shadow-color));
    
    /* Canonical Spacings (1..8) */
    --flowx-space-1: var(--fx-space-1, 4px);
    --flowx-space-2: var(--fx-space-2, 8px);
    --flowx-space-3: var(--fx-space-3, 12px);
    --flowx-space-4: var(--fx-space-4, 16px);
    --flowx-space-5: var(--fx-space-5, 20px);
    --flowx-space-6: var(--fx-space-6, 24px);
    --flowx-space-7: var(--fx-space-7, 32px);
    --flowx-space-8: var(--fx-space-8, 40px);

    /* Legacy Spacings Aliases */
    --flowx-spacing-xs: var(--flowx-space-1);
    --flowx-spacing-sm: var(--flowx-space-2);
    --flowx-spacing-md: var(--flowx-space-4);
    --flowx-spacing-lg: var(--flowx-space-6);
    
    /* Border Radii */
    --flowx-radius-sm: var(--fx-radius-sm, 4px);
    --flowx-radius-md: var(--fx-radius-md, 8px);
    --flowx-radius-lg: var(--fx-radius-lg, 16px);
    --flowx-radius-round: var(--fx-radius-round, 9999px);
    
    /* Typography */
    --flowx-font-sans: var(--fx-font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif);
    --flowx-font-mono: var(--fx-font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    --flowx-font-family: var(--flowx-font-sans);
    --flowx-font-size-sm: var(--fx-font-size-sm, 12px);
    --flowx-font-size-md: var(--fx-font-size-md, 14px);
    --flowx-font-size-lg: var(--fx-font-size-lg, 16px);
    
    /* Animation Timing */
    --flowx-transition: var(--fx-transition, 0.2s ease-in-out);
    
    /* Focus Ring */
    --flowx-focus-ring: var(--fx-focus-ring, 0 0 0 3px rgba(37, 99, 235, 0.4));
    
    box-sizing: border-box;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  /* Visible Focus Ring Outline */
  :focus-visible {
    outline: 2px solid var(--flowx-color-primary, var(--flowx-primary));
    outline-offset: 2px;
  }
  
  /* Prefers Reduced Motion Constraints */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;function b(e,t){class o extends HTMLElement{static get observedAttributes(){return t.observedAttributes||[]}_initialized=!1;constructor(){super(),t.shadow!==!1&&this.attachShadow({mode:"open"})}connectedCallback(){this._initialized||(this.render(),t.setup&&t.setup(this),this._initialized=!0)}attributeChangedCallback(i,a,n){if(a===n)return;const l=i.replace(/-([a-z])/g,c=>c[1].toUpperCase());let d=n;n===""&&(d=!0),n===null&&(d=!1),this[l]!==d&&(this[l]=d),this._initialized&&this.render()}render(){const i=`<style>${g}${t.style||""}</style>`;let a="";typeof t.template=="function"?a=t.template(this):typeof t.template=="string"&&(a=t.template);const n=`${i}${a}`;this.shadowRoot?this.shadowRoot.innerHTML=n:this.innerHTML=n}}const r=o.prototype;return t.observedAttributes&&t.observedAttributes.forEach(s=>{const i=s.replace(/-([a-z])/g,a=>a[1].toUpperCase());Object.getOwnPropertyDescriptor(r,i)||Object.defineProperty(r,i,{get(){const a=this.getAttribute(s);return a===""?!0:a===null?!1:a},set(a){a===null||a===!1?this.hasAttribute(s)&&this.removeAttribute(s):a===!0?this.getAttribute(s)!==""&&this.setAttribute(s,""):this.getAttribute(s)!==String(a)&&this.setAttribute(s,String(a))},configurable:!0})}),customElements.get(e)||customElements.define(e,o),o}b("flowx-button",{observedAttributes:["variant","size","disabled","loading"],style:`
    :host {
      display: inline-block;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--flowx-font-family);
      font-weight: 600;
      border-radius: var(--flowx-radius-md);
      border: 1px solid transparent;
      cursor: pointer;
      transition: background-color var(--flowx-transition), border-color var(--flowx-transition), transform 0.1s ease;
      user-select: none;
      vertical-align: middle;
      position: relative;
      text-decoration: none;
      gap: var(--flowx-spacing-xs);
    }
    .btn:active:not(:disabled) {
      transform: scale(0.98);
    }
    
    /* Sizes */
    .btn.sm {
      padding: 6px 12px;
      font-size: var(--flowx-font-size-sm);
    }
    .btn.md {
      padding: 8px 16px;
      font-size: var(--flowx-font-size-md);
    }
    .btn.lg {
      padding: 12px 24px;
      font-size: var(--flowx-font-size-lg);
    }
    
    /* Variants */
    .btn.primary {
      background-color: var(--flowx-primary);
      color: var(--flowx-primary-text);
    }
    .btn.primary:hover:not(:disabled) {
      background-color: var(--flowx-primary-hover);
    }
    
    .btn.secondary {
      background-color: var(--flowx-secondary);
      color: var(--flowx-secondary-text);
    }
    .btn.secondary:hover:not(:disabled) {
      background-color: var(--flowx-secondary-hover);
    }
    
    .btn.ghost {
      background-color: var(--flowx-ghost);
      color: var(--flowx-ghost-text);
      border: 1px solid rgba(240, 246, 252, 0.15);
    }
    .btn.ghost:hover:not(:disabled) {
      background-color: var(--flowx-ghost-hover);
    }
    
    .btn.danger {
      background-color: var(--flowx-danger);
      color: var(--flowx-danger-text);
    }
    .btn.danger:hover:not(:disabled) {
      background-color: var(--flowx-danger-hover);
    }
    
    /* Disabled & Loading */
    .btn:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }
    
    .spinner {
      width: 12px;
      height: 12px;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.75s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `,template:e=>{const t=e.getAttribute("variant")||"primary",o=e.getAttribute("size")||"md",r=e.hasAttribute("disabled"),s=e.hasAttribute("loading");return`
      <button 
        class="btn ${t} ${o} ${s?"loading":""}"
        ${r||s?"disabled":""}
        aria-disabled="${r||s?"true":"false"}"
        aria-busy="${s?"true":"false"}"
      >
        ${s?'<span class="spinner"></span>':""}
        <span class="btn-text"><slot></slot></span>
      </button>
    `}});b("flowx-icon-button",{observedAttributes:["variant","size","disabled","loading","round","aria-label"],style:`
    :host {
      display: inline-block;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--flowx-font-family);
      cursor: pointer;
      transition: background-color var(--flowx-transition), border-color var(--flowx-transition), transform 0.1s ease;
      user-select: none;
      vertical-align: middle;
      position: relative;
      border: 1px solid transparent;
    }
    .btn:active:not(:disabled) {
      transform: scale(0.95);
    }
    
    /* Shape */
    .btn.square {
      border-radius: var(--flowx-radius-md);
    }
    .btn.circle {
      border-radius: var(--flowx-radius-round);
    }
    
    /* Sizes */
    .btn.sm {
      width: 28px;
      height: 28px;
      font-size: 14px;
    }
    .btn.md {
      width: 36px;
      height: 36px;
      font-size: 18px;
    }
    .btn.lg {
      width: 44px;
      height: 44px;
      font-size: 22px;
    }
    
    /* Variants */
    .btn.primary {
      background-color: var(--flowx-primary);
      color: var(--flowx-primary-text);
    }
    .btn.primary:hover:not(:disabled) {
      background-color: var(--flowx-primary-hover);
    }
    
    .btn.secondary {
      background-color: var(--flowx-secondary);
      color: var(--flowx-secondary-text);
    }
    .btn.secondary:hover:not(:disabled) {
      background-color: var(--flowx-secondary-hover);
    }
    
    .btn.ghost {
      background-color: var(--flowx-ghost);
      color: var(--flowx-ghost-text);
      border: 1px solid rgba(240, 246, 252, 0.15);
    }
    .btn.ghost:hover:not(:disabled) {
      background-color: var(--flowx-ghost-hover);
    }
    
    .btn.danger {
      background-color: var(--flowx-danger);
      color: var(--flowx-danger-text);
    }
    .btn.danger:hover:not(:disabled) {
      background-color: var(--flowx-danger-hover);
    }
    
    /* Disabled & Loading */
    .btn:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }
    
    .spinner {
      width: 14px;
      height: 14px;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.75s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `,template:e=>{const t=e.getAttribute("variant")||"primary",o=e.getAttribute("size")||"md",r=e.hasAttribute("disabled"),s=e.hasAttribute("loading"),i=e.hasAttribute("round"),a=e.getAttribute("aria-label")||"icon button";return`
      <button 
        class="btn ${t} ${o} ${i?"circle":"square"} ${s?"loading":""}"
        ${r||s?"disabled":""}
        aria-label="${a}"
        aria-disabled="${r||s?"true":"false"}"
        aria-busy="${s?"true":"false"}"
      >
        ${s?'<span class="spinner"></span>':"<slot></slot>"}
      </button>
    `}});b("flowx-link",{observedAttributes:["href","target","download"],style:`
    :host {
      display: inline;
    }
    .link {
      color: var(--flowx-primary);
      text-decoration: underline;
      font-family: var(--flowx-font-family);
      font-size: inherit;
      transition: color var(--flowx-transition);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }
    .link:hover {
      color: var(--flowx-primary-hover);
    }
    .external-icon {
      font-size: 0.9em;
      opacity: 0.8;
      display: inline-block;
      line-height: 1;
    }
  `,template:e=>{const t=e.getAttribute("href")||"#";let o=e.getAttribute("target")||"";const r=e.getAttribute("download");let s=!1;(t.startsWith("http://")||t.startsWith("https://"))&&(typeof window<"u"?new URL(t).hostname!==window.location.hostname&&(s=!0):s=!0);const i=s?'rel="noopener noreferrer"':"";s&&!o&&(o="_blank");const a=o?`target="${o}"`:"",n=r!==null?`download="${r}"`:"";return`
      <a 
        class="link"
        href="${t}"
        ${a}
        ${i}
        ${n}
      >
        <slot></slot>
        ${s?'<span class="external-icon" aria-hidden="true">↗</span>':""}
      </a>
    `}});b("flowx-badge",{observedAttributes:["variant","size"],style:`
    :host {
      display: inline-block;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--flowx-font-family);
      font-weight: 700;
      line-height: 1;
      border-radius: var(--flowx-radius-round);
      text-transform: uppercase;
    }
    
    /* Sizes */
    .badge.sm {
      padding: 3px 6px;
      font-size: 9px;
    }
    .badge.md {
      padding: 4px 8px;
      font-size: 11px;
    }
    
    /* Variants */
    .badge.neutral {
      background-color: var(--flowx-neutral);
      color: #475569;
    }
    .badge.info {
      background-color: rgba(23, 162, 184, 0.15);
      color: var(--flowx-info);
      border: 1px solid rgba(23, 162, 184, 0.2);
    }
    .badge.success {
      background-color: rgba(40, 167, 69, 0.15);
      color: var(--flowx-success);
      border: 1px solid rgba(40, 167, 69, 0.2);
    }
    .badge.warning {
      background-color: rgba(255, 193, 7, 0.15);
      color: #b28600;
      border: 1px solid rgba(255, 193, 7, 0.2);
    }
    .badge.error {
      background-color: rgba(220, 53, 69, 0.15);
      color: var(--flowx-error);
      border: 1px solid rgba(220, 53, 69, 0.2);
    }
  `,template:e=>{const t=e.getAttribute("variant")||"neutral",o=e.getAttribute("size")||"md";return`
      <span class="badge ${t} ${o}">
        <slot></slot>
      </span>
    `}});b("flowx-avatar",{observedAttributes:["src","alt","name","img-failed"],style:`
    :host {
      display: inline-block;
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }
    .avatar-container {
      width: 100%;
      height: 100%;
      border-radius: var(--flowx-radius-round);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--flowx-neutral);
      color: #475569;
      font-family: var(--flowx-font-family);
      font-size: 14px;
      font-weight: 700;
      border: 1px solid rgba(240, 246, 252, 0.1);
    }
    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .avatar-fallback {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      text-transform: uppercase;
    }
  `,setup:e=>{const t=()=>{const o=e.shadowRoot?.querySelector(".avatar-img");o&&o.addEventListener("error",()=>{e.setAttribute("img-failed","")})};t(),e.addEventListener("load",t)},template:e=>{const t=e.getAttribute("src"),o=e.getAttribute("alt")||"",r=e.getAttribute("name")||"",s=e.hasAttribute("img-failed");let i="";return r&&(i=r.trim().split(/\s+/).map(n=>n[0]).slice(0,2).join("").toUpperCase()),`<div class="avatar-container">${t&&!s?`<img class="avatar-img" src="${t}" alt="${o}" />`:`<div class="avatar-fallback" aria-label="${r||o}">${i||"?"}</div>`}</div>`}});b("flowx-card",{style:`
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
  `,template:`
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  `});b("flowx-divider",{observedAttributes:["orientation"],style:`
    :host {
      display: block;
    }
    .divider {
      background-color: rgba(240, 246, 252, 0.15);
      border: none;
      margin: 0;
      padding: 0;
    }
    .divider.horizontal {
      height: 1px;
      width: 100%;
      margin: var(--flowx-spacing-md) 0;
    }
    .divider.vertical {
      width: 1px;
      height: 100%;
      margin: 0 var(--flowx-spacing-md);
      display: inline-block;
      align-self: stretch;
    }
  `,template:e=>{const t=e.getAttribute("orientation")||"horizontal";return`
      <hr 
        class="divider ${t}" 
        role="separator" 
        aria-orientation="${t}"
      />
    `}});b("flowx-chip",{observedAttributes:["dismissible"],style:`
    :host {
      display: inline-block;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-sm);
      font-weight: 500;
      background-color: var(--flowx-neutral);
      color: #475569;
      padding: 4px 10px;
      border-radius: var(--flowx-radius-round);
      gap: 6px;
      line-height: 1.2;
      border: 1px solid rgba(240, 246, 252, 0.1);
    }
    .close-btn {
      background: transparent;
      border: none;
      color: inherit;
      cursor: pointer;
      font-size: 14px;
      line-height: 1;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--flowx-radius-round);
      width: 14px;
      height: 14px;
      transition: background-color var(--flowx-transition);
    }
    .close-btn:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }
    .close-btn:focus-visible {
      outline: 1px solid var(--flowx-primary);
    }
  `,setup:e=>{(()=>{const o=e.shadowRoot?.querySelector(".close-btn");if(o){const r=s=>{s.stopPropagation();const i=new CustomEvent("close",{bubbles:!0,composed:!0,cancelable:!0});e.dispatchEvent(i)&&e.remove()};o.addEventListener("click",r),o.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),r(s))})}})()},template:e=>`
      <span class="chip" role="status">
        <span class="chip-text"><slot></slot></span>
        ${e.hasAttribute("dismissible")?`
          <button 
            type="button" 
            class="close-btn" 
            aria-label="Dismiss tag"
          >
            ×
          </button>
        `:""}
      </span>
    `});b("flowx-alert",{observedAttributes:["variant","dismissible"],style:`
    :host {
      display: block;
      margin-bottom: var(--flowx-spacing-sm);
    }
    .alert {
      display: flex;
      align-items: flex-start;
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      padding: var(--flowx-spacing-md);
      border-radius: var(--flowx-radius-md);
      border: 1px solid transparent;
      gap: var(--flowx-spacing-sm);
      line-height: 1.4;
      position: relative;
    }
    
    /* Variants */
    .alert.info {
      background-color: rgba(23, 162, 184, 0.12);
      color: var(--flowx-info);
      border-color: rgba(23, 162, 184, 0.2);
    }
    .alert.success {
      background-color: rgba(40, 167, 69, 0.12);
      color: var(--flowx-success);
      border-color: rgba(40, 167, 69, 0.2);
    }
    .alert.warning {
      background-color: rgba(255, 193, 7, 0.12);
      color: #b28600;
      border-color: rgba(255, 193, 7, 0.2);
    }
    .alert.error {
      background-color: rgba(220, 53, 69, 0.12);
      color: var(--flowx-error);
      border-color: rgba(220, 53, 69, 0.2);
    }
    
    .alert-body {
      flex: 1;
    }
    
    .close-btn {
      background: transparent;
      border: none;
      color: inherit;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.8;
      transition: opacity var(--flowx-transition);
    }
    .close-btn:hover {
      opacity: 1;
    }
  `,setup:e=>{(()=>{const o=e.shadowRoot?.querySelector(".close-btn");o&&o.addEventListener("click",r=>{r.stopPropagation();const s=new CustomEvent("close",{bubbles:!0,composed:!0,cancelable:!0});e.dispatchEvent(s)&&e.remove()})})()},template:e=>{const t=e.getAttribute("variant")||"info",o=e.hasAttribute("dismissible");return`
      <div class="alert ${t}" role="alert">
        <div class="alert-body">
          <slot></slot>
        </div>
        ${o?`
          <button 
            type="button" 
            class="close-btn" 
            aria-label="Dismiss alert"
          >
            ×
          </button>
        `:""}
      </div>
    `}});b("flowx-toast",{observedAttributes:["variant","duration","fx-sse-connect","sse-event"],style:`
    :host {
      display: block;
      width: 320px;
    }
    .toast {
      display: flex;
      align-items: center;
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      padding: var(--flowx-spacing-md);
      background: var(--flowx-bg-surface-raised, rgba(13, 17, 23, 0.95));
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid var(--flowx-border-color, rgba(240, 246, 252, 0.15));
      border-radius: var(--flowx-radius-md);
      box-shadow: var(--flowx-shadow-lg, 0 4px 16px rgba(0, 0, 0, 0.3));
      color: var(--flowx-color-text, #c9d1d9);
      animation: slideIn 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      transition: opacity 0.25s ease, transform 0.25s ease;
      gap: var(--flowx-spacing-sm);
    }
    
    .toast.fade-out {
      opacity: 0;
      transform: translateX(50px);
    }
    
    /* Variants indicators */
    .indicator {
      width: 8px;
      height: 8px;
      border-radius: var(--flowx-radius-round);
      flex-shrink: 0;
    }
    .toast.info .indicator { background-color: var(--flowx-info); }
    .toast.success .indicator { background-color: var(--flowx-success); }
    .toast.warning .indicator { background-color: var(--flowx-warning); }
    .toast.error .indicator { background-color: var(--flowx-error); }
    
    .toast-body {
      flex: 1;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `,setup:e=>{const t=e.getAttribute("duration"),o=t?Number(t):3e3,r=e.getAttribute("fx-sse-connect");if(r&&typeof window<"u"&&window.EventSource)try{const s=new EventSource(r),i=e.getAttribute("sse-event")||"toast";s.addEventListener(i,a=>{try{const n=typeof a.data=="string"&&a.data.startsWith("{")?JSON.parse(a.data):{message:a.data};q.show({message:n.message||n.title||a.data,variant:n.variant||"info",duration:n.duration||3500})}catch{}}),e._eventSource=s}catch{}r||setTimeout(()=>{const s=e.shadowRoot?.querySelector(".toast");s&&(s.classList.add("fade-out"),setTimeout(()=>{e.remove()},250))},o)},template:e=>`
      <div class="toast ${e.getAttribute("variant")||"info"}" role="status" aria-live="polite">
        <span class="indicator"></span>
        <div class="toast-body">
          <slot></slot>
        </div>
      </div>
    `});const q={show(e){if(typeof document>"u")return;let t=document.getElementById("flowx-toast-container");if(!t){t=document.createElement("div"),t.id="flowx-toast-container";const r=document.createElement("style");r.innerHTML=`
        #flowx-toast-container {
          position: fixed;
          top: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 100000;
          pointer-events: none;
        }
        flowx-toast {
          pointer-events: auto;
        }
      `,document.head.appendChild(r),document.body.appendChild(t)}const o=document.createElement("flowx-toast");return e.variant&&o.setAttribute("variant",e.variant),e.duration&&o.setAttribute("duration",String(e.duration)),o.textContent=e.message,t.appendChild(o),o},connectSSE(e,t="toast"){if(typeof window>"u"||!window.EventSource)return;const o=new EventSource(e);return o.addEventListener(t,r=>{try{const s=typeof r.data=="string"&&r.data.startsWith("{")?JSON.parse(r.data):{message:r.data};q.show({message:s.message||s.title||r.data,variant:s.variant||"info",duration:s.duration||3500})}catch{}}),o}};typeof window<"u"&&(window.FlowXToast=q);b("flowx-progress",{observedAttributes:["value","max"],style:`
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
  `,template:e=>{const t=Number(e.getAttribute("value")||0),o=Number(e.getAttribute("max")||100),r=Math.min(Math.max(t/o*100,0),100);return`
      <div 
        class="progress-track"
        role="progressbar"
        aria-valuenow="${t}"
        aria-valuemin="0"
        aria-valuemax="${o}"
      >
        <div class="progress-bar" style="width: ${r}%"></div>
      </div>
    `}});b("flowx-spinner",{observedAttributes:["size"],style:`
    :host {
      display: inline-block;
      vertical-align: middle;
    }
    .spinner {
      border: 3px solid var(--flowx-neutral);
      border-right-color: var(--flowx-primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    
    /* Sizes */
    .spinner.sm {
      width: 16px;
      height: 16px;
      border-width: 2px;
    }
    .spinner.md {
      width: 24px;
      height: 24px;
      border-width: 3px;
    }
    .spinner.lg {
      width: 36px;
      height: 36px;
      border-width: 4px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `,template:e=>`
      <div 
        class="spinner ${e.getAttribute("size")||"md"}" 
        role="status" 
        aria-label="Loading"
      ></div>
    `});b("flowx-skeleton",{observedAttributes:["variant","width","height"],style:`
    :host {
      display: block;
    }
    .skeleton {
      background-color: rgba(240, 246, 252, 0.08);
      animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    /* Shapes */
    .skeleton.text {
      height: 12px;
      margin-top: 4px;
      margin-bottom: 4px;
      border-radius: var(--flowx-radius-sm);
    }
    .skeleton.rect {
      border-radius: var(--flowx-radius-md);
    }
    .skeleton.circle {
      border-radius: var(--flowx-radius-round);
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 0.3; }
    }
  `,template:e=>{const t=e.getAttribute("variant")||"text",o=e.getAttribute("width")||"100%",r=e.getAttribute("height")||(t==="circle"?"40px":t==="rect"?"100px":""),s=`width: ${o}; ${r?`height: ${r};`:""}`;return`
      <div 
        class="skeleton ${t}" 
        style="${s}"
        role="presentation"
        aria-hidden="true"
      ></div>
    `}});b("flowx-tooltip",{observedAttributes:["content","placement","delay"],style:`
    :host {
      display: inline-block;
      position: relative;
    }
    .tooltip-panel {
      position: fixed;
      background: #1f2937;
      color: #ffffff;
      padding: var(--flowx-spacing-xs) var(--flowx-spacing-sm);
      border-radius: var(--flowx-radius-sm);
      font-size: var(--flowx-font-size-sm);
      font-family: var(--flowx-font-family);
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
      transition: opacity var(--flowx-transition);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.08);
      white-space: nowrap;
    }
    .tooltip-panel.visible {
      opacity: 1;
    }
  `,setup:e=>{const t=e.shadowRoot?.querySelector(".tooltip-panel");let o=null,r=null;const s=()=>{r&&clearTimeout(r);const n=parseInt(e.getAttribute("delay")||"100",10);r=setTimeout(()=>{t&&(t.classList.add("visible"),o=y(e,t,{placement:e.getAttribute("placement")||"top",offset:8}))},n)},i=()=>{r&&clearTimeout(r),t&&t.classList.remove("visible"),o&&(o.cleanup(),o=null)};e.addEventListener("mouseenter",s),e.addEventListener("mouseleave",i),e.addEventListener("focusin",s),e.addEventListener("focusout",i);const a=`flowx-tooltip-${Math.random().toString(36).substr(2,9)}`;t?.setAttribute("id",a),t?.setAttribute("role","tooltip"),e.setAttribute("aria-describedby",a)},template:e=>`
      <slot></slot>
      <div class="tooltip-panel">${e.getAttribute("content")||""}</div>
    `});b("flowx-popover",{observedAttributes:["placement","open"],style:`
    :host {
      display: inline-block;
      position: relative;
    }
    .popover-panel {
      position: fixed;
      background: #1f2937;
      color: #ffffff;
      padding: var(--flowx-spacing-md);
      border-radius: var(--flowx-radius-md);
      font-size: var(--flowx-font-size-md);
      font-family: var(--flowx-font-family);
      z-index: 9998;
      display: none;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      min-width: 200px;
    }
    .popover-panel.visible {
      display: block;
    }
  `,setup:e=>{const t=e.shadowRoot?.querySelector(".popover-panel"),o=e.shadowRoot?.querySelector('slot[name="trigger"]');let r=null,s=null;const i=()=>{e.setAttribute("open","")},a=()=>{e.removeAttribute("open")},n=u=>{u.stopPropagation(),e.hasAttribute("open")?a():i()},l=()=>{const u=o?.assignedElements();if(u&&u.length>0){const p=u[0];p.removeEventListener("click",n),p.addEventListener("click",n)}};o?.addEventListener("slotchange",l),l();const d=()=>{if(e.hasAttribute("open")){if(t){t.classList.add("visible");const p=o?.assignedElements(),h=p&&p[0]||e;r=y(h,t,{placement:e.getAttribute("placement")||"bottom",offset:8}),s=k(e,a)}}else t&&t.classList.remove("visible"),r&&(r.cleanup(),r=null),s&&(s.cleanup(),s=null)};new MutationObserver(u=>{u.forEach(p=>{p.attributeName==="open"&&d()})}).observe(e,{attributes:!0}),d(),t?.setAttribute("role","dialog")},template:()=>`
      <slot name="trigger"></slot>
      <div class="popover-panel">
        <slot name="content"></slot>
      </div>
    `});b("flowx-dropdown-item",{observedAttributes:["value","disabled"],style:`
    :host {
      display: block;
      outline: none;
    }
    .dropdown-item {
      padding: var(--flowx-spacing-sm) var(--flowx-spacing-md);
      cursor: pointer;
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      color: #e6edf3;
      border-radius: var(--flowx-radius-sm);
      display: flex;
      align-items: center;
      transition: background-color var(--flowx-transition);
      outline: none;
      user-select: none;
    }
    :host(:focus) .dropdown-item, .dropdown-item:hover {
      background-color: var(--flowx-primary);
      color: var(--flowx-primary-text);
    }
    :host([disabled]) .dropdown-item {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  `,setup:e=>{e.setAttribute("role","menuitem"),e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1");const t=()=>{e.hasAttribute("disabled")||e.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{value:e.getAttribute("value")||e.textContent?.trim()}}))};e.addEventListener("click",t),e.addEventListener("keydown",o=>{(o.key===" "||o.key==="Enter")&&(o.preventDefault(),t())})},template:()=>'<div class="dropdown-item"><slot></slot></div>'});b("flowx-dropdown",{observedAttributes:["label","placement","open"],style:`
    :host {
      display: inline-block;
      position: relative;
    }
    .trigger-btn {
      background-color: var(--flowx-secondary);
      color: var(--flowx-secondary-text);
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      font-weight: 600;
      padding: var(--flowx-spacing-sm) var(--flowx-spacing-md);
      border-radius: var(--flowx-radius-md);
      border: 1px solid transparent;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: var(--flowx-spacing-xs);
    }
    .trigger-btn:hover {
      background-color: var(--flowx-secondary-hover);
    }
    .dropdown-panel {
      position: fixed;
      background: #1f2937;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--flowx-radius-md);
      padding: var(--flowx-spacing-xs);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      z-index: 9998;
      display: none;
      min-width: 160px;
    }
    .dropdown-panel.visible {
      display: block;
    }
  `,setup:e=>{const t=e.shadowRoot?.querySelector(".trigger-btn"),o=e.shadowRoot?.querySelector(".dropdown-panel");let r=null,s=null,i=null;const a=()=>{e.setAttribute("open","")},n=()=>{e.removeAttribute("open")},l=u=>{u.stopPropagation(),e.hasAttribute("open")?n():a()};t?.addEventListener("click",l);const d=()=>{if(e.hasAttribute("open")){if(o){o.classList.add("visible"),r=y(t,o,{placement:e.getAttribute("placement")||"bottom",offset:4}),s=k(e,n),i=$(e,"flowx-dropdown-item");const p=e.querySelector("flowx-dropdown-item");p&&p.focus()}}else o&&o.classList.remove("visible"),r&&(r.cleanup(),r=null),s&&(s.cleanup(),s=null),i&&(i.cleanup(),i=null)};new MutationObserver(u=>{u.forEach(p=>{p.attributeName==="open"&&d()})}).observe(e,{attributes:!0}),e.addEventListener("select",()=>{n(),t?.focus()}),d(),o?.setAttribute("role","menu")},template:e=>`
      <button class="trigger-btn" aria-haspopup="true">
        <span>${e.getAttribute("label")||"Dropdown"}</span>
        <span class="arrow">▼</span>
      </button>
      <div class="dropdown-panel">
        <slot></slot>
      </div>
    `});b("flowx-accordion-item",{observedAttributes:["header","open"],style:`
    :host {
      display: block;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .header-btn {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: transparent;
      color: #e6edf3;
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      font-weight: 600;
      padding: var(--flowx-spacing-md);
      border: none;
      cursor: pointer;
      text-align: left;
      outline: none;
    }
    .header-btn:hover, .header-btn:focus {
      background-color: rgba(255, 255, 255, 0.02);
    }
    .arrow {
      transition: transform var(--flowx-transition);
      color: var(--text-muted);
    }
    .content-box {
      display: none;
      padding: var(--flowx-spacing-md);
      color: #c9d1d9;
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      line-height: 1.5;
      background-color: rgba(255, 255, 255, 0.01);
    }
    :host([open]) .content-box {
      display: block;
    }
    :host([open]) .arrow {
      transform: rotate(90deg);
    }
  `,setup:e=>{const t=e.shadowRoot?.querySelector(".header-btn"),o=()=>{e.hasAttribute("open")?e.removeAttribute("open"):e.setAttribute("open",""),e.dispatchEvent(new CustomEvent("toggle",{bubbles:!0,composed:!0}))};t?.addEventListener("click",o),e.addEventListener("focus",()=>{t?.focus()});const r=()=>{const i=e.hasAttribute("open");t?.setAttribute("aria-expanded",i?"true":"false")};new MutationObserver(()=>r()).observe(e,{attributes:!0,attributeFilter:["open"]}),r()},template:e=>`
      <button class="header-btn" tabindex="-1">
        <span>${e.getAttribute("header")||"Accordion Item"}</span>
        <span class="arrow">▶</span>
      </button>
      <div class="content-box">
        <slot></slot>
      </div>
    `});b("flowx-accordion",{observedAttributes:["multi"],style:`
    :host {
      display: block;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--flowx-radius-md);
      overflow: hidden;
      background: #0d1117;
    }
  `,setup:e=>{let t=null;const o=s=>{const i=s.target;if(i.tagName.toLowerCase()!=="flowx-accordion-item")return;!e.hasAttribute("multi")&&i.hasAttribute("open")&&Array.from(e.querySelectorAll("flowx-accordion-item")).forEach(l=>{l!==i&&l.removeAttribute("open")})};e.addEventListener("toggle",o),t=$(e,"flowx-accordion-item"),new MutationObserver(()=>{t&&t.update()}).observe(e,{childList:!0})},template:()=>"<slot></slot>"});b("flowx-tab",{observedAttributes:["value","selected"],style:`
    :host {
      display: inline-block;
      outline: none;
    }
    .tab-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      font-weight: 600;
      padding: var(--flowx-spacing-md);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all var(--flowx-transition);
      outline: none;
    }
    .tab-btn:hover {
      color: #ffffff;
    }
    :host([selected]) .tab-btn {
      color: var(--flowx-primary);
      border-bottom-color: var(--flowx-primary);
    }
  `,setup:e=>{e.setAttribute("role","tab"),e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1");const t=()=>{e.dispatchEvent(new CustomEvent("tab-select",{bubbles:!0,composed:!0,detail:{value:e.getAttribute("value")}}))};e.addEventListener("click",t),e.addEventListener("keydown",s=>{(s.key===" "||s.key==="Enter")&&(s.preventDefault(),t())}),e.addEventListener("focus",()=>{e.shadowRoot?.querySelector(".tab-btn")?.focus()});const o=()=>{const s=e.hasAttribute("selected");e.setAttribute("aria-selected",s?"true":"false")};new MutationObserver(()=>o()).observe(e,{attributes:!0,attributeFilter:["selected"]}),o()},template:()=>'<button class="tab-btn" tabindex="-1"><slot></slot></button>'});b("flowx-tab-list",{observedAttributes:[],style:`
    :host {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      gap: var(--flowx-spacing-sm);
    }
  `,setup:e=>{e.setAttribute("role","tablist");const t=$(e,"flowx-tab");new MutationObserver(()=>{t&&t.update()}).observe(e,{childList:!0})},template:()=>"<slot></slot>"});b("flowx-tab-panel",{observedAttributes:["value","visible"],style:`
    :host {
      display: none;
      padding: var(--flowx-spacing-md) 0;
      font-family: var(--flowx-font-family);
      color: #e6edf3;
    }
    :host([visible]) {
      display: block;
    }
  `,setup:e=>{e.setAttribute("role","tabpanel")},template:()=>"<slot></slot>"});b("flowx-tabs",{observedAttributes:["value"],style:`
    :host {
      display: block;
      background: #0d1117;
      border-radius: var(--flowx-radius-md);
      padding: var(--flowx-spacing-md);
    }
  `,setup:e=>{const t=()=>{const r=e.getAttribute("value"),s=e,i=Array.from(s.querySelectorAll("flowx-tab")),a=Array.from(s.querySelectorAll("flowx-tab-panel"));i.forEach(n=>{const l=n.getAttribute("value");l===r?(n.setAttribute("selected",""),n.setAttribute("tabindex","0")):(n.removeAttribute("selected"),n.setAttribute("tabindex","-1"));const c=n.getAttribute("id")||`flowx-tab-${l}`,u=`flowx-panel-${l}`;n.setAttribute("id",c),n.setAttribute("aria-controls",u)}),a.forEach(n=>{const l=n.getAttribute("value");l===r?n.setAttribute("visible",""):n.removeAttribute("visible");const c=`flowx-tab-${l}`,u=n.getAttribute("id")||`flowx-panel-${l}`;n.setAttribute("id",u),n.setAttribute("aria-labelledby",c)})};e.addEventListener("tab-select",r=>{const s=r.detail.value;e.setAttribute("value",s)}),new MutationObserver(()=>t()).observe(e,{childList:!0,attributes:!0,attributeFilter:["value"]}),t()},template:()=>"<slot></slot>"});b("flowx-breadcrumb",{observedAttributes:["separator"],style:`
    :host {
      display: block;
    }
    .breadcrumb-container nav {
      display: inline-block;
    }
    .breadcrumb {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      margin: 0;
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      gap: 0;
    }
    .breadcrumb-item {
      display: inline-flex;
      align-items: center;
      color: #e6edf3;
    }
    .breadcrumb-item ::slotted(a) {
      color: var(--flowx-primary);
      text-decoration: none;
      transition: color var(--flowx-transition);
    }
    .breadcrumb-item ::slotted(a:hover) {
      color: var(--flowx-primary-hover);
      text-decoration: underline;
    }
    .breadcrumb-item ::slotted(span), .breadcrumb-item ::slotted([aria-current="page"]) {
      color: var(--text-muted);
      pointer-events: none;
    }
    .separator {
      margin: 0 var(--flowx-spacing-sm);
      color: var(--text-muted);
      user-select: none;
    }
  `,setup:e=>{const t=e.shadowRoot;e.setAttribute("role","navigation"),e.setAttribute("aria-label","Breadcrumb");const o=()=>{const s=e,i=Array.from(s.children).filter(l=>!l.getAttribute("slot")?.startsWith("item-")),a=e.getAttribute("separator")||"/";let n='<ol class="breadcrumb">';if(i.forEach((l,d)=>{const c=`item-${d}`;l.setAttribute("slot",c),d===i.length-1?l.setAttribute("aria-current","page"):l.removeAttribute("aria-current"),n+=`<li class="breadcrumb-item"><slot name="${c}"></slot></li>`,d<i.length-1&&(n+=`<li class="separator" aria-hidden="true">${a}</li>`)}),n+="</ol>",t){const l=t.querySelector(".breadcrumb-container nav");l&&(l.innerHTML=n)}};new MutationObserver(()=>{o()}).observe(e,{childList:!0}),o()},template:()=>`
      <div class="breadcrumb-container">
        <nav></nav>
      </div>
    `});b("flowx-pagination",{observedAttributes:["current-page","total-pages"],style:`
    :host {
      display: block;
    }
    .pagination-container {
      display: flex;
      align-items: center;
      gap: var(--flowx-spacing-xs);
      font-family: var(--flowx-font-family);
    }
    .page-btn {
      background: #161b22;
      color: #e6edf3;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--flowx-radius-sm);
      padding: var(--flowx-spacing-xs) var(--flowx-spacing-sm);
      cursor: pointer;
      font-size: var(--flowx-font-size-md);
      font-weight: 600;
      min-width: 32px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all var(--flowx-transition);
      outline: none;
      user-select: none;
    }
    .page-btn:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.08);
    }
    .page-btn.active {
      background: var(--flowx-primary);
      color: var(--flowx-primary-text);
      border-color: var(--flowx-primary);
    }
    .page-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .ellipsis {
      color: var(--text-muted);
      min-width: 32px;
      text-align: center;
      user-select: none;
    }
  `,setup:e=>{const t=s=>{const i=parseInt(e.getAttribute("total-pages")||"1",10);s<1||s>i||(e.setAttribute("current-page",String(s)),e.dispatchEvent(new CustomEvent("fx-page-change",{bubbles:!0,composed:!0,detail:{page:s}})),e.render(),o())},o=()=>{e.shadowRoot?.querySelectorAll(".page-btn")?.forEach(i=>{i.addEventListener("click",()=>{const a=parseInt(i.getAttribute("data-page")||"1",10);t(a)})})};new MutationObserver(()=>{o()}).observe(e,{attributes:!0}),o(),e.changePage=t},template:e=>{const t=parseInt(e.getAttribute("current-page")||"1",10),o=parseInt(e.getAttribute("total-pages")||"1",10),r=[];if(o<=7)for(let i=1;i<=o;i++)r.push(i);else t<=4?r.push(1,2,3,4,5,"...",o):t>=o-3?r.push(1,"...",o-4,o-3,o-2,o-1,o):r.push(1,"...",t-1,t,t+1,"...",o);let s='<div class="pagination-container">';return s+=`<button class="page-btn prev" data-page="${t-1}" ${t===1?"disabled":""} aria-label="Go to previous page">⟨</button>`,r.forEach(i=>{i==="..."?s+='<span class="ellipsis" aria-hidden="true">...</span>':s+=`<button class="page-btn ${i===t?"active":""}" data-page="${i}" aria-label="Go to page ${i}" aria-current="${i===t?"page":"false"}">${i}</button>`}),s+=`<button class="page-btn next" data-page="${t+1}" ${t===o?"disabled":""} aria-label="Go to next page">⟩</button>`,s+="</div>",s}});b("flowx-stepper",{observedAttributes:["current","orientation"],style:`
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
  `,setup:()=>{},template:e=>{const t=parseInt(e.getAttribute("current")||"0",10),o=e.getAttribute("orientation")||"horizontal",r=e.hasAttribute("clickable");if(Array.from(e.querySelectorAll("[data-step]")).length===0){const i=e.getAttribute("data-steps")||"",a=i?i.split(",").map(l=>l.trim()):["Step 1","Step 2","Step 3"];let n='<div class="stepper">';return a.forEach((l,d)=>{const c=d<t;n+=`<div class="step ${c?"completed":d===t?"current":""} ${r?"clickable":""}" data-index="${d}" role="listitem">`,n+=`<div class="step-indicator">${c?"✓":d+1}</div>`,n+=`<div class="step-label">${l}</div>`,n+="</div>",d<a.length-1&&o!=="vertical"&&(n+=`<div class="connector ${c?"filled":""}"></div>`)}),n+="</div>",n}return'<div class="stepper" role="list"><slot></slot></div>'}});b("flowx-timeline",{observedAttributes:["align"],style:`
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
  `,setup:()=>{},template:()=>`
    <div class="timeline">
      <slot></slot>
    </div>
  `});b("flowx-timeline-item",{observedAttributes:["time","title"],style:`
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
  `,setup:()=>{},template:e=>{const t=e.getAttribute("time")||"",o=e.getAttribute("title")||"";return`
      ${t?`<div class="timeline-time">${t}</div>`:""}
      <div class="timeline-content">
        ${o?`<h4 class="timeline-title">${o}</h4>`:""}
        <div class="timeline-body"><slot></slot></div>
      </div>
    `}});const X=`
  :host {
    display: block;
    font-family: var(--flowx-font-family);
  }
  :host([disabled]) {
    opacity: 0.5;
    pointer-events: none;
  }
  label {
    display: block;
    font-size: var(--flowx-font-size-sm);
    font-weight: 600;
    color: #8b949e;
    margin-bottom: 4px;
    letter-spacing: 0.03em;
  }
  .field-hint {
    font-size: var(--flowx-font-size-sm);
    color: #6e7681;
    margin-top: 4px;
  }
  :host([invalid]) label,
  :host(:state(invalid)) label {
    color: var(--flowx-error);
  }
`,D=`
  input, textarea, select {
    display: block;
    width: 100%;
    background: #0d1117;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: var(--flowx-radius-md);
    color: #e6edf3;
    font-family: var(--flowx-font-family);
    font-size: var(--flowx-font-size-md);
    padding: 9px 12px;
    outline: none;
    transition: border-color var(--flowx-transition), box-shadow var(--flowx-transition);
    box-sizing: border-box;
  }
  input::placeholder, textarea::placeholder {
    color: #484f58;
  }
  input:focus, textarea:focus, select:focus {
    border-color: var(--flowx-primary);
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.2);
  }
  :host([invalid]) input,
  :host([invalid]) textarea,
  :host([invalid]) select {
    border-color: var(--flowx-error);
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);
  }
  input:disabled, textarea:disabled, select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,K=["required","disabled","name","value","label","hint","invalid"];function A(e,t){const o=[...new Set([...K,...t.observedAttributes||[]])];class r extends HTMLElement{static formAssociated=!0;static get observedAttributes(){return o}internals;_initialized=!1;constructor(){super(),this.attachShadow({mode:"open"});try{this.internals=this.attachInternals()}catch{this.internals={setFormValue:()=>{},setValidity:()=>{},checkValidity:()=>!0,reportValidity:()=>!0,get validationMessage(){return""},get form(){return null},get validity(){return{valid:!0}}}}}connectedCallback(){this._initialized||(this.render(),t.setup&&t.setup(this,this.internals),this._syncValidity(),this._initialized=!0)}attributeChangedCallback(i,a,n){a!==n&&this._initialized&&(this.render(),this._syncValidity(),t.setup&&t.setup(this,this.internals))}render(){if(!this.shadowRoot)return;const i=`<style>${g}${X}${t.style||""}</style>`;this.shadowRoot.innerHTML=`${i}${t.template(this)}`}setFormValue(i){try{this.internals.setFormValue(i)}catch{}}setValidity(i,a,n){try{n?this.internals.setValidity(i,a,n):this.internals.setValidity(i,a)}catch{}}markValid(){try{this.internals.setValidity({})}catch{}}get form(){return this.internals.form}get validity(){return this.internals.validity}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.internals.checkValidity()}reportValidity(){return this.internals.reportValidity()}_syncValidity(){const i=this.hasAttribute("required"),a=this.getAttribute("value")||"",n=this._currentValue??a;if(i&&!n){const l=this.getAttribute("label")||this.getAttribute("name")||"This field";this.setValidity({valueMissing:!0},`${l} is required`),this.setAttribute("invalid","")}else this.markValid(),this.removeAttribute("invalid");if(this.hasAttribute("disabled"))try{this.internals.setFormValue(null)}catch{}}}return o.forEach(s=>{const i=s.replace(/-([a-z])/g,(a,n)=>n.toUpperCase());Object.getOwnPropertyDescriptor(r.prototype,i)||Object.defineProperty(r.prototype,i,{get(){const a=this.getAttribute(s);return a===""?!0:a===null?!1:a},set(a){a===null||a===!1?this.removeAttribute(s):a===!0?this.setAttribute(s,""):this.setAttribute(s,String(a))},configurable:!0})}),customElements.get(e)||customElements.define(e,r),r}function tt(e,t){const o=Array.isArray(t)?Object.fromEntries(t.map(r=>[r.field,r.message])):t;e.querySelectorAll("flowx-form-error").forEach(r=>{r.textContent="",r.removeAttribute("visible")});for(const[r,s]of Object.entries(o)){const i=e.querySelector(`flowx-form-error[for="${r}"]`);i&&(i.textContent=s,i.setAttribute("visible",""));const a=e.querySelector(`[name="${r}"]`);a&&a.setAttribute("invalid","")}}A("flowx-input",{observedAttributes:["type","placeholder","pattern","minlength","maxlength","autocomplete","readonly"],style:`${D}
    .wrapper { position: relative; }
    input[type="password"] { letter-spacing: 0.1em; }
  `,template:e=>{const t=e.getAttribute("label")||"",o=e.getAttribute("hint")||"",r=e.getAttribute("type")||"text",s=e.getAttribute("placeholder")||"",i=e.getAttribute("value")||"",a=e.getAttribute("name")||"",n=e.hasAttribute("required")?"required":"",l=e.hasAttribute("disabled")?"disabled":"",d=e.hasAttribute("readonly")?"readonly":"",c=e.getAttribute("pattern")?`pattern="${e.getAttribute("pattern")}"`:"",u=e.getAttribute("minlength")?`minlength="${e.getAttribute("minlength")}"`:"",p=e.getAttribute("maxlength")?`maxlength="${e.getAttribute("maxlength")}"`:"",h=e.getAttribute("autocomplete")||"off";return`
      ${t?`<label for="inner">${t}${n?' <span aria-hidden="true" style="color:var(--flowx-error)">*</span>':""}</label>`:""}
      <div class="wrapper">
        <input
          id="inner"
          type="${r}"
          name="${a}"
          value="${i}"
          placeholder="${s}"
          autocomplete="${h}"
          ${n} ${l} ${d} ${c} ${u} ${p}
          aria-required="${!!n}"
          aria-label="${t||a}"
        />
      </div>
      ${o?`<div class="field-hint">${o}</div>`:""}
    `},setup:(e,t)=>{const o=e.shadowRoot?.querySelector("input");if(!o)return;t.setFormValue(o.value||e.getAttribute("value")||""),e._currentValue=o.value;const r=()=>{if(e._currentValue=o.value,t.setFormValue(o.value),o.validity.valid){try{t.setValidity({})}catch{}e.removeAttribute("invalid")}else{try{t.setValidity(o.validity,o.validationMessage,o)}catch{}e.setAttribute("invalid","")}};o.addEventListener("input",r),o.addEventListener("change",r),o.addEventListener("blur",r)}});A("flowx-textarea",{observedAttributes:["rows","cols","placeholder","minlength","maxlength","resize","readonly"],style:`${D}
    textarea {
      resize: var(--fx-textarea-resize, vertical);
      min-height: 80px;
    }
    :host([resize="none"]) textarea { resize: none; }
    :host([resize="horizontal"]) textarea { resize: horizontal; }
    :host([resize="both"]) textarea { resize: both; }
  `,template:e=>{const t=e.getAttribute("label")||"",o=e.getAttribute("hint")||"",r=e.getAttribute("name")||"",s=e.getAttribute("placeholder")||"",i=e.getAttribute("value")||"",a=e.getAttribute("rows")||"4",n=e.hasAttribute("required")?"required":"",l=e.hasAttribute("disabled")?"disabled":"",d=e.hasAttribute("readonly")?"readonly":"",c=e.getAttribute("minlength")?`minlength="${e.getAttribute("minlength")}"`:"",u=e.getAttribute("maxlength")?`maxlength="${e.getAttribute("maxlength")}"`:"";return`
      ${t?`<label for="inner">${t}${n?' <span aria-hidden="true" style="color:var(--flowx-error)">*</span>':""}</label>`:""}
      <textarea
        id="inner"
        name="${r}"
        rows="${a}"
        placeholder="${s}"
        ${n} ${l} ${d} ${c} ${u}
        aria-required="${!!n}"
        aria-label="${t||r}"
      >${i}</textarea>
      ${o?`<div class="field-hint">${o}</div>`:""}
    `},setup:(e,t)=>{const o=e.shadowRoot?.querySelector("textarea");if(!o)return;t.setFormValue(o.value),e._currentValue=o.value;const r=()=>{if(e._currentValue=o.value,t.setFormValue(o.value),o.validity.valid){try{t.setValidity({})}catch{}e.removeAttribute("invalid")}else{try{t.setValidity(o.validity,o.validationMessage,o)}catch{}e.setAttribute("invalid","")}};o.addEventListener("input",r),o.addEventListener("blur",r)}});A("flowx-checkbox",{observedAttributes:["checked","value"],style:`
    :host { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
    :host([disabled]) { cursor: not-allowed; }
    .box {
      width: 18px; height: 18px; flex-shrink: 0;
      border: 2px solid rgba(255,255,255,0.2);
      border-radius: var(--flowx-radius-sm);
      background: transparent;
      display: flex; align-items: center; justify-content: center;
      transition: all var(--flowx-transition);
    }
    :host([checked]) .box {
      background: var(--flowx-primary);
      border-color: var(--flowx-primary);
    }
    :host([invalid]) .box { border-color: var(--flowx-error); }
    .checkmark { display: none; color: #fff; font-size: 11px; font-weight: 800; }
    :host([checked]) .checkmark { display: block; }
    .label-text {
      font-size: var(--flowx-font-size-md);
      color: #e6edf3;
      user-select: none;
    }
  `,template:e=>{const t=e.getAttribute("label")||"";return`
      <div class="box" role="checkbox"
        aria-checked="${e.hasAttribute("checked")}"
        aria-required="${e.hasAttribute("required")}"
        tabindex="${e.hasAttribute("disabled")?"-1":"0"}"
      >
        <span class="checkmark">✓</span>
      </div>
      ${t?`<span class="label-text">${t}</span>`:"<slot></slot>"}
    `},setup:(e,t)=>{const o=e.shadowRoot?.querySelector(".box");if(!o)return;const r=()=>{const i=e.hasAttribute("checked"),a=e.getAttribute("value")||"on";if(t.setFormValue(i?a:null),e._currentValue=i?a:"",o.setAttribute("aria-checked",String(i)),e.hasAttribute("required")&&!i){try{t.setValidity({valueMissing:!0},`${e.getAttribute("label")||e.getAttribute("name")||"This field"} is required`)}catch{}e.setAttribute("invalid","")}else{try{t.setValidity({})}catch{}e.removeAttribute("invalid")}};r();const s=()=>{e.hasAttribute("disabled")||(e.toggleAttribute("checked"),r(),e.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:e.hasAttribute("checked")}})))};e.addEventListener("click",s),e.addEventListener("keydown",i=>{const a=i;(a.key===" "||a.key==="Enter")&&(a.preventDefault(),s())})}});A("flowx-switch",{observedAttributes:["checked"],style:`
    :host { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; }
    :host([disabled]) { cursor: not-allowed; }
    .track {
      width: 40px; height: 22px;
      background: rgba(255,255,255,0.12);
      border-radius: var(--flowx-radius-round);
      position: relative;
      transition: background var(--flowx-transition);
      flex-shrink: 0;
    }
    :host([checked]) .track { background: var(--flowx-primary); }
    :host([invalid]) .track { box-shadow: 0 0 0 2px var(--flowx-error); }
    .thumb {
      position: absolute;
      top: 3px; left: 3px;
      width: 16px; height: 16px;
      background: #fff;
      border-radius: 50%;
      transition: transform var(--flowx-transition);
      box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    }
    :host([checked]) .thumb { transform: translateX(18px); }
    .label-text { font-size: var(--flowx-font-size-md); color: #e6edf3; user-select: none; }
  `,template:e=>{const t=e.getAttribute("label")||"";return`
      <div class="track" role="switch"
        id="${`sw-${Math.random().toString(36).slice(2,7)}`}"
        aria-checked="${e.hasAttribute("checked")}"
        aria-required="${e.hasAttribute("required")}"
        tabindex="${e.hasAttribute("disabled")?"-1":"0"}"
      >
        <div class="thumb"></div>
      </div>
      ${t?`<span class="label-text">${t}</span>`:"<slot></slot>"}
    `},setup:(e,t)=>{const o=e.shadowRoot?.querySelector(".track");if(!o)return;const r=()=>{const i=e.hasAttribute("checked");t.setFormValue(i?e.getAttribute("value")||"on":null),e._currentValue=i?e.getAttribute("value")||"on":"",o.setAttribute("aria-checked",String(i))};r();const s=()=>{e.hasAttribute("disabled")||(e.toggleAttribute("checked"),r(),e.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:e.hasAttribute("checked")}})))};e.addEventListener("click",s),e.addEventListener("keydown",i=>{const a=i;(a.key===" "||a.key==="Enter")&&(a.preventDefault(),s())})}});A("flowx-radio",{observedAttributes:["checked","value"],style:`
    :host { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
    :host([disabled]) { cursor: not-allowed; }
    .ring {
      width: 18px; height: 18px; flex-shrink: 0;
      border: 2px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      background: transparent;
      display: flex; align-items: center; justify-content: center;
      transition: all var(--flowx-transition);
    }
    :host([checked]) .ring { border-color: var(--flowx-primary); }
    :host([invalid]) .ring { border-color: var(--flowx-error); }
    .dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--flowx-primary);
      opacity: 0; transform: scale(0);
      transition: all var(--flowx-transition);
    }
    :host([checked]) .dot { opacity: 1; transform: scale(1); }
    .label-text { font-size: var(--flowx-font-size-md); color: #e6edf3; user-select: none; }
  `,template:e=>{const t=e.getAttribute("label")||"";return`
      <div class="ring" role="radio"
        aria-checked="${e.hasAttribute("checked")}"
        tabindex="${e.hasAttribute("disabled")?"-1":e.hasAttribute("checked")?"0":"-1"}"
      >
        <div class="dot"></div>
      </div>
      ${t?`<span class="label-text">${t}</span>`:"<slot></slot>"}
    `},setup:(e,t)=>{const o=e.shadowRoot?.querySelector(".ring");if(!o)return;const r=()=>{const i=e.hasAttribute("checked"),a=e.getAttribute("value")||"on";t.setFormValue(i?a:null),e._currentValue=i?a:"",o.setAttribute("aria-checked",String(i))};r();const s=()=>{if(e.hasAttribute("disabled"))return;const i=e.getAttribute("name");i&&e.getRootNode().querySelectorAll(`flowx-radio[name="${i}"]`).forEach(n=>{n!==e&&(n.removeAttribute("checked"),n.setAttribute("tabindex","-1"))}),e.setAttribute("checked",""),e.setAttribute("tabindex","0"),r(),e.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e.getAttribute("value")}}))};e.addEventListener("click",s),e.addEventListener("keydown",i=>{const a=i;(a.key===" "||a.key==="Enter")&&(a.preventDefault(),s())})}});A("flowx-select",{observedAttributes:["placeholder"],style:`${D}
    :host { display: block; position: relative; }
    .trigger {
      display: flex; align-items: center; justify-content: space-between;
      background: #0d1117;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: var(--flowx-radius-md);
      color: #e6edf3;
      font-family: var(--flowx-font-family);
      font-size: var(--flowx-font-size-md);
      padding: 9px 12px;
      cursor: pointer;
      user-select: none;
      transition: border-color var(--flowx-transition), box-shadow var(--flowx-transition);
    }
    :host([open]) .trigger,
    .trigger:focus-visible {
      border-color: var(--flowx-primary);
      box-shadow: 0 0 0 3px rgba(0,102,204,0.2);
      outline: none;
    }
    :host([invalid]) .trigger {
      border-color: var(--flowx-error);
      box-shadow: 0 0 0 3px rgba(220,53,69,0.15);
    }
    .chevron { font-size: 10px; opacity: 0.6; transition: transform var(--flowx-transition); }
    :host([open]) .chevron { transform: rotate(180deg); }
    .dropdown {
      display: none;
      position: absolute;
      top: calc(100% + 4px);
      left: 0; right: 0;
      background: #161b22;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: var(--flowx-radius-md);
      max-height: 220px;
      overflow-y: auto;
      z-index: 100;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    }
    :host([open]) .dropdown { display: block; }
    .option {
      padding: 9px 14px;
      cursor: pointer;
      font-size: var(--flowx-font-size-md);
      color: #c9d1d9;
      transition: background 0.15s;
    }
    .option:hover, .option[aria-selected="true"] { background: rgba(255,255,255,0.06); color: #fff; }
    .option:focus { outline: none; background: rgba(0,102,204,0.2); }
    .placeholder-text { color: #484f58; }
  `,template:e=>{const t=e.getAttribute("label")||"",o=e.getAttribute("hint")||"",r=e.hasAttribute("required"),s=e._currentValue||e.getAttribute("value")||"",i=e,a=Array.from(i.children).filter(c=>c.tagName.toLowerCase()==="option"),n=a.find(c=>c.value===s),l=n?n.textContent?.trim():e.getAttribute("placeholder")||a[0]?.textContent?.trim()||"Select…",d=a.map(c=>`
      <div class="option" role="option" tabindex="0"
        data-value="${c.value}"
        aria-selected="${c.value===s}">
        ${c.textContent?.trim()}
      </div>
    `).join("");return`
      ${t?`<label>${t}${r?' <span aria-hidden="true" style="color:var(--flowx-error)">*</span>':""}</label>`:""}
      <div class="trigger" role="combobox" tabindex="0"
        aria-haspopup="listbox"
        aria-expanded="${e.hasAttribute("open")}"
        aria-required="${r}"
      >
        <span class="${s?"":"placeholder-text"}">${l}</span>
        <span class="chevron">▾</span>
      </div>
      <div class="dropdown" role="listbox">
        ${d}
      </div>
      ${o?`<div class="field-hint">${o}</div>`:""}
    `},setup:(e,t)=>{const o=e.shadowRoot;if(!o)return;const r=o.querySelector(".trigger"),s=o.querySelector(".dropdown");if(!r||!s)return;const i=e._currentValue||e.getAttribute("value")||"";t.setFormValue(i||null);const a=(l,d)=>{if(e._currentValue=l,t.setFormValue(l||null),e.setAttribute("value",l),e.removeAttribute("open"),e.render(),e.hasAttribute("required")&&!l){try{t.setValidity({valueMissing:!0},`${e.getAttribute("label")||e.getAttribute("name")} is required`)}catch{}e.setAttribute("invalid","")}else{try{t.setValidity({})}catch{}e.removeAttribute("invalid")}e.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:l,label:d}}))};(()=>{const l=o.querySelector(".trigger"),d=o.querySelector(".dropdown");!l||!d||(l.addEventListener("click",()=>{e.hasAttribute("disabled")||e.toggleAttribute("open")}),l.addEventListener("keydown",c=>{const u=c;if((u.key===" "||u.key==="Enter")&&(u.preventDefault(),e.toggleAttribute("open")),u.key==="Escape"&&e.removeAttribute("open"),u.key==="ArrowDown"){const p=d.querySelector(".option");p&&(e.setAttribute("open",""),p.focus()),u.preventDefault()}}),d.querySelectorAll(".option").forEach(c=>{c.addEventListener("click",()=>a(c.dataset.value||"",c.textContent?.trim()||"")),c.addEventListener("keydown",u=>{const p=u;(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),a(c.dataset.value||"",c.textContent?.trim()||"")),p.key==="ArrowDown"&&(c.nextElementSibling?.focus(),p.preventDefault()),p.key==="ArrowUp"&&(c.previousElementSibling?.focus(),p.preventDefault()),p.key==="Escape"&&(e.removeAttribute("open"),l.focus())})}),document.addEventListener("click",c=>{c.composedPath().includes(e)||e.removeAttribute("open")},{capture:!0}))})()}});A("flowx-slider",{observedAttributes:["min","max","step","value"],style:`
    :host { display: block; }
    label { display: block; font-size: var(--flowx-font-size-sm); font-weight: 600; color: #8b949e; margin-bottom: 8px; }
    .slider-wrapper { display: flex; align-items: center; gap: 12px; }
    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      flex: 1;
      height: 4px;
      background: rgba(255,255,255,0.12);
      border-radius: 2px;
      outline: none;
      cursor: pointer;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px; height: 18px;
      border-radius: 50%;
      background: var(--flowx-primary);
      cursor: pointer;
      box-shadow: 0 0 0 3px rgba(0,102,204,0.2);
      transition: box-shadow var(--flowx-transition);
    }
    input[type="range"]:focus::-webkit-slider-thumb {
      box-shadow: 0 0 0 5px rgba(0,102,204,0.35);
    }
    :host([invalid]) input[type="range"]::-webkit-slider-thumb { background: var(--flowx-error); }
    .value-badge {
      min-width: 40px; text-align: center;
      font-size: var(--flowx-font-size-sm); color: #e6edf3;
      background: rgba(255,255,255,0.08);
      border-radius: var(--flowx-radius-sm);
      padding: 2px 6px;
    }
  `,template:e=>{const t=e.getAttribute("label")||"",o=e.getAttribute("min")||"0",r=e.getAttribute("max")||"100",s=e.getAttribute("step")||"1",i=e._currentValue??e.getAttribute("value")??"50",a=e.hasAttribute("disabled")?"disabled":"";return`
      ${t?`<label>${t}</label>`:""}
      <div class="slider-wrapper">
        <input type="range" id="inner"
          min="${o}" max="${r}" step="${s}" value="${i}"
          ${a}
          aria-label="${t||e.getAttribute("name")||"Slider"}"
          aria-valuemin="${o}" aria-valuemax="${r}" aria-valuenow="${i}"
        />
        <span class="value-badge">${i}</span>
      </div>
    `},setup:(e,t)=>{const o=e.shadowRoot?.querySelector('input[type="range"]'),r=e.shadowRoot?.querySelector(".value-badge");o&&(t.setFormValue(o.value),e._currentValue=o.value,o.addEventListener("input",()=>{e._currentValue=o.value,t.setFormValue(o.value),o.setAttribute("aria-valuenow",o.value),r&&(r.textContent=o.value)}),o.addEventListener("change",()=>{e.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:o.value}}))}))}});A("flowx-rating",{observedAttributes:["max","value","readonly"],style:`
    :host { display: block; }
    label { display: block; font-size: var(--flowx-font-size-sm); font-weight: 600; color: #8b949e; margin-bottom: 8px; }
    .stars { display: flex; gap: 4px; }
    .star {
      font-size: 24px;
      cursor: pointer;
      color: rgba(255,255,255,0.15);
      transition: color var(--flowx-transition), transform 0.1s;
      outline: none;
    }
    .star:hover, .star.filled { color: #f0a500; }
    .star:focus-visible { outline: 2px solid var(--flowx-primary); border-radius: 3px; }
    .star:active { transform: scale(0.9); }
    :host([readonly]) .star { cursor: default; pointer-events: none; }
    :host([invalid]) .stars { outline: 2px solid var(--flowx-error); border-radius: 4px; padding: 2px; }
  `,template:e=>{const t=e.getAttribute("label")||"",o=parseInt(e.getAttribute("max")||"5",10),r=parseInt(e._currentValue??e.getAttribute("value")??"0",10),s=e.hasAttribute("readonly"),i=Array.from({length:o},(a,n)=>`
      <span class="star ${n<r?"filled":""}"
        role="radio"
        aria-label="${n+1} star${n===0?"":"s"}"
        aria-checked="${n<r}"
        data-value="${n+1}"
        tabindex="${s?"-1":n===(r-1||0)?"0":"-1"}"
      >★</span>
    `).join("");return`
      ${t?`<label>${t}</label>`:""}
      <div class="stars" role="radiogroup" aria-label="${t||"Rating"}">
        ${i}
      </div>
    `},setup:(e,t)=>{const o=e.shadowRoot;if(!o)return;const r=a=>{if(e._currentValue=String(a),t.setFormValue(String(a)),e.hasAttribute("required")&&a===0){try{t.setValidity({valueMissing:!0},"Please select a rating")}catch{}e.setAttribute("invalid","")}else{try{t.setValidity({})}catch{}e.removeAttribute("invalid")}e.render(),s()},s=()=>{o.querySelectorAll(".star").forEach(a=>{a.addEventListener("click",()=>r(parseInt(a.dataset.value||"0",10))),a.addEventListener("keydown",n=>{const l=n,d=parseInt(a.dataset.value||"0",10);(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),r(d)),(l.key==="ArrowRight"||l.key==="ArrowUp")&&(l.preventDefault(),r(Math.min(d+1,parseInt(e.getAttribute("max")||"5",10)))),(l.key==="ArrowLeft"||l.key==="ArrowDown")&&(l.preventDefault(),r(Math.max(d-1,1)))})})},i=parseInt(e.getAttribute("value")||"0",10);t.setFormValue(String(i)),e._currentValue=String(i),s()}});A("flowx-otp-input",{observedAttributes:["length"],style:`
    :host { display: block; }
    label { display: block; font-size: var(--flowx-font-size-sm); font-weight: 600; color: #8b949e; margin-bottom: 8px; }
    .otp-row { display: flex; gap: 8px; }
    .otp-cell {
      width: 44px; height: 52px;
      text-align: center;
      font-size: 20px; font-weight: 700;
      color: #e6edf3;
      background: #0d1117;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: var(--flowx-radius-md);
      outline: none;
      caret-color: var(--flowx-primary);
      transition: border-color var(--flowx-transition), box-shadow var(--flowx-transition);
    }
    .otp-cell:focus {
      border-color: var(--flowx-primary);
      box-shadow: 0 0 0 3px rgba(0,102,204,0.2);
    }
    :host([invalid]) .otp-cell { border-color: var(--flowx-error); }
    :host([invalid]) .otp-cell:focus { box-shadow: 0 0 0 3px rgba(220,53,69,0.15); }
    .hint { font-size: var(--flowx-font-size-sm); color: #6e7681; margin-top: 6px; }
  `,template:e=>{const t=e.getAttribute("label")||"",o=e.getAttribute("hint")||"",r=parseInt(e.getAttribute("length")||"6",10),s=(e._currentValue||"").split(""),i=Array.from({length:r},(a,n)=>`
      <input class="otp-cell" type="text" inputmode="numeric" pattern="[0-9]"
        maxlength="1" autocomplete="one-time-code"
        data-index="${n}"
        value="${s[n]||""}"
        aria-label="Digit ${n+1} of ${r}"
      />
    `).join("");return`
      ${t?`<label>${t}</label>`:""}
      <div class="otp-row" role="group" aria-label="${t||"OTP Input"}">
        ${i}
      </div>
      ${o?`<div class="hint">${o}</div>`:""}
    `},setup:(e,t)=>{const r=e.shadowRoot;if(!r)return;(()=>{const i=Array.from(r.querySelectorAll(".otp-cell"));if(!i.length)return;const a=()=>i.map(l=>l.value).join(""),n=()=>{const l=a();e._currentValue=l,t.setFormValue(l||null);const d=e.hasAttribute("required"),c=parseInt(e.getAttribute("length")||"6",10);if(d&&l.length<c){try{t.setValidity({valueMissing:!0},"Please complete the OTP")}catch{}e.setAttribute("invalid","")}else{try{t.setValidity({})}catch{}e.removeAttribute("invalid")}l.length===c&&e.dispatchEvent(new CustomEvent("fx-otp-complete",{bubbles:!0,composed:!0,detail:{value:l}}))};i.forEach((l,d)=>{l.addEventListener("input",c=>{if(c.inputType==="insertFromPaste"){const p=l.value;if(p.length>1){const h=p.replace(/\D/g,"").split("");i.slice(d).forEach((f,m)=>{f.value=h[m]||""}),i[Math.min(d+h.length,i.length-1)]?.focus(),n();return}}l.value=l.value.replace(/\D/g,"").slice(-1),l.value&&d<i.length-1&&i[d+1].focus(),n()}),l.addEventListener("keydown",c=>{const u=c;u.key==="Backspace"&&!l.value&&d>0&&(i[d-1].focus(),i[d-1].value="",n()),u.key==="ArrowLeft"&&d>0&&i[d-1].focus(),u.key==="ArrowRight"&&d<i.length-1&&i[d+1].focus()}),l.addEventListener("focus",()=>l.select())})})()}});A("flowx-autocomplete",{observedAttributes:["options","placeholder","minchars"],style:`${D}
    :host { display: block; position: relative; }
    .input-wrapper { position: relative; }
    .clear-btn {
      position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
      background: none; border: none; color: #6e7681; cursor: pointer;
      font-size: 14px; padding: 2px 4px;
      display: none;
    }
    .clear-btn.visible { display: block; }
    .listbox {
      position: fixed;
      display: none;
      background: #161b22;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: var(--flowx-radius-md);
      max-height: 220px;
      overflow-y: auto;
      z-index: 200;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      min-width: 200px;
    }
    .listbox.open { display: block; }
    .option {
      padding: 9px 14px;
      cursor: pointer;
      font-size: var(--flowx-font-size-md);
      color: #c9d1d9;
      transition: background 0.15s;
      outline: none;
    }
    .option:hover, .option[aria-selected="true"] { background: rgba(255,255,255,0.06); color: #fff; }
    .option:focus { background: rgba(0,102,204,0.2); }
    .no-results { padding: 9px 14px; color: #6e7681; font-size: var(--flowx-font-size-sm); }
  `,template:e=>{const t=e.getAttribute("label")||"",o=e.getAttribute("hint")||"",r=e.getAttribute("placeholder")||"Search…",s=e.getAttribute("name")||"",i=e.hasAttribute("required"),a=e.hasAttribute("disabled")?"disabled":"",n=e._displayValue||e._currentValue||e.getAttribute("value")||"";return`
      ${t?`<label for="ac-input">${t}${i?' <span aria-hidden="true" style="color:var(--flowx-error)">*</span>':""}</label>`:""}
      <div class="input-wrapper">
        <input
          id="ac-input"
          type="text"
          name="${s}"
          value="${n}"
          placeholder="${r}"
          autocomplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-required="${i}"
          ${a}
        />
        <button class="clear-btn ${n?"visible":""}" type="button" aria-label="Clear">✕</button>
      </div>
      <div class="listbox" role="listbox" aria-label="${t||s}"></div>
      ${o?`<div class="field-hint">${o}</div>`:""}
    `},setup:(e,t)=>{const r=e.shadowRoot;if(!r)return;const s=r.querySelector("#ac-input"),i=r.querySelector(".listbox"),a=r.querySelector(".clear-btn");if(!s||!i)return;const n=()=>{const v=e.getAttribute("options")||"";if(!v)return[];try{return JSON.parse(v).map(w=>typeof w=="string"?{label:w,value:w}:w)}catch{return v.split(",").map(x=>({label:x.trim(),value:x.trim()}))}};let l=null,d=null,c=null;const u=v=>{i.innerHTML=v.length?v.map(w=>`<div class="option" role="option" tabindex="0" data-value="${w.value}" aria-selected="false">${w.label}</div>`).join(""):'<div class="no-results">No results</div>',i.classList.add("open"),s.setAttribute("aria-expanded","true"),l&&l.cleanup(),l=y(s,i,{placement:"bottom",align:"start",offset:4}),d&&d(),d=$(i,".option").cleanup,i.querySelectorAll(".option").forEach(w=>{w.addEventListener("click",()=>h(w.dataset.value||"",w.textContent||"")),w.addEventListener("keydown",C=>{const E=C;(E.key==="Enter"||E.key===" ")&&(E.preventDefault(),h(w.dataset.value||"",w.textContent||"")),E.key==="Escape"&&(p(),s.focus()),E.key==="Tab"&&p()})}),c&&c.cleanup(),c=k(e,p)},p=()=>{i.classList.remove("open"),s.setAttribute("aria-expanded","false"),l&&(l.cleanup(),l=null),d&&(d(),d=null),c&&(c.cleanup(),c=null)},h=(v,x)=>{if(e._currentValue=v,e._displayValue=x.trim(),t.setFormValue(v),s.value=x.trim(),a&&a.classList.add("visible"),p(),e.hasAttribute("required")&&!v){try{t.setValidity({valueMissing:!0},"Please select an option")}catch{}e.setAttribute("invalid","")}else{try{t.setValidity({})}catch{}e.removeAttribute("invalid")}e.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:v,label:x.trim()}}))},f=parseInt(e.getAttribute("minchars")||"0",10);s.addEventListener("input",()=>{const v=s.value.toLowerCase();if(a&&a.classList.toggle("visible",s.value.length>0),v.length<f){p();return}const x=n().filter(w=>w.label.toLowerCase().includes(v));x.length>0||v.length>0?u(x):p()}),s.addEventListener("keydown",v=>{const x=v;if(x.key==="Escape"&&p(),x.key==="ArrowDown"){const w=i.querySelector(".option");w?(x.preventDefault(),w.focus()):(x.preventDefault(),u(n()),i.querySelector(".option")?.focus())}}),a?.addEventListener("click",()=>{s.value="",e._currentValue="",e._displayValue="",t.setFormValue(null),a.classList.remove("visible"),p(),s.focus()});const m=e.getAttribute("value")||"";m&&t.setFormValue(m)}});class et extends HTMLElement{static get observedAttributes(){return["for","visible"]}connectedCallback(){this._render()}attributeChangedCallback(){this._render()}_render(){this.shadowRoot||this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.innerHTML=`
        <style>
          ${g}${X}
          :host { display: block; }
          .error {
            display: none;
            font-size: var(--flowx-font-size-sm);
            color: var(--flowx-error);
            margin-top: 4px;
            padding: 3px 0;
            animation: slideIn 0.15s ease;
          }
          :host([visible]) .error { display: flex; align-items: center; gap: 4px; }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        </style>
        <div class="error" role="alert" aria-live="polite">
          <span>⚠</span>
          <slot></slot>
        </div>
      `)}}customElements.get("flowx-form-error")||customElements.define("flowx-form-error",et);class ot extends HTMLElement{connectedCallback(){this._init()}_init(){const t=this.querySelector("form")||this;this.addEventListener("fx:afterSwap",o=>{const s=o.detail?.xhr;s&&this._handleValidationResponse(s)}),t instanceof HTMLFormElement&&t.addEventListener("submit",()=>{this.querySelectorAll("flowx-form-error").forEach(o=>{o.textContent="",o.removeAttribute("visible")}),this.querySelectorAll("[invalid]").forEach(o=>{o.removeAttribute("invalid")})})}async _handleValidationResponse(t){const o=t.headers.get("fx-validation-errors");if(o)try{const r=JSON.parse(o);tt(this,r)}catch{}}}customElements.get("flowx-form")||customElements.define("flowx-form",ot);const Y=[];let P=null,V=!1;function S(e,t){Y.push({selector:e,enhancerFn:t}),typeof document<"u"&&(z(document),rt())}function z(e=document){for(const t of Y){const o=`${t.selector}:not([data-flowx-enhanced])`,r=Array.from(e.querySelectorAll(o));for(const s of r){s.setAttribute("data-flowx-enhanced","true");const i=document.createElement("div");i.className="flowx-enhanced-input-wrapper",i.style.display="inline-block",i.style.position="relative",s.style.position="absolute",s.style.opacity="0",s.style.pointerEvents="none",s.style.width="0",s.style.height="0",s.style.margin="0",s.style.padding="0",s.style.border="none",s.parentNode?.insertBefore(i,s),i.appendChild(s);try{t.enhancerFn(s,i)}catch(a){console.error(`FlowX UI: Failed to enhance element ${t.selector}`,a)}}}}function rt(){V||typeof window>"u"||(V=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>z(document)):z(document),P=new MutationObserver(e=>{let t=!1;for(const o of e)if(o.addedNodes.length>0){t=!0;break}t&&z(document)}),P.observe(document.body||document.documentElement,{childList:!0,subtree:!0}))}function M(e,t){if(e.value===t)return;const o=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value")?.set;o?o.call(e,t):e.value=t,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0}))}function T(e,t){const o=()=>t(e.value);e.addEventListener("input",o),e.addEventListener("change",o);const r=new MutationObserver(()=>{t(e.value)});return r.observe(e,{attributes:!0,attributeFilter:["value"]}),()=>{e.removeEventListener("input",o),e.removeEventListener("change",o),r.disconnect()}}class it extends HTMLElement{static get observedAttributes(){return["value","min","max","disabled"]}nativeInput=null;currentMonth=new Date().getMonth();currentYear=new Date().getFullYear();selectedDate=null;positionerCleanup=null;outsideCleanup=null;constructor(){super(),this.attachShadow({mode:"open"})}attachToInput(t){if(this.nativeInput=t,t.value){const o=new Date(t.value+"T00:00:00");isNaN(o.getTime())||(this.selectedDate=o,this.currentMonth=o.getMonth(),this.currentYear=o.getFullYear())}T(t,o=>{if(o){const r=new Date(o+"T00:00:00");isNaN(r.getTime())||(this.selectedDate=r,this.currentMonth=r.getMonth(),this.currentYear=r.getFullYear(),this.render())}}),this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupPopover()}attributeChangedCallback(){this.render()}cleanupPopover(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=null),this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null)}formatDate(t){const o=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${o}-${r}-${s}`}formatDisplayDate(t){return t?t.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}):"Select date…"}selectDate(t){this.selectedDate=t;const o=this.formatDate(t);this.nativeInput&&M(this.nativeInput,o),this.setAttribute("value",o),this.closePopover(),this.render()}openPopover(){if(this.hasAttribute("disabled"))return;this.setAttribute("open",""),this.render();const t=this.shadowRoot?.querySelector(".trigger"),o=this.shadowRoot?.querySelector(".popover");if(t&&o){const r=y(t,o,{placement:"bottom",align:"start",offset:4});this.positionerCleanup=r.cleanup;const s=k(this,()=>this.closePopover());this.outsideCleanup=s.cleanup,this.shadowRoot?.querySelector(".day.selected, .day.today, .day")?.focus()}}closePopover(){this.removeAttribute("open"),this.cleanupPopover(),this.render()}prevMonth(){this.currentMonth===0?(this.currentMonth=11,this.currentYear--):this.currentMonth--,this.render()}nextMonth(){this.currentMonth===11?(this.currentMonth=0,this.currentYear++):this.currentMonth++,this.render()}render(){if(!this.shadowRoot)return;const t=this.hasAttribute("open"),o=this.formatDisplayDate(this.selectedDate),r=["January","February","March","April","May","June","July","August","September","October","November","December"],s=new Date(this.currentYear,this.currentMonth,1).getDay(),i=new Date(this.currentYear,this.currentMonth+1,0).getDate(),a=new Date(this.currentYear,this.currentMonth,0).getDate(),n=this.formatDate(new Date),l=this.selectedDate?this.formatDate(this.selectedDate):"";let d="";for(let c=s-1;c>=0;c--)d+=`<div class="day other-month">${a-c}</div>`;for(let c=1;c<=i;c++){const u=new Date(this.currentYear,this.currentMonth,c),p=this.formatDate(u);d+=`
        <button type="button" class="day ${p===n?"today":""} ${p===l?"selected":""}" 
          data-date="${p}" tabindex="0" aria-label="${p}">
          ${c}
        </button>
      `}this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: inline-block; font-family: var(--flowx-font-family); position: relative; }
        .trigger {
          display: inline-flex; align-items: center; gap: 8px;
          background: #0d1117; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); padding: 8px 12px;
          color: #e6edf3; font-size: var(--flowx-font-size-md);
          cursor: pointer; user-select: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .trigger:hover { border-color: rgba(255,255,255,0.25); }
        .trigger:focus-visible { outline: none; border-color: var(--flowx-primary); box-shadow: 0 0 0 3px rgba(0,102,204,0.25); }
        .icon { color: #8b949e; font-size: 14px; }
        .popover {
          display: ${t?"block":"none"};
          position: absolute; top: 100%; left: 0; z-index: 1000;
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg); padding: 12px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.5); width: 280px;
        }
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .month-label { font-weight: 600; color: #e6edf3; font-size: 14px; }
        .nav-btn { background: transparent; border: none; color: #8b949e; cursor: pointer; padding: 4px 8px; border-radius: 4px; font-size: 14px; }
        .nav-btn:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .weekdays { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 11px; font-weight: 600; color: #6e7681; margin-bottom: 6px; }
        .days-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
        .day {
          aspect-ratio: 1; border: none; background: transparent; color: #c9d1d9;
          font-size: 12px; border-radius: 6px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          outline: none; transition: background 0.1s;
        }
        .day:hover { background: rgba(255,255,255,0.08); }
        .day.other-month { opacity: 0.25; pointer-events: none; }
        .day.today { border: 1px solid var(--flowx-primary); font-weight: bold; color: var(--flowx-primary); }
        .day.selected { background: var(--flowx-primary) !important; color: white !important; font-weight: bold; }
        .day:focus-visible { box-shadow: 0 0 0 2px #58a6ff; }
      </style>

      <button type="button" class="trigger" tabindex="0" aria-label="Choose date, current date ${o}">
        <span class="icon">📅</span>
        <span>${o}</span>
      </button>

      <div class="popover" role="dialog" aria-modal="true" aria-label="Calendar">
        <div class="header">
          <button type="button" class="nav-btn prev-btn" aria-label="Previous month">◀</button>
          <span class="month-label">${r[this.currentMonth]} ${this.currentYear}</span>
          <button type="button" class="nav-btn next-btn" aria-label="Next month">▶</button>
        </div>
        <div class="weekdays">
          <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
        </div>
        <div class="days-grid">
          ${d}
        </div>
      </div>
    `,this.setupListeners()}setupListeners(){this.shadowRoot?.querySelector(".trigger")?.addEventListener("click",()=>{this.hasAttribute("open")?this.closePopover():this.openPopover()}),this.shadowRoot?.querySelector(".prev-btn")?.addEventListener("click",()=>this.prevMonth()),this.shadowRoot?.querySelector(".next-btn")?.addEventListener("click",()=>this.nextMonth()),this.shadowRoot?.querySelectorAll(".day[data-date]")?.forEach(i=>{i.addEventListener("click",a=>{const l=a.currentTarget.getAttribute("data-date");if(l){const d=new Date(l+"T00:00:00");this.selectDate(d)}}),i.addEventListener("keydown",a=>{const n=a;if(n.key==="ArrowRight"||n.key==="ArrowLeft"||n.key==="ArrowUp"||n.key==="ArrowDown"||n.key==="PageUp"||n.key==="PageDown"){n.preventDefault();const d=a.currentTarget.getAttribute("data-date");if(!d)return;const c=new Date(d+"T00:00:00");n.key==="ArrowRight"&&c.setDate(c.getDate()+1),n.key==="ArrowLeft"&&c.setDate(c.getDate()-1),n.key==="ArrowDown"&&c.setDate(c.getDate()+7),n.key==="ArrowUp"&&c.setDate(c.getDate()-7),n.key==="PageUp"&&c.setMonth(c.getMonth()-1),n.key==="PageDown"&&c.setMonth(c.getMonth()+1),this.currentMonth=c.getMonth(),this.currentYear=c.getFullYear(),this.render();const u=this.formatDate(c);this.shadowRoot?.querySelector(`.day[data-date="${u}"]`)?.focus()}})})}}customElements.get("flowx-date-picker")||customElements.define("flowx-date-picker",it);S('input[type="date"]',(e,t)=>{const o=document.createElement("flowx-date-picker");t.appendChild(o),o.attachToInput(e)});class st extends HTMLElement{static get observedAttributes(){return["value","disabled"]}nativeInput=null;selectedHour=12;selectedMinute=0;period="PM";positionerCleanup=null;outsideCleanup=null;constructor(){super(),this.attachShadow({mode:"open"})}attachToInput(t){this.nativeInput=t,t.value&&this.parseTime(t.value),T(t,o=>{o&&(this.parseTime(o),this.render())}),this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupPopover()}attributeChangedCallback(){this.render()}parseTime(t){const o=t.split(":");if(o.length>=2){let r=parseInt(o[0],10);const s=parseInt(o[1],10);!isNaN(r)&&!isNaN(s)&&(this.period=r>=12?"PM":"AM",r=r%12,r===0&&(r=12),this.selectedHour=r,this.selectedMinute=s)}}cleanupPopover(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=null),this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null)}formatTime24(){let t=this.selectedHour;this.period==="PM"&&t<12&&(t+=12),this.period==="AM"&&t===12&&(t=0);const o=String(t).padStart(2,"0"),r=String(this.selectedMinute).padStart(2,"0");return`${o}:${r}`}formatDisplayTime(){const t=String(this.selectedHour).padStart(2,"0"),o=String(this.selectedMinute).padStart(2,"0");return`${t}:${o} ${this.period}`}commitTime(){const t=this.formatTime24();this.nativeInput&&M(this.nativeInput,t),this.setAttribute("value",t)}openPopover(){if(this.hasAttribute("disabled"))return;this.setAttribute("open",""),this.render();const t=this.shadowRoot?.querySelector(".trigger"),o=this.shadowRoot?.querySelector(".popover");if(t&&o){const r=y(t,o,{placement:"bottom",align:"start",offset:4});this.positionerCleanup=r.cleanup;const s=k(this,()=>this.closePopover());this.outsideCleanup=s.cleanup}}closePopover(){this.removeAttribute("open"),this.cleanupPopover(),this.render()}render(){if(!this.shadowRoot)return;const t=this.hasAttribute("open"),o=this.formatDisplayTime(),r=Array.from({length:12},(n,l)=>l+1),s=[0,5,10,15,20,25,30,35,40,45,50,55],i=r.map(n=>`
      <button type="button" class="option ${n===this.selectedHour?"selected":""}" data-type="hour" data-val="${n}">
        ${String(n).padStart(2,"0")}
      </button>
    `).join(""),a=s.map(n=>`
      <button type="button" class="option ${n===this.selectedMinute?"selected":""}" data-type="minute" data-val="${n}">
        ${String(n).padStart(2,"0")}
      </button>
    `).join("");this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: inline-block; font-family: var(--flowx-font-family); position: relative; }
        .trigger {
          display: inline-flex; align-items: center; gap: 8px;
          background: #0d1117; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); padding: 8px 12px;
          color: #e6edf3; font-size: var(--flowx-font-size-md);
          cursor: pointer; user-select: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .trigger:hover { border-color: rgba(255,255,255,0.25); }
        .trigger:focus-visible { outline: none; border-color: var(--flowx-primary); box-shadow: 0 0 0 3px rgba(0,102,204,0.25); }
        .icon { color: #8b949e; font-size: 14px; }
        .popover {
          display: ${t?"block":"none"};
          position: absolute; top: 100%; left: 0; z-index: 1000;
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg); padding: 12px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.5); width: 240px;
        }
        .picker-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; max-height: 180px; }
        .column { display: flex; flex-direction: column; overflow-y: auto; max-height: 160px; gap: 2px; padding-right: 4px; }
        .column::-webkit-scrollbar { width: 4px; }
        .column::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 2px; }
        .column-header { font-size: 11px; font-weight: 600; color: #6e7681; margin-bottom: 4px; text-align: center; }
        .option {
          border: none; background: transparent; color: #c9d1d9;
          padding: 6px; font-size: 13px; border-radius: 4px; cursor: pointer;
          text-align: center; transition: background 0.1s;
        }
        .option:hover { background: rgba(255,255,255,0.08); }
        .option.selected { background: var(--flowx-primary); color: white; font-weight: bold; }
        .period-toggle { display: flex; gap: 4px; margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px; }
        .period-btn { flex: 1; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #8b949e; padding: 5px; border-radius: 4px; font-size: 12px; cursor: pointer; font-weight: 600; }
        .period-btn.active { background: rgba(255,255,255,0.12); color: #fff; border-color: var(--flowx-primary); }
      </style>

      <button type="button" class="trigger" tabindex="0" aria-label="Choose time, current time ${o}">
        <span class="icon">🕒</span>
        <span>${o}</span>
      </button>

      <div class="popover" role="dialog" aria-modal="true" aria-label="Time picker">
        <div class="picker-grid">
          <div>
            <div class="column-header">Hours</div>
            <div class="column">${i}</div>
          </div>
          <div>
            <div class="column-header">Minutes</div>
            <div class="column">${a}</div>
          </div>
        </div>
        <div class="period-toggle">
          <button type="button" class="period-btn ${this.period==="AM"?"active":""}" data-period="AM">AM</button>
          <button type="button" class="period-btn ${this.period==="PM"?"active":""}" data-period="PM">PM</button>
        </div>
      </div>
    `,this.setupListeners()}setupListeners(){this.shadowRoot?.querySelector(".trigger")?.addEventListener("click",()=>{this.hasAttribute("open")?this.closePopover():this.openPopover()}),this.shadowRoot?.querySelectorAll(".option")?.forEach(s=>{s.addEventListener("click",i=>{const a=i.currentTarget,n=a.getAttribute("data-type"),l=parseInt(a.getAttribute("data-val")||"0",10);n==="hour"&&(this.selectedHour=l),n==="minute"&&(this.selectedMinute=l),this.commitTime(),this.render()})}),this.shadowRoot?.querySelectorAll(".period-btn")?.forEach(s=>{s.addEventListener("click",i=>{const n=i.currentTarget.getAttribute("data-period");n&&(this.period=n,this.commitTime(),this.render())})})}}customElements.get("flowx-time-picker")||customElements.define("flowx-time-picker",st);S('input[type="time"]',(e,t)=>{const o=document.createElement("flowx-time-picker");t.appendChild(o),o.attachToInput(e)});class at extends HTMLElement{static get observedAttributes(){return["value","disabled"]}nativeInput=null;currentMonth=new Date().getMonth();currentYear=new Date().getFullYear();selectedDate=null;selectedHour=12;selectedMinute=0;period="PM";positionerCleanup=null;outsideCleanup=null;constructor(){super(),this.attachShadow({mode:"open"})}attachToInput(t){this.nativeInput=t,t.value&&this.parseDateTime(t.value),T(t,o=>{o&&(this.parseDateTime(o),this.render())}),this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupPopover()}attributeChangedCallback(){this.render()}parseDateTime(t){const o=new Date(t);if(!isNaN(o.getTime())){this.selectedDate=o,this.currentMonth=o.getMonth(),this.currentYear=o.getFullYear();let r=o.getHours();this.selectedMinute=o.getMinutes(),this.period=r>=12?"PM":"AM",r=r%12,r===0&&(r=12),this.selectedHour=r}}cleanupPopover(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=null),this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null)}formatDateISO(t){const o=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");let i=this.selectedHour;this.period==="PM"&&i<12&&(i+=12),this.period==="AM"&&i===12&&(i=0);const a=String(i).padStart(2,"0"),n=String(this.selectedMinute).padStart(2,"0");return`${o}-${r}-${s}T${a}:${n}`}formatDisplay(){if(!this.selectedDate)return"Select Date & Time…";const t=this.selectedDate.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),o=String(this.selectedHour).padStart(2,"0"),r=String(this.selectedMinute).padStart(2,"0");return`${t}, ${o}:${r} ${this.period}`}commit(){this.selectedDate||(this.selectedDate=new Date);const t=this.formatDateISO(this.selectedDate);this.nativeInput&&M(this.nativeInput,t),this.setAttribute("value",t)}openPopover(){if(this.hasAttribute("disabled"))return;this.setAttribute("open",""),this.render();const t=this.shadowRoot?.querySelector(".trigger"),o=this.shadowRoot?.querySelector(".popover");if(t&&o){const r=y(t,o,{placement:"bottom",align:"start",offset:4});this.positionerCleanup=r.cleanup;const s=k(this,()=>this.closePopover());this.outsideCleanup=s.cleanup}}closePopover(){this.removeAttribute("open"),this.cleanupPopover(),this.render()}prevMonth(){this.currentMonth===0?(this.currentMonth=11,this.currentYear--):this.currentMonth--,this.render()}nextMonth(){this.currentMonth===11?(this.currentMonth=0,this.currentYear++):this.currentMonth++,this.render()}render(){if(!this.shadowRoot)return;const t=this.hasAttribute("open"),o=this.formatDisplay(),r=["January","February","March","April","May","June","July","August","September","October","November","December"],s=new Date(this.currentYear,this.currentMonth,1).getDay(),i=new Date(this.currentYear,this.currentMonth+1,0).getDate(),a=new Date(this.currentYear,this.currentMonth,0).getDate(),n=f=>{const m=this.currentYear,v=String(this.currentMonth+1).padStart(2,"0"),x=String(f).padStart(2,"0");return`${m}-${v}-${x}`},l=this.selectedDate?`${this.selectedDate.getFullYear()}-${String(this.selectedDate.getMonth()+1).padStart(2,"0")}-${String(this.selectedDate.getDate()).padStart(2,"0")}`:"";let d="";for(let f=s-1;f>=0;f--)d+=`<div class="day other-month">${a-f}</div>`;for(let f=1;f<=i;f++){const m=n(f);d+=`
        <button type="button" class="day ${m===l?"selected":""}" 
          data-date="${m}" tabindex="0">
          ${f}
        </button>
      `}const c=Array.from({length:12},(f,m)=>m+1),u=[0,15,30,45],p=c.map(f=>`
      <button type="button" class="time-opt ${f===this.selectedHour?"selected":""}" data-type="hour" data-val="${f}">
        ${String(f).padStart(2,"0")}
      </button>
    `).join(""),h=u.map(f=>`
      <button type="button" class="time-opt ${f===this.selectedMinute?"selected":""}" data-type="minute" data-val="${f}">
        ${String(f).padStart(2,"0")}
      </button>
    `).join("");this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: inline-block; font-family: var(--flowx-font-family); position: relative; }
        .trigger {
          display: inline-flex; align-items: center; gap: 8px;
          background: #0d1117; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); padding: 8px 12px;
          color: #e6edf3; font-size: var(--flowx-font-size-md);
          cursor: pointer; user-select: none;
        }
        .trigger:hover { border-color: rgba(255,255,255,0.25); }
        .trigger:focus-visible { outline: none; border-color: var(--flowx-primary); box-shadow: 0 0 0 3px rgba(0,102,204,0.25); }
        .icon { color: #8b949e; font-size: 14px; }
        .popover {
          display: ${t?"flex":"none"}; flex-direction: column; gap: 12px;
          position: absolute; top: 100%; left: 0; z-index: 1000;
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg); padding: 12px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.5); width: 340px;
        }
        .columns { display: grid; grid-template-columns: 1fr 100px; gap: 12px; }
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .month-label { font-weight: 600; color: #e6edf3; font-size: 13px; }
        .nav-btn { background: transparent; border: none; color: #8b949e; cursor: pointer; padding: 4px; font-size: 12px; }
        .weekdays { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 10px; font-weight: 600; color: #6e7681; margin-bottom: 4px; }
        .days-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
        .day {
          aspect-ratio: 1; border: none; background: transparent; color: #c9d1d9;
          font-size: 11px; border-radius: 4px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .day:hover { background: rgba(255,255,255,0.08); }
        .day.other-month { opacity: 0.2; pointer-events: none; }
        .day.selected { background: var(--flowx-primary); color: white; font-weight: bold; }
        .time-panel { border-left: 1px solid rgba(255,255,255,0.1); padding-left: 10px; display: flex; flex-direction: column; gap: 6px; }
        .time-header { font-size: 11px; font-weight: 600; color: #6e7681; text-align: center; }
        .time-list { display: flex; flex-direction: column; gap: 2px; max-height: 140px; overflow-y: auto; }
        .time-opt { border: none; background: transparent; color: #c9d1d9; padding: 4px; font-size: 11px; border-radius: 3px; cursor: pointer; text-align: center; }
        .time-opt:hover { background: rgba(255,255,255,0.08); }
        .time-opt.selected { background: var(--flowx-primary); color: white; }
        .period-toggle { display: flex; gap: 2px; margin-top: 4px; }
        .period-btn { flex: 1; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #8b949e; padding: 3px; font-size: 10px; cursor: pointer; }
        .period-btn.active { background: rgba(255,255,255,0.12); color: #fff; border-color: var(--flowx-primary); }
      </style>

      <button type="button" class="trigger" tabindex="0" aria-label="Choose date and time, current ${o}">
        <span class="icon">📅</span>
        <span>${o}</span>
      </button>

      <div class="popover" role="dialog" aria-modal="true">
        <div class="columns">
          <div>
            <div class="header">
              <button type="button" class="nav-btn prev-btn">◀</button>
              <span class="month-label">${r[this.currentMonth]} ${this.currentYear}</span>
              <button type="button" class="nav-btn next-btn">▶</button>
            </div>
            <div class="weekdays">
              <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            <div class="days-grid">
              ${d}
            </div>
          </div>
          <div class="time-panel">
            <div class="time-header">Time</div>
            <div class="time-list">
              ${p}
            </div>
            <div class="time-header" style="margin-top:4px">Min</div>
            <div class="time-list">
              ${h}
            </div>
            <div class="period-toggle">
              <button type="button" class="period-btn ${this.period==="AM"?"active":""}" data-period="AM">AM</button>
              <button type="button" class="period-btn ${this.period==="PM"?"active":""}" data-period="PM">PM</button>
            </div>
          </div>
        </div>
      </div>
    `,this.setupListeners()}setupListeners(){this.shadowRoot?.querySelector(".trigger")?.addEventListener("click",()=>{this.hasAttribute("open")?this.closePopover():this.openPopover()}),this.shadowRoot?.querySelector(".prev-btn")?.addEventListener("click",()=>this.prevMonth()),this.shadowRoot?.querySelector(".next-btn")?.addEventListener("click",()=>this.nextMonth()),this.shadowRoot?.querySelectorAll(".day[data-date]")?.forEach(o=>{o.addEventListener("click",r=>{const i=r.currentTarget.getAttribute("data-date");i&&(this.selectedDate=new Date(i+"T00:00:00"),this.commit(),this.render())})}),this.shadowRoot?.querySelectorAll(".time-opt")?.forEach(o=>{o.addEventListener("click",r=>{const s=r.currentTarget,i=s.getAttribute("data-type"),a=parseInt(s.getAttribute("data-val")||"0",10);i==="hour"&&(this.selectedHour=a),i==="minute"&&(this.selectedMinute=a),this.commit(),this.render()})}),this.shadowRoot?.querySelectorAll(".period-btn")?.forEach(o=>{o.addEventListener("click",r=>{const i=r.currentTarget.getAttribute("data-period");i&&(this.period=i,this.commit(),this.render())})})}}customElements.get("flowx-datetime-picker")||customElements.define("flowx-datetime-picker",at);S('input[type="datetime-local"]',(e,t)=>{const o=document.createElement("flowx-datetime-picker");t.appendChild(o),o.attachToInput(e)});class nt extends HTMLElement{static get observedAttributes(){return["value","disabled"]}nativeInput=null;selectedColor="#0066cc";positionerCleanup=null;outsideCleanup=null;presets=["#0066cc","#0052a3","#1f6feb","#3fb950","#2ea043","#da3633","#f85149","#d29922","#db6d28","#a371f7","#8b949e","#6e7681","#484f58","#0d1117","#ffffff"];constructor(){super(),this.attachShadow({mode:"open"})}attachToInput(t){this.nativeInput=t,t.value&&(this.selectedColor=t.value),T(t,o=>{o&&(this.selectedColor=o,this.render())}),this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupPopover()}attributeChangedCallback(){this.render()}cleanupPopover(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=null),this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null)}selectColor(t){this.selectedColor=t,this.nativeInput&&M(this.nativeInput,t),this.setAttribute("value",t),this.render()}openPopover(){if(this.hasAttribute("disabled"))return;this.setAttribute("open",""),this.render();const t=this.shadowRoot?.querySelector(".trigger"),o=this.shadowRoot?.querySelector(".popover");if(t&&o){const r=y(t,o,{placement:"bottom",align:"start",offset:4});this.positionerCleanup=r.cleanup;const s=k(this,()=>this.closePopover());this.outsideCleanup=s.cleanup}}closePopover(){this.removeAttribute("open"),this.cleanupPopover(),this.render()}render(){if(!this.shadowRoot)return;const t=this.hasAttribute("open"),o=this.presets.map(r=>`
      <button type="button" class="swatch ${r===this.selectedColor?"selected":""}" 
        data-color="${r}" style="background-color: ${r}" aria-label="Color ${r}">
      </button>
    `).join("");this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: inline-block; font-family: var(--flowx-font-family); position: relative; }
        .trigger {
          display: inline-flex; align-items: center; gap: 8px;
          background: #0d1117; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); padding: 6px 10px;
          color: #e6edf3; font-size: var(--flowx-font-size-sm); font-weight: 500;
          cursor: pointer; user-select: none;
        }
        .trigger:hover { border-color: rgba(255,255,255,0.25); }
        .trigger:focus-visible { outline: none; border-color: var(--flowx-primary); box-shadow: 0 0 0 3px rgba(0,102,204,0.25); }
        .swatch-preview {
          width: 18px; height: 18px; border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.2);
        }
        .hex-label { font-family: monospace; font-size: 12px; color: #c9d1d9; }
        .popover {
          display: ${t?"block":"none"};
          position: absolute; top: 100%; left: 0; z-index: 1000;
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg); padding: 12px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.5); width: 220px;
        }
        .section-title { font-size: 11px; font-weight: 600; color: #6e7681; margin-bottom: 8px; }
        .presets-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; margin-bottom: 12px; }
        .swatch {
          width: 100%; aspect-ratio: 1; border: 1px solid rgba(255,255,255,0.15);
          border-radius: 4px; cursor: pointer; transition: transform 0.1s, box-shadow 0.1s;
        }
        .swatch:hover { transform: scale(1.15); z-index: 1; }
        .swatch.selected { box-shadow: 0 0 0 2px #fff, 0 0 0 4px var(--flowx-primary); }
        .hex-input-row { display: flex; align-items: center; gap: 8px; }
        .custom-hex {
          flex: 1; background: #0d1117; border: 1px solid rgba(255,255,255,0.12);
          border-radius: 4px; color: #e6edf3; font-family: monospace;
          padding: 6px 8px; font-size: 12px; outline: none;
        }
        .custom-hex:focus { border-color: var(--flowx-primary); }
      </style>

      <button type="button" class="trigger" aria-label="Color picker, selected ${this.selectedColor}">
        <div class="swatch-preview" style="background-color: ${this.selectedColor}"></div>
        <span class="hex-label">${this.selectedColor}</span>
      </button>

      <div class="popover" role="dialog" aria-modal="true" aria-label="Color Palette">
        <div class="section-title">Design System Presets</div>
        <div class="presets-grid">
          ${o}
        </div>
        <div class="section-title">Custom HEX</div>
        <div class="hex-input-row">
          <input type="text" class="custom-hex" value="${this.selectedColor}" maxlength="7" spellcheck="false" />
        </div>
      </div>
    `,this.setupListeners()}setupListeners(){this.shadowRoot?.querySelector(".trigger")?.addEventListener("click",()=>{this.hasAttribute("open")?this.closePopover():this.openPopover()}),this.shadowRoot?.querySelectorAll(".swatch")?.forEach(r=>{r.addEventListener("click",s=>{const a=s.currentTarget.getAttribute("data-color");a&&this.selectColor(a)})});const o=this.shadowRoot?.querySelector(".custom-hex");o?.addEventListener("change",()=>{let r=o.value.trim();r.startsWith("#")||(r="#"+r),/^#[0-9A-Fa-f]{6}$/.test(r)&&this.selectColor(r)})}}customElements.get("flowx-color-picker")||customElements.define("flowx-color-picker",nt);S('input[type="color"]',(e,t)=>{const o=document.createElement("flowx-color-picker");t.appendChild(o),o.attachToInput(e)});class B extends HTMLElement{nativeInput=null;fileList=[];uploadProgresses={};constructor(){super(),this.attachShadow({mode:"open"})}attachToInput(t){this.nativeInput=t,t.addEventListener("change",()=>{t.files&&(this.fileList=Array.from(t.files),this.render())}),document.addEventListener("fx:beforeRequest",o=>{const s=o.detail?.xhr;s&&s.upload&&s.upload.addEventListener("progress",i=>{if(i.lengthComputable){const a=Math.round(i.loaded/i.total*100);this.fileList.forEach(n=>{this.uploadProgresses[n.name]=a}),this.render()}})}),this.render()}connectedCallback(){this.render()}removeFile(t){if(this.fileList.splice(t,1),this.nativeInput){const o=new DataTransfer;this.fileList.forEach(r=>o.items.add(r)),this.nativeInput.files=o.files,this.nativeInput.dispatchEvent(new Event("input",{bubbles:!0})),this.nativeInput.dispatchEvent(new Event("change",{bubbles:!0}))}this.render()}handleDrop(t){if(t.preventDefault(),this.removeAttribute("dragging"),t.dataTransfer&&t.dataTransfer.files.length>0){const o=Array.from(t.dataTransfer.files);if(this.nativeInput?.hasAttribute("multiple")?this.fileList=[...this.fileList,...o]:this.fileList=[o[0]],this.nativeInput){const s=new DataTransfer;this.fileList.forEach(i=>s.items.add(i)),this.nativeInput.files=s.files,this.nativeInput.dispatchEvent(new Event("input",{bubbles:!0})),this.nativeInput.dispatchEvent(new Event("change",{bubbles:!0}))}this.render()}}render(){if(!this.shadowRoot)return;const t=this.hasAttribute("dragging"),o=this.fileList.map((r,s)=>{const i=this.uploadProgresses[r.name]??0,a=(r.size/(1024*1024)).toFixed(2);return`
        <div class="file-item">
          <div class="file-info">
            <span class="file-icon">📄</span>
            <div class="file-details">
              <span class="file-name">${r.name}</span>
              <span class="file-size">${a} MB</span>
            </div>
            <button type="button" class="remove-btn" data-index="${s}" title="Remove file">✕</button>
          </div>
          ${i>0&&i<100?`
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${i}%"></div>
            </div>
          `:""}
        </div>
      `}).join("");this.shadowRoot.innerHTML=`
      <style>
        ${g}
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

      <div class="dropzone ${t?"dragging":""}" id="dropzone" tabindex="0" role="button" aria-label="Upload files">
        <div class="upload-icon">☁️</div>
        <div class="drop-title">Drag & drop files here, or <span style="color:var(--flowx-primary);text-decoration:underline;">browse</span></div>
        <div class="drop-subtitle">Participates directly in native FormData multipart form submissions</div>
      </div>

      ${this.fileList.length>0?`
        <div class="file-list">
          ${o}
        </div>
      `:""}
    `,this.setupListeners()}setupListeners(){const t=this.shadowRoot?.querySelector("#dropzone");t?.addEventListener("click",()=>{this.nativeInput?.click()}),t?.addEventListener("dragover",o=>{o.preventDefault(),this.setAttribute("dragging","")}),t?.addEventListener("dragleave",()=>{this.removeAttribute("dragging")}),t?.addEventListener("drop",o=>{this.handleDrop(o)}),this.shadowRoot?.querySelectorAll(".remove-btn")?.forEach(o=>{o.addEventListener("click",r=>{r.stopPropagation();const s=parseInt(r.currentTarget.getAttribute("data-index")||"0",10);this.removeFile(s)})})}}customElements.get("flowx-file-upload")||customElements.define("flowx-file-upload",B);S('input[type="file"]:not([accept*="image"])',(e,t)=>{const o=document.createElement("flowx-file-upload");t.appendChild(o),o.attachToInput(e)});class lt extends B{previews={};attachToInput(t){super.attachToInput(t)}render(){if(!this.shadowRoot)return;this.fileList.forEach(r=>{if(r.type.startsWith("image/")&&!this.previews[r.name]){const s=new FileReader;s.onload=i=>{this.previews[r.name]=i.target?.result,this.render()},s.readAsDataURL(r)}});const t=this.hasAttribute("dragging"),o=this.fileList.map((r,s)=>{const i=this.previews[r.name]||"",a=(r.size/(1024*1024)).toFixed(2),n=this.uploadProgresses[r.name]??0;return`
        <div class="image-card">
          <div class="thumbnail-wrapper">
            ${i?`<img src="${i}" alt="${r.name}" class="thumbnail" />`:'<span class="placeholder-icon">🖼️</span>'}
          </div>
          <div class="image-details">
            <span class="image-name">${r.name}</span>
            <span class="image-size">${a} MB</span>
          </div>
          <button type="button" class="remove-btn" data-index="${s}" title="Remove image">✕</button>
          ${n>0&&n<100?`
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${n}%"></div>
            </div>
          `:""}
        </div>
      `}).join("");this.shadowRoot.innerHTML=`
      <style>
        ${g}
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

      <div class="dropzone ${t?"dragging":""}" id="dropzone" tabindex="0" role="button" aria-label="Upload images">
        <div class="upload-icon">🖼️</div>
        <div class="drop-title">Drop images here, or <span style="color:var(--flowx-primary);text-decoration:underline;">browse</span></div>
        <div class="drop-subtitle">Supports instant thumbnail previews & progressive enhancement</div>
      </div>

      ${this.fileList.length>0?`
        <div class="image-grid">
          ${o}
        </div>
      `:""}
    `,this.setupListeners()}}customElements.get("flowx-image-upload")||customElements.define("flowx-image-upload",lt);S('input[type="file"][accept*="image"]',(e,t)=>{const o=document.createElement("flowx-image-upload");t.appendChild(o),o.attachToInput(e)});class dt extends HTMLElement{static get observedAttributes(){return["name","width","height","pen-color","bg-color"]}canvas=null;ctx=null;hiddenInput=null;isDrawing=!1;hasStrokes=!1;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.ensureHiddenInput()}attributeChangedCallback(){this.render()}ensureHiddenInput(){const t=this.getAttribute("name")||"signature";let o=this.querySelector(`input[type="hidden"][name="${t}"]`);o||(o=document.createElement("input"),o.type="hidden",o.name=t,this.appendChild(o)),this.hiddenInput=o;const r=this.closest("form");r&&r.addEventListener("submit",()=>this.syncToHiddenInput())}syncToHiddenInput(){if(!(!this.hiddenInput||!this.canvas))if(this.hasStrokes){const t=this.canvas.toDataURL("image/png");this.hiddenInput.value=t,this.hiddenInput.dispatchEvent(new Event("input",{bubbles:!0})),this.hiddenInput.dispatchEvent(new Event("change",{bubbles:!0}))}else this.hiddenInput.value=""}clear(){if(!this.canvas||!this.ctx)return;const t=this.canvas.width,o=this.canvas.height,r=this.getAttribute("bg-color")||"#0d1117";this.ctx.fillStyle=r,this.ctx.fillRect(0,0,t,o),this.hasStrokes=!1,this.syncToHiddenInput()}startDrawing(t){if(!this.canvas||!this.ctx)return;this.isDrawing=!0;const o=this.canvas.getBoundingClientRect(),r="touches"in t?t.touches[0].clientX:t.clientX,s="touches"in t?t.touches[0].clientY:t.clientY;this.ctx.beginPath(),this.ctx.moveTo(r-o.left,s-o.top)}draw(t){if(!this.isDrawing||!this.canvas||!this.ctx)return;t.preventDefault();const o=this.canvas.getBoundingClientRect(),r="touches"in t?t.touches[0].clientX:t.clientX,s="touches"in t?t.touches[0].clientY:t.clientY,i=this.getAttribute("pen-color")||"#58a6ff";this.ctx.strokeStyle=i,this.ctx.lineWidth=2.5,this.ctx.lineCap="round",this.ctx.lineJoin="round",this.ctx.lineTo(r-o.left,s-o.top),this.ctx.stroke(),this.hasStrokes=!0}stopDrawing(){this.isDrawing&&(this.isDrawing=!1,this.syncToHiddenInput())}render(){if(!this.shadowRoot)return;const t=parseInt(this.getAttribute("width")||"400",10),o=parseInt(this.getAttribute("height")||"160",10);if(this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: block; font-family: var(--flowx-font-family); }
        .pad-container {
          display: flex; flex-direction: column; gap: 8px;
          background: #161b22; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-lg); padding: 12px;
          max-width: ${t+24}px;
        }
        .header { display: flex; align-items: center; justify-content: space-between; }
        .title { font-size: 13px; font-weight: 600; color: #e6edf3; }
        .note { font-size: 10px; color: #6e7681; }
        canvas {
          border: 1px dashed rgba(255,255,255,0.2); border-radius: var(--flowx-radius-md);
          background: #0d1117; cursor: crosshair; touch-action: none;
        }
        .controls { display: flex; justify-content: flex-end; gap: 8px; }
        .btn-clear {
          background: transparent; border: 1px solid rgba(255,255,255,0.15);
          color: #8b949e; border-radius: 4px; padding: 4px 10px;
          font-size: 11px; cursor: pointer; font-weight: 500;
        }
        .btn-clear:hover { color: #f85149; border-color: #f85149; background: rgba(248,81,73,0.1); }
      </style>

      <div class="pad-container">
        <div class="header">
          <span class="title">✍️ Signature</span>
          <span class="note">Requires JS for canvas drawing</span>
        </div>
        <canvas width="${t}" height="${o}"></canvas>
        <div class="controls">
          <button type="button" class="btn-clear">Clear</button>
        </div>
      </div>
    `,this.canvas=this.shadowRoot.querySelector("canvas"),this.canvas&&typeof this.canvas.getContext=="function")try{this.ctx=this.canvas.getContext("2d"),this.clear(),this.setupCanvasListeners()}catch{}}setupCanvasListeners(){if(!this.canvas)return;this.canvas.addEventListener("mousedown",o=>this.startDrawing(o)),this.canvas.addEventListener("mousemove",o=>this.draw(o)),window.addEventListener("mouseup",()=>this.stopDrawing()),this.canvas.addEventListener("touchstart",o=>this.startDrawing(o),{passive:!1}),this.canvas.addEventListener("touchmove",o=>this.draw(o),{passive:!1}),window.addEventListener("touchend",()=>this.stopDrawing()),this.shadowRoot?.querySelector(".btn-clear")?.addEventListener("click",()=>this.clear())}}customElements.get("flowx-signature-pad")||customElements.define("flowx-signature-pad",dt);class ct{element;state;options;activeAbortController=null;constructor(t,o={}){this.element=t,this.options={endpoint:t.getAttribute("fx-endpoint")||t.getAttribute("fx-get")||"",target:t.getAttribute("fx-target")||"tbody",swap:t.getAttribute("fx-swap")||"innerHTML",mode:t.getAttribute("mode")||"server",...o};const r=parseInt(t.getAttribute("page")||"1",10),s=parseInt(t.getAttribute("limit")||t.getAttribute("per-page")||"10",10);this.state={page:isNaN(r)?1:r,limit:isNaN(s)?10:s,sort:t.getAttribute("sort")||"",dir:t.getAttribute("dir")||"",search:t.getAttribute("search")||"",groupBy:t.getAttribute("group-by")||"",filters:{}}}getState(){return{...this.state,filters:{...this.state.filters}}}setMode(t){this.options.mode=t}getMode(){return this.options.mode||"server"}toQueryString(){const t=new URLSearchParams;this.state.page>1&&t.set("page",String(this.state.page)),this.state.limit&&t.set("limit",String(this.state.limit)),this.state.sort&&t.set("sort",this.state.sort),this.state.dir&&t.set("dir",this.state.dir),this.state.search&&t.set("q",this.state.search),this.state.groupBy&&t.set("group_by",this.state.groupBy);for(const[r,s]of Object.entries(this.state.filters))s&&t.set(`filter_${r}`,s);const o=t.toString();return o?`?${o}`:""}updateAndRefetch(t){return t.filters&&(this.state.filters={...this.state.filters,...t.filters}),t.page!==void 0&&(this.state.page=t.page),t.limit!==void 0&&(this.state.limit=t.limit),t.sort!==void 0&&(this.state.sort=t.sort),t.dir!==void 0&&(this.state.dir=t.dir),t.search!==void 0&&(this.state.search=t.search),t.groupBy!==void 0&&(this.state.groupBy=t.groupBy),this.options.onStateChange&&this.options.onStateChange(this.getState()),this.options.mode==="client"?(this.applyClientSideState(),Promise.resolve()):this.triggerServerRefetch()}triggerServerRefetch(){const t=this.options.endpoint||this.element.getAttribute("fx-endpoint")||this.element.getAttribute("fx-get")||"";if(!t)return Promise.resolve();this.activeAbortController&&this.activeAbortController.abort(),this.activeAbortController=new AbortController;const o=this.toQueryString(),r=t.includes("?")?`${t}&${o.slice(1)}`:`${t}${o}`;let s=null;this.options.target&&(s=this.element.querySelector(this.options.target)||document.querySelector(this.options.target)),s||(s=this.element);const i=this.options.swap||"innerHTML";if(window.FlowX&&typeof window.FlowX.process=="function"){const a=document.createElement("div");a.setAttribute("fx-get",r),a.setAttribute("fx-target",this.options.target||""),a.setAttribute("fx-swap",i)}return fetch(r,{signal:this.activeAbortController.signal}).then(a=>a.text()).then(a=>{i==="beforeend"?s.insertAdjacentHTML("beforeend",a):i==="afterbegin"?s.insertAdjacentHTML("afterbegin",a):s.innerHTML=a,window.FlowX&&typeof window.FlowX.process=="function"&&window.FlowX.process(s)}).catch(a=>{a.name!=="AbortError"&&console.error("FlowX DataGrid: Refetch error",a)})}applyClientSideState(){const t=this.element.querySelector("table");if(!t)return;const o=t.querySelector("tbody");if(!o)return;const r=Array.from(o.querySelectorAll("tr"));if(this.state.search){const i=this.state.search.toLowerCase();r.forEach(a=>{const n=a.textContent?.toLowerCase()||"";a.style.display=n.includes(i)?"":"none"})}else r.forEach(i=>{i.style.display=""});const s=r.filter(i=>i.style.display!=="none");if(this.state.sort&&this.state.dir){const i=this.findColumnIndex(t,this.state.sort);i!==-1&&(s.sort((a,n)=>{const l=a.children[i]?.textContent?.trim()||"",d=n.children[i]?.textContent?.trim()||"",c=Number(l),u=Number(d);let p=0;return!isNaN(c)&&!isNaN(u)?p=c-u:p=l.localeCompare(d),this.state.dir==="asc"?p:-p}),s.forEach(a=>o.appendChild(a)))}}findColumnIndex(t,o){return Array.from(t.querySelectorAll("th")).findIndex(s=>s.getAttribute("fx-sort")===o||s.getAttribute("data-field")===o||s.textContent?.trim().toLowerCase()===o.toLowerCase())}}function U(e,t){return new ct(e,t)}function pt(e,t="export.csv"){const o=Array.from(e.querySelectorAll("tr")),r=[];for(const a of o){const l=Array.from(a.querySelectorAll("th, td")).map(d=>`"${d.textContent?.trim().replace(/"/g,'""')||""}"`).join(",");r.push(l)}const s="data:text/csv;charset=utf-8,"+encodeURIComponent(r.join(`
`)),i=document.createElement("a");i.setAttribute("href",s),i.setAttribute("download",t),document.body.appendChild(i),i.click(),i.remove()}class W extends HTMLElement{manager=null;static get observedAttributes(){return["fx-endpoint","fx-target","fx-swap","mode","sort","dir","page","limit"]}connectedCallback(){this.initManager(),this.setupHeaderSortTriggers()}attributeChangedCallback(t,o,r){o!==r&&t==="mode"&&this.manager&&this.manager.setMode(r)}initManager(){this.manager||(this.manager=U(this))}getQueryManager(){return this.manager}setupHeaderSortTriggers(){const t=this.querySelector("table");if(!t)return;const o=t.querySelectorAll("th");o.forEach(r=>{const s=r.getAttribute("fx-sort")||r.getAttribute("data-fx-sort");if(s){if(r.style.cursor="pointer",r.style.userSelect="none",!r.querySelector(".sort-indicator")){const i=document.createElement("span");i.className="sort-indicator",i.style.marginLeft="6px",i.style.fontSize="10px",i.style.opacity="0.5",i.textContent="⇅",r.appendChild(i)}r.addEventListener("click",()=>{if(!this.manager)return;const i=this.manager.getState();let a="asc";i.sort===s&&(i.dir==="asc"?a="desc":i.dir==="desc"?a="":a="asc"),o.forEach(l=>{const d=l.querySelector(".sort-indicator");d&&(d.textContent="⇅")});const n=r.querySelector(".sort-indicator");n&&(n.textContent=a==="asc"?"▲":a==="desc"?"▼":"⇅",n.style.opacity=a?"1":"0.5"),this.manager.updateAndRefetch({sort:a?s:"",dir:a})})}})}}customElements.get("flowx-data-table")||customElements.define("flowx-data-table",W);class ut extends W{colWidths={};connectedCallback(){super.connectedCallback(),this.setupColumnResizing(),this.setupColumnReordering()}setupColumnResizing(){const t=this.querySelector("table");if(!t)return;Array.from(t.querySelectorAll("th")).forEach((r,s)=>{if(r.querySelector(".resize-handle"))return;r.style.position="relative";const i=document.createElement("div");i.className="resize-handle",i.style.position="absolute",i.style.right="0",i.style.top="0",i.style.bottom="0",i.style.width="6px",i.style.cursor="col-resize",i.style.userSelect="none",r.appendChild(i);let a=0,n=0;const l=c=>{const u=c.clientX-a,p=Math.max(40,n+u);r.style.width=`${p}px`,this.colWidths[r.textContent?.trim()||s]=p},d=()=>{window.removeEventListener("mousemove",l),window.removeEventListener("mouseup",d)};i.addEventListener("mousedown",c=>{c.stopPropagation(),a=c.clientX,n=r.offsetWidth,window.addEventListener("mousemove",l),window.addEventListener("mouseup",d)})})}setupColumnReordering(){const t=this.querySelector("table");if(!t)return;Array.from(t.querySelectorAll("th")).forEach(r=>{r.draggable=!0,r.addEventListener("dragstart",s=>{s.dataTransfer?.setData("text/plain",r.cellIndex.toString())}),r.addEventListener("dragover",s=>{s.preventDefault()}),r.addEventListener("drop",s=>{s.preventDefault();const i=s.dataTransfer?.getData("text/plain");if(!i)return;const a=parseInt(i,10),n=r.cellIndex;a!==n&&this.reorderColumn(t,a,n)})})}reorderColumn(t,o,r){Array.from(t.querySelectorAll("tr")).forEach(i=>{const a=Array.from(i.children);a[o]&&a[r]&&(o<r?i.insertBefore(a[o],a[r].nextSibling):i.insertBefore(a[o],a[r]))})}}customElements.get("flowx-data-grid")||customElements.define("flowx-data-grid",ut);class ft extends HTMLElement{connectedCallback(){this.setupTreeToggles()}setupTreeToggles(){this.querySelectorAll("[data-fx-tree-toggle], .tree-toggle").forEach(o=>{o.addEventListener("click",r=>{r.stopPropagation();const s=o.closest("tr");if(!s)return;const i=s.getAttribute("aria-expanded")==="true",a=o.getAttribute("fx-get")||s.getAttribute("fx-get");i?(s.setAttribute("aria-expanded","false"),o.textContent="▶",this.toggleChildren(s,!1)):(s.setAttribute("aria-expanded","true"),o.textContent="▼",a&&!s.hasAttribute("data-children-loaded")?(s.setAttribute("data-children-loaded","true"),fetch(a).then(n=>n.text()).then(n=>{s.insertAdjacentHTML("afterend",n),this.setupTreeToggles()})):this.toggleChildren(s,!0))})})}toggleChildren(t,o){const r=t.getAttribute("data-row-id");if(!r)return;this.querySelectorAll(`tr[data-parent-id="${r}"]`).forEach(i=>{const a=i;a.style.display=o?"":"none",o||(a.setAttribute("aria-expanded","false"),this.toggleChildren(i,!1))})}}customElements.get("flowx-tree-table")||customElements.define("flowx-tree-table",ft);class ht extends HTMLElement{manager=null;connectedCallback(){this.manager=U(this,{target:".list-container"})}getQueryManager(){return this.manager}}customElements.get("flowx-list-view")||customElements.define("flowx-list-view",ht);class bt extends HTMLElement{items=[];itemHeight=40;renderItemFn=null;viewport=null;content=null;static get observedAttributes(){return["item-height"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.itemHeight=parseInt(this.getAttribute("item-height")||"40",10),this.render()}attributeChangedCallback(){this.itemHeight=parseInt(this.getAttribute("item-height")||"40",10),this.updateVirtualWindow()}setData(t,o){this.items=t,this.renderItemFn=o,this.updateVirtualWindow()}updateVirtualWindow(){if(!this.viewport||!this.content||!this.renderItemFn||this.items.length===0)return;const t=this.viewport.scrollTop,o=this.viewport.clientHeight||300,r=Math.max(0,Math.floor(t/this.itemHeight)-2),s=Math.min(this.items.length,Math.ceil((t+o)/this.itemHeight)+2),i=this.items.length*this.itemHeight,a=r*this.itemHeight,l=this.items.slice(r,s).map((d,c)=>`
      <div class="virtual-item" style="height: ${this.itemHeight}px; line-height: ${this.itemHeight}px;">
        ${this.renderItemFn(d,r+c)}
      </div>
    `).join("");this.content.style.height=`${i}px`,this.content.style.paddingTop=`${a}px`,this.content.style.boxSizing="border-box",this.content.innerHTML=l}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: block; font-family: var(--flowx-font-family); width: 100%; }
        .virtual-viewport {
          height: 100%; max-height: 400px; overflow-y: auto;
          background: #0d1117; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); position: relative;
        }
        .virtual-content { width: 100%; }
        .virtual-item {
          border-bottom: 1px solid rgba(255,255,255,0.06); padding: 0 12px;
          color: #e6edf3; font-size: 13px;
        }
      </style>
      <div class="virtual-viewport">
        <div class="virtual-content"></div>
      </div>
    `,this.viewport=this.shadowRoot.querySelector(".virtual-viewport"),this.content=this.shadowRoot.querySelector(".virtual-content"),this.viewport?.addEventListener("scroll",()=>this.updateVirtualWindow()))}}customElements.get("flowx-virtual-list")||customElements.define("flowx-virtual-list",bt);class gt extends HTMLElement{page=1;observer=null;isLoading=!1;static get observedAttributes(){return["fx-endpoint","fx-target","page"]}connectedCallback(){this.page=parseInt(this.getAttribute("page")||"1",10),this.render(),this.setupSentinelObserver()}disconnectedCallback(){this.observer&&(this.observer.disconnect(),this.observer=null)}setupSentinelObserver(){const t=this.shadowRoot?.querySelector(".sentinel");t&&(this.observer=new IntersectionObserver(o=>{for(const r of o)r.isIntersecting&&!this.isLoading&&this.loadNextPage()},{threshold:.1}),this.observer.observe(t))}loadNextPage(){const t=this.getAttribute("fx-endpoint")||this.getAttribute("fx-get"),o=this.getAttribute("fx-target");if(!t||!o)return;this.isLoading=!0,this.page++;const r=t.includes("?")?`${t}&page=${this.page}`:`${t}?page=${this.page}`,s=document.querySelector(o);if(!s)return;const i=this.shadowRoot?.querySelector(".spinner-box");i&&(i.style.display="block"),fetch(r).then(a=>a.text()).then(a=>{if(!a.trim()){this.observer?.disconnect(),i&&(i.style.display="none");return}s.insertAdjacentHTML("beforeend",a),window.FlowX&&typeof window.FlowX.process=="function"&&window.FlowX.process(s)}).finally(()=>{this.isLoading=!1,i&&(i.style.display="none")})}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: block; width: 100%; }
        .sentinel { height: 20px; width: 100%; margin-top: 10px; }
        .spinner-box { display: none; text-align: center; padding: 12px; font-size: 12px; color: #8b949e; }
      </style>
      <slot></slot>
      <div class="spinner-box">Loading more items…</div>
      <div class="sentinel" fx-trigger="revealed"></div>
    `)}}customElements.get("flowx-infinite-scroll")||customElements.define("flowx-infinite-scroll",gt);class mt extends HTMLElement{timer=null;static get observedAttributes(){return["placeholder","delay","for"]}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){this.shadowRoot||this.attachShadow({mode:"open"});const t=this.getAttribute("placeholder")||"Search…";this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: inline-block; font-family: var(--flowx-font-family); }
        .wrapper { position: relative; display: flex; align-items: center; }
        .icon { position: absolute; left: 10px; color: #6e7681; font-size: 13px; pointer-events: none; }
        input {
          background: #0d1117; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); color: #e6edf3;
          font-family: var(--flowx-font-family); font-size: 13px;
          padding: 7px 12px 7px 30px; outline: none; transition: border-color 0.15s;
          width: 220px;
        }
        input:focus { border-color: var(--flowx-primary); box-shadow: 0 0 0 3px rgba(0,102,204,0.2); }
      </style>

      <div class="wrapper">
        <span class="icon">🔍</span>
        <input type="search" placeholder="${t}" aria-label="${t}" />
      </div>
    `,this.setupDebounce()}setupDebounce(){const t=this.shadowRoot?.querySelector("input");if(!t)return;const o=parseInt(this.getAttribute("delay")||"300",10);t.addEventListener("input",()=>{clearTimeout(this.timer),this.timer=setTimeout(()=>{const r=t.value.trim();this.dispatchSearch(r)},o)})}dispatchSearch(t){const o=this.getAttribute("for")||this.getAttribute("target");let r=null;if(o){const s=document.querySelector(`#${o}, ${o}`);s&&typeof s.getQueryManager=="function"&&(r=s.getQueryManager())}r&&r.updateAndRefetch({search:t,page:1}),this.dispatchEvent(new CustomEvent("fx-search",{bubbles:!0,composed:!0,detail:{query:t}}))}}customElements.get("flowx-search")||customElements.define("flowx-search",mt);class xt extends HTMLElement{connectedCallback(){this.setupListeners()}setupListeners(){this.addEventListener("change",()=>this.applyFilters()),this.querySelector("form")?.addEventListener("submit",o=>{o.preventDefault(),this.applyFilters()})}applyFilters(){const t=this.getAttribute("for")||this.getAttribute("target");let o=null;if(t){const i=document.querySelector(`#${t}, ${t}`);i&&typeof i.getQueryManager=="function"&&(o=i.getQueryManager())}const r={};this.querySelectorAll("input, select, flowx-input, flowx-select").forEach(i=>{const a=i.getAttribute("name");if(!a)return;const n=i._currentValue||i.value||i.getAttribute("value")||"";r[a]=n}),o&&o.updateAndRefetch({filters:r,page:1}),this.dispatchEvent(new CustomEvent("fx-filter-change",{bubbles:!0,composed:!0,detail:{filters:r}}))}}customElements.get("flowx-filter")||customElements.define("flowx-filter",xt);class vt extends HTMLElement{static get observedAttributes(){return["for","fields"]}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){this.shadowRoot||this.attachShadow({mode:"open"});const r=(this.getAttribute("fields")||"name,date").split(",").map(i=>i.trim()).map(i=>`
      <option value="${i}:asc">Sort by ${i} (Ascending)</option>
      <option value="${i}:desc">Sort by ${i} (Descending)</option>
    `).join("");this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: inline-block; font-family: var(--flowx-font-family); }
        select {
          background: #0d1117; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); color: #e6edf3;
          font-family: var(--flowx-font-family); font-size: 13px;
          padding: 6px 10px; outline: none; cursor: pointer;
        }
      </style>
      <select aria-label="Sort options">
        <option value="">Default Sort</option>
        ${r}
      </select>
    `;const s=this.shadowRoot.querySelector("select");s?.addEventListener("change",()=>{const i=s.value;let a="",n="";if(i.includes(":")){const d=i.split(":");a=d[0],n=d[1]}const l=this.getAttribute("for");if(l){const d=document.querySelector(`#${l}, ${l}`);d&&typeof d.getQueryManager=="function"&&d.getQueryManager().updateAndRefetch({sort:a,dir:n})}this.dispatchEvent(new CustomEvent("fx-sort-change",{bubbles:!0,composed:!0,detail:{sort:a,dir:n}}))})}}customElements.get("flowx-sort")||customElements.define("flowx-sort",vt);class wt extends HTMLElement{connectedCallback(){this.render()}render(){this.shadowRoot||this.attachShadow({mode:"open"});const r=(this.getAttribute("fields")||"category,status").split(",").map(i=>i.trim()).map(i=>`
      <option value="${i}">Group by ${i}</option>
    `).join("");this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: inline-block; font-family: var(--flowx-font-family); }
        select {
          background: #0d1117; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); color: #e6edf3;
          font-family: var(--flowx-font-family); font-size: 13px;
          padding: 6px 10px; outline: none; cursor: pointer;
        }
      </style>
      <select aria-label="Group by options">
        <option value="">No Grouping</option>
        ${r}
      </select>
    `;const s=this.shadowRoot.querySelector("select");s?.addEventListener("change",()=>{const i=s.value,a=this.getAttribute("for");if(a){const n=document.querySelector(`#${a}, ${a}`);n&&typeof n.getQueryManager=="function"&&n.getQueryManager().updateAndRefetch({groupBy:i,page:1})}this.dispatchEvent(new CustomEvent("fx-group-change",{bubbles:!0,composed:!0,detail:{groupBy:i}}))})}}customElements.get("flowx-group-by")||customElements.define("flowx-group-by",wt);class yt extends HTMLElement{static get observedAttributes(){return["type","fx-get","for","filename"]}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){this.shadowRoot||this.attachShadow({mode:"open"});const t=(this.getAttribute("type")||"csv").toUpperCase(),o=this.getAttribute("fx-get");this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: inline-block; font-family: var(--flowx-font-family); }
        button {
          display: inline-flex; align-items: center; gap: 6px;
          background: #161b22; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); color: #e6edf3;
          font-family: var(--flowx-font-family); font-size: 13px; font-weight: 500;
          padding: 6px 12px; cursor: pointer; transition: background 0.15s;
        }
        button:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.25); }
      </style>
      <button type="button">
        <span>📥</span>
        <span>Export ${t}</span>
      </button>
    `,this.shadowRoot.querySelector("button")?.addEventListener("click",()=>{if(o)window.location.href=o;else{const s=this.getAttribute("for");let i=null;if(s&&(i=document.querySelector(`#${s} table, ${s}`)),i||(i=document.querySelector("table")),i){const a=this.getAttribute("filename")||`export-${Date.now()}.csv`;pt(i,a)}else console.warn("FlowX Export: No table target found for client CSV export")}})}}customElements.get("flowx-export")||customElements.define("flowx-export",yt);let L=null,N=!1;function O(e=document){N&&e===document||(e===document&&(N=!0),e.addEventListener("click",t=>{const o=t.target,r=o?.closest("[fx-dialog-target], [data-fx-dialog-target]");if(r){t.preventDefault();const i=r.getAttribute("fx-dialog-target")||r.getAttribute("data-fx-dialog-target"),a=r.getAttribute("fx-get")||r.getAttribute("data-fx-get");i&&kt(r,i,a)}const s=o?.closest("[fx-dialog-close], [data-fx-dialog-close]");if(s){const i=s.closest("dialog, flowx-modal, flowx-dialog, flowx-confirm-dialog, flowx-sheet, flowx-bottom-sheet, flowx-lightbox");i&&j(i)}}),e.addEventListener("click",t=>{const o=t.target;if(o&&(o.tagName.toLowerCase()==="dialog"||o.tagName.startsWith("FLOWX-"))){const r=o;if(!(r.hasAttribute("fx-dialog-persistent")||r.hasAttribute("persistent"))&&t.target===r){const i=r.getBoundingClientRect(),a=t;(a.clientX<i.left||a.clientX>i.right||a.clientY<i.top||a.clientY>i.bottom||t.target===r)&&j(r)}}}),e.querySelectorAll("dialog, flowx-modal, flowx-dialog, flowx-confirm-dialog, flowx-sheet, flowx-bottom-sheet, flowx-lightbox").forEach(t=>{t.addEventListener("close",()=>G())}))}async function kt(e,t,o){L=e;const r=document.querySelector(t)||e.ownerDocument.querySelector(t);if(!r){console.warn(`FlowX Dialog: Target element "${t}" not found.`);return}if(o)try{const i=await(await fetch(o)).text(),a=r.querySelector('[slot="body"], .modal-body, .dialog-content')||r.shadowRoot?.querySelector('[slot="body"], .modal-body, .dialog-content')||r;a.innerHTML=i,window.FlowX&&typeof window.FlowX.process=="function"&&window.FlowX.process(a)}catch(s){console.error(`FlowX Dialog: Failed to pre-fetch content from "${o}"`,s)}At(r)}function At(e){if(typeof e.openModal=="function")e.openModal();else if(typeof e.showModal=="function")try{e.showModal()}catch{e.setAttribute("open","")}else e.setAttribute("open","");if(!e._focusTrapCleanup&&typeof _=="function"){const t=_(e.shadowRoot||e);e._focusTrapCleanup=t.cleanup}}function j(e){if(typeof e.closeModal=="function")e.closeModal();else if(typeof e.close=="function")try{e.close()}catch{e.removeAttribute("open")}else e.removeAttribute("open");e._focusTrapCleanup&&(e._focusTrapCleanup(),e._focusTrapCleanup=null),G()}function G(){if(L&&typeof L.focus=="function"){try{L.focus()}catch{}L=null}}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>O(document)):O(document));class Et extends HTMLElement{static get observedAttributes(){return["open","fx-dialog-persistent"]}nativeDialog=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.syncNativeState()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;const t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: contents; font-family: var(--flowx-font-family); }
        dialog {
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg); color: #e6edf3;
          padding: 0; box-shadow: 0 16px 48px rgba(0,0,0,0.6);
          max-width: 90vw; max-height: 90vh;
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(4px);
        }
      </style>
      <dialog>
        <slot></slot>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.nativeDialog?.addEventListener("close",()=>this.removeAttribute("open")),this.nativeDialog?.addEventListener("cancel",()=>this.removeAttribute("open")),this.syncNativeState())}}customElements.get("flowx-dialog")||customElements.define("flowx-dialog",Et);class $t extends HTMLElement{static get observedAttributes(){return["open","title","persistent"]}nativeDialog=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.syncNativeState()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;const t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}render(){if(!this.shadowRoot)return;const t=this.getAttribute("title")||"";this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: contents; font-family: var(--flowx-font-family); }
        dialog {
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg); color: #e6edf3;
          padding: 0; box-shadow: 0 16px 48px rgba(0,0,0,0.6);
          width: 500px; max-width: 90vw; max-height: 90vh; overflow: hidden;
        }
        dialog[open] {
          animation: modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(4px);
        }
        @media (prefers-reduced-motion: reduce) {
          dialog[open] { animation: none; }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .modal-title { font-size: 16px; font-weight: 600; color: #e6edf3; margin: 0; }
        .close-btn {
          background: transparent; border: none; color: #8b949e;
          font-size: 16px; cursor: pointer; padding: 4px 8px; border-radius: 4px;
        }
        .close-btn:hover { color: #fff; background: rgba(255,255,255,0.08); }
        .modal-body { padding: 20px; overflow-y: auto; max-height: 60vh; font-size: 14px; color: #c9d1d9; }
        .modal-footer {
          display: flex; align-items: center; justify-content: flex-end; gap: 10px;
          padding: 14px 20px; background: rgba(0,0,0,0.2); border-top: 1px solid rgba(255,255,255,0.1);
        }
      </style>
      <dialog>
        <div class="modal-header">
          <slot name="header">
            <h3 class="modal-title">${t}</h3>
          </slot>
          <button type="button" class="close-btn" fx-dialog-close aria-label="Close modal">✕</button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.nativeDialog?.addEventListener("close",()=>this.removeAttribute("open")),this.nativeDialog?.addEventListener("cancel",()=>this.removeAttribute("open")),this.syncNativeState()}}customElements.get("flowx-modal")||customElements.define("flowx-modal",$t);class St extends HTMLElement{static get observedAttributes(){return["open","message","title","confirm-label","cancel-label"]}nativeDialog=null;pendingRequestTrigger=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupGlobalGateListener()}attributeChangedCallback(){this.syncNativeState()}openModal(t){if(t&&(this.pendingRequestTrigger=t),this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;const t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}setupGlobalGateListener(){document.addEventListener("click",t=>{const r=t.target?.closest("[fx-confirm-target]");if(r){const s=r.getAttribute("fx-confirm-target");s&&(s===`#${this.id}`||s===this.id)&&(t.preventDefault(),t.stopPropagation(),this.openModal(r))}},!0)}handleUserChoice(t){if(this.closeModal(),this.dispatchEvent(new CustomEvent("fx-confirm",{bubbles:!0,composed:!0,detail:{confirmed:t}})),t&&this.pendingRequestTrigger){const o=this.pendingRequestTrigger.getAttribute("fx-delete"),r=this.pendingRequestTrigger.getAttribute("fx-post");o?fetch(o,{method:"DELETE"}).then(()=>{const s=this.pendingRequestTrigger?.getAttribute("fx-target");if(s){const i=document.querySelector(s);i&&i.remove()}}):r&&fetch(r,{method:"POST"}),this.pendingRequestTrigger=null}}render(){if(!this.shadowRoot)return;const t=this.getAttribute("title")||"Confirm Action",o=this.getAttribute("message")||"Are you sure you want to proceed?",r=this.getAttribute("confirm-label")||"Confirm",s=this.getAttribute("cancel-label")||"Cancel";this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: contents; font-family: var(--flowx-font-family); }
        dialog {
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg); color: #e6edf3;
          padding: 20px; box-shadow: 0 16px 48px rgba(0,0,0,0.6);
          width: 420px; max-width: 90vw;
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(4px);
        }
        .title { font-size: 16px; font-weight: 600; color: #e6edf3; margin: 0 0 8px; }
        .message { font-size: 14px; color: #8b949e; margin: 0 0 20px; line-height: 1.5; }
        .actions { display: flex; justify-content: flex-end; gap: 10px; }
        .btn-cancel {
          background: transparent; border: 1px solid rgba(255,255,255,0.15);
          color: #c9d1d9; padding: 7px 14px; border-radius: 6px; font-size: 13px;
          cursor: pointer; font-weight: 500;
        }
        .btn-cancel:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .btn-confirm {
          background: var(--flowx-error, #dc3545); border: none;
          color: #fff; padding: 7px 14px; border-radius: 6px; font-size: 13px;
          cursor: pointer; font-weight: 600;
        }
        .btn-confirm:hover { opacity: 0.9; }
      </style>
      <dialog>
        <h3 class="title">${t}</h3>
        <p class="message">${o}</p>
        <div class="actions">
          <button type="button" class="btn-cancel" id="btn-cancel">${s}</button>
          <button type="button" class="btn-confirm" id="btn-confirm">${r}</button>
        </div>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.shadowRoot.querySelector("#btn-cancel")?.addEventListener("click",()=>this.handleUserChoice(!1)),this.shadowRoot.querySelector("#btn-confirm")?.addEventListener("click",()=>this.handleUserChoice(!0)),this.syncNativeState()}}customElements.get("flowx-confirm-dialog")||customElements.define("flowx-confirm-dialog",St);class J extends HTMLElement{static get observedAttributes(){return["open","side","title"]}nativeDialog=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.syncNativeState()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;const t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}render(){if(!this.shadowRoot)return;const t=this.getAttribute("side")||"right",o=this.getAttribute("title")||"";this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: contents; font-family: var(--flowx-font-family); }
        dialog {
          background: #161b22; border: none;
          border-left: 1px solid rgba(255,255,255,0.15);
          color: #e6edf3; padding: 0; box-shadow: -8px 0 32px rgba(0,0,0,0.5);
          width: 360px; max-width: 85vw; height: 100vh; max-height: 100vh;
          margin: 0; position: fixed; top: 0; bottom: 0;
          ${t==="left"?"left: 0; right: auto;":"right: 0; left: auto;"}
        }
        dialog[open] {
          animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.5);
        }
        @keyframes slideIn {
          from { transform: translateX(${t==="left"?"-100%":"100%"}); }
          to { transform: translateX(0); }
        }
        .sheet-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .sheet-title { font-size: 15px; font-weight: 600; color: #e6edf3; margin: 0; }
        .close-btn { background: transparent; border: none; color: #8b949e; cursor: pointer; padding: 4px; font-size: 14px; }
        .sheet-body { padding: 20px; overflow-y: auto; height: calc(100vh - 60px); font-size: 14px; }
      </style>
      <dialog>
        <div class="sheet-header">
          <h3 class="sheet-title">${o}</h3>
          <button type="button" class="close-btn" fx-dialog-close aria-label="Close sheet">✕</button>
        </div>
        <div class="sheet-body">
          <slot></slot>
        </div>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.syncNativeState()}}customElements.get("flowx-sheet")||customElements.define("flowx-sheet",J);class Lt extends HTMLElement{static get observedAttributes(){return["open","title"]}nativeDialog=null;startY=0;currentY=0;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.syncNativeState()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;const t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}render(){if(!this.shadowRoot)return;const t=this.getAttribute("title")||"";this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: contents; font-family: var(--flowx-font-family); }
        dialog {
          background: #161b22; border: none;
          border-top: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg) var(--flowx-radius-lg) 0 0;
          color: #e6edf3; padding: 0; box-shadow: 0 -8px 32px rgba(0,0,0,0.5);
          width: 100vw; max-width: 600px; max-height: 80vh;
          margin: 0 auto; position: fixed; bottom: 0; top: auto;
          transition: transform 0.15s ease-out;
        }
        dialog[open] {
          animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        dialog::backdrop { background: rgba(0, 0, 0, 0.5); }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .drag-handle-bar {
          display: flex; justify-content: center; padding: 10px 0 4px;
          cursor: grab; touch-action: none;
        }
        .drag-pill { width: 36px; height: 4px; border-radius: 2px; background: rgba(255,255,255,0.25); }
        .sheet-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 8px 20px 12px; border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .sheet-title { font-size: 15px; font-weight: 600; color: #e6edf3; margin: 0; }
        .sheet-body { padding: 20px; overflow-y: auto; max-height: 60vh; font-size: 14px; }
      </style>
      <dialog>
        <div class="drag-handle-bar" id="drag-handle">
          <div class="drag-pill"></div>
        </div>
        ${t?`<div class="sheet-header"><h3 class="sheet-title">${t}</h3></div>`:""}
        <div class="sheet-body">
          <slot></slot>
        </div>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog");const o=this.shadowRoot.querySelector("#drag-handle");o?.addEventListener("pointerdown",r=>{const s=r;this.startY=s.clientY,o.setPointerCapture(s.pointerId);const i=n=>{const l=n.clientY-this.startY;l>0&&this.nativeDialog&&(this.nativeDialog.style.transform=`translateY(${l}px)`)},a=n=>{const l=n.clientY-this.startY;o.releasePointerCapture(n.pointerId),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",a),l>80&&this.closeModal(),this.nativeDialog&&(this.nativeDialog.style.transform="")};window.addEventListener("pointermove",i),window.addEventListener("pointerup",a)}),this.syncNativeState()}}customElements.get("flowx-bottom-sheet")||customElements.define("flowx-bottom-sheet",Lt);class Ct extends HTMLElement{static get observedAttributes(){return["open","src","alt"]}nativeDialog=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupGlobalThumbnailListener()}attributeChangedCallback(){this.syncNativeState()}openWithSrc(t,o=""){this.setAttribute("src",t),this.setAttribute("alt",o),this.openModal()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;const t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}setupGlobalThumbnailListener(){document.addEventListener("click",t=>{const r=t.target?.closest("[data-lightbox-src]");if(r){const s=r.getAttribute("data-lightbox-src"),i=r.getAttribute("alt")||"";s&&(t.preventDefault(),this.openWithSrc(s,i))}})}render(){if(!this.shadowRoot)return;const t=this.getAttribute("src")||"",o=this.getAttribute("alt")||"";this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: contents; font-family: var(--flowx-font-family); }
        dialog {
          background: rgba(0,0,0,0.9); border: none;
          color: #fff; padding: 0; box-shadow: 0 16px 48px rgba(0,0,0,0.8);
          max-width: 90vw; max-height: 90vh; border-radius: var(--flowx-radius-lg);
          overflow: hidden; outline: none;
        }
        dialog::backdrop { background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(6px); }
        .wrapper { display: flex; flex-direction: column; align-items: center; position: relative; }
        img { max-width: 90vw; max-height: 80vh; object-fit: contain; display: block; }
        .caption { padding: 12px; font-size: 13px; color: #8b949e; text-align: center; }
        .close-btn {
          position: absolute; top: 12px; right: 12px;
          background: rgba(0,0,0,0.6); border: none; color: #fff;
          width: 32px; height: 32px; border-radius: 50%;
          font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .close-btn:hover { background: rgba(255,255,255,0.2); }
      </style>
      <dialog>
        <div class="wrapper">
          <button type="button" class="close-btn" fx-dialog-close aria-label="Close image">✕</button>
          ${t?`<img src="${t}" alt="${o}" />`:"<slot></slot>"}
          ${o?`<div class="caption">${o}</div>`:""}
        </div>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.syncNativeState()}}customElements.get("flowx-lightbox")||customElements.define("flowx-lightbox",Ct);class Q extends HTMLElement{static get observedAttributes(){return["open","src","alt"]}nativeDialog=null;galleryImages=[];currentIndex=0;zoomLevel=1;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupGalleryListener()}attributeChangedCallback(){this.syncNativeState()}openGallery(t,o=0){this.galleryImages=t,this.currentIndex=o,this.zoomLevel=1,this.galleryImages[o]&&(this.setAttribute("src",this.galleryImages[o].src),this.setAttribute("alt",this.galleryImages[o].alt||"")),this.openModal()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}prev(){this.galleryImages.length!==0&&(this.currentIndex=(this.currentIndex-1+this.galleryImages.length)%this.galleryImages.length,this.setAttribute("src",this.galleryImages[this.currentIndex].src),this.setAttribute("alt",this.galleryImages[this.currentIndex].alt||""),this.zoomLevel=1,this.render())}next(){this.galleryImages.length!==0&&(this.currentIndex=(this.currentIndex+1)%this.galleryImages.length,this.setAttribute("src",this.galleryImages[this.currentIndex].src),this.setAttribute("alt",this.galleryImages[this.currentIndex].alt||""),this.zoomLevel=1,this.render())}toggleZoom(){this.zoomLevel=this.zoomLevel===1?1.8:1;const t=this.shadowRoot?.querySelector("img");t&&(t.style.transform=`scale(${this.zoomLevel})`)}syncNativeState(){if(!this.nativeDialog)return;const t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}setupGalleryListener(){document.addEventListener("click",t=>{const r=t.target?.closest("[data-gallery-src]");if(r){const s=r.getAttribute("data-gallery"),i=r.getAttribute("data-gallery-src")||r.getAttribute("src");if(s&&i){const n=Array.from(document.querySelectorAll(`[data-gallery="${s}"]`)).map(d=>({src:d.getAttribute("data-gallery-src")||d.getAttribute("src")||"",alt:d.getAttribute("alt")||""})),l=n.findIndex(d=>d.src===i);t.preventDefault(),this.openGallery(n,Math.max(0,l))}}})}render(){if(!this.shadowRoot)return;const t=this.getAttribute("src")||"",o=this.getAttribute("alt")||"",r=this.galleryImages.length>1;this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: contents; font-family: var(--flowx-font-family); }
        dialog {
          background: rgba(0,0,0,0.92); border: none;
          color: #fff; padding: 0; box-shadow: 0 16px 48px rgba(0,0,0,0.9);
          width: 95vw; height: 95vh; max-width: 95vw; max-height: 95vh;
          border-radius: var(--flowx-radius-lg); overflow: hidden; outline: none;
        }
        dialog::backdrop { background: rgba(0, 0, 0, 0.9); }
        .viewer-container { display: flex; flex-direction: column; height: 100%; position: relative; }
        .toolbar { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; background: rgba(0,0,0,0.4); }
        .title { font-size: 14px; font-weight: 500; }
        .tools { display: flex; gap: 8px; }
        .btn { background: rgba(255,255,255,0.1); border: none; color: #fff; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 13px; }
        .btn:hover { background: rgba(255,255,255,0.25); }
        .img-stage { flex: 1; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
        img { max-width: 90%; max-height: 90%; object-fit: contain; transition: transform 0.2s; cursor: zoom-in; }
        .nav-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(0,0,0,0.6); border: none; color: #fff;
          width: 44px; height: 44px; border-radius: 50%; cursor: pointer; font-size: 18px;
        }
        .nav-btn:hover { background: rgba(255,255,255,0.3); }
        .prev-btn { left: 16px; }
        .next-btn { right: 16px; }
      </style>
      <dialog>
        <div class="viewer-container">
          <div class="toolbar">
            <span class="title">${o||"Image Viewer"} ${r?`(${this.currentIndex+1}/${this.galleryImages.length})`:""}</span>
            <div class="tools">
              <button type="button" class="btn" id="zoom-btn">🔍 Zoom</button>
              <button type="button" class="btn" fx-dialog-close>✕ Close</button>
            </div>
          </div>
          <div class="img-stage">
            ${r?'<button type="button" class="nav-btn prev-btn" id="prev-btn">◀</button>':""}
            <img src="${t}" alt="${o}" id="viewer-img" />
            ${r?'<button type="button" class="nav-btn next-btn" id="next-btn">▶</button>':""}
          </div>
        </div>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.shadowRoot.querySelector("#zoom-btn")?.addEventListener("click",()=>this.toggleZoom()),this.shadowRoot.querySelector("#viewer-img")?.addEventListener("click",()=>this.toggleZoom()),this.shadowRoot.querySelector("#prev-btn")?.addEventListener("click",()=>this.prev()),this.shadowRoot.querySelector("#next-btn")?.addEventListener("click",()=>this.next()),this.syncNativeState()}}customElements.get("flowx-image-viewer")||customElements.define("flowx-image-viewer",Q);class zt extends HTMLElement{static get observedAttributes(){return["breakpoint","open"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}toggleMenu(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","")}render(){if(!this.shadowRoot)return;const t=this.getAttribute("breakpoint")||"768px",o=this.hasAttribute("open");this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: block; font-family: var(--flowx-font-family); width: 100%; }
        .navbar-container {
          background: #161b22; border-bottom: 1px solid rgba(255,255,255,0.12);
          padding: 10px 20px; display: flex; align-items: center; justify-content: space-between;
          position: relative;
        }
        .left-section { display: flex; align-items: center; gap: 20px; }
        .nav-links { display: flex; align-items: center; gap: 16px; }
        .right-section { display: flex; align-items: center; gap: 12px; }
        .hamburger-btn {
          display: none; background: transparent; border: none;
          color: #8b949e; font-size: 20px; cursor: pointer; padding: 4px;
        }
        .hamburger-btn:hover { color: #fff; }
        .mobile-menu {
          display: none; flex-direction: column; gap: 10px;
          background: #0d1117; border-bottom: 1px solid rgba(255,255,255,0.12);
          padding: 16px 20px; width: 100%; box-sizing: border-box;
        }

        @media (max-width: ${t}) {
          .nav-links { display: none; }
          .hamburger-btn { display: block; }
          .mobile-menu { display: ${o?"flex":"none"}; }
        }
      </style>

      <div class="navbar-container">
        <div class="left-section">
          <slot name="logo"></slot>
          <div class="nav-links">
            <slot name="nav-items"></slot>
            <slot></slot>
          </div>
        </div>
        <div class="right-section">
          <slot name="actions"></slot>
          <button type="button" class="hamburger-btn" id="toggle-btn" aria-label="Toggle menu">☰</button>
        </div>
      </div>
      <div class="mobile-menu">
        <slot name="mobile-nav"></slot>
        <slot></slot>
      </div>
    `,this.shadowRoot.querySelector("#toggle-btn")?.addEventListener("click",()=>this.toggleMenu())}}customElements.get("flowx-navbar")||customElements.define("flowx-navbar",zt);class Dt extends HTMLElement{static get observedAttributes(){return["collapsed","persist"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.initPersistedState(),this.render()}attributeChangedCallback(){this.render()}toggleCollapse(){this.hasAttribute("collapsed")?(this.removeAttribute("collapsed"),this.savePersistedState(!1)):(this.setAttribute("collapsed",""),this.savePersistedState(!0))}initPersistedState(){const t=this.getAttribute("persist")||"cookie";if(t==="cookie"&&typeof document<"u"){const o=document.cookie.match(/(?:^|; )flowx_sidebar_collapsed=([^;]*)/);o&&o[1]==="true"&&this.setAttribute("collapsed","")}else t==="localStorage"&&typeof localStorage<"u"&&localStorage.getItem("flowx_sidebar_collapsed")==="true"&&this.setAttribute("collapsed","")}savePersistedState(t){const o=this.getAttribute("persist")||"cookie";o==="cookie"&&typeof document<"u"?document.cookie=`flowx_sidebar_collapsed=${t}; path=/; max-age=31536000`:o==="localStorage"&&typeof localStorage<"u"&&localStorage.setItem("flowx_sidebar_collapsed",String(t))}render(){if(!this.shadowRoot)return;const t=this.hasAttribute("collapsed");this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: block; font-family: var(--flowx-font-family); height: 100%; }
        .sidebar-container {
          background: #161b22; border-right: 1px solid rgba(255,255,255,0.12);
          width: ${t?"64px":"240px"}; height: 100%; box-sizing: border-box;
          display: flex; flex-direction: column; justify-content: space-between;
          transition: width 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .header { display: flex; align-items: center; justify-content: space-between; padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .nav-content { flex: 1; overflow-y: auto; padding: 12px 8px; }
        .footer { padding: 12px; border-top: 1px solid rgba(255,255,255,0.08); }
        .toggle-btn {
          background: transparent; border: none; color: #8b949e;
          cursor: pointer; padding: 6px; border-radius: 4px; font-size: 14px;
        }
        .toggle-btn:hover { color: #fff; background: rgba(255,255,255,0.08); }
      </style>

      <div class="sidebar-container">
        <div class="header">
          ${t?"":'<slot name="brand"></slot>'}
          <button type="button" class="toggle-btn" id="toggle-btn" aria-label="Toggle sidebar">${t?"≫":"≪"}</button>
        </div>
        <div class="nav-content">
          <slot></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `,this.shadowRoot.querySelector("#toggle-btn")?.addEventListener("click",()=>this.toggleCollapse())}}customElements.get("flowx-sidebar")||customElements.define("flowx-sidebar",Dt);class Mt extends J{}customElements.get("flowx-drawer")||customElements.define("flowx-drawer",Mt);class Tt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: inline-block; font-family: var(--flowx-font-family); }
        .dock-container {
          background: rgba(22, 27, 34, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px; padding: 8px 14px;
          display: flex; align-items: center; gap: 10px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.5);
        }
        ::slotted(*) {
          transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1);
        }
        ::slotted(*:hover) {
          transform: scale(1.35) translateY(-6px);
        }
      </style>

      <div class="dock-container">
        <slot></slot>
      </div>
    `)}}customElements.get("flowx-dock")||customElements.define("flowx-dock",Tt);class Rt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: block; font-family: var(--flowx-font-family); }
        .bar-container {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 900;
          background: #161b22; border-top: 1px solid rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: space-around;
          padding: 8px 12px; box-shadow: 0 -4px 20px rgba(0,0,0,0.4);
        }
        ::slotted([current]), ::slotted([data-current]) {
          color: var(--flowx-primary, #0066cc) !important;
          font-weight: 600;
        }
      </style>

      <div class="bar-container">
        <slot></slot>
      </div>
    `)}}customElements.get("flowx-bottom-navigation")||customElements.define("flowx-bottom-navigation",Rt);b("flowx-menu-item",{observedAttributes:["value","disabled"],style:`
    :host { display: block; outline: none; }
    .menu-item {
      padding: 8px 12px; cursor: pointer;
      font-family: var(--flowx-font-family); font-size: 14px; color: #e6edf3;
      border-radius: var(--flowx-radius-sm); display: flex; align-items: center;
      transition: background-color 0.15s; outline: none; user-select: none;
    }
    :host(:focus) .menu-item, .menu-item:hover {
      background-color: var(--flowx-primary, #0066cc); color: #fff;
    }
    :host([disabled]) .menu-item { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
  `,template:`
    <div class="menu-item" role="menuitem" tabindex="0">
      <slot></slot>
    </div>
  `});b("flowx-menu",{observedAttributes:["placement","open"],style:`
    :host { display: inline-block; position: relative; font-family: var(--flowx-font-family); }
    .menu-panel {
      display: none; position: absolute; z-index: 1000;
      background-color: #161b22; border: 1px solid rgba(255,255,255,0.15);
      border-radius: var(--flowx-radius-md); padding: 4px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.5); min-width: 160px;
    }
    :host([open]) .menu-panel { display: block; }
  `,template:`
    <div class="trigger-slot">
      <slot name="trigger"></slot>
    </div>
    <div class="menu-panel" role="menu">
      <slot></slot>
    </div>
  `,setup(e,t){const o=t.querySelector(".trigger-slot"),r=t.querySelector(".menu-panel");let s=null,i=null,a=null;const n=()=>{e.removeAttribute("open"),s&&(s(),s=null),i&&(i(),i=null),a&&(a(),a=null)},l=()=>{e.setAttribute("open","");const d=o.firstElementChild||o,c=e.getAttribute("placement")||"bottom";s=y(d,r,{placement:c,align:"start",offset:4}).cleanup,i=k(e,n).cleanup,a=$(r,"flowx-menu-item, .menu-item").cleanup};o.addEventListener("click",d=>{d.stopPropagation(),e.hasAttribute("open")?n():l()}),e.addEventListener("click",d=>{const c=d.target;c!==e&&(c.tagName.toLowerCase()==="flowx-menu-item"||c.classList.contains("menu-item"))&&n()})}});class It extends HTMLElement{static get observedAttributes(){return["open","for"]}outsideCleanup=null;rovingCleanup=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupContextMenuListener()}disconnectedCallback(){this.cleanup()}openAt(t,o){this.setAttribute("open",""),this.render();const r=this.shadowRoot?.querySelector(".menu-panel");if(r){r.style.left=`${t}px`,r.style.top=`${o}px`;const s=k(this,()=>this.close());this.outsideCleanup=s.cleanup;const i=$(r,".menu-item");this.rovingCleanup=i.cleanup}}close(){this.removeAttribute("open"),this.cleanup(),this.render()}cleanup(){this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null),this.rovingCleanup&&(this.rovingCleanup(),this.rovingCleanup=null)}setupContextMenuListener(){const t=this.getAttribute("for");(t?document.querySelector(`#${t}`)||document.querySelector(t):document.body)?.addEventListener("contextmenu",r=>{const s=r;s.preventDefault(),this.openAt(s.clientX,s.clientY)})}render(){if(!this.shadowRoot)return;const t=this.hasAttribute("open");this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: block; font-family: var(--flowx-font-family); }
        .menu-panel {
          display: ${t?"flex":"none"}; flex-direction: column; gap: 2px;
          position: fixed; z-index: 1200;
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-md); padding: 6px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.6); min-width: 160px;
        }
        ::slotted(.menu-item), ::slotted(button) {
          background: transparent; border: none; color: #c9d1d9;
          padding: 8px 12px; font-size: 13px; text-align: left;
          border-radius: 4px; cursor: pointer; width: 100%; box-sizing: border-box;
        }
        ::slotted(.menu-item:hover), ::slotted(button:hover) {
          background: var(--flowx-primary, #0066cc); color: #fff;
        }
      </style>
      <div class="menu-panel" role="menu">
        <slot></slot>
      </div>
    `}}customElements.get("flowx-context-menu")||customElements.define("flowx-context-menu",It);class qt extends HTMLElement{static get observedAttributes(){return["open","trigger-event"]}outsideCleanup=null;positionerCleanup=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}disconnectedCallback(){this.cleanup()}async open(){this.setAttribute("open",""),this.render();const t=this.querySelector('[slot="trigger"]'),o=this.shadowRoot?.querySelector(".mega-panel");if(t&&t.hasAttribute("fx-get")&&!t.hasAttribute("data-loaded")){t.setAttribute("data-loaded","true");const r=t.getAttribute("fx-get");if(r)try{const i=await(await fetch(r)).text(),a=this.shadowRoot?.querySelector(".mega-content");a&&(a.innerHTML=i)}catch(s){console.error("FlowX MegaMenu: Lazy load error",s)}}if(t&&o){const r=y(t,o,{placement:"bottom",align:"start",offset:8});this.positionerCleanup=r.cleanup;const s=k(this,()=>this.close());this.outsideCleanup=s.cleanup}}close(){this.removeAttribute("open"),this.cleanup(),this.render()}cleanup(){this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null),this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=null)}render(){if(!this.shadowRoot)return;const t=this.hasAttribute("open");this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: inline-block; font-family: var(--flowx-font-family); position: relative; }
        .trigger-wrapper { display: inline-block; cursor: pointer; }
        .mega-panel {
          display: ${t?"block":"none"};
          position: absolute; top: 100%; left: 0; z-index: 1100;
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg); padding: 20px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.6);
          width: 580px; max-width: 90vw;
        }
        .mega-content { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 20px; }
      </style>
      <div class="trigger-wrapper">
        <slot name="trigger"></slot>
      </div>
      <div class="mega-panel" role="menu">
        <div class="mega-content">
          <slot></slot>
        </div>
      </div>
    `,this.shadowRoot.querySelector(".trigger-wrapper")?.addEventListener("click",()=>{this.hasAttribute("open")?this.close():this.open()})}}customElements.get("flowx-mega-menu")||customElements.define("flowx-mega-menu",qt);class Ft extends HTMLElement{static get observedAttributes(){return["open","shortcut","fx-endpoint"]}nativeDialog=null;timer=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupGlobalShortcutListener()}attributeChangedCallback(){this.syncNativeState()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;const t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}setupGlobalShortcutListener(){window.addEventListener("keydown",t=>{(t.metaKey||t.ctrlKey)&&t.key.toLowerCase()==="k"&&(t.preventDefault(),this.hasAttribute("open")?this.closeModal():this.openModal())})}performSearch(t){const o=this.getAttribute("fx-endpoint")||this.getAttribute("fx-get"),r=this.shadowRoot?.querySelector("#results");if(!r)return;if(!o){Array.from(r.querySelectorAll(".cmd-item")).forEach(a=>{const n=a.textContent?.toLowerCase()||"";a.style.display=n.includes(t.toLowerCase())?"":"none"});return}const s=o.includes("?")?`${o}&q=${encodeURIComponent(t)}`:`${o}?q=${encodeURIComponent(t)}`;fetch(s).then(i=>i.text()).then(i=>{r.innerHTML=i,window.FlowX&&typeof window.FlowX.process=="function"&&window.FlowX.process(r),$(r,".cmd-item, button, a")})}render(){if(!this.shadowRoot)return;this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: contents; font-family: var(--flowx-font-family); }
        dialog {
          background: #161b22; border: 1px solid rgba(255,255,255,0.15);
          border-radius: var(--flowx-radius-lg); color: #e6edf3;
          padding: 0; box-shadow: 0 20px 60px rgba(0,0,0,0.7);
          width: 560px; max-width: 90vw; max-height: 80vh; overflow: hidden;
          margin: 10vh auto;
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(6px);
        }
        .search-bar {
          display: flex; align-items: center; padding: 14px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.1); gap: 10px;
        }
        .search-icon { color: #6e7681; font-size: 14px; }
        input {
          flex: 1; background: transparent; border: none; color: #e6edf3;
          font-family: var(--flowx-font-family); font-size: 15px; outline: none;
        }
        .shortcut-badge {
          background: rgba(255,255,255,0.1); border-radius: 4px;
          padding: 2px 6px; font-size: 11px; color: #8b949e; font-family: monospace;
        }
        .results-container { padding: 8px; max-height: 360px; overflow-y: auto; }
        ::slotted(.cmd-item), .cmd-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 12px; border-radius: 6px; color: #c9d1d9; font-size: 13px;
          cursor: pointer; user-select: none; transition: background 0.1s;
        }
        ::slotted(.cmd-item:hover), .cmd-item:hover, .cmd-item:focus {
          background: var(--flowx-primary, #0066cc); color: #fff; outline: none;
        }
      </style>
      <dialog>
        <div class="search-bar">
          <span class="search-icon">🔍</span>
          <input type="search" id="cmd-input" placeholder="Type a command or search…" autofocus />
          <span class="shortcut-badge">ESC</span>
        </div>
        <div class="results-container" id="results">
          <slot></slot>
        </div>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.nativeDialog?.addEventListener("close",()=>this.removeAttribute("open"));const t=this.shadowRoot.querySelector("#cmd-input");t?.addEventListener("input",()=>{clearTimeout(this.timer),this.timer=setTimeout(()=>{this.performSearch(t.value.trim())},250)}),this.syncNativeState()}}customElements.get("flowx-command-palette")||customElements.define("flowx-command-palette",Ft);class Ht extends HTMLElement{static get observedAttributes(){return["src","alt","blur-src","loading"]}imgEl=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){if(!this.shadowRoot)return;const t=this.getAttribute("src")||"",o=this.getAttribute("alt")||"",r=this.getAttribute("blur-src")||"",s=this.getAttribute("loading")||"lazy";this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: inline-block; position: relative; overflow: hidden; font-family: var(--flowx-font-family); }
        .wrapper { position: relative; width: 100%; height: 100%; display: block; }
        .skeleton {
          position: absolute; inset: 0; background: linear-gradient(90deg, #161b22 25%, #21262d 50%, #161b22 75%);
          background-size: 200% 100%; animation: skeleton-shimmer 1.5s infinite; border-radius: inherit;
        }
        @keyframes skeleton-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        img {
          display: block; width: 100%; height: auto; border-radius: inherit;
          transition: opacity 0.3s ease, filter 0.3s ease; opacity: 0;
        }
        img.loaded { opacity: 1; filter: none; }
        img.blur { filter: blur(10px); transform: scale(1.05); }
      </style>
      <div class="wrapper">
        <div class="skeleton" id="skeleton"></div>
        <img id="img" src="${t}" alt="${o}" loading="${s}" class="${r?"blur":""}" />
      </div>
    `,this.imgEl=this.shadowRoot.querySelector("#img");const i=this.shadowRoot.querySelector("#skeleton");this.imgEl&&(this.imgEl.complete&&this.imgEl.naturalHeight!==0?this.onImageLoaded(i):(this.imgEl.addEventListener("load",()=>this.onImageLoaded(i)),this.imgEl.addEventListener("error",()=>{i&&(i.style.display="none"),this.imgEl&&(this.imgEl.style.opacity="1")})))}onImageLoaded(t){t&&(t.style.display="none"),this.imgEl&&(this.imgEl.classList.remove("blur"),this.imgEl.classList.add("loaded"))}}customElements.get("flowx-image")||customElements.define("flowx-image",Ht);class _t extends HTMLElement{viewer=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupGalleryClickListeners()}setupGalleryClickListeners(){this.shadowRoot?.querySelector("slot")?.addEventListener("slotchange",()=>this.bindClickEvents()),this.bindClickEvents()}bindClickEvents(){const t=Array.from(this.querySelectorAll("img, flowx-image")),o=t.map(r=>({src:r.getAttribute("src")||r.getAttribute("data-src")||"",alt:r.getAttribute("alt")||""}));t.forEach((r,s)=>{r.style.cursor="pointer",r.onclick=i=>{i.preventDefault(),this.openGalleryViewer(o,s)}})}openGalleryViewer(t,o){this.viewer||(this.viewer=new Q,document.body.appendChild(this.viewer)),this.viewer.openGallery(t,o)}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: block; font-family: var(--flowx-font-family); }
        .gallery-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 16px; width: 100%;
        }
      </style>
      <div class="gallery-grid">
        <slot></slot>
      </div>
    `)}}customElements.get("flowx-gallery")||customElements.define("flowx-gallery",_t);class Pt extends HTMLElement{static get observedAttributes(){return["autoplay","interval"]}activeIndex=0;autoplayTimer=null;isPointerDown=!1;startX=0;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupSwipeGestures(),this.initAutoplay()}disconnectedCallback(){this.stopAutoplay()}attributeChangedCallback(){this.initAutoplay()}nextSlide(){const t=this.getSlides();t.length&&(this.activeIndex=(this.activeIndex+1)%t.length,this.scrollToActiveSlide())}prevSlide(){const t=this.getSlides();t.length&&(this.activeIndex=(this.activeIndex-1+t.length)%t.length,this.scrollToActiveSlide())}goToSlide(t){const o=this.getSlides();t>=0&&t<o.length&&(this.activeIndex=t,this.scrollToActiveSlide())}getSlides(){const t=this.shadowRoot?.querySelector("slot");return t?t.assignedElements():[]}scrollToActiveSlide(){const t=this.shadowRoot?.querySelector(".track"),o=this.getSlides();t&&o[this.activeIndex]&&o[this.activeIndex].scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"}),this.updateDots()}initAutoplay(){this.stopAutoplay();const t=this.hasAttribute("autoplay"),o=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(t&&!o){const r=Number(this.getAttribute("interval"))||4e3;this.autoplayTimer=setInterval(()=>this.nextSlide(),r)}}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}setupSwipeGestures(){const t=this.shadowRoot?.querySelector(".track");t&&(t.addEventListener("pointerdown",o=>{this.isPointerDown=!0,this.startX=o.clientX}),t.addEventListener("pointerup",o=>{if(!this.isPointerDown)return;this.isPointerDown=!1;const r=o.clientX-this.startX;r<-40?this.nextSlide():r>40&&this.prevSlide()}))}updateDots(){Array.from(this.shadowRoot?.querySelectorAll(".dot")||[]).forEach((o,r)=>{r===this.activeIndex?o.classList.add("active"):o.classList.remove("active")})}render(){if(!this.shadowRoot)return;const t=this.children.length;let o="";for(let r=0;r<t;r++)o+=`<button type="button" class="dot ${r===0?"active":""}" data-idx="${r}" aria-label="Go to slide ${r+1}"></button>`;this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: block; font-family: var(--flowx-font-family); position: relative; width: 100%; }
        .carousel-container { position: relative; overflow: hidden; border-radius: var(--flowx-radius-md); }
        .track {
          display: flex; overflow-x: auto; scroll-snap-type: x mandatory;
          scrollbar-width: none; scroll-behavior: smooth; touch-action: pan-y;
        }
        .track::-webkit-scrollbar { display: none; }
        ::slotted(*) { flex: 0 0 100%; scroll-snap-align: start; width: 100%; box-sizing: border-box; }
        .nav-btn {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 10;
          background: rgba(22, 27, 34, 0.75); backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.15); color: #fff;
          width: 36px; height: 36px; border-radius: 50%; cursor: pointer;
          display: flex; align-items: center; justify-content: center; font-size: 16px;
        }
        .nav-btn:hover { background: rgba(255,255,255,0.2); }
        .prev { left: 12px; }
        .next { right: 12px; }
        .dots-container {
          position: absolute; bottom: 12px; left: 0; right: 0;
          display: flex; align-items: center; justify-content: center; gap: 6px; z-index: 10;
        }
        .dot {
          width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.4);
          border: none; cursor: pointer; padding: 0; transition: background 0.2s, transform 0.2s;
        }
        .dot.active { background: var(--flowx-primary, #0066cc); transform: scale(1.3); }
      </style>

      <div class="carousel-container">
        <button type="button" class="nav-btn prev" id="prev-btn" aria-label="Previous slide">‹</button>
        <div class="track">
          <slot></slot>
        </div>
        <button type="button" class="nav-btn next" id="next-btn" aria-label="Next slide">›</button>
        <div class="dots-container" id="dots">
          ${o}
        </div>
      </div>
    `,this.shadowRoot.querySelector("#prev-btn")?.addEventListener("click",()=>this.prevSlide()),this.shadowRoot.querySelector("#next-btn")?.addEventListener("click",()=>this.nextSlide()),this.shadowRoot.querySelectorAll(".dot").forEach(r=>{r.addEventListener("click",s=>{const i=Number(s.target.getAttribute("data-idx"));this.goToSlide(i)})})}}customElements.get("flowx-carousel")||customElements.define("flowx-carousel",Pt);class Vt extends HTMLElement{videoEl=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupVideoControls()}togglePlay(){this.videoEl&&(this.videoEl.paused?this.videoEl.play():this.videoEl.pause())}toggleFullscreen(){this.videoEl&&(document.fullscreenElement?document.exitFullscreen():this.videoEl.requestFullscreen&&this.videoEl.requestFullscreen())}setupVideoControls(){this.shadowRoot?.querySelector("slot")?.addEventListener("slotchange",()=>this.bindNativeVideo()),this.bindNativeVideo()}bindNativeVideo(){if(this.videoEl=this.querySelector("video")||this.shadowRoot?.querySelector("video")||null,this.videoEl){this.videoEl.controls=!1;const t=this.shadowRoot?.querySelector("#play-btn"),o=this.shadowRoot?.querySelector("#progress");this.videoEl.addEventListener("play",()=>{t&&(t.textContent="⏸")}),this.videoEl.addEventListener("pause",()=>{t&&(t.textContent="▶")}),this.videoEl.addEventListener("timeupdate",()=>{o&&this.videoEl&&this.videoEl.duration&&(o.value=String(this.videoEl.currentTime/this.videoEl.duration*100))})}}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: block; font-family: var(--flowx-font-family); position: relative; }
        .player-container { position: relative; background: #000; border-radius: var(--flowx-radius-md); overflow: hidden; }
        ::slotted(video), video { display: block; width: 100%; height: auto; }
        .controls-bar {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 10;
          background: linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%);
          display: flex; align-items: center; gap: 10px; padding: 10px 14px;
        }
        .ctrl-btn {
          background: transparent; border: none; color: #fff; cursor: pointer;
          font-size: 16px; padding: 4px; border-radius: 4px;
        }
        .ctrl-btn:hover { background: rgba(255,255,255,0.15); }
        input[type="range"] { flex: 1; accent-color: var(--flowx-primary, #0066cc); cursor: pointer; }
      </style>
      <div class="player-container">
        <slot>
          <video src="${this.getAttribute("src")||""}"></video>
        </slot>
        <div class="controls-bar">
          <button type="button" class="ctrl-btn" id="play-btn" aria-label="Play or pause">▶</button>
          <input type="range" id="progress" min="0" max="100" value="0" />
          <button type="button" class="ctrl-btn" id="fullscreen-btn" aria-label="Toggle Fullscreen">⛶</button>
        </div>
      </div>
    `,this.shadowRoot.querySelector("#play-btn")?.addEventListener("click",()=>this.togglePlay()),this.shadowRoot.querySelector("#fullscreen-btn")?.addEventListener("click",()=>this.toggleFullscreen()),this.shadowRoot.querySelector("#progress")?.addEventListener("input",t=>{const o=Number(t.target.value);this.videoEl&&this.videoEl.duration&&(this.videoEl.currentTime=o/100*this.videoEl.duration)}))}}customElements.get("flowx-video-player")||customElements.define("flowx-video-player",Vt);class Nt extends HTMLElement{audioEl=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.bindNativeAudio()}togglePlay(){this.audioEl&&(this.audioEl.paused?this.audioEl.play():this.audioEl.pause())}bindNativeAudio(){if(this.audioEl=this.querySelector("audio")||this.shadowRoot?.querySelector("audio")||null,this.audioEl){this.audioEl.controls=!1;const t=this.shadowRoot?.querySelector("#play-btn"),o=this.shadowRoot?.querySelector("#progress");this.audioEl.addEventListener("play",()=>{t&&(t.textContent="⏸")}),this.audioEl.addEventListener("pause",()=>{t&&(t.textContent="▶")}),this.audioEl.addEventListener("timeupdate",()=>{o&&this.audioEl&&this.audioEl.duration&&(o.value=String(this.audioEl.currentTime/this.audioEl.duration*100))})}}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: block; font-family: var(--flowx-font-family); }
        .audio-container {
          background: #161b22; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); padding: 12px 16px;
          display: flex; align-items: center; gap: 12px;
        }
        .ctrl-btn {
          background: var(--flowx-primary, #0066cc); border: none; color: #fff;
          width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 16px;
          display: flex; align-items: center; justify-content: center;
        }
        input[type="range"] { flex: 1; accent-color: var(--flowx-primary, #0066cc); cursor: pointer; }
      </style>
      <div class="audio-container">
        <slot>
          <audio src="${this.getAttribute("src")||""}"></audio>
        </slot>
        <button type="button" class="ctrl-btn" id="play-btn" aria-label="Play or pause audio">▶</button>
        <input type="range" id="progress" min="0" max="100" value="0" />
      </div>
    `,this.shadowRoot.querySelector("#play-btn")?.addEventListener("click",()=>this.togglePlay()),this.shadowRoot.querySelector("#progress")?.addEventListener("input",t=>{const o=Number(t.target.value);this.audioEl&&this.audioEl.duration&&(this.audioEl.currentTime=o/100*this.audioEl.duration)}))}}customElements.get("flowx-audio-player")||customElements.define("flowx-audio-player",Nt);class Ot extends HTMLElement{static get observedAttributes(){return["src","zoom"]}zoomLevel=100;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}zoomIn(){this.zoomLevel=Math.min(200,this.zoomLevel+25),this.updateZoom()}zoomOut(){this.zoomLevel=Math.max(50,this.zoomLevel-25),this.updateZoom()}updateZoom(){const t=this.shadowRoot?.querySelector("embed");t&&(t.style.transform=`scale(${this.zoomLevel/100})`)}render(){if(!this.shadowRoot)return;const t=this.getAttribute("src")||"";this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: block; font-family: var(--flowx-font-family); }
        .pdf-container {
          background: #161b22; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); overflow: hidden; display: flex; flex-direction: column;
        }
        .toolbar {
          background: #0d1117; padding: 8px 14px; border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: space-between;
        }
        .btn {
          background: rgba(255,255,255,0.08); border: none; color: #e6edf3;
          padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 13px;
        }
        .btn:hover { background: rgba(255,255,255,0.15); }
        .frame-wrapper { overflow: auto; height: 500px; display: flex; justify-content: center; background: #525659; }
        embed, object { width: 100%; height: 100%; border: none; transition: transform 0.2s; transform-origin: top center; }
      </style>
      <div class="pdf-container">
        <div class="toolbar">
          <span style="font-size:13px;color:#c9d1d9">📄 Document Viewer</span>
          <div style="display:flex;gap:6px">
            <button type="button" class="btn" id="zoom-out">-</button>
            <button type="button" class="btn" id="zoom-in">+</button>
            <a href="${t}" download class="btn" style="text-decoration:none">⬇ Download</a>
          </div>
        </div>
        <div class="frame-wrapper">
          <object data="${t}" type="application/pdf" width="100%" height="100%">
            <embed src="${t}" type="application/pdf" />
            <p style="color:#fff;padding:20px">Your browser does not support PDF embedding. <a href="${t}" style="color:#58a6ff">Download PDF</a></p>
          </object>
        </div>
      </div>
    `,this.shadowRoot.querySelector("#zoom-in")?.addEventListener("click",()=>this.zoomIn()),this.shadowRoot.querySelector("#zoom-out")?.addEventListener("click",()=>this.zoomOut())}}customElements.get("flowx-pdf-viewer")||customElements.define("flowx-pdf-viewer",Ot);class jt extends HTMLElement{static get observedAttributes(){return["src"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}parseMarkdown(t){return t?`<p>${t.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"").replace(/on\w+="[^"]*"/gi,"").replace(/javascript:/gi,"").replace(/^### (.*$)/gim,"<h3>$1</h3>").replace(/^## (.*$)/gim,"<h2>$1</h2>").replace(/^# (.*$)/gim,"<h1>$1</h1>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/```([\s\S]*?)```/g,"<pre><code>$1</code></pre>").replace(/`([^`]+)`/g,"<code>$1</code>").replace(/!\[(.*?)\]\((.*?)\)/g,'<img src="$2" alt="$1" style="max-width:100%" />').replace(/\[(.*?)\]\((.*?)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>').replace(/^\* (.*$)/gim,"<li>$1</li>").replace(/<\/li>\n<li>/g,"</li><li>").replace(/\n\n/g,"</p><p>")}</p>`:""}async render(){if(!this.shadowRoot)return;let t=this.textContent||"";const o=this.getAttribute("src")||this.getAttribute("fx-get");if(o)try{t=await(await fetch(o)).text()}catch(s){console.error("FlowX Markdown: Fetch error",s)}const r=this.parseMarkdown(t);this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: block; font-family: var(--flowx-font-family); color: #c9d1d9; line-height: 1.6; }
        h1, h2, h3 { color: #e6edf3; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; }
        code { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-family: monospace; }
        pre { background: #161b22; padding: 12px; border-radius: 6px; overflow-x: auto; border: 1px solid rgba(255,255,255,0.1); }
        pre code { background: transparent; padding: 0; }
        a { color: var(--flowx-primary, #58a6ff); text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
      <div class="markdown-body">
        ${r}
      </div>
    `}}customElements.get("flowx-markdown-viewer")||customElements.define("flowx-markdown-viewer",jt);class Xt extends HTMLElement{static get observedAttributes(){return["lang","line-numbers"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}highlightCode(t,o){if(!t)return"";let r=t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return o==="html"||o==="xml"?r=r.replace(/(&lt;\/?[a-z0-9-]+)/gi,'<span class="keyword">$1</span>').replace(/([a-z-]+)=("[^"]*")/gi,'<span class="attr">$1</span>=<span class="string">$2</span>'):(r=r.replace(/\b(const|let|var|function|return|if|else|import|export|class|from|extends|interface|type)\b/g,'<span class="keyword">$1</span>'),r=r.replace(/("[^"]*"|'[^']*'|`[^`]*`)/g,'<span class="string">$1</span>'),r=r.replace(/(\/\/[^\n]*)/g,'<span class="comment">$1</span>'),r=r.replace(/\b(\d+)\b/g,'<span class="number">$1</span>')),r}render(){if(!this.shadowRoot)return;const t=this.getAttribute("lang")||"js",o=this.textContent||"",r=this.highlightCode(o.trim(),t);this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: block; font-family: 'Fira Code', monospace; }
        .code-container {
          background: #0d1117; border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--flowx-radius-md); overflow: hidden;
        }
        .header {
          background: #161b22; padding: 6px 12px; font-size: 11px; color: #8b949e;
          border-bottom: 1px solid rgba(255,255,255,0.08); text-transform: uppercase;
        }
        pre { margin: 0; padding: 14px; overflow-x: auto; font-size: 13px; color: #e6edf3; }
        .keyword { color: #ff7b72; font-weight: bold; }
        .string { color: #a5d6ff; }
        .comment { color: #8b949e; font-style: italic; }
        .number { color: #79c0ff; }
        .attr { color: #d2a8ff; }
      </style>
      <div class="code-container">
        <div class="header">${t}</div>
        <pre><code>${r}</code></pre>
      </div>
    `}}customElements.get("flowx-code-viewer")||customElements.define("flowx-code-viewer",Xt);function Yt(e,t,o=365,r="/"){const s=new Date(Date.now()+o*864e5).toUTCString();document.cookie=`${e}=${encodeURIComponent(t)}; expires=${s}; path=${r}; SameSite=Lax`}function Bt(e){if(typeof document>"u"||!document.cookie)return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e.replace(/([.$?*|{}()[\]\\/+^])/g,"\\$1")+"=([^;]*)"));return t?decodeURIComponent(t[1]):null}const R={light:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',dark:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',auto:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'},I={light:"Light",dark:"Dark",auto:"Auto"};b("flowx-theme-toggle",{observedAttributes:["theme","cookie-name"],style:`
    :host {
      display: inline-block;
    }
    .toggle-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--flowx-space-2, 8px);
      padding: var(--flowx-space-2, 8px) var(--flowx-space-3, 12px);
      background-color: var(--flowx-bg-surface, #ffffff);
      color: var(--flowx-color-text, #0f172a);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-md, 8px);
      font-family: var(--flowx-font-sans);
      font-size: var(--flowx-font-size-md, 14px);
      font-weight: 500;
      cursor: pointer;
      user-select: none;
      transition: background-color var(--flowx-transition-fast), border-color var(--flowx-transition-fast), color var(--flowx-transition-fast);
      box-shadow: var(--flowx-shadow-sm);
    }
    .toggle-btn:hover {
      background-color: var(--flowx-bg-hover, rgba(0,0,0,0.05));
      border-color: var(--flowx-color-primary, #2563eb);
    }
    .toggle-btn:focus-visible {
      outline: none;
      box-shadow: var(--flowx-color-focus-ring);
    }
    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
    }
    .badge {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 2px 6px;
      border-radius: var(--flowx-radius-sm);
      background: var(--flowx-bg-hover);
      color: var(--flowx-color-text-muted);
    }
  `,template:e=>{const t=e._mode||"auto",o=I[t]||"Auto",r=R[t]||R.auto;return`
      <button class="toggle-btn" type="button" aria-label="Theme toggle: current theme is ${o}">
        <span class="icon">${r}</span>
        <span class="label">${o}</span>
        <span class="badge">Theme</span>
      </button>
    `},setup:e=>{const t=e.getAttribute("cookie-name")||"flowx-theme",o=Bt(t),r=typeof localStorage<"u"?localStorage.getItem(t):null,i=e.getAttribute("theme")||o||r||"auto";e._mode=i;const a=d=>{const c=e.shadowRoot||e,u=c.querySelector(".toggle-btn"),p=c.querySelector(".icon"),h=c.querySelector(".label");u&&u.setAttribute("aria-label",`Theme toggle: current theme is ${I[d]}`),p&&(p.innerHTML=R[d]),h&&(h.textContent=I[d])},n=d=>{e._mode=d,document.documentElement.setAttribute("data-theme",d),Yt(t,d),typeof localStorage<"u"&&localStorage.setItem(t,d);const c=d==="auto"?typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":d;a(d),e.dispatchEvent(new CustomEvent("flowx-theme-change",{bubbles:!0,composed:!0,detail:{theme:d,effectiveTheme:c}}))};document.documentElement.hasAttribute("data-theme")||document.documentElement.setAttribute("data-theme",i),a(i),(e.shadowRoot||e).addEventListener("click",d=>{if(!d.target.closest(".toggle-btn"))return;const u=["light","dark","auto"],p=u.indexOf(e._mode||"auto"),h=u[(p+1)%u.length];n(h)}),typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{e._mode==="auto"&&n("auto")})}});b("flowx-container",{observedAttributes:["size","centered"],style:`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
    .container {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      padding-left: var(--flowx-space-4, 16px);
      padding-right: var(--flowx-space-4, 16px);
      background-color: var(--flowx-bg-base, #f8fafc);
      color: var(--flowx-color-text, #0f172a);
      box-sizing: border-box;
      transition: background-color var(--flowx-transition-base), color var(--flowx-transition-base);
    }
    .container.size-xs { max-width: 480px; }
    .container.size-sm { max-width: 640px; }
    .container.size-md { max-width: 768px; }
    .container.size-lg { max-width: 1024px; }
    .container.size-xl { max-width: 1280px; }
    .container.size-full { max-width: 100%; }

    @container (min-width: 640px) {
      .container {
        padding-left: var(--flowx-space-6, 24px);
        padding-right: var(--flowx-space-6, 24px);
      }
    }
  `,template:e=>`<div class="container size-${e.getAttribute("size")||"lg"}"><slot></slot></div>`});b("flowx-grid",{observedAttributes:["cols","cols-sm","cols-md","cols-lg","gap"],style:`
    :host {
      display: block;
      width: 100%;
      container-type: inline-size;
      box-sizing: border-box;
    }
    .grid {
      display: grid;
      width: 100%;
      box-sizing: border-box;
      grid-template-columns: repeat(var(--cols-base, 1), minmax(0, 1fr));
      gap: var(--grid-gap, var(--flowx-space-4, 16px));
    }

    @container (min-width: 480px) {
      .grid {
        grid-template-columns: repeat(var(--cols-sm, var(--cols-base, 1)), minmax(0, 1fr));
      }
    }

    @container (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(var(--cols-md, var(--cols-sm, var(--cols-base, 1))), minmax(0, 1fr));
      }
    }

    @container (min-width: 1024px) {
      .grid {
        grid-template-columns: repeat(var(--cols-lg, var(--cols-md, var(--cols-sm, var(--cols-base, 1)))), minmax(0, 1fr));
      }
    }
  `,template:e=>{const t=e.getAttribute("cols")||"1",o=e.getAttribute("cols-sm")||t,r=e.getAttribute("cols-md")||o,s=e.getAttribute("cols-lg")||r,a=`var(--flowx-space-${e.getAttribute("gap")||"4"}, 16px)`;return`
      <div 
        class="grid" 
        style="--cols-base: ${t}; --cols-sm: ${o}; --cols-md: ${r}; --cols-lg: ${s}; --grid-gap: ${a};"
      >
        <slot></slot>
      </div>
    `}});b("flowx-stack",{observedAttributes:["direction","gap","align","justify","wrap"],style:`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
    .stack {
      display: flex;
      box-sizing: border-box;
      width: 100%;
    }
  `,template:e=>{const t=e.getAttribute("direction")||"column",o=e.getAttribute("gap")||"3",r=e.getAttribute("align")||"stretch",s=e.getAttribute("justify")||"flex-start",i=e.hasAttribute("wrap"),a=`var(--flowx-space-${o}, 12px)`,n={start:"flex-start",end:"flex-end",center:"center",stretch:"stretch",baseline:"baseline"},l={start:"flex-start",end:"flex-end",center:"center",between:"space-between",around:"space-around",evenly:"space-evenly"},d=n[r]||r,c=l[s]||s;return`
      <div 
        class="stack" 
        style="
          flex-direction: ${t}; 
          gap: ${a}; 
          align-items: ${d}; 
          justify-content: ${c};
          flex-wrap: ${i?"wrap":"nowrap"};
        "
      >
        <slot></slot>
      </div>
    `}});b("flowx-split-pane",{observedAttributes:["direction","persist","storage-key","initial-split"],style:`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 200px;
      box-sizing: border-box;
    }
    .split-container {
      display: flex;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background-color: var(--flowx-bg-base, #f8fafc);
      color: var(--flowx-color-text, #0f172a);
      overflow: hidden;
    }
    .split-container.vertical {
      flex-direction: column;
    }
    .pane {
      overflow: auto;
      box-sizing: border-box;
      background-color: var(--flowx-bg-surface, #ffffff);
    }
    .pane-1 {
      flex: 0 0 var(--pane-size, 50%);
    }
    .pane-2 {
      flex: 1 1 0%;
    }
    .divider {
      position: relative;
      flex: 0 0 6px;
      background-color: var(--flowx-border-color, #e2e8f0);
      cursor: col-resize;
      user-select: none;
      z-index: 10;
      transition: background-color var(--flowx-transition-fast);
    }
    .split-container.vertical .divider {
      cursor: row-resize;
      flex: 0 0 6px;
    }
    .divider:hover, .divider.dragging {
      background-color: var(--flowx-color-primary, #2563eb);
    }
    .divider::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 2px;
      height: 16px;
      background-color: var(--flowx-color-text-muted, #94a3b8);
      border-radius: 1px;
    }
    .split-container.vertical .divider::after {
      width: 16px;
      height: 2px;
    }
  `,template:e=>{const t=e.getAttribute("direction")||"horizontal",o=e.getAttribute("storage-key")||"flowx-split-ratio",r=e.hasAttribute("persist");let s=parseFloat(e.getAttribute("initial-split")||"50");if(r&&typeof localStorage<"u"){const i=localStorage.getItem(o);if(i){const a=parseFloat(i);isNaN(a)||(s=a)}}return e._ratio=s,`
      <div class="split-container ${t}">
        <div class="pane pane-1" style="--pane-size: ${s}%">
          <slot name="pane-1"></slot>
        </div>
        <div class="divider" tabIndex="0" role="separator" aria-valuenow="${s}"></div>
        <div class="pane pane-2">
          <slot name="pane-2"></slot>
        </div>
      </div>
    `},setup:e=>{const t=e.shadowRoot||e,o=t.querySelector(".divider"),r=t.querySelector(".pane-1"),s=t.querySelector(".split-container");if(!o||!s||!r)return;let i=!1;const a=d=>{i=!0,o.classList.add("dragging"),o.setPointerCapture(d.pointerId),d.preventDefault()},n=d=>{if(!i)return;const c=s.getBoundingClientRect(),u=e.getAttribute("direction")==="vertical";let p=50;if(u?p=(d.clientY-c.top)/c.height*100:p=(d.clientX-c.left)/c.width*100,p=Math.max(10,Math.min(90,p)),e._ratio=p,r.style.setProperty("--pane-size",`${p}%`),o.setAttribute("aria-valuenow",String(Math.round(p))),e.hasAttribute("persist")&&typeof localStorage<"u"){const h=e.getAttribute("storage-key")||"flowx-split-ratio";localStorage.setItem(h,String(p))}e.dispatchEvent(new CustomEvent("fx-resize",{bubbles:!0,composed:!0,detail:{ratio:p}}))},l=d=>{if(i){i=!1,o.classList.remove("dragging");try{o.releasePointerCapture(d.pointerId)}catch{}}};o.addEventListener("pointerdown",a),o.addEventListener("pointermove",n),o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l)}});b("flowx-resizable-panel",{observedAttributes:["handles","min-width","max-width","min-height","max-height"],style:`
    :host {
      display: inline-block;
      position: relative;
      box-sizing: border-box;
    }
    .panel {
      position: relative;
      box-sizing: border-box;
      background-color: var(--flowx-bg-surface, #ffffff);
      color: var(--flowx-color-text, #0f172a);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-md, 8px);
      padding: var(--flowx-space-4, 16px);
      box-shadow: var(--flowx-shadow-sm);
      height: 100%;
      width: 100%;
    }
    .handle {
      position: absolute;
      background: var(--flowx-border-color, #e2e8f0);
      z-index: 5;
      transition: background-color var(--flowx-transition-fast);
    }
    .handle:hover, .handle.dragging {
      background: var(--flowx-color-primary, #2563eb);
    }
    .handle-right {
      top: 0; right: 0; width: 6px; height: 100%; cursor: e-resize;
    }
    .handle-bottom {
      bottom: 0; left: 0; width: 100%; height: 6px; cursor: s-resize;
    }
    .handle-left {
      top: 0; left: 0; width: 6px; height: 100%; cursor: w-resize;
    }
    .handle-top {
      top: 0; left: 0; width: 100%; height: 6px; cursor: n-resize;
    }
  `,template:e=>{const o=(e.getAttribute("handles")||"right,bottom").split(",").map(s=>s.trim().toLowerCase());let r="";return o.includes("right")&&(r+='<div class="handle handle-right" data-edge="right"></div>'),o.includes("bottom")&&(r+='<div class="handle handle-bottom" data-edge="bottom"></div>'),o.includes("left")&&(r+='<div class="handle handle-left" data-edge="left"></div>'),o.includes("top")&&(r+='<div class="handle handle-top" data-edge="top"></div>'),`
      <div class="panel">
        <slot></slot>
        ${r}
      </div>
    `},setup:e=>{(e.shadowRoot||e).querySelectorAll(".handle").forEach(r=>{let s=!1,i=0,a=0,n=0,l=0;const d=r.getAttribute("data-edge"),c=h=>{const f=h;s=!0,r.classList.add("dragging"),r.setPointerCapture(f.pointerId);const m=e.getBoundingClientRect();i=f.clientX,a=f.clientY,n=m.width,l=m.height,f.preventDefault()},u=h=>{if(!s)return;const f=h,m=f.clientX-i,v=f.clientY-a;let x=n,w=l;const C=parseFloat(e.getAttribute("min-width")||"100"),E=parseFloat(e.getAttribute("max-width")||"2000"),F=parseFloat(e.getAttribute("min-height")||"100"),H=parseFloat(e.getAttribute("max-height")||"2000");d==="right"&&(x=Math.max(C,Math.min(E,n+m))),d==="bottom"&&(w=Math.max(F,Math.min(H,l+v))),d==="left"&&(x=Math.max(C,Math.min(E,n-m))),d==="top"&&(w=Math.max(F,Math.min(H,l-v))),e.style.width=`${x}px`,e.style.height=`${w}px`,e.dispatchEvent(new CustomEvent("fx-resize",{bubbles:!0,composed:!0,detail:{width:x,height:w,edge:d}}))},p=h=>{if(s){s=!1,r.classList.remove("dragging");try{r.releasePointerCapture(h.pointerId)}catch{}}};r.addEventListener("pointerdown",c),r.addEventListener("pointermove",u),r.addEventListener("pointerup",p),r.addEventListener("pointercancel",p)})}});b("flowx-responsive-layout",{observedAttributes:["breakpoint","collapsed"],style:`
    :host {
      display: block;
      width: 100%;
      container-type: inline-size;
      box-sizing: border-box;
    }
    .layout-wrapper {
      display: flex;
      width: 100%;
      height: 100%;
      background-color: var(--flowx-bg-base, #f8fafc);
      color: var(--flowx-color-text, #0f172a);
      box-sizing: border-box;
      transition: background-color var(--flowx-transition-base);
    }
    .sidebar-region {
      flex: 0 0 260px;
      background-color: var(--flowx-bg-surface, #ffffff);
      border-right: 1px solid var(--flowx-border-color, #e2e8f0);
      box-sizing: border-box;
      transition: transform var(--flowx-transition-base), width var(--flowx-transition-base);
    }
    .main-region {
      flex: 1 1 0%;
      padding: var(--flowx-space-5, 20px);
      box-sizing: border-box;
      overflow: auto;
    }

    /* Container query reflow for small widths */
    @container (max-width: 768px) {
      .layout-wrapper {
        flex-direction: column;
      }
      .sidebar-region {
        flex: 0 0 auto;
        width: 100%;
        border-right: none;
        border-bottom: 1px solid var(--flowx-border-color, #e2e8f0);
      }
    }
  `,template:()=>`
      <div class="layout-wrapper">
        <aside class="sidebar-region">
          <slot name="sidebar"></slot>
        </aside>
        <main class="main-region">
          <slot name="main"></slot>
          <slot></slot>
        </main>
      </div>
    `,setup:e=>{typeof ResizeObserver<"u"&&new ResizeObserver(o=>{for(const r of o){const s=r.contentRect.width,i=parseFloat(e.getAttribute("breakpoint")||"768"),a=s<i,n=e.hasAttribute("collapsed");e.setAttribute("data-compact",String(a)),e.dispatchEvent(new CustomEvent("fx-layout-change",{bubbles:!0,composed:!0,detail:{width:s,isCompact:a,isCollapsed:n}}))}}).observe(e)}});b("flowx-masonry",{observedAttributes:["cols","gap"],style:`
    :host {
      display: block;
      width: 100%;
      container-type: inline-size;
      box-sizing: border-box;
    }
    .masonry-wrapper {
      display: grid;
      width: 100%;
      grid-template-columns: repeat(var(--masonry-cols, 3), minmax(0, 1fr));
      grid-template-rows: masonry;
      gap: var(--masonry-gap, var(--flowx-space-4, 16px));
      background-color: var(--flowx-bg-base, #f8fafc);
      box-sizing: border-box;
      position: relative;
    }
    .masonry-fallback {
      position: relative;
      width: 100%;
    }
  `,template:e=>{const t=e.getAttribute("cols")||"3",r=`var(--flowx-space-${e.getAttribute("gap")||"4"}, 16px)`;return`
      <div class="masonry-wrapper" style="--masonry-cols: ${t}; --masonry-gap: ${r};">
        <slot></slot>
      </div>
    `},setup:e=>{const t=(e.shadowRoot||e).querySelector(".masonry-wrapper");if(!t)return;if(!(typeof CSS<"u"&&CSS.supports&&(CSS.supports("grid-template-rows","masonry")||CSS.supports("grid-rows","masonry")))){const r=()=>{const s=t.querySelector("slot"),i=s?s.assignedElements():Array.from(t.children);if(!i.length)return;const a=parseInt(e.getAttribute("cols")||"3",10),n=parseInt(e.getAttribute("gap")||"4",10)*4,d=((t.getBoundingClientRect().width||800)-n*(a-1))/a,c=new Array(a).fill(0);i.forEach(u=>{const p=u;let h=0;for(let x=1;x<a;x++)c[x]<c[h]&&(h=x);const f=h*(d+n),m=c[h];p.style.position="absolute",p.style.width=`${d}px`,p.style.left=`${f}px`,p.style.top=`${m}px`;const v=p.getBoundingClientRect().height||100;c[h]+=v+n}),t.style.height=`${Math.max(...c)}px`,t.style.display="block"};setTimeout(r,50),typeof ResizeObserver<"u"&&new ResizeObserver(r).observe(e)}}});b("flowx-dashboard-layout",{observedAttributes:["sidebar-width","right-panel"],style:`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      min-height: 500px;
      box-sizing: border-box;
    }
    .app-shell {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      background-color: var(--flowx-bg-base, #f8fafc);
      color: var(--flowx-color-text, #0f172a);
      box-sizing: border-box;
      overflow: hidden;
      transition: background-color var(--flowx-transition-base), color var(--flowx-transition-base);
    }
    .header-region {
      flex: 0 0 auto;
      background-color: var(--flowx-bg-surface, #ffffff);
      border-bottom: 1px solid var(--flowx-border-color, #e2e8f0);
      z-index: 20;
    }
    .body-region {
      flex: 1 1 0%;
      display: flex;
      overflow: hidden;
    }
    .sidebar-region {
      flex: 0 0 var(--sidebar-w, 240px);
      background-color: var(--flowx-bg-surface, #ffffff);
      border-right: 1px solid var(--flowx-border-color, #e2e8f0);
      overflow-y: auto;
      z-index: 15;
    }
    .main-region {
      flex: 1 1 0%;
      background-color: var(--flowx-bg-base, #f8fafc);
      overflow-y: auto;
      padding: var(--flowx-space-6, 24px);
      box-sizing: border-box;
    }
    .right-panel-region {
      flex: 0 0 280px;
      background-color: var(--flowx-bg-surface-raised, #ffffff);
      border-left: 1px solid var(--flowx-border-color, #e2e8f0);
      overflow-y: auto;
      box-shadow: var(--flowx-shadow-md);
    }
    .footer-region {
      flex: 0 0 auto;
      background-color: var(--flowx-bg-surface, #ffffff);
      border-top: 1px solid var(--flowx-border-color, #e2e8f0);
      padding: var(--flowx-space-2, 8px) var(--flowx-space-4, 16px);
      font-size: var(--flowx-font-size-sm, 12px);
      color: var(--flowx-color-text-muted);
    }
  `,template:e=>{const t=e.getAttribute("sidebar-width")||"240px",o=e.hasAttribute("right-panel");return`
      <div class="app-shell">
        <header class="header-region">
          <slot name="header"></slot>
        </header>
        <div class="body-region">
          <aside class="sidebar-region" style="--sidebar-w: ${t}">
            <slot name="sidebar"></slot>
          </aside>
          <main class="main-region">
            <slot name="main"></slot>
            <slot></slot>
          </main>
          ${o?`
            <aside class="right-panel-region">
              <slot name="right-panel"></slot>
            </aside>
          `:""}
        </div>
        <footer class="footer-region">
          <slot name="footer"></slot>
        </footer>
      </div>
    `}});b("flowx-notifications",{observedAttributes:["unread-count","fx-sse-connect","sse-event"],style:`
    :host {
      display: inline-block;
      position: relative;
      font-family: var(--flowx-font-sans);
    }
    .bell-btn {
      background: var(--flowx-bg-surface, #ffffff);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-round, 9999px);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      color: var(--flowx-color-text, #0f172a);
      transition: background-color var(--flowx-transition-fast, 0.2s);
      outline: none;
    }
    .bell-btn:hover {
      background: var(--flowx-bg-hover, rgba(0,0,0,0.05));
    }
    .bell-btn:focus-visible {
      box-shadow: 0 0 0 3px var(--flowx-color-primary, #2563eb);
    }
    .badge {
      position: absolute;
      top: -2px;
      right: -2px;
      background: var(--flowx-color-danger, #ef4444);
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      min-width: 18px;
      height: 18px;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      box-shadow: 0 0 0 2px var(--flowx-bg-surface, #ffffff);
    }
    .badge.hidden {
      display: none;
    }
    .dropdown-panel {
      position: absolute;
      right: 0;
      top: calc(100% + 8px);
      width: 320px;
      background: var(--flowx-bg-surface, #ffffff);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-md, 12px);
      box-shadow: var(--flowx-shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.1));
      z-index: 1000;
      display: none;
      flex-direction: column;
      max-height: 400px;
      overflow: hidden;
    }
    .dropdown-panel.open {
      display: flex;
    }
    .header {
      padding: 12px 16px;
      font-weight: 700;
      font-size: 0.9rem;
      border-bottom: 1px solid var(--flowx-border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--flowx-bg-surface-raised);
    }
    .mark-read-btn {
      font-size: 11px;
      color: var(--flowx-color-primary, #2563eb);
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 600;
    }
    .list {
      overflow-y: auto;
      flex: 1;
      padding: 0;
      margin: 0;
      list-style: none;
    }
    .item {
      padding: 12px 16px;
      border-bottom: 1px solid var(--flowx-border-color);
      transition: background-color 0.2s ease;
      animation: slideInDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .item.unread {
      background: var(--flowx-bg-hover, rgba(37, 99, 235, 0.05));
    }
    .item-title {
      font-weight: 600;
      font-size: 0.85rem;
      color: var(--flowx-color-text);
      margin-bottom: 2px;
    }
    .item-msg {
      font-size: 0.8rem;
      color: var(--flowx-color-text-muted, #64748b);
    }
    .item-time {
      font-size: 10px;
      color: var(--flowx-color-text-subtle, #94a3b8);
      margin-top: 4px;
    }
    .empty-state {
      padding: 24px;
      text-align: center;
      color: var(--flowx-color-text-muted);
      font-size: 0.85rem;
    }
    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translateY(-12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,template:e=>{const t=e._isOpen||!1,o=e._items||[],r=o.filter(i=>i.unread).length,s=o.length===0?'<div class="empty-state">No notifications</div>':o.map(i=>`
        <li class="item ${i.unread?"unread":""}" data-id="${i.id}">
          <div class="item-title">${i.title}</div>
          ${i.message?`<div class="item-msg">${i.message}</div>`:""}
          <div class="item-time">${i.time||"Just now"}</div>
        </li>
      `).join("");return`
      <button class="bell-btn" type="button" aria-expanded="${t}" aria-label="Notifications (${r} unread)">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span class="badge ${r===0?"hidden":""}">${r>99?"99+":r}</span>
      </button>

      <div class="dropdown-panel ${t?"open":""}" role="region" aria-label="Notifications panel">
        <div class="header">
          <span>Notifications</span>
          ${r>0?'<button class="mark-read-btn" type="button">Mark all as read</button>':""}
        </div>
        <ul class="list">
          ${s}
        </ul>
      </div>
    `},setup:e=>{e._items=e._items||[{id:"1",title:"System Welcome",message:"FlowX Real-time Engine initialized",time:"1m ago",unread:!0}],e._isOpen=!1,e.render(),(e.shadowRoot||e).addEventListener("click",r=>{const s=r.target,i=s.closest(".bell-btn"),a=s.closest(".mark-read-btn");i?(e._isOpen=!e._isOpen,e.render()):a&&(e._items=e._items.map(n=>({...n,unread:!1})),e.render())});const o=e.getAttribute("fx-sse-connect");if(o&&typeof window<"u"&&window.EventSource)try{const r=new EventSource(o),s=e.getAttribute("sse-event")||"notification";r.addEventListener(s,i=>{try{const a=JSON.parse(i.data),n={id:a.id||`notif-${Date.now()}`,title:a.title||"New Notification",message:a.message||"",time:"Just now",unread:!0};e._items=[n,...e._items],e.dispatchEvent(new CustomEvent("fx-notification-receive",{detail:n,bubbles:!0})),e.render()}catch{}}),e._eventSource=r}catch{}}});b("flowx-chat-window",{observedAttributes:["fx-post","fx-ws-connect","fx-sse-connect","current-user"],style:`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 420px;
      background: var(--flowx-bg-surface, #ffffff);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-lg, 16px);
      box-shadow: var(--flowx-shadow-md);
      overflow: hidden;
      font-family: var(--flowx-font-sans);
    }
    .chat-header {
      padding: 12px 16px;
      background: var(--flowx-bg-surface-raised, #f8fafc);
      border-bottom: 1px solid var(--flowx-border-color);
      font-weight: 700;
      font-size: 0.95rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--flowx-color-success, #10b981);
      display: inline-block;
      margin-right: 6px;
    }
    .messages-container {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: var(--flowx-bg-base, #fafafa);
    }
    .msg-group {
      display: flex;
      gap: 8px;
      max-width: 80%;
      align-items: flex-end;
    }
    .msg-group.self {
      align-self: flex-end;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--flowx-color-primary, #2563eb);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      flex-shrink: 0;
    }
    .msg-bubble {
      padding: 8px 14px;
      border-radius: 14px;
      background: var(--flowx-bg-surface, #ffffff);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      color: var(--flowx-color-text, #0f172a);
      font-size: 0.9rem;
      line-height: 1.4;
      box-shadow: var(--flowx-shadow-sm);
    }
    .msg-group.self .msg-bubble {
      background: var(--flowx-color-primary, #2563eb);
      color: #ffffff;
      border-color: var(--flowx-color-primary, #2563eb);
    }
    .msg-meta {
      font-size: 10px;
      color: var(--flowx-color-text-muted);
      margin-top: 2px;
    }
    .input-form {
      display: flex;
      padding: 12px;
      gap: 8px;
      background: var(--flowx-bg-surface, #ffffff);
      border-top: 1px solid var(--flowx-border-color);
    }
    .chat-input {
      flex: 1;
      padding: 8px 14px;
      border: 1px solid var(--flowx-border-color);
      border-radius: var(--flowx-radius-round);
      font-family: inherit;
      font-size: 0.9rem;
      outline: none;
      background: var(--flowx-bg-surface);
      color: var(--flowx-color-text);
    }
    .chat-input:focus-visible {
      border-color: var(--flowx-color-primary, #2563eb);
    }
    .send-btn {
      padding: 8px 16px;
      background: var(--flowx-color-primary, #2563eb);
      color: #ffffff;
      border: none;
      border-radius: var(--flowx-radius-round);
      font-weight: 600;
      cursor: pointer;
      font-size: 0.85rem;
    }
  `,template:e=>{const t=e._messages||[],o=t.map(r=>`
      <div class="msg-group ${r.isSelf?"self":""}" data-id="${r.id}">
        <div class="avatar">${r.sender?r.sender.charAt(0).toUpperCase():"U"}</div>
        <div>
          <div class="msg-bubble">${r.text}</div>
          <div class="msg-meta" style="text-align: ${r.isSelf?"right":"left"}">${r.sender} • ${r.time||"Just now"}</div>
        </div>
      </div>
    `).join("");return`
      <div class="chat-header">
        <div><span class="status-dot"></span>Live Chat Room</div>
        <span style="font-size: 11px; color: var(--flowx-color-text-muted);">${t.length} messages</span>
      </div>

      <div class="messages-container">
        ${o}
      </div>

      <form class="input-form">
        <input class="chat-input" type="text" placeholder="Type a message..." required />
        <button class="send-btn" type="submit">Send</button>
      </form>
    `},setup:e=>{e._messages=e._messages||[{id:"m-1",sender:"Bot",text:"Welcome to the collaborative room!",isSelf:!1,time:"10:00 AM"}];const t=e.getAttribute("current-user")||"You",o=e.shadowRoot||e,r=i=>{i.scrollTop+i.clientHeight<i.scrollHeight-40||(i.scrollTop=i.scrollHeight)};e.addMessage=i=>{const a=i.sender===t||i.isSelf===!0,n={...i,isSelf:a};if(!e._messages.some(d=>d.id===n.id||d.sender===n.sender&&d.text===n.text&&Math.abs(d._timestamp-Date.now())<5e3)){e._messages=[...e._messages,n],e.render();const d=o.querySelector(".messages-container");d&&r(d)}},o.addEventListener("submit",i=>{i.preventDefault();const a=o.querySelector(".chat-input");if(!a||!a.value.trim())return;const n=a.value.trim();a.value="";const l={id:`msg-${Date.now()}`,sender:t,text:n,isSelf:!0,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),_timestamp:Date.now()};e.addMessage(l),e.dispatchEvent(new CustomEvent("fx-message-send",{detail:l,bubbles:!0})),e._ws&&e._ws.readyState===WebSocket.OPEN&&e._ws.send(JSON.stringify(l))});const s=e.getAttribute("fx-sse-connect");if(s&&typeof window<"u"&&window.EventSource)try{const i=new EventSource(s);i.addEventListener("chat",a=>{try{const n=JSON.parse(a.data);e.addMessage(n)}catch{}}),e._eventSource=i}catch{}}});function Z(e){let t=0;for(const o of e)t+=1,o.replies&&(t+=Z(o.replies));return t}b("flowx-comments",{observedAttributes:["fx-post","fx-sse-connect","current-user"],style:`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--flowx-font-sans);
    }
    .comments-wrapper {
      background: var(--flowx-bg-surface, #ffffff);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-lg, 16px);
      padding: var(--flowx-space-6, 24px);
      box-shadow: var(--flowx-shadow-sm);
    }
    .comments-header {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 16px;
      color: var(--flowx-color-text);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .comment-card {
      padding: 12px 16px;
      background: var(--flowx-bg-surface-raised, #f8fafc);
      border: 1px solid var(--flowx-border-color);
      border-radius: var(--flowx-radius-md, 8px);
      margin-bottom: 12px;
    }
    .comment-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .author-info {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 0.85rem;
      color: var(--flowx-color-text);
    }
    .avatar-circle {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--flowx-color-primary, #2563eb);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
    }
    .comment-time {
      font-size: 11px;
      color: var(--flowx-color-text-muted);
    }
    .comment-content {
      font-size: 0.9rem;
      line-height: 1.5;
      color: var(--flowx-color-text);
    }
    .comment-actions {
      margin-top: 8px;
      display: flex;
      gap: 12px;
    }
    .reply-btn {
      font-size: 11px;
      color: var(--flowx-color-primary, #2563eb);
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 600;
      padding: 0;
    }
    .replies-thread {
      margin-left: 28px;
      border-left: 2px solid var(--flowx-border-color);
      padding-left: 14px;
      margin-top: 8px;
    }
    .new-comment-form {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .comment-textarea {
      width: 100%;
      min-height: 70px;
      padding: 10px 14px;
      border: 1px solid var(--flowx-border-color);
      border-radius: var(--flowx-radius-md);
      font-family: inherit;
      font-size: 0.9rem;
      box-sizing: border-box;
      outline: none;
      background: var(--flowx-bg-surface);
      color: var(--flowx-color-text);
    }
    .comment-textarea:focus-visible {
      border-color: var(--flowx-color-primary, #2563eb);
    }
    .submit-btn {
      align-self: flex-end;
      padding: 8px 16px;
      background: var(--flowx-color-primary, #2563eb);
      color: #fff;
      border: none;
      border-radius: var(--flowx-radius-md);
      font-weight: 600;
      cursor: pointer;
      font-size: 0.85rem;
    }
  `,template:e=>{const t=e._comments||[],o=e._replyingToId,r=s=>s.map(i=>`
        <div class="comment-card" data-id="${i.id}">
          <div class="comment-meta">
            <div class="author-info">
              <span class="avatar-circle">${i.author?i.author.charAt(0).toUpperCase():"U"}</span>
              <span>${i.author}</span>
            </div>
            <span class="comment-time">${i.time||"Just now"}</span>
          </div>
          <div class="comment-content">${i.content}</div>
          <div class="comment-actions">
            <button class="reply-btn" data-reply-id="${i.id}" type="button">Reply</button>
          </div>

          ${o===i.id?`
            <form class="new-comment-form reply-form" data-parent-id="${i.id}">
              <textarea class="comment-textarea" placeholder="Write a reply..." required></textarea>
              <button class="submit-btn" type="submit">Post Reply</button>
            </form>
          `:""}

          ${i.replies&&i.replies.length>0?`
            <div class="replies-thread">
              ${r(i.replies)}
            </div>
          `:""}
        </div>
      `).join("");return`
      <div class="comments-wrapper">
        <div class="comments-header">
          <span>Discussion (${Z(t)})</span>
        </div>

        <div class="comments-tree">
          ${r(t)}
        </div>

        <form class="new-comment-form main-form">
          <textarea class="comment-textarea main-input" placeholder="Add a comment..." required></textarea>
          <button class="submit-btn" type="submit">Post Comment</button>
        </form>
      </div>
    `},setup:e=>{e._comments=e._comments||[{id:"c-1",author:"Alice",content:"Great architectural baseline for real-time widgets!",time:"10m ago",replies:[{id:"c-2",author:"Bob",content:"Agreed, SSE integration simplifies live updates.",parentId:"c-1",time:"5m ago"}]}],e.render();const t=e.getAttribute("current-user")||"You";e.addComment=r=>{if(!r.parentId)e._comments=[...e._comments,r];else{const s=i=>i.map(a=>a.id===r.parentId?{...a,replies:[...a.replies||[],r]}:a.replies?{...a,replies:s(a.replies)}:a);e._comments=s(e._comments)}e._replyingToId=null,e.render()};const o=e.shadowRoot||e;o.addEventListener("click",r=>{const s=r.target;if(s.classList.contains("reply-btn")){const i=s.getAttribute("data-reply-id");e._replyingToId=e._replyingToId===i?null:i,e.render()}}),o.addEventListener("submit",r=>{r.preventDefault();const s=r.target,i=s.querySelector(".comment-textarea");if(!i||!i.value.trim())return;const a=s.getAttribute("data-parent-id")||null,n={id:`c-${Date.now()}`,author:t,content:i.value.trim(),parentId:a,time:"Just now",replies:[]};e.addComment(n),e.dispatchEvent(new CustomEvent("fx-comment-submit",{detail:n,bubbles:!0}))})}});b("flowx-mention",{observedAttributes:["search-url","debounce-ms"],style:`
    :host {
      display: block;
      position: relative;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--flowx-font-sans);
    }
    .popup-list {
      position: absolute;
      background: var(--flowx-bg-surface, #ffffff);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-md, 8px);
      box-shadow: var(--flowx-shadow-lg);
      max-height: 200px;
      overflow-y: auto;
      z-index: 1000;
      width: 220px;
      display: none;
      padding: 4px 0;
      margin: 0;
      list-style: none;
    }
    .popup-list.open {
      display: block;
    }
    .mention-item {
      padding: 8px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 0.85rem;
      color: var(--flowx-color-text);
    }
    .mention-item:hover, .mention-item.active {
      background: var(--flowx-bg-hover, rgba(37, 99, 235, 0.1));
      color: var(--flowx-color-primary, #2563eb);
    }
    .user-avatar {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--flowx-color-primary, #2563eb);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
    }
  `,template:e=>{const t=e._isOpen||!1,o=e._users||[],r=e._activeIdx||0,s=o.length===0?'<li class="mention-item" style="color: var(--flowx-color-text-muted);">No users found</li>':o.map((i,a)=>`
        <li class="mention-item ${a===r?"active":""}" data-id="${i.id}" data-username="${i.username}">
          <span class="user-avatar">${i.username.charAt(0).toUpperCase()}</span>
          <span>@${i.username}</span>
          ${i.name?`<span style="font-size: 11px; color: var(--flowx-color-text-muted); margin-left: auto;">${i.name}</span>`:""}
        </li>
      `).join("");return`
      <slot></slot>
      <ul class="popup-list ${t?"open":""}" style="left: ${e._popupX||0}px; top: ${e._popupY||35}px;">
        ${s}
      </ul>
    `},setup:e=>{e._users=[],e._isOpen=!1,e._activeIdx=0,e._searchQuery="";const t=[{id:"u1",username:"alice",name:"Alice Vance"},{id:"u2",username:"bob",name:"Bob Smith"},{id:"u3",username:"charlie",name:"Charlie Brown"},{id:"u4",username:"diana",name:"Diana Prince"}],o=e.shadowRoot||e;let r=null;const s=l=>l&&l.tagName&&["TEXTAREA","INPUT"].includes(l.tagName)?l:e.querySelector("textarea, input")||o.querySelector("textarea, input"),i=l=>{const d=s();if(!d)return;const c=d.value,u=c.lastIndexOf("@");if(u!==-1){const p=c.slice(0,u),h=`@[${l.username}](${l.id}) `;d.value=p+h,d.focus()}e._isOpen=!1,e.render(),e.dispatchEvent(new CustomEvent("fx-mention-select",{detail:l,bubbles:!0}))},a=l=>{const d=s(l.target);if(!d)return;const c=d.value,u=c.lastIndexOf("@");if(u!==-1&&u>=c.length-15&&!c.slice(u).includes(" ")){const p=c.slice(u+1).toLowerCase();e._searchQuery=p;const h=parseInt(e.getAttribute("debounce-ms")||"200",10);clearTimeout(r),r=setTimeout(()=>{const f=t.filter(m=>m.username.toLowerCase().includes(p)||m.name&&m.name.toLowerCase().includes(p));e._users=f,e._isOpen=!0,e._activeIdx=0,e._popupX=Math.min(200,u*8),e._popupY=d.offsetHeight||40,e.render()},h)}else e._isOpen&&(e._isOpen=!1,e.render())},n=l=>{if(!e._isOpen)return;const d=l;d.key==="ArrowDown"?(d.preventDefault(),e._activeIdx=(e._activeIdx+1)%Math.max(1,e._users.length),e.render()):d.key==="ArrowUp"?(d.preventDefault(),e._activeIdx=(e._activeIdx-1+e._users.length)%Math.max(1,e._users.length),e.render()):d.key==="Enter"||d.key==="Tab"?e._users[e._activeIdx]&&(d.preventDefault(),i(e._users[e._activeIdx])):d.key==="Escape"&&(e._isOpen=!1,e.render())};e.addEventListener("input",a),e.addEventListener("keydown",n),o.addEventListener("input",a),o.addEventListener("keydown",n),o.addEventListener("click",l=>{const c=l.target.closest(".mention-item");if(c){const u=c.getAttribute("data-username"),p=e._users.find(h=>h.username===u);p&&i(p)}})}});b("flowx-activity-feed",{observedAttributes:["fx-sse-connect","grouping"],style:`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--flowx-font-sans);
    }
    .feed-container {
      background: var(--flowx-bg-surface, #ffffff);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-lg, 16px);
      padding: var(--flowx-space-6, 24px);
      box-shadow: var(--flowx-shadow-sm);
    }
    .feed-header {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 16px;
      color: var(--flowx-color-text);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .activity-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--flowx-bg-surface-raised, #f8fafc);
      border: 1px solid var(--flowx-border-color);
      border-radius: var(--flowx-radius-md, 8px);
    }
    .actor-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--flowx-color-primary, #2563eb);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      flex-shrink: 0;
    }
    .activity-body {
      flex: 1;
      font-size: 0.9rem;
      color: var(--flowx-color-text);
    }
    .actor-name {
      font-weight: 700;
    }
    .action-text {
      color: var(--flowx-color-text-muted);
    }
    .activity-time {
      font-size: 11px;
      color: var(--flowx-color-text-subtle);
      margin-left: auto;
    }
  `,template:e=>{const t=e._items||[],o=e.getAttribute("grouping")!=="false";let r=[];if(o)for(const i of t){const a=r[r.length-1];a&&a.action===i.action&&a.target===i.target?a.othersCount=(a.othersCount||0)+1:r.push({...i,othersCount:0})}else r=t;const s=r.map(i=>{const a=i.othersCount&&i.othersCount>0?`${i.actor} and ${i.othersCount} ${i.othersCount===1?"other":"others"}`:i.actor;return`
        <div class="activity-card" data-id="${i.id}">
          <div class="actor-avatar">${i.actor.charAt(0).toUpperCase()}</div>
          <div class="activity-body">
            <span class="actor-name">${a}</span>
            <span class="action-text">${i.action}</span>
            ${i.target?`<strong style="color: var(--flowx-color-text);">${i.target}</strong>`:""}
          </div>
          <div class="activity-time">${i.time||"Just now"}</div>
        </div>
      `}).join("");return`
      <div class="feed-container">
        <div class="feed-header">
          <span>Activity Stream</span>
          <span style="font-size: 11px; color: var(--flowx-color-text-muted);">${r.length} events</span>
        </div>
        <div class="activity-list">
          ${s.length>0?s:'<div style="color: var(--flowx-color-text-muted);">No activity recorded</div>'}
        </div>
      </div>
    `},setup:e=>{e._items=e._items||[{id:"act-1",actor:"Alice",action:"commented on",target:"Tier 13 Specs",time:"10m ago"},{id:"act-2",actor:"Bob",action:"commented on",target:"Tier 13 Specs",time:"8m ago"},{id:"act-3",actor:"Charlie",action:"commented on",target:"Tier 13 Specs",time:"5m ago"},{id:"act-4",actor:"Diana",action:"deployed",target:"v1.1.0-beta",time:"2m ago"}];const t=e.getAttribute("fx-sse-connect");if(t&&typeof window<"u"&&window.EventSource)try{const o=new EventSource(t);o.addEventListener("activity",r=>{try{const s=JSON.parse(r.data),i={id:s.id||`act-${Date.now()}`,actor:s.actor||"User",action:s.action||"updated",target:s.target||"",time:"Just now"};e._items=[i,...e._items],e.render()}catch{}}),e._eventSource=o}catch{}}});export{b as d};
