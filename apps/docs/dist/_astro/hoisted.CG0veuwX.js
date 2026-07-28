import{d as x}from"./hoisted.CvBNNmEc.js";function w(t,l){const c=t.querySelector('script[type="application/json"]');if(c&&c.textContent)try{return JSON.parse(c.textContent.trim())}catch(i){console.warn("FlowX Planner: Failed to parse JSON island",i)}return l}async function b(t,l,c="commit"){const i=t.getAttribute("fx-post")||t.getAttribute("commit-url");if(t.dispatchEvent(new CustomEvent("fx-commit",{bubbles:!0,composed:!0,detail:{endpoint:i,payload:l,action:c}})),i)try{const f=typeof window<"u"&&window.location&&window.location.origin&&window.location.origin!=="null"?window.location.origin:"http://localhost",e=i.startsWith("http")?i:new URL(i,f).toString();await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)})}catch{}}x("flowx-calendar",{observedAttributes:["view","current-date","fx-post","commit-url"],style:`
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
  `,template:t=>{const l=t.getAttribute("view")||"month",c=t._currentDate||new Date,i=c.toLocaleString("default",{month:"long",year:"numeric"}),e=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>`<div class="day-header">${d}</div>`).join(""),s=t._events||[];let r="";const o=c.getFullYear(),a=c.getMonth(),n=new Date(o,a,1).getDay();for(let d=0;d<35;d++){const p=d-n+1,u=p>0&&p<=31,v=u?`${o}-${String(a+1).padStart(2,"0")}-${String(p).padStart(2,"0")}`:"",g=(u?s.filter(m=>m.start===v):[]).map(m=>`
        <div class="event-chip" data-id="${m.id}" style="background-color: ${m.color||"var(--flowx-color-primary)"}">
          ${m.title}
        </div>
      `).join("");r+=`
        <div 
          class="cell" 
          tabindex="${u?"0":"-1"}" 
          ${u?`data-date="${v}"`:""} 
          aria-label="${u?`Date ${v}`:"Empty cell"}"
        >
          <div class="date-num">${u?p:""}</div>
          <div class="events-list">${g}</div>
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
          ${e}
          ${r}
        </div>
      </div>
    `},setup:t=>{t._events=w(t,[{id:"ev-1",title:"Sprint Review",start:"2026-07-28",color:"#2563eb"},{id:"ev-2",title:"Design System Audit",start:"2026-07-30",color:"#10b981"}]),t._currentDate=new Date(2026,6,27);const l=t.shadowRoot||t,c=()=>{t.render(),i()},i=()=>{const e=l.querySelector(".calendar-container");if(!e)return;e.addEventListener("click",r=>{const o=r.target;if(o.classList.contains("view-btn")){const a=o.getAttribute("data-view");a&&t.setAttribute("view",a)}else if(o.classList.contains("nav-prev"))t._currentDate.setMonth(t._currentDate.getMonth()-1),c();else if(o.classList.contains("nav-next"))t._currentDate.setMonth(t._currentDate.getMonth()+1),c();else if(o.classList.contains("cell")){const a=o.getAttribute("data-date");a&&f(a)}});let s=null;e.addEventListener("pointerdown",r=>{const o=r.target.closest(".event-chip");o&&(s=o.getAttribute("data-id"),o.setPointerCapture(r.pointerId))}),e.addEventListener("pointerup",r=>{if(!s)return;const o=r,a=document.elementFromPoint(o.clientX,o.clientY)?.closest(".cell");if(a){const n=a.getAttribute("data-date");if(n){const d=t._events.find(p=>p.id===s);if(d){const p=d.start;d.start=n,b(t,{eventId:d.id,event:d,oldStart:p,newStart:n},"event-move"),c()}}}s=null}),e.addEventListener("keydown",r=>{const o=r,a=l.activeElement||o.target.closest(".cell");if(!a||!a.classList.contains("cell"))return;const n=Array.from(l.querySelectorAll(".cell")),d=n.indexOf(a);if(d!==-1){if(o.key==="ArrowRight"&&!o.ctrlKey)d<n.length-1&&n[d+1].focus();else if(o.key==="ArrowLeft"&&!o.ctrlKey)d>0&&n[d-1].focus();else if(o.key==="ArrowDown"&&!o.ctrlKey)d+7<n.length&&n[d+7].focus();else if(o.key==="ArrowUp"&&!o.ctrlKey)d-7>=0&&n[d-7].focus();else if(o.key==="Enter"||o.key===" "){const p=a.getAttribute("data-date");p&&f(p)}}})},f=e=>{const s=document.createElement("div");s.className="create-modal",s.innerHTML=`
        <div class="modal-content">
          <h3 style="margin: 0 0 12px;">Create Event (${e})</h3>
          <input type="text" id="event-title-input" placeholder="Event Title..." autofocus />
          <div class="modal-actions">
            <button type="button" class="cancel-btn" style="padding: 6px 12px; border: 1px solid var(--flowx-border-color); background: var(--flowx-bg-surface); border-radius: 4px; cursor: pointer;">Cancel</button>
            <button type="button" class="save-btn" style="padding: 6px 12px; background: var(--flowx-color-primary); color: #fff; border: none; border-radius: 4px; cursor: pointer;">Save</button>
          </div>
        </div>
      `,l.appendChild(s);const r=s.querySelector(".cancel-btn"),o=s.querySelector(".save-btn"),a=s.querySelector("#event-title-input"),n=()=>s.remove();r?.addEventListener("click",n),o?.addEventListener("click",()=>{const d=a.value.trim();if(d){const p={id:`ev-${Date.now()}`,title:d,start:e,color:"#2563eb"};t._events||(t._events=[]),t._events.push(p),b(t,{event:p},"event-create"),n(),c()}})};i()}});x("flowx-scheduler",{observedAttributes:["slots-count","fx-post","commit-url"],style:`
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
  `,template:t=>{const l=parseInt(t.getAttribute("slots-count")||"8",10),c=t._resources||[],i=t._allocations||[],f=Array.from({length:l},(s,r)=>`<th>${9+r}:00</th>`).join(""),e=c.map(s=>{const r=Array.from({length:l},(o,a)=>{const n=i.find(p=>p.resourceId===s.id&&p.slot===a),d=n?`
          <div class="allocation-badge" data-id="${n.id}" style="background-color: ${n.color||"var(--flowx-color-primary)"}">
            ${n.title}
          </div>
        `:"";return`
          <td class="slot-cell" tabindex="0" data-resource-id="${s.id}" data-slot="${a}">
            ${d}
          </td>
        `}).join("");return`
        <tr>
          <td class="resource-cell">${s.name}</td>
          ${r}
        </tr>
      `}).join("");return`
      <div class="scheduler-container">
        <table class="grid-table">
          <thead>
            <tr>
              <th style="width: 160px;">Resource</th>
              ${f}
            </tr>
          </thead>
          <tbody>
            ${e}
          </tbody>
        </table>
      </div>
    `},setup:t=>{const l=w(t,{resources:[{id:"res-1",name:"Alice Smith",role:"Developer"},{id:"res-2",name:"Bob Jones",role:"Designer"},{id:"res-3",name:"Carol Danvers",role:"DevOps"}],allocations:[{id:"alloc-1",resourceId:"res-1",slot:1,title:"Code Review",color:"#2563eb"},{id:"alloc-2",resourceId:"res-2",slot:3,title:"UI Mockups",color:"#10b981"}]});t._resources=l.resources,t._allocations=l.allocations;const c=t.shadowRoot||t;let i=null;c.addEventListener("pointerdown",f=>{const e=f.target.closest(".allocation-badge");e&&(i=e.getAttribute("data-id"),e.setPointerCapture(f.pointerId))}),c.addEventListener("pointerup",f=>{if(!i)return;const e=f,s=document.elementFromPoint(e.clientX,e.clientY)?.closest(".slot-cell");if(s){const r=s.getAttribute("data-resource-id"),o=parseInt(s.getAttribute("data-slot")||"0",10);if(r){const a=t._allocations.find(n=>n.id===i);if(a){const n=a.resourceId,d=a.slot;a.resourceId=r,a.slot=o,b(t,{allocationId:a.id,allocation:a,oldResId:n,newResId:r,oldSlot:d,newSlot:o},"reassign-resource"),t.render()}}}i=null})}});x("flowx-data-timeline",{observedAttributes:["zoom-level","scale"],style:`
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
  `,template:t=>{const l=t._zoom||1,c=t._events||[],i=c.map((f,e)=>`
        <div class="milestone-node" style="left: ${Math.min(95,Math.max(5,(e+1)*(100/(c.length+1))*l))}%" tabindex="0" title="${f.description||f.title}">
          <div class="dot"></div>
          <div class="node-label">${f.title}</div>
          <div class="node-date">${f.timestamp}</div>
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
    `},setup:t=>{t._events=w(t,[{id:"t1",title:"Concept Approval",timestamp:"2026-01-15"},{id:"t2",title:"Beta Architecture",timestamp:"2026-04-10"},{id:"t3",title:"V1 Release",timestamp:"2026-07-27"},{id:"t4",title:"Ecosystem Expansion",timestamp:"2026-10-01"}]),t._zoom=1,t.render();const l=t.shadowRoot||t;l.addEventListener("click",c=>{const i=c.target;i.classList.contains("zoom-in")?(t._zoom=Math.min(3,t._zoom+.25),t.render()):i.classList.contains("zoom-out")&&(t._zoom=Math.max(.5,t._zoom-.25),t.render())}),l.addEventListener("keydown",c=>{const i=c;i.key==="+"||i.key==="="?(t._zoom=Math.min(3,t._zoom+.25),t.render()):i.key==="-"&&(t._zoom=Math.max(.5,t._zoom-.25),t.render())})}});x("flowx-gantt-chart",{observedAttributes:["fx-post","commit-url"],style:`
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
  `,template:t=>{const l=t._tasks||[],c=l.map(s=>`<div class="label-row">${s.name}</div>`).join(""),i=25,f=l.map(s=>{const r=s.startOffset*i,o=s.duration*i;return`
        <div class="task-row">
          <div class="task-bar" data-id="${s.id}" tabindex="0" style="left: ${r}px; width: ${o}px;">
            <span>${s.name}</span>
            <div class="resize-handle"></div>
          </div>
        </div>
      `}).join("");let e="";return l.forEach((s,r)=>{s.dependencies&&s.dependencies.forEach(o=>{const a=l.findIndex(n=>n.id===o);if(a!==-1){const n=l[a],d=(n.startOffset+n.duration)*i,p=a*40+20,u=s.startOffset*i,v=r*40+20;e+=`<path d="M ${d} ${p} C ${d+20} ${p}, ${u-20} ${v}, ${u} ${v}" stroke="var(--flowx-color-primary)" stroke-width="2" fill="none" marker-end="url(#arrow)"/>`}})}),`
      <div class="gantt-container">
        <div class="gantt-layout">
          <div class="task-labels">
            <div class="label-row" style="background: var(--flowx-bg-hover); font-weight: 700;">Task Name</div>
            ${c}
          </div>
          <div class="timeline-area">
            <div class="label-row" style="background: var(--flowx-bg-hover); font-weight: 700;">Timeline (Days)</div>
            ${f}
            <svg class="svg-overlay" width="100%" height="100%">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--flowx-color-primary)" />
                </marker>
              </defs>
              ${e}
            </svg>
          </div>
        </div>
      </div>
    `},setup:t=>{t._tasks=w(t,[{id:"g1",name:"DB Schema Design",startOffset:1,duration:4},{id:"g2",name:"API Implementation",startOffset:5,duration:6,dependencies:["g1"]},{id:"g3",name:"UI Components",startOffset:6,duration:5},{id:"g4",name:"E2E Testing",startOffset:11,duration:3,dependencies:["g2","g3"]}]);const l=t.shadowRoot||t,c=25;let i=null,f=!1;l.addEventListener("pointerdown",e=>{const s=e,r=s.target,o=r.closest(".task-bar");o&&(i=o.getAttribute("data-id"),f=r.classList.contains("resize-handle"),o.setPointerCapture(s.pointerId),s.preventDefault())}),l.addEventListener("pointermove",e=>{if(!i)return;const s=e,r=t._tasks.find(o=>o.id===i);if(r){if(f){const o=Math.round(s.movementX/c);r.duration=Math.max(1,r.duration+o)}else{const o=Math.round(s.movementX/c);r.startOffset=Math.max(0,r.startOffset+o)}t.render()}}),l.addEventListener("pointerup",()=>{if(i){const e=t._tasks.find(s=>s.id===i);e&&b(t,{taskId:e.id,task:e},"gantt-update"),i=null,f=!1}}),l.addEventListener("keydown",e=>{const s=e,r=s.target.closest(".task-bar");if(!r)return;const o=r.getAttribute("data-id"),a=t._tasks.find(n=>n.id===o);a&&(s.shiftKey&&s.key==="ArrowRight"?(a.duration+=1,b(t,{taskId:a.id,task:a},"gantt-resize"),t.render()):s.shiftKey&&s.key==="ArrowLeft"?(a.duration=Math.max(1,a.duration-1),b(t,{taskId:a.id,task:a},"gantt-resize"),t.render()):s.altKey&&s.key==="ArrowRight"?(a.startOffset+=1,b(t,{taskId:a.id,task:a},"gantt-move"),t.render()):s.altKey&&s.key==="ArrowLeft"&&(a.startOffset=Math.max(0,a.startOffset-1),b(t,{taskId:a.id,task:a},"gantt-move"),t.render()))})}});x("flowx-kanban",{observedAttributes:["fx-post","commit-url"],style:`
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
  `,template:t=>{const l=t._columns||[],c=t._cards||[];return`
      <div class="kanban-board">
        ${l.map(f=>{const e=c.filter(r=>r.columnId===f.id),s=e.map(r=>`
        <div 
          class="kanban-card-wrapper ${t._pickedCardId===r.id?"picked-up":""}" 
          data-id="${r.id}" 
          tabindex="0"
          role="option"
          aria-grabbed="${t._pickedCardId===r.id?"true":"false"}"
          aria-label="${r.title}. Column ${f.title}."
        >
          <flowx-card>
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${r.title}</div>
            ${r.description?`<div style="font-size: 12px; color: var(--flowx-color-text-muted);">${r.description}</div>`:""}
            ${r.tag?`<span class="card-tag" style="background: ${r.tagColor||"var(--flowx-color-primary)"}; color: #fff;">${r.tag}</span>`:""}
          </flowx-card>
        </div>
      `).join("");return`
        <div class="column" data-col-id="${f.id}" role="listbox" aria-label="${f.title}">
          <div class="column-header">
            <span>${f.title}</span>
            <span class="card-count">${e.length}</span>
          </div>
          <div class="cards-list">
            ${s}
          </div>
        </div>
      `}).join("")}
      </div>
      <div class="live-region" aria-live="assertive">${t._a11yStatus||""}</div>
    `},setup:t=>{const l=w(t,{columns:[{id:"col-todo",title:"To Do"},{id:"col-in-progress",title:"In Progress"},{id:"col-done",title:"Done"}],cards:[{id:"card-1",columnId:"col-todo",title:"Design System Audit",description:"Review CSS custom property tokens",tag:"UI",tagColor:"#2563eb"},{id:"card-2",columnId:"col-todo",title:"Setup CI Pipelines",description:"Configure GitHub Actions test runners",tag:"DevOps",tagColor:"#f59e0b"},{id:"card-3",columnId:"col-in-progress",title:"Implement Kanban Board",description:"Pointer events & keyboard accessibility",tag:"Core",tagColor:"#10b981"}]});t._columns=l.columns,t._cards=l.cards,t._pickedCardId=null,t.render();const c=t.shadowRoot||t;let i=null;c.addEventListener("pointerdown",f=>{const e=f.target.closest(".kanban-card-wrapper");e&&(i=e.getAttribute("data-id"),e.setPointerCapture(f.pointerId))}),c.addEventListener("pointerup",f=>{if(!i)return;const e=f,s=document.elementFromPoint(e.clientX,e.clientY)?.closest(".column");if(s){const r=s.getAttribute("data-col-id");if(r){const o=t._cards.find(a=>a.id===i);if(o&&o.columnId!==r){const a=o.columnId;o.columnId=r;const n=t._cards.filter(d=>d.columnId===r).length-1;b(t,{cardId:o.id,fromColumn:a,toColumn:r,newIndex:n},"card-move"),t.render()}}}i=null}),c.addEventListener("keydown",f=>{const e=f,s=e.target.closest(".kanban-card-wrapper");if(!s)return;const r=s.getAttribute("data-id");if(!r)return;const o=t._cards.find(a=>a.id===r);if(o){if(e.key===" "||e.key==="Enter")if(e.preventDefault(),t._pickedCardId===r){const n=t._cards.filter(d=>d.columnId===o.columnId).indexOf(o);b(t,{cardId:o.id,fromColumn:o._origCol||o.columnId,toColumn:o.columnId,newIndex:n},"card-move"),t._pickedCardId=null,t._a11yStatus=`Dropped card ${o.title} into column ${o.columnId}`,t.render()}else o._origCol=o.columnId,t._pickedCardId=r,t._a11yStatus=`Picked up card ${o.title}. Use arrow keys to move, Enter to drop, Esc to cancel.`,t.render();else if(e.key==="Escape"&&t._pickedCardId===r)o._origCol&&(o.columnId=o._origCol),t._pickedCardId=null,t._a11yStatus=`Cancelled card movement for ${o.title}`,t.render();else if(t._pickedCardId===r){const a=t._columns,n=a.findIndex(d=>d.id===o.columnId);if(e.key==="ArrowRight"&&n<a.length-1){e.preventDefault();const d=a[n+1];o.columnId=d.id,t._a11yStatus=`Moved ${o.title} to column ${d.title}`,t.render()}else if(e.key==="ArrowLeft"&&n>0){e.preventDefault();const d=a[n-1];o.columnId=d.id,t._a11yStatus=`Moved ${o.title} to column ${d.title}`,t.render()}}}})}});x("flowx-notes",{observedAttributes:["fx-post","commit-url","debounce-ms"],style:`
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
    `,setup:t=>{t._blocks=w(t,[{id:"b1",type:"h1",content:"Project Architecture Notes"},{id:"b2",type:"p",content:"This block-based editor serializes state to JSON and debounces autosaves via fx-post."},{id:"b3",type:"bullet",content:"Zero-JS HTML rendering fallback"},{id:"b4",type:"bullet",content:"Debounced background autosave"}]),t._saveStatus="Saved",t.render();const l=t.shadowRoot||t;let c=null;const i=()=>{t._saveStatus="Saving...";const f=l.querySelector(".save-indicator");f&&(f.textContent="Saving...");const e=parseInt(t.getAttribute("debounce-ms")||"800",10);c&&clearTimeout(c),c=setTimeout(()=>{const r=Array.from(l.querySelectorAll(".note-block")).map(o=>{const a=o.getAttribute("data-id")||`b-${Date.now()}`,n=Array.from(o.classList).find(p=>p.startsWith("block-")),d=n?n.replace("block-",""):"p";return{id:a,type:d,content:o.textContent||""}});t._blocks=r,b(t,{blocks:r},"notes-autosave"),t._saveStatus="All changes saved",f&&(f.textContent="All changes saved")},e)};l.addEventListener("input",f=>{f.target.classList.contains("note-block")&&i()})}});x("flowx-whiteboard",{observedAttributes:["fx-post","commit-url","tool"],style:`
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
  `,template:t=>{const l=t._tool||"pen";return`
      <div class="whiteboard-container">
        <div class="toolbar">
          <button class="tool-btn ${l==="pen"?"active":""}" data-tool="pen" type="button">✏️ Pen</button>
          <button class="tool-btn ${l==="eraser"?"active":""}" data-tool="eraser" type="button">🧹 Eraser</button>
          <button class="tool-btn ${l==="note"?"active":""}" data-tool="note" type="button">📝 Sticky Note</button>
          <button class="tool-btn clear-btn" type="button">🗑️ Clear</button>
          <span class="client-only-badge">⚡ Client-Only Canvas Component</span>
        </div>

        <div class="canvas-wrapper">
          <canvas width="800" height="450"></canvas>
          <div class="notes-layer"></div>
        </div>
      </div>
    `},setup:t=>{const l=w(t,{strokes:[],notes:[{id:"sn-1",x:80,y:50,text:"Brainstorm Architecture",color:"#fef08a"}]});t._tool="pen",t._strokes=l.strokes,t._notes=l.notes;const c=t.shadowRoot||t,i=c.querySelector("canvas"),f=c.querySelector(".notes-layer");if(!i||!f)return;const e=i.getContext?i.getContext("2d"):null,s=()=>{f.innerHTML=t._notes.map(n=>`
        <div 
          class="sticky-note" 
          data-id="${n.id}" 
          style="left: ${n.x}px; top: ${n.y}px; background: ${n.color||"#fef08a"}; color: #000;"
          contenteditable="true"
        >${n.text}</div>
      `).join("")},r=()=>{e&&(e.clearRect(0,0,i.width,i.height),t._strokes.forEach(n=>{if(!(n.points.length<2)){e.beginPath(),e.strokeStyle=n.color,e.lineWidth=n.width,e.lineCap="round",e.lineJoin="round",e.moveTo(n.points[0].x,n.points[0].y);for(let d=1;d<n.points.length;d++)e.lineTo(n.points[d].x,n.points[d].y);e.stroke()}}))};s(),r();let o=!1,a=null;i.addEventListener("pointerdown",n=>{const d=i.getBoundingClientRect(),p=n.clientX-d.left,u=n.clientY-d.top;if(t._tool==="pen"||t._tool==="eraser")o=!0,a={points:[{x:p,y:u}],color:t._tool==="eraser"?"#fafafa":"#2563eb",width:t._tool==="eraser"?20:3},t._strokes.push(a),i.setPointerCapture(n.pointerId);else if(t._tool==="note"){const v={id:`sn-${Date.now()}`,x:Math.round(p),y:Math.round(u),text:"New Note",color:"#fef08a"};t._notes.push(v),s(),b(t,{notes:t._notes,strokes:t._strokes},"whiteboard-note-add")}}),i.addEventListener("pointermove",n=>{if(!o||!a)return;const d=i.getBoundingClientRect(),p=n.clientX-d.left,u=n.clientY-d.top;a.points.push({x:p,y:u}),r()}),i.addEventListener("pointerup",()=>{o&&(o=!1,a=null,b(t,{strokes:t._strokes,notes:t._notes},"whiteboard-draw"))}),c.addEventListener("click",n=>{const d=n.target;d.classList.contains("tool-btn")&&d.getAttribute("data-tool")?(t._tool=d.getAttribute("data-tool"),c.querySelectorAll(".tool-btn").forEach(p=>p.classList.remove("active")),d.classList.add("active")):d.classList.contains("clear-btn")&&(t._strokes=[],t._notes=[],r(),s(),b(t,{strokes:[],notes:[]},"whiteboard-clear"))})}});document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("payload-log-output");document.addEventListener("fx-commit",l=>{if(t){const i=`[${new Date().toLocaleTimeString()}] ${l.detail.action.toUpperCase()} -> ${JSON.stringify(l.detail.payload)}
`;t.textContent=i+(t.textContent||"")}})});
