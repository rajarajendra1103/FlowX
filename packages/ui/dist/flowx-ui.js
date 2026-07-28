"use strict";var FlowXUI=(()=>{var Tt=Object.defineProperty;var Bt=Object.getOwnPropertyDescriptor;var Xt=Object.getOwnPropertyNames;var Yt=Object.prototype.hasOwnProperty;var Ut=(e,t)=>{for(var o in t)Tt(e,o,{get:t[o],enumerable:!0})},Gt=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Xt(t))!Yt.call(e,n)&&n!==o&&Tt(e,n,{get:()=>t[n],enumerable:!(r=Bt(t,n))||r.enumerable});return e};var Wt=e=>Gt(Tt({},"__esModule",{value:!0}),e);var Ce={};Ut(Ce,{FORM_BASE_STYLE:()=>O,FlowXActivityFeed:()=>$e,FlowXAlert:()=>ie,FlowXAudioPlayer:()=>kt,FlowXAvatar:()=>te,FlowXBadge:()=>Zt,FlowXBottomNavigation:()=>gt,FlowXBottomSheet:()=>ct,FlowXButton:()=>Qt,FlowXCard:()=>ee,FlowXCarousel:()=>Et,FlowXChatWindow:()=>Me,FlowXChip:()=>re,FlowXCodeViewer:()=>St,FlowXColorPicker:()=>U,FlowXCommandPalette:()=>xt,FlowXComments:()=>Se,FlowXConfirmDialog:()=>dt,FlowXContainer:()=>me,FlowXContextMenu:()=>mt,FlowXDashboardLayout:()=>ke,FlowXDataGrid:()=>K,FlowXDataTable:()=>z,FlowXDatePicker:()=>B,FlowXDateTimePicker:()=>Y,FlowXDialog:()=>st,FlowXDivider:()=>oe,FlowXDock:()=>bt,FlowXDrawer:()=>ht,FlowXExport:()=>at,FlowXFileUpload:()=>C,FlowXFilter:()=>rt,FlowXForm:()=>j,FlowXFormError:()=>V,FlowXGallery:()=>yt,FlowXGrid:()=>ve,FlowXGroupBy:()=>nt,FlowXIconButton:()=>Kt,FlowXImage:()=>wt,FlowXImageUpload:()=>G,FlowXImageViewer:()=>D,FlowXInfiniteScroll:()=>et,FlowXLightbox:()=>pt,FlowXLink:()=>Jt,FlowXListView:()=>Z,FlowXMarkdownViewer:()=>Mt,FlowXMasonry:()=>Ae,FlowXMegaMenu:()=>vt,FlowXMention:()=>Te,FlowXModal:()=>lt,FlowXNavbar:()=>ut,FlowXNotifications:()=>Le,FlowXPdfViewer:()=>Lt,FlowXProgress:()=>ae,FlowXResizablePanel:()=>ye,FlowXResponsiveLayout:()=>Ee,FlowXSearch:()=>ot,FlowXSheet:()=>H,FlowXSidebar:()=>ft,FlowXSignaturePad:()=>W,FlowXSkeleton:()=>le,FlowXSort:()=>it,FlowXSpinner:()=>se,FlowXSplitPane:()=>we,FlowXStack:()=>xe,FlowXThemeToggle:()=>ge,FlowXTimePicker:()=>X,FlowXToast:()=>ne,FlowXToastManager:()=>P,FlowXTreeTable:()=>J,FlowXVideoPlayer:()=>At,FlowXVirtualList:()=>tt,GLOBAL_THEME:()=>h,INPUT_STYLE:()=>M,QueryStateManager:()=>Q,closeDialogElement:()=>zt,createFloatingPositioner:()=>y,createFocusTrap:()=>_,createQueryStateManager:()=>R,createRovingTabindex:()=>k,defineFlowXElement:()=>f,defineFormAssociatedElement:()=>A,enhanceNativeInput:()=>L,exportTableToCSV:()=>$t,getInitialThemeScript:()=>fe,handleValidationResponse:()=>pe,initDialogTriggerEngine:()=>Ct,openDialogElement:()=>Nt,openDialogWithTrigger:()=>Ot,scanAndEnhance:()=>I,swapServerErrors:()=>N,syncFromNativeInput:()=>T,syncToNativeInput:()=>S,useOutsideClickAndEscape:()=>E,validateForm:()=>ce});function y(e,t,o={}){let r=o.placement||"bottom",n=o.align||"center",i=o.offset!==void 0?o.offset:8,a=()=>{if(!e||!t)return;let s=e.getBoundingClientRect(),l=t.style.display,d=t.style.visibility;l==="none"&&(t.style.display="block",t.style.visibility="hidden"),t.style.position="fixed";let c=t.getBoundingClientRect();t.style.display=l,t.style.visibility=d,t.style.position="fixed";let u=r,p=window.innerWidth,g=window.innerHeight;r==="bottom"&&s.bottom+c.height+i>g?s.top-c.height-i>=0&&(u="top"):r==="top"&&s.top-c.height-i<0?s.bottom+c.height+i<=g&&(u="bottom"):r==="right"&&s.right+c.width+i>p?s.left-c.width-i>=0&&(u="left"):r==="left"&&s.left-c.width-i<0&&s.right+c.width+i<=p&&(u="right");let b=0,m=0;u==="bottom"?(b=s.bottom+i,n==="start"?m=s.left:n==="end"?m=s.right-c.width:m=s.left+(s.width-c.width)/2):u==="top"?(b=s.top-c.height-i,n==="start"?m=s.left:n==="end"?m=s.right-c.width:m=s.left+(s.width-c.width)/2):u==="right"?(m=s.right+i,n==="start"?b=s.top:n==="end"?b=s.bottom-c.height:b=s.top+(s.height-c.height)/2):u==="left"&&(m=s.left-c.width-i,n==="start"?b=s.top:n==="end"?b=s.bottom-c.height:b=s.top+(s.height-c.height)/2),m<0&&(m=0),m+c.width>p&&(m=p-c.width),b<0&&(b=0),b+c.height>g&&(b=g-c.height),t.style.top=`${b}px`,t.style.left=`${m}px`};return window.addEventListener("scroll",a,{passive:!0}),window.addEventListener("resize",a,{passive:!0}),a(),{update:a,cleanup:()=>{window.removeEventListener("scroll",a),window.removeEventListener("resize",a)}}}function _(e){let t=document.activeElement,o=()=>{let i=["a[href]","area[href]","input:not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","iframe","object","embed",'[tabindex]:not([tabindex="-1"])',"[contenteditable]"],a=[],s=l=>{l.shadowRoot&&Array.from(l.shadowRoot.querySelectorAll("*")).forEach(s),l.matches&&i.some(d=>l.matches(d))&&a.push(l),Array.from(l.children).forEach(s)};return s(e),a},r=i=>{if(i.key!=="Tab")return;let a=o();if(a.length===0){i.preventDefault();return}let s=document.activeElement;for(;s&&s.shadowRoot&&s.shadowRoot.activeElement;)s=s.shadowRoot.activeElement;let l=a[0],d=a[a.length-1];i.shiftKey?(s===l||!a.includes(s))&&(d.focus(),i.preventDefault()):(s===d||!a.includes(s))&&(l.focus(),i.preventDefault())};e.addEventListener("keydown",r);let n=o();return n.length>0&&n[0].focus(),{cleanup:()=>{e.removeEventListener("keydown",r),t&&typeof t.focus=="function"&&t.focus()}}}function E(e,t){let o=n=>{n.composedPath().includes(e)||t()},r=n=>{n.key==="Escape"&&t()};return document.addEventListener("click",o,!0),document.addEventListener("keydown",r,!0),{cleanup:()=>{document.removeEventListener("click",o,!0),document.removeEventListener("keydown",r,!0)}}}function k(e,t){let o=()=>{let a=e.shadowRoot||e,s=Array.from(a.querySelectorAll(t)),l=Array.from(e.querySelectorAll(t));return Array.from(new Set([...s,...l]))},r=(a,s)=>{a.forEach(l=>{l===s?l.setAttribute("tabindex","0"):l.setAttribute("tabindex","-1")})},n=a=>{let s=o().filter(p=>!p.hasAttribute("disabled")&&p.getAttribute("aria-disabled")!=="true");if(s.length===0)return;let l=document.activeElement;for(;l&&l.shadowRoot&&l.shadowRoot.activeElement;)l=l.shadowRoot.activeElement;let d=s.indexOf(l);if(d===-1){let p=s.find(g=>g.getAttribute("tabindex")==="0");d=p?s.indexOf(p):0}let c=d;switch(a.key){case"ArrowRight":case"ArrowDown":c=(d+1)%s.length,a.preventDefault();break;case"ArrowLeft":case"ArrowUp":c=(d-1+s.length)%s.length,a.preventDefault();break;case"Home":c=0,a.preventDefault();break;case"End":c=s.length-1,a.preventDefault();break;default:return}let u=s[c];u&&(r(o(),u),u.focus())},i=()=>{let a=o();a.length>0&&(a.some(l=>l.getAttribute("tabindex")==="0")||r(a,a[0])),e.addEventListener("keydown",n)};return i(),{setup:i,update:()=>{let a=o(),s=a.find(l=>l.getAttribute("tabindex")==="0")||a[0];s&&r(a,s)},cleanup:()=>{e.removeEventListener("keydown",n)}}}var h=`
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
`;function f(e,t){class o extends HTMLElement{static get observedAttributes(){return t.observedAttributes||[]}_initialized=!1;constructor(){super(),t.shadow!==!1&&this.attachShadow({mode:"open"})}connectedCallback(){this._initialized||(this.render(),t.setup&&t.setup(this),this._initialized=!0)}attributeChangedCallback(i,a,s){if(a===s)return;let l=i.replace(/-([a-z])/g,c=>c[1].toUpperCase()),d=s;s===""&&(d=!0),s===null&&(d=!1),this[l]!==d&&(this[l]=d),this._initialized&&this.render()}render(){let i=`<style>${h}${t.style||""}</style>`,a="";typeof t.template=="function"?a=t.template(this):typeof t.template=="string"&&(a=t.template);let s=`${i}${a}`;this.shadowRoot?this.shadowRoot.innerHTML=s:this.innerHTML=s}}let r=o.prototype;return t.observedAttributes&&t.observedAttributes.forEach(n=>{let i=n.replace(/-([a-z])/g,a=>a[1].toUpperCase());Object.getOwnPropertyDescriptor(r,i)||Object.defineProperty(r,i,{get(){let a=this.getAttribute(n);return a===""?!0:a===null?!1:a},set(a){a===null||a===!1?this.hasAttribute(n)&&this.removeAttribute(n):a===!0?this.getAttribute(n)!==""&&this.setAttribute(n,""):this.getAttribute(n)!==String(a)&&this.setAttribute(n,String(a))},configurable:!0})}),customElements.get(e)||customElements.define(e,o),o}var Qt=f("flowx-button",{observedAttributes:["variant","size","disabled","loading"],style:`
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
  `,template:e=>{let t=e.getAttribute("variant")||"primary",o=e.getAttribute("size")||"md",r=e.hasAttribute("disabled"),n=e.hasAttribute("loading");return`
      <button 
        class="btn ${t} ${o} ${n?"loading":""}"
        ${r||n?"disabled":""}
        aria-disabled="${r||n?"true":"false"}"
        aria-busy="${n?"true":"false"}"
      >
        ${n?'<span class="spinner"></span>':""}
        <span class="btn-text"><slot></slot></span>
      </button>
    `}});var Kt=f("flowx-icon-button",{observedAttributes:["variant","size","disabled","loading","round","aria-label"],style:`
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
  `,template:e=>{let t=e.getAttribute("variant")||"primary",o=e.getAttribute("size")||"md",r=e.hasAttribute("disabled"),n=e.hasAttribute("loading"),i=e.hasAttribute("round"),a=e.getAttribute("aria-label")||"icon button";return`
      <button 
        class="btn ${t} ${o} ${i?"circle":"square"} ${n?"loading":""}"
        ${r||n?"disabled":""}
        aria-label="${a}"
        aria-disabled="${r||n?"true":"false"}"
        aria-busy="${n?"true":"false"}"
      >
        ${n?'<span class="spinner"></span>':"<slot></slot>"}
      </button>
    `}});var Jt=f("flowx-link",{observedAttributes:["href","target","download"],style:`
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
  `,template:e=>{let t=e.getAttribute("href")||"#",o=e.getAttribute("target")||"",r=e.getAttribute("download"),n=!1;(t.startsWith("http://")||t.startsWith("https://"))&&(typeof window<"u"?new URL(t).hostname!==window.location.hostname&&(n=!0):n=!0);let i=n?'rel="noopener noreferrer"':"";n&&!o&&(o="_blank");let a=o?`target="${o}"`:"",s=r!==null?`download="${r}"`:"";return`
      <a 
        class="link"
        href="${t}"
        ${a}
        ${i}
        ${s}
      >
        <slot></slot>
        ${n?'<span class="external-icon" aria-hidden="true">\u2197</span>':""}
      </a>
    `}});var Zt=f("flowx-badge",{observedAttributes:["variant","size"],style:`
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
  `,template:e=>{let t=e.getAttribute("variant")||"neutral",o=e.getAttribute("size")||"md";return`
      <span class="badge ${t} ${o}">
        <slot></slot>
      </span>
    `}});var te=f("flowx-avatar",{observedAttributes:["src","alt","name","img-failed"],style:`
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
  `,setup:e=>{let t=()=>{let o=e.shadowRoot?.querySelector(".avatar-img");o&&o.addEventListener("error",()=>{e.setAttribute("img-failed","")})};t(),e.addEventListener("load",t)},template:e=>{let t=e.getAttribute("src"),o=e.getAttribute("alt")||"",r=e.getAttribute("name")||"",n=e.hasAttribute("img-failed"),i="";return r&&(i=r.trim().split(/\s+/).map(s=>s[0]).slice(0,2).join("").toUpperCase()),`<div class="avatar-container">${t&&!n?`<img class="avatar-img" src="${t}" alt="${o}" />`:`<div class="avatar-fallback" aria-label="${r||o}">${i||"?"}</div>`}</div>`}});var ee=f("flowx-card",{style:`
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
  `});var oe=f("flowx-divider",{observedAttributes:["orientation"],style:`
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
  `,template:e=>{let t=e.getAttribute("orientation")||"horizontal";return`
      <hr 
        class="divider ${t}" 
        role="separator" 
        aria-orientation="${t}"
      />
    `}});var re=f("flowx-chip",{observedAttributes:["dismissible"],style:`
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
  `,setup:e=>{(()=>{let o=e.shadowRoot?.querySelector(".close-btn");if(o){let r=n=>{n.stopPropagation();let i=new CustomEvent("close",{bubbles:!0,composed:!0,cancelable:!0});e.dispatchEvent(i)&&e.remove()};o.addEventListener("click",r),o.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),r(n))})}})()},template:e=>`
      <span class="chip" role="status">
        <span class="chip-text"><slot></slot></span>
        ${e.hasAttribute("dismissible")?`
          <button 
            type="button" 
            class="close-btn" 
            aria-label="Dismiss tag"
          >
            \xD7
          </button>
        `:""}
      </span>
    `});var ie=f("flowx-alert",{observedAttributes:["variant","dismissible"],style:`
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
  `,setup:e=>{(()=>{let o=e.shadowRoot?.querySelector(".close-btn");o&&o.addEventListener("click",r=>{r.stopPropagation();let n=new CustomEvent("close",{bubbles:!0,composed:!0,cancelable:!0});e.dispatchEvent(n)&&e.remove()})})()},template:e=>{let t=e.getAttribute("variant")||"info",o=e.hasAttribute("dismissible");return`
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
            \xD7
          </button>
        `:""}
      </div>
    `}});var ne=f("flowx-toast",{observedAttributes:["variant","duration","fx-sse-connect","sse-event"],style:`
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
  `,setup:e=>{let t=e.getAttribute("duration"),o=t?Number(t):3e3,r=e.getAttribute("fx-sse-connect");if(r&&typeof window<"u"&&window.EventSource)try{let n=new EventSource(r),i=e.getAttribute("sse-event")||"toast";n.addEventListener(i,a=>{try{let s=typeof a.data=="string"&&a.data.startsWith("{")?JSON.parse(a.data):{message:a.data};P.show({message:s.message||s.title||a.data,variant:s.variant||"info",duration:s.duration||3500})}catch{}}),e._eventSource=n}catch{}r||setTimeout(()=>{let n=e.shadowRoot?.querySelector(".toast");n&&(n.classList.add("fade-out"),setTimeout(()=>{e.remove()},250))},o)},template:e=>`
      <div class="toast ${e.getAttribute("variant")||"info"}" role="status" aria-live="polite">
        <span class="indicator"></span>
        <div class="toast-body">
          <slot></slot>
        </div>
      </div>
    `}),P={show(e){if(typeof document>"u")return;let t=document.getElementById("flowx-toast-container");if(!t){t=document.createElement("div"),t.id="flowx-toast-container";let r=document.createElement("style");r.innerHTML=`
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
      `,document.head.appendChild(r),document.body.appendChild(t)}let o=document.createElement("flowx-toast");return e.variant&&o.setAttribute("variant",e.variant),e.duration&&o.setAttribute("duration",String(e.duration)),o.textContent=e.message,t.appendChild(o),o},connectSSE(e,t="toast"){if(typeof window>"u"||!window.EventSource)return;let o=new EventSource(e);return o.addEventListener(t,r=>{try{let n=typeof r.data=="string"&&r.data.startsWith("{")?JSON.parse(r.data):{message:r.data};P.show({message:n.message||n.title||r.data,variant:n.variant||"info",duration:n.duration||3500})}catch{}}),o}};typeof window<"u"&&(window.FlowXToast=P);var ae=f("flowx-progress",{observedAttributes:["value","max"],style:`
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
  `,template:e=>{let t=Number(e.getAttribute("value")||0),o=Number(e.getAttribute("max")||100),r=Math.min(Math.max(t/o*100,0),100);return`
      <div 
        class="progress-track"
        role="progressbar"
        aria-valuenow="${t}"
        aria-valuemin="0"
        aria-valuemax="${o}"
      >
        <div class="progress-bar" style="width: ${r}%"></div>
      </div>
    `}});var se=f("flowx-spinner",{observedAttributes:["size"],style:`
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
    `});var le=f("flowx-skeleton",{observedAttributes:["variant","width","height"],style:`
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
  `,template:e=>{let t=e.getAttribute("variant")||"text",o=e.getAttribute("width")||"100%",r=e.getAttribute("height")||(t==="circle"?"40px":t==="rect"?"100px":""),n=`width: ${o}; ${r?`height: ${r};`:""}`;return`
      <div 
        class="skeleton ${t}" 
        style="${n}"
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
  `,setup:e=>{let t=e.shadowRoot?.querySelector(".tooltip-panel"),o=null,r=null,n=()=>{r&&clearTimeout(r);let s=parseInt(e.getAttribute("delay")||"100",10);r=setTimeout(()=>{t&&(t.classList.add("visible"),o=y(e,t,{placement:e.getAttribute("placement")||"top",offset:8}))},s)},i=()=>{r&&clearTimeout(r),t&&t.classList.remove("visible"),o&&(o.cleanup(),o=null)};e.addEventListener("mouseenter",n),e.addEventListener("mouseleave",i),e.addEventListener("focusin",n),e.addEventListener("focusout",i);let a=`flowx-tooltip-${Math.random().toString(36).substr(2,9)}`;t?.setAttribute("id",a),t?.setAttribute("role","tooltip"),e.setAttribute("aria-describedby",a)},template:e=>`
      <slot></slot>
      <div class="tooltip-panel">${e.getAttribute("content")||""}</div>
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
  `,setup:e=>{let t=e.shadowRoot?.querySelector(".popover-panel"),o=e.shadowRoot?.querySelector('slot[name="trigger"]'),r=null,n=null,i=()=>{e.setAttribute("open","")},a=()=>{e.removeAttribute("open")},s=u=>{u.stopPropagation(),e.hasAttribute("open")?a():i()},l=()=>{let u=o?.assignedElements();if(u&&u.length>0){let p=u[0];p.removeEventListener("click",s),p.addEventListener("click",s)}};o?.addEventListener("slotchange",l),l();let d=()=>{if(e.hasAttribute("open")){if(t){t.classList.add("visible");let p=o?.assignedElements(),g=p&&p[0]||e;r=y(g,t,{placement:e.getAttribute("placement")||"bottom",offset:8}),n=E(e,a)}}else t&&t.classList.remove("visible"),r&&(r.cleanup(),r=null),n&&(n.cleanup(),n=null)};new MutationObserver(u=>{u.forEach(p=>{p.attributeName==="open"&&d()})}).observe(e,{attributes:!0}),d(),t?.setAttribute("role","dialog")},template:()=>`
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
  `,setup:e=>{e.setAttribute("role","menuitem"),e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1");let t=()=>{e.hasAttribute("disabled")||e.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{value:e.getAttribute("value")||e.textContent?.trim()}}))};e.addEventListener("click",t),e.addEventListener("keydown",o=>{(o.key===" "||o.key==="Enter")&&(o.preventDefault(),t())})},template:()=>'<div class="dropdown-item"><slot></slot></div>'});f("flowx-dropdown",{observedAttributes:["label","placement","open"],style:`
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
  `,setup:e=>{let t=e.shadowRoot?.querySelector(".trigger-btn"),o=e.shadowRoot?.querySelector(".dropdown-panel"),r=null,n=null,i=null,a=()=>{e.setAttribute("open","")},s=()=>{e.removeAttribute("open")},l=u=>{u.stopPropagation(),e.hasAttribute("open")?s():a()};t?.addEventListener("click",l);let d=()=>{if(e.hasAttribute("open")){if(o){o.classList.add("visible"),r=y(t,o,{placement:e.getAttribute("placement")||"bottom",offset:4}),n=E(e,s),i=k(e,"flowx-dropdown-item");let p=e.querySelector("flowx-dropdown-item");p&&p.focus()}}else o&&o.classList.remove("visible"),r&&(r.cleanup(),r=null),n&&(n.cleanup(),n=null),i&&(i.cleanup(),i=null)};new MutationObserver(u=>{u.forEach(p=>{p.attributeName==="open"&&d()})}).observe(e,{attributes:!0}),e.addEventListener("select",()=>{s(),t?.focus()}),d(),o?.setAttribute("role","menu")},template:e=>`
      <button class="trigger-btn" aria-haspopup="true">
        <span>${e.getAttribute("label")||"Dropdown"}</span>
        <span class="arrow">\u25BC</span>
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
  `,setup:e=>{let t=e.shadowRoot?.querySelector(".header-btn"),o=()=>{e.hasAttribute("open")?e.removeAttribute("open"):e.setAttribute("open",""),e.dispatchEvent(new CustomEvent("toggle",{bubbles:!0,composed:!0}))};t?.addEventListener("click",o),e.addEventListener("focus",()=>{t?.focus()});let r=()=>{let i=e.hasAttribute("open");t?.setAttribute("aria-expanded",i?"true":"false")};new MutationObserver(()=>r()).observe(e,{attributes:!0,attributeFilter:["open"]}),r()},template:e=>`
      <button class="header-btn" tabindex="-1">
        <span>${e.getAttribute("header")||"Accordion Item"}</span>
        <span class="arrow">\u25B6</span>
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
  `,setup:e=>{let t=null,o=n=>{let i=n.target;if(i.tagName.toLowerCase()!=="flowx-accordion-item")return;!e.hasAttribute("multi")&&i.hasAttribute("open")&&Array.from(e.querySelectorAll("flowx-accordion-item")).forEach(l=>{l!==i&&l.removeAttribute("open")})};e.addEventListener("toggle",o),t=k(e,"flowx-accordion-item"),new MutationObserver(()=>{t&&t.update()}).observe(e,{childList:!0})},template:()=>"<slot></slot>"});f("flowx-tab",{observedAttributes:["value","selected"],style:`
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
  `,setup:e=>{e.setAttribute("role","tab"),e.hasAttribute("tabindex")||e.setAttribute("tabindex","-1");let t=()=>{e.dispatchEvent(new CustomEvent("tab-select",{bubbles:!0,composed:!0,detail:{value:e.getAttribute("value")}}))};e.addEventListener("click",t),e.addEventListener("keydown",n=>{(n.key===" "||n.key==="Enter")&&(n.preventDefault(),t())}),e.addEventListener("focus",()=>{e.shadowRoot?.querySelector(".tab-btn")?.focus()});let o=()=>{let n=e.hasAttribute("selected");e.setAttribute("aria-selected",n?"true":"false")};new MutationObserver(()=>o()).observe(e,{attributes:!0,attributeFilter:["selected"]}),o()},template:()=>'<button class="tab-btn" tabindex="-1"><slot></slot></button>'});f("flowx-tab-list",{observedAttributes:[],style:`
    :host {
      display: flex;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      gap: var(--flowx-spacing-sm);
    }
  `,setup:e=>{e.setAttribute("role","tablist");let t=k(e,"flowx-tab");new MutationObserver(()=>{t&&t.update()}).observe(e,{childList:!0})},template:()=>"<slot></slot>"});f("flowx-tab-panel",{observedAttributes:["value","visible"],style:`
    :host {
      display: none;
      padding: var(--flowx-spacing-md) 0;
      font-family: var(--flowx-font-family);
      color: #e6edf3;
    }
    :host([visible]) {
      display: block;
    }
  `,setup:e=>{e.setAttribute("role","tabpanel")},template:()=>"<slot></slot>"});f("flowx-tabs",{observedAttributes:["value"],style:`
    :host {
      display: block;
      background: #0d1117;
      border-radius: var(--flowx-radius-md);
      padding: var(--flowx-spacing-md);
    }
  `,setup:e=>{let t=()=>{let r=e.getAttribute("value"),n=e,i=Array.from(n.querySelectorAll("flowx-tab")),a=Array.from(n.querySelectorAll("flowx-tab-panel"));i.forEach(s=>{let l=s.getAttribute("value");l===r?(s.setAttribute("selected",""),s.setAttribute("tabindex","0")):(s.removeAttribute("selected"),s.setAttribute("tabindex","-1"));let c=s.getAttribute("id")||`flowx-tab-${l}`,u=`flowx-panel-${l}`;s.setAttribute("id",c),s.setAttribute("aria-controls",u)}),a.forEach(s=>{let l=s.getAttribute("value");l===r?s.setAttribute("visible",""):s.removeAttribute("visible");let c=`flowx-tab-${l}`,u=s.getAttribute("id")||`flowx-panel-${l}`;s.setAttribute("id",u),s.setAttribute("aria-labelledby",c)})};e.addEventListener("tab-select",r=>{let n=r.detail.value;e.setAttribute("value",n)}),new MutationObserver(()=>t()).observe(e,{childList:!0,attributes:!0,attributeFilter:["value"]}),t()},template:()=>"<slot></slot>"});f("flowx-breadcrumb",{observedAttributes:["separator"],style:`
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
  `,setup:e=>{let t=e.shadowRoot;e.setAttribute("role","navigation"),e.setAttribute("aria-label","Breadcrumb");let o=()=>{let i=Array.from(e.children).filter(l=>!l.getAttribute("slot")?.startsWith("item-")),a=e.getAttribute("separator")||"/",s='<ol class="breadcrumb">';if(i.forEach((l,d)=>{let c=`item-${d}`;l.setAttribute("slot",c),d===i.length-1?l.setAttribute("aria-current","page"):l.removeAttribute("aria-current"),s+=`<li class="breadcrumb-item"><slot name="${c}"></slot></li>`,d<i.length-1&&(s+=`<li class="separator" aria-hidden="true">${a}</li>`)}),s+="</ol>",t){let l=t.querySelector(".breadcrumb-container nav");l&&(l.innerHTML=s)}};new MutationObserver(()=>{o()}).observe(e,{childList:!0}),o()},template:()=>`
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
  `,setup:e=>{let t=n=>{let i=parseInt(e.getAttribute("total-pages")||"1",10);n<1||n>i||(e.setAttribute("current-page",String(n)),e.dispatchEvent(new CustomEvent("fx-page-change",{bubbles:!0,composed:!0,detail:{page:n}})),e.render(),o())},o=()=>{e.shadowRoot?.querySelectorAll(".page-btn")?.forEach(i=>{i.addEventListener("click",()=>{let a=parseInt(i.getAttribute("data-page")||"1",10);t(a)})})};new MutationObserver(()=>{o()}).observe(e,{attributes:!0}),o(),e.changePage=t},template:e=>{let t=parseInt(e.getAttribute("current-page")||"1",10),o=parseInt(e.getAttribute("total-pages")||"1",10),r=[];if(o<=7)for(let i=1;i<=o;i++)r.push(i);else t<=4?r.push(1,2,3,4,5,"...",o):t>=o-3?r.push(1,"...",o-4,o-3,o-2,o-1,o):r.push(1,"...",t-1,t,t+1,"...",o);let n='<div class="pagination-container">';return n+=`<button class="page-btn prev" data-page="${t-1}" ${t===1?"disabled":""} aria-label="Go to previous page">\u27E8</button>`,r.forEach(i=>{i==="..."?n+='<span class="ellipsis" aria-hidden="true">...</span>':n+=`<button class="page-btn ${i===t?"active":""}" data-page="${i}" aria-label="Go to page ${i}" aria-current="${i===t?"page":"false"}">${i}</button>`}),n+=`<button class="page-btn next" data-page="${t+1}" ${t===o?"disabled":""} aria-label="Go to next page">\u27E9</button>`,n+="</div>",n}});f("flowx-stepper",{observedAttributes:["current","orientation"],style:`
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
  `,setup:()=>{},template:e=>{let t=parseInt(e.getAttribute("current")||"0",10),o=e.getAttribute("orientation")||"horizontal",r=e.hasAttribute("clickable");if(Array.from(e.querySelectorAll("[data-step]")).length===0){let i=e.getAttribute("data-steps")||"",a=i?i.split(",").map(l=>l.trim()):["Step 1","Step 2","Step 3"],s='<div class="stepper">';return a.forEach((l,d)=>{let c=d<t;s+=`<div class="step ${c?"completed":d===t?"current":""} ${r?"clickable":""}" data-index="${d}" role="listitem">`,s+=`<div class="step-indicator">${c?"\u2713":d+1}</div>`,s+=`<div class="step-label">${l}</div>`,s+="</div>",d<a.length-1&&o!=="vertical"&&(s+=`<div class="connector ${c?"filled":""}"></div>`)}),s+="</div>",s}return'<div class="stepper" role="list"><slot></slot></div>'}});f("flowx-timeline",{observedAttributes:["align"],style:`
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
  `,setup:()=>{},template:e=>{let t=e.getAttribute("time")||"",o=e.getAttribute("title")||"";return`
      ${t?`<div class="timeline-time">${t}</div>`:""}
      <div class="timeline-content">
        ${o?`<h4 class="timeline-title">${o}</h4>`:""}
        <div class="timeline-body"><slot></slot></div>
      </div>
    `}});var O=`
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
`,M=`
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
`,de=["required","disabled","name","value","label","hint","invalid"];function A(e,t){let o=[...new Set([...de,...t.observedAttributes||[]])];class r extends HTMLElement{static formAssociated=!0;static get observedAttributes(){return o}internals;_initialized=!1;constructor(){super(),this.attachShadow({mode:"open"});try{this.internals=this.attachInternals()}catch{this.internals={setFormValue:()=>{},setValidity:()=>{},checkValidity:()=>!0,reportValidity:()=>!0,get validationMessage(){return""},get form(){return null},get validity(){return{valid:!0}}}}}connectedCallback(){this._initialized||(this.render(),t.setup&&t.setup(this,this.internals),this._syncValidity(),this._initialized=!0)}attributeChangedCallback(i,a,s){a!==s&&this._initialized&&(this.render(),this._syncValidity(),t.setup&&t.setup(this,this.internals))}render(){if(!this.shadowRoot)return;let i=`<style>${h}${O}${t.style||""}</style>`;this.shadowRoot.innerHTML=`${i}${t.template(this)}`}setFormValue(i){try{this.internals.setFormValue(i)}catch{}}setValidity(i,a,s){try{s?this.internals.setValidity(i,a,s):this.internals.setValidity(i,a)}catch{}}markValid(){try{this.internals.setValidity({})}catch{}}get form(){return this.internals.form}get validity(){return this.internals.validity}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.internals.checkValidity()}reportValidity(){return this.internals.reportValidity()}_syncValidity(){let i=this.hasAttribute("required"),a=this.getAttribute("value")||"",s=this._currentValue??a;if(i&&!s){let l=this.getAttribute("label")||this.getAttribute("name")||"This field";this.setValidity({valueMissing:!0},`${l} is required`),this.setAttribute("invalid","")}else this.markValid(),this.removeAttribute("invalid");if(this.hasAttribute("disabled"))try{this.internals.setFormValue(null)}catch{}}}return o.forEach(n=>{let i=n.replace(/-([a-z])/g,(a,s)=>s.toUpperCase());Object.getOwnPropertyDescriptor(r.prototype,i)||Object.defineProperty(r.prototype,i,{get(){let a=this.getAttribute(n);return a===""?!0:a===null?!1:a},set(a){a===null||a===!1?this.removeAttribute(n):a===!0?this.setAttribute(n,""):this.setAttribute(n,String(a))},configurable:!0})}),customElements.get(e)||customElements.define(e,r),r}function ce(e){let t={},o=Array.from(e.elements);for(let r of o){let n=r.name;if(!n)continue;if(r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement||r instanceof HTMLSelectElement){r.validity.valid||(t[n]=r.validationMessage);continue}let i=r.getAttribute("value")||r._currentValue||"",a=r.getAttribute("label")||n;if(r.hasAttribute("required")&&!i){t[n]=`${a} is required`;continue}let s=r.getAttribute("pattern");if(s&&i)try{if(!new RegExp(`^(?:${s})$`).test(i)){t[n]=r.getAttribute("title")||`${a} is invalid`;continue}}catch{}let l=r.getAttribute("minlength");if(l&&i.length<parseInt(l,10)){t[n]=`${a} must be at least ${l} characters`;continue}let d=r.getAttribute("maxlength");if(d&&i.length>parseInt(d,10)){t[n]=`${a} must be at most ${d} characters`;continue}let c=r.getAttribute("min");if(c&&!isNaN(Number(i))&&Number(i)<Number(c)){t[n]=`${a} must be at least ${c}`;continue}let u=r.getAttribute("max");if(u&&!isNaN(Number(i))&&Number(i)>Number(u)){t[n]=`${a} must be at most ${u}`;continue}}return{valid:Object.keys(t).length===0,errors:t}}function N(e,t){let o=Array.isArray(t)?Object.fromEntries(t.map(r=>[r.field,r.message])):t;e.querySelectorAll("flowx-form-error").forEach(r=>{r.textContent="",r.removeAttribute("visible")});for(let[r,n]of Object.entries(o)){let i=e.querySelector(`flowx-form-error[for="${r}"]`);i&&(i.textContent=n,i.setAttribute("visible",""));let a=e.querySelector(`[name="${r}"]`);a&&a.setAttribute("invalid","")}}async function pe(e,t){let o=e.headers.get("fx-validation-errors");if(!o)return!1;try{let r=JSON.parse(o);return N(t,r),!0}catch{return!1}}A("flowx-input",{observedAttributes:["type","placeholder","pattern","minlength","maxlength","autocomplete","readonly"],style:`${M}
    .wrapper { position: relative; }
    input[type="password"] { letter-spacing: 0.1em; }
  `,template:e=>{let t=e.getAttribute("label")||"",o=e.getAttribute("hint")||"",r=e.getAttribute("type")||"text",n=e.getAttribute("placeholder")||"",i=e.getAttribute("value")||"",a=e.getAttribute("name")||"",s=e.hasAttribute("required")?"required":"",l=e.hasAttribute("disabled")?"disabled":"",d=e.hasAttribute("readonly")?"readonly":"",c=e.getAttribute("pattern")?`pattern="${e.getAttribute("pattern")}"`:"",u=e.getAttribute("minlength")?`minlength="${e.getAttribute("minlength")}"`:"",p=e.getAttribute("maxlength")?`maxlength="${e.getAttribute("maxlength")}"`:"",g=e.getAttribute("autocomplete")||"off";return`
      ${t?`<label for="inner">${t}${s?' <span aria-hidden="true" style="color:var(--flowx-error)">*</span>':""}</label>`:""}
      <div class="wrapper">
        <input
          id="inner"
          type="${r}"
          name="${a}"
          value="${i}"
          placeholder="${n}"
          autocomplete="${g}"
          ${s} ${l} ${d} ${c} ${u} ${p}
          aria-required="${!!s}"
          aria-label="${t||a}"
        />
      </div>
      ${o?`<div class="field-hint">${o}</div>`:""}
    `},setup:(e,t)=>{let o=e.shadowRoot?.querySelector("input");if(!o)return;t.setFormValue(o.value||e.getAttribute("value")||""),e._currentValue=o.value;let r=()=>{if(e._currentValue=o.value,t.setFormValue(o.value),o.validity.valid){try{t.setValidity({})}catch{}e.removeAttribute("invalid")}else{try{t.setValidity(o.validity,o.validationMessage,o)}catch{}e.setAttribute("invalid","")}};o.addEventListener("input",r),o.addEventListener("change",r),o.addEventListener("blur",r)}});A("flowx-textarea",{observedAttributes:["rows","cols","placeholder","minlength","maxlength","resize","readonly"],style:`${M}
    textarea {
      resize: var(--fx-textarea-resize, vertical);
      min-height: 80px;
    }
    :host([resize="none"]) textarea { resize: none; }
    :host([resize="horizontal"]) textarea { resize: horizontal; }
    :host([resize="both"]) textarea { resize: both; }
  `,template:e=>{let t=e.getAttribute("label")||"",o=e.getAttribute("hint")||"",r=e.getAttribute("name")||"",n=e.getAttribute("placeholder")||"",i=e.getAttribute("value")||"",a=e.getAttribute("rows")||"4",s=e.hasAttribute("required")?"required":"",l=e.hasAttribute("disabled")?"disabled":"",d=e.hasAttribute("readonly")?"readonly":"",c=e.getAttribute("minlength")?`minlength="${e.getAttribute("minlength")}"`:"",u=e.getAttribute("maxlength")?`maxlength="${e.getAttribute("maxlength")}"`:"";return`
      ${t?`<label for="inner">${t}${s?' <span aria-hidden="true" style="color:var(--flowx-error)">*</span>':""}</label>`:""}
      <textarea
        id="inner"
        name="${r}"
        rows="${a}"
        placeholder="${n}"
        ${s} ${l} ${d} ${c} ${u}
        aria-required="${!!s}"
        aria-label="${t||r}"
      >${i}</textarea>
      ${o?`<div class="field-hint">${o}</div>`:""}
    `},setup:(e,t)=>{let o=e.shadowRoot?.querySelector("textarea");if(!o)return;t.setFormValue(o.value),e._currentValue=o.value;let r=()=>{if(e._currentValue=o.value,t.setFormValue(o.value),o.validity.valid){try{t.setValidity({})}catch{}e.removeAttribute("invalid")}else{try{t.setValidity(o.validity,o.validationMessage,o)}catch{}e.setAttribute("invalid","")}};o.addEventListener("input",r),o.addEventListener("blur",r)}});A("flowx-checkbox",{observedAttributes:["checked","value"],style:`
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
  `,template:e=>{let t=e.getAttribute("label")||"";return`
      <div class="box" role="checkbox"
        aria-checked="${e.hasAttribute("checked")}"
        aria-required="${e.hasAttribute("required")}"
        tabindex="${e.hasAttribute("disabled")?"-1":"0"}"
      >
        <span class="checkmark">\u2713</span>
      </div>
      ${t?`<span class="label-text">${t}</span>`:"<slot></slot>"}
    `},setup:(e,t)=>{let o=e.shadowRoot?.querySelector(".box");if(!o)return;let r=()=>{let i=e.hasAttribute("checked"),a=e.getAttribute("value")||"on";if(t.setFormValue(i?a:null),e._currentValue=i?a:"",o.setAttribute("aria-checked",String(i)),e.hasAttribute("required")&&!i){try{t.setValidity({valueMissing:!0},`${e.getAttribute("label")||e.getAttribute("name")||"This field"} is required`)}catch{}e.setAttribute("invalid","")}else{try{t.setValidity({})}catch{}e.removeAttribute("invalid")}};r();let n=()=>{e.hasAttribute("disabled")||(e.toggleAttribute("checked"),r(),e.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:e.hasAttribute("checked")}})))};e.addEventListener("click",n),e.addEventListener("keydown",i=>{let a=i;(a.key===" "||a.key==="Enter")&&(a.preventDefault(),n())})}});A("flowx-switch",{observedAttributes:["checked"],style:`
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
  `,template:e=>{let t=e.getAttribute("label")||"";return`
      <div class="track" role="switch"
        id="${`sw-${Math.random().toString(36).slice(2,7)}`}"
        aria-checked="${e.hasAttribute("checked")}"
        aria-required="${e.hasAttribute("required")}"
        tabindex="${e.hasAttribute("disabled")?"-1":"0"}"
      >
        <div class="thumb"></div>
      </div>
      ${t?`<span class="label-text">${t}</span>`:"<slot></slot>"}
    `},setup:(e,t)=>{let o=e.shadowRoot?.querySelector(".track");if(!o)return;let r=()=>{let i=e.hasAttribute("checked");t.setFormValue(i?e.getAttribute("value")||"on":null),e._currentValue=i?e.getAttribute("value")||"on":"",o.setAttribute("aria-checked",String(i))};r();let n=()=>{e.hasAttribute("disabled")||(e.toggleAttribute("checked"),r(),e.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:e.hasAttribute("checked")}})))};e.addEventListener("click",n),e.addEventListener("keydown",i=>{let a=i;(a.key===" "||a.key==="Enter")&&(a.preventDefault(),n())})}});A("flowx-radio",{observedAttributes:["checked","value"],style:`
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
  `,template:e=>{let t=e.getAttribute("label")||"";return`
      <div class="ring" role="radio"
        aria-checked="${e.hasAttribute("checked")}"
        tabindex="${e.hasAttribute("disabled")?"-1":e.hasAttribute("checked")?"0":"-1"}"
      >
        <div class="dot"></div>
      </div>
      ${t?`<span class="label-text">${t}</span>`:"<slot></slot>"}
    `},setup:(e,t)=>{let o=e.shadowRoot?.querySelector(".ring");if(!o)return;let r=()=>{let i=e.hasAttribute("checked"),a=e.getAttribute("value")||"on";t.setFormValue(i?a:null),e._currentValue=i?a:"",o.setAttribute("aria-checked",String(i))};r();let n=()=>{if(e.hasAttribute("disabled"))return;let i=e.getAttribute("name");i&&e.getRootNode().querySelectorAll(`flowx-radio[name="${i}"]`).forEach(s=>{s!==e&&(s.removeAttribute("checked"),s.setAttribute("tabindex","-1"))}),e.setAttribute("checked",""),e.setAttribute("tabindex","0"),r(),e.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e.getAttribute("value")}}))};e.addEventListener("click",n),e.addEventListener("keydown",i=>{let a=i;(a.key===" "||a.key==="Enter")&&(a.preventDefault(),n())})}});A("flowx-select",{observedAttributes:["placeholder"],style:`${M}
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
  `,template:e=>{let t=e.getAttribute("label")||"",o=e.getAttribute("hint")||"",r=e.hasAttribute("required"),n=e._currentValue||e.getAttribute("value")||"",a=Array.from(e.children).filter(c=>c.tagName.toLowerCase()==="option"),s=a.find(c=>c.value===n),l=s?s.textContent?.trim():e.getAttribute("placeholder")||a[0]?.textContent?.trim()||"Select\u2026",d=a.map(c=>`
      <div class="option" role="option" tabindex="0"
        data-value="${c.value}"
        aria-selected="${c.value===n}">
        ${c.textContent?.trim()}
      </div>
    `).join("");return`
      ${t?`<label>${t}${r?' <span aria-hidden="true" style="color:var(--flowx-error)">*</span>':""}</label>`:""}
      <div class="trigger" role="combobox" tabindex="0"
        aria-haspopup="listbox"
        aria-expanded="${e.hasAttribute("open")}"
        aria-required="${r}"
      >
        <span class="${n?"":"placeholder-text"}">${l}</span>
        <span class="chevron">\u25BE</span>
      </div>
      <div class="dropdown" role="listbox">
        ${d}
      </div>
      ${o?`<div class="field-hint">${o}</div>`:""}
    `},setup:(e,t)=>{let o=e.shadowRoot;if(!o)return;let r=o.querySelector(".trigger"),n=o.querySelector(".dropdown");if(!r||!n)return;let i=e._currentValue||e.getAttribute("value")||"";t.setFormValue(i||null);let a=(l,d)=>{if(e._currentValue=l,t.setFormValue(l||null),e.setAttribute("value",l),e.removeAttribute("open"),e.render(),e.hasAttribute("required")&&!l){try{t.setValidity({valueMissing:!0},`${e.getAttribute("label")||e.getAttribute("name")} is required`)}catch{}e.setAttribute("invalid","")}else{try{t.setValidity({})}catch{}e.removeAttribute("invalid")}e.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:l,label:d}}))};(()=>{let l=o.querySelector(".trigger"),d=o.querySelector(".dropdown");!l||!d||(l.addEventListener("click",()=>{e.hasAttribute("disabled")||e.toggleAttribute("open")}),l.addEventListener("keydown",c=>{let u=c;if((u.key===" "||u.key==="Enter")&&(u.preventDefault(),e.toggleAttribute("open")),u.key==="Escape"&&e.removeAttribute("open"),u.key==="ArrowDown"){let p=d.querySelector(".option");p&&(e.setAttribute("open",""),p.focus()),u.preventDefault()}}),d.querySelectorAll(".option").forEach(c=>{c.addEventListener("click",()=>a(c.dataset.value||"",c.textContent?.trim()||"")),c.addEventListener("keydown",u=>{let p=u;(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),a(c.dataset.value||"",c.textContent?.trim()||"")),p.key==="ArrowDown"&&(c.nextElementSibling?.focus(),p.preventDefault()),p.key==="ArrowUp"&&(c.previousElementSibling?.focus(),p.preventDefault()),p.key==="Escape"&&(e.removeAttribute("open"),l.focus())})}),document.addEventListener("click",c=>{c.composedPath().includes(e)||e.removeAttribute("open")},{capture:!0}))})()}});A("flowx-slider",{observedAttributes:["min","max","step","value"],style:`
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
  `,template:e=>{let t=e.getAttribute("label")||"",o=e.getAttribute("min")||"0",r=e.getAttribute("max")||"100",n=e.getAttribute("step")||"1",i=e._currentValue??e.getAttribute("value")??"50",a=e.hasAttribute("disabled")?"disabled":"";return`
      ${t?`<label>${t}</label>`:""}
      <div class="slider-wrapper">
        <input type="range" id="inner"
          min="${o}" max="${r}" step="${n}" value="${i}"
          ${a}
          aria-label="${t||e.getAttribute("name")||"Slider"}"
          aria-valuemin="${o}" aria-valuemax="${r}" aria-valuenow="${i}"
        />
        <span class="value-badge">${i}</span>
      </div>
    `},setup:(e,t)=>{let o=e.shadowRoot?.querySelector('input[type="range"]'),r=e.shadowRoot?.querySelector(".value-badge");o&&(t.setFormValue(o.value),e._currentValue=o.value,o.addEventListener("input",()=>{e._currentValue=o.value,t.setFormValue(o.value),o.setAttribute("aria-valuenow",o.value),r&&(r.textContent=o.value)}),o.addEventListener("change",()=>{e.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:o.value}}))}))}});A("flowx-rating",{observedAttributes:["max","value","readonly"],style:`
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
  `,template:e=>{let t=e.getAttribute("label")||"",o=parseInt(e.getAttribute("max")||"5",10),r=parseInt(e._currentValue??e.getAttribute("value")??"0",10),n=e.hasAttribute("readonly"),i=Array.from({length:o},(a,s)=>`
      <span class="star ${s<r?"filled":""}"
        role="radio"
        aria-label="${s+1} star${s===0?"":"s"}"
        aria-checked="${s<r}"
        data-value="${s+1}"
        tabindex="${n?"-1":s===(r-1||0)?"0":"-1"}"
      >\u2605</span>
    `).join("");return`
      ${t?`<label>${t}</label>`:""}
      <div class="stars" role="radiogroup" aria-label="${t||"Rating"}">
        ${i}
      </div>
    `},setup:(e,t)=>{let o=e.shadowRoot;if(!o)return;let r=a=>{if(e._currentValue=String(a),t.setFormValue(String(a)),e.hasAttribute("required")&&a===0){try{t.setValidity({valueMissing:!0},"Please select a rating")}catch{}e.setAttribute("invalid","")}else{try{t.setValidity({})}catch{}e.removeAttribute("invalid")}e.render(),n()},n=()=>{o.querySelectorAll(".star").forEach(a=>{a.addEventListener("click",()=>r(parseInt(a.dataset.value||"0",10))),a.addEventListener("keydown",s=>{let l=s,d=parseInt(a.dataset.value||"0",10);(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),r(d)),(l.key==="ArrowRight"||l.key==="ArrowUp")&&(l.preventDefault(),r(Math.min(d+1,parseInt(e.getAttribute("max")||"5",10)))),(l.key==="ArrowLeft"||l.key==="ArrowDown")&&(l.preventDefault(),r(Math.max(d-1,1)))})})},i=parseInt(e.getAttribute("value")||"0",10);t.setFormValue(String(i)),e._currentValue=String(i),n()}});A("flowx-otp-input",{observedAttributes:["length"],style:`
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
  `,template:e=>{let t=e.getAttribute("label")||"",o=e.getAttribute("hint")||"",r=parseInt(e.getAttribute("length")||"6",10),n=(e._currentValue||"").split(""),i=Array.from({length:r},(a,s)=>`
      <input class="otp-cell" type="text" inputmode="numeric" pattern="[0-9]"
        maxlength="1" autocomplete="one-time-code"
        data-index="${s}"
        value="${n[s]||""}"
        aria-label="Digit ${s+1} of ${r}"
      />
    `).join("");return`
      ${t?`<label>${t}</label>`:""}
      <div class="otp-row" role="group" aria-label="${t||"OTP Input"}">
        ${i}
      </div>
      ${o?`<div class="hint">${o}</div>`:""}
    `},setup:(e,t)=>{let r=e.shadowRoot;if(!r)return;(()=>{let i=Array.from(r.querySelectorAll(".otp-cell"));if(!i.length)return;let a=()=>i.map(l=>l.value).join(""),s=()=>{let l=a();e._currentValue=l,t.setFormValue(l||null);let d=e.hasAttribute("required"),c=parseInt(e.getAttribute("length")||"6",10);if(d&&l.length<c){try{t.setValidity({valueMissing:!0},"Please complete the OTP")}catch{}e.setAttribute("invalid","")}else{try{t.setValidity({})}catch{}e.removeAttribute("invalid")}l.length===c&&e.dispatchEvent(new CustomEvent("fx-otp-complete",{bubbles:!0,composed:!0,detail:{value:l}}))};i.forEach((l,d)=>{l.addEventListener("input",c=>{if(c.inputType==="insertFromPaste"){let p=l.value;if(p.length>1){let g=p.replace(/\D/g,"").split("");i.slice(d).forEach((b,m)=>{b.value=g[m]||""}),i[Math.min(d+g.length,i.length-1)]?.focus(),s();return}}l.value=l.value.replace(/\D/g,"").slice(-1),l.value&&d<i.length-1&&i[d+1].focus(),s()}),l.addEventListener("keydown",c=>{let u=c;u.key==="Backspace"&&!l.value&&d>0&&(i[d-1].focus(),i[d-1].value="",s()),u.key==="ArrowLeft"&&d>0&&i[d-1].focus(),u.key==="ArrowRight"&&d<i.length-1&&i[d+1].focus()}),l.addEventListener("focus",()=>l.select())})})()}});A("flowx-autocomplete",{observedAttributes:["options","placeholder","minchars"],style:`${M}
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
  `,template:e=>{let t=e.getAttribute("label")||"",o=e.getAttribute("hint")||"",r=e.getAttribute("placeholder")||"Search\u2026",n=e.getAttribute("name")||"",i=e.hasAttribute("required"),a=e.hasAttribute("disabled")?"disabled":"",s=e._displayValue||e._currentValue||e.getAttribute("value")||"";return`
      ${t?`<label for="ac-input">${t}${i?' <span aria-hidden="true" style="color:var(--flowx-error)">*</span>':""}</label>`:""}
      <div class="input-wrapper">
        <input
          id="ac-input"
          type="text"
          name="${n}"
          value="${s}"
          placeholder="${r}"
          autocomplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-required="${i}"
          ${a}
        />
        <button class="clear-btn ${s?"visible":""}" type="button" aria-label="Clear">\u2715</button>
      </div>
      <div class="listbox" role="listbox" aria-label="${t||n}"></div>
      ${o?`<div class="field-hint">${o}</div>`:""}
    `},setup:(e,t)=>{let r=e.shadowRoot;if(!r)return;let n=r.querySelector("#ac-input"),i=r.querySelector(".listbox"),a=r.querySelector(".clear-btn");if(!n||!i)return;let s=()=>{let x=e.getAttribute("options")||"";if(!x)return[];try{return JSON.parse(x).map(w=>typeof w=="string"?{label:w,value:w}:w)}catch{return x.split(",").map(v=>({label:v.trim(),value:v.trim()}))}},l=null,d=null,c=null,u=x=>{i.innerHTML=x.length?x.map(w=>`<div class="option" role="option" tabindex="0" data-value="${w.value}" aria-selected="false">${w.label}</div>`).join(""):'<div class="no-results">No results</div>',i.classList.add("open"),n.setAttribute("aria-expanded","true"),l&&l.cleanup(),l=y(n,i,{placement:"bottom",align:"start",offset:4}),d&&d(),d=k(i,".option").cleanup,i.querySelectorAll(".option").forEach(w=>{w.addEventListener("click",()=>g(w.dataset.value||"",w.textContent||"")),w.addEventListener("keydown",F=>{let $=F;($.key==="Enter"||$.key===" ")&&($.preventDefault(),g(w.dataset.value||"",w.textContent||"")),$.key==="Escape"&&(p(),n.focus()),$.key==="Tab"&&p()})}),c&&c.cleanup(),c=E(e,p)},p=()=>{i.classList.remove("open"),n.setAttribute("aria-expanded","false"),l&&(l.cleanup(),l=null),d&&(d(),d=null),c&&(c.cleanup(),c=null)},g=(x,v)=>{if(e._currentValue=x,e._displayValue=v.trim(),t.setFormValue(x),n.value=v.trim(),a&&a.classList.add("visible"),p(),e.hasAttribute("required")&&!x){try{t.setValidity({valueMissing:!0},"Please select an option")}catch{}e.setAttribute("invalid","")}else{try{t.setValidity({})}catch{}e.removeAttribute("invalid")}e.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:x,label:v.trim()}}))},b=parseInt(e.getAttribute("minchars")||"0",10);n.addEventListener("input",()=>{let x=n.value.toLowerCase();if(a&&a.classList.toggle("visible",n.value.length>0),x.length<b){p();return}let v=s().filter(w=>w.label.toLowerCase().includes(x));v.length>0||x.length>0?u(v):p()}),n.addEventListener("keydown",x=>{let v=x;if(v.key==="Escape"&&p(),v.key==="ArrowDown"){let w=i.querySelector(".option");w?(v.preventDefault(),w.focus()):(v.preventDefault(),u(s()),i.querySelector(".option")?.focus())}}),a?.addEventListener("click",()=>{n.value="",e._currentValue="",e._displayValue="",t.setFormValue(null),a.classList.remove("visible"),p(),n.focus()});let m=e.getAttribute("value")||"";m&&t.setFormValue(m)}});var V=class extends HTMLElement{static get observedAttributes(){return["for","visible"]}connectedCallback(){this._render()}attributeChangedCallback(){this._render()}_render(){this.shadowRoot||this.attachShadow({mode:"open"}),this.shadowRoot&&(this.shadowRoot.innerHTML=`
        <style>
          ${h}${O}
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
          <span>\u26A0</span>
          <slot></slot>
        </div>
      `)}};customElements.get("flowx-form-error")||customElements.define("flowx-form-error",V);var j=class extends HTMLElement{connectedCallback(){this._init()}_init(){let t=this.querySelector("form")||this;this.addEventListener("fx:afterSwap",o=>{let n=o.detail?.xhr;n&&this._handleValidationResponse(n)}),t instanceof HTMLFormElement&&t.addEventListener("submit",()=>{this.querySelectorAll("flowx-form-error").forEach(o=>{o.textContent="",o.removeAttribute("visible")}),this.querySelectorAll("[invalid]").forEach(o=>{o.removeAttribute("invalid")})})}async _handleValidationResponse(t){let o=t.headers.get("fx-validation-errors");if(o)try{let r=JSON.parse(o);N(this,r)}catch{}}};customElements.get("flowx-form")||customElements.define("flowx-form",j);var _t=[],qt=null,Ft=!1;function L(e,t){_t.push({selector:e,enhancerFn:t}),typeof document<"u"&&(I(document),ue())}function I(e=document){for(let t of _t){let o=`${t.selector}:not([data-flowx-enhanced])`,r=Array.from(e.querySelectorAll(o));for(let n of r){n.setAttribute("data-flowx-enhanced","true");let i=document.createElement("div");i.className="flowx-enhanced-input-wrapper",i.style.display="inline-block",i.style.position="relative",n.style.position="absolute",n.style.opacity="0",n.style.pointerEvents="none",n.style.width="0",n.style.height="0",n.style.margin="0",n.style.padding="0",n.style.border="none",n.parentNode?.insertBefore(i,n),i.appendChild(n);try{t.enhancerFn(n,i)}catch(a){console.error(`FlowX UI: Failed to enhance element ${t.selector}`,a)}}}}function ue(){Ft||typeof window>"u"||(Ft=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>I(document)):I(document),qt=new MutationObserver(e=>{let t=!1;for(let o of e)if(o.addedNodes.length>0){t=!0;break}t&&I(document)}),qt.observe(document.body||document.documentElement,{childList:!0,subtree:!0}))}function S(e,t){if(e.value===t)return;let o=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value")?.set;o?o.call(e,t):e.value=t,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0}))}function T(e,t){let o=()=>t(e.value);e.addEventListener("input",o),e.addEventListener("change",o);let r=new MutationObserver(()=>{t(e.value)});return r.observe(e,{attributes:!0,attributeFilter:["value"]}),()=>{e.removeEventListener("input",o),e.removeEventListener("change",o),r.disconnect()}}var B=class extends HTMLElement{static get observedAttributes(){return["value","min","max","disabled"]}nativeInput=null;currentMonth=new Date().getMonth();currentYear=new Date().getFullYear();selectedDate=null;positionerCleanup=null;outsideCleanup=null;constructor(){super(),this.attachShadow({mode:"open"})}attachToInput(t){if(this.nativeInput=t,t.value){let o=new Date(t.value+"T00:00:00");isNaN(o.getTime())||(this.selectedDate=o,this.currentMonth=o.getMonth(),this.currentYear=o.getFullYear())}T(t,o=>{if(o){let r=new Date(o+"T00:00:00");isNaN(r.getTime())||(this.selectedDate=r,this.currentMonth=r.getMonth(),this.currentYear=r.getFullYear(),this.render())}}),this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupPopover()}attributeChangedCallback(){this.render()}cleanupPopover(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=null),this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null)}formatDate(t){let o=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${o}-${r}-${n}`}formatDisplayDate(t){return t?t.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}):"Select date\u2026"}selectDate(t){this.selectedDate=t;let o=this.formatDate(t);this.nativeInput&&S(this.nativeInput,o),this.setAttribute("value",o),this.closePopover(),this.render()}openPopover(){if(this.hasAttribute("disabled"))return;this.setAttribute("open",""),this.render();let t=this.shadowRoot?.querySelector(".trigger"),o=this.shadowRoot?.querySelector(".popover");if(t&&o){let r=y(t,o,{placement:"bottom",align:"start",offset:4});this.positionerCleanup=r.cleanup;let n=E(this,()=>this.closePopover());this.outsideCleanup=n.cleanup,this.shadowRoot?.querySelector(".day.selected, .day.today, .day")?.focus()}}closePopover(){this.removeAttribute("open"),this.cleanupPopover(),this.render()}prevMonth(){this.currentMonth===0?(this.currentMonth=11,this.currentYear--):this.currentMonth--,this.render()}nextMonth(){this.currentMonth===11?(this.currentMonth=0,this.currentYear++):this.currentMonth++,this.render()}render(){if(!this.shadowRoot)return;let t=this.hasAttribute("open"),o=this.formatDisplayDate(this.selectedDate),r=["January","February","March","April","May","June","July","August","September","October","November","December"],n=new Date(this.currentYear,this.currentMonth,1).getDay(),i=new Date(this.currentYear,this.currentMonth+1,0).getDate(),a=new Date(this.currentYear,this.currentMonth,0).getDate(),s=this.formatDate(new Date),l=this.selectedDate?this.formatDate(this.selectedDate):"",d="";for(let c=n-1;c>=0;c--)d+=`<div class="day other-month">${a-c}</div>`;for(let c=1;c<=i;c++){let u=new Date(this.currentYear,this.currentMonth,c),p=this.formatDate(u);d+=`
        <button type="button" class="day ${p===s?"today":""} ${p===l?"selected":""}" 
          data-date="${p}" tabindex="0" aria-label="${p}">
          ${c}
        </button>
      `}this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
        <span class="icon">\u{1F4C5}</span>
        <span>${o}</span>
      </button>

      <div class="popover" role="dialog" aria-modal="true" aria-label="Calendar">
        <div class="header">
          <button type="button" class="nav-btn prev-btn" aria-label="Previous month">\u25C0</button>
          <span class="month-label">${r[this.currentMonth]} ${this.currentYear}</span>
          <button type="button" class="nav-btn next-btn" aria-label="Next month">\u25B6</button>
        </div>
        <div class="weekdays">
          <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
        </div>
        <div class="days-grid">
          ${d}
        </div>
      </div>
    `,this.setupListeners()}setupListeners(){this.shadowRoot?.querySelector(".trigger")?.addEventListener("click",()=>{this.hasAttribute("open")?this.closePopover():this.openPopover()}),this.shadowRoot?.querySelector(".prev-btn")?.addEventListener("click",()=>this.prevMonth()),this.shadowRoot?.querySelector(".next-btn")?.addEventListener("click",()=>this.nextMonth()),this.shadowRoot?.querySelectorAll(".day[data-date]")?.forEach(i=>{i.addEventListener("click",a=>{let l=a.currentTarget.getAttribute("data-date");if(l){let d=new Date(l+"T00:00:00");this.selectDate(d)}}),i.addEventListener("keydown",a=>{let s=a;if(s.key==="ArrowRight"||s.key==="ArrowLeft"||s.key==="ArrowUp"||s.key==="ArrowDown"||s.key==="PageUp"||s.key==="PageDown"){s.preventDefault();let d=a.currentTarget.getAttribute("data-date");if(!d)return;let c=new Date(d+"T00:00:00");s.key==="ArrowRight"&&c.setDate(c.getDate()+1),s.key==="ArrowLeft"&&c.setDate(c.getDate()-1),s.key==="ArrowDown"&&c.setDate(c.getDate()+7),s.key==="ArrowUp"&&c.setDate(c.getDate()-7),s.key==="PageUp"&&c.setMonth(c.getMonth()-1),s.key==="PageDown"&&c.setMonth(c.getMonth()+1),this.currentMonth=c.getMonth(),this.currentYear=c.getFullYear(),this.render();let u=this.formatDate(c);this.shadowRoot?.querySelector(`.day[data-date="${u}"]`)?.focus()}})})}};customElements.get("flowx-date-picker")||customElements.define("flowx-date-picker",B);L('input[type="date"]',(e,t)=>{let o=document.createElement("flowx-date-picker");t.appendChild(o),o.attachToInput(e)});var X=class extends HTMLElement{static get observedAttributes(){return["value","disabled"]}nativeInput=null;selectedHour=12;selectedMinute=0;period="PM";positionerCleanup=null;outsideCleanup=null;constructor(){super(),this.attachShadow({mode:"open"})}attachToInput(t){this.nativeInput=t,t.value&&this.parseTime(t.value),T(t,o=>{o&&(this.parseTime(o),this.render())}),this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupPopover()}attributeChangedCallback(){this.render()}parseTime(t){let o=t.split(":");if(o.length>=2){let r=parseInt(o[0],10),n=parseInt(o[1],10);!isNaN(r)&&!isNaN(n)&&(this.period=r>=12?"PM":"AM",r=r%12,r===0&&(r=12),this.selectedHour=r,this.selectedMinute=n)}}cleanupPopover(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=null),this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null)}formatTime24(){let t=this.selectedHour;this.period==="PM"&&t<12&&(t+=12),this.period==="AM"&&t===12&&(t=0);let o=String(t).padStart(2,"0"),r=String(this.selectedMinute).padStart(2,"0");return`${o}:${r}`}formatDisplayTime(){let t=String(this.selectedHour).padStart(2,"0"),o=String(this.selectedMinute).padStart(2,"0");return`${t}:${o} ${this.period}`}commitTime(){let t=this.formatTime24();this.nativeInput&&S(this.nativeInput,t),this.setAttribute("value",t)}openPopover(){if(this.hasAttribute("disabled"))return;this.setAttribute("open",""),this.render();let t=this.shadowRoot?.querySelector(".trigger"),o=this.shadowRoot?.querySelector(".popover");if(t&&o){let r=y(t,o,{placement:"bottom",align:"start",offset:4});this.positionerCleanup=r.cleanup;let n=E(this,()=>this.closePopover());this.outsideCleanup=n.cleanup}}closePopover(){this.removeAttribute("open"),this.cleanupPopover(),this.render()}render(){if(!this.shadowRoot)return;let t=this.hasAttribute("open"),o=this.formatDisplayTime(),r=Array.from({length:12},(s,l)=>l+1),n=[0,5,10,15,20,25,30,35,40,45,50,55],i=r.map(s=>`
      <button type="button" class="option ${s===this.selectedHour?"selected":""}" data-type="hour" data-val="${s}">
        ${String(s).padStart(2,"0")}
      </button>
    `).join(""),a=n.map(s=>`
      <button type="button" class="option ${s===this.selectedMinute?"selected":""}" data-type="minute" data-val="${s}">
        ${String(s).padStart(2,"0")}
      </button>
    `).join("");this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
        <span class="icon">\u{1F552}</span>
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
    `,this.setupListeners()}setupListeners(){this.shadowRoot?.querySelector(".trigger")?.addEventListener("click",()=>{this.hasAttribute("open")?this.closePopover():this.openPopover()}),this.shadowRoot?.querySelectorAll(".option")?.forEach(n=>{n.addEventListener("click",i=>{let a=i.currentTarget,s=a.getAttribute("data-type"),l=parseInt(a.getAttribute("data-val")||"0",10);s==="hour"&&(this.selectedHour=l),s==="minute"&&(this.selectedMinute=l),this.commitTime(),this.render()})}),this.shadowRoot?.querySelectorAll(".period-btn")?.forEach(n=>{n.addEventListener("click",i=>{let s=i.currentTarget.getAttribute("data-period");s&&(this.period=s,this.commitTime(),this.render())})})}};customElements.get("flowx-time-picker")||customElements.define("flowx-time-picker",X);L('input[type="time"]',(e,t)=>{let o=document.createElement("flowx-time-picker");t.appendChild(o),o.attachToInput(e)});var Y=class extends HTMLElement{static get observedAttributes(){return["value","disabled"]}nativeInput=null;currentMonth=new Date().getMonth();currentYear=new Date().getFullYear();selectedDate=null;selectedHour=12;selectedMinute=0;period="PM";positionerCleanup=null;outsideCleanup=null;constructor(){super(),this.attachShadow({mode:"open"})}attachToInput(t){this.nativeInput=t,t.value&&this.parseDateTime(t.value),T(t,o=>{o&&(this.parseDateTime(o),this.render())}),this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupPopover()}attributeChangedCallback(){this.render()}parseDateTime(t){let o=new Date(t);if(!isNaN(o.getTime())){this.selectedDate=o,this.currentMonth=o.getMonth(),this.currentYear=o.getFullYear();let r=o.getHours();this.selectedMinute=o.getMinutes(),this.period=r>=12?"PM":"AM",r=r%12,r===0&&(r=12),this.selectedHour=r}}cleanupPopover(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=null),this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null)}formatDateISO(t){let o=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),i=this.selectedHour;this.period==="PM"&&i<12&&(i+=12),this.period==="AM"&&i===12&&(i=0);let a=String(i).padStart(2,"0"),s=String(this.selectedMinute).padStart(2,"0");return`${o}-${r}-${n}T${a}:${s}`}formatDisplay(){if(!this.selectedDate)return"Select Date & Time\u2026";let t=this.selectedDate.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"}),o=String(this.selectedHour).padStart(2,"0"),r=String(this.selectedMinute).padStart(2,"0");return`${t}, ${o}:${r} ${this.period}`}commit(){this.selectedDate||(this.selectedDate=new Date);let t=this.formatDateISO(this.selectedDate);this.nativeInput&&S(this.nativeInput,t),this.setAttribute("value",t)}openPopover(){if(this.hasAttribute("disabled"))return;this.setAttribute("open",""),this.render();let t=this.shadowRoot?.querySelector(".trigger"),o=this.shadowRoot?.querySelector(".popover");if(t&&o){let r=y(t,o,{placement:"bottom",align:"start",offset:4});this.positionerCleanup=r.cleanup;let n=E(this,()=>this.closePopover());this.outsideCleanup=n.cleanup}}closePopover(){this.removeAttribute("open"),this.cleanupPopover(),this.render()}prevMonth(){this.currentMonth===0?(this.currentMonth=11,this.currentYear--):this.currentMonth--,this.render()}nextMonth(){this.currentMonth===11?(this.currentMonth=0,this.currentYear++):this.currentMonth++,this.render()}render(){if(!this.shadowRoot)return;let t=this.hasAttribute("open"),o=this.formatDisplay(),r=["January","February","March","April","May","June","July","August","September","October","November","December"],n=new Date(this.currentYear,this.currentMonth,1).getDay(),i=new Date(this.currentYear,this.currentMonth+1,0).getDate(),a=new Date(this.currentYear,this.currentMonth,0).getDate(),s=b=>{let m=this.currentYear,x=String(this.currentMonth+1).padStart(2,"0"),v=String(b).padStart(2,"0");return`${m}-${x}-${v}`},l=this.selectedDate?`${this.selectedDate.getFullYear()}-${String(this.selectedDate.getMonth()+1).padStart(2,"0")}-${String(this.selectedDate.getDate()).padStart(2,"0")}`:"",d="";for(let b=n-1;b>=0;b--)d+=`<div class="day other-month">${a-b}</div>`;for(let b=1;b<=i;b++){let m=s(b);d+=`
        <button type="button" class="day ${m===l?"selected":""}" 
          data-date="${m}" tabindex="0">
          ${b}
        </button>
      `}let c=Array.from({length:12},(b,m)=>m+1),u=[0,15,30,45],p=c.map(b=>`
      <button type="button" class="time-opt ${b===this.selectedHour?"selected":""}" data-type="hour" data-val="${b}">
        ${String(b).padStart(2,"0")}
      </button>
    `).join(""),g=u.map(b=>`
      <button type="button" class="time-opt ${b===this.selectedMinute?"selected":""}" data-type="minute" data-val="${b}">
        ${String(b).padStart(2,"0")}
      </button>
    `).join("");this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
        <span class="icon">\u{1F4C5}</span>
        <span>${o}</span>
      </button>

      <div class="popover" role="dialog" aria-modal="true">
        <div class="columns">
          <div>
            <div class="header">
              <button type="button" class="nav-btn prev-btn">\u25C0</button>
              <span class="month-label">${r[this.currentMonth]} ${this.currentYear}</span>
              <button type="button" class="nav-btn next-btn">\u25B6</button>
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
              ${g}
            </div>
            <div class="period-toggle">
              <button type="button" class="period-btn ${this.period==="AM"?"active":""}" data-period="AM">AM</button>
              <button type="button" class="period-btn ${this.period==="PM"?"active":""}" data-period="PM">PM</button>
            </div>
          </div>
        </div>
      </div>
    `,this.setupListeners()}setupListeners(){this.shadowRoot?.querySelector(".trigger")?.addEventListener("click",()=>{this.hasAttribute("open")?this.closePopover():this.openPopover()}),this.shadowRoot?.querySelector(".prev-btn")?.addEventListener("click",()=>this.prevMonth()),this.shadowRoot?.querySelector(".next-btn")?.addEventListener("click",()=>this.nextMonth()),this.shadowRoot?.querySelectorAll(".day[data-date]")?.forEach(o=>{o.addEventListener("click",r=>{let i=r.currentTarget.getAttribute("data-date");i&&(this.selectedDate=new Date(i+"T00:00:00"),this.commit(),this.render())})}),this.shadowRoot?.querySelectorAll(".time-opt")?.forEach(o=>{o.addEventListener("click",r=>{let n=r.currentTarget,i=n.getAttribute("data-type"),a=parseInt(n.getAttribute("data-val")||"0",10);i==="hour"&&(this.selectedHour=a),i==="minute"&&(this.selectedMinute=a),this.commit(),this.render()})}),this.shadowRoot?.querySelectorAll(".period-btn")?.forEach(o=>{o.addEventListener("click",r=>{let i=r.currentTarget.getAttribute("data-period");i&&(this.period=i,this.commit(),this.render())})})}};customElements.get("flowx-datetime-picker")||customElements.define("flowx-datetime-picker",Y);L('input[type="datetime-local"]',(e,t)=>{let o=document.createElement("flowx-datetime-picker");t.appendChild(o),o.attachToInput(e)});var U=class extends HTMLElement{static get observedAttributes(){return["value","disabled"]}nativeInput=null;selectedColor="#0066cc";positionerCleanup=null;outsideCleanup=null;presets=["#0066cc","#0052a3","#1f6feb","#3fb950","#2ea043","#da3633","#f85149","#d29922","#db6d28","#a371f7","#8b949e","#6e7681","#484f58","#0d1117","#ffffff"];constructor(){super(),this.attachShadow({mode:"open"})}attachToInput(t){this.nativeInput=t,t.value&&(this.selectedColor=t.value),T(t,o=>{o&&(this.selectedColor=o,this.render())}),this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupPopover()}attributeChangedCallback(){this.render()}cleanupPopover(){this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=null),this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null)}selectColor(t){this.selectedColor=t,this.nativeInput&&S(this.nativeInput,t),this.setAttribute("value",t),this.render()}openPopover(){if(this.hasAttribute("disabled"))return;this.setAttribute("open",""),this.render();let t=this.shadowRoot?.querySelector(".trigger"),o=this.shadowRoot?.querySelector(".popover");if(t&&o){let r=y(t,o,{placement:"bottom",align:"start",offset:4});this.positionerCleanup=r.cleanup;let n=E(this,()=>this.closePopover());this.outsideCleanup=n.cleanup}}closePopover(){this.removeAttribute("open"),this.cleanupPopover(),this.render()}render(){if(!this.shadowRoot)return;let t=this.hasAttribute("open"),o=this.presets.map(r=>`
      <button type="button" class="swatch ${r===this.selectedColor?"selected":""}" 
        data-color="${r}" style="background-color: ${r}" aria-label="Color ${r}">
      </button>
    `).join("");this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
    `,this.setupListeners()}setupListeners(){this.shadowRoot?.querySelector(".trigger")?.addEventListener("click",()=>{this.hasAttribute("open")?this.closePopover():this.openPopover()}),this.shadowRoot?.querySelectorAll(".swatch")?.forEach(r=>{r.addEventListener("click",n=>{let a=n.currentTarget.getAttribute("data-color");a&&this.selectColor(a)})});let o=this.shadowRoot?.querySelector(".custom-hex");o?.addEventListener("change",()=>{let r=o.value.trim();r.startsWith("#")||(r="#"+r),/^#[0-9A-Fa-f]{6}$/.test(r)&&this.selectColor(r)})}};customElements.get("flowx-color-picker")||customElements.define("flowx-color-picker",U);L('input[type="color"]',(e,t)=>{let o=document.createElement("flowx-color-picker");t.appendChild(o),o.attachToInput(e)});var C=class extends HTMLElement{nativeInput=null;fileList=[];uploadProgresses={};constructor(){super(),this.attachShadow({mode:"open"})}attachToInput(t){this.nativeInput=t,t.addEventListener("change",()=>{t.files&&(this.fileList=Array.from(t.files),this.render())}),document.addEventListener("fx:beforeRequest",o=>{let n=o.detail?.xhr;n&&n.upload&&n.upload.addEventListener("progress",i=>{if(i.lengthComputable){let a=Math.round(i.loaded/i.total*100);this.fileList.forEach(s=>{this.uploadProgresses[s.name]=a}),this.render()}})}),this.render()}connectedCallback(){this.render()}removeFile(t){if(this.fileList.splice(t,1),this.nativeInput){let o=new DataTransfer;this.fileList.forEach(r=>o.items.add(r)),this.nativeInput.files=o.files,this.nativeInput.dispatchEvent(new Event("input",{bubbles:!0})),this.nativeInput.dispatchEvent(new Event("change",{bubbles:!0}))}this.render()}handleDrop(t){if(t.preventDefault(),this.removeAttribute("dragging"),t.dataTransfer&&t.dataTransfer.files.length>0){let o=Array.from(t.dataTransfer.files);if(this.nativeInput?.hasAttribute("multiple")?this.fileList=[...this.fileList,...o]:this.fileList=[o[0]],this.nativeInput){let n=new DataTransfer;this.fileList.forEach(i=>n.items.add(i)),this.nativeInput.files=n.files,this.nativeInput.dispatchEvent(new Event("input",{bubbles:!0})),this.nativeInput.dispatchEvent(new Event("change",{bubbles:!0}))}this.render()}}render(){if(!this.shadowRoot)return;let t=this.hasAttribute("dragging"),o=this.fileList.map((r,n)=>{let i=this.uploadProgresses[r.name]??0,a=(r.size/(1024*1024)).toFixed(2);return`
        <div class="file-item">
          <div class="file-info">
            <span class="file-icon">\u{1F4C4}</span>
            <div class="file-details">
              <span class="file-name">${r.name}</span>
              <span class="file-size">${a} MB</span>
            </div>
            <button type="button" class="remove-btn" data-index="${n}" title="Remove file">\u2715</button>
          </div>
          ${i>0&&i<100?`
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${i}%"></div>
            </div>
          `:""}
        </div>
      `}).join("");this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
        <div class="upload-icon">\u2601\uFE0F</div>
        <div class="drop-title">Drag & drop files here, or <span style="color:var(--flowx-primary);text-decoration:underline;">browse</span></div>
        <div class="drop-subtitle">Participates directly in native FormData multipart form submissions</div>
      </div>

      ${this.fileList.length>0?`
        <div class="file-list">
          ${o}
        </div>
      `:""}
    `,this.setupListeners()}setupListeners(){let t=this.shadowRoot?.querySelector("#dropzone");t?.addEventListener("click",()=>{this.nativeInput?.click()}),t?.addEventListener("dragover",o=>{o.preventDefault(),this.setAttribute("dragging","")}),t?.addEventListener("dragleave",()=>{this.removeAttribute("dragging")}),t?.addEventListener("drop",o=>{this.handleDrop(o)}),this.shadowRoot?.querySelectorAll(".remove-btn")?.forEach(o=>{o.addEventListener("click",r=>{r.stopPropagation();let n=parseInt(r.currentTarget.getAttribute("data-index")||"0",10);this.removeFile(n)})})}};customElements.get("flowx-file-upload")||customElements.define("flowx-file-upload",C);L('input[type="file"]:not([accept*="image"])',(e,t)=>{let o=document.createElement("flowx-file-upload");t.appendChild(o),o.attachToInput(e)});var G=class extends C{previews={};attachToInput(t){super.attachToInput(t)}render(){if(!this.shadowRoot)return;this.fileList.forEach(r=>{if(r.type.startsWith("image/")&&!this.previews[r.name]){let n=new FileReader;n.onload=i=>{this.previews[r.name]=i.target?.result,this.render()},n.readAsDataURL(r)}});let t=this.hasAttribute("dragging"),o=this.fileList.map((r,n)=>{let i=this.previews[r.name]||"",a=(r.size/(1024*1024)).toFixed(2),s=this.uploadProgresses[r.name]??0;return`
        <div class="image-card">
          <div class="thumbnail-wrapper">
            ${i?`<img src="${i}" alt="${r.name}" class="thumbnail" />`:'<span class="placeholder-icon">\u{1F5BC}\uFE0F</span>'}
          </div>
          <div class="image-details">
            <span class="image-name">${r.name}</span>
            <span class="image-size">${a} MB</span>
          </div>
          <button type="button" class="remove-btn" data-index="${n}" title="Remove image">\u2715</button>
          ${s>0&&s<100?`
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${s}%"></div>
            </div>
          `:""}
        </div>
      `}).join("");this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
        <div class="upload-icon">\u{1F5BC}\uFE0F</div>
        <div class="drop-title">Drop images here, or <span style="color:var(--flowx-primary);text-decoration:underline;">browse</span></div>
        <div class="drop-subtitle">Supports instant thumbnail previews & progressive enhancement</div>
      </div>

      ${this.fileList.length>0?`
        <div class="image-grid">
          ${o}
        </div>
      `:""}
    `,this.setupListeners()}};customElements.get("flowx-image-upload")||customElements.define("flowx-image-upload",G);L('input[type="file"][accept*="image"]',(e,t)=>{let o=document.createElement("flowx-image-upload");t.appendChild(o),o.attachToInput(e)});var W=class extends HTMLElement{static get observedAttributes(){return["name","width","height","pen-color","bg-color"]}canvas=null;ctx=null;hiddenInput=null;isDrawing=!1;hasStrokes=!1;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.ensureHiddenInput()}attributeChangedCallback(){this.render()}ensureHiddenInput(){let t=this.getAttribute("name")||"signature",o=this.querySelector(`input[type="hidden"][name="${t}"]`);o||(o=document.createElement("input"),o.type="hidden",o.name=t,this.appendChild(o)),this.hiddenInput=o;let r=this.closest("form");r&&r.addEventListener("submit",()=>this.syncToHiddenInput())}syncToHiddenInput(){if(!(!this.hiddenInput||!this.canvas))if(this.hasStrokes){let t=this.canvas.toDataURL("image/png");this.hiddenInput.value=t,this.hiddenInput.dispatchEvent(new Event("input",{bubbles:!0})),this.hiddenInput.dispatchEvent(new Event("change",{bubbles:!0}))}else this.hiddenInput.value=""}clear(){if(!this.canvas||!this.ctx)return;let t=this.canvas.width,o=this.canvas.height,r=this.getAttribute("bg-color")||"#0d1117";this.ctx.fillStyle=r,this.ctx.fillRect(0,0,t,o),this.hasStrokes=!1,this.syncToHiddenInput()}startDrawing(t){if(!this.canvas||!this.ctx)return;this.isDrawing=!0;let o=this.canvas.getBoundingClientRect(),r="touches"in t?t.touches[0].clientX:t.clientX,n="touches"in t?t.touches[0].clientY:t.clientY;this.ctx.beginPath(),this.ctx.moveTo(r-o.left,n-o.top)}draw(t){if(!this.isDrawing||!this.canvas||!this.ctx)return;t.preventDefault();let o=this.canvas.getBoundingClientRect(),r="touches"in t?t.touches[0].clientX:t.clientX,n="touches"in t?t.touches[0].clientY:t.clientY,i=this.getAttribute("pen-color")||"#58a6ff";this.ctx.strokeStyle=i,this.ctx.lineWidth=2.5,this.ctx.lineCap="round",this.ctx.lineJoin="round",this.ctx.lineTo(r-o.left,n-o.top),this.ctx.stroke(),this.hasStrokes=!0}stopDrawing(){this.isDrawing&&(this.isDrawing=!1,this.syncToHiddenInput())}render(){if(!this.shadowRoot)return;let t=parseInt(this.getAttribute("width")||"400",10),o=parseInt(this.getAttribute("height")||"160",10);if(this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
          <span class="title">\u270D\uFE0F Signature</span>
          <span class="note">Requires JS for canvas drawing</span>
        </div>
        <canvas width="${t}" height="${o}"></canvas>
        <div class="controls">
          <button type="button" class="btn-clear">Clear</button>
        </div>
      </div>
    `,this.canvas=this.shadowRoot.querySelector("canvas"),this.canvas&&typeof this.canvas.getContext=="function")try{this.ctx=this.canvas.getContext("2d"),this.clear(),this.setupCanvasListeners()}catch{}}setupCanvasListeners(){if(!this.canvas)return;this.canvas.addEventListener("mousedown",o=>this.startDrawing(o)),this.canvas.addEventListener("mousemove",o=>this.draw(o)),window.addEventListener("mouseup",()=>this.stopDrawing()),this.canvas.addEventListener("touchstart",o=>this.startDrawing(o),{passive:!1}),this.canvas.addEventListener("touchmove",o=>this.draw(o),{passive:!1}),window.addEventListener("touchend",()=>this.stopDrawing()),this.shadowRoot?.querySelector(".btn-clear")?.addEventListener("click",()=>this.clear())}};customElements.get("flowx-signature-pad")||customElements.define("flowx-signature-pad",W);var Q=class{element;state;options;activeAbortController=null;constructor(t,o={}){this.element=t,this.options={endpoint:t.getAttribute("fx-endpoint")||t.getAttribute("fx-get")||"",target:t.getAttribute("fx-target")||"tbody",swap:t.getAttribute("fx-swap")||"innerHTML",mode:t.getAttribute("mode")||"server",...o};let r=parseInt(t.getAttribute("page")||"1",10),n=parseInt(t.getAttribute("limit")||t.getAttribute("per-page")||"10",10);this.state={page:isNaN(r)?1:r,limit:isNaN(n)?10:n,sort:t.getAttribute("sort")||"",dir:t.getAttribute("dir")||"",search:t.getAttribute("search")||"",groupBy:t.getAttribute("group-by")||"",filters:{}}}getState(){return{...this.state,filters:{...this.state.filters}}}setMode(t){this.options.mode=t}getMode(){return this.options.mode||"server"}toQueryString(){let t=new URLSearchParams;this.state.page>1&&t.set("page",String(this.state.page)),this.state.limit&&t.set("limit",String(this.state.limit)),this.state.sort&&t.set("sort",this.state.sort),this.state.dir&&t.set("dir",this.state.dir),this.state.search&&t.set("q",this.state.search),this.state.groupBy&&t.set("group_by",this.state.groupBy);for(let[r,n]of Object.entries(this.state.filters))n&&t.set(`filter_${r}`,n);let o=t.toString();return o?`?${o}`:""}updateAndRefetch(t){return t.filters&&(this.state.filters={...this.state.filters,...t.filters}),t.page!==void 0&&(this.state.page=t.page),t.limit!==void 0&&(this.state.limit=t.limit),t.sort!==void 0&&(this.state.sort=t.sort),t.dir!==void 0&&(this.state.dir=t.dir),t.search!==void 0&&(this.state.search=t.search),t.groupBy!==void 0&&(this.state.groupBy=t.groupBy),this.options.onStateChange&&this.options.onStateChange(this.getState()),this.options.mode==="client"?(this.applyClientSideState(),Promise.resolve()):this.triggerServerRefetch()}triggerServerRefetch(){let t=this.options.endpoint||this.element.getAttribute("fx-endpoint")||this.element.getAttribute("fx-get")||"";if(!t)return Promise.resolve();this.activeAbortController&&this.activeAbortController.abort(),this.activeAbortController=new AbortController;let o=this.toQueryString(),r=t.includes("?")?`${t}&${o.slice(1)}`:`${t}${o}`,n=null;this.options.target&&(n=this.element.querySelector(this.options.target)||document.querySelector(this.options.target)),n||(n=this.element);let i=this.options.swap||"innerHTML";if(window.FlowX&&typeof window.FlowX.process=="function"){let a=document.createElement("div");a.setAttribute("fx-get",r),a.setAttribute("fx-target",this.options.target||""),a.setAttribute("fx-swap",i)}return fetch(r,{signal:this.activeAbortController.signal}).then(a=>a.text()).then(a=>{i==="beforeend"?n.insertAdjacentHTML("beforeend",a):i==="afterbegin"?n.insertAdjacentHTML("afterbegin",a):n.innerHTML=a,window.FlowX&&typeof window.FlowX.process=="function"&&window.FlowX.process(n)}).catch(a=>{a.name!=="AbortError"&&console.error("FlowX DataGrid: Refetch error",a)})}applyClientSideState(){let t=this.element.querySelector("table");if(!t)return;let o=t.querySelector("tbody");if(!o)return;let r=Array.from(o.querySelectorAll("tr"));if(this.state.search){let i=this.state.search.toLowerCase();r.forEach(a=>{let s=a.textContent?.toLowerCase()||"";a.style.display=s.includes(i)?"":"none"})}else r.forEach(i=>{i.style.display=""});let n=r.filter(i=>i.style.display!=="none");if(this.state.sort&&this.state.dir){let i=this.findColumnIndex(t,this.state.sort);i!==-1&&(n.sort((a,s)=>{let l=a.children[i]?.textContent?.trim()||"",d=s.children[i]?.textContent?.trim()||"",c=Number(l),u=Number(d),p=0;return!isNaN(c)&&!isNaN(u)?p=c-u:p=l.localeCompare(d),this.state.dir==="asc"?p:-p}),n.forEach(a=>o.appendChild(a)))}}findColumnIndex(t,o){return Array.from(t.querySelectorAll("th")).findIndex(n=>n.getAttribute("fx-sort")===o||n.getAttribute("data-field")===o||n.textContent?.trim().toLowerCase()===o.toLowerCase())}};function R(e,t){return new Q(e,t)}function $t(e,t="export.csv"){let o=Array.from(e.querySelectorAll("tr")),r=[];for(let a of o){let l=Array.from(a.querySelectorAll("th, td")).map(d=>`"${d.textContent?.trim().replace(/"/g,'""')||""}"`).join(",");r.push(l)}let n="data:text/csv;charset=utf-8,"+encodeURIComponent(r.join(`
`)),i=document.createElement("a");i.setAttribute("href",n),i.setAttribute("download",t),document.body.appendChild(i),i.click(),i.remove()}var z=class extends HTMLElement{manager=null;static get observedAttributes(){return["fx-endpoint","fx-target","fx-swap","mode","sort","dir","page","limit"]}connectedCallback(){this.initManager(),this.setupHeaderSortTriggers()}attributeChangedCallback(t,o,r){o!==r&&t==="mode"&&this.manager&&this.manager.setMode(r)}initManager(){this.manager||(this.manager=R(this))}getQueryManager(){return this.manager}setupHeaderSortTriggers(){let t=this.querySelector("table");if(!t)return;let o=t.querySelectorAll("th");o.forEach(r=>{let n=r.getAttribute("fx-sort")||r.getAttribute("data-fx-sort");if(n){if(r.style.cursor="pointer",r.style.userSelect="none",!r.querySelector(".sort-indicator")){let i=document.createElement("span");i.className="sort-indicator",i.style.marginLeft="6px",i.style.fontSize="10px",i.style.opacity="0.5",i.textContent="\u21C5",r.appendChild(i)}r.addEventListener("click",()=>{if(!this.manager)return;let i=this.manager.getState(),a="asc";i.sort===n&&(i.dir==="asc"?a="desc":i.dir==="desc"?a="":a="asc"),o.forEach(l=>{let d=l.querySelector(".sort-indicator");d&&(d.textContent="\u21C5")});let s=r.querySelector(".sort-indicator");s&&(s.textContent=a==="asc"?"\u25B2":a==="desc"?"\u25BC":"\u21C5",s.style.opacity=a?"1":"0.5"),this.manager.updateAndRefetch({sort:a?n:"",dir:a})})}})}};customElements.get("flowx-data-table")||customElements.define("flowx-data-table",z);var K=class extends z{colWidths={};connectedCallback(){super.connectedCallback(),this.setupColumnResizing(),this.setupColumnReordering()}setupColumnResizing(){let t=this.querySelector("table");if(!t)return;Array.from(t.querySelectorAll("th")).forEach((r,n)=>{if(r.querySelector(".resize-handle"))return;r.style.position="relative";let i=document.createElement("div");i.className="resize-handle",i.style.position="absolute",i.style.right="0",i.style.top="0",i.style.bottom="0",i.style.width="6px",i.style.cursor="col-resize",i.style.userSelect="none",r.appendChild(i);let a=0,s=0,l=c=>{let u=c.clientX-a,p=Math.max(40,s+u);r.style.width=`${p}px`,this.colWidths[r.textContent?.trim()||n]=p},d=()=>{window.removeEventListener("mousemove",l),window.removeEventListener("mouseup",d)};i.addEventListener("mousedown",c=>{c.stopPropagation(),a=c.clientX,s=r.offsetWidth,window.addEventListener("mousemove",l),window.addEventListener("mouseup",d)})})}setupColumnReordering(){let t=this.querySelector("table");if(!t)return;Array.from(t.querySelectorAll("th")).forEach(r=>{r.draggable=!0,r.addEventListener("dragstart",n=>{n.dataTransfer?.setData("text/plain",r.cellIndex.toString())}),r.addEventListener("dragover",n=>{n.preventDefault()}),r.addEventListener("drop",n=>{n.preventDefault();let i=n.dataTransfer?.getData("text/plain");if(!i)return;let a=parseInt(i,10),s=r.cellIndex;a!==s&&this.reorderColumn(t,a,s)})})}reorderColumn(t,o,r){Array.from(t.querySelectorAll("tr")).forEach(i=>{let a=Array.from(i.children);a[o]&&a[r]&&(o<r?i.insertBefore(a[o],a[r].nextSibling):i.insertBefore(a[o],a[r]))})}};customElements.get("flowx-data-grid")||customElements.define("flowx-data-grid",K);var J=class extends HTMLElement{connectedCallback(){this.setupTreeToggles()}setupTreeToggles(){this.querySelectorAll("[data-fx-tree-toggle], .tree-toggle").forEach(o=>{o.addEventListener("click",r=>{r.stopPropagation();let n=o.closest("tr");if(!n)return;let i=n.getAttribute("aria-expanded")==="true",a=o.getAttribute("fx-get")||n.getAttribute("fx-get");i?(n.setAttribute("aria-expanded","false"),o.textContent="\u25B6",this.toggleChildren(n,!1)):(n.setAttribute("aria-expanded","true"),o.textContent="\u25BC",a&&!n.hasAttribute("data-children-loaded")?(n.setAttribute("data-children-loaded","true"),fetch(a).then(s=>s.text()).then(s=>{n.insertAdjacentHTML("afterend",s),this.setupTreeToggles()})):this.toggleChildren(n,!0))})})}toggleChildren(t,o){let r=t.getAttribute("data-row-id");if(!r)return;this.querySelectorAll(`tr[data-parent-id="${r}"]`).forEach(i=>{let a=i;a.style.display=o?"":"none",o||(a.setAttribute("aria-expanded","false"),this.toggleChildren(i,!1))})}};customElements.get("flowx-tree-table")||customElements.define("flowx-tree-table",J);var Z=class extends HTMLElement{manager=null;connectedCallback(){this.manager=R(this,{target:".list-container"})}getQueryManager(){return this.manager}};customElements.get("flowx-list-view")||customElements.define("flowx-list-view",Z);var tt=class extends HTMLElement{items=[];itemHeight=40;renderItemFn=null;viewport=null;content=null;static get observedAttributes(){return["item-height"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.itemHeight=parseInt(this.getAttribute("item-height")||"40",10),this.render()}attributeChangedCallback(){this.itemHeight=parseInt(this.getAttribute("item-height")||"40",10),this.updateVirtualWindow()}setData(t,o){this.items=t,this.renderItemFn=o,this.updateVirtualWindow()}updateVirtualWindow(){if(!this.viewport||!this.content||!this.renderItemFn||this.items.length===0)return;let t=this.viewport.scrollTop,o=this.viewport.clientHeight||300,r=Math.max(0,Math.floor(t/this.itemHeight)-2),n=Math.min(this.items.length,Math.ceil((t+o)/this.itemHeight)+2),i=this.items.length*this.itemHeight,a=r*this.itemHeight,l=this.items.slice(r,n).map((d,c)=>`
      <div class="virtual-item" style="height: ${this.itemHeight}px; line-height: ${this.itemHeight}px;">
        ${this.renderItemFn(d,r+c)}
      </div>
    `).join("");this.content.style.height=`${i}px`,this.content.style.paddingTop=`${a}px`,this.content.style.boxSizing="border-box",this.content.innerHTML=l}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
    `,this.viewport=this.shadowRoot.querySelector(".virtual-viewport"),this.content=this.shadowRoot.querySelector(".virtual-content"),this.viewport?.addEventListener("scroll",()=>this.updateVirtualWindow()))}};customElements.get("flowx-virtual-list")||customElements.define("flowx-virtual-list",tt);var et=class extends HTMLElement{page=1;observer=null;isLoading=!1;static get observedAttributes(){return["fx-endpoint","fx-target","page"]}connectedCallback(){this.page=parseInt(this.getAttribute("page")||"1",10),this.render(),this.setupSentinelObserver()}disconnectedCallback(){this.observer&&(this.observer.disconnect(),this.observer=null)}setupSentinelObserver(){let t=this.shadowRoot?.querySelector(".sentinel");t&&(this.observer=new IntersectionObserver(o=>{for(let r of o)r.isIntersecting&&!this.isLoading&&this.loadNextPage()},{threshold:.1}),this.observer.observe(t))}loadNextPage(){let t=this.getAttribute("fx-endpoint")||this.getAttribute("fx-get"),o=this.getAttribute("fx-target");if(!t||!o)return;this.isLoading=!0,this.page++;let r=t.includes("?")?`${t}&page=${this.page}`:`${t}?page=${this.page}`,n=document.querySelector(o);if(!n)return;let i=this.shadowRoot?.querySelector(".spinner-box");i&&(i.style.display="block"),fetch(r).then(a=>a.text()).then(a=>{if(!a.trim()){this.observer?.disconnect(),i&&(i.style.display="none");return}n.insertAdjacentHTML("beforeend",a),window.FlowX&&typeof window.FlowX.process=="function"&&window.FlowX.process(n)}).finally(()=>{this.isLoading=!1,i&&(i.style.display="none")})}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        ${h}
        :host { display: block; width: 100%; }
        .sentinel { height: 20px; width: 100%; margin-top: 10px; }
        .spinner-box { display: none; text-align: center; padding: 12px; font-size: 12px; color: #8b949e; }
      </style>
      <slot></slot>
      <div class="spinner-box">Loading more items\u2026</div>
      <div class="sentinel" fx-trigger="revealed"></div>
    `)}};customElements.get("flowx-infinite-scroll")||customElements.define("flowx-infinite-scroll",et);var ot=class extends HTMLElement{timer=null;static get observedAttributes(){return["placeholder","delay","for"]}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){this.shadowRoot||this.attachShadow({mode:"open"});let t=this.getAttribute("placeholder")||"Search\u2026";this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
        <span class="icon">\u{1F50D}</span>
        <input type="search" placeholder="${t}" aria-label="${t}" />
      </div>
    `,this.setupDebounce()}setupDebounce(){let t=this.shadowRoot?.querySelector("input");if(!t)return;let o=parseInt(this.getAttribute("delay")||"300",10);t.addEventListener("input",()=>{clearTimeout(this.timer),this.timer=setTimeout(()=>{let r=t.value.trim();this.dispatchSearch(r)},o)})}dispatchSearch(t){let o=this.getAttribute("for")||this.getAttribute("target"),r=null;if(o){let n=document.querySelector(`#${o}, ${o}`);n&&typeof n.getQueryManager=="function"&&(r=n.getQueryManager())}r&&r.updateAndRefetch({search:t,page:1}),this.dispatchEvent(new CustomEvent("fx-search",{bubbles:!0,composed:!0,detail:{query:t}}))}};customElements.get("flowx-search")||customElements.define("flowx-search",ot);var rt=class extends HTMLElement{connectedCallback(){this.setupListeners()}setupListeners(){this.addEventListener("change",()=>this.applyFilters()),this.querySelector("form")?.addEventListener("submit",o=>{o.preventDefault(),this.applyFilters()})}applyFilters(){let t=this.getAttribute("for")||this.getAttribute("target"),o=null;if(t){let i=document.querySelector(`#${t}, ${t}`);i&&typeof i.getQueryManager=="function"&&(o=i.getQueryManager())}let r={};this.querySelectorAll("input, select, flowx-input, flowx-select").forEach(i=>{let a=i.getAttribute("name");if(!a)return;let s=i._currentValue||i.value||i.getAttribute("value")||"";r[a]=s}),o&&o.updateAndRefetch({filters:r,page:1}),this.dispatchEvent(new CustomEvent("fx-filter-change",{bubbles:!0,composed:!0,detail:{filters:r}}))}};customElements.get("flowx-filter")||customElements.define("flowx-filter",rt);var it=class extends HTMLElement{static get observedAttributes(){return["for","fields"]}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){this.shadowRoot||this.attachShadow({mode:"open"});let r=(this.getAttribute("fields")||"name,date").split(",").map(i=>i.trim()).map(i=>`
      <option value="${i}:asc">Sort by ${i} (Ascending)</option>
      <option value="${i}:desc">Sort by ${i} (Descending)</option>
    `).join("");this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
    `;let n=this.shadowRoot.querySelector("select");n?.addEventListener("change",()=>{let i=n.value,a="",s="";if(i.includes(":")){let d=i.split(":");a=d[0],s=d[1]}let l=this.getAttribute("for");if(l){let d=document.querySelector(`#${l}, ${l}`);d&&typeof d.getQueryManager=="function"&&d.getQueryManager().updateAndRefetch({sort:a,dir:s})}this.dispatchEvent(new CustomEvent("fx-sort-change",{bubbles:!0,composed:!0,detail:{sort:a,dir:s}}))})}};customElements.get("flowx-sort")||customElements.define("flowx-sort",it);var nt=class extends HTMLElement{connectedCallback(){this.render()}render(){this.shadowRoot||this.attachShadow({mode:"open"});let r=(this.getAttribute("fields")||"category,status").split(",").map(i=>i.trim()).map(i=>`
      <option value="${i}">Group by ${i}</option>
    `).join("");this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
    `;let n=this.shadowRoot.querySelector("select");n?.addEventListener("change",()=>{let i=n.value,a=this.getAttribute("for");if(a){let s=document.querySelector(`#${a}, ${a}`);s&&typeof s.getQueryManager=="function"&&s.getQueryManager().updateAndRefetch({groupBy:i,page:1})}this.dispatchEvent(new CustomEvent("fx-group-change",{bubbles:!0,composed:!0,detail:{groupBy:i}}))})}};customElements.get("flowx-group-by")||customElements.define("flowx-group-by",nt);var at=class extends HTMLElement{static get observedAttributes(){return["type","fx-get","for","filename"]}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){this.shadowRoot||this.attachShadow({mode:"open"});let t=(this.getAttribute("type")||"csv").toUpperCase(),o=this.getAttribute("fx-get");this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
        <span>\u{1F4E5}</span>
        <span>Export ${t}</span>
      </button>
    `,this.shadowRoot.querySelector("button")?.addEventListener("click",()=>{if(o)window.location.href=o;else{let n=this.getAttribute("for"),i=null;if(n&&(i=document.querySelector(`#${n} table, ${n}`)),i||(i=document.querySelector("table")),i){let a=this.getAttribute("filename")||`export-${Date.now()}.csv`;$t(i,a)}else console.warn("FlowX Export: No table target found for client CSV export")}})}};customElements.get("flowx-export")||customElements.define("flowx-export",at);var q=null,Pt=!1;function Ct(e=document){Pt&&e===document||(e===document&&(Pt=!0),e.addEventListener("click",t=>{let o=t.target,r=o?.closest("[fx-dialog-target], [data-fx-dialog-target]");if(r){t.preventDefault();let i=r.getAttribute("fx-dialog-target")||r.getAttribute("data-fx-dialog-target"),a=r.getAttribute("fx-get")||r.getAttribute("data-fx-get");i&&Ot(r,i,a)}let n=o?.closest("[fx-dialog-close], [data-fx-dialog-close]");if(n){let i=n.closest("dialog, flowx-modal, flowx-dialog, flowx-confirm-dialog, flowx-sheet, flowx-bottom-sheet, flowx-lightbox");i&&zt(i)}}),e.addEventListener("click",t=>{let o=t.target;if(o&&(o.tagName.toLowerCase()==="dialog"||o.tagName.startsWith("FLOWX-"))){let r=o;if(!(r.hasAttribute("fx-dialog-persistent")||r.hasAttribute("persistent"))&&t.target===r){let i=r.getBoundingClientRect(),a=t;(a.clientX<i.left||a.clientX>i.right||a.clientY<i.top||a.clientY>i.bottom||t.target===r)&&zt(r)}}}),e.querySelectorAll("dialog, flowx-modal, flowx-dialog, flowx-confirm-dialog, flowx-sheet, flowx-bottom-sheet, flowx-lightbox").forEach(t=>{t.addEventListener("close",()=>Vt())}))}async function Ot(e,t,o){q=e;let r=document.querySelector(t)||e.ownerDocument.querySelector(t);if(!r){console.warn(`FlowX Dialog: Target element "${t}" not found.`);return}if(o)try{let i=await(await fetch(o)).text(),a=r.querySelector('[slot="body"], .modal-body, .dialog-content')||r.shadowRoot?.querySelector('[slot="body"], .modal-body, .dialog-content')||r;a.innerHTML=i,window.FlowX&&typeof window.FlowX.process=="function"&&window.FlowX.process(a)}catch(n){console.error(`FlowX Dialog: Failed to pre-fetch content from "${o}"`,n)}Nt(r)}function Nt(e){if(typeof e.openModal=="function")e.openModal();else if(typeof e.showModal=="function")try{e.showModal()}catch{e.setAttribute("open","")}else e.setAttribute("open","");if(!e._focusTrapCleanup&&typeof _=="function"){let t=_(e.shadowRoot||e);e._focusTrapCleanup=t.cleanup}}function zt(e){if(typeof e.closeModal=="function")e.closeModal();else if(typeof e.close=="function")try{e.close()}catch{e.removeAttribute("open")}else e.removeAttribute("open");e._focusTrapCleanup&&(e._focusTrapCleanup(),e._focusTrapCleanup=null),Vt()}function Vt(){if(q&&typeof q.focus=="function"){try{q.focus()}catch{}q=null}}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>Ct(document)):Ct(document));var st=class extends HTMLElement{static get observedAttributes(){return["open","fx-dialog-persistent"]}nativeDialog=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.syncNativeState()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;let t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.nativeDialog?.addEventListener("close",()=>this.removeAttribute("open")),this.nativeDialog?.addEventListener("cancel",()=>this.removeAttribute("open")),this.syncNativeState())}};customElements.get("flowx-dialog")||customElements.define("flowx-dialog",st);var lt=class extends HTMLElement{static get observedAttributes(){return["open","title","persistent"]}nativeDialog=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.syncNativeState()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;let t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}render(){if(!this.shadowRoot)return;let t=this.getAttribute("title")||"";this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
          <button type="button" class="close-btn" fx-dialog-close aria-label="Close modal">\u2715</button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.nativeDialog?.addEventListener("close",()=>this.removeAttribute("open")),this.nativeDialog?.addEventListener("cancel",()=>this.removeAttribute("open")),this.syncNativeState()}};customElements.get("flowx-modal")||customElements.define("flowx-modal",lt);var dt=class extends HTMLElement{static get observedAttributes(){return["open","message","title","confirm-label","cancel-label"]}nativeDialog=null;pendingRequestTrigger=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupGlobalGateListener()}attributeChangedCallback(){this.syncNativeState()}openModal(t){if(t&&(this.pendingRequestTrigger=t),this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;let t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}setupGlobalGateListener(){document.addEventListener("click",t=>{let r=t.target?.closest("[fx-confirm-target]");if(r){let n=r.getAttribute("fx-confirm-target");n&&(n===`#${this.id}`||n===this.id)&&(t.preventDefault(),t.stopPropagation(),this.openModal(r))}},!0)}handleUserChoice(t){if(this.closeModal(),this.dispatchEvent(new CustomEvent("fx-confirm",{bubbles:!0,composed:!0,detail:{confirmed:t}})),t&&this.pendingRequestTrigger){let o=this.pendingRequestTrigger.getAttribute("fx-delete"),r=this.pendingRequestTrigger.getAttribute("fx-post");o?fetch(o,{method:"DELETE"}).then(()=>{let n=this.pendingRequestTrigger?.getAttribute("fx-target");if(n){let i=document.querySelector(n);i&&i.remove()}}):r&&fetch(r,{method:"POST"}),this.pendingRequestTrigger=null}}render(){if(!this.shadowRoot)return;let t=this.getAttribute("title")||"Confirm Action",o=this.getAttribute("message")||"Are you sure you want to proceed?",r=this.getAttribute("confirm-label")||"Confirm",n=this.getAttribute("cancel-label")||"Cancel";this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
          <button type="button" class="btn-cancel" id="btn-cancel">${n}</button>
          <button type="button" class="btn-confirm" id="btn-confirm">${r}</button>
        </div>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.shadowRoot.querySelector("#btn-cancel")?.addEventListener("click",()=>this.handleUserChoice(!1)),this.shadowRoot.querySelector("#btn-confirm")?.addEventListener("click",()=>this.handleUserChoice(!0)),this.syncNativeState()}};customElements.get("flowx-confirm-dialog")||customElements.define("flowx-confirm-dialog",dt);var H=class extends HTMLElement{static get observedAttributes(){return["open","side","title"]}nativeDialog=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.syncNativeState()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;let t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}render(){if(!this.shadowRoot)return;let t=this.getAttribute("side")||"right",o=this.getAttribute("title")||"";this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
          <button type="button" class="close-btn" fx-dialog-close aria-label="Close sheet">\u2715</button>
        </div>
        <div class="sheet-body">
          <slot></slot>
        </div>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.syncNativeState()}};customElements.get("flowx-sheet")||customElements.define("flowx-sheet",H);var ct=class extends HTMLElement{static get observedAttributes(){return["open","title"]}nativeDialog=null;startY=0;currentY=0;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.syncNativeState()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;let t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}render(){if(!this.shadowRoot)return;let t=this.getAttribute("title")||"";this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog");let o=this.shadowRoot.querySelector("#drag-handle");o?.addEventListener("pointerdown",r=>{let n=r;this.startY=n.clientY,o.setPointerCapture(n.pointerId);let i=s=>{let l=s.clientY-this.startY;l>0&&this.nativeDialog&&(this.nativeDialog.style.transform=`translateY(${l}px)`)},a=s=>{let l=s.clientY-this.startY;o.releasePointerCapture(s.pointerId),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",a),l>80&&this.closeModal(),this.nativeDialog&&(this.nativeDialog.style.transform="")};window.addEventListener("pointermove",i),window.addEventListener("pointerup",a)}),this.syncNativeState()}};customElements.get("flowx-bottom-sheet")||customElements.define("flowx-bottom-sheet",ct);var pt=class extends HTMLElement{static get observedAttributes(){return["open","src","alt"]}nativeDialog=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupGlobalThumbnailListener()}attributeChangedCallback(){this.syncNativeState()}openWithSrc(t,o=""){this.setAttribute("src",t),this.setAttribute("alt",o),this.openModal()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;let t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}setupGlobalThumbnailListener(){document.addEventListener("click",t=>{let r=t.target?.closest("[data-lightbox-src]");if(r){let n=r.getAttribute("data-lightbox-src"),i=r.getAttribute("alt")||"";n&&(t.preventDefault(),this.openWithSrc(n,i))}})}render(){if(!this.shadowRoot)return;let t=this.getAttribute("src")||"",o=this.getAttribute("alt")||"";this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
          <button type="button" class="close-btn" fx-dialog-close aria-label="Close image">\u2715</button>
          ${t?`<img src="${t}" alt="${o}" />`:"<slot></slot>"}
          ${o?`<div class="caption">${o}</div>`:""}
        </div>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.syncNativeState()}};customElements.get("flowx-lightbox")||customElements.define("flowx-lightbox",pt);var D=class extends HTMLElement{static get observedAttributes(){return["open","src","alt"]}nativeDialog=null;galleryImages=[];currentIndex=0;zoomLevel=1;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupGalleryListener()}attributeChangedCallback(){this.syncNativeState()}openGallery(t,o=0){this.galleryImages=t,this.currentIndex=o,this.zoomLevel=1,this.galleryImages[o]&&(this.setAttribute("src",this.galleryImages[o].src),this.setAttribute("alt",this.galleryImages[o].alt||"")),this.openModal()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}prev(){this.galleryImages.length!==0&&(this.currentIndex=(this.currentIndex-1+this.galleryImages.length)%this.galleryImages.length,this.setAttribute("src",this.galleryImages[this.currentIndex].src),this.setAttribute("alt",this.galleryImages[this.currentIndex].alt||""),this.zoomLevel=1,this.render())}next(){this.galleryImages.length!==0&&(this.currentIndex=(this.currentIndex+1)%this.galleryImages.length,this.setAttribute("src",this.galleryImages[this.currentIndex].src),this.setAttribute("alt",this.galleryImages[this.currentIndex].alt||""),this.zoomLevel=1,this.render())}toggleZoom(){this.zoomLevel=this.zoomLevel===1?1.8:1;let t=this.shadowRoot?.querySelector("img");t&&(t.style.transform=`scale(${this.zoomLevel})`)}syncNativeState(){if(!this.nativeDialog)return;let t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}setupGalleryListener(){document.addEventListener("click",t=>{let r=t.target?.closest("[data-gallery-src]");if(r){let n=r.getAttribute("data-gallery"),i=r.getAttribute("data-gallery-src")||r.getAttribute("src");if(n&&i){let s=Array.from(document.querySelectorAll(`[data-gallery="${n}"]`)).map(d=>({src:d.getAttribute("data-gallery-src")||d.getAttribute("src")||"",alt:d.getAttribute("alt")||""})),l=s.findIndex(d=>d.src===i);t.preventDefault(),this.openGallery(s,Math.max(0,l))}}})}render(){if(!this.shadowRoot)return;let t=this.getAttribute("src")||"",o=this.getAttribute("alt")||"",r=this.galleryImages.length>1;this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
              <button type="button" class="btn" id="zoom-btn">\u{1F50D} Zoom</button>
              <button type="button" class="btn" fx-dialog-close>\u2715 Close</button>
            </div>
          </div>
          <div class="img-stage">
            ${r?'<button type="button" class="nav-btn prev-btn" id="prev-btn">\u25C0</button>':""}
            <img src="${t}" alt="${o}" id="viewer-img" />
            ${r?'<button type="button" class="nav-btn next-btn" id="next-btn">\u25B6</button>':""}
          </div>
        </div>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.shadowRoot.querySelector("#zoom-btn")?.addEventListener("click",()=>this.toggleZoom()),this.shadowRoot.querySelector("#viewer-img")?.addEventListener("click",()=>this.toggleZoom()),this.shadowRoot.querySelector("#prev-btn")?.addEventListener("click",()=>this.prev()),this.shadowRoot.querySelector("#next-btn")?.addEventListener("click",()=>this.next()),this.syncNativeState()}};customElements.get("flowx-image-viewer")||customElements.define("flowx-image-viewer",D);var ut=class extends HTMLElement{static get observedAttributes(){return["breakpoint","open"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}toggleMenu(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","")}render(){if(!this.shadowRoot)return;let t=this.getAttribute("breakpoint")||"768px",o=this.hasAttribute("open");this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
          <button type="button" class="hamburger-btn" id="toggle-btn" aria-label="Toggle menu">\u2630</button>
        </div>
      </div>
      <div class="mobile-menu">
        <slot name="mobile-nav"></slot>
        <slot></slot>
      </div>
    `,this.shadowRoot.querySelector("#toggle-btn")?.addEventListener("click",()=>this.toggleMenu())}};customElements.get("flowx-navbar")||customElements.define("flowx-navbar",ut);var ft=class extends HTMLElement{static get observedAttributes(){return["collapsed","persist"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.initPersistedState(),this.render()}attributeChangedCallback(){this.render()}toggleCollapse(){this.hasAttribute("collapsed")?(this.removeAttribute("collapsed"),this.savePersistedState(!1)):(this.setAttribute("collapsed",""),this.savePersistedState(!0))}initPersistedState(){let t=this.getAttribute("persist")||"cookie";if(t==="cookie"&&typeof document<"u"){let o=document.cookie.match(/(?:^|; )flowx_sidebar_collapsed=([^;]*)/);o&&o[1]==="true"&&this.setAttribute("collapsed","")}else t==="localStorage"&&typeof localStorage<"u"&&localStorage.getItem("flowx_sidebar_collapsed")==="true"&&this.setAttribute("collapsed","")}savePersistedState(t){let o=this.getAttribute("persist")||"cookie";o==="cookie"&&typeof document<"u"?document.cookie=`flowx_sidebar_collapsed=${t}; path=/; max-age=31536000`:o==="localStorage"&&typeof localStorage<"u"&&localStorage.setItem("flowx_sidebar_collapsed",String(t))}render(){if(!this.shadowRoot)return;let t=this.hasAttribute("collapsed");this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
          <button type="button" class="toggle-btn" id="toggle-btn" aria-label="Toggle sidebar">${t?"\u226B":"\u226A"}</button>
        </div>
        <div class="nav-content">
          <slot></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `,this.shadowRoot.querySelector("#toggle-btn")?.addEventListener("click",()=>this.toggleCollapse())}};customElements.get("flowx-sidebar")||customElements.define("flowx-sidebar",ft);var ht=class extends H{};customElements.get("flowx-drawer")||customElements.define("flowx-drawer",ht);var bt=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
    `)}};customElements.get("flowx-dock")||customElements.define("flowx-dock",bt);var gt=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
    `)}};customElements.get("flowx-bottom-navigation")||customElements.define("flowx-bottom-navigation",gt);f("flowx-menu-item",{observedAttributes:["value","disabled"],style:`
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
  `,setup(e,t){let o=t.querySelector(".trigger-slot"),r=t.querySelector(".menu-panel"),n=null,i=null,a=null,s=()=>{e.removeAttribute("open"),n&&(n(),n=null),i&&(i(),i=null),a&&(a(),a=null)},l=()=>{e.setAttribute("open","");let d=o.firstElementChild||o,c=e.getAttribute("placement")||"bottom";n=y(d,r,{placement:c,align:"start",offset:4}).cleanup,i=E(e,s).cleanup,a=k(r,"flowx-menu-item, .menu-item").cleanup};o.addEventListener("click",d=>{d.stopPropagation(),e.hasAttribute("open")?s():l()}),e.addEventListener("click",d=>{let c=d.target;c!==e&&(c.tagName.toLowerCase()==="flowx-menu-item"||c.classList.contains("menu-item"))&&s()})}});var mt=class extends HTMLElement{static get observedAttributes(){return["open","for"]}outsideCleanup=null;rovingCleanup=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupContextMenuListener()}disconnectedCallback(){this.cleanup()}openAt(t,o){this.setAttribute("open",""),this.render();let r=this.shadowRoot?.querySelector(".menu-panel");if(r){r.style.left=`${t}px`,r.style.top=`${o}px`;let n=E(this,()=>this.close());this.outsideCleanup=n.cleanup;let i=k(r,".menu-item");this.rovingCleanup=i.cleanup}}close(){this.removeAttribute("open"),this.cleanup(),this.render()}cleanup(){this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null),this.rovingCleanup&&(this.rovingCleanup(),this.rovingCleanup=null)}setupContextMenuListener(){let t=this.getAttribute("for");(t?document.querySelector(`#${t}`)||document.querySelector(t):document.body)?.addEventListener("contextmenu",r=>{let n=r;n.preventDefault(),this.openAt(n.clientX,n.clientY)})}render(){if(!this.shadowRoot)return;let t=this.hasAttribute("open");this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
    `}};customElements.get("flowx-context-menu")||customElements.define("flowx-context-menu",mt);var vt=class extends HTMLElement{static get observedAttributes(){return["open","trigger-event"]}outsideCleanup=null;positionerCleanup=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}disconnectedCallback(){this.cleanup()}async open(){this.setAttribute("open",""),this.render();let t=this.querySelector('[slot="trigger"]'),o=this.shadowRoot?.querySelector(".mega-panel");if(t&&t.hasAttribute("fx-get")&&!t.hasAttribute("data-loaded")){t.setAttribute("data-loaded","true");let r=t.getAttribute("fx-get");if(r)try{let i=await(await fetch(r)).text(),a=this.shadowRoot?.querySelector(".mega-content");a&&(a.innerHTML=i)}catch(n){console.error("FlowX MegaMenu: Lazy load error",n)}}if(t&&o){let r=y(t,o,{placement:"bottom",align:"start",offset:8});this.positionerCleanup=r.cleanup;let n=E(this,()=>this.close());this.outsideCleanup=n.cleanup}}close(){this.removeAttribute("open"),this.cleanup(),this.render()}cleanup(){this.outsideCleanup&&(this.outsideCleanup(),this.outsideCleanup=null),this.positionerCleanup&&(this.positionerCleanup(),this.positionerCleanup=null)}render(){if(!this.shadowRoot)return;let t=this.hasAttribute("open");this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
    `,this.shadowRoot.querySelector(".trigger-wrapper")?.addEventListener("click",()=>{this.hasAttribute("open")?this.close():this.open()})}};customElements.get("flowx-mega-menu")||customElements.define("flowx-mega-menu",vt);var xt=class extends HTMLElement{static get observedAttributes(){return["open","shortcut","fx-endpoint"]}nativeDialog=null;timer=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupGlobalShortcutListener()}attributeChangedCallback(){this.syncNativeState()}openModal(){if(this.setAttribute("open",""),this.nativeDialog&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}}closeModal(){if(this.removeAttribute("open"),this.nativeDialog&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}syncNativeState(){if(!this.nativeDialog)return;let t=this.hasAttribute("open");if(t&&!this.nativeDialog.open)try{this.nativeDialog.showModal()}catch{this.nativeDialog.setAttribute("open","")}else if(!t&&this.nativeDialog.open)try{this.nativeDialog.close()}catch{this.nativeDialog.removeAttribute("open")}}setupGlobalShortcutListener(){window.addEventListener("keydown",t=>{(t.metaKey||t.ctrlKey)&&t.key.toLowerCase()==="k"&&(t.preventDefault(),this.hasAttribute("open")?this.closeModal():this.openModal())})}performSearch(t){let o=this.getAttribute("fx-endpoint")||this.getAttribute("fx-get"),r=this.shadowRoot?.querySelector("#results");if(!r)return;if(!o){Array.from(r.querySelectorAll(".cmd-item")).forEach(a=>{let s=a.textContent?.toLowerCase()||"";a.style.display=s.includes(t.toLowerCase())?"":"none"});return}let n=o.includes("?")?`${o}&q=${encodeURIComponent(t)}`:`${o}?q=${encodeURIComponent(t)}`;fetch(n).then(i=>i.text()).then(i=>{r.innerHTML=i,window.FlowX&&typeof window.FlowX.process=="function"&&window.FlowX.process(r),k(r,".cmd-item, button, a")})}render(){if(!this.shadowRoot)return;this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
          <span class="search-icon">\u{1F50D}</span>
          <input type="search" id="cmd-input" placeholder="Type a command or search\u2026" autofocus />
          <span class="shortcut-badge">ESC</span>
        </div>
        <div class="results-container" id="results">
          <slot></slot>
        </div>
      </dialog>
    `,this.nativeDialog=this.shadowRoot.querySelector("dialog"),this.nativeDialog?.addEventListener("close",()=>this.removeAttribute("open"));let t=this.shadowRoot.querySelector("#cmd-input");t?.addEventListener("input",()=>{clearTimeout(this.timer),this.timer=setTimeout(()=>{this.performSearch(t.value.trim())},250)}),this.syncNativeState()}};customElements.get("flowx-command-palette")||customElements.define("flowx-command-palette",xt);var wt=class extends HTMLElement{static get observedAttributes(){return["src","alt","blur-src","loading"]}imgEl=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){if(!this.shadowRoot)return;let t=this.getAttribute("src")||"",o=this.getAttribute("alt")||"",r=this.getAttribute("blur-src")||"",n=this.getAttribute("loading")||"lazy";this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
        <img id="img" src="${t}" alt="${o}" loading="${n}" class="${r?"blur":""}" />
      </div>
    `,this.imgEl=this.shadowRoot.querySelector("#img");let i=this.shadowRoot.querySelector("#skeleton");this.imgEl&&(this.imgEl.complete&&this.imgEl.naturalHeight!==0?this.onImageLoaded(i):(this.imgEl.addEventListener("load",()=>this.onImageLoaded(i)),this.imgEl.addEventListener("error",()=>{i&&(i.style.display="none"),this.imgEl&&(this.imgEl.style.opacity="1")})))}onImageLoaded(t){t&&(t.style.display="none"),this.imgEl&&(this.imgEl.classList.remove("blur"),this.imgEl.classList.add("loaded"))}};customElements.get("flowx-image")||customElements.define("flowx-image",wt);var yt=class extends HTMLElement{viewer=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupGalleryClickListeners()}setupGalleryClickListeners(){this.shadowRoot?.querySelector("slot")?.addEventListener("slotchange",()=>this.bindClickEvents()),this.bindClickEvents()}bindClickEvents(){let t=Array.from(this.querySelectorAll("img, flowx-image")),o=t.map(r=>({src:r.getAttribute("src")||r.getAttribute("data-src")||"",alt:r.getAttribute("alt")||""}));t.forEach((r,n)=>{r.style.cursor="pointer",r.onclick=i=>{i.preventDefault(),this.openGalleryViewer(o,n)}})}openGalleryViewer(t,o){this.viewer||(this.viewer=new D,document.body.appendChild(this.viewer)),this.viewer.openGallery(t,o)}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        ${h}
        :host { display: block; font-family: var(--flowx-font-family); }
        .gallery-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 16px; width: 100%;
        }
      </style>
      <div class="gallery-grid">
        <slot></slot>
      </div>
    `)}};customElements.get("flowx-gallery")||customElements.define("flowx-gallery",yt);var Et=class extends HTMLElement{static get observedAttributes(){return["autoplay","interval"]}activeIndex=0;autoplayTimer=null;isPointerDown=!1;startX=0;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupSwipeGestures(),this.initAutoplay()}disconnectedCallback(){this.stopAutoplay()}attributeChangedCallback(){this.initAutoplay()}nextSlide(){let t=this.getSlides();t.length&&(this.activeIndex=(this.activeIndex+1)%t.length,this.scrollToActiveSlide())}prevSlide(){let t=this.getSlides();t.length&&(this.activeIndex=(this.activeIndex-1+t.length)%t.length,this.scrollToActiveSlide())}goToSlide(t){let o=this.getSlides();t>=0&&t<o.length&&(this.activeIndex=t,this.scrollToActiveSlide())}getSlides(){let t=this.shadowRoot?.querySelector("slot");return t?t.assignedElements():[]}scrollToActiveSlide(){let t=this.shadowRoot?.querySelector(".track"),o=this.getSlides();t&&o[this.activeIndex]&&o[this.activeIndex].scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"}),this.updateDots()}initAutoplay(){this.stopAutoplay();let t=this.hasAttribute("autoplay"),o=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(t&&!o){let r=Number(this.getAttribute("interval"))||4e3;this.autoplayTimer=setInterval(()=>this.nextSlide(),r)}}stopAutoplay(){this.autoplayTimer&&(clearInterval(this.autoplayTimer),this.autoplayTimer=null)}setupSwipeGestures(){let t=this.shadowRoot?.querySelector(".track");t&&(t.addEventListener("pointerdown",o=>{this.isPointerDown=!0,this.startX=o.clientX}),t.addEventListener("pointerup",o=>{if(!this.isPointerDown)return;this.isPointerDown=!1;let r=o.clientX-this.startX;r<-40?this.nextSlide():r>40&&this.prevSlide()}))}updateDots(){Array.from(this.shadowRoot?.querySelectorAll(".dot")||[]).forEach((o,r)=>{r===this.activeIndex?o.classList.add("active"):o.classList.remove("active")})}render(){if(!this.shadowRoot)return;let t=this.children.length,o="";for(let r=0;r<t;r++)o+=`<button type="button" class="dot ${r===0?"active":""}" data-idx="${r}" aria-label="Go to slide ${r+1}"></button>`;this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
        <button type="button" class="nav-btn prev" id="prev-btn" aria-label="Previous slide">\u2039</button>
        <div class="track">
          <slot></slot>
        </div>
        <button type="button" class="nav-btn next" id="next-btn" aria-label="Next slide">\u203A</button>
        <div class="dots-container" id="dots">
          ${o}
        </div>
      </div>
    `,this.shadowRoot.querySelector("#prev-btn")?.addEventListener("click",()=>this.prevSlide()),this.shadowRoot.querySelector("#next-btn")?.addEventListener("click",()=>this.nextSlide()),this.shadowRoot.querySelectorAll(".dot").forEach(r=>{r.addEventListener("click",n=>{let i=Number(n.target.getAttribute("data-idx"));this.goToSlide(i)})})}};customElements.get("flowx-carousel")||customElements.define("flowx-carousel",Et);var At=class extends HTMLElement{videoEl=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupVideoControls()}togglePlay(){this.videoEl&&(this.videoEl.paused?this.videoEl.play():this.videoEl.pause())}toggleFullscreen(){this.videoEl&&(document.fullscreenElement?document.exitFullscreen():this.videoEl.requestFullscreen&&this.videoEl.requestFullscreen())}setupVideoControls(){this.shadowRoot?.querySelector("slot")?.addEventListener("slotchange",()=>this.bindNativeVideo()),this.bindNativeVideo()}bindNativeVideo(){if(this.videoEl=this.querySelector("video")||this.shadowRoot?.querySelector("video")||null,this.videoEl){this.videoEl.controls=!1;let t=this.shadowRoot?.querySelector("#play-btn"),o=this.shadowRoot?.querySelector("#progress");this.videoEl.addEventListener("play",()=>{t&&(t.textContent="\u23F8")}),this.videoEl.addEventListener("pause",()=>{t&&(t.textContent="\u25B6")}),this.videoEl.addEventListener("timeupdate",()=>{o&&this.videoEl&&this.videoEl.duration&&(o.value=String(this.videoEl.currentTime/this.videoEl.duration*100))})}}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
          <button type="button" class="ctrl-btn" id="play-btn" aria-label="Play or pause">\u25B6</button>
          <input type="range" id="progress" min="0" max="100" value="0" />
          <button type="button" class="ctrl-btn" id="fullscreen-btn" aria-label="Toggle Fullscreen">\u26F6</button>
        </div>
      </div>
    `,this.shadowRoot.querySelector("#play-btn")?.addEventListener("click",()=>this.togglePlay()),this.shadowRoot.querySelector("#fullscreen-btn")?.addEventListener("click",()=>this.toggleFullscreen()),this.shadowRoot.querySelector("#progress")?.addEventListener("input",t=>{let o=Number(t.target.value);this.videoEl&&this.videoEl.duration&&(this.videoEl.currentTime=o/100*this.videoEl.duration)}))}};customElements.get("flowx-video-player")||customElements.define("flowx-video-player",At);var kt=class extends HTMLElement{audioEl=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.bindNativeAudio()}togglePlay(){this.audioEl&&(this.audioEl.paused?this.audioEl.play():this.audioEl.pause())}bindNativeAudio(){if(this.audioEl=this.querySelector("audio")||this.shadowRoot?.querySelector("audio")||null,this.audioEl){this.audioEl.controls=!1;let t=this.shadowRoot?.querySelector("#play-btn"),o=this.shadowRoot?.querySelector("#progress");this.audioEl.addEventListener("play",()=>{t&&(t.textContent="\u23F8")}),this.audioEl.addEventListener("pause",()=>{t&&(t.textContent="\u25B6")}),this.audioEl.addEventListener("timeupdate",()=>{o&&this.audioEl&&this.audioEl.duration&&(o.value=String(this.audioEl.currentTime/this.audioEl.duration*100))})}}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
        <button type="button" class="ctrl-btn" id="play-btn" aria-label="Play or pause audio">\u25B6</button>
        <input type="range" id="progress" min="0" max="100" value="0" />
      </div>
    `,this.shadowRoot.querySelector("#play-btn")?.addEventListener("click",()=>this.togglePlay()),this.shadowRoot.querySelector("#progress")?.addEventListener("input",t=>{let o=Number(t.target.value);this.audioEl&&this.audioEl.duration&&(this.audioEl.currentTime=o/100*this.audioEl.duration)}))}};customElements.get("flowx-audio-player")||customElements.define("flowx-audio-player",kt);var Lt=class extends HTMLElement{static get observedAttributes(){return["src","zoom"]}zoomLevel=100;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}zoomIn(){this.zoomLevel=Math.min(200,this.zoomLevel+25),this.updateZoom()}zoomOut(){this.zoomLevel=Math.max(50,this.zoomLevel-25),this.updateZoom()}updateZoom(){let t=this.shadowRoot?.querySelector("embed");t&&(t.style.transform=`scale(${this.zoomLevel/100})`)}render(){if(!this.shadowRoot)return;let t=this.getAttribute("src")||"";this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
          <span style="font-size:13px;color:#c9d1d9">\u{1F4C4} Document Viewer</span>
          <div style="display:flex;gap:6px">
            <button type="button" class="btn" id="zoom-out">-</button>
            <button type="button" class="btn" id="zoom-in">+</button>
            <a href="${t}" download class="btn" style="text-decoration:none">\u2B07 Download</a>
          </div>
        </div>
        <div class="frame-wrapper">
          <object data="${t}" type="application/pdf" width="100%" height="100%">
            <embed src="${t}" type="application/pdf" />
            <p style="color:#fff;padding:20px">Your browser does not support PDF embedding. <a href="${t}" style="color:#58a6ff">Download PDF</a></p>
          </object>
        </div>
      </div>
    `,this.shadowRoot.querySelector("#zoom-in")?.addEventListener("click",()=>this.zoomIn()),this.shadowRoot.querySelector("#zoom-out")?.addEventListener("click",()=>this.zoomOut())}};customElements.get("flowx-pdf-viewer")||customElements.define("flowx-pdf-viewer",Lt);var Mt=class extends HTMLElement{static get observedAttributes(){return["src"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}parseMarkdown(t){return t?`<p>${t.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"").replace(/on\w+="[^"]*"/gi,"").replace(/javascript:/gi,"").replace(/^### (.*$)/gim,"<h3>$1</h3>").replace(/^## (.*$)/gim,"<h2>$1</h2>").replace(/^# (.*$)/gim,"<h1>$1</h1>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/```([\s\S]*?)```/g,"<pre><code>$1</code></pre>").replace(/`([^`]+)`/g,"<code>$1</code>").replace(/!\[(.*?)\]\((.*?)\)/g,'<img src="$2" alt="$1" style="max-width:100%" />').replace(/\[(.*?)\]\((.*?)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>').replace(/^\* (.*$)/gim,"<li>$1</li>").replace(/<\/li>\n<li>/g,"</li><li>").replace(/\n\n/g,"</p><p>")}</p>`:""}async render(){if(!this.shadowRoot)return;let t=this.textContent||"",o=this.getAttribute("src")||this.getAttribute("fx-get");if(o)try{t=await(await fetch(o)).text()}catch(n){console.error("FlowX Markdown: Fetch error",n)}let r=this.parseMarkdown(t);this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
    `}};customElements.get("flowx-markdown-viewer")||customElements.define("flowx-markdown-viewer",Mt);var St=class extends HTMLElement{static get observedAttributes(){return["lang","line-numbers"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}highlightCode(t,o){if(!t)return"";let r=t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return o==="html"||o==="xml"?r=r.replace(/(&lt;\/?[a-z0-9-]+)/gi,'<span class="keyword">$1</span>').replace(/([a-z-]+)=("[^"]*")/gi,'<span class="attr">$1</span>=<span class="string">$2</span>'):(r=r.replace(/\b(const|let|var|function|return|if|else|import|export|class|from|extends|interface|type)\b/g,'<span class="keyword">$1</span>'),r=r.replace(/("[^"]*"|'[^']*'|`[^`]*`)/g,'<span class="string">$1</span>'),r=r.replace(/(\/\/[^\n]*)/g,'<span class="comment">$1</span>'),r=r.replace(/\b(\d+)\b/g,'<span class="number">$1</span>')),r}render(){if(!this.shadowRoot)return;let t=this.getAttribute("lang")||"js",o=this.textContent||"",r=this.highlightCode(o.trim(),t);this.shadowRoot.innerHTML=`
      <style>
        ${h}
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
    `}};customElements.get("flowx-code-viewer")||customElements.define("flowx-code-viewer",St);function fe(){return"(function(){try{var c=document.cookie.match(/(?:^|; )flowx-theme=([^;]*)/);var t=c?decodeURIComponent(c[1]):localStorage.getItem('flowx-theme')||'auto';if(t==='auto'){var d=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme','auto');}else{document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();"}function he(e,t,o=365,r="/"){let n=new Date(Date.now()+o*864e5).toUTCString();document.cookie=`${e}=${encodeURIComponent(t)}; expires=${n}; path=${r}; SameSite=Lax`}function be(e){if(typeof document>"u"||!document.cookie)return null;let t=document.cookie.match(new RegExp("(?:^|; )"+e.replace(/([.$?*|{}()[\]\\/+^])/g,"\\$1")+"=([^;]*)"));return t?decodeURIComponent(t[1]):null}var Ht={light:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',dark:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',auto:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'},Dt={light:"Light",dark:"Dark",auto:"Auto"},ge=f("flowx-theme-toggle",{observedAttributes:["theme","cookie-name"],style:`
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
  `,template:e=>{let t=e._mode||"auto",o=Dt[t]||"Auto",r=Ht[t]||Ht.auto;return`
      <button class="toggle-btn" type="button" aria-label="Theme toggle: current theme is ${o}">
        <span class="icon">${r}</span>
        <span class="label">${o}</span>
        <span class="badge">Theme</span>
      </button>
    `},setup:e=>{let t=e.getAttribute("cookie-name")||"flowx-theme",o=be(t),r=typeof localStorage<"u"?localStorage.getItem(t):null,i=e.getAttribute("theme")||o||r||"auto";e._mode=i;let a=d=>{let c=e.shadowRoot||e,u=c.querySelector(".toggle-btn"),p=c.querySelector(".icon"),g=c.querySelector(".label");u&&u.setAttribute("aria-label",`Theme toggle: current theme is ${Dt[d]}`),p&&(p.innerHTML=Ht[d]),g&&(g.textContent=Dt[d])},s=d=>{e._mode=d,document.documentElement.setAttribute("data-theme",d),he(t,d),typeof localStorage<"u"&&localStorage.setItem(t,d);let c=d==="auto"?typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":d;a(d),e.dispatchEvent(new CustomEvent("flowx-theme-change",{bubbles:!0,composed:!0,detail:{theme:d,effectiveTheme:c}}))};document.documentElement.hasAttribute("data-theme")||document.documentElement.setAttribute("data-theme",i),a(i),(e.shadowRoot||e).addEventListener("click",d=>{if(!d.target.closest(".toggle-btn"))return;let u=["light","dark","auto"],p=u.indexOf(e._mode||"auto"),g=u[(p+1)%u.length];s(g)}),typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{e._mode==="auto"&&s("auto")})}});var me=f("flowx-container",{observedAttributes:["size","centered"],style:`
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
  `,template:e=>`<div class="container size-${e.getAttribute("size")||"lg"}"><slot></slot></div>`});var ve=f("flowx-grid",{observedAttributes:["cols","cols-sm","cols-md","cols-lg","gap"],style:`
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
  `,template:e=>{let t=e.getAttribute("cols")||"1",o=e.getAttribute("cols-sm")||t,r=e.getAttribute("cols-md")||o,n=e.getAttribute("cols-lg")||r,a=`var(--flowx-space-${e.getAttribute("gap")||"4"}, 16px)`;return`
      <div 
        class="grid" 
        style="--cols-base: ${t}; --cols-sm: ${o}; --cols-md: ${r}; --cols-lg: ${n}; --grid-gap: ${a};"
      >
        <slot></slot>
      </div>
    `}});var xe=f("flowx-stack",{observedAttributes:["direction","gap","align","justify","wrap"],style:`
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
  `,template:e=>{let t=e.getAttribute("direction")||"column",o=e.getAttribute("gap")||"3",r=e.getAttribute("align")||"stretch",n=e.getAttribute("justify")||"flex-start",i=e.hasAttribute("wrap"),a=`var(--flowx-space-${o}, 12px)`,s={start:"flex-start",end:"flex-end",center:"center",stretch:"stretch",baseline:"baseline"},l={start:"flex-start",end:"flex-end",center:"center",between:"space-between",around:"space-around",evenly:"space-evenly"},d=s[r]||r,c=l[n]||n;return`
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
    `}});var we=f("flowx-split-pane",{observedAttributes:["direction","persist","storage-key","initial-split"],style:`
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
  `,template:e=>{let t=e.getAttribute("direction")||"horizontal",o=e.getAttribute("storage-key")||"flowx-split-ratio",r=e.hasAttribute("persist"),n=parseFloat(e.getAttribute("initial-split")||"50");if(r&&typeof localStorage<"u"){let i=localStorage.getItem(o);if(i){let a=parseFloat(i);isNaN(a)||(n=a)}}return e._ratio=n,`
      <div class="split-container ${t}">
        <div class="pane pane-1" style="--pane-size: ${n}%">
          <slot name="pane-1"></slot>
        </div>
        <div class="divider" tabIndex="0" role="separator" aria-valuenow="${n}"></div>
        <div class="pane pane-2">
          <slot name="pane-2"></slot>
        </div>
      </div>
    `},setup:e=>{let t=e.shadowRoot||e,o=t.querySelector(".divider"),r=t.querySelector(".pane-1"),n=t.querySelector(".split-container");if(!o||!n||!r)return;let i=!1,a=d=>{i=!0,o.classList.add("dragging"),o.setPointerCapture(d.pointerId),d.preventDefault()},s=d=>{if(!i)return;let c=n.getBoundingClientRect(),u=e.getAttribute("direction")==="vertical",p=50;if(u?p=(d.clientY-c.top)/c.height*100:p=(d.clientX-c.left)/c.width*100,p=Math.max(10,Math.min(90,p)),e._ratio=p,r.style.setProperty("--pane-size",`${p}%`),o.setAttribute("aria-valuenow",String(Math.round(p))),e.hasAttribute("persist")&&typeof localStorage<"u"){let g=e.getAttribute("storage-key")||"flowx-split-ratio";localStorage.setItem(g,String(p))}e.dispatchEvent(new CustomEvent("fx-resize",{bubbles:!0,composed:!0,detail:{ratio:p}}))},l=d=>{if(i){i=!1,o.classList.remove("dragging");try{o.releasePointerCapture(d.pointerId)}catch{}}};o.addEventListener("pointerdown",a),o.addEventListener("pointermove",s),o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l)}});var ye=f("flowx-resizable-panel",{observedAttributes:["handles","min-width","max-width","min-height","max-height"],style:`
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
  `,template:e=>{let o=(e.getAttribute("handles")||"right,bottom").split(",").map(n=>n.trim().toLowerCase()),r="";return o.includes("right")&&(r+='<div class="handle handle-right" data-edge="right"></div>'),o.includes("bottom")&&(r+='<div class="handle handle-bottom" data-edge="bottom"></div>'),o.includes("left")&&(r+='<div class="handle handle-left" data-edge="left"></div>'),o.includes("top")&&(r+='<div class="handle handle-top" data-edge="top"></div>'),`
      <div class="panel">
        <slot></slot>
        ${r}
      </div>
    `},setup:e=>{(e.shadowRoot||e).querySelectorAll(".handle").forEach(r=>{let n=!1,i=0,a=0,s=0,l=0,d=r.getAttribute("data-edge"),c=g=>{let b=g;n=!0,r.classList.add("dragging"),r.setPointerCapture(b.pointerId);let m=e.getBoundingClientRect();i=b.clientX,a=b.clientY,s=m.width,l=m.height,b.preventDefault()},u=g=>{if(!n)return;let b=g,m=b.clientX-i,x=b.clientY-a,v=s,w=l,F=parseFloat(e.getAttribute("min-width")||"100"),$=parseFloat(e.getAttribute("max-width")||"2000"),It=parseFloat(e.getAttribute("min-height")||"100"),Rt=parseFloat(e.getAttribute("max-height")||"2000");d==="right"&&(v=Math.max(F,Math.min($,s+m))),d==="bottom"&&(w=Math.max(It,Math.min(Rt,l+x))),d==="left"&&(v=Math.max(F,Math.min($,s-m))),d==="top"&&(w=Math.max(It,Math.min(Rt,l-x))),e.style.width=`${v}px`,e.style.height=`${w}px`,e.dispatchEvent(new CustomEvent("fx-resize",{bubbles:!0,composed:!0,detail:{width:v,height:w,edge:d}}))},p=g=>{if(n){n=!1,r.classList.remove("dragging");try{r.releasePointerCapture(g.pointerId)}catch{}}};r.addEventListener("pointerdown",c),r.addEventListener("pointermove",u),r.addEventListener("pointerup",p),r.addEventListener("pointercancel",p)})}});var Ee=f("flowx-responsive-layout",{observedAttributes:["breakpoint","collapsed"],style:`
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
    `,setup:e=>{typeof ResizeObserver<"u"&&new ResizeObserver(o=>{for(let r of o){let n=r.contentRect.width,i=parseFloat(e.getAttribute("breakpoint")||"768"),a=n<i,s=e.hasAttribute("collapsed");e.setAttribute("data-compact",String(a)),e.dispatchEvent(new CustomEvent("fx-layout-change",{bubbles:!0,composed:!0,detail:{width:n,isCompact:a,isCollapsed:s}}))}}).observe(e)}});var Ae=f("flowx-masonry",{observedAttributes:["cols","gap"],style:`
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
  `,template:e=>{let t=e.getAttribute("cols")||"3",r=`var(--flowx-space-${e.getAttribute("gap")||"4"}, 16px)`;return`
      <div class="masonry-wrapper" style="--masonry-cols: ${t}; --masonry-gap: ${r};">
        <slot></slot>
      </div>
    `},setup:e=>{let t=(e.shadowRoot||e).querySelector(".masonry-wrapper");if(!t)return;if(!(typeof CSS<"u"&&CSS.supports&&(CSS.supports("grid-template-rows","masonry")||CSS.supports("grid-rows","masonry")))){let r=()=>{let n=t.querySelector("slot"),i=n?n.assignedElements():Array.from(t.children);if(!i.length)return;let a=parseInt(e.getAttribute("cols")||"3",10),s=parseInt(e.getAttribute("gap")||"4",10)*4,d=((t.getBoundingClientRect().width||800)-s*(a-1))/a,c=new Array(a).fill(0);i.forEach(u=>{let p=u,g=0;for(let v=1;v<a;v++)c[v]<c[g]&&(g=v);let b=g*(d+s),m=c[g];p.style.position="absolute",p.style.width=`${d}px`,p.style.left=`${b}px`,p.style.top=`${m}px`;let x=p.getBoundingClientRect().height||100;c[g]+=x+s}),t.style.height=`${Math.max(...c)}px`,t.style.display="block"};setTimeout(r,50),typeof ResizeObserver<"u"&&new ResizeObserver(r).observe(e)}}});var ke=f("flowx-dashboard-layout",{observedAttributes:["sidebar-width","right-panel"],style:`
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
  `,template:e=>{let t=e.getAttribute("sidebar-width")||"240px",o=e.hasAttribute("right-panel");return`
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
    `}});var Le=f("flowx-notifications",{observedAttributes:["unread-count","fx-sse-connect","sse-event"],style:`
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
  `,template:e=>{let t=e._isOpen||!1,o=e._items||[],r=o.filter(i=>i.unread).length,n=o.length===0?'<div class="empty-state">No notifications</div>':o.map(i=>`
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
          ${n}
        </ul>
      </div>
    `},setup:e=>{e._items=e._items||[{id:"1",title:"System Welcome",message:"FlowX Real-time Engine initialized",time:"1m ago",unread:!0}],e._isOpen=!1,e.render(),(e.shadowRoot||e).addEventListener("click",r=>{let n=r.target,i=n.closest(".bell-btn"),a=n.closest(".mark-read-btn");i?(e._isOpen=!e._isOpen,e.render()):a&&(e._items=e._items.map(s=>({...s,unread:!1})),e.render())});let o=e.getAttribute("fx-sse-connect");if(o&&typeof window<"u"&&window.EventSource)try{let r=new EventSource(o),n=e.getAttribute("sse-event")||"notification";r.addEventListener(n,i=>{try{let a=JSON.parse(i.data),s={id:a.id||`notif-${Date.now()}`,title:a.title||"New Notification",message:a.message||"",time:"Just now",unread:!0};e._items=[s,...e._items],e.dispatchEvent(new CustomEvent("fx-notification-receive",{detail:s,bubbles:!0})),e.render()}catch{}}),e._eventSource=r}catch{}}});var Me=f("flowx-chat-window",{observedAttributes:["fx-post","fx-ws-connect","fx-sse-connect","current-user"],style:`
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
  `,template:e=>{let t=e._messages||[],o=t.map(r=>`
      <div class="msg-group ${r.isSelf?"self":""}" data-id="${r.id}">
        <div class="avatar">${r.sender?r.sender.charAt(0).toUpperCase():"U"}</div>
        <div>
          <div class="msg-bubble">${r.text}</div>
          <div class="msg-meta" style="text-align: ${r.isSelf?"right":"left"}">${r.sender} \u2022 ${r.time||"Just now"}</div>
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
    `},setup:e=>{e._messages=e._messages||[{id:"m-1",sender:"Bot",text:"Welcome to the collaborative room!",isSelf:!1,time:"10:00 AM"}];let t=e.getAttribute("current-user")||"You",o=e.shadowRoot||e,r=i=>{i.scrollTop+i.clientHeight<i.scrollHeight-40||(i.scrollTop=i.scrollHeight)};e.addMessage=i=>{let a=i.sender===t||i.isSelf===!0,s={...i,isSelf:a};if(!e._messages.some(d=>d.id===s.id||d.sender===s.sender&&d.text===s.text&&Math.abs(d._timestamp-Date.now())<5e3)){e._messages=[...e._messages,s],e.render();let d=o.querySelector(".messages-container");d&&r(d)}},o.addEventListener("submit",i=>{i.preventDefault();let a=o.querySelector(".chat-input");if(!a||!a.value.trim())return;let s=a.value.trim();a.value="";let l={id:`msg-${Date.now()}`,sender:t,text:s,isSelf:!0,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),_timestamp:Date.now()};e.addMessage(l),e.dispatchEvent(new CustomEvent("fx-message-send",{detail:l,bubbles:!0})),e._ws&&e._ws.readyState===WebSocket.OPEN&&e._ws.send(JSON.stringify(l))});let n=e.getAttribute("fx-sse-connect");if(n&&typeof window<"u"&&window.EventSource)try{let i=new EventSource(n);i.addEventListener("chat",a=>{try{let s=JSON.parse(a.data);e.addMessage(s)}catch{}}),e._eventSource=i}catch{}}});function jt(e){let t=0;for(let o of e)t+=1,o.replies&&(t+=jt(o.replies));return t}var Se=f("flowx-comments",{observedAttributes:["fx-post","fx-sse-connect","current-user"],style:`
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
  `,template:e=>{let t=e._comments||[],o=e._replyingToId,r=n=>n.map(i=>`
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
          <span>Discussion (${jt(t)})</span>
        </div>

        <div class="comments-tree">
          ${r(t)}
        </div>

        <form class="new-comment-form main-form">
          <textarea class="comment-textarea main-input" placeholder="Add a comment..." required></textarea>
          <button class="submit-btn" type="submit">Post Comment</button>
        </form>
      </div>
    `},setup:e=>{e._comments=e._comments||[{id:"c-1",author:"Alice",content:"Great architectural baseline for real-time widgets!",time:"10m ago",replies:[{id:"c-2",author:"Bob",content:"Agreed, SSE integration simplifies live updates.",parentId:"c-1",time:"5m ago"}]}],e.render();let t=e.getAttribute("current-user")||"You";e.addComment=r=>{if(!r.parentId)e._comments=[...e._comments,r];else{let n=i=>i.map(a=>a.id===r.parentId?{...a,replies:[...a.replies||[],r]}:a.replies?{...a,replies:n(a.replies)}:a);e._comments=n(e._comments)}e._replyingToId=null,e.render()};let o=e.shadowRoot||e;o.addEventListener("click",r=>{let n=r.target;if(n.classList.contains("reply-btn")){let i=n.getAttribute("data-reply-id");e._replyingToId=e._replyingToId===i?null:i,e.render()}}),o.addEventListener("submit",r=>{r.preventDefault();let n=r.target,i=n.querySelector(".comment-textarea");if(!i||!i.value.trim())return;let a=n.getAttribute("data-parent-id")||null,s={id:`c-${Date.now()}`,author:t,content:i.value.trim(),parentId:a,time:"Just now",replies:[]};e.addComment(s),e.dispatchEvent(new CustomEvent("fx-comment-submit",{detail:s,bubbles:!0}))})}});var Te=f("flowx-mention",{observedAttributes:["search-url","debounce-ms"],style:`
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
  `,template:e=>{let t=e._isOpen||!1,o=e._users||[],r=e._activeIdx||0,n=o.length===0?'<li class="mention-item" style="color: var(--flowx-color-text-muted);">No users found</li>':o.map((i,a)=>`
        <li class="mention-item ${a===r?"active":""}" data-id="${i.id}" data-username="${i.username}">
          <span class="user-avatar">${i.username.charAt(0).toUpperCase()}</span>
          <span>@${i.username}</span>
          ${i.name?`<span style="font-size: 11px; color: var(--flowx-color-text-muted); margin-left: auto;">${i.name}</span>`:""}
        </li>
      `).join("");return`
      <slot></slot>
      <ul class="popup-list ${t?"open":""}" style="left: ${e._popupX||0}px; top: ${e._popupY||35}px;">
        ${n}
      </ul>
    `},setup:e=>{e._users=[],e._isOpen=!1,e._activeIdx=0,e._searchQuery="";let t=[{id:"u1",username:"alice",name:"Alice Vance"},{id:"u2",username:"bob",name:"Bob Smith"},{id:"u3",username:"charlie",name:"Charlie Brown"},{id:"u4",username:"diana",name:"Diana Prince"}],o=e.shadowRoot||e,r=null,n=l=>l&&l.tagName&&["TEXTAREA","INPUT"].includes(l.tagName)?l:e.querySelector("textarea, input")||o.querySelector("textarea, input"),i=l=>{let d=n();if(!d)return;let c=d.value,u=c.lastIndexOf("@");if(u!==-1){let p=c.slice(0,u),g=`@[${l.username}](${l.id}) `;d.value=p+g,d.focus()}e._isOpen=!1,e.render(),e.dispatchEvent(new CustomEvent("fx-mention-select",{detail:l,bubbles:!0}))},a=l=>{let d=n(l.target);if(!d)return;let c=d.value,u=c.lastIndexOf("@");if(u!==-1&&u>=c.length-15&&!c.slice(u).includes(" ")){let p=c.slice(u+1).toLowerCase();e._searchQuery=p;let g=parseInt(e.getAttribute("debounce-ms")||"200",10);clearTimeout(r),r=setTimeout(()=>{let b=t.filter(m=>m.username.toLowerCase().includes(p)||m.name&&m.name.toLowerCase().includes(p));e._users=b,e._isOpen=!0,e._activeIdx=0,e._popupX=Math.min(200,u*8),e._popupY=d.offsetHeight||40,e.render()},g)}else e._isOpen&&(e._isOpen=!1,e.render())},s=l=>{if(!e._isOpen)return;let d=l;d.key==="ArrowDown"?(d.preventDefault(),e._activeIdx=(e._activeIdx+1)%Math.max(1,e._users.length),e.render()):d.key==="ArrowUp"?(d.preventDefault(),e._activeIdx=(e._activeIdx-1+e._users.length)%Math.max(1,e._users.length),e.render()):d.key==="Enter"||d.key==="Tab"?e._users[e._activeIdx]&&(d.preventDefault(),i(e._users[e._activeIdx])):d.key==="Escape"&&(e._isOpen=!1,e.render())};e.addEventListener("input",a),e.addEventListener("keydown",s),o.addEventListener("input",a),o.addEventListener("keydown",s),o.addEventListener("click",l=>{let c=l.target.closest(".mention-item");if(c){let u=c.getAttribute("data-username"),p=e._users.find(g=>g.username===u);p&&i(p)}})}});var $e=f("flowx-activity-feed",{observedAttributes:["fx-sse-connect","grouping"],style:`
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
  `,template:e=>{let t=e._items||[],o=e.getAttribute("grouping")!=="false",r=[];if(o)for(let i of t){let a=r[r.length-1];a&&a.action===i.action&&a.target===i.target?a.othersCount=(a.othersCount||0)+1:r.push({...i,othersCount:0})}else r=t;let n=r.map(i=>{let a=i.othersCount&&i.othersCount>0?`${i.actor} and ${i.othersCount} ${i.othersCount===1?"other":"others"}`:i.actor;return`
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
          ${n.length>0?n:'<div style="color: var(--flowx-color-text-muted);">No activity recorded</div>'}
        </div>
      </div>
    `},setup:e=>{e._items=e._items||[{id:"act-1",actor:"Alice",action:"commented on",target:"Tier 13 Specs",time:"10m ago"},{id:"act-2",actor:"Bob",action:"commented on",target:"Tier 13 Specs",time:"8m ago"},{id:"act-3",actor:"Charlie",action:"commented on",target:"Tier 13 Specs",time:"5m ago"},{id:"act-4",actor:"Diana",action:"deployed",target:"v1.1.0-beta",time:"2m ago"}];let t=e.getAttribute("fx-sse-connect");if(t&&typeof window<"u"&&window.EventSource)try{let o=new EventSource(t);o.addEventListener("activity",r=>{try{let n=JSON.parse(r.data),i={id:n.id||`act-${Date.now()}`,actor:n.actor||"User",action:n.action||"updated",target:n.target||"",time:"Just now"};e._items=[i,...e._items],e.render()}catch{}}),e._eventSource=o}catch{}}});return Wt(Ce);})();
//# sourceMappingURL=flowx-ui.js.map