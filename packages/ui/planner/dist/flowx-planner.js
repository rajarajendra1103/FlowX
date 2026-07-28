"use strict";var FlowXPlanner=(()=>{var g=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var C=Object.prototype.hasOwnProperty;var $=(t,r)=>{for(var f in r)g(t,f,{get:r[f],enumerable:!0})},_=(t,r,f,l)=>{if(r&&typeof r=="object"||typeof r=="function")for(let c of E(r))!C.call(t,c)&&c!==f&&g(t,c,{get:()=>r[c],enumerable:!(l=k(r,c))||l.enumerable});return t};var z=t=>_(g({},"__esModule",{value:!0}),t);var D={};$(D,{FlowXCalendar:()=>L,FlowXDataTimeline:()=>I,FlowXGanttChart:()=>S,FlowXKanban:()=>T,FlowXNotes:()=>M,FlowXScheduler:()=>A,FlowXWhiteboard:()=>H,GLOBAL_THEME:()=>h,commitPayload:()=>x,defineFlowXElement:()=>u,parseJsonIsland:()=>v});var h=`
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
`;function u(t,r){class f extends HTMLElement{constructor(){super();this._initialized=!1;r.shadow!==!1&&this.attachShadow({mode:"open"})}static get observedAttributes(){return r.observedAttributes||[]}connectedCallback(){this._initialized||(this.render(),r.setup&&r.setup(this),this._initialized=!0)}attributeChangedCallback(e,a,o){if(a===o)return;let i=e.replace(/-([a-z])/g,d=>d[1].toUpperCase()),s=o;o===""&&(s=!0),o===null&&(s=!1),this[i]!==s&&(this[i]=s),this._initialized&&this.render()}render(){let e=`<style>${h}${r.style||""}</style>`,a="";typeof r.template=="function"?a=r.template(this):typeof r.template=="string"&&(a=r.template);let o=`${e}${a}`;this.shadowRoot?this.shadowRoot.innerHTML=o:this.innerHTML=o}}let l=f.prototype;return r.observedAttributes&&r.observedAttributes.forEach(c=>{let n=c.replace(/-([a-z])/g,e=>e[1].toUpperCase());Object.getOwnPropertyDescriptor(l,n)||Object.defineProperty(l,n,{get(){let e=this.getAttribute(c);return e===""?!0:e===null?!1:e},set(e){e===null||e===!1?this.hasAttribute(c)&&this.removeAttribute(c):e===!0?this.getAttribute(c)!==""&&this.setAttribute(c,""):this.getAttribute(c)!==String(e)&&this.setAttribute(c,String(e))},configurable:!0})}),customElements.get(t)||customElements.define(t,f),f}function v(t,r){let f=t.querySelector('script[type="application/json"]');if(f&&f.textContent)try{return JSON.parse(f.textContent.trim())}catch(l){console.warn("FlowX Planner: Failed to parse JSON island",l)}return r}async function x(t,r,f="commit"){let l=t.getAttribute("fx-post")||t.getAttribute("commit-url");if(t.dispatchEvent(new CustomEvent("fx-commit",{bubbles:!0,composed:!0,detail:{endpoint:l,payload:r,action:f}})),l)try{let c=typeof window<"u"&&window.location&&window.location.origin&&window.location.origin!=="null"?window.location.origin:"http://localhost",n=l.startsWith("http")?l:new URL(l,c).toString();await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})}catch{}}var L=u("flowx-calendar",{observedAttributes:["view","current-date","fx-post","commit-url"],style:`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--flowx-font-sans);
    }
    .calendar-container {
      background-color: var(--flowx-bg-surface, #ffffff);
      color: var(--flowx-color-text, #0f172a);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-lg, 16px);
      box-shadow: var(--flowx-shadow-md);
      overflow: hidden;
    }
    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--flowx-space-4, 16px);
      background-color: var(--flowx-bg-surface-raised, #ffffff);
      border-bottom: 1px solid var(--flowx-border-color, #e2e8f0);
    }
    .title {
      font-size: 1.1rem;
      font-weight: 700;
    }
    .view-selector button {
      padding: var(--flowx-space-2, 8px) var(--flowx-space-3, 12px);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      background: var(--flowx-bg-surface);
      color: var(--flowx-color-text);
      cursor: pointer;
      font-weight: 600;
      font-size: var(--flowx-font-size-sm, 12px);
    }
    .view-selector button:first-child { border-radius: var(--flowx-radius-md) 0 0 var(--flowx-radius-md); }
    .view-selector button:last-child { border-radius: 0 var(--flowx-radius-md) var(--flowx-radius-md) 0; }
    .view-selector button.active {
      background: var(--flowx-color-primary, #2563eb);
      color: var(--flowx-color-primary-text, #ffffff);
      border-color: var(--flowx-color-primary, #2563eb);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      width: 100%;
    }
    .day-header {
      padding: var(--flowx-space-2, 8px);
      text-align: center;
      font-weight: 700;
      font-size: var(--flowx-font-size-sm, 12px);
      background-color: var(--flowx-bg-hover, rgba(0,0,0,0.03));
      border-bottom: 1px solid var(--flowx-border-color, #e2e8f0);
    }
    .cell {
      min-height: 90px;
      padding: var(--flowx-space-2, 8px);
      border-right: 1px solid var(--flowx-border-color, #e2e8f0);
      border-bottom: 1px solid var(--flowx-border-color, #e2e8f0);
      background-color: var(--flowx-bg-surface, #ffffff);
      position: relative;
      outline: none;
    }
    .cell:nth-child(7n) { border-right: none; }
    .cell:focus-visible {
      box-shadow: inset 0 0 0 2px var(--flowx-color-primary, #2563eb);
      z-index: 2;
    }
    .date-num {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--flowx-color-text-muted);
      margin-bottom: var(--flowx-space-1, 4px);
    }
    .event-chip {
      padding: 3px 6px;
      margin-bottom: 4px;
      border-radius: var(--flowx-radius-sm, 4px);
      background-color: var(--flowx-color-primary, #2563eb);
      color: #ffffff;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      user-select: none;
    }
    .event-chip:hover {
      filter: brightness(1.1);
    }
    .create-modal {
      position: fixed;
      inset: 0;
      background: var(--flowx-color-overlay, rgba(0,0,0,0.5));
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal-content {
      background: var(--flowx-bg-surface-raised, #ffffff);
      color: var(--flowx-color-text, #0f172a);
      border-radius: var(--flowx-radius-lg);
      padding: var(--flowx-space-6, 24px);
      width: 320px;
      box-shadow: var(--flowx-shadow-lg);
    }
    .modal-content input {
      width: 100%;
      padding: 8px;
      margin: 8px 0 16px;
      border: 1px solid var(--flowx-border-color);
      border-radius: var(--flowx-radius-md);
      box-sizing: border-box;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `,template:t=>{let r=t.getAttribute("view")||"month",f=t._currentDate||new Date,l=f.toLocaleString("default",{month:"long",year:"numeric"}),n=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>`<div class="day-header">${d}</div>`).join(""),e=t._events||[],a="",o=f.getFullYear(),i=f.getMonth(),s=new Date(o,i,1).getDay();for(let d=0;d<35;d++){let p=d-s+1,b=p>0&&p<=31,m=b?`${o}-${String(i+1).padStart(2,"0")}-${String(p).padStart(2,"0")}`:"",y=(b?e.filter(w=>w.start===m):[]).map(w=>`
        <div class="event-chip" data-id="${w.id}" style="background-color: ${w.color||"var(--flowx-color-primary)"}">
          ${w.title}
        </div>
      `).join("");a+=`
        <div 
          class="cell" 
          tabindex="${b?"0":"-1"}" 
          ${b?`data-date="${m}"`:""} 
          aria-label="${b?`Date ${m}`:"Empty cell"}"
        >
          <div class="date-num">${b?p:""}</div>
          <div class="events-list">${y}</div>
        </div>
      `}return`
      <div class="calendar-container">
        <div class="toolbar">
          <button class="nav-prev" type="button" aria-label="Previous">&larr;</button>
          <div class="title">${l}</div>
          <div class="view-selector">
            <button class="view-btn ${r==="month"?"active":""}" data-view="month" type="button">Month</button>
            <button class="view-btn ${r==="week"?"active":""}" data-view="week" type="button">Week</button>
            <button class="view-btn ${r==="day"?"active":""}" data-view="day" type="button">Day</button>
          </div>
          <button class="nav-next" type="button" aria-label="Next">&rarr;</button>
        </div>

        <div class="grid">
          ${n}
          ${a}
        </div>
      </div>
    `},setup:t=>{t._events=v(t,[{id:"ev-1",title:"Sprint Review",start:"2026-07-28",color:"#2563eb"},{id:"ev-2",title:"Design System Audit",start:"2026-07-30",color:"#10b981"}]),t._currentDate=new Date(2026,6,27);let r=t.shadowRoot||t,f=()=>{t.render(),l()},l=()=>{let n=r.querySelector(".calendar-container");if(!n)return;n.addEventListener("click",a=>{let o=a.target;if(o.classList.contains("view-btn")){let i=o.getAttribute("data-view");i&&t.setAttribute("view",i)}else if(o.classList.contains("nav-prev"))t._currentDate.setMonth(t._currentDate.getMonth()-1),f();else if(o.classList.contains("nav-next"))t._currentDate.setMonth(t._currentDate.getMonth()+1),f();else if(o.classList.contains("cell")){let i=o.getAttribute("data-date");i&&c(i)}});let e=null;n.addEventListener("pointerdown",a=>{let o=a.target.closest(".event-chip");o&&(e=o.getAttribute("data-id"),o.setPointerCapture(a.pointerId))}),n.addEventListener("pointerup",a=>{if(!e)return;let o=a,i=document.elementFromPoint(o.clientX,o.clientY)?.closest(".cell");if(i){let s=i.getAttribute("data-date");if(s){let d=t._events.find(p=>p.id===e);if(d){let p=d.start;d.start=s,x(t,{eventId:d.id,event:d,oldStart:p,newStart:s},"event-move"),f()}}}e=null}),n.addEventListener("keydown",a=>{let o=a,i=r.activeElement||o.target.closest(".cell");if(!i||!i.classList.contains("cell"))return;let s=Array.from(r.querySelectorAll(".cell")),d=s.indexOf(i);if(d!==-1){if(o.key==="ArrowRight"&&!o.ctrlKey)d<s.length-1&&s[d+1].focus();else if(o.key==="ArrowLeft"&&!o.ctrlKey)d>0&&s[d-1].focus();else if(o.key==="ArrowDown"&&!o.ctrlKey)d+7<s.length&&s[d+7].focus();else if(o.key==="ArrowUp"&&!o.ctrlKey)d-7>=0&&s[d-7].focus();else if(o.key==="Enter"||o.key===" "){let p=i.getAttribute("data-date");p&&c(p)}}})},c=n=>{let e=document.createElement("div");e.className="create-modal",e.innerHTML=`
        <div class="modal-content">
          <h3 style="margin: 0 0 12px;">Create Event (${n})</h3>
          <input type="text" id="event-title-input" placeholder="Event Title..." autofocus />
          <div class="modal-actions">
            <button type="button" class="cancel-btn" style="padding: 6px 12px; border: 1px solid var(--flowx-border-color); background: var(--flowx-bg-surface); border-radius: 4px; cursor: pointer;">Cancel</button>
            <button type="button" class="save-btn" style="padding: 6px 12px; background: var(--flowx-color-primary); color: #fff; border: none; border-radius: 4px; cursor: pointer;">Save</button>
          </div>
        </div>
      `,r.appendChild(e);let a=e.querySelector(".cancel-btn"),o=e.querySelector(".save-btn"),i=e.querySelector("#event-title-input"),s=()=>e.remove();a?.addEventListener("click",s),o?.addEventListener("click",()=>{let d=i.value.trim();if(d){let p={id:`ev-${Date.now()}`,title:d,start:n,color:"#2563eb"};t._events||(t._events=[]),t._events.push(p),x(t,{event:p},"event-create"),s(),f()}})};l()}});var A=u("flowx-scheduler",{observedAttributes:["slots-count","fx-post","commit-url"],style:`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--flowx-font-sans);
    }
    .scheduler-container {
      background-color: var(--flowx-bg-surface, #ffffff);
      color: var(--flowx-color-text, #0f172a);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-lg, 16px);
      box-shadow: var(--flowx-shadow-md);
      overflow-x: auto;
    }
    .grid-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 600px;
    }
    .grid-table th, .grid-table td {
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      padding: var(--flowx-space-2, 8px);
    }
    .grid-table th {
      background: var(--flowx-bg-hover, rgba(0,0,0,0.03));
      font-size: var(--flowx-font-size-sm, 12px);
      font-weight: 700;
      text-align: center;
    }
    .resource-cell {
      width: 160px;
      font-weight: 600;
      background: var(--flowx-bg-surface-raised);
    }
    .slot-cell {
      height: 60px;
      position: relative;
      background: var(--flowx-bg-surface);
    }
    .slot-cell:focus-visible {
      outline: 2px solid var(--flowx-color-primary, #2563eb);
    }
    .allocation-badge {
      padding: 4px 8px;
      border-radius: var(--flowx-radius-sm, 4px);
      background: var(--flowx-color-primary, #2563eb);
      color: #ffffff;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      user-select: none;
    }
  `,template:t=>{let r=parseInt(t.getAttribute("slots-count")||"8",10),f=t._resources||[],l=t._allocations||[],c=Array.from({length:r},(e,a)=>`<th>${9+a}:00</th>`).join(""),n=f.map(e=>{let a=Array.from({length:r},(o,i)=>{let s=l.find(p=>p.resourceId===e.id&&p.slot===i),d=s?`
          <div class="allocation-badge" data-id="${s.id}" style="background-color: ${s.color||"var(--flowx-color-primary)"}">
            ${s.title}
          </div>
        `:"";return`
          <td class="slot-cell" tabindex="0" data-resource-id="${e.id}" data-slot="${i}">
            ${d}
          </td>
        `}).join("");return`
        <tr>
          <td class="resource-cell">${e.name}</td>
          ${a}
        </tr>
      `}).join("");return`
      <div class="scheduler-container">
        <table class="grid-table">
          <thead>
            <tr>
              <th style="width: 160px;">Resource</th>
              ${c}
            </tr>
          </thead>
          <tbody>
            ${n}
          </tbody>
        </table>
      </div>
    `},setup:t=>{let r=v(t,{resources:[{id:"res-1",name:"Alice Smith",role:"Developer"},{id:"res-2",name:"Bob Jones",role:"Designer"},{id:"res-3",name:"Carol Danvers",role:"DevOps"}],allocations:[{id:"alloc-1",resourceId:"res-1",slot:1,title:"Code Review",color:"#2563eb"},{id:"alloc-2",resourceId:"res-2",slot:3,title:"UI Mockups",color:"#10b981"}]});t._resources=r.resources,t._allocations=r.allocations;let f=t.shadowRoot||t,l=null;f.addEventListener("pointerdown",c=>{let n=c.target.closest(".allocation-badge");n&&(l=n.getAttribute("data-id"),n.setPointerCapture(c.pointerId))}),f.addEventListener("pointerup",c=>{if(!l)return;let n=c,e=document.elementFromPoint(n.clientX,n.clientY)?.closest(".slot-cell");if(e){let a=e.getAttribute("data-resource-id"),o=parseInt(e.getAttribute("data-slot")||"0",10);if(a){let i=t._allocations.find(s=>s.id===l);if(i){let s=i.resourceId,d=i.slot;i.resourceId=a,i.slot=o,x(t,{allocationId:i.id,allocation:i,oldResId:s,newResId:a,oldSlot:d,newSlot:o},"reassign-resource"),t.render()}}}l=null})}});var I=u("flowx-data-timeline",{observedAttributes:["zoom-level","scale"],style:`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--flowx-font-sans);
    }
    .timeline-container {
      background-color: var(--flowx-bg-surface, #ffffff);
      color: var(--flowx-color-text, #0f172a);
      border: 1px solid var(--flowx-border-color, #e2e8f0);
      border-radius: var(--flowx-radius-lg, 16px);
      box-shadow: var(--flowx-shadow-md);
      padding: var(--flowx-space-4, 16px);
      box-sizing: border-box;
    }
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--flowx-space-4, 16px);
    }
    .zoom-controls button {
      padding: 4px 10px;
      border: 1px solid var(--flowx-border-color);
      background: var(--flowx-bg-surface);
      color: var(--flowx-color-text);
      border-radius: var(--flowx-radius-sm);
      cursor: pointer;
      font-weight: 600;
    }
    .track-wrapper {
      overflow-x: auto;
      padding: var(--flowx-space-6, 24px) 0;
      position: relative;
    }
    .track-line {
      height: 4px;
      background: var(--flowx-color-primary, #2563eb);
      position: relative;
      margin: 30px 0;
      min-width: 700px;
    }
    .milestone-node {
      position: absolute;
      top: -10px;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
    }
    .dot {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--flowx-color-primary, #2563eb);
      border: 3px solid var(--flowx-bg-surface, #ffffff);
      box-shadow: var(--flowx-shadow-sm);
    }
    .node-label {
      margin-top: 8px;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
    }
    .node-date {
      font-size: 10px;
      color: var(--flowx-color-text-muted);
    }
  `,template:t=>{let r=t._zoom||1,f=t._events||[],l=f.map((c,n)=>`
        <div class="milestone-node" style="left: ${Math.min(95,Math.max(5,(n+1)*(100/(f.length+1))*r))}%" tabindex="0" title="${c.description||c.title}">
          <div class="dot"></div>
          <div class="node-label">${c.title}</div>
          <div class="node-date">${c.timestamp}</div>
        </div>
      `).join("");return`
      <div class="timeline-container">
        <div class="toolbar">
          <strong style="font-size: 1rem;">Timeline & Milestone Scrubber</strong>
          <div class="zoom-controls">
            <button type="button" class="zoom-out">-</button>
            <span style="font-size: 0.85rem; margin: 0 8px;">Zoom: ${Math.round(r*100)}%</span>
            <button type="button" class="zoom-in">+</button>
          </div>
        </div>

        <div class="track-wrapper">
          <div class="track-line" style="width: ${100*r}%;">
            ${l}
          </div>
        </div>
      </div>
    `},setup:t=>{t._events=v(t,[{id:"t1",title:"Concept Approval",timestamp:"2026-01-15"},{id:"t2",title:"Beta Architecture",timestamp:"2026-04-10"},{id:"t3",title:"V1 Release",timestamp:"2026-07-27"},{id:"t4",title:"Ecosystem Expansion",timestamp:"2026-10-01"}]),t._zoom=1,t.render();let r=t.shadowRoot||t;r.addEventListener("click",f=>{let l=f.target;l.classList.contains("zoom-in")?(t._zoom=Math.min(3,t._zoom+.25),t.render()):l.classList.contains("zoom-out")&&(t._zoom=Math.max(.5,t._zoom-.25),t.render())}),r.addEventListener("keydown",f=>{let l=f;l.key==="+"||l.key==="="?(t._zoom=Math.min(3,t._zoom+.25),t.render()):l.key==="-"&&(t._zoom=Math.max(.5,t._zoom-.25),t.render())})}});var S=u("flowx-gantt-chart",{observedAttributes:["fx-post","commit-url"],style:`
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
  `,template:t=>{let r=t._tasks||[],f=r.map(e=>`<div class="label-row">${e.name}</div>`).join(""),l=25,c=r.map(e=>{let a=e.startOffset*l,o=e.duration*l;return`
        <div class="task-row">
          <div class="task-bar" data-id="${e.id}" tabindex="0" style="left: ${a}px; width: ${o}px;">
            <span>${e.name}</span>
            <div class="resize-handle"></div>
          </div>
        </div>
      `}).join(""),n="";return r.forEach((e,a)=>{e.dependencies&&e.dependencies.forEach(o=>{let i=r.findIndex(s=>s.id===o);if(i!==-1){let s=r[i],d=(s.startOffset+s.duration)*l,p=i*40+20,b=e.startOffset*l,m=a*40+20;n+=`<path d="M ${d} ${p} C ${d+20} ${p}, ${b-20} ${m}, ${b} ${m}" stroke="var(--flowx-color-primary)" stroke-width="2" fill="none" marker-end="url(#arrow)"/>`}})}),`
      <div class="gantt-container">
        <div class="gantt-layout">
          <div class="task-labels">
            <div class="label-row" style="background: var(--flowx-bg-hover); font-weight: 700;">Task Name</div>
            ${f}
          </div>
          <div class="timeline-area">
            <div class="label-row" style="background: var(--flowx-bg-hover); font-weight: 700;">Timeline (Days)</div>
            ${c}
            <svg class="svg-overlay" width="100%" height="100%">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--flowx-color-primary)" />
                </marker>
              </defs>
              ${n}
            </svg>
          </div>
        </div>
      </div>
    `},setup:t=>{t._tasks=v(t,[{id:"g1",name:"DB Schema Design",startOffset:1,duration:4},{id:"g2",name:"API Implementation",startOffset:5,duration:6,dependencies:["g1"]},{id:"g3",name:"UI Components",startOffset:6,duration:5},{id:"g4",name:"E2E Testing",startOffset:11,duration:3,dependencies:["g2","g3"]}]);let r=t.shadowRoot||t,f=25,l=null,c=!1;r.addEventListener("pointerdown",n=>{let e=n,a=e.target,o=a.closest(".task-bar");o&&(l=o.getAttribute("data-id"),c=a.classList.contains("resize-handle"),o.setPointerCapture(e.pointerId),e.preventDefault())}),r.addEventListener("pointermove",n=>{if(!l)return;let e=n,a=t._tasks.find(o=>o.id===l);if(a){if(c){let o=Math.round(e.movementX/f);a.duration=Math.max(1,a.duration+o)}else{let o=Math.round(e.movementX/f);a.startOffset=Math.max(0,a.startOffset+o)}t.render()}}),r.addEventListener("pointerup",()=>{if(l){let n=t._tasks.find(e=>e.id===l);n&&x(t,{taskId:n.id,task:n},"gantt-update"),l=null,c=!1}}),r.addEventListener("keydown",n=>{let e=n,a=e.target.closest(".task-bar");if(!a)return;let o=a.getAttribute("data-id"),i=t._tasks.find(s=>s.id===o);i&&(e.shiftKey&&e.key==="ArrowRight"?(i.duration+=1,x(t,{taskId:i.id,task:i},"gantt-resize"),t.render()):e.shiftKey&&e.key==="ArrowLeft"?(i.duration=Math.max(1,i.duration-1),x(t,{taskId:i.id,task:i},"gantt-resize"),t.render()):e.altKey&&e.key==="ArrowRight"?(i.startOffset+=1,x(t,{taskId:i.id,task:i},"gantt-move"),t.render()):e.altKey&&e.key==="ArrowLeft"&&(i.startOffset=Math.max(0,i.startOffset-1),x(t,{taskId:i.id,task:i},"gantt-move"),t.render()))})}});var T=u("flowx-kanban",{observedAttributes:["fx-post","commit-url"],style:`
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
  `,template:t=>{let r=t._columns||[],f=t._cards||[];return`
      <div class="kanban-board">
        ${r.map(c=>{let n=f.filter(a=>a.columnId===c.id),e=n.map(a=>`
        <div 
          class="kanban-card-wrapper ${t._pickedCardId===a.id?"picked-up":""}" 
          data-id="${a.id}" 
          tabindex="0"
          role="option"
          aria-grabbed="${t._pickedCardId===a.id?"true":"false"}"
          aria-label="${a.title}. Column ${c.title}."
        >
          <flowx-card>
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${a.title}</div>
            ${a.description?`<div style="font-size: 12px; color: var(--flowx-color-text-muted);">${a.description}</div>`:""}
            ${a.tag?`<span class="card-tag" style="background: ${a.tagColor||"var(--flowx-color-primary)"}; color: #fff;">${a.tag}</span>`:""}
          </flowx-card>
        </div>
      `).join("");return`
        <div class="column" data-col-id="${c.id}" role="listbox" aria-label="${c.title}">
          <div class="column-header">
            <span>${c.title}</span>
            <span class="card-count">${n.length}</span>
          </div>
          <div class="cards-list">
            ${e}
          </div>
        </div>
      `}).join("")}
      </div>
      <div class="live-region" aria-live="assertive">${t._a11yStatus||""}</div>
    `},setup:t=>{let r=v(t,{columns:[{id:"col-todo",title:"To Do"},{id:"col-in-progress",title:"In Progress"},{id:"col-done",title:"Done"}],cards:[{id:"card-1",columnId:"col-todo",title:"Design System Audit",description:"Review CSS custom property tokens",tag:"UI",tagColor:"#2563eb"},{id:"card-2",columnId:"col-todo",title:"Setup CI Pipelines",description:"Configure GitHub Actions test runners",tag:"DevOps",tagColor:"#f59e0b"},{id:"card-3",columnId:"col-in-progress",title:"Implement Kanban Board",description:"Pointer events & keyboard accessibility",tag:"Core",tagColor:"#10b981"}]});t._columns=r.columns,t._cards=r.cards,t._pickedCardId=null,t.render();let f=t.shadowRoot||t,l=null;f.addEventListener("pointerdown",c=>{let n=c.target.closest(".kanban-card-wrapper");n&&(l=n.getAttribute("data-id"),n.setPointerCapture(c.pointerId))}),f.addEventListener("pointerup",c=>{if(!l)return;let n=c,e=document.elementFromPoint(n.clientX,n.clientY)?.closest(".column");if(e){let a=e.getAttribute("data-col-id");if(a){let o=t._cards.find(i=>i.id===l);if(o&&o.columnId!==a){let i=o.columnId;o.columnId=a;let s=t._cards.filter(d=>d.columnId===a).length-1;x(t,{cardId:o.id,fromColumn:i,toColumn:a,newIndex:s},"card-move"),t.render()}}}l=null}),f.addEventListener("keydown",c=>{let n=c,e=n.target.closest(".kanban-card-wrapper");if(!e)return;let a=e.getAttribute("data-id");if(!a)return;let o=t._cards.find(i=>i.id===a);if(o){if(n.key===" "||n.key==="Enter")if(n.preventDefault(),t._pickedCardId===a){let s=t._cards.filter(d=>d.columnId===o.columnId).indexOf(o);x(t,{cardId:o.id,fromColumn:o._origCol||o.columnId,toColumn:o.columnId,newIndex:s},"card-move"),t._pickedCardId=null,t._a11yStatus=`Dropped card ${o.title} into column ${o.columnId}`,t.render()}else o._origCol=o.columnId,t._pickedCardId=a,t._a11yStatus=`Picked up card ${o.title}. Use arrow keys to move, Enter to drop, Esc to cancel.`,t.render();else if(n.key==="Escape"&&t._pickedCardId===a)o._origCol&&(o.columnId=o._origCol),t._pickedCardId=null,t._a11yStatus=`Cancelled card movement for ${o.title}`,t.render();else if(t._pickedCardId===a){let i=t._columns,s=i.findIndex(d=>d.id===o.columnId);if(n.key==="ArrowRight"&&s<i.length-1){n.preventDefault();let d=i[s+1];o.columnId=d.id,t._a11yStatus=`Moved ${o.title} to column ${d.title}`,t.render()}else if(n.key==="ArrowLeft"&&s>0){n.preventDefault();let d=i[s-1];o.columnId=d.id,t._a11yStatus=`Moved ${o.title} to column ${d.title}`,t.render()}}}})}});var M=u("flowx-notes",{observedAttributes:["fx-post","commit-url","debounce-ms"],style:`
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
  `,template:t=>`
      <div class="notes-container">
        <div class="blocks-wrapper">
          ${(t._blocks||[]).map(l=>`
      <div 
        class="note-block block-${l.type}" 
        data-id="${l.id}" 
        contenteditable="true" 
        spellcheck="false"
      >${l.content}</div>
    `).join("")}
        </div>
        <div class="status-bar">
          <span>Block-Based Note Editor</span>
          <span class="save-indicator">${t._saveStatus||"Saved"}</span>
        </div>
      </div>
    `,setup:t=>{t._blocks=v(t,[{id:"b1",type:"h1",content:"Project Architecture Notes"},{id:"b2",type:"p",content:"This block-based editor serializes state to JSON and debounces autosaves via fx-post."},{id:"b3",type:"bullet",content:"Zero-JS HTML rendering fallback"},{id:"b4",type:"bullet",content:"Debounced background autosave"}]),t._saveStatus="Saved",t.render();let r=t.shadowRoot||t,f=null,l=()=>{t._saveStatus="Saving...";let c=r.querySelector(".save-indicator");c&&(c.textContent="Saving...");let n=parseInt(t.getAttribute("debounce-ms")||"800",10);f&&clearTimeout(f),f=setTimeout(()=>{let a=Array.from(r.querySelectorAll(".note-block")).map(o=>{let i=o.getAttribute("data-id")||`b-${Date.now()}`,s=Array.from(o.classList).find(p=>p.startsWith("block-")),d=s?s.replace("block-",""):"p";return{id:i,type:d,content:o.textContent||""}});t._blocks=a,x(t,{blocks:a},"notes-autosave"),t._saveStatus="All changes saved",c&&(c.textContent="All changes saved")},n)};r.addEventListener("input",c=>{c.target.classList.contains("note-block")&&l()})}});var H=u("flowx-whiteboard",{observedAttributes:["fx-post","commit-url","tool"],style:`
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
  `,template:t=>{let r=t._tool||"pen";return`
      <div class="whiteboard-container">
        <div class="toolbar">
          <button class="tool-btn ${r==="pen"?"active":""}" data-tool="pen" type="button">\u270F\uFE0F Pen</button>
          <button class="tool-btn ${r==="eraser"?"active":""}" data-tool="eraser" type="button">\u{1F9F9} Eraser</button>
          <button class="tool-btn ${r==="note"?"active":""}" data-tool="note" type="button">\u{1F4DD} Sticky Note</button>
          <button class="tool-btn clear-btn" type="button">\u{1F5D1}\uFE0F Clear</button>
          <span class="client-only-badge">\u26A1 Client-Only Canvas Component</span>
        </div>

        <div class="canvas-wrapper">
          <canvas width="800" height="450"></canvas>
          <div class="notes-layer"></div>
        </div>
      </div>
    `},setup:t=>{let r=v(t,{strokes:[],notes:[{id:"sn-1",x:80,y:50,text:"Brainstorm Architecture",color:"#fef08a"}]});t._tool="pen",t._strokes=r.strokes,t._notes=r.notes;let f=t.shadowRoot||t,l=f.querySelector("canvas"),c=f.querySelector(".notes-layer");if(!l||!c)return;let n=l.getContext?l.getContext("2d"):null,e=()=>{c.innerHTML=t._notes.map(s=>`
        <div 
          class="sticky-note" 
          data-id="${s.id}" 
          style="left: ${s.x}px; top: ${s.y}px; background: ${s.color||"#fef08a"}; color: #000;"
          contenteditable="true"
        >${s.text}</div>
      `).join("")},a=()=>{n&&(n.clearRect(0,0,l.width,l.height),t._strokes.forEach(s=>{if(!(s.points.length<2)){n.beginPath(),n.strokeStyle=s.color,n.lineWidth=s.width,n.lineCap="round",n.lineJoin="round",n.moveTo(s.points[0].x,s.points[0].y);for(let d=1;d<s.points.length;d++)n.lineTo(s.points[d].x,s.points[d].y);n.stroke()}}))};e(),a();let o=!1,i=null;l.addEventListener("pointerdown",s=>{let d=l.getBoundingClientRect(),p=s.clientX-d.left,b=s.clientY-d.top;if(t._tool==="pen"||t._tool==="eraser")o=!0,i={points:[{x:p,y:b}],color:t._tool==="eraser"?"#fafafa":"#2563eb",width:t._tool==="eraser"?20:3},t._strokes.push(i),l.setPointerCapture(s.pointerId);else if(t._tool==="note"){let m={id:`sn-${Date.now()}`,x:Math.round(p),y:Math.round(b),text:"New Note",color:"#fef08a"};t._notes.push(m),e(),x(t,{notes:t._notes,strokes:t._strokes},"whiteboard-note-add")}}),l.addEventListener("pointermove",s=>{if(!o||!i)return;let d=l.getBoundingClientRect(),p=s.clientX-d.left,b=s.clientY-d.top;i.points.push({x:p,y:b}),a()}),l.addEventListener("pointerup",()=>{o&&(o=!1,i=null,x(t,{strokes:t._strokes,notes:t._notes},"whiteboard-draw"))}),f.addEventListener("click",s=>{let d=s.target;d.classList.contains("tool-btn")&&d.getAttribute("data-tool")?(t._tool=d.getAttribute("data-tool"),f.querySelectorAll(".tool-btn").forEach(p=>p.classList.remove("active")),d.classList.add("active")):d.classList.contains("clear-btn")&&(t._strokes=[],t._notes=[],a(),e(),x(t,{strokes:[],notes:[]},"whiteboard-clear"))})}});return z(D);})();
//# sourceMappingURL=flowx-planner.js.map