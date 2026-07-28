function x(t,e,o={}){let r=o.placement||"bottom",i=o.align||"center",a=o.offset!==void 0?o.offset:8,s=()=>{if(!t||!e)return;let n=t.getBoundingClientRect(),l=e.style.display,d=e.style.visibility;l==="none"&&(e.style.display="block",e.style.visibility="hidden"),e.style.position="fixed";let c=e.getBoundingClientRect();e.style.display=l,e.style.visibility=d,e.style.position="fixed";let p=r,u=window.innerWidth,b=window.innerHeight;r==="bottom"&&n.bottom+c.height+a>b?n.top-c.height-a>=0&&(p="top"):r==="top"&&n.top-c.height-a<0?n.bottom+c.height+a<=b&&(p="bottom"):r==="right"&&n.right+c.width+a>u?n.left-c.width-a>=0&&(p="left"):r==="left"&&n.left-c.width-a<0&&n.right+c.width+a<=u&&(p="right");let v=0,h=0;p==="bottom"?(v=n.bottom+a,i==="start"?h=n.left:i==="end"?h=n.right-c.width:h=n.left+(n.width-c.width)/2):p==="top"?(v=n.top-c.height-a,i==="start"?h=n.left:i==="end"?h=n.right-c.width:h=n.left+(n.width-c.width)/2):p==="right"?(h=n.right+a,i==="start"?v=n.top:i==="end"?v=n.bottom-c.height:v=n.top+(n.height-c.height)/2):p==="left"&&(h=n.left-c.width-a,i==="start"?v=n.top:i==="end"?v=n.bottom-c.height:v=n.top+(n.height-c.height)/2),h<0&&(h=0),h+c.width>u&&(h=u-c.width),v<0&&(v=0),v+c.height>b&&(v=b-c.height),e.style.top=`${v}px`,e.style.left=`${h}px`};return window.addEventListener("scroll",s,{passive:!0}),window.addEventListener("resize",s,{passive:!0}),s(),{update:s,cleanup:()=>{window.removeEventListener("scroll",s),window.removeEventListener("resize",s)}}}function _(t){let e=document.activeElement,o=()=>{let a=["a[href]","area[href]","input:not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","iframe","object","embed",'[tabindex]:not([tabindex="-1"])',"[contenteditable]"],s=[],n=l=>{l.shadowRoot&&Array.from(l.shadowRoot.querySelectorAll("*")).forEach(n),l.matches&&a.some(d=>l.matches(d))&&s.push(l),Array.from(l.children).forEach(n)};return n(t),s},r=a=>{if(a.key!=="Tab")return;let s=o();if(s.length===0){a.preventDefault();return}let n=document.activeElement;for(;n&&n.shadowRoot&&n.shadowRoot.activeElement;)n=n.shadowRoot.activeElement;let l=s[0],d=s[s.length-1];a.shiftKey?(n===l||!s.includes(n))&&(d.focus(),a.preventDefault()):(n===d||!s.includes(n))&&(l.focus(),a.preventDefault())};t.addEventListener("keydown",r);let i=o();return i.length>0&&i[0].focus(),{cleanup:()=>{t.removeEventListener("keydown",r),e&&typeof e.focus=="function"&&e.focus()}}}function w(t,e){let o=i=>{i.composedPath().includes(t)||e()},r=i=>{i.key==="Escape"&&e()};return document.addEventListener("click",o,!0),document.addEventListener("keydown",r,!0),{cleanup:()=>{document.removeEventListener("click",o,!0),document.removeEventListener("keydown",r,!0)}}}function E(t,e){let o=()=>{let s=t.shadowRoot||t,n=Array.from(s.querySelectorAll(e)),l=Array.from(t.querySelectorAll(e));return Array.from(new Set([...n,...l]))},r=(s,n)=>{s.forEach(l=>{l===n?l.setAttribute("tabindex","0"):l.setAttribute("tabindex","-1")})},i=s=>{let n=o().filter(u=>!u.hasAttribute("disabled")&&u.getAttribute("aria-disabled")!=="true");if(n.length===0)return;let l=document.activeElement;for(;l&&l.shadowRoot&&l.shadowRoot.activeElement;)l=l.shadowRoot.activeElement;let d=n.indexOf(l);if(d===-1){let u=n.find(b=>b.getAttribute("tabindex")==="0");d=u?n.indexOf(u):0}let c=d;switch(s.key){case"ArrowRight":case"ArrowDown":c=(d+1)%n.length,s.preventDefault();break;case"ArrowLeft":case"ArrowUp":c=(d-1+n.length)%n.length,s.preventDefault();break;case"Home":c=0,s.preventDefault();break;case"End":c=n.length-1,s.preventDefault();break;default:return}let p=n[c];p&&(r(o(),p),p.focus())},a=()=>{let s=o();s.length>0&&(s.some(n=>n.getAttribute("tabindex")==="0")||r(s,s[0])),t.addEventListener("keydown",i)};return a(),{setup:a,update:()=>{let s=o(),n=s.find(l=>l.getAttribute("tabindex")==="0")||s[0];n&&r(s,n)},cleanup:()=>{t.removeEventListener("keydown",i)}}}var g=`
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
`;function f(t,e){class o extends HTMLElement{static get observedAttributes(){return e.observedAttributes||[]}_initialized=!1;constructor(){super(),e.shadow!==!1&&this.attachShadow({mode:"open"})}connectedCallback(){this._initialized||(this.render(),e.setup&&e.setup(this),this._initialized=!0)}attributeChangedCallback(a,s,n){if(s===n)return;let l=a.replace(/-([a-z])/g,c=>c[1].toUpperCase()),d=n;n===""&&(d=!0),n===null&&(d=!1),this[l]!==d&&(this[l]=d),this._initialized&&this.render()}render(){let a=`<style>${g}${e.style||""}</style>`,s="";typeof e.template=="function"?s=e.template(this):typeof e.template=="string"&&(s=e.template);let n=`${a}${s}`;this.shadowRoot?this.shadowRoot.innerHTML=n:this.innerHTML=n}}let r=o.prototype;return e.observedAttributes&&e.observedAttributes.forEach(i=>{let a=i.replace(/-([a-z])/g,s=>s[1].toUpperCase());Object.getOwnPropertyDescriptor(r,a)||Object.defineProperty(r,a,{get(){let s=this.getAttribute(i);return s===""?!0:s===null?!1:s},set(s){s===null||s===!1?this.hasAttribute(i)&&this.removeAttribute(i):s===!0?this.getAttribute(i)!==""&&this.setAttribute(i,""):this.getAttribute(i)!==String(s)&&this.setAttribute(i,String(s))},configurable:!0})}),customElements.get(t)||customElements.define(t,o),o}f("flowx-button",{observedAttributes:["variant","size","disabled","loading"],style:`
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
  `,template:t=>{let e=t.getAttribute("variant")||"primary",o=t.getAttribute("size")||"md",r=t.hasAttribute("disabled"),i=t.hasAttribute("loading");return`
      <button 
        class="btn ${e} ${o} ${i?"loading":""}"
        ${r||i?"disabled":""}
        aria-disabled="${r||i?"true":"false"}"
        aria-busy="${i?"true":"false"}"
      >
        ${i?'<span class="spinner"></span>':""}
        <span class="btn-text"><slot></slot></span>
      </button>
    `}});f("flowx-icon-button",{observedAttributes:["variant","size","disabled","loading","round","aria-label"],style:`
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
  `,template:t=>{let e=t.getAttribute("variant")||"primary",o=t.getAttribute("size")||"md",r=t.hasAttribute("disabled"),i=t.hasAttribute("loading"),a=t.hasAttribute("round"),s=t.getAttribute("aria-label")||"icon button";return`
      <button 
        class="btn ${e} ${o} ${a?"circle":"square"} ${i?"loading":""}"
        ${r||i?"disabled":""}
        aria-label="${s}"
        aria-disabled="${r||i?"true":"false"}"
        aria-busy="${i?"true":"false"}"
      >
        ${i?'<span class="spinner"></span>':"<slot></slot>"}
      </button>
    `}});f("flowx-link",{observedAttributes:["href","target","download"],style:`
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
  `,template:t=>{let e=t.getAttribute("href")||"#",o=t.getAttribute("target")||"",r=t.getAttribute("download"),i=!1;(e.startsWith("http://")||e.startsWith("https://"))&&(typeof window<"u"?new URL(e).hostname!==window.location.hostname&&(i=!0):i=!0);let a=i?'rel="noopener noreferrer"':"";i&&!o&&(o="_blank");let s=o?`target="${o}"`:"",n=r!==null?`download="${r}"`:"";return`
      <a 
        class="link"
        href="${e}"
        ${s}
        ${a}
        ${n}
      >
        <slot></slot>
        ${i?'<span class="external-icon" aria-hidden="true">↗</span>':""}
      </a>
    `}});f("flowx-badge",{observedAttributes:["variant","size"],style:`
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
  `,template:t=>{let e=t.getAttribute("variant")||"neutral",o=t.getAttribute("size")||"md";return`
      <span class="badge ${e} ${o}">
        <slot></slot>
      </span>
    `}});f("flowx-avatar",{observedAttributes:["src","alt","name","img-failed"],style:`
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
  `,setup:t=>{let e=()=>{let o=t.shadowRoot?.querySelector(".avatar-img");o&&o.addEventListener("error",()=>{t.setAttribute("img-failed","")})};e(),t.addEventListener("load",e)},template:t=>{let e=t.getAttribute("src"),o=t.getAttribute("alt")||"",r=t.getAttribute("name")||"",i=t.hasAttribute("img-failed"),a="";return r&&(a=r.trim().split(/\s+/).map(s=>s[0]).slice(0,2).join("").toUpperCase()),`<div class="avatar-container">${e&&!i?`<img class="avatar-img" src="${e}" alt="${o}" />`:`<div class="avatar-fallback" aria-label="${r||o}">${a||"?"}</div>`}</div>`}});f("flowx-card",{style:`
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
  `});f("flowx-divider",{observedAttributes:["orientation"],style:`
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
  `,template:t=>{let e=t.getAttribute("orientation")||"horizontal";return`
      <hr 
        class="divider ${e}" 
        role="separator" 
        aria-orientation="${e}"
      />
    `}});f("flowx-chip",{observedAttributes:["dismissible"],style:`
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
  `,setup:t=>{(()=>{let e=t.shadowRoot?.querySelector(".close-btn");if(e){let o=r=>{r.stopPropagation();let i=new CustomEvent("close",{bubbles:!0,composed:!0,cancelable:!0});t.dispatchEvent(i)&&t.remove()};e.addEventListener("click",o),e.addEventListener("keydown",r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),o(r))})}})()},template:t=>`
      <span class="chip" role="status">
        <span class="chip-text"><slot></slot></span>
        ${t.hasAttribute("dismissible")?`
          <button 
            type="button" 
            class="close-btn" 
            aria-label="Dismiss tag"
          >
            ×
          </button>
        `:""}
      </span>
    `});f("flowx-alert",{observedAttributes:["variant","dismissible"],style:`
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
  `,setup:t=>{(()=>{let e=t.shadowRoot?.querySelector(".close-btn");e&&e.addEventListener("click",o=>{o.stopPropagation();let r=new CustomEvent("close",{bubbles:!0,composed:!0,cancelable:!0});t.dispatchEvent(r)&&t.remove()})})()},template:t=>{let e=t.getAttribute("variant")||"info",o=t.hasAttribute("dismissible");return`
      <div class="alert ${e}" role="alert">
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
    `}});f("flowx-toast",{observedAttributes:["variant","duration","fx-sse-connect","sse-event"],style:`
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
  `,setup:t=>{let e=t.getAttribute("duration"),o=e?Number(e):3e3,r=t.getAttribute("fx-sse-connect");if(r&&typeof window<"u"&&window.EventSource)try{let i=new EventSource(r),a=t.getAttribute("sse-event")||"toast";i.addEventListener(a,s=>{try{let n=typeof s.data=="string"&&s.data.startsWith("{")?JSON.parse(s.data):{message:s.data};T.show({message:n.message||n.title||s.data,variant:n.variant||"info",duration:n.duration||3500})}catch{}}),t._eventSource=i}catch{}r||setTimeout(()=>{let i=t.shadowRoot?.querySelector(".toast");i&&(i.classList.add("fade-out"),setTimeout(()=>{t.remove()},250))},o)},template:t=>`
      <div class="toast ${t.getAttribute("variant")||"info"}" role="status" aria-live="polite">
        <span class="indicator"></span>
        <div class="toast-body">
          <slot></slot>
        </div>
      </div>
    `});var T={show(t){if(typeof document>"u")return;let e=document.getElementById("flowx-toast-container");if(!e){e=document.createElement("div"),e.id="flowx-toast-container";let r=document.createElement("style");r.innerHTML=`
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
      `,document.head.appendChild(r),document.body.appendChild(e)}let o=document.createElement("flowx-toast");return t.variant&&o.setAttribute("variant",t.variant),t.duration&&o.setAttribute("duration",String(t.duration)),o.textContent=t.message,e.appendChild(o),o},connectSSE(t,e="toast"){if(typeof window>"u"||!window.EventSource)return;let o=new EventSource(t);return o.addEventListener(e,r=>{try{let i=typeof r.data=="string"&&r.data.startsWith("{")?JSON.parse(r.data):{message:r.data};T.show({message:i.message||i.title||r.data,variant:i.variant||"info",duration:i.duration||3500})}catch{}}),o}};typeof window<"u"&&(window.FlowXToast=T);f("flowx-progress",{observedAttributes:["value","max"],style:`
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
  `,template:t=>{let e=Number(t.getAttribute("value")||0),o=Number(t.getAttribute("max")||100),r=Math.min(Math.max(e/o*100,0),100);return`
      <div 
        class="progress-track"
        role="progressbar"
        aria-valuenow="${e}"
        aria-valuemin="0"
        aria-valuemax="${o}"
      >
        <div class="progress-bar" style="width: ${r}%"></div>
      </div>
    `}});f("flowx-spinner",{observedAttributes:["size"],style:`
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
  `,template:t=>`
      <div 
        class="spinner ${t.getAttribute("size")||"md"}" 
        role="status" 
        aria-label="Loading"
      ></div>
    `});f("flowx-skeleton",{observedAttributes:["variant","width","height"],style:`
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
  `,template:t=>{let e=t.getAttribute("variant")||"text",o=t.getAttribute("width")||"100%",r=t.getAttribute("height")||(e==="circle"?"40px":e==="rect"?"100px":""),i=`width: ${o}; ${r?`height: ${r};`:""}`;return`
      <div 
        class="skeleton ${e}" 
        style="${i}"
        role="presentation"
        aria-hidden="true"
      ></div>
    `}});f("flowx-tooltip",{observedAttributes:["content","placement","delay"],style:`
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
  `,setup:t=>{let e=t.shadowRoot?.querySelector(".tooltip-panel"),o=null,r=null,i=()=>{r&&clearTimeout(r);let n=parseInt(t.getAttribute("delay")||"100",10);r=setTimeout(()=>{e&&(e.classList.add("visible"),o=x(t,e,{placement:t.getAttribute("placement")||"top",offset:8}))},n)},a=()=>{r&&clearTimeout(r),e&&e.classList.remove("visible"),o&&(o.cleanup(),o=null)};t.addEventListener("mouseenter",i),t.addEventListener("mouseleave",a),t.addEventListener("focusin",i),t.addEventListener("focusout",a);let s=`flowx-tooltip-${Math.random().toString(36).substr(2,9)}`;e?.setAttribute("id",s),e?.setAttribute("role","tooltip"),t.setAttribute("aria-describedby",s)},template:t=>`
      <slot></slot>
      <div class="tooltip-panel">${t.getAttribute("content")||""}</div>
    `});f("flowx-popover",{observedAttributes:["placement","open"],style:`
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
  `,setup:t=>{let e=t.shadowRoot?.querySelector(".popover-panel"),o=t.shadowRoot?.querySelector('slot[name="trigger"]'),r=null,i=null,a=()=>{t.setAttribute("open","")},s=()=>{t.removeAttribute("open")},n=c=>{c.stopPropagation(),t.hasAttribute("open")?s():a()},l=()=>{let c=o?.assignedElements();if(c&&c.length>0){let p=c[0];p.removeEventListener("click",n),p.addEventListener("click",n)}};o?.addEventListener("slotchange",l),l();let d=()=>{if(t.hasAttribute("open")){if(e){e.classList.add("visible");let c=o?.assignedElements(),p=c&&c[0]||t;r=x(p,e,{placement:t.getAttribute("placement")||"bottom",offset:8}),i=w(t,s)}}else e&&e.classList.remove("visible"),r&&(r.cleanup(),r=null),i&&(i.cleanup(),i=null)};new MutationObserver(c=>{c.forEach(p=>{p.attributeName==="open"&&d()})}).observe(t,{attributes:!0}),d(),e?.setAttribute("role","dialog")},template:()=>`
      <slot name="trigger"></slot>
      <div class="popover-panel">
        <slot name="content"></slot>
      </div>
    `});f("flowx-dropdown-item",{observedAttributes:["value","disabled"],style:`
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
  `,setup:t=>{t.setAttribute("role","menuitem"),t.hasAttribute("tabindex")||t.setAttribute("tabindex","-1");let e=()=>{t.hasAttribute("disabled")||t.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{value:t.getAttribute("value")||t.textContent?.trim()}}))};t.addEventListener("click",e),t.addEventListener("keydown",o=>{(o.key===" "||o.key==="Enter")&&(o.preventDefault(),e())})},template:()=>'<div class="dropdown-item"><slot></slot></div>'});f("flowx-dropdown",{observedAttributes:["label","placement","open"],style:`
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
  `,setup:t=>{let e=t.shadowRoot?.querySelector(".trigger-btn"),o=t.shadowRoot?.querySelector(".dropdown-panel"),r=null,i=null,a=null,s=()=>{t.setAttribute("open","")},n=()=>{t.removeAttribute("open")},l=c=>{c.stopPropagation(),t.hasAttribute("open")?n():s()};e?.addEventListener("click",l);let d=()=>{if(t.hasAttribute("open")){if(o){o.classList.add("visible"),r=x(e,o,{placement:t.getAttribute("placement")||"bottom",offset:4}),i=w(t,n),a=E(t,"flowx-dropdown-item");let c=t.querySelector("flowx-dropdown-item");c&&c.focus()}}else o&&o.classList.remove("visible"),r&&(r.cleanup(),r=null),i&&(i.cleanup(),i=null),a&&(a.cleanup(),a=null)};new MutationObserver(c=>{c.forEach(p=>{p.attributeName==="open"&&d()})}).observe(t,{attributes:!0}),t.addEventListener("select",()=>{n(),e?.focus()}),d(),o?.setAttribute("role","menu")},template:t=>`
      <button class="trigger-btn" aria-haspopup="true">
        <span>${t.getAttribute("label")||"Dropdown"}</span>
        <span class="arrow">▼</span>
      </button>
      <div class="dropdown-panel">
        <slot></slot>
      </div>
    `});f("flowx-accordion-item",{observedAttributes:["header","open"],style:`
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
  `,setup:t=>{let e=t.shadowRoot?.querySelector(".header-btn"),o=()=>{t.hasAttribute("open")?t.removeAttribute("open"):t.setAttribute("open",""),t.dispatchEvent(new CustomEvent("toggle",{bubbles:!0,composed:!0}))};e?.addEventListener("click",o),t.addEventListener("focus",()=>{e?.focus()});let r=()=>{let i=t.hasAttribute("open");e?.setAttribute("aria-expanded",i?"true":"false")};new MutationObserver(()=>r()).observe(t,{attributes:!0,attributeFilter:["open"]}),r()},template:t=>`
      <button class="header-btn" tabindex="-1">
        <span>${t.getAttribute("header")||"Accordion Item"}</span>
        <span class="arrow">▶</span>
      </button>
      <div class="content-box">
        <slot></slot>
      </div>
    `});f("flowx-accordion",{observedAttributes:["multi"],style:`
    :host {
      display: block;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--flowx-radius-md);
      overflow: hidden;
      background: #0d1117;
    }
  `,setup:t=>{let e=null,o=r=>{let i=r.target;i.tagName.toLowerCase()==="flowx-accordion-item"&&!t.hasAttribute("multi")&&i.hasAttribute("open")&&Array.from(t.querySelectorAll("flowx-accordion-item")).forEach(a=>{a!==i&&a.removeAttribute("open")})};t.addEventListener("toggle",o),e=E(t,"flowx-accordion-item"),new MutationObserver(()=>{e&&e.update()}).observe(t,{childList:!0})},template:()=>"<slot></slot>"});f("flowx-tab",{observedAttributes:["value","selected"],style:`
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
  `,setup:t=>{t.setAttribute("role","tab"),t.hasAttribute("tabindex")||t.setAttribute("tabindex","-1");let e=()=>{t.dispatchEvent(new CustomEvent("tab-select",{bubbles:!0,composed:!0,detail:{value:t.getAttribute("value")}}))};t.addEventListener("click",e),t.addEventListener("keydown",r=>{(r.key===" "||r.key==="Enter")&&(r.preventDefault(),e())}),t.addEventListener("focus",()=>{t.shadowRoot?.querySelector(".tab-btn")?.focus()});let o=()=>{let r=t.hasAttribute("selected");t.setAttribute("aria-selected",r?"true":"false")};new MutationObserver(()=>o()).observe(t,{attributes:!0,attributeFilter:["selected"]}),o()},template:()=>'<button class="tab-btn" tabindex="-1"><slot></slot></button>'});f("flowx-tab-list",{observedAttributes:[],style:`
    :host {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      gap: var(--flowx-spacing-sm);
    }
  `,setup:t=>{t.setAttribute("role","tablist");let e=E(t,"flowx-tab");new MutationObserver(()=>{e&&e.update()}).observe(t,{childList:!0})},template:()=>"<slot></slot>"});f("flowx-tab-panel",{observedAttributes:["value","visible"],style:`
    :host {
      display: none;
      padding: var(--flowx-spacing-md) 0;
      font-family: var(--flowx-font-family);
      color: #e6edf3;
    }
    :host([visible]) {
      display: block;
    }
  `,setup:t=>{t.setAttribute("role","tabpanel")},template:()=>"<slot></slot>"});f("flowx-tabs",{observedAttributes:["value"],style:`
    :host {
      display: block;
      background: #0d1117;
      border-radius: var(--flowx-radius-md);
      padding: var(--flowx-spacing-md);
    }
  `,setup:t=>{let e=()=>{let o=t.getAttribute("value"),r=t,i=Array.from(r.querySelectorAll("flowx-tab")),a=Array.from(r.querySelectorAll("flowx-tab-panel"));i.forEach(s=>{let n=s.getAttribute("value");n===o?(s.setAttribute("selected",""),s.setAttribute("tabindex","0")):(s.removeAttribute("selected"),s.setAttribute("tabindex","-1"));let l=s.getAttribute("id")||`flowx-tab-${n}`,d=`flowx-panel-${n}`;s.setAttribute("id",l),s.setAttribute("aria-controls",d)}),a.forEach(s=>{let n=s.getAttribute("value");n===o?s.setAttribute("visible",""):s.removeAttribute("visible");let l=`flowx-tab-${n}`,d=s.getAttribute("id")||`flowx-panel-${n}`;s.setAttribute("id",d),s.setAttribute("aria-labelledby",l)})};t.addEventListener("tab-select",o=>{let r=o.detail.value;t.setAttribute("value",r)}),new MutationObserver(()=>e()).observe(t,{childList:!0,attributes:!0,attributeFilter:["value"]}),e()},template:()=>"<slot></slot>"});f("flowx-breadcrumb",{observedAttributes:["separator"],style:`
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
  `,setup:t=>{let e=t.shadowRoot;t.setAttribute("role","navigation"),t.setAttribute("aria-label","Breadcrumb");let o=()=>{let r=Array.from(t.children).filter(s=>!s.getAttribute("slot")?.startsWith("item-")),i=t.getAttribute("separator")||"/",a='<ol class="breadcrumb">';if(r.forEach((s,n)=>{let l=`item-${n}`;s.setAttribute("slot",l),n===r.length-1?s.setAttribute("aria-current","page"):s.removeAttribute("aria-current"),a+=`<li class="breadcrumb-item"><slot name="${l}"></slot></li>`,n<r.length-1&&(a+=`<li class="separator" aria-hidden="true">${i}</li>`)}),a+="</ol>",e){let s=e.querySelector(".breadcrumb-container nav");s&&(s.innerHTML=a)}};new MutationObserver(()=>{o()}).observe(t,{childList:!0}),o()},template:()=>`
      <div class="breadcrumb-container">
        <nav></nav>
      </div>
    `});f("flowx-pagination",{observedAttributes:["current-page","total-pages"],style:`
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
  `,setup:t=>{let e=r=>{let i=parseInt(t.getAttribute("total-pages")||"1",10);r<1||r>i||(t.setAttribute("current-page",String(r)),t.dispatchEvent(new CustomEvent("fx-page-change",{bubbles:!0,composed:!0,detail:{page:r}})),t.render(),o())},o=()=>{t.shadowRoot?.querySelectorAll(".page-btn")?.forEach(r=>{r.addEventListener("click",()=>{let i=parseInt(r.getAttribute("data-page")||"1",10);e(i)})})};new MutationObserver(()=>{o()}).observe(t,{attributes:!0}),o(),t.changePage=e},template:t=>{let e=parseInt(t.getAttribute("current-page")||"1",10),o=parseInt(t.getAttribute("total-pages")||"1",10),r=[];if(o<=7)for(let a=1;a<=o;a++)r.push(a);else e<=4?r.push(1,2,3,4,5,"...",o):e>=o-3?r.push(1,"...",o-4,o-3,o-2,o-1,o):r.push(1,"...",e-1,e,e+1,"...",o);let i='<div class="pagination-container">';return i+=`<button class="page-btn prev" data-page="${e-1}" ${e===1?"disabled":""} aria-label="Go to previous page">⟨</button>`,r.forEach(a=>{a==="..."?i+='<span class="ellipsis" aria-hidden="true">...</span>':i+=`<button class="page-btn ${a===e?"active":""}" data-page="${a}" aria-label="Go to page ${a}" aria-current="${a===e?"page":"false"}">${a}</button>`}),i+=`<button class="page-btn next" data-page="${e+1}" ${e===o?"disabled":""} aria-label="Go to next page">⟩</button>`,i+="</div>",i}});f("flowx-stepper",{observedAttributes:["current","orientation"],style:`
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
  `,setup:()=>{},template:t=>{let e=parseInt(t.getAttribute("current")||"0",10),o=t.getAttribute("orientation")||"horizontal",r=t.hasAttribute("clickable");if(Array.from(t.querySelectorAll("[data-step]")).length===0){let i=t.getAttribute("data-steps")||"",a=i?i.split(",").map(n=>n.trim()):["Step 1","Step 2","Step 3"],s='<div class="stepper">';return a.forEach((n,l)=>{let d=l<e;s+=`<div class="step ${d?"completed":l===e?"current":""} ${r?"clickable":""}" data-index="${l}" role="listitem">`,s+=`<div class="step-indicator">${d?"✓":l+1}</div>`,s+=`<div class="step-label">${n}</div>`,s+="</div>",l<a.length-1&&o!=="vertical"&&(s+=`<div class="connector ${d?"filled":""}"></div>`)}),s+="</div>",s}return'<div class="stepper" role="list"><slot></slot></div>'}});f("flowx-timeline",{observedAttributes:["align"],style:`
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
  `});f("flowx-timeline-item",{observedAttributes:["time","title"],style:`
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
  `,setup:()=>{},template:t=>{let e=t.getAttribute("time")||"",o=t.getAttribute("title")||"";return`
      ${e?`<div class="timeline-time">${e}</div>`:""}
      <div class="timeline-content">
        ${o?`<h4 class="timeline-title">${o}</h4>`:""}
        <div class="timeline-body"><slot></slot></div>
      </div>
    `}});var N=`
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
`,C=`
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
`,Q=["required","disabled","name","value","label","hint","invalid"];function y(t,e){let o=[...new Set([...Q,...e.observedAttributes||[]])];class r extends HTMLElement{static formAssociated=!0;static get observedAttributes(){return o}internals;_initialized=!1;constructor(){super(),this.attachShadow({mode:"open"});try{this.internals=this.attachInternals()}catch{this.internals={setFormValue:()=>{},setValidity:()=>{},checkValidity:()=>!0,reportValidity:()=>!0,get validationMessage(){return""},get form(){return null},get validity(){return{valid:!0}}}}}connectedCallback(){this._initialized||(this.render(),e.setup&&e.setup(this,this.internals),this._syncValidity(),this._initialized=!0)}attributeChangedCallback(a,s,n){s!==n&&this._initialized&&(this.render(),this._syncValidity(),e.setup&&e.setup(this,this.internals))}render(){if(!this.shadowRoot)return;let a=`<style>${g}${N}${e.style||""}</style>`;this.shadowRoot.innerHTML=`${a}${e.template(this)}`}setFormValue(a){try{this.internals.setFormValue(a)}catch{}}setValidity(a,s,n){try{n?this.internals.setValidity(a,s,n):this.internals.setValidity(a,s)}catch{}}markValid(){try{this.internals.setValidity({})}catch{}}get form(){return this.internals.form}get validity(){return this.internals.validity}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.internals.checkValidity()}reportValidity(){return this.internals.reportValidity()}_syncValidity(){let a=this.hasAttribute("required"),s=this.getAttribute("value")||"",n=this._currentValue??s;if(a&&!n){let l=this.getAttribute("label")||this.getAttribute("name")||"This field";this.setValidity({valueMissing:!0},`${l} is required`),this.setAttribute("invalid","")}else this.markValid(),this.removeAttribute("invalid");if(this.hasAttribute("disabled"))try{this.internals.setFormValue(null)}catch{}}}return o.forEach(i=>{let a=i.replace(/-([a-z])/g,(s,n)=>n.toUpperCase());Object.getOwnPropertyDescriptor(r.prototype,a)||Object.defineProperty(r.prototype,a,{get(){let s=this.getAttribute(i);return s===""?!0:s===null?!1:s},set(s){s===null||s===!1?this.removeAttribute(i):s===!0?this.setAttribute(i,""):this.setAttribute(i,String(s))},configurable:!0})}),customElements.get(t)||customElements.define(t,r),r}function Z(t,e){let o=Array.isArray(e)?Object.fromEntries(e.map(r=>[r.field,r.message])):e;t.querySelectorAll("flowx-form-error").forEach(r=>{r.textContent="",r.removeAttribute("visible")});for(let[r,i]of Object.entries(o)){let a=t.querySelector(`flowx-form-error[for="${r}"]`);a&&(a.textContent=i,a.setAttribute("visible",""));let s=t.querySelector(`[name="${r}"]`);s&&s.setAttribute("invalid","")}}y("flowx-input",{observedAttributes:["type","placeholder","pattern","minlength","maxlength","autocomplete","readonly"],style:`${C}
    .wrapper { position: relative; }
    input[type="password"] { letter-spacing: 0.1em; }
  `,template:t=>{let e=t.getAttribute("label")||"",o=t.getAttribute("hint")||"",r=t.getAttribute("type")||"text",i=t.getAttribute("placeholder")||"",a=t.getAttribute("value")||"",s=t.getAttribute("name")||"",n=t.hasAttribute("required")?"required":"",l=t.hasAttribute("disabled")?"disabled":"",d=t.hasAttribute("readonly")?"readonly":"",c=t.getAttribute("pattern")?`pattern="${t.getAttribute("pattern")}"`:"",p=t.getAttribute("minlength")?`minlength="${t.getAttribute("minlength")}"`:"",u=t.getAttribute("maxlength")?`maxlength="${t.getAttribute("maxlength")}"`:"",b=t.getAttribute("autocomplete")||"off";return`
      ${e?`<label for="inner">${e}${n?' <span aria-hidden="true" style="color:var(--flowx-error)">*</span>':""}</label>`:""}
      <div class="wrapper">
        <input
          id="inner"
          type="${r}"
          name="${s}"
          value="${a}"
          placeholder="${i}"
          autocomplete="${b}"
          ${n} ${l} ${d} ${c} ${p} ${u}
          aria-required="${!!n}"
          aria-label="${e||s}"
        />
      </div>
      ${o?`<div class="field-hint">${o}</div>`:""}
    `},setup:(t,e)=>{let o=t.shadowRoot?.querySelector("input");if(!o)return;e.setFormValue(o.value||t.getAttribute("value")||""),t._currentValue=o.value;let r=()=>{if(t._currentValue=o.value,e.setFormValue(o.value),o.validity.valid){try{e.setValidity({})}catch{}t.removeAttribute("invalid")}else{try{e.setValidity(o.validity,o.validationMessage,o)}catch{}t.setAttribute("invalid","")}};o.addEventListener("input",r),o.addEventListener("change",r),o.addEventListener("blur",r)}});y("flowx-textarea",{observedAttributes:["rows","cols","placeholder","minlength","maxlength","resize","readonly"],style:`${C}
    textarea {
      resize: var(--fx-textarea-resize, vertical);
      min-height: 80px;
    }
    :host([resize="none"]) textarea { resize: none; }
    :host([resize="horizontal"]) textarea { resize: horizontal; }
    :host([resize="both"]) textarea { resize: both; }
  `,template:t=>{let e=t.getAttribute("label")||"",o=t.getAttribute("hint")||"",r=t.getAttribute("name")||"",i=t.getAttribute("placeholder")||"",a=t.getAttribute("value")||"",s=t.getAttribute("rows")||"4",n=t.hasAttribute("required")?"required":"",l=t.hasAttribute("disabled")?"disabled":"",d=t.hasAttribute("readonly")?"readonly":"",c=t.getAttribute("minlength")?`minlength="${t.getAttribute("minlength")}"`:"",p=t.getAttribute("maxlength")?`maxlength="${t.getAttribute("maxlength")}"`:"";return`
      ${e?`<label for="inner">${e}${n?' <span aria-hidden="true" style="color:var(--flowx-error)">*</span>':""}</label>`:""}
      <textarea
        id="inner"
        name="${r}"
        rows="${s}"
        placeholder="${i}"
        ${n} ${l} ${d} ${c} ${p}
        aria-required="${!!n}"
        aria-label="${e||r}"
      >${a}</textarea>
      ${o?`<div class="field-hint">${o}</div>`:""}
    `},setup:(t,e)=>{let o=t.shadowRoot?.querySelector("textarea");if(!o)return;e.setFormValue(o.value),t._currentValue=o.value;let r=()=>{if(t._currentValue=o.value,e.setFormValue(o.value),o.validity.valid){try{e.setValidity({})}catch{}t.removeAttribute("invalid")}else{try{e.setValidity(o.validity,o.validationMessage,o)}catch{}t.setAttribute("invalid","")}};o.addEventListener("input",r),o.addEventListener("blur",r)}});y("flowx-checkbox",{observedAttributes:["checked","value"],style:`
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
  `,template:t=>{let e=t.getAttribute("label")||"";return`
      <div class="box" role="checkbox"
        aria-checked="${t.hasAttribute("checked")}"
        aria-required="${t.hasAttribute("required")}"
        tabindex="${t.hasAttribute("disabled")?"-1":"0"}"
      >
        <span class="checkmark">✓</span>
      </div>
      ${e?`<span class="label-text">${e}</span>`:"<slot></slot>"}
    `},setup:(t,e)=>{let o=t.shadowRoot?.querySelector(".box");if(!o)return;let r=()=>{let a=t.hasAttribute("checked"),s=t.getAttribute("value")||"on";if(e.setFormValue(a?s:null),t._currentValue=a?s:"",o.setAttribute("aria-checked",String(a)),t.hasAttribute("required")&&!a){try{e.setValidity({valueMissing:!0},`${t.getAttribute("label")||t.getAttribute("name")||"This field"} is required`)}catch{}t.setAttribute("invalid","")}else{try{e.setValidity({})}catch{}t.removeAttribute("invalid")}};r();let i=()=>{t.hasAttribute("disabled")||(t.toggleAttribute("checked"),r(),t.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:t.hasAttribute("checked")}})))};t.addEventListener("click",i),t.addEventListener("keydown",a=>{let s=a;(s.key===" "||s.key==="Enter")&&(s.preventDefault(),i())})}});y("flowx-switch",{observedAttributes:["checked"],style:`
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
  `,template:t=>{let e=t.getAttribute("label")||"";return`
      <div class="track" role="switch"
        id="${`sw-${Math.random().toString(36).slice(2,7)}`}"
        aria-checked="${t.hasAttribute("checked")}"
        aria-required="${t.hasAttribute("required")}"
        tabindex="${t.hasAttribute("disabled")?"-1":"0"}"
      >
        <div class="thumb"></div>
      </div>
      ${e?`<span class="label-text">${e}</span>`:"<slot></slot>"}
    `},setup:(t,e)=>{let o=t.shadowRoot?.querySelector(".track");if(!o)return;let r=()=>{let a=t.hasAttribute("checked");e.setFormValue(a?t.getAttribute("value")||"on":null),t._currentValue=a?t.getAttribute("value")||"on":"",o.setAttribute("aria-checked",String(a))};r();let i=()=>{t.hasAttribute("disabled")||(t.toggleAttribute("checked"),r(),t.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:t.hasAttribute("checked")}})))};t.addEventListener("click",i),t.addEventListener("keydown",a=>{let s=a;(s.key===" "||s.key==="Enter")&&(s.preventDefault(),i())})}});y("flowx-radio",{observedAttributes:["checked","value"],style:`
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
  `,template:t=>{let e=t.getAttribute("label")||"";return`
      <div class="ring" role="radio"
        aria-checked="${t.hasAttribute("checked")}"
        tabindex="${t.hasAttribute("disabled")?"-1":t.hasAttribute("checked")?"0":"-1"}"
      >
        <div class="dot"></div>
      </div>
      ${e?`<span class="label-text">${e}</span>`:"<slot></slot>"}
    `},setup:(t,e)=>{let o=t.shadowRoot?.querySelector(".ring");if(!o)return;let r=()=>{let a=t.hasAttribute("checked"),s=t.getAttribute("value")||"on";e.setFormValue(a?s:null),t._currentValue=a?s:"",o.setAttribute("aria-checked",String(a))};r();let i=()=>{if(t.hasAttribute("disabled"))return;let a=t.getAttribute("name");a&&t.getRootNode().querySelectorAll(`flowx-radio[name="${a}"]`).forEach(s=>{s!==t&&(s.removeAttribute("checked"),s.setAttribute("tabindex","-1"))}),t.setAttribute("checked",""),t.setAttribute("tabindex","0"),r(),t.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:t.getAttribute("value")}}))};t.addEventListener("click",i),t.addEventListener("keydown",a=>{let s=a;(s.key===" "||s.key==="Enter")&&(s.preventDefault(),i())})}});y("flowx-select",{observedAttributes:["placeholder"],style:`${C}
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
  `,template:t=>{let e=t.getAttribute("label")||"",o=t.getAttribute("hint")||"",r=t.hasAttribute("required"),i=t._currentValue||t.getAttribute("value")||"",a=Array.from(t.children).filter(d=>d.tagName.toLowerCase()==="option"),s=a.find(d=>d.value===i),n=s?s.textContent?.trim():t.getAttribute("placeholder")||a[0]?.textContent?.trim()||"Select…",l=a.map(d=>`
      <div class="option" role="option" tabindex="0"
        data-value="${d.value}"
        aria-selected="${d.value===i}">
        ${d.textContent?.trim()}
      </div>
    `).join("");return`
      ${e?`<label>${e}${r?' <span aria-hidden="true" style="color:var(--flowx-error)">*</span>':""}</label>`:""}
      <div class="trigger" role="combobox" tabindex="0"
        aria-haspopup="listbox"
        aria-expanded="${t.hasAttribute("open")}"
        aria-required="${r}"
      >
        <span class="${i?"":"placeholder-text"}">${n}</span>
        <span class="chevron">▾</span>
      </div>
      <div class="dropdown" role="listbox">
        ${l}
      </div>
      ${o?`<div class="field-hint">${o}</div>`:""}
    `},setup:(t,e)=>{let o=t.shadowRoot;if(!o)return;let r=o.querySelector(".trigger"),i=o.querySelector(".dropdown");if(!r||!i)return;let a=t._currentValue||t.getAttribute("value")||"";e.setFormValue(a||null);let s=(n,l)=>{if(t._currentValue=n,e.setFormValue(n||null),t.setAttribute("value",n),t.removeAttribute("open"),t.render(),t.hasAttribute("required")&&!n){try{e.setValidity({valueMissing:!0},`${t.getAttribute("label")||t.getAttribute("name")} is required`)}catch{}t.setAttribute("invalid","")}else{try{e.setValidity({})}catch{}t.removeAttribute("invalid")}t.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:n,label:l}}))};(()=>{let n=o.querySelector(".trigger"),l=o.querySelector(".dropdown");!n||!l||(n.addEventListener("click",()=>{t.hasAttribute("disabled")||t.toggleAttribute("open")}),n.addEventListener("keydown",d=>{let c=d;if((c.key===" "||c.key==="Enter")&&(c.preventDefault(),t.toggleAttribute("open")),c.key==="Escape"&&t.removeAttribute("open"),c.key==="ArrowDown"){let p=l.querySelector(".option");p&&(t.setAttribute("open",""),p.focus()),c.preventDefault()}}),l.querySelectorAll(".option").forEach(d=>{d.addEventListener("click",()=>s(d.dataset.value||"",d.textContent?.trim()||"")),d.addEventListener("keydown",c=>{let p=c;(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),s(d.dataset.value||"",d.textContent?.trim()||"")),p.key==="ArrowDown"&&(d.nextElementSibling?.focus(),p.preventDefault()),p.key==="ArrowUp"&&(d.previousElementSibling?.focus(),p.preventDefault()),p.key==="Escape"&&(t.removeAttribute("open"),n.focus())})}),document.addEventListener("click",d=>{d.composedPath().includes(t)||t.removeAttribute("open")},{capture:!0}))})()}});y("flowx-slider",{observedAttributes:["min","max","step","value"],style:`
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
  `,template:t=>{let e=t.getAttribute("label")||"",o=t.getAttribute("min")||"0",r=t.getAttribute("max")||"100",i=t.getAttribute("step")||"1",a=t._currentValue??t.getAttribute("value")??"50",s=t.hasAttribute("disabled")?"disabled":"";return`
      ${e?`<label>${e}</label>`:""}
      <div class="slider-wrapper">
        <input type="range" id="inner"
          min="${o}" max="${r}" step="${i}" value="${a}"
          ${s}
          aria-label="${e||t.getAttribute("name")||"Slider"}"
          aria-valuemin="${o}" aria-valuemax="${r}" aria-valuenow="${a}"
        />
        <span class="value-badge">${a}</span>
      </div>
    `},setup:(t,e)=>{let o=t.shadowRoot?.querySelector('input[type="range"]'),r=t.shadowRoot?.querySelector(".value-badge");o&&(e.setFormValue(o.value),t._currentValue=o.value,o.addEventListener("input",()=>{t._currentValue=o.value,e.setFormValue(o.value),o.setAttribute("aria-valuenow",o.value),r&&(r.textContent=o.value)}),o.addEventListener("change",()=>{t.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:o.value}}))}))}});y("flowx-rating",{observedAttributes:["max","value","readonly"],style:`
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
  `,template:t=>{let e=t.getAttribute("label")||"",o=parseInt(t.getAttribute("max")||"5",10),r=parseInt(t._currentValue??t.getAttribute("value")??"0",10),i=t.hasAttribute("readonly"),a=Array.from({length:o},(s,n)=>`
      <span class="star ${n<r?"filled":""}"
        role="radio"
        aria-label="${n+1} star${n===0?"":"s"}"
        aria-checked="${n<r}"
        data-value="${n+1}"
        tabindex="${i?"-1":n===(r-1||0)?"0":"-1"}"
      >★</span>
    `).join("");return`
      ${e?`<label>${e}</label>`:""}
      <div class="stars" role="radiogroup" aria-label="${e||"Rating"}">
        ${a}
      </div>
    `},setup:(t,e)=>{let o=t.shadowRoot;if(!o)return;let r=s=>{if(t._currentValue=String(s),e.setFormValue(String(s)),t.hasAttribute("required")&&s===0){try{e.setValidity({valueMissing:!0},"Please select a rating")}catch{}t.setAttribute("invalid","")}else{try{e.setValidity({})}catch{}t.removeAttribute("invalid")}t.render(),i()},i=()=>{o.querySelectorAll(".star").forEach(s=>{s.addEventListener("click",()=>r(parseInt(s.dataset.value||"0",10))),s.addEventListener("keydown",n=>{let l=n,d=parseInt(s.dataset.value||"0",10);(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),r(d)),(l.key==="ArrowRight"||l.key==="ArrowUp")&&(l.preventDefault(),r(Math.min(d+1,parseInt(t.getAttribute("max")||"5",10)))),(l.key==="ArrowLeft"||l.key==="ArrowDown")&&(l.preventDefault(),r(Math.max(d-1,1)))})})},a=parseInt(t.getAttribute("value")||"0",10);e.setFormValue(String(a)),t._currentValue=String(a),i()}});y("flowx-otp-input",{observedAttributes:["length"],style:`
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
  `,template:t=>{let e=t.getAttribute("label")||"",o=t.getAttribute("hint")||"",r=parseInt(t.getAttribute("length")||"6",10),i=(t._currentValue||"").split(""),a=Array.from({length:r},(s,n)=>`
      <input class="otp-cell" type="text" inputmode="numeric" pattern="[0-9]"
        maxlength="1" autocomplete="one-time-code"
        data-index="${n}"
        value="${i[n]||""}"
        aria-label="Digit ${n+1} of ${r}"
      />
    `).join("");return`
      ${e?`<label>${e}</label>`:""}
      <div class="otp-row" role="group" aria-label="${e||"OTP Input"}">
        ${a}
      </div>
      ${o?`<div class="hint">${o}</div>`:""}
    `},setup:(t,e)=>{let o=t.shadowRoot;o&&(()=>{let r=Array.from(o.querySelectorAll(".otp-cell"));if(!r.length)return;let i=()=>r.map(s=>s.value).join(""),a=()=>{let s=i();t._currentValue=s,e.setFormValue(s||null);let n=t.hasAttribute("required"),l=parseInt(t.getAttribute("length")||"6",10);if(n&&s.length<l){try{e.setValidity({valueMissing:!0},"Please complete the OTP")}catch{}t.setAttribute("invalid","")}else{try{e.setValidity({})}catch{}t.removeAttribute("invalid")}s.length===l&&t.dispatchEvent(new CustomEvent("fx-otp-complete",{bubbles:!0,composed:!0,detail:{value:s}}))};r.forEach((s,n)=>{s.addEventListener("input",l=>{if(l.inputType==="insertFromPaste"){let d=s.value;if(d.length>1){let c=d.replace(/\D/g,"").split("");r.slice(n).forEach((p,u)=>{p.value=c[u]||""}),r[Math.min(n+c.length,r.length-1)]?.focus(),a();return}}s.value=s.value.replace(/\D/g,"").slice(-1),s.value&&n<r.length-1&&r[n+1].focus(),a()}),s.addEventListener("keydown",l=>{let d=l;d.key==="Backspace"&&!s.value&&n>0&&(r[n-1].focus(),r[n-1].value="",a()),d.key==="ArrowLeft"&&n>0&&r[n-1].focus(),d.key==="ArrowRight"&&n<r.length-1&&r[n+1].focus()}),s.addEventListener("focus",()=>s.select())})})()}});y("flowx-autocomplete",{observedAttributes:["options","placeholder","minchars"],style:`${C}
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
  `,template:t=>{let e=t.getAttribute("label")||"",o=t.getAttribute("hint")||"",r=t.getAttribute("placeholder")||"Search…",i=t.getAttribute("name")||"",a=t.hasAttribute("required"),s=t.hasAttribute("disabled")?"disabled":"",n=t._displayValue||t._currentValue||t.getAttribute("value")||"";return`
      ${e?`<label for="ac-input">${e}${a?' <span aria-hidden="true" style="color:var(--flowx-error)">*</span>':""}</label>`:""}
      <div class="input-wrapper">
        <input
          id="ac-input"
          type="text"
          name="${i}"
          value="${n}"
          placeholder="${r}"
          autocomplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-required="${a}"
          ${s}
        />
        <button class="clear-btn ${n?"visible":""}" type="button" aria-label="Clear">✕</button>
      </div>
      <div class="listbox" role="listbox" aria-label="${e||i}"></div>
      ${o?`<div class="field-hint">${o}</div>`:""}
    `},setup:(t,e)=>{let o=t.shadowRoot;if(!o)return;let r=o.querySelector("#ac-input"),i=o.querySelector(".listbox"),a=o.querySelector(".clear-btn");if(!r||!i)return;let s=()=>{let h=t.getAttribute("options")||"";if(!h)return[];try{return JSON.parse(h).map(m=>typeof m=="string"?{label:m,value:m}:m)}catch{return h.split(",").map(m=>({label:m.trim(),value:m.trim()}))}},n=null,l=null,d=null,c=h=>{i.innerHTML=h.length?h.map(m=>`<div class="option" role="option" tabindex="0" data-value="${m.value}" aria-selected="false">${m.label}</div>`).join(""):'<div class="no-results">No results</div>',i.classList.add("open"),r.setAttribute("aria-expanded","true"),n&&n.cleanup(),n=x(r,i,{placement:"bottom",align:"start",offset:4}),l&&l(),l=E(i,".option").cleanup,i.querySelectorAll(".option").forEach(m=>{m.addEventListener("click",()=>u(m.dataset.value||"",m.textContent||"")),m.addEventListener("keydown",k=>{let A=k;(A.key==="Enter"||A.key===" ")&&(A.preventDefault(),u(m.dataset.value||"",m.textContent||"")),A.key==="Escape"&&(p(),r.focus()),A.key==="Tab"&&p()})}),d&&d.cleanup(),d=w(t,p)},p=()=>{i.classList.remove("open"),r.setAttribute("aria-expanded","false"),n&&(n.cleanup(),n=null),l&&(l(),l=null),d&&(d.cleanup(),d=null)},u=(h,m)=>{if(t._currentValue=h,t._displayValue=m.trim(),e.setFormValue(h),r.value=m.trim(),a&&a.classList.add("visible"),p(),t.hasAttribute("required")&&!h){try{e.setValidity({valueMissing:!0},"Please select an option")}catch{}t.setAttribute("invalid","")}else{try{e.setValidity({})}catch{}t.removeAttribute("invalid")}t.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:h,label:m.trim()}}))},b=parseInt(t.getAttribute("minchars")||"0",10);r.addEventListener("input",()=>{let h=r.value.toLowerCase();if(a&&a.classList.toggle("visible",r.value.length>0),h.length<b){p();return}let m=s().filter(k=>k.label.toLowerCase().includes(h));m.length>0||h.length>0?c(m):p()}),r.addEventListener("keydown",h=>{let m=h;if(m.key==="Escape"&&p(),m.key==="ArrowDown"){let k=i.querySelector(".option");k?(m.preventDefault(),k.focus()):(m.preventDefault(),c(s()),i.querySelector(".option")?.focus())}}),a?.addEventListener("click",()=>{r.value="",t._currentValue="",t._displayValue="",e.setFormValue(null),a.classList.remove("visible"),p(),r.focus()});let v=t.getAttribute("value")||"";v&&e.setFormValue(v)}});var K=class extends HTMLElement{static get observedAttributes(){return["for","visible"]}connectedCallback(){this._render()}attributeChangedCallback(){this._render()}_render(){this.shadowRoot||this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.innerHTML=`
        <style>
          ${g}${N}
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
      `)}};customElements.get("flowx-form-error")||customElements.define("flowx-form-error",K);var tt=class extends HTMLElement{connectedCallback(){this._init()}_init(){let t=this.querySelector("form")||this;this.addEventListener("fx:afterSwap",e=>{let o=e.detail?.xhr;o&&this._handleValidationResponse(o)}),t instanceof HTMLFormElement&&t.addEventListener("submit",()=>{this.querySelectorAll("flowx-form-error").forEach(e=>{e.textContent="",e.removeAttribute("visible")}),this.querySelectorAll("[invalid]").forEach(e=>{e.removeAttribute("invalid")})})}async _handleValidationResponse(t){let e=t.headers.get("fx-validation-errors");if(e)try{let o=JSON.parse(e);Z(this,o)}catch{}}};customElements.get("flowx-form")||customElements.define("flowx-form",tt);var O=[],H=null,F=!1;function $(t,e){O.push({selector:t,enhancerFn:e}),typeof document<"u"&&(L(document),et())}function L(t=document){for(let e of O){let o=`${e.selector}:not([data-flowx-enhanced])`,r=Array.from(t.querySelectorAll(o));for(let i of r){i.setAttribute("data-flowx-enhanced","true");let a=document.createElement("div");a.className="flowx-enhanced-input-wrapper",a.style.display="inline-block",a.style.position="relative",i.style.position="absolute",i.style.opacity="0",i.style.pointerEvents="none",i.style.width="0",i.style.height="0",i.style.margin="0",i.style.padding="0",i.style.border="none",i.parentNode?.insertBefore(a,i),a.appendChild(i);try{e.enhancerFn(i,a)}catch(s){console.error(`FlowX UI: Failed to enhance element ${e.selector}`,s)}}}}function et(){F||typeof window>"u"||(F=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>L(document)):L(document),H=new MutationObserver(t=>{let e=!1;for(let o of t)if(o.addedNodes.length>0){e=!0;break}e&&L(document)}),H.observe(document.body||document.documentElement,{childList:!0,subtree:!0}))}function z(t,e){if(t.value===e)return;let o=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value")?.set;o?o.call(t,e):t.value=e,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0}))}function D(t,e){let o=()=>e(t.value);t.addEventListener("input",o),t.addEventListener("change",o);let r=new MutationObserver(()=>{e(t.value)});return r.observe(t,{attributes:!0,attributeFilter:["value"]}),()=>{t.removeEventListener("input",o),t.removeEventListener("change",o),r.disconnect()}}var ot=class extends HTMLElement{static get observedAttributes(){return["value","min","max","disabled"]}nativeInput=null;currentMonth=new Date().getMonth();currentYear=new Date().getFullYear();selectedDate=null;positionerCleanup=null;outsideCleanup=null;constructor(){super(),this.attachShadow({mode:"open"})}attachToInput(t){if(this.nativeInput=t,t.value){let e=new Date(t.value+"T00:00:00");isNaN(e.getTime())||(this.selectedDate=e,this.currentMonth=e.getMonth(),this.currentYear=e.getFullYear())}D(t,e=>{if(e){let o=new Date(e+"T00:00:00");isNaN(o.getTime())||(this.selectedDate=o,this.currentMonth=o.getMonth(),this.currentYear=o.getFullYear(),this.render())}}),this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupPopover()}attributeChangedCallback(){this.render()}cleanupPopover(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=null),this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null)}formatDate(t){let e=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0");return`${e}-${o}-${r}`}formatDisplayDate(t){return t?t.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}):"Select date…"}selectDate(t){this.selectedDate=t;let e=this.formatDate(t);this.nativeInput&&z(this.nativeInput,e),this.setAttribute("value",e),this.closePopover(),this.render()}openPopover(){if(this.hasAttribute("disabled"))return;this.setAttribute("open",""),this.render();let t=this.shadowRoot?.querySelector(".trigger"),e=this.shadowRoot?.querySelector(".popover");if(t&&e){let o=x(t,e,{placement:"bottom",align:"start",offset:4});this.positionerCleanup=o.cleanup;let r=w(this,()=>this.closePopover());this.outsideCleanup=r.cleanup,this.shadowRoot?.querySelector(".day.selected, .day.today, .day")?.focus()}}closePopover(){this.removeAttribute("open"),this.cleanupPopover(),this.render()}prevMonth(){this.currentMonth===0?(this.currentMonth=11,this.currentYear--):this.currentMonth--,this.render()}nextMonth(){this.currentMonth===11?(this.currentMonth=0,this.currentYear++):this.currentMonth++,this.render()}render(){if(!this.shadowRoot)return;let t=this.hasAttribute("open"),e=this.formatDisplayDate(this.selectedDate),o=["January","February","March","April","May","June","July","August","September","October","November","December"],r=new Date(this.currentYear,this.currentMonth,1).getDay(),i=new Date(this.currentYear,this.currentMonth+1,0).getDate(),a=new Date(this.currentYear,this.currentMonth,0).getDate(),s=this.formatDate(new Date),n=this.selectedDate?this.formatDate(this.selectedDate):"",l="";for(let d=r-1;d>=0;d--)l+=`<div class="day other-month">${a-d}</div>`;for(let d=1;d<=i;d++){let c=new Date(this.currentYear,this.currentMonth,d),p=this.formatDate(c);l+=`
        <button type="button" class="day ${p===s?"today":""} ${p===n?"selected":""}" 
          data-date="${p}" tabindex="0" aria-label="${p}">
          ${d}
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

      <button type="button" class="trigger" tabindex="0" aria-label="Choose date, current date ${e}">
        <span class="icon">📅</span>
        <span>${e}</span>
      </button>

      <div class="popover" role="dialog" aria-modal="true" aria-label="Calendar">
        <div class="header">
          <button type="button" class="nav-btn prev-btn" aria-label="Previous month">◀</button>
          <span class="month-label">${o[this.currentMonth]} ${this.currentYear}</span>
          <button type="button" class="nav-btn next-btn" aria-label="Next month">▶</button>
        </div>
        <div class="weekdays">
          <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
        </div>
        <div class="days-grid">
          ${l}
        </div>
      </div>
    `,this.setupListeners()}setupListeners(){this.shadowRoot?.querySelector(".trigger")?.addEventListener("click",()=>{this.hasAttribute("open")?this.closePopover():this.openPopover()}),this.shadowRoot?.querySelector(".prev-btn")?.addEventListener("click",()=>this.prevMonth()),this.shadowRoot?.querySelector(".next-btn")?.addEventListener("click",()=>this.nextMonth()),this.shadowRoot?.querySelectorAll(".day[data-date]")?.forEach(t=>{t.addEventListener("click",e=>{let o=e.currentTarget.getAttribute("data-date");if(o){let r=new Date(o+"T00:00:00");this.selectDate(r)}}),t.addEventListener("keydown",e=>{let o=e;if(o.key==="ArrowRight"||o.key==="ArrowLeft"||o.key==="ArrowUp"||o.key==="ArrowDown"||o.key==="PageUp"||o.key==="PageDown"){o.preventDefault();let r=e.currentTarget.getAttribute("data-date");if(!r)return;let i=new Date(r+"T00:00:00");o.key==="ArrowRight"&&i.setDate(i.getDate()+1),o.key==="ArrowLeft"&&i.setDate(i.getDate()-1),o.key==="ArrowDown"&&i.setDate(i.getDate()+7),o.key==="ArrowUp"&&i.setDate(i.getDate()-7),o.key==="PageUp"&&i.setMonth(i.getMonth()-1),o.key==="PageDown"&&i.setMonth(i.getMonth()+1),this.currentMonth=i.getMonth(),this.currentYear=i.getFullYear(),this.render();let a=this.formatDate(i);this.shadowRoot?.querySelector(`.day[data-date="${a}"]`)?.focus()}})})}};customElements.get("flowx-date-picker")||customElements.define("flowx-date-picker",ot);$('input[type="date"]',(t,e)=>{let o=document.createElement("flowx-date-picker");e.appendChild(o),o.attachToInput(t)});var rt=class extends HTMLElement{static get observedAttributes(){return["value","disabled"]}nativeInput=null;selectedHour=12;selectedMinute=0;period="PM";positionerCleanup=null;outsideCleanup=null;constructor(){super(),this.attachShadow({mode:"open"})}attachToInput(t){this.nativeInput=t,t.value&&this.parseTime(t.value),D(t,e=>{e&&(this.parseTime(e),this.render())}),this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupPopover()}attributeChangedCallback(){this.render()}parseTime(t){let e=t.split(":");if(e.length>=2){let o=parseInt(e[0],10),r=parseInt(e[1],10);!isNaN(o)&&!isNaN(r)&&(this.period=o>=12?"PM":"AM",o=o%12,o===0&&(o=12),this.selectedHour=o,this.selectedMinute=r)}}cleanupPopover(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=null),this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null)}formatTime24(){let t=this.selectedHour;this.period==="PM"&&t<12&&(t+=12),this.period==="AM"&&t===12&&(t=0);let e=String(t).padStart(2,"0"),o=String(this.selectedMinute).padStart(2,"0");return`${e}:${o}`}formatDisplayTime(){let t=String(this.selectedHour).padStart(2,"0"),e=String(this.selectedMinute).padStart(2,"0");return`${t}:${e} ${this.period}`}commitTime(){let t=this.formatTime24();this.nativeInput&&z(this.nativeInput,t),this.setAttribute("value",t)}openPopover(){if(this.hasAttribute("disabled"))return;this.setAttribute("open",""),this.render();let t=this.shadowRoot?.querySelector(".trigger"),e=this.shadowRoot?.querySelector(".popover");if(t&&e){let o=x(t,e,{placement:"bottom",align:"start",offset:4});this.positionerCleanup=o.cleanup;let r=w(this,()=>this.closePopover());this.outsideCleanup=r.cleanup}}closePopover(){this.removeAttribute("open"),this.cleanupPopover(),this.render()}render(){if(!this.shadowRoot)return;let t=this.hasAttribute("open"),e=this.formatDisplayTime(),o=Array.from({length:12},(s,n)=>n+1),r=[0,5,10,15,20,25,30,35,40,45,50,55],i=o.map(s=>`
      <button type="button" class="option ${s===this.selectedHour?"selected":""}" data-type="hour" data-val="${s}">
        ${String(s).padStart(2,"0")}
      </button>
    `).join(""),a=r.map(s=>`
      <button type="button" class="option ${s===this.selectedMinute?"selected":""}" data-type="minute" data-val="${s}">
        ${String(s).padStart(2,"0")}
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

      <button type="button" class="trigger" tabindex="0" aria-label="Choose time, current time ${e}">
        <span class="icon">🕒</span>
        <span>${e}</span>
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
    `,this.setupListeners()}setupListeners(){this.shadowRoot?.querySelector(".trigger")?.addEventListener("click",()=>{this.hasAttribute("open")?this.closePopover():this.openPopover()}),this.shadowRoot?.querySelectorAll(".option")?.forEach(t=>{t.addEventListener("click",e=>{let o=e.currentTarget,r=o.getAttribute("data-type"),i=parseInt(o.getAttribute("data-val")||"0",10);r==="hour"&&(this.selectedHour=i),r==="minute"&&(this.selectedMinute=i),this.commitTime(),this.render()})}),this.shadowRoot?.querySelectorAll(".period-btn")?.forEach(t=>{t.addEventListener("click",e=>{let o=e.currentTarget.getAttribute("data-period");o&&(this.period=o,this.commitTime(),this.render())})})}};customElements.get("flowx-time-picker")||customElements.define("flowx-time-picker",rt);$('input[type="time"]',(t,e)=>{let o=document.createElement("flowx-time-picker");e.appendChild(o),o.attachToInput(t)});var it=class extends HTMLElement{static get observedAttributes(){return["value","disabled"]}nativeInput=null;currentMonth=new Date().getMonth();currentYear=new Date().getFullYear();selectedDate=null;selectedHour=12;selectedMinute=0;period="PM";positionerCleanup=null;outsideCleanup=null;constructor(){super(),this.attachShadow({mode:"open"})}attachToInput(t){this.nativeInput=t,t.value&&this.parseDateTime(t.value),D(t,e=>{e&&(this.parseDateTime(e),this.render())}),this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupPopover()}attributeChangedCallback(){this.render()}parseDateTime(t){let e=new Date(t);if(!isNaN(e.getTime())){this.selectedDate=e,this.currentMonth=e.getMonth(),this.currentYear=e.getFullYear();let o=e.getHours();this.selectedMinute=e.getMinutes(),this.period=o>=12?"PM":"AM",o=o%12,o===0&&(o=12),this.selectedHour=o}}cleanupPopover(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=null),this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null)}formatDateISO(t){let e=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),i=this.selectedHour;this.period==="PM"&&i<12&&(i+=12),this.period==="AM"&&i===12&&(i=0);let a=String(i).padStart(2,"0"),s=String(this.selectedMinute).padStart(2,"0");return`${e}-${o}-${r}T${a}:${s}`}formatDisplay(){if(!this.selectedDate)return"Select Date & Time…";let t=this.selectedDate.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),e=String(this.selectedHour).padStart(2,"0"),o=String(this.selectedMinute).padStart(2,"0");return`${t}, ${e}:${o} ${this.period}`}commit(){this.selectedDate||(this.selectedDate=new Date);let t=this.formatDateISO(this.selectedDate);this.nativeInput&&z(this.nativeInput,t),this.setAttribute("value",t)}openPopover(){if(this.hasAttribute("disabled"))return;this.setAttribute("open",""),this.render();let t=this.shadowRoot?.querySelector(".trigger"),e=this.shadowRoot?.querySelector(".popover");if(t&&e){let o=x(t,e,{placement:"bottom",align:"start",offset:4});this.positionerCleanup=o.cleanup;let r=w(this,()=>this.closePopover());this.outsideCleanup=r.cleanup}}closePopover(){this.removeAttribute("open"),this.cleanupPopover(),this.render()}prevMonth(){this.currentMonth===0?(this.currentMonth=11,this.currentYear--):this.currentMonth--,this.render()}nextMonth(){this.currentMonth===11?(this.currentMonth=0,this.currentYear++):this.currentMonth++,this.render()}render(){if(!this.shadowRoot)return;let t=this.hasAttribute("open"),e=this.formatDisplay(),o=["January","February","March","April","May","June","July","August","September","October","November","December"],r=new Date(this.currentYear,this.currentMonth,1).getDay(),i=new Date(this.currentYear,this.currentMonth+1,0).getDate(),a=new Date(this.currentYear,this.currentMonth,0).getDate(),s=b=>{let v=this.currentYear,h=String(this.currentMonth+1).padStart(2,"0"),m=String(b).padStart(2,"0");return`${v}-${h}-${m}`},n=this.selectedDate?`${this.selectedDate.getFullYear()}-${String(this.selectedDate.getMonth()+1).padStart(2,"0")}-${String(this.selectedDate.getDate()).padStart(2,"0")}`:"",l="";for(let b=r-1;b>=0;b--)l+=`<div class="day other-month">${a-b}</div>`;for(let b=1;b<=i;b++){let v=s(b);l+=`
        <button type="button" class="day ${v===n?"selected":""}" 
          data-date="${v}" tabindex="0">
          ${b}
        </button>
      `}let d=Array.from({length:12},(b,v)=>v+1),c=[0,15,30,45],p=d.map(b=>`
      <button type="button" class="time-opt ${b===this.selectedHour?"selected":""}" data-type="hour" data-val="${b}">
        ${String(b).padStart(2,"0")}
      </button>
    `).join(""),u=c.map(b=>`
      <button type="button" class="time-opt ${b===this.selectedMinute?"selected":""}" data-type="minute" data-val="${b}">
        ${String(b).padStart(2,"0")}
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

      <button type="button" class="trigger" tabindex="0" aria-label="Choose date and time, current ${e}">
        <span class="icon">📅</span>
        <span>${e}</span>
      </button>

      <div class="popover" role="dialog" aria-modal="true">
        <div class="columns">
          <div>
            <div class="header">
              <button type="button" class="nav-btn prev-btn">◀</button>
              <span class="month-label">${o[this.currentMonth]} ${this.currentYear}</span>
              <button type="button" class="nav-btn next-btn">▶</button>
            </div>
            <div class="weekdays">
              <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            <div class="days-grid">
              ${l}
            </div>
          </div>
          <div class="time-panel">
            <div class="time-header">Time</div>
            <div class="time-list">
              ${p}
            </div>
            <div class="time-header" style="margin-top:4px">Min</div>
            <div class="time-list">
              ${u}
            </div>
            <div class="period-toggle">
              <button type="button" class="period-btn ${this.period==="AM"?"active":""}" data-period="AM">AM</button>
              <button type="button" class="period-btn ${this.period==="PM"?"active":""}" data-period="PM">PM</button>
            </div>
          </div>
        </div>
      </div>
    `,this.setupListeners()}setupListeners(){this.shadowRoot?.querySelector(".trigger")?.addEventListener("click",()=>{this.hasAttribute("open")?this.closePopover():this.openPopover()}),this.shadowRoot?.querySelector(".prev-btn")?.addEventListener("click",()=>this.prevMonth()),this.shadowRoot?.querySelector(".next-btn")?.addEventListener("click",()=>this.nextMonth()),this.shadowRoot?.querySelectorAll(".day[data-date]")?.forEach(t=>{t.addEventListener("click",e=>{let o=e.currentTarget.getAttribute("data-date");o&&(this.selectedDate=new Date(o+"T00:00:00"),this.commit(),this.render())})}),this.shadowRoot?.querySelectorAll(".time-opt")?.forEach(t=>{t.addEventListener("click",e=>{let o=e.currentTarget,r=o.getAttribute("data-type"),i=parseInt(o.getAttribute("data-val")||"0",10);r==="hour"&&(this.selectedHour=i),r==="minute"&&(this.selectedMinute=i),this.commit(),this.render()})}),this.shadowRoot?.querySelectorAll(".period-btn")?.forEach(t=>{t.addEventListener("click",e=>{let o=e.currentTarget.getAttribute("data-period");o&&(this.period=o,this.commit(),this.render())})})}};customElements.get("flowx-datetime-picker")||customElements.define("flowx-datetime-picker",it);$('input[type="datetime-local"]',(t,e)=>{let o=document.createElement("flowx-datetime-picker");e.appendChild(o),o.attachToInput(t)});var at=class extends HTMLElement{static get observedAttributes(){return["value","disabled"]}nativeInput=null;selectedColor="#0066cc";positionerCleanup=null;outsideCleanup=null;presets=["#0066cc","#0052a3","#1f6feb","#3fb950","#2ea043","#da3633","#f85149","#d29922","#db6d28","#a371f7","#8b949e","#6e7681","#484f58","#0d1117","#ffffff"];constructor(){super(),this.attachShadow({mode:"open"})}attachToInput(t){this.nativeInput=t,t.value&&(this.selectedColor=t.value),D(t,e=>{e&&(this.selectedColor=e,this.render())}),this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupPopover()}attributeChangedCallback(){this.render()}cleanupPopover(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=null),this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null)}selectColor(t){this.selectedColor=t,this.nativeInput&&z(this.nativeInput,t),this.setAttribute("value",t),this.render()}openPopover(){if(this.hasAttribute("disabled"))return;this.setAttribute("open",""),this.render();let t=this.shadowRoot?.querySelector(".trigger"),e=this.shadowRoot?.querySelector(".popover");if(t&&e){let o=x(t,e,{placement:"bottom",align:"start",offset:4});this.positionerCleanup=o.cleanup;let r=w(this,()=>this.closePopover());this.outsideCleanup=r.cleanup}}closePopover(){this.removeAttribute("open"),this.cleanupPopover(),this.render()}render(){if(!this.shadowRoot)return;let t=this.hasAttribute("open"),e=this.presets.map(o=>`
      <button type="button" class="swatch ${o===this.selectedColor?"selected":""}" 
        data-color="${o}" style="background-color: ${o}" aria-label="Color ${o}">
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
          ${e}
        </div>
        <div class="section-title">Custom HEX</div>
        <div class="hex-input-row">
          <input type="text" class="custom-hex" value="${this.selectedColor}" maxlength="7" spellcheck="false" />
        </div>
      </div>
    `,this.setupListeners()}setupListeners(){this.shadowRoot?.querySelector(".trigger")?.addEventListener("click",()=>{this.hasAttribute("open")?this.closePopover():this.openPopover()}),this.shadowRoot?.querySelectorAll(".swatch")?.forEach(e=>{e.addEventListener("click",o=>{let r=o.currentTarget.getAttribute("data-color");r&&this.selectColor(r)})});let t=this.shadowRoot?.querySelector(".custom-hex");t?.addEventListener("change",()=>{let e=t.value.trim();e.startsWith("#")||(e="#"+e),/^#[0-9A-Fa-f]{6}$/.test(e)&&this.selectColor(e)})}};customElements.get("flowx-color-picker")||customElements.define("flowx-color-picker",at);$('input[type="color"]',(t,e)=>{let o=document.createElement("flowx-color-picker");e.appendChild(o),o.attachToInput(t)});var Y=class extends HTMLElement{nativeInput=null;fileList=[];uploadProgresses={};constructor(){super(),this.attachShadow({mode:"open"})}attachToInput(t){this.nativeInput=t,t.addEventListener("change",()=>{t.files&&(this.fileList=Array.from(t.files),this.render())}),document.addEventListener("fx:beforeRequest",e=>{let o=e.detail?.xhr;o&&o.upload&&o.upload.addEventListener("progress",r=>{if(r.lengthComputable){let i=Math.round(r.loaded/r.total*100);this.fileList.forEach(a=>{this.uploadProgresses[a.name]=i}),this.render()}})}),this.render()}connectedCallback(){this.render()}removeFile(t){if(this.fileList.splice(t,1),this.nativeInput){let e=new DataTransfer;this.fileList.forEach(o=>e.items.add(o)),this.nativeInput.files=e.files,this.nativeInput.dispatchEvent(new Event("input",{bubbles:!0})),this.nativeInput.dispatchEvent(new Event("change",{bubbles:!0}))}this.render()}handleDrop(t){if(t.preventDefault(),this.removeAttribute("dragging"),t.dataTransfer&&t.dataTransfer.files.length>0){let e=Array.from(t.dataTransfer.files);if(this.nativeInput?.hasAttribute("multiple")?this.fileList=[...this.fileList,...e]:this.fileList=[e[0]],this.nativeInput){let o=new DataTransfer;this.fileList.forEach(r=>o.items.add(r)),this.nativeInput.files=o.files,this.nativeInput.dispatchEvent(new Event("input",{bubbles:!0})),this.nativeInput.dispatchEvent(new Event("change",{bubbles:!0}))}this.render()}}render(){if(!this.shadowRoot)return;let t=this.hasAttribute("dragging"),e=this.fileList.map((o,r)=>{let i=this.uploadProgresses[o.name]??0,a=(o.size/(1024*1024)).toFixed(2);return`
        <div class="file-item">
          <div class="file-info">
            <span class="file-icon">📄</span>
            <div class="file-details">
              <span class="file-name">${o.name}</span>
              <span class="file-size">${a} MB</span>
            </div>
            <button type="button" class="remove-btn" data-index="${r}" title="Remove file">✕</button>
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
          ${e}
        </div>
      `:""}
    `,this.setupListeners()}setupListeners(){let t=this.shadowRoot?.querySelector("#dropzone");t?.addEventListener("click",()=>{this.nativeInput?.click()}),t?.addEventListener("dragover",e=>{e.preventDefault(),this.setAttribute("dragging","")}),t?.addEventListener("dragleave",()=>{this.removeAttribute("dragging")}),t?.addEventListener("drop",e=>{this.handleDrop(e)}),this.shadowRoot?.querySelectorAll(".remove-btn")?.forEach(e=>{e.addEventListener("click",o=>{o.stopPropagation();let r=parseInt(o.currentTarget.getAttribute("data-index")||"0",10);this.removeFile(r)})})}};customElements.get("flowx-file-upload")||customElements.define("flowx-file-upload",Y);$('input[type="file"]:not([accept*="image"])',(t,e)=>{let o=document.createElement("flowx-file-upload");e.appendChild(o),o.attachToInput(t)});var st=class extends Y{previews={};attachToInput(t){super.attachToInput(t)}render(){if(!this.shadowRoot)return;this.fileList.forEach(o=>{if(o.type.startsWith("image/")&&!this.previews[o.name]){let r=new FileReader;r.onload=i=>{this.previews[o.name]=i.target?.result,this.render()},r.readAsDataURL(o)}});let t=this.hasAttribute("dragging"),e=this.fileList.map((o,r)=>{let i=this.previews[o.name]||"",a=(o.size/(1024*1024)).toFixed(2),s=this.uploadProgresses[o.name]??0;return`
        <div class="image-card">
          <div class="thumbnail-wrapper">
            ${i?`<img src="${i}" alt="${o.name}" class="thumbnail" />`:'<span class="placeholder-icon">🖼️</span>'}
          </div>
          <div class="image-details">
            <span class="image-name">${o.name}</span>
            <span class="image-size">${a} MB</span>
          </div>
          <button type="button" class="remove-btn" data-index="${r}" title="Remove image">✕</button>
          ${s>0&&s<100?`
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${s}%"></div>
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
          ${e}
        </div>
      `:""}
    `,this.setupListeners()}};customElements.get("flowx-image-upload")||customElements.define("flowx-image-upload",st);$('input[type="file"][accept*="image"]',(t,e)=>{let o=document.createElement("flowx-image-upload");e.appendChild(o),o.attachToInput(t)});var nt=class extends HTMLElement{static get observedAttributes(){return["name","width","height","pen-color","bg-color"]}canvas=null;ctx=null;hiddenInput=null;isDrawing=!1;hasStrokes=!1;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.ensureHiddenInput()}attributeChangedCallback(){this.render()}ensureHiddenInput(){let t=this.getAttribute("name")||"signature",e=this.querySelector(`input[type="hidden"][name="${t}"]`);e||(e=document.createElement("input"),e.type="hidden",e.name=t,this.appendChild(e)),this.hiddenInput=e;let o=this.closest("form");o&&o.addEventListener("submit",()=>this.syncToHiddenInput())}syncToHiddenInput(){if(!(!this.hiddenInput||!this.canvas))if(this.hasStrokes){let t=this.canvas.toDataURL("image/png");this.hiddenInput.value=t,this.hiddenInput.dispatchEvent(new Event("input",{bubbles:!0})),this.hiddenInput.dispatchEvent(new Event("change",{bubbles:!0}))}else this.hiddenInput.value=""}clear(){if(!this.canvas||!this.ctx)return;let t=this.canvas.width,e=this.canvas.height,o=this.getAttribute("bg-color")||"#0d1117";this.ctx.fillStyle=o,this.ctx.fillRect(0,0,t,e),this.hasStrokes=!1,this.syncToHiddenInput()}startDrawing(t){if(!this.canvas||!this.ctx)return;this.isDrawing=!0;let e=this.canvas.getBoundingClientRect(),o="touches"in t?t.touches[0].clientX:t.clientX,r="touches"in t?t.touches[0].clientY:t.clientY;this.ctx.beginPath(),this.ctx.moveTo(o-e.left,r-e.top)}draw(t){if(!this.isDrawing||!this.canvas||!this.ctx)return;t.preventDefault();let e=this.canvas.getBoundingClientRect(),o="touches"in t?t.touches[0].clientX:t.clientX,r="touches"in t?t.touches[0].clientY:t.clientY,i=this.getAttribute("pen-color")||"#58a6ff";this.ctx.strokeStyle=i,this.ctx.lineWidth=2.5,this.ctx.lineCap="round",this.ctx.lineJoin="round",this.ctx.lineTo(o-e.left,r-e.top),this.ctx.stroke(),this.hasStrokes=!0}stopDrawing(){this.isDrawing&&(this.isDrawing=!1,this.syncToHiddenInput())}render(){if(!this.shadowRoot)return;let t=parseInt(this.getAttribute("width")||"400",10),e=parseInt(this.getAttribute("height")||"160",10);if(this.shadowRoot.innerHTML=`
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
        <canvas width="${t}" height="${e}"></canvas>
        <div class="controls">
          <button type="button" class="btn-clear">Clear</button>
        </div>
      </div>
    `,this.canvas=this.shadowRoot.querySelector("canvas"),this.canvas&&typeof this.canvas.getContext=="function")try{this.ctx=this.canvas.getContext("2d"),this.clear(),this.setupCanvasListeners()}catch{}}setupCanvasListeners(){this.canvas&&(this.canvas.addEventListener("mousedown",t=>this.startDrawing(t)),this.canvas.addEventListener("mousemove",t=>this.draw(t)),window.addEventListener("mouseup",()=>this.stopDrawing()),this.canvas.addEventListener("touchstart",t=>this.startDrawing(t),{passive:!1}),this.canvas.addEventListener("touchmove",t=>this.draw(t),{passive:!1}),window.addEventListener("touchend",()=>this.stopDrawing()),this.shadowRoot?.querySelector(".btn-clear")?.addEventListener("click",()=>this.clear()))}};customElements.get("flowx-signature-pad")||customElements.define("flowx-signature-pad",nt);var lt=class{element;state;options;activeAbortController=null;constructor(t,e={}){this.element=t,this.options={endpoint:t.getAttribute("fx-endpoint")||t.getAttribute("fx-get")||"",target:t.getAttribute("fx-target")||"tbody",swap:t.getAttribute("fx-swap")||"innerHTML",mode:t.getAttribute("mode")||"server",...e};let o=parseInt(t.getAttribute("page")||"1",10),r=parseInt(t.getAttribute("limit")||t.getAttribute("per-page")||"10",10);this.state={page:isNaN(o)?1:o,limit:isNaN(r)?10:r,sort:t.getAttribute("sort")||"",dir:t.getAttribute("dir")||"",search:t.getAttribute("search")||"",groupBy:t.getAttribute("group-by")||"",filters:{}}}getState(){return{...this.state,filters:{...this.state.filters}}}setMode(t){this.options.mode=t}getMode(){return this.options.mode||"server"}toQueryString(){let t=new URLSearchParams;this.state.page>1&&t.set("page",String(this.state.page)),this.state.limit&&t.set("limit",String(this.state.limit)),this.state.sort&&t.set("sort",this.state.sort),this.state.dir&&t.set("dir",this.state.dir),this.state.search&&t.set("q",this.state.search),this.state.groupBy&&t.set("group_by",this.state.groupBy);for(let[o,r]of Object.entries(this.state.filters))r&&t.set(`filter_${o}`,r);let e=t.toString();return e?`?${e}`:""}updateAndRefetch(t){return t.filters&&(this.state.filters={...this.state.filters,...t.filters}),t.page!==void 0&&(this.state.page=t.page),t.limit!==void 0&&(this.state.limit=t.limit),t.sort!==void 0&&(this.state.sort=t.sort),t.dir!==void 0&&(this.state.dir=t.dir),t.search!==void 0&&(this.state.search=t.search),t.groupBy!==void 0&&(this.state.groupBy=t.groupBy),this.options.onStateChange&&this.options.onStateChange(this.getState()),this.options.mode==="client"?(this.applyClientSideState(),Promise.resolve()):this.triggerServerRefetch()}triggerServerRefetch(){let t=this.options.endpoint||this.element.getAttribute("fx-endpoint")||this.element.getAttribute("fx-get")||"";if(!t)return Promise.resolve();this.activeAbortController&&this.activeAbortController.abort(),this.activeAbortController=new AbortController;let e=this.toQueryString(),o=t.includes("?")?`${t}&${e.slice(1)}`:`${t}${e}`,r=null;this.options.target&&(r=this.element.querySelector(this.options.target)||document.querySelector(this.options.target)),r||(r=this.element);let i=this.options.swap||"innerHTML";if(window.FlowX&&typeof window.FlowX.process=="function"){let a=document.createElement("div");a.setAttribute("fx-get",o),a.setAttribute("fx-target",this.options.target||""),a.setAttribute("fx-swap",i)}return fetch(o,{signal:this.activeAbortController.signal}).then(a=>a.text()).then(a=>{i==="beforeend"?r.insertAdjacentHTML("beforeend",a):i==="afterbegin"?r.insertAdjacentHTML("afterbegin",a):r.innerHTML=a,window.FlowX&&typeof window.FlowX.process=="function"&&window.FlowX.process(r)}).catch(a=>{a.name!=="AbortError"&&console.error("FlowX DataGrid: Refetch error",a)})}applyClientSideState(){let t=this.element.querySelector("table");if(!t)return;let e=t.querySelector("tbody");if(!e)return;let o=Array.from(e.querySelectorAll("tr"));if(this.state.search){let i=this.state.search.toLowerCase();o.forEach(a=>{let s=a.textContent?.toLowerCase()||"";a.style.display=s.includes(i)?"":"none"})}else o.forEach(i=>{i.style.display=""});let r=o.filter(i=>i.style.display!=="none");if(this.state.sort&&this.state.dir){let i=this.findColumnIndex(t,this.state.sort);i!==-1&&(r.sort((a,s)=>{let n=a.children[i]?.textContent?.trim()||"",l=s.children[i]?.textContent?.trim()||"",d=Number(n),c=Number(l),p=0;return!isNaN(d)&&!isNaN(c)?p=d-c:p=n.localeCompare(l),this.state.dir==="asc"?p:-p}),r.forEach(a=>e.appendChild(a)))}}findColumnIndex(t,e){return Array.from(t.querySelectorAll("th")).findIndex(o=>o.getAttribute("fx-sort")===e||o.getAttribute("data-field")===e||o.textContent?.trim().toLowerCase()===e.toLowerCase())}};function B(t,e){return new lt(t,e)}function dt(t,e="export.csv"){let o=Array.from(t.querySelectorAll("tr")),r=[];for(let s of o){let n=Array.from(s.querySelectorAll("th, td")).map(l=>`"${l.textContent?.trim().replace(/"/g,'""')||""}"`).join(",");r.push(n)}let i="data:text/csv;charset=utf-8,"+encodeURIComponent(r.join(`
`)),a=document.createElement("a");a.setAttribute("href",i),a.setAttribute("download",e),document.body.appendChild(a),a.click(),a.remove()}var X=class extends HTMLElement{manager=null;static get observedAttributes(){return["fx-endpoint","fx-target","fx-swap","mode","sort","dir","page","limit"]}connectedCallback(){this.initManager(),this.setupHeaderSortTriggers()}attributeChangedCallback(t,e,o){e!==o&&t==="mode"&&this.manager&&this.manager.setMode(o)}initManager(){this.manager||(this.manager=B(this))}getQueryManager(){return this.manager}setupHeaderSortTriggers(){let t=this.querySelector("table");if(!t)return;let e=t.querySelectorAll("th");e.forEach(o=>{let r=o.getAttribute("fx-sort")||o.getAttribute("data-fx-sort");if(r){if(o.style.cursor="pointer",o.style.userSelect="none",!o.querySelector(".sort-indicator")){let i=document.createElement("span");i.className="sort-indicator",i.style.marginLeft="6px",i.style.fontSize="10px",i.style.opacity="0.5",i.textContent="⇅",o.appendChild(i)}o.addEventListener("click",()=>{if(!this.manager)return;let i=this.manager.getState(),a="asc";i.sort===r&&(i.dir==="asc"?a="desc":i.dir==="desc"?a="":a="asc"),e.forEach(n=>{let l=n.querySelector(".sort-indicator");l&&(l.textContent="⇅")});let s=o.querySelector(".sort-indicator");s&&(s.textContent=a==="asc"?"▲":a==="desc"?"▼":"⇅",s.style.opacity=a?"1":"0.5"),this.manager.updateAndRefetch({sort:a?r:"",dir:a})})}})}};customElements.get("flowx-data-table")||customElements.define("flowx-data-table",X);var ct=class extends X{colWidths={};connectedCallback(){super.connectedCallback(),this.setupColumnResizing(),this.setupColumnReordering()}setupColumnResizing(){let t=this.querySelector("table");t&&Array.from(t.querySelectorAll("th")).forEach((e,o)=>{if(e.querySelector(".resize-handle"))return;e.style.position="relative";let r=document.createElement("div");r.className="resize-handle",r.style.position="absolute",r.style.right="0",r.style.top="0",r.style.bottom="0",r.style.width="6px",r.style.cursor="col-resize",r.style.userSelect="none",e.appendChild(r);let i=0,a=0,s=l=>{let d=l.clientX-i,c=Math.max(40,a+d);e.style.width=`${c}px`,this.colWidths[e.textContent?.trim()||o]=c},n=()=>{window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",n)};r.addEventListener("mousedown",l=>{l.stopPropagation(),i=l.clientX,a=e.offsetWidth,window.addEventListener("mousemove",s),window.addEventListener("mouseup",n)})})}setupColumnReordering(){let t=this.querySelector("table");t&&Array.from(t.querySelectorAll("th")).forEach(e=>{e.draggable=!0,e.addEventListener("dragstart",o=>{o.dataTransfer?.setData("text/plain",e.cellIndex.toString())}),e.addEventListener("dragover",o=>{o.preventDefault()}),e.addEventListener("drop",o=>{o.preventDefault();let r=o.dataTransfer?.getData("text/plain");if(!r)return;let i=parseInt(r,10),a=e.cellIndex;i!==a&&this.reorderColumn(t,i,a)})})}reorderColumn(t,e,o){Array.from(t.querySelectorAll("tr")).forEach(r=>{let i=Array.from(r.children);i[e]&&i[o]&&(e<o?r.insertBefore(i[e],i[o].nextSibling):r.insertBefore(i[e],i[o]))})}};customElements.get("flowx-data-grid")||customElements.define("flowx-data-grid",ct);var pt=class extends HTMLElement{connectedCallback(){this.setupTreeToggles()}setupTreeToggles(){this.querySelectorAll("[data-fx-tree-toggle], .tree-toggle").forEach(t=>{t.addEventListener("click",e=>{e.stopPropagation();let o=t.closest("tr");if(!o)return;let r=o.getAttribute("aria-expanded")==="true",i=t.getAttribute("fx-get")||o.getAttribute("fx-get");r?(o.setAttribute("aria-expanded","false"),t.textContent="▶",this.toggleChildren(o,!1)):(o.setAttribute("aria-expanded","true"),t.textContent="▼",i&&!o.hasAttribute("data-children-loaded")?(o.setAttribute("data-children-loaded","true"),fetch(i).then(a=>a.text()).then(a=>{o.insertAdjacentHTML("afterend",a),this.setupTreeToggles()})):this.toggleChildren(o,!0))})})}toggleChildren(t,e){let o=t.getAttribute("data-row-id");o&&this.querySelectorAll(`tr[data-parent-id="${o}"]`).forEach(r=>{let i=r;i.style.display=e?"":"none",e||(i.setAttribute("aria-expanded","false"),this.toggleChildren(r,!1))})}};customElements.get("flowx-tree-table")||customElements.define("flowx-tree-table",pt);var ut=class extends HTMLElement{manager=null;connectedCallback(){this.manager=B(this,{target:".list-container"})}getQueryManager(){return this.manager}};customElements.get("flowx-list-view")||customElements.define("flowx-list-view",ut);var ht=class extends HTMLElement{items=[];itemHeight=40;renderItemFn=null;viewport=null;content=null;static get observedAttributes(){return["item-height"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.itemHeight=parseInt(this.getAttribute("item-height")||"40",10),this.render()}attributeChangedCallback(){this.itemHeight=parseInt(this.getAttribute("item-height")||"40",10),this.updateVirtualWindow()}setData(t,e){this.items=t,this.renderItemFn=e,this.updateVirtualWindow()}updateVirtualWindow(){if(!this.viewport||!this.content||!this.renderItemFn||this.items.length===0)return;let t=this.viewport.scrollTop,e=this.viewport.clientHeight||300,o=Math.max(0,Math.floor(t/this.itemHeight)-2),r=Math.min(this.items.length,Math.ceil((t+e)/this.itemHeight)+2),i=this.items.length*this.itemHeight,a=o*this.itemHeight,s=this.items.slice(o,r).map((n,l)=>`
      <div class="virtual-item" style="height: ${this.itemHeight}px; line-height: ${this.itemHeight}px;">
        ${this.renderItemFn(n,o+l)}
      </div>
    `).join("");this.content.style.height=`${i}px`,this.content.style.paddingTop=`${a}px`,this.content.style.boxSizing="border-box",this.content.innerHTML=s}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
    `,this.viewport=this.shadowRoot.querySelector(".virtual-viewport"),this.content=this.shadowRoot.querySelector(".virtual-content"),this.viewport?.addEventListener("scroll",()=>this.updateVirtualWindow()))}};customElements.get("flowx-virtual-list")||customElements.define("flowx-virtual-list",ht);var bt=class extends HTMLElement{page=1;observer=null;isLoading=!1;static get observedAttributes(){return["fx-endpoint","fx-target","page"]}connectedCallback(){this.page=parseInt(this.getAttribute("page")||"1",10),this.render(),this.setupSentinelObserver()}disconnectedCallback(){this.observer&&(this.observer.disconnect(),this.observer=null)}setupSentinelObserver(){let t=this.shadowRoot?.querySelector(".sentinel");t&&(this.observer=new IntersectionObserver(e=>{for(let o of e)o.isIntersecting&&!this.isLoading&&this.loadNextPage()},{threshold:.1}),this.observer.observe(t))}loadNextPage(){let t=this.getAttribute("fx-endpoint")||this.getAttribute("fx-get"),e=this.getAttribute("fx-target");if(!t||!e)return;this.isLoading=!0,this.page++;let o=t.includes("?")?`${t}&page=${this.page}`:`${t}?page=${this.page}`,r=document.querySelector(e);if(!r)return;let i=this.shadowRoot?.querySelector(".spinner-box");i&&(i.style.display="block"),fetch(o).then(a=>a.text()).then(a=>{if(!a.trim()){this.observer?.disconnect(),i&&(i.style.display="none");return}r.insertAdjacentHTML("beforeend",a),window.FlowX&&typeof window.FlowX.process=="function"&&window.FlowX.process(r)}).finally(()=>{this.isLoading=!1,i&&(i.style.display="none")})}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        ${g}
        :host { display: block; width: 100%; }
        .sentinel { height: 20px; width: 100%; margin-top: 10px; }
        .spinner-box { display: none; text-align: center; padding: 12px; font-size: 12px; color: #8b949e; }
      </style>
      <slot></slot>
      <div class="spinner-box">Loading more items…</div>
      <div class="sentinel" fx-trigger="revealed"></div>
    `)}};customElements.get("flowx-infinite-scroll")||customElements.define("flowx-infinite-scroll",bt);var ft=class extends HTMLElement{timer=null;static get observedAttributes(){return["placeholder","delay","for"]}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){this.shadowRoot||this.attachShadow({mode:"open"});let t=this.getAttribute("placeholder")||"Search…";this.shadowRoot.innerHTML=`
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
    `,this.setupDebounce()}setupDebounce(){let t=this.shadowRoot?.querySelector("input");if(!t)return;let e=parseInt(this.getAttribute("delay")||"300",10);t.addEventListener("input",()=>{clearTimeout(this.timer),this.timer=setTimeout(()=>{let o=t.value.trim();this.dispatchSearch(o)},e)})}dispatchSearch(t){let e=this.getAttribute("for")||this.getAttribute("target"),o=null;if(e){let r=document.querySelector(`#${e}, ${e}`);r&&typeof r.getQueryManager=="function"&&(o=r.getQueryManager())}o&&o.updateAndRefetch({search:t,page:1}),this.dispatchEvent(new CustomEvent("fx-search",{bubbles:!0,composed:!0,detail:{query:t}}))}};customElements.get("flowx-search")||customElements.define("flowx-search",ft);var gt=class extends HTMLElement{connectedCallback(){this.setupListeners()}setupListeners(){this.addEventListener("change",()=>this.applyFilters()),this.querySelector("form")?.addEventListener("submit",t=>{t.preventDefault(),this.applyFilters()})}applyFilters(){let t=this.getAttribute("for")||this.getAttribute("target"),e=null;if(t){let r=document.querySelector(`#${t}, ${t}`);r&&typeof r.getQueryManager=="function"&&(e=r.getQueryManager())}let o={};this.querySelectorAll("input, select, flowx-input, flowx-select").forEach(r=>{let i=r.getAttribute("name");if(!i)return;let a=r._currentValue||r.value||r.getAttribute("value")||"";o[i]=a}),e&&e.updateAndRefetch({filters:o,page:1}),this.dispatchEvent(new CustomEvent("fx-filter-change",{bubbles:!0,composed:!0,detail:{filters:o}}))}};customElements.get("flowx-filter")||customElements.define("flowx-filter",gt);var mt=class extends HTMLElement{static get observedAttributes(){return["for","fields"]}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){this.shadowRoot||this.attachShadow({mode:"open"});let t=(this.getAttribute("fields")||"name,date").split(",").map(o=>o.trim()).map(o=>`
      <option value="${o}:asc">Sort by ${o} (Ascending)</option>
      <option value="${o}:desc">Sort by ${o} (Descending)</option>
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
        ${t}
      </select>
    `;let e=this.shadowRoot.querySelector("select");e?.addEventListener("change",()=>{let o=e.value,r="",i="";if(o.includes(":")){let s=o.split(":");r=s[0],i=s[1]}let a=this.getAttribute("for");if(a){let s=document.querySelector(`#${a}, ${a}`);s&&typeof s.getQueryManager=="function"&&s.getQueryManager().updateAndRefetch({sort:r,dir:i})}this.dispatchEvent(new CustomEvent("fx-sort-change",{bubbles:!0,composed:!0,detail:{sort:r,dir:i}}))})}};customElements.get("flowx-sort")||customElements.define("flowx-sort",mt);var vt=class extends HTMLElement{connectedCallback(){this.render()}render(){this.shadowRoot||this.attachShadow({mode:"open"});let t=(this.getAttribute("fields")||"category,status").split(",").map(o=>o.trim()).map(o=>`
      <option value="${o}">Group by ${o}</option>
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
        ${t}
      </select>
    `;let e=this.shadowRoot.querySelector("select");e?.addEventListener("change",()=>{let o=e.value,r=this.getAttribute("for");if(r){let i=document.querySelector(`#${r}, ${r}`);i&&typeof i.getQueryManager=="function"&&i.getQueryManager().updateAndRefetch({groupBy:o,page:1})}this.dispatchEvent(new CustomEvent("fx-group-change",{bubbles:!0,composed:!0,detail:{groupBy:o}}))})}};customElements.get("flowx-group-by")||customElements.define("flowx-group-by",vt);var xt=class extends HTMLElement{static get observedAttributes(){return["type","fx-get","for","filename"]}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){this.shadowRoot||this.attachShadow({mode:"open"});let t=(this.getAttribute("type")||"csv").toUpperCase(),e=this.getAttribute("fx-get");this.shadowRoot.innerHTML=`
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
    `,this.shadowRoot.querySelector("button")?.addEventListener("click",()=>{if(e)window.location.href=e;else{let o=this.getAttribute("for"),r=null;if(o&&(r=document.querySelector(`#${o} table, ${o}`)),r||(r=document.querySelector("table")),r){let i=this.getAttribute("filename")||`export-${Date.now()}.csv`;dt(r,i)}else console.warn("FlowX Export: No table target found for client CSV export")}})}};customElements.get("flowx-export")||customElements.define("flowx-export",xt);var S=null,P=!1;function j(t=document){P&&t===document||(t===document&&(P=!0),t.addEventListener("click",e=>{let o=e.target,r=o?.closest("[fx-dialog-target], [data-fx-dialog-target]");if(r){e.preventDefault();let a=r.getAttribute("fx-dialog-target")||r.getAttribute("data-fx-dialog-target"),s=r.getAttribute("fx-get")||r.getAttribute("data-fx-get");a&&wt(r,a,s)}let i=o?.closest("[fx-dialog-close], [data-fx-dialog-close]");if(i){let a=i.closest("dialog, flowx-modal, flowx-dialog, flowx-confirm-dialog, flowx-sheet, flowx-bottom-sheet, flowx-lightbox");a&&V(a)}}),t.addEventListener("click",e=>{let o=e.target;if(o&&(o.tagName.toLowerCase()==="dialog"||o.tagName.startsWith("FLOWX-"))){let r=o;if(!(r.hasAttribute("fx-dialog-persistent")||r.hasAttribute("persistent"))&&e.target===r){let i=r.getBoundingClientRect(),a=e;(a.clientX<i.left||a.clientX>i.right||a.clientY<i.top||a.clientY>i.bottom||e.target===r)&&V(r)}}}),t.querySelectorAll("dialog, flowx-modal, flowx-dialog, flowx-confirm-dialog, flowx-sheet, flowx-bottom-sheet, flowx-lightbox").forEach(e=>{e.addEventListener("close",()=>U())}))}async function wt(t,e,o){S=t;let r=document.querySelector(e)||t.ownerDocument.querySelector(e);if(!r){console.warn(`FlowX Dialog: Target element "${e}" not found.`);return}if(o)try{let i=await(await fetch(o)).text(),a=r.querySelector('[slot="body"], .modal-body, .dialog-content')||r.shadowRoot?.querySelector('[slot="body"], .modal-body, .dialog-content')||r;a.innerHTML=i,window.FlowX&&typeof window.FlowX.process=="function"&&window.FlowX.process(a)}catch(i){console.error(`FlowX Dialog: Failed to pre-fetch content from "${o}"`,i)}yt(r)}function yt(t){if(typeof t.openModal=="function")t.openModal();else if(typeof t.showModal=="function")try{t.showModal()}catch{t.setAttribute("open","")}else t.setAttribute("open","");if(!t._focusTrapCleanup&&typeof _=="function"){let e=_(t.shadowRoot||t);t._focusTrapCleanup=e.cleanup}}function V(t){if(typeof t.closeModal=="function")t.closeModal();else if(typeof t.close=="function")try{t.close()}catch{t.removeAttribute("open")}else t.removeAttribute("open");t._focusTrapCleanup&&(t._focusTrapCleanup(),t._focusTrapCleanup=null),U()}function U(){if(S&&typeof S.focus=="function"){try{S.focus()}catch{}S=null}}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>j(document)):j(document));var kt=class extends HTMLElement{static get observedAttributes(){return["open","fx-dialog-persistent"]}nativeDialog=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.syncNativeState()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;let t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.nativeDialog?.addEventListener("close",()=>this.removeAttribute("open")),this.nativeDialog?.addEventListener("cancel",()=>this.removeAttribute("open")),this.syncNativeState())}};customElements.get("flowx-dialog")||customElements.define("flowx-dialog",kt);var At=class extends HTMLElement{static get observedAttributes(){return["open","title","persistent"]}nativeDialog=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.syncNativeState()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;let t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}render(){if(!this.shadowRoot)return;let t=this.getAttribute("title")||"";this.shadowRoot.innerHTML=`
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
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.nativeDialog?.addEventListener("close",()=>this.removeAttribute("open")),this.nativeDialog?.addEventListener("cancel",()=>this.removeAttribute("open")),this.syncNativeState()}};customElements.get("flowx-modal")||customElements.define("flowx-modal",At);var Et=class extends HTMLElement{static get observedAttributes(){return["open","message","title","confirm-label","cancel-label"]}nativeDialog=null;pendingRequestTrigger=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupGlobalGateListener()}attributeChangedCallback(){this.syncNativeState()}openModal(t){if(t&&(this.pendingRequestTrigger=t),this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;let t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}setupGlobalGateListener(){document.addEventListener("click",t=>{let e=t.target?.closest("[fx-confirm-target]");if(e){let o=e.getAttribute("fx-confirm-target");o&&(o===`#${this.id}`||o===this.id)&&(t.preventDefault(),t.stopPropagation(),this.openModal(e))}},!0)}handleUserChoice(t){if(this.closeModal(),this.dispatchEvent(new CustomEvent("fx-confirm",{bubbles:!0,composed:!0,detail:{confirmed:t}})),t&&this.pendingRequestTrigger){let e=this.pendingRequestTrigger.getAttribute("fx-delete"),o=this.pendingRequestTrigger.getAttribute("fx-post");e?fetch(e,{method:"DELETE"}).then(()=>{let r=this.pendingRequestTrigger?.getAttribute("fx-target");if(r){let i=document.querySelector(r);i&&i.remove()}}):o&&fetch(o,{method:"POST"}),this.pendingRequestTrigger=null}}render(){if(!this.shadowRoot)return;let t=this.getAttribute("title")||"Confirm Action",e=this.getAttribute("message")||"Are you sure you want to proceed?",o=this.getAttribute("confirm-label")||"Confirm",r=this.getAttribute("cancel-label")||"Cancel";this.shadowRoot.innerHTML=`
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
        <p class="message">${e}</p>
        <div class="actions">
          <button type="button" class="btn-cancel" id="btn-cancel">${r}</button>
          <button type="button" class="btn-confirm" id="btn-confirm">${o}</button>
        </div>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.shadowRoot.querySelector("#btn-cancel")?.addEventListener("click",()=>this.handleUserChoice(!1)),this.shadowRoot.querySelector("#btn-confirm")?.addEventListener("click",()=>this.handleUserChoice(!0)),this.syncNativeState()}};customElements.get("flowx-confirm-dialog")||customElements.define("flowx-confirm-dialog",Et);var G=class extends HTMLElement{static get observedAttributes(){return["open","side","title"]}nativeDialog=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.syncNativeState()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;let t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}render(){if(!this.shadowRoot)return;let t=this.getAttribute("side")||"right",e=this.getAttribute("title")||"";this.shadowRoot.innerHTML=`
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
          <h3 class="sheet-title">${e}</h3>
          <button type="button" class="close-btn" fx-dialog-close aria-label="Close sheet">✕</button>
        </div>
        <div class="sheet-body">
          <slot></slot>
        </div>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.syncNativeState()}};customElements.get("flowx-sheet")||customElements.define("flowx-sheet",G);var $t=class extends HTMLElement{static get observedAttributes(){return["open","title"]}nativeDialog=null;startY=0;currentY=0;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.syncNativeState()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;let t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}render(){if(!this.shadowRoot)return;let t=this.getAttribute("title")||"";this.shadowRoot.innerHTML=`
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
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog");let e=this.shadowRoot.querySelector("#drag-handle");e?.addEventListener("pointerdown",o=>{let r=o;this.startY=r.clientY,e.setPointerCapture(r.pointerId);let i=s=>{let n=s.clientY-this.startY;n>0&&this.nativeDialog&&(this.nativeDialog.style.transform=`translateY(${n}px)`)},a=s=>{let n=s.clientY-this.startY;e.releasePointerCapture(s.pointerId),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",a),n>80&&this.closeModal(),this.nativeDialog&&(this.nativeDialog.style.transform="")};window.addEventListener("pointermove",i),window.addEventListener("pointerup",a)}),this.syncNativeState()}};customElements.get("flowx-bottom-sheet")||customElements.define("flowx-bottom-sheet",$t);var St=class extends HTMLElement{static get observedAttributes(){return["open","src","alt"]}nativeDialog=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupGlobalThumbnailListener()}attributeChangedCallback(){this.syncNativeState()}openWithSrc(t,e=""){this.setAttribute("src",t),this.setAttribute("alt",e),this.openModal()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;let t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}setupGlobalThumbnailListener(){document.addEventListener("click",t=>{let e=t.target?.closest("[data-lightbox-src]");if(e){let o=e.getAttribute("data-lightbox-src"),r=e.getAttribute("alt")||"";o&&(t.preventDefault(),this.openWithSrc(o,r))}})}render(){if(!this.shadowRoot)return;let t=this.getAttribute("src")||"",e=this.getAttribute("alt")||"";this.shadowRoot.innerHTML=`
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
          ${t?`<img src="${t}" alt="${e}" />`:"<slot></slot>"}
          ${e?`<div class="caption">${e}</div>`:""}
        </div>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.syncNativeState()}};customElements.get("flowx-lightbox")||customElements.define("flowx-lightbox",St);var W=class extends HTMLElement{static get observedAttributes(){return["open","src","alt"]}nativeDialog=null;galleryImages=[];currentIndex=0;zoomLevel=1;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupGalleryListener()}attributeChangedCallback(){this.syncNativeState()}openGallery(t,e=0){this.galleryImages=t,this.currentIndex=e,this.zoomLevel=1,this.galleryImages[e]&&(this.setAttribute("src",this.galleryImages[e].src),this.setAttribute("alt",this.galleryImages[e].alt||"")),this.openModal()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}prev(){this.galleryImages.length!==0&&(this.currentIndex=(this.currentIndex-1+this.galleryImages.length)%this.galleryImages.length,this.setAttribute("src",this.galleryImages[this.currentIndex].src),this.setAttribute("alt",this.galleryImages[this.currentIndex].alt||""),this.zoomLevel=1,this.render())}next(){this.galleryImages.length!==0&&(this.currentIndex=(this.currentIndex+1)%this.galleryImages.length,this.setAttribute("src",this.galleryImages[this.currentIndex].src),this.setAttribute("alt",this.galleryImages[this.currentIndex].alt||""),this.zoomLevel=1,this.render())}toggleZoom(){this.zoomLevel=this.zoomLevel===1?1.8:1;let t=this.shadowRoot?.querySelector("img");t&&(t.style.transform=`scale(${this.zoomLevel})`)}syncNativeState(){if(!this.nativeDialog)return;let t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}setupGalleryListener(){document.addEventListener("click",t=>{let e=t.target?.closest("[data-gallery-src]");if(e){let o=e.getAttribute("data-gallery"),r=e.getAttribute("data-gallery-src")||e.getAttribute("src");if(o&&r){let i=Array.from(document.querySelectorAll(`[data-gallery="${o}"]`)).map(s=>({src:s.getAttribute("data-gallery-src")||s.getAttribute("src")||"",alt:s.getAttribute("alt")||""})),a=i.findIndex(s=>s.src===r);t.preventDefault(),this.openGallery(i,Math.max(0,a))}}})}render(){if(!this.shadowRoot)return;let t=this.getAttribute("src")||"",e=this.getAttribute("alt")||"",o=this.galleryImages.length>1;this.shadowRoot.innerHTML=`
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
            <span class="title">${e||"Image Viewer"} ${o?`(${this.currentIndex+1}/${this.galleryImages.length})`:""}</span>
            <div class="tools">
              <button type="button" class="btn" id="zoom-btn">🔍 Zoom</button>
              <button type="button" class="btn" fx-dialog-close>✕ Close</button>
            </div>
          </div>
          <div class="img-stage">
            ${o?'<button type="button" class="nav-btn prev-btn" id="prev-btn">◀</button>':""}
            <img src="${t}" alt="${e}" id="viewer-img" />
            ${o?'<button type="button" class="nav-btn next-btn" id="next-btn">▶</button>':""}
          </div>
        </div>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.shadowRoot.querySelector("#zoom-btn")?.addEventListener("click",()=>this.toggleZoom()),this.shadowRoot.querySelector("#viewer-img")?.addEventListener("click",()=>this.toggleZoom()),this.shadowRoot.querySelector("#prev-btn")?.addEventListener("click",()=>this.prev()),this.shadowRoot.querySelector("#next-btn")?.addEventListener("click",()=>this.next()),this.syncNativeState()}};customElements.get("flowx-image-viewer")||customElements.define("flowx-image-viewer",W);var Lt=class extends HTMLElement{static get observedAttributes(){return["breakpoint","open"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}toggleMenu(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","")}render(){if(!this.shadowRoot)return;let t=this.getAttribute("breakpoint")||"768px",e=this.hasAttribute("open");this.shadowRoot.innerHTML=`
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
          .mobile-menu { display: ${e?"flex":"none"}; }
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
    `,this.shadowRoot.querySelector("#toggle-btn")?.addEventListener("click",()=>this.toggleMenu())}};customElements.get("flowx-navbar")||customElements.define("flowx-navbar",Lt);var Ct=class extends HTMLElement{static get observedAttributes(){return["collapsed","persist"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.initPersistedState(),this.render()}attributeChangedCallback(){this.render()}toggleCollapse(){this.hasAttribute("collapsed")?(this.removeAttribute("collapsed"),this.savePersistedState(!1)):(this.setAttribute("collapsed",""),this.savePersistedState(!0))}initPersistedState(){let t=this.getAttribute("persist")||"cookie";if(t==="cookie"&&typeof document<"u"){let e=document.cookie.match(/(?:^|; )flowx_sidebar_collapsed=([^;]*)/);e&&e[1]==="true"&&this.setAttribute("collapsed","")}else t==="localStorage"&&typeof localStorage<"u"&&localStorage.getItem("flowx_sidebar_collapsed")==="true"&&this.setAttribute("collapsed","")}savePersistedState(t){let e=this.getAttribute("persist")||"cookie";e==="cookie"&&typeof document<"u"?document.cookie=`flowx_sidebar_collapsed=${t}; path=/; max-age=31536000`:e==="localStorage"&&typeof localStorage<"u"&&localStorage.setItem("flowx_sidebar_collapsed",String(t))}render(){if(!this.shadowRoot)return;let t=this.hasAttribute("collapsed");this.shadowRoot.innerHTML=`
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
    `,this.shadowRoot.querySelector("#toggle-btn")?.addEventListener("click",()=>this.toggleCollapse())}};customElements.get("flowx-sidebar")||customElements.define("flowx-sidebar",Ct);var zt=class extends G{};customElements.get("flowx-drawer")||customElements.define("flowx-drawer",zt);var Dt=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
    `)}};customElements.get("flowx-dock")||customElements.define("flowx-dock",Dt);var Mt=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
    `)}};customElements.get("flowx-bottom-navigation")||customElements.define("flowx-bottom-navigation",Mt);f("flowx-menu-item",{observedAttributes:["value","disabled"],style:`
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
  `});f("flowx-menu",{observedAttributes:["placement","open"],style:`
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
  `,setup(t,e){let o=e.querySelector(".trigger-slot"),r=e.querySelector(".menu-panel"),i=null,a=null,s=null,n=()=>{t.removeAttribute("open"),i&&(i(),i=null),a&&(a(),a=null),s&&(s(),s=null)},l=()=>{t.setAttribute("open","");let d=o.firstElementChild||o,c=t.getAttribute("placement")||"bottom";i=x(d,r,{placement:c,align:"start",offset:4}).cleanup,a=w(t,n).cleanup,s=E(r,"flowx-menu-item, .menu-item").cleanup};o.addEventListener("click",d=>{d.stopPropagation(),t.hasAttribute("open")?n():l()}),t.addEventListener("click",d=>{let c=d.target;c!==t&&(c.tagName.toLowerCase()==="flowx-menu-item"||c.classList.contains("menu-item"))&&n()})}});var Rt=class extends HTMLElement{static get observedAttributes(){return["open","for"]}outsideCleanup=null;rovingCleanup=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupContextMenuListener()}disconnectedCallback(){this.cleanup()}openAt(t,e){this.setAttribute("open",""),this.render();let o=this.shadowRoot?.querySelector(".menu-panel");if(o){o.style.left=`${t}px`,o.style.top=`${e}px`;let r=w(this,()=>this.close());this.outsideCleanup=r.cleanup;let i=E(o,".menu-item");this.rovingCleanup=i.cleanup}}close(){this.removeAttribute("open"),this.cleanup(),this.render()}cleanup(){this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null),this.rovingCleanup&&(this.rovingCleanup(),this.rovingCleanup=null)}setupContextMenuListener(){let t=this.getAttribute("for");(t?document.querySelector(`#${t}`)||document.querySelector(t):document.body)?.addEventListener("contextmenu",e=>{let o=e;o.preventDefault(),this.openAt(o.clientX,o.clientY)})}render(){if(!this.shadowRoot)return;let t=this.hasAttribute("open");this.shadowRoot.innerHTML=`
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
    `}};customElements.get("flowx-context-menu")||customElements.define("flowx-context-menu",Rt);var Tt=class extends HTMLElement{static get observedAttributes(){return["open","trigger-event"]}outsideCleanup=null;positionerCleanup=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}disconnectedCallback(){this.cleanup()}async open(){this.setAttribute("open",""),this.render();let t=this.querySelector('[slot="trigger"]'),e=this.shadowRoot?.querySelector(".mega-panel");if(t&&t.hasAttribute("fx-get")&&!t.hasAttribute("data-loaded")){t.setAttribute("data-loaded","true");let o=t.getAttribute("fx-get");if(o)try{let r=await(await fetch(o)).text(),i=this.shadowRoot?.querySelector(".mega-content");i&&(i.innerHTML=r)}catch(r){console.error("FlowX MegaMenu: Lazy load error",r)}}if(t&&e){let o=x(t,e,{placement:"bottom",align:"start",offset:8});this.positionerCleanup=o.cleanup;let r=w(this,()=>this.close());this.outsideCleanup=r.cleanup}}close(){this.removeAttribute("open"),this.cleanup(),this.render()}cleanup(){this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null),this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=null)}render(){if(!this.shadowRoot)return;let t=this.hasAttribute("open");this.shadowRoot.innerHTML=`
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
    `,this.shadowRoot.querySelector(".trigger-wrapper")?.addEventListener("click",()=>{this.hasAttribute("open")?this.close():this.open()})}};customElements.get("flowx-mega-menu")||customElements.define("flowx-mega-menu",Tt);var qt=class extends HTMLElement{static get observedAttributes(){return["open","shortcut","fx-endpoint"]}nativeDialog=null;timer=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupGlobalShortcutListener()}attributeChangedCallback(){this.syncNativeState()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;let t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}setupGlobalShortcutListener(){window.addEventListener("keydown",t=>{(t.metaKey||t.ctrlKey)&&t.key.toLowerCase()==="k"&&(t.preventDefault(),this.hasAttribute("open")?this.closeModal():this.openModal())})}performSearch(t){let e=this.getAttribute("fx-endpoint")||this.getAttribute("fx-get"),o=this.shadowRoot?.querySelector("#results");if(!o)return;if(!e){Array.from(o.querySelectorAll(".cmd-item")).forEach(i=>{let a=i.textContent?.toLowerCase()||"";i.style.display=a.includes(t.toLowerCase())?"":"none"});return}let r=e.includes("?")?`${e}&q=${encodeURIComponent(t)}`:`${e}?q=${encodeURIComponent(t)}`;fetch(r).then(i=>i.text()).then(i=>{o.innerHTML=i,window.FlowX&&typeof window.FlowX.process=="function"&&window.FlowX.process(o),E(o,".cmd-item, button, a")})}render(){if(!this.shadowRoot)return;this.shadowRoot.innerHTML=`
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
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.nativeDialog?.addEventListener("close",()=>this.removeAttribute("open"));let t=this.shadowRoot.querySelector("#cmd-input");t?.addEventListener("input",()=>{clearTimeout(this.timer),this.timer=setTimeout(()=>{this.performSearch(t.value.trim())},250)}),this.syncNativeState()}};customElements.get("flowx-command-palette")||customElements.define("flowx-command-palette",qt);var It=class extends HTMLElement{static get observedAttributes(){return["src","alt","blur-src","loading"]}imgEl=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){if(!this.shadowRoot)return;let t=this.getAttribute("src")||"",e=this.getAttribute("alt")||"",o=this.getAttribute("blur-src")||"",r=this.getAttribute("loading")||"lazy";this.shadowRoot.innerHTML=`
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
        <img id="img" src="${t}" alt="${e}" loading="${r}" class="${o?"blur":""}" />
      </div>
    `,this.imgEl=this.shadowRoot.querySelector("#img");let i=this.shadowRoot.querySelector("#skeleton");this.imgEl&&(this.imgEl.complete&&this.imgEl.naturalHeight!==0?this.onImageLoaded(i):(this.imgEl.addEventListener("load",()=>this.onImageLoaded(i)),this.imgEl.addEventListener("error",()=>{i&&(i.style.display="none"),this.imgEl&&(this.imgEl.style.opacity="1")})))}onImageLoaded(t){t&&(t.style.display="none"),this.imgEl&&(this.imgEl.classList.remove("blur"),this.imgEl.classList.add("loaded"))}};customElements.get("flowx-image")||customElements.define("flowx-image",It);var _t=class extends HTMLElement{viewer=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupGalleryClickListeners()}setupGalleryClickListeners(){this.shadowRoot?.querySelector("slot")?.addEventListener("slotchange",()=>this.bindClickEvents()),this.bindClickEvents()}bindClickEvents(){let t=Array.from(this.querySelectorAll("img, flowx-image")),e=t.map(o=>({src:o.getAttribute("src")||o.getAttribute("data-src")||"",alt:o.getAttribute("alt")||""}));t.forEach((o,r)=>{o.style.cursor="pointer",o.onclick=i=>{i.preventDefault(),this.openGalleryViewer(e,r)}})}openGalleryViewer(t,e){this.viewer||(this.viewer=new W,document.body.appendChild(this.viewer)),this.viewer.openGallery(t,e)}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
    `)}};customElements.get("flowx-gallery")||customElements.define("flowx-gallery",_t);var Ht=class extends HTMLElement{static get observedAttributes(){return["autoplay","interval"]}activeIndex=0;autoplayTimer=null;isPointerDown=!1;startX=0;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupSwipeGestures(),this.initAutoplay()}disconnectedCallback(){this.stopAutoplay()}attributeChangedCallback(){this.initAutoplay()}nextSlide(){let t=this.getSlides();t.length&&(this.activeIndex=(this.activeIndex+1)%t.length,this.scrollToActiveSlide())}prevSlide(){let t=this.getSlides();t.length&&(this.activeIndex=(this.activeIndex-1+t.length)%t.length,this.scrollToActiveSlide())}goToSlide(t){let e=this.getSlides();t>=0&&t<e.length&&(this.activeIndex=t,this.scrollToActiveSlide())}getSlides(){let t=this.shadowRoot?.querySelector("slot");return t?t.assignedElements():[]}scrollToActiveSlide(){let t=this.shadowRoot?.querySelector(".track"),e=this.getSlides();t&&e[this.activeIndex]&&e[this.activeIndex].scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"}),this.updateDots()}initAutoplay(){this.stopAutoplay();let t=this.hasAttribute("autoplay"),e=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(t&&!e){let o=Number(this.getAttribute("interval"))||4e3;this.autoplayTimer=setInterval(()=>this.nextSlide(),o)}}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}setupSwipeGestures(){let t=this.shadowRoot?.querySelector(".track");t&&(t.addEventListener("pointerdown",e=>{this.isPointerDown=!0,this.startX=e.clientX}),t.addEventListener("pointerup",e=>{if(!this.isPointerDown)return;this.isPointerDown=!1;let o=e.clientX-this.startX;o<-40?this.nextSlide():o>40&&this.prevSlide()}))}updateDots(){Array.from(this.shadowRoot?.querySelectorAll(".dot")||[]).forEach((t,e)=>{e===this.activeIndex?t.classList.add("active"):t.classList.remove("active")})}render(){if(!this.shadowRoot)return;let t=this.children.length,e="";for(let o=0;o<t;o++)e+=`<button type="button" class="dot ${o===0?"active":""}" data-idx="${o}" aria-label="Go to slide ${o+1}"></button>`;this.shadowRoot.innerHTML=`
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
          ${e}
        </div>
      </div>
    `,this.shadowRoot.querySelector("#prev-btn")?.addEventListener("click",()=>this.prevSlide()),this.shadowRoot.querySelector("#next-btn")?.addEventListener("click",()=>this.nextSlide()),this.shadowRoot.querySelectorAll(".dot").forEach(o=>{o.addEventListener("click",r=>{let i=Number(r.target.getAttribute("data-idx"));this.goToSlide(i)})})}};customElements.get("flowx-carousel")||customElements.define("flowx-carousel",Ht);var Ft=class extends HTMLElement{videoEl=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupVideoControls()}togglePlay(){this.videoEl&&(this.videoEl.paused?this.videoEl.play():this.videoEl.pause())}toggleFullscreen(){this.videoEl&&(document.fullscreenElement?document.exitFullscreen():this.videoEl.requestFullscreen&&this.videoEl.requestFullscreen())}setupVideoControls(){this.shadowRoot?.querySelector("slot")?.addEventListener("slotchange",()=>this.bindNativeVideo()),this.bindNativeVideo()}bindNativeVideo(){if(this.videoEl=this.querySelector("video")||this.shadowRoot?.querySelector("video")||null,this.videoEl){this.videoEl.controls=!1;let t=this.shadowRoot?.querySelector("#play-btn"),e=this.shadowRoot?.querySelector("#progress");this.videoEl.addEventListener("play",()=>{t&&(t.textContent="⏸")}),this.videoEl.addEventListener("pause",()=>{t&&(t.textContent="▶")}),this.videoEl.addEventListener("timeupdate",()=>{e&&this.videoEl&&this.videoEl.duration&&(e.value=String(this.videoEl.currentTime/this.videoEl.duration*100))})}}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
    `,this.shadowRoot.querySelector("#play-btn")?.addEventListener("click",()=>this.togglePlay()),this.shadowRoot.querySelector("#fullscreen-btn")?.addEventListener("click",()=>this.toggleFullscreen()),this.shadowRoot.querySelector("#progress")?.addEventListener("input",t=>{let e=Number(t.target.value);this.videoEl&&this.videoEl.duration&&(this.videoEl.currentTime=e/100*this.videoEl.duration)}))}};customElements.get("flowx-video-player")||customElements.define("flowx-video-player",Ft);var Pt=class extends HTMLElement{audioEl=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.bindNativeAudio()}togglePlay(){this.audioEl&&(this.audioEl.paused?this.audioEl.play():this.audioEl.pause())}bindNativeAudio(){if(this.audioEl=this.querySelector("audio")||this.shadowRoot?.querySelector("audio")||null,this.audioEl){this.audioEl.controls=!1;let t=this.shadowRoot?.querySelector("#play-btn"),e=this.shadowRoot?.querySelector("#progress");this.audioEl.addEventListener("play",()=>{t&&(t.textContent="⏸")}),this.audioEl.addEventListener("pause",()=>{t&&(t.textContent="▶")}),this.audioEl.addEventListener("timeupdate",()=>{e&&this.audioEl&&this.audioEl.duration&&(e.value=String(this.audioEl.currentTime/this.audioEl.duration*100))})}}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
    `,this.shadowRoot.querySelector("#play-btn")?.addEventListener("click",()=>this.togglePlay()),this.shadowRoot.querySelector("#progress")?.addEventListener("input",t=>{let e=Number(t.target.value);this.audioEl&&this.audioEl.duration&&(this.audioEl.currentTime=e/100*this.audioEl.duration)}))}};customElements.get("flowx-audio-player")||customElements.define("flowx-audio-player",Pt);var jt=class extends HTMLElement{static get observedAttributes(){return["src","zoom"]}zoomLevel=100;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}zoomIn(){this.zoomLevel=Math.min(200,this.zoomLevel+25),this.updateZoom()}zoomOut(){this.zoomLevel=Math.max(50,this.zoomLevel-25),this.updateZoom()}updateZoom(){let t=this.shadowRoot?.querySelector("embed");t&&(t.style.transform=`scale(${this.zoomLevel/100})`)}render(){if(!this.shadowRoot)return;let t=this.getAttribute("src")||"";this.shadowRoot.innerHTML=`
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
    `,this.shadowRoot.querySelector("#zoom-in")?.addEventListener("click",()=>this.zoomIn()),this.shadowRoot.querySelector("#zoom-out")?.addEventListener("click",()=>this.zoomOut())}};customElements.get("flowx-pdf-viewer")||customElements.define("flowx-pdf-viewer",jt);var Vt=class extends HTMLElement{static get observedAttributes(){return["src"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}parseMarkdown(t){return t?`<p>${t.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"").replace(/on\w+="[^"]*"/gi,"").replace(/javascript:/gi,"").replace(/^### (.*$)/gim,"<h3>$1</h3>").replace(/^## (.*$)/gim,"<h2>$1</h2>").replace(/^# (.*$)/gim,"<h1>$1</h1>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/```([\s\S]*?)```/g,"<pre><code>$1</code></pre>").replace(/`([^`]+)`/g,"<code>$1</code>").replace(/!\[(.*?)\]\((.*?)\)/g,'<img src="$2" alt="$1" style="max-width:100%" />').replace(/\[(.*?)\]\((.*?)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>').replace(/^\* (.*$)/gim,"<li>$1</li>").replace(/<\/li>\n<li>/g,"</li><li>").replace(/\n\n/g,"</p><p>")}</p>`:""}async render(){if(!this.shadowRoot)return;let t=this.textContent||"",e=this.getAttribute("src")||this.getAttribute("fx-get");if(e)try{t=await(await fetch(e)).text()}catch(r){console.error("FlowX Markdown: Fetch error",r)}let o=this.parseMarkdown(t);this.shadowRoot.innerHTML=`
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
        ${o}
      </div>
    `}};customElements.get("flowx-markdown-viewer")||customElements.define("flowx-markdown-viewer",Vt);var Nt=class extends HTMLElement{static get observedAttributes(){return["lang","line-numbers"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}highlightCode(t,e){if(!t)return"";let o=t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return e==="html"||e==="xml"?o=o.replace(/(&lt;\/?[a-z0-9-]+)/gi,'<span class="keyword">$1</span>').replace(/([a-z-]+)=("[^"]*")/gi,'<span class="attr">$1</span>=<span class="string">$2</span>'):(o=o.replace(/\b(const|let|var|function|return|if|else|import|export|class|from|extends|interface|type)\b/g,'<span class="keyword">$1</span>'),o=o.replace(/("[^"]*"|'[^']*'|`[^`]*`)/g,'<span class="string">$1</span>'),o=o.replace(/(\/\/[^\n]*)/g,'<span class="comment">$1</span>'),o=o.replace(/\b(\d+)\b/g,'<span class="number">$1</span>')),o}render(){if(!this.shadowRoot)return;let t=this.getAttribute("lang")||"js",e=this.textContent||"",o=this.highlightCode(e.trim(),t);this.shadowRoot.innerHTML=`
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
        <pre><code>${o}</code></pre>
      </div>
    `}};customElements.get("flowx-code-viewer")||customElements.define("flowx-code-viewer",Nt);function Ot(t,e,o=365,r="/"){let i=new Date(Date.now()+o*864e5).toUTCString();document.cookie=`${t}=${encodeURIComponent(e)}; expires=${i}; path=${r}; SameSite=Lax`}function Yt(t){if(typeof document>"u"||!document.cookie)return null;let e=document.cookie.match(new RegExp("(?:^|; )"+t.replace(/([.$?*|{}()[\]\\/+^])/g,"\\$1")+"=([^;]*)"));return e?decodeURIComponent(e[1]):null}var M={light:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',dark:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',auto:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'},R={light:"Light",dark:"Dark",auto:"Auto"};f("flowx-theme-toggle",{observedAttributes:["theme","cookie-name"],style:`
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
  `,template:t=>{let e=t._mode||"auto",o=R[e]||"Auto",r=M[e]||M.auto;return`
      <button class="toggle-btn" type="button" aria-label="Theme toggle: current theme is ${o}">
        <span class="icon">${r}</span>
        <span class="label">${o}</span>
        <span class="badge">Theme</span>
      </button>
    `},setup:t=>{let e=t.getAttribute("cookie-name")||"flowx-theme",o=Yt(e),r=typeof localStorage<"u"?localStorage.getItem(e):null,i=t.getAttribute("theme")||o||r||"auto";t._mode=i;let a=n=>{let l=t.shadowRoot||t,d=l.querySelector(".toggle-btn"),c=l.querySelector(".icon"),p=l.querySelector(".label");d&&d.setAttribute("aria-label",`Theme toggle: current theme is ${R[n]}`),c&&(c.innerHTML=M[n]),p&&(p.textContent=R[n])},s=n=>{t._mode=n,document.documentElement.setAttribute("data-theme",n),Ot(e,n),typeof localStorage<"u"&&localStorage.setItem(e,n);let l=n==="auto"?typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":n;a(n),t.dispatchEvent(new CustomEvent("flowx-theme-change",{bubbles:!0,composed:!0,detail:{theme:n,effectiveTheme:l}}))};document.documentElement.hasAttribute("data-theme")||document.documentElement.setAttribute("data-theme",i),a(i),(t.shadowRoot||t).addEventListener("click",n=>{if(!n.target.closest(".toggle-btn"))return;let l=["light","dark","auto"],d=l.indexOf(t._mode||"auto"),c=l[(d+1)%l.length];s(c)}),typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{t._mode==="auto"&&s("auto")})}});f("flowx-container",{observedAttributes:["size","centered"],style:`
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
  `,template:t=>`<div class="container size-${t.getAttribute("size")||"lg"}"><slot></slot></div>`});f("flowx-grid",{observedAttributes:["cols","cols-sm","cols-md","cols-lg","gap"],style:`
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
  `,template:t=>{let e=t.getAttribute("cols")||"1",o=t.getAttribute("cols-sm")||e,r=t.getAttribute("cols-md")||o,i=t.getAttribute("cols-lg")||r,a=`var(--flowx-space-${t.getAttribute("gap")||"4"}, 16px)`;return`
      <div 
        class="grid" 
        style="--cols-base: ${e}; --cols-sm: ${o}; --cols-md: ${r}; --cols-lg: ${i}; --grid-gap: ${a};"
      >
        <slot></slot>
      </div>
    `}});f("flowx-stack",{observedAttributes:["direction","gap","align","justify","wrap"],style:`
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
  `,template:t=>{let e=t.getAttribute("direction")||"column",o=t.getAttribute("gap")||"3",r=t.getAttribute("align")||"stretch",i=t.getAttribute("justify")||"flex-start",a=t.hasAttribute("wrap"),s=`var(--flowx-space-${o}, 12px)`,n={start:"flex-start",end:"flex-end",center:"center",stretch:"stretch",baseline:"baseline"},l={start:"flex-start",end:"flex-end",center:"center",between:"space-between",around:"space-around",evenly:"space-evenly"},d=n[r]||r,c=l[i]||i;return`
      <div 
        class="stack" 
        style="
          flex-direction: ${e}; 
          gap: ${s}; 
          align-items: ${d}; 
          justify-content: ${c};
          flex-wrap: ${a?"wrap":"nowrap"};
        "
      >
        <slot></slot>
      </div>
    `}});f("flowx-split-pane",{observedAttributes:["direction","persist","storage-key","initial-split"],style:`
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
  `,template:t=>{let e=t.getAttribute("direction")||"horizontal",o=t.getAttribute("storage-key")||"flowx-split-ratio",r=t.hasAttribute("persist"),i=parseFloat(t.getAttribute("initial-split")||"50");if(r&&typeof localStorage<"u"){let a=localStorage.getItem(o);if(a){let s=parseFloat(a);isNaN(s)||(i=s)}}return t._ratio=i,`
      <div class="split-container ${e}">
        <div class="pane pane-1" style="--pane-size: ${i}%">
          <slot name="pane-1"></slot>
        </div>
        <div class="divider" tabIndex="0" role="separator" aria-valuenow="${i}"></div>
        <div class="pane pane-2">
          <slot name="pane-2"></slot>
        </div>
      </div>
    `},setup:t=>{let e=t.shadowRoot||t,o=e.querySelector(".divider"),r=e.querySelector(".pane-1"),i=e.querySelector(".split-container");if(!o||!i||!r)return;let a=!1,s=d=>{a=!0,o.classList.add("dragging"),o.setPointerCapture(d.pointerId),d.preventDefault()},n=d=>{if(!a)return;let c=i.getBoundingClientRect(),p=t.getAttribute("direction")==="vertical",u=50;if(p?u=(d.clientY-c.top)/c.height*100:u=(d.clientX-c.left)/c.width*100,u=Math.max(10,Math.min(90,u)),t._ratio=u,r.style.setProperty("--pane-size",`${u}%`),o.setAttribute("aria-valuenow",String(Math.round(u))),t.hasAttribute("persist")&&typeof localStorage<"u"){let b=t.getAttribute("storage-key")||"flowx-split-ratio";localStorage.setItem(b,String(u))}t.dispatchEvent(new CustomEvent("fx-resize",{bubbles:!0,composed:!0,detail:{ratio:u}}))},l=d=>{if(a){a=!1,o.classList.remove("dragging");try{o.releasePointerCapture(d.pointerId)}catch{}}};o.addEventListener("pointerdown",s),o.addEventListener("pointermove",n),o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l)}});f("flowx-resizable-panel",{observedAttributes:["handles","min-width","max-width","min-height","max-height"],style:`
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
  `,template:t=>{let e=(t.getAttribute("handles")||"right,bottom").split(",").map(r=>r.trim().toLowerCase()),o="";return e.includes("right")&&(o+='<div class="handle handle-right" data-edge="right"></div>'),e.includes("bottom")&&(o+='<div class="handle handle-bottom" data-edge="bottom"></div>'),e.includes("left")&&(o+='<div class="handle handle-left" data-edge="left"></div>'),e.includes("top")&&(o+='<div class="handle handle-top" data-edge="top"></div>'),`
      <div class="panel">
        <slot></slot>
        ${o}
      </div>
    `},setup:t=>{(t.shadowRoot||t).querySelectorAll(".handle").forEach(e=>{let o=!1,r=0,i=0,a=0,s=0,n=e.getAttribute("data-edge"),l=p=>{let u=p;o=!0,e.classList.add("dragging"),e.setPointerCapture(u.pointerId);let b=t.getBoundingClientRect();r=u.clientX,i=u.clientY,a=b.width,s=b.height,u.preventDefault()},d=p=>{if(!o)return;let u=p,b=u.clientX-r,v=u.clientY-i,h=a,m=s,k=parseFloat(t.getAttribute("min-width")||"100"),A=parseFloat(t.getAttribute("max-width")||"2000"),q=parseFloat(t.getAttribute("min-height")||"100"),I=parseFloat(t.getAttribute("max-height")||"2000");n==="right"&&(h=Math.max(k,Math.min(A,a+b))),n==="bottom"&&(m=Math.max(q,Math.min(I,s+v))),n==="left"&&(h=Math.max(k,Math.min(A,a-b))),n==="top"&&(m=Math.max(q,Math.min(I,s-v))),t.style.width=`${h}px`,t.style.height=`${m}px`,t.dispatchEvent(new CustomEvent("fx-resize",{bubbles:!0,composed:!0,detail:{width:h,height:m,edge:n}}))},c=p=>{if(o){o=!1,e.classList.remove("dragging");try{e.releasePointerCapture(p.pointerId)}catch{}}};e.addEventListener("pointerdown",l),e.addEventListener("pointermove",d),e.addEventListener("pointerup",c),e.addEventListener("pointercancel",c)})}});f("flowx-responsive-layout",{observedAttributes:["breakpoint","collapsed"],style:`
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
    `,setup:t=>{typeof ResizeObserver<"u"&&new ResizeObserver(e=>{for(let o of e){let r=o.contentRect.width,i=parseFloat(t.getAttribute("breakpoint")||"768"),a=r<i,s=t.hasAttribute("collapsed");t.setAttribute("data-compact",String(a)),t.dispatchEvent(new CustomEvent("fx-layout-change",{bubbles:!0,composed:!0,detail:{width:r,isCompact:a,isCollapsed:s}}))}}).observe(t)}});f("flowx-masonry",{observedAttributes:["cols","gap"],style:`
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
  `,template:t=>{let e=t.getAttribute("cols")||"3",o=`var(--flowx-space-${t.getAttribute("gap")||"4"}, 16px)`;return`
      <div class="masonry-wrapper" style="--masonry-cols: ${e}; --masonry-gap: ${o};">
        <slot></slot>
      </div>
    `},setup:t=>{let e=(t.shadowRoot||t).querySelector(".masonry-wrapper");if(e&&!(typeof CSS<"u"&&CSS.supports&&(CSS.supports("grid-template-rows","masonry")||CSS.supports("grid-rows","masonry")))){let o=()=>{let r=e.querySelector("slot"),i=r?r.assignedElements():Array.from(e.children);if(!i.length)return;let a=parseInt(t.getAttribute("cols")||"3",10),s=parseInt(t.getAttribute("gap")||"4",10)*4,n=((e.getBoundingClientRect().width||800)-s*(a-1))/a,l=new Array(a).fill(0);i.forEach(d=>{let c=d,p=0;for(let h=1;h<a;h++)l[h]<l[p]&&(p=h);let u=p*(n+s),b=l[p];c.style.position="absolute",c.style.width=`${n}px`,c.style.left=`${u}px`,c.style.top=`${b}px`;let v=c.getBoundingClientRect().height||100;l[p]+=v+s}),e.style.height=`${Math.max(...l)}px`,e.style.display="block"};setTimeout(o,50),typeof ResizeObserver<"u"&&new ResizeObserver(o).observe(t)}}});f("flowx-dashboard-layout",{observedAttributes:["sidebar-width","right-panel"],style:`
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
  `,template:t=>{let e=t.getAttribute("sidebar-width")||"240px",o=t.hasAttribute("right-panel");return`
      <div class="app-shell">
        <header class="header-region">
          <slot name="header"></slot>
        </header>
        <div class="body-region">
          <aside class="sidebar-region" style="--sidebar-w: ${e}">
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
    `}});f("flowx-notifications",{observedAttributes:["unread-count","fx-sse-connect","sse-event"],style:`
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
  `,template:t=>{let e=t._isOpen||!1,o=t._items||[],r=o.filter(a=>a.unread).length,i=o.length===0?'<div class="empty-state">No notifications</div>':o.map(a=>`
        <li class="item ${a.unread?"unread":""}" data-id="${a.id}">
          <div class="item-title">${a.title}</div>
          ${a.message?`<div class="item-msg">${a.message}</div>`:""}
          <div class="item-time">${a.time||"Just now"}</div>
        </li>
      `).join("");return`
      <button class="bell-btn" type="button" aria-expanded="${e}" aria-label="Notifications (${r} unread)">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span class="badge ${r===0?"hidden":""}">${r>99?"99+":r}</span>
      </button>

      <div class="dropdown-panel ${e?"open":""}" role="region" aria-label="Notifications panel">
        <div class="header">
          <span>Notifications</span>
          ${r>0?'<button class="mark-read-btn" type="button">Mark all as read</button>':""}
        </div>
        <ul class="list">
          ${i}
        </ul>
      </div>
    `},setup:t=>{t._items=t._items||[{id:"1",title:"System Welcome",message:"FlowX Real-time Engine initialized",time:"1m ago",unread:!0}],t._isOpen=!1,t.render(),(t.shadowRoot||t).addEventListener("click",o=>{let r=o.target,i=r.closest(".bell-btn"),a=r.closest(".mark-read-btn");i?(t._isOpen=!t._isOpen,t.render()):a&&(t._items=t._items.map(s=>({...s,unread:!1})),t.render())});let e=t.getAttribute("fx-sse-connect");if(e&&typeof window<"u"&&window.EventSource)try{let o=new EventSource(e),r=t.getAttribute("sse-event")||"notification";o.addEventListener(r,i=>{try{let a=JSON.parse(i.data),s={id:a.id||`notif-${Date.now()}`,title:a.title||"New Notification",message:a.message||"",time:"Just now",unread:!0};t._items=[s,...t._items],t.dispatchEvent(new CustomEvent("fx-notification-receive",{detail:s,bubbles:!0})),t.render()}catch{}}),t._eventSource=o}catch{}}});f("flowx-chat-window",{observedAttributes:["fx-post","fx-ws-connect","fx-sse-connect","current-user"],style:`
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
  `,template:t=>{let e=t._messages||[],o=e.map(r=>`
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
        <span style="font-size: 11px; color: var(--flowx-color-text-muted);">${e.length} messages</span>
      </div>

      <div class="messages-container">
        ${o}
      </div>

      <form class="input-form">
        <input class="chat-input" type="text" placeholder="Type a message..." required />
        <button class="send-btn" type="submit">Send</button>
      </form>
    `},setup:t=>{t._messages=t._messages||[{id:"m-1",sender:"Bot",text:"Welcome to the collaborative room!",isSelf:!1,time:"10:00 AM"}];let e=t.getAttribute("current-user")||"You",o=t.shadowRoot||t,r=a=>{a.scrollTop+a.clientHeight<a.scrollHeight-40||(a.scrollTop=a.scrollHeight)};t.addMessage=a=>{let s=a.sender===e||a.isSelf===!0,n={...a,isSelf:s};if(!t._messages.some(l=>l.id===n.id||l.sender===n.sender&&l.text===n.text&&Math.abs(l._timestamp-Date.now())<5e3)){t._messages=[...t._messages,n],t.render();let l=o.querySelector(".messages-container");l&&r(l)}},o.addEventListener("submit",a=>{a.preventDefault();let s=o.querySelector(".chat-input");if(!s||!s.value.trim())return;let n=s.value.trim();s.value="";let l={id:`msg-${Date.now()}`,sender:e,text:n,isSelf:!0,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),_timestamp:Date.now()};t.addMessage(l),t.dispatchEvent(new CustomEvent("fx-message-send",{detail:l,bubbles:!0})),t._ws&&t._ws.readyState===WebSocket.OPEN&&t._ws.send(JSON.stringify(l))});let i=t.getAttribute("fx-sse-connect");if(i&&typeof window<"u"&&window.EventSource)try{let a=new EventSource(i);a.addEventListener("chat",s=>{try{let n=JSON.parse(s.data);t.addMessage(n)}catch{}}),t._eventSource=a}catch{}}});function J(t){let e=0;for(let o of t)e+=1,o.replies&&(e+=J(o.replies));return e}f("flowx-comments",{observedAttributes:["fx-post","fx-sse-connect","current-user"],style:`
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
  `,template:t=>{let e=t._comments||[],o=t._replyingToId,r=i=>i.map(a=>`
        <div class="comment-card" data-id="${a.id}">
          <div class="comment-meta">
            <div class="author-info">
              <span class="avatar-circle">${a.author?a.author.charAt(0).toUpperCase():"U"}</span>
              <span>${a.author}</span>
            </div>
            <span class="comment-time">${a.time||"Just now"}</span>
          </div>
          <div class="comment-content">${a.content}</div>
          <div class="comment-actions">
            <button class="reply-btn" data-reply-id="${a.id}" type="button">Reply</button>
          </div>

          ${o===a.id?`
            <form class="new-comment-form reply-form" data-parent-id="${a.id}">
              <textarea class="comment-textarea" placeholder="Write a reply..." required></textarea>
              <button class="submit-btn" type="submit">Post Reply</button>
            </form>
          `:""}

          ${a.replies&&a.replies.length>0?`
            <div class="replies-thread">
              ${r(a.replies)}
            </div>
          `:""}
        </div>
      `).join("");return`
      <div class="comments-wrapper">
        <div class="comments-header">
          <span>Discussion (${J(e)})</span>
        </div>

        <div class="comments-tree">
          ${r(e)}
        </div>

        <form class="new-comment-form main-form">
          <textarea class="comment-textarea main-input" placeholder="Add a comment..." required></textarea>
          <button class="submit-btn" type="submit">Post Comment</button>
        </form>
      </div>
    `},setup:t=>{t._comments=t._comments||[{id:"c-1",author:"Alice",content:"Great architectural baseline for real-time widgets!",time:"10m ago",replies:[{id:"c-2",author:"Bob",content:"Agreed, SSE integration simplifies live updates.",parentId:"c-1",time:"5m ago"}]}],t.render();let e=t.getAttribute("current-user")||"You";t.addComment=r=>{if(!r.parentId)t._comments=[...t._comments,r];else{let i=a=>a.map(s=>s.id===r.parentId?{...s,replies:[...s.replies||[],r]}:s.replies?{...s,replies:i(s.replies)}:s);t._comments=i(t._comments)}t._replyingToId=null,t.render()};let o=t.shadowRoot||t;o.addEventListener("click",r=>{let i=r.target;if(i.classList.contains("reply-btn")){let a=i.getAttribute("data-reply-id");t._replyingToId=t._replyingToId===a?null:a,t.render()}}),o.addEventListener("submit",r=>{r.preventDefault();let i=r.target,a=i.querySelector(".comment-textarea");if(!a||!a.value.trim())return;let s=i.getAttribute("data-parent-id")||null,n={id:`c-${Date.now()}`,author:e,content:a.value.trim(),parentId:s,time:"Just now",replies:[]};t.addComment(n),t.dispatchEvent(new CustomEvent("fx-comment-submit",{detail:n,bubbles:!0}))})}});f("flowx-mention",{observedAttributes:["search-url","debounce-ms"],style:`
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
  `,template:t=>{let e=t._isOpen||!1,o=t._users||[],r=t._activeIdx||0,i=o.length===0?'<li class="mention-item" style="color: var(--flowx-color-text-muted);">No users found</li>':o.map((a,s)=>`
        <li class="mention-item ${s===r?"active":""}" data-id="${a.id}" data-username="${a.username}">
          <span class="user-avatar">${a.username.charAt(0).toUpperCase()}</span>
          <span>@${a.username}</span>
          ${a.name?`<span style="font-size: 11px; color: var(--flowx-color-text-muted); margin-left: auto;">${a.name}</span>`:""}
        </li>
      `).join("");return`
      <slot></slot>
      <ul class="popup-list ${e?"open":""}" style="left: ${t._popupX||0}px; top: ${t._popupY||35}px;">
        ${i}
      </ul>
    `},setup:t=>{t._users=[],t._isOpen=!1,t._activeIdx=0,t._searchQuery="";let e=[{id:"u1",username:"alice",name:"Alice Vance"},{id:"u2",username:"bob",name:"Bob Smith"},{id:"u3",username:"charlie",name:"Charlie Brown"},{id:"u4",username:"diana",name:"Diana Prince"}],o=t.shadowRoot||t,r=null,i=l=>l&&l.tagName&&["TEXTAREA","INPUT"].includes(l.tagName)?l:t.querySelector("textarea, input")||o.querySelector("textarea, input"),a=l=>{let d=i();if(!d)return;let c=d.value,p=c.lastIndexOf("@");if(p!==-1){let u=c.slice(0,p),b=`@[${l.username}](${l.id}) `;d.value=u+b,d.focus()}t._isOpen=!1,t.render(),t.dispatchEvent(new CustomEvent("fx-mention-select",{detail:l,bubbles:!0}))},s=l=>{let d=i(l.target);if(!d)return;let c=d.value,p=c.lastIndexOf("@");if(p!==-1&&p>=c.length-15&&!c.slice(p).includes(" ")){let u=c.slice(p+1).toLowerCase();t._searchQuery=u;let b=parseInt(t.getAttribute("debounce-ms")||"200",10);clearTimeout(r),r=setTimeout(()=>{let v=e.filter(h=>h.username.toLowerCase().includes(u)||h.name&&h.name.toLowerCase().includes(u));t._users=v,t._isOpen=!0,t._activeIdx=0,t._popupX=Math.min(200,p*8),t._popupY=d.offsetHeight||40,t.render()},b)}else t._isOpen&&(t._isOpen=!1,t.render())},n=l=>{if(!t._isOpen)return;let d=l;d.key==="ArrowDown"?(d.preventDefault(),t._activeIdx=(t._activeIdx+1)%Math.max(1,t._users.length),t.render()):d.key==="ArrowUp"?(d.preventDefault(),t._activeIdx=(t._activeIdx-1+t._users.length)%Math.max(1,t._users.length),t.render()):d.key==="Enter"||d.key==="Tab"?t._users[t._activeIdx]&&(d.preventDefault(),a(t._users[t._activeIdx])):d.key==="Escape"&&(t._isOpen=!1,t.render())};t.addEventListener("input",s),t.addEventListener("keydown",n),o.addEventListener("input",s),o.addEventListener("keydown",n),o.addEventListener("click",l=>{let d=l.target.closest(".mention-item");if(d){let c=d.getAttribute("data-username"),p=t._users.find(u=>u.username===c);p&&a(p)}})}});f("flowx-activity-feed",{observedAttributes:["fx-sse-connect","grouping"],style:`
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
  `,template:t=>{let e=t._items||[],o=t.getAttribute("grouping")!=="false",r=[];if(o)for(let a of e){let s=r[r.length-1];s&&s.action===a.action&&s.target===a.target?s.othersCount=(s.othersCount||0)+1:r.push({...a,othersCount:0})}else r=e;let i=r.map(a=>{let s=a.othersCount&&a.othersCount>0?`${a.actor} and ${a.othersCount} ${a.othersCount===1?"other":"others"}`:a.actor;return`
        <div class="activity-card" data-id="${a.id}">
          <div class="actor-avatar">${a.actor.charAt(0).toUpperCase()}</div>
          <div class="activity-body">
            <span class="actor-name">${s}</span>
            <span class="action-text">${a.action}</span>
            ${a.target?`<strong style="color: var(--flowx-color-text);">${a.target}</strong>`:""}
          </div>
          <div class="activity-time">${a.time||"Just now"}</div>
        </div>
      `}).join("");return`
      <div class="feed-container">
        <div class="feed-header">
          <span>Activity Stream</span>
          <span style="font-size: 11px; color: var(--flowx-color-text-muted);">${r.length} events</span>
        </div>
        <div class="activity-list">
          ${i.length>0?i:'<div style="color: var(--flowx-color-text-muted);">No activity recorded</div>'}
        </div>
      </div>
    `},setup:t=>{t._items=t._items||[{id:"act-1",actor:"Alice",action:"commented on",target:"Tier 13 Specs",time:"10m ago"},{id:"act-2",actor:"Bob",action:"commented on",target:"Tier 13 Specs",time:"8m ago"},{id:"act-3",actor:"Charlie",action:"commented on",target:"Tier 13 Specs",time:"5m ago"},{id:"act-4",actor:"Diana",action:"deployed",target:"v1.1.0-beta",time:"2m ago"}];let e=t.getAttribute("fx-sse-connect");if(e&&typeof window<"u"&&window.EventSource)try{let o=new EventSource(e);o.addEventListener("activity",r=>{try{let i=JSON.parse(r.data),a={id:i.id||`act-${Date.now()}`,actor:i.actor||"User",action:i.action||"updated",target:i.target||"",time:"Just now"};t._items=[a,...t._items],t.render()}catch{}}),t._eventSource=o}catch{}}});
