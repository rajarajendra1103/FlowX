var g=`
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
`;function u(t,l){class f extends HTMLElement{constructor(){super();this._initialized=!1;l.shadow!==!1&&this.attachShadow({mode:"open"})}static get observedAttributes(){return l.observedAttributes||[]}connectedCallback(){this._initialized||(this.render(),l.setup&&l.setup(this),this._initialized=!0)}attributeChangedCallback(e,r,o){if(r===o)return;let s=e.replace(/-([a-z])/g,d=>d[1].toUpperCase()),n=o;o===""&&(n=!0),o===null&&(n=!1),this[s]!==n&&(this[s]=n),this._initialized&&this.render()}render(){let e=`<style>${g}${l.style||""}</style>`,r="";typeof l.template=="function"?r=l.template(this):typeof l.template=="string"&&(r=l.template);let o=`${e}${r}`;this.shadowRoot?this.shadowRoot.innerHTML=o:this.innerHTML=o}}let i=f.prototype;return l.observedAttributes&&l.observedAttributes.forEach(c=>{let a=c.replace(/-([a-z])/g,e=>e[1].toUpperCase());Object.getOwnPropertyDescriptor(i,a)||Object.defineProperty(i,a,{get(){let e=this.getAttribute(c);return e===""?!0:e===null?!1:e},set(e){e===null||e===!1?this.hasAttribute(c)&&this.removeAttribute(c):e===!0?this.getAttribute(c)!==""&&this.setAttribute(c,""):this.getAttribute(c)!==String(e)&&this.setAttribute(c,String(e))},configurable:!0})}),customElements.get(t)||customElements.define(t,f),f}function b(t,l){let f=t.querySelector('script[type="application/json"]');if(f&&f.textContent)try{return JSON.parse(f.textContent.trim())}catch(i){console.warn("FlowX Planner: Failed to parse JSON island",i)}return l}async function x(t,l,f="commit"){let i=t.getAttribute("fx-post")||t.getAttribute("commit-url");if(t.dispatchEvent(new CustomEvent("fx-commit",{bubbles:!0,composed:!0,detail:{endpoint:i,payload:l,action:f}})),i)try{let c=typeof window<"u"&&window.location&&window.location.origin&&window.location.origin!=="null"?window.location.origin:"http://localhost",a=i.startsWith("http")?i:new URL(i,c).toString();await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)})}catch{}}var _=u("flowx-calendar",{observedAttributes:["view","current-date","fx-post","commit-url"],style:`
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
  `,template:t=>{let l=t.getAttribute("view")||"month",f=t._currentDate||new Date,i=f.toLocaleString("default",{month:"long",year:"numeric"}),a=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>`<div class="day-header">${d}</div>`).join(""),e=t._events||[],r="",o=f.getFullYear(),s=f.getMonth(),n=new Date(o,s,1).getDay();for(let d=0;d<35;d++){let p=d-n+1,v=p>0&&p<=31,m=v?`${o}-${String(s+1).padStart(2,"0")}-${String(p).padStart(2,"0")}`:"",h=(v?e.filter(w=>w.start===m):[]).map(w=>`
        <div class="event-chip" data-id="${w.id}" style="background-color: ${w.color||"var(--flowx-color-primary)"}">
          ${w.title}
        </div>
      `).join("");r+=`
        <div 
          class="cell" 
          tabindex="${v?"0":"-1"}" 
          ${v?`data-date="${m}"`:""} 
          aria-label="${v?`Date ${m}`:"Empty cell"}"
        >
          <div class="date-num">${v?p:""}</div>
          <div class="events-list">${h}</div>
        </div>
      `}return`
      <div class="calendar-container">
        <div class="toolbar">
          <button class="nav-prev" type="button" aria-label="Previous">&larr;</button>
          <div class="title">${i}</div>
          <div class="view-selector">
            <button class="view-btn ${l==="month"?"active":""}" data-view="month" type="button">Month</button>
            <button class="view-btn ${l==="week"?"active":""}" data-view="week" type="button">Week</button>
            <button class="view-btn ${l==="day"?"active":""}" data-view="day" type="button">Day</button>
          </div>
          <button class="nav-next" type="button" aria-label="Next">&rarr;</button>
        </div>

        <div class="grid">
          ${a}
          ${r}
        </div>
      </div>
    `},setup:t=>{t._events=b(t,[{id:"ev-1",title:"Sprint Review",start:"2026-07-28",color:"#2563eb"},{id:"ev-2",title:"Design System Audit",start:"2026-07-30",color:"#10b981"}]),t._currentDate=new Date(2026,6,27);let l=t.shadowRoot||t,f=()=>{t.render(),i()},i=()=>{let a=l.querySelector(".calendar-container");if(!a)return;a.addEventListener("click",r=>{let o=r.target;if(o.classList.contains("view-btn")){let s=o.getAttribute("data-view");s&&t.setAttribute("view",s)}else if(o.classList.contains("nav-prev"))t._currentDate.setMonth(t._currentDate.getMonth()-1),f();else if(o.classList.contains("nav-next"))t._currentDate.setMonth(t._currentDate.getMonth()+1),f();else if(o.classList.contains("cell")){let s=o.getAttribute("data-date");s&&c(s)}});let e=null;a.addEventListener("pointerdown",r=>{let o=r.target.closest(".event-chip");o&&(e=o.getAttribute("data-id"),o.setPointerCapture(r.pointerId))}),a.addEventListener("pointerup",r=>{if(!e)return;let o=r,s=document.elementFromPoint(o.clientX,o.clientY)?.closest(".cell");if(s){let n=s.getAttribute("data-date");if(n){let d=t._events.find(p=>p.id===e);if(d){let p=d.start;d.start=n,x(t,{eventId:d.id,event:d,oldStart:p,newStart:n},"event-move"),f()}}}e=null}),a.addEventListener("keydown",r=>{let o=r,s=l.activeElement||o.target.closest(".cell");if(!s||!s.classList.contains("cell"))return;let n=Array.from(l.querySelectorAll(".cell")),d=n.indexOf(s);if(d!==-1){if(o.key==="ArrowRight"&&!o.ctrlKey)d<n.length-1&&n[d+1].focus();else if(o.key==="ArrowLeft"&&!o.ctrlKey)d>0&&n[d-1].focus();else if(o.key==="ArrowDown"&&!o.ctrlKey)d+7<n.length&&n[d+7].focus();else if(o.key==="ArrowUp"&&!o.ctrlKey)d-7>=0&&n[d-7].focus();else if(o.key==="Enter"||o.key===" "){let p=s.getAttribute("data-date");p&&c(p)}}})},c=a=>{let e=document.createElement("div");e.className="create-modal",e.innerHTML=`
        <div class="modal-content">
          <h3 style="margin: 0 0 12px;">Create Event (${a})</h3>
          <input type="text" id="event-title-input" placeholder="Event Title..." autofocus />
          <div class="modal-actions">
            <button type="button" class="cancel-btn" style="padding: 6px 12px; border: 1px solid var(--flowx-border-color); background: var(--flowx-bg-surface); border-radius: 4px; cursor: pointer;">Cancel</button>
            <button type="button" class="save-btn" style="padding: 6px 12px; background: var(--flowx-color-primary); color: #fff; border: none; border-radius: 4px; cursor: pointer;">Save</button>
          </div>
        </div>
      `,l.appendChild(e);let r=e.querySelector(".cancel-btn"),o=e.querySelector(".save-btn"),s=e.querySelector("#event-title-input"),n=()=>e.remove();r?.addEventListener("click",n),o?.addEventListener("click",()=>{let d=s.value.trim();if(d){let p={id:`ev-${Date.now()}`,title:d,start:a,color:"#2563eb"};t._events||(t._events=[]),t._events.push(p),x(t,{event:p},"event-create"),n(),f()}})};i()}});var A=u("flowx-scheduler",{observedAttributes:["slots-count","fx-post","commit-url"],style:`
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
  `,template:t=>{let l=parseInt(t.getAttribute("slots-count")||"8",10),f=t._resources||[],i=t._allocations||[],c=Array.from({length:l},(e,r)=>`<th>${9+r}:00</th>`).join(""),a=f.map(e=>{let r=Array.from({length:l},(o,s)=>{let n=i.find(p=>p.resourceId===e.id&&p.slot===s),d=n?`
          <div class="allocation-badge" data-id="${n.id}" style="background-color: ${n.color||"var(--flowx-color-primary)"}">
            ${n.title}
          </div>
        `:"";return`
          <td class="slot-cell" tabindex="0" data-resource-id="${e.id}" data-slot="${s}">
            ${d}
          </td>
        `}).join("");return`
        <tr>
          <td class="resource-cell">${e.name}</td>
          ${r}
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
            ${a}
          </tbody>
        </table>
      </div>
    `},setup:t=>{let l=b(t,{resources:[{id:"res-1",name:"Alice Smith",role:"Developer"},{id:"res-2",name:"Bob Jones",role:"Designer"},{id:"res-3",name:"Carol Danvers",role:"DevOps"}],allocations:[{id:"alloc-1",resourceId:"res-1",slot:1,title:"Code Review",color:"#2563eb"},{id:"alloc-2",resourceId:"res-2",slot:3,title:"UI Mockups",color:"#10b981"}]});t._resources=l.resources,t._allocations=l.allocations;let f=t.shadowRoot||t,i=null;f.addEventListener("pointerdown",c=>{let a=c.target.closest(".allocation-badge");a&&(i=a.getAttribute("data-id"),a.setPointerCapture(c.pointerId))}),f.addEventListener("pointerup",c=>{if(!i)return;let a=c,e=document.elementFromPoint(a.clientX,a.clientY)?.closest(".slot-cell");if(e){let r=e.getAttribute("data-resource-id"),o=parseInt(e.getAttribute("data-slot")||"0",10);if(r){let s=t._allocations.find(n=>n.id===i);if(s){let n=s.resourceId,d=s.slot;s.resourceId=r,s.slot=o,x(t,{allocationId:s.id,allocation:s,oldResId:n,newResId:r,oldSlot:d,newSlot:o},"reassign-resource"),t.render()}}}i=null})}});var T=u("flowx-data-timeline",{observedAttributes:["zoom-level","scale"],style:`
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
  `,template:t=>{let l=t._zoom||1,f=t._events||[],i=f.map((c,a)=>`
        <div class="milestone-node" style="left: ${Math.min(95,Math.max(5,(a+1)*(100/(f.length+1))*l))}%" tabindex="0" title="${c.description||c.title}">
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
            <span style="font-size: 0.85rem; margin: 0 8px;">Zoom: ${Math.round(l*100)}%</span>
            <button type="button" class="zoom-in">+</button>
          </div>
        </div>

        <div class="track-wrapper">
          <div class="track-line" style="width: ${100*l}%;">
            ${i}
          </div>
        </div>
      </div>
    `},setup:t=>{t._events=b(t,[{id:"t1",title:"Concept Approval",timestamp:"2026-01-15"},{id:"t2",title:"Beta Architecture",timestamp:"2026-04-10"},{id:"t3",title:"V1 Release",timestamp:"2026-07-27"},{id:"t4",title:"Ecosystem Expansion",timestamp:"2026-10-01"}]),t._zoom=1,t.render();let l=t.shadowRoot||t;l.addEventListener("click",f=>{let i=f.target;i.classList.contains("zoom-in")?(t._zoom=Math.min(3,t._zoom+.25),t.render()):i.classList.contains("zoom-out")&&(t._zoom=Math.max(.5,t._zoom-.25),t.render())}),l.addEventListener("keydown",f=>{let i=f;i.key==="+"||i.key==="="?(t._zoom=Math.min(3,t._zoom+.25),t.render()):i.key==="-"&&(t._zoom=Math.max(.5,t._zoom-.25),t.render())})}});var D=u("flowx-gantt-chart",{observedAttributes:["fx-post","commit-url"],style:`
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
  `,template:t=>{let l=t._tasks||[],f=l.map(e=>`<div class="label-row">${e.name}</div>`).join(""),i=25,c=l.map(e=>{let r=e.startOffset*i,o=e.duration*i;return`
        <div class="task-row">
          <div class="task-bar" data-id="${e.id}" tabindex="0" style="left: ${r}px; width: ${o}px;">
            <span>${e.name}</span>
            <div class="resize-handle"></div>
          </div>
        </div>
      `}).join(""),a="";return l.forEach((e,r)=>{e.dependencies&&e.dependencies.forEach(o=>{let s=l.findIndex(n=>n.id===o);if(s!==-1){let n=l[s],d=(n.startOffset+n.duration)*i,p=s*40+20,v=e.startOffset*i,m=r*40+20;a+=`<path d="M ${d} ${p} C ${d+20} ${p}, ${v-20} ${m}, ${v} ${m}" stroke="var(--flowx-color-primary)" stroke-width="2" fill="none" marker-end="url(#arrow)"/>`}})}),`
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
              ${a}
            </svg>
          </div>
        </div>
      </div>
    `},setup:t=>{t._tasks=b(t,[{id:"g1",name:"DB Schema Design",startOffset:1,duration:4},{id:"g2",name:"API Implementation",startOffset:5,duration:6,dependencies:["g1"]},{id:"g3",name:"UI Components",startOffset:6,duration:5},{id:"g4",name:"E2E Testing",startOffset:11,duration:3,dependencies:["g2","g3"]}]);let l=t.shadowRoot||t,f=25,i=null,c=!1;l.addEventListener("pointerdown",a=>{let e=a,r=e.target,o=r.closest(".task-bar");o&&(i=o.getAttribute("data-id"),c=r.classList.contains("resize-handle"),o.setPointerCapture(e.pointerId),e.preventDefault())}),l.addEventListener("pointermove",a=>{if(!i)return;let e=a,r=t._tasks.find(o=>o.id===i);if(r){if(c){let o=Math.round(e.movementX/f);r.duration=Math.max(1,r.duration+o)}else{let o=Math.round(e.movementX/f);r.startOffset=Math.max(0,r.startOffset+o)}t.render()}}),l.addEventListener("pointerup",()=>{if(i){let a=t._tasks.find(e=>e.id===i);a&&x(t,{taskId:a.id,task:a},"gantt-update"),i=null,c=!1}}),l.addEventListener("keydown",a=>{let e=a,r=e.target.closest(".task-bar");if(!r)return;let o=r.getAttribute("data-id"),s=t._tasks.find(n=>n.id===o);s&&(e.shiftKey&&e.key==="ArrowRight"?(s.duration+=1,x(t,{taskId:s.id,task:s},"gantt-resize"),t.render()):e.shiftKey&&e.key==="ArrowLeft"?(s.duration=Math.max(1,s.duration-1),x(t,{taskId:s.id,task:s},"gantt-resize"),t.render()):e.altKey&&e.key==="ArrowRight"?(s.startOffset+=1,x(t,{taskId:s.id,task:s},"gantt-move"),t.render()):e.altKey&&e.key==="ArrowLeft"&&(s.startOffset=Math.max(0,s.startOffset-1),x(t,{taskId:s.id,task:s},"gantt-move"),t.render()))})}});var O=u("flowx-kanban",{observedAttributes:["fx-post","commit-url"],style:`
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
  `,template:t=>{let l=t._columns||[],f=t._cards||[];return`
      <div class="kanban-board">
        ${l.map(c=>{let a=f.filter(r=>r.columnId===c.id),e=a.map(r=>`
        <div 
          class="kanban-card-wrapper ${t._pickedCardId===r.id?"picked-up":""}" 
          data-id="${r.id}" 
          tabindex="0"
          role="option"
          aria-grabbed="${t._pickedCardId===r.id?"true":"false"}"
          aria-label="${r.title}. Column ${c.title}."
        >
          <flowx-card>
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${r.title}</div>
            ${r.description?`<div style="font-size: 12px; color: var(--flowx-color-text-muted);">${r.description}</div>`:""}
            ${r.tag?`<span class="card-tag" style="background: ${r.tagColor||"var(--flowx-color-primary)"}; color: #fff;">${r.tag}</span>`:""}
          </flowx-card>
        </div>
      `).join("");return`
        <div class="column" data-col-id="${c.id}" role="listbox" aria-label="${c.title}">
          <div class="column-header">
            <span>${c.title}</span>
            <span class="card-count">${a.length}</span>
          </div>
          <div class="cards-list">
            ${e}
          </div>
        </div>
      `}).join("")}
      </div>
      <div class="live-region" aria-live="assertive">${t._a11yStatus||""}</div>
    `},setup:t=>{let l=b(t,{columns:[{id:"col-todo",title:"To Do"},{id:"col-in-progress",title:"In Progress"},{id:"col-done",title:"Done"}],cards:[{id:"card-1",columnId:"col-todo",title:"Design System Audit",description:"Review CSS custom property tokens",tag:"UI",tagColor:"#2563eb"},{id:"card-2",columnId:"col-todo",title:"Setup CI Pipelines",description:"Configure GitHub Actions test runners",tag:"DevOps",tagColor:"#f59e0b"},{id:"card-3",columnId:"col-in-progress",title:"Implement Kanban Board",description:"Pointer events & keyboard accessibility",tag:"Core",tagColor:"#10b981"}]});t._columns=l.columns,t._cards=l.cards,t._pickedCardId=null,t.render();let f=t.shadowRoot||t,i=null;f.addEventListener("pointerdown",c=>{let a=c.target.closest(".kanban-card-wrapper");a&&(i=a.getAttribute("data-id"),a.setPointerCapture(c.pointerId))}),f.addEventListener("pointerup",c=>{if(!i)return;let a=c,e=document.elementFromPoint(a.clientX,a.clientY)?.closest(".column");if(e){let r=e.getAttribute("data-col-id");if(r){let o=t._cards.find(s=>s.id===i);if(o&&o.columnId!==r){let s=o.columnId;o.columnId=r;let n=t._cards.filter(d=>d.columnId===r).length-1;x(t,{cardId:o.id,fromColumn:s,toColumn:r,newIndex:n},"card-move"),t.render()}}}i=null}),f.addEventListener("keydown",c=>{let a=c,e=a.target.closest(".kanban-card-wrapper");if(!e)return;let r=e.getAttribute("data-id");if(!r)return;let o=t._cards.find(s=>s.id===r);if(o){if(a.key===" "||a.key==="Enter")if(a.preventDefault(),t._pickedCardId===r){let n=t._cards.filter(d=>d.columnId===o.columnId).indexOf(o);x(t,{cardId:o.id,fromColumn:o._origCol||o.columnId,toColumn:o.columnId,newIndex:n},"card-move"),t._pickedCardId=null,t._a11yStatus=`Dropped card ${o.title} into column ${o.columnId}`,t.render()}else o._origCol=o.columnId,t._pickedCardId=r,t._a11yStatus=`Picked up card ${o.title}. Use arrow keys to move, Enter to drop, Esc to cancel.`,t.render();else if(a.key==="Escape"&&t._pickedCardId===r)o._origCol&&(o.columnId=o._origCol),t._pickedCardId=null,t._a11yStatus=`Cancelled card movement for ${o.title}`,t.render();else if(t._pickedCardId===r){let s=t._columns,n=s.findIndex(d=>d.id===o.columnId);if(a.key==="ArrowRight"&&n<s.length-1){a.preventDefault();let d=s[n+1];o.columnId=d.id,t._a11yStatus=`Moved ${o.title} to column ${d.title}`,t.render()}else if(a.key==="ArrowLeft"&&n>0){a.preventDefault();let d=s[n-1];o.columnId=d.id,t._a11yStatus=`Moved ${o.title} to column ${d.title}`,t.render()}}}})}});var X=u("flowx-notes",{observedAttributes:["fx-post","commit-url","debounce-ms"],style:`
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
          ${(t._blocks||[]).map(i=>`
      <div 
        class="note-block block-${i.type}" 
        data-id="${i.id}" 
        contenteditable="true" 
        spellcheck="false"
      >${i.content}</div>
    `).join("")}
        </div>
        <div class="status-bar">
          <span>Block-Based Note Editor</span>
          <span class="save-indicator">${t._saveStatus||"Saved"}</span>
        </div>
      </div>
    `,setup:t=>{t._blocks=b(t,[{id:"b1",type:"h1",content:"Project Architecture Notes"},{id:"b2",type:"p",content:"This block-based editor serializes state to JSON and debounces autosaves via fx-post."},{id:"b3",type:"bullet",content:"Zero-JS HTML rendering fallback"},{id:"b4",type:"bullet",content:"Debounced background autosave"}]),t._saveStatus="Saved",t.render();let l=t.shadowRoot||t,f=null,i=()=>{t._saveStatus="Saving...";let c=l.querySelector(".save-indicator");c&&(c.textContent="Saving...");let a=parseInt(t.getAttribute("debounce-ms")||"800",10);f&&clearTimeout(f),f=setTimeout(()=>{let r=Array.from(l.querySelectorAll(".note-block")).map(o=>{let s=o.getAttribute("data-id")||`b-${Date.now()}`,n=Array.from(o.classList).find(p=>p.startsWith("block-")),d=n?n.replace("block-",""):"p";return{id:s,type:d,content:o.textContent||""}});t._blocks=r,x(t,{blocks:r},"notes-autosave"),t._saveStatus="All changes saved",c&&(c.textContent="All changes saved")},a)};l.addEventListener("input",c=>{c.target.classList.contains("note-block")&&i()})}});var j=u("flowx-whiteboard",{observedAttributes:["fx-post","commit-url","tool"],style:`
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
  `,template:t=>{let l=t._tool||"pen";return`
      <div class="whiteboard-container">
        <div class="toolbar">
          <button class="tool-btn ${l==="pen"?"active":""}" data-tool="pen" type="button">\u270F\uFE0F Pen</button>
          <button class="tool-btn ${l==="eraser"?"active":""}" data-tool="eraser" type="button">\u{1F9F9} Eraser</button>
          <button class="tool-btn ${l==="note"?"active":""}" data-tool="note" type="button">\u{1F4DD} Sticky Note</button>
          <button class="tool-btn clear-btn" type="button">\u{1F5D1}\uFE0F Clear</button>
          <span class="client-only-badge">\u26A1 Client-Only Canvas Component</span>
        </div>

        <div class="canvas-wrapper">
          <canvas width="800" height="450"></canvas>
          <div class="notes-layer"></div>
        </div>
      </div>
    `},setup:t=>{let l=b(t,{strokes:[],notes:[{id:"sn-1",x:80,y:50,text:"Brainstorm Architecture",color:"#fef08a"}]});t._tool="pen",t._strokes=l.strokes,t._notes=l.notes;let f=t.shadowRoot||t,i=f.querySelector("canvas"),c=f.querySelector(".notes-layer");if(!i||!c)return;let a=i.getContext?i.getContext("2d"):null,e=()=>{c.innerHTML=t._notes.map(n=>`
        <div 
          class="sticky-note" 
          data-id="${n.id}" 
          style="left: ${n.x}px; top: ${n.y}px; background: ${n.color||"#fef08a"}; color: #000;"
          contenteditable="true"
        >${n.text}</div>
      `).join("")},r=()=>{a&&(a.clearRect(0,0,i.width,i.height),t._strokes.forEach(n=>{if(!(n.points.length<2)){a.beginPath(),a.strokeStyle=n.color,a.lineWidth=n.width,a.lineCap="round",a.lineJoin="round",a.moveTo(n.points[0].x,n.points[0].y);for(let d=1;d<n.points.length;d++)a.lineTo(n.points[d].x,n.points[d].y);a.stroke()}}))};e(),r();let o=!1,s=null;i.addEventListener("pointerdown",n=>{let d=i.getBoundingClientRect(),p=n.clientX-d.left,v=n.clientY-d.top;if(t._tool==="pen"||t._tool==="eraser")o=!0,s={points:[{x:p,y:v}],color:t._tool==="eraser"?"#fafafa":"#2563eb",width:t._tool==="eraser"?20:3},t._strokes.push(s),i.setPointerCapture(n.pointerId);else if(t._tool==="note"){let m={id:`sn-${Date.now()}`,x:Math.round(p),y:Math.round(v),text:"New Note",color:"#fef08a"};t._notes.push(m),e(),x(t,{notes:t._notes,strokes:t._strokes},"whiteboard-note-add")}}),i.addEventListener("pointermove",n=>{if(!o||!s)return;let d=i.getBoundingClientRect(),p=n.clientX-d.left,v=n.clientY-d.top;s.points.push({x:p,y:v}),r()}),i.addEventListener("pointerup",()=>{o&&(o=!1,s=null,x(t,{strokes:t._strokes,notes:t._notes},"whiteboard-draw"))}),f.addEventListener("click",n=>{let d=n.target;d.classList.contains("tool-btn")&&d.getAttribute("data-tool")?(t._tool=d.getAttribute("data-tool"),f.querySelectorAll(".tool-btn").forEach(p=>p.classList.remove("active")),d.classList.add("active")):d.classList.contains("clear-btn")&&(t._strokes=[],t._notes=[],r(),e(),x(t,{strokes:[],notes:[]},"whiteboard-clear"))})}});export{_ as FlowXCalendar,T as FlowXDataTimeline,D as FlowXGanttChart,O as FlowXKanban,X as FlowXNotes,A as FlowXScheduler,j as FlowXWhiteboard,g as GLOBAL_THEME,x as commitPayload,u as defineFlowXElement,b as parseJsonIsland};
//# sourceMappingURL=index.mjs.map